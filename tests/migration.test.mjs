// A migrated culture must still be a culture to every check in this repository.
//
// This is the #430 lesson written as a test rather than as a comment. When the
// content moved into `packages/khai-cultures/`, three ratchets kept a literal
// path that no longer matched, and for weeks every culture pull request reported
// "no culture touched" and passed by reading nothing. Nothing failed. A gate that
// has gone blind and a gate with nothing to say produce the same output.
//
// The migration moves the path again, one culture at a time, and that is the
// same failure in a slower and quieter form: a resolver that finds 289 of 290
// looks exactly like a resolver that works. So two things are pinned here.
//
// FIRST, that the resolver finds a production package at all - proven on a
// synthetic workspace built in a scratch directory, because proving it on the
// real tree is only possible after the first culture has already moved, which is
// the one moment the proof is needed and cannot be had.
//
// SECOND, that nobody has typed the path again. Every gate goes through
// `culture_sources.mjs`; a `join(root, "cultures", id)` or a literal
// `packages/khai-cultures/cultures/` anywhere else is the bug returning, and it
// returns by being written, not by being reasoned about.

import { describe, it, expect } from "vitest";
import { mkdtempSync, mkdirSync, writeFileSync, rmSync, readFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";
import {
  cultures,
  cultureIds,
  cultureDir,
  isMigrated,
  pathCulture,
  touchedCultures,
  productions,
  productionName,
} from "./culture_sources.mjs";
import { drift } from "./registry_hybrid.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const WORKSPACE = join(HERE, "..");

/** A workspace with `monolith` cultures under the umbrella and `migrated` beside it. */
function scratchWorkspace({ monolith = [], migrated = [] } = {}) {
  const root = mkdtempSync(join(tmpdir(), "khai-migration-"));
  mkdirSync(join(root, "packages", "khai-cultures", "cultures"), { recursive: true });
  writeFileSync(
    join(root, "packages", "khai-cultures", "package.json"),
    JSON.stringify({ name: "@chbrain/khai-cultures" }),
  );
  for (const id of monolith) {
    const dir = join(root, "packages", "khai-cultures", "cultures", id);
    mkdirSync(dir, { recursive: true });
    writeFileSync(join(dir, `play_${id}.md`), "---\nkhai: play\n---\n");
  }
  for (const id of migrated) {
    const dir = join(root, "packages", `khai-cultures-${id.replace(/_/g, "-")}`);
    mkdirSync(dir, { recursive: true });
    writeFileSync(
      join(dir, "package.json"),
      JSON.stringify({
        name: productionName(id),
        khai: { class: "house", production: id, anchor: `play_${id}.md` },
      }),
    );
    writeFileSync(join(dir, `play_${id}.md`), "---\nkhai: play\n---\n");
  }
  return root;
}

describe("Migration: a culture in a package is still a culture", () => {
  it("finds cultures in both homes, and says which is which", () => {
    const root = scratchWorkspace({ monolith: ["alpha", "gamma"], migrated: ["beta"] });
    try {
      expect(cultureIds(root)).toEqual(["alpha", "beta", "gamma"]);
      expect(isMigrated("beta", root)).toBe(true);
      expect(isMigrated("alpha", root)).toBe(false);
      expect(cultureDir("beta", root)).toBe(join(root, "packages", "khai-cultures-beta"));
      expect(productions(root).map((p) => p.name)).toEqual(["@chbrain/khai-cultures-beta"]);
    } finally {
      rmSync(root, { recursive: true, force: true });
    }
  });

  it("maps a path inside a production package back to its culture", () => {
    const root = scratchWorkspace({ monolith: ["alpha"], migrated: ["de_bavaria"] });
    try {
      expect(pathCulture("packages/khai-cultures-de-bavaria/plot_00_x.md", root)).toEqual({
        id: "de_bavaria",
        file: "plot_00_x.md",
        migrated: true,
      });
      expect(pathCulture("packages/khai-cultures/cultures/alpha/play_alpha.md", root)).toEqual({
        id: "alpha",
        file: "play_alpha.md",
        migrated: false,
      });
      // The ratchets all run on this, so a migrated culture must be reachable by
      // the same call that reaches a monolith one.
      expect(
        touchedCultures(
          [
            "packages/khai-cultures-de-bavaria/persona_x.md",
            "packages/khai-cultures/cultures/alpha/piece_y.md",
            "README.md",
          ],
          root,
        ),
      ).toEqual(["alpha", "de_bavaria"]);
    } finally {
      rmSync(root, { recursive: true, force: true });
    }
  });

  it("refuses an empty house rather than reporting nothing to do", () => {
    const root = mkdtempSync(join(tmpdir(), "khai-empty-"));
    try {
      mkdirSync(join(root, "packages"), { recursive: true });
      expect(() => cultures(root)).toThrow(/pass by reading nothing/);
    } finally {
      rmSync(root, { recursive: true, force: true });
    }
  });

  it("refuses a culture that is in two places at once", () => {
    const root = scratchWorkspace({ monolith: ["delta"], migrated: ["delta"] });
    try {
      expect(() => cultures(root)).toThrow(/two places at once/);
    } finally {
      rmSync(root, { recursive: true, force: true });
    }
  });

  it("names a package by the frozen rule, national and sub-national alike", () => {
    expect(productionName("germany")).toBe("@chbrain/khai-cultures-germany");
    expect(productionName("de_bavaria")).toBe("@chbrain/khai-cultures-de-bavaria");
  });
});

describe("Migration: no gate types a culture's path", () => {
  // The gates and the tooling. `culture_sources.mjs` is the one file allowed to
  // know the shapes, and this test is what keeps it the one file.
  // Two files are exempt and both name the shapes on purpose: the resolver,
  // which is where they belong, and this test, which cannot pin a string it is
  // forbidden to write.
  const EXEMPT = ["culture_sources.mjs", "migration.test.mjs"];
  const files = readdirSync(HERE).filter((f) => f.endsWith(".mjs") && !EXEMPT.includes(f));

  it.each(files)("%s asks the resolver where a culture lives", (file) => {
    const text = readFileSync(join(HERE, file), "utf8");
    // Comments are where the history is written down, and the history contains
    // the very strings this forbids. Only code is judged.
    const code = text
      .split("\n")
      .filter((line) => !/^\s*(\/\/|\*|\/\*)/.test(line))
      .join("\n");
    // Joined onto the house or a root, which is the house's collection dir. A
    // scratch tree of its own (the registry build assembles one) is not that.
    expect(code, `${file} joins its own path to a culture directory`).not.toMatch(
      /join\(\s*(?:root|ROOT|HOUSE|house)\b[^)]*,\s*"cultures"/,
    );
    expect(code, `${file} writes a culture path out as a literal`).not.toMatch(
      /"packages\/khai-cultures\/cultures\//,
    );
  });
});

describe("Migration: the registry keeps the whole house", () => {
  it("has no drift between the committed registry and the cultures that exist", () => {
    expect(drift()).toEqual([]);
  });

  it("counts every culture, wherever it lives, in the minor version", () => {
    const pkg = JSON.parse(
      readFileSync(join(WORKSPACE, "packages", "khai-cultures", "package.json"), "utf8"),
    );
    expect(pkg.version.split(".")[1]).toBe(String(cultureIds().length));
  });
});
