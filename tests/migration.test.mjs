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
import {
  mkdtempSync,
  mkdirSync,
  writeFileSync,
  rmSync,
  readFileSync,
  readdirSync,
  renameSync,
} from "node:fs";
import { execFileSync } from "node:child_process";
import semver from "semver";
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
  relinkOnly,
  authoredCultures,
} from "./culture_sources.mjs";
import { drift } from "./registry_hybrid.mjs";
import { rangeFindings } from "./production_packages.mjs";
import { languagesOf, plan } from "./migrate_culture.mjs";

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

// A tongue move retargets a link in every culture that casts the variety - en_gb
// alone is ninety-four - and under a plain touch rule each of those is then asked
// for zero dead Company entries, a conforming id and a nesting link it never
// owed. The choice would be a pull request that renames Illinois and invents
// scenes in Turkey to satisfy a counter, which this house forbids in as many
// words, or no tongue walk at all.
//
// So the content ratchets ask what a change AUTHORED. The rule has to hold in
// both directions or it is a hole: a retargeted link is exempt, and one word of
// prose in the same file is not. Proven on a real commit pair built here, because
// the interesting half is the second one and no fixture can fake a git history.
describe("Migration: a relink is not an authoring, and one word of prose is", () => {
  function twoCommits() {
    const repo = mkdtempSync(join(tmpdir(), "khai-authored-"));
    const git = (...args) => execFileSync("git", args, { cwd: repo, encoding: "utf8" });
    git("init", "-q", "-b", "main");
    git("config", "user.email", "t@example.com");
    git("config", "user.name", "t");
    const dir = join(repo, "packages", "khai-cultures", "cultures", "alpha");
    mkdirSync(dir, { recursive: true });
    const write = (body) => writeFileSync(join(dir, "persona_a.md"), body);
    write("---\nkhai: persona\n---\n\nShe holds [the tongue](../beta/position_language_x.md).\n");
    git("add", "-A");
    git("commit", "-qm", "base");
    const base = git("rev-parse", "HEAD").trim();
    write(
      "---\nkhai: persona\n---\n\nShe holds [the tongue](@scope/pkg/position_language_x.md).\n",
    );
    git("commit", "-aqm", "relink");
    const relinked = git("rev-parse", "HEAD").trim();
    write(
      "---\nkhai: persona\n---\n\nShe still holds [the tongue](@scope/pkg/position_language_x.md).\n",
    );
    git("commit", "-aqm", "prose");
    const written = git("rev-parse", "HEAD").trim();
    return { repo, base, relinked, written };
  }

  it("exempts a culture whose whole change is where a link points", () => {
    const { repo, base, relinked } = twoCommits();
    try {
      const { authored, spared } = authoredCultures(base, relinked, repo);
      expect([...authored.keys()]).toEqual([]);
      expect(spared).toEqual(["alpha"]);
    } finally {
      rmSync(repo, { recursive: true, force: true });
    }
  });

  it("charges a culture for one word of prose in the same file", () => {
    const { repo, base, written } = twoCommits();
    try {
      const { authored, spared } = authoredCultures(base, written, repo);
      expect([...authored.keys()]).toEqual(["alpha"]);
      expect(spared).toEqual([]);
    } finally {
      rmSync(repo, { recursive: true, force: true });
    }
  });

  it("never calls an added or deleted file a relink", () => {
    // The exemption is for a link the walk moved out from under a culture. A file
    // that arrived or left is content either way.
    expect(
      relinkOnly("packages/khai-cultures/cultures/nope/persona_nobody.md", "HEAD", "HEAD"),
    ).toBe(false);
  });
  it("does not charge a culture for moving into its own package", () => {
    // The case the first migration found. A culture whose whole change is a
    // directory rename plus a manifest has not been written in, and demanding an
    // origin plot for it would be answered with a bad plot_00, which is worse
    // than none. This house settled the same rule once before, when the
    // sub-national rename deadlocked against changeset-check.
    const repo = mkdtempSync(join(tmpdir(), "khai-moved-"));
    const git = (...args) => execFileSync("git", args, { cwd: repo, encoding: "utf8" });
    try {
      git("init", "-q", "-b", "main");
      git("config", "user.email", "t@example.com");
      git("config", "user.name", "t");
      const from = join(repo, "packages", "khai-cultures", "cultures", "alpha");
      mkdirSync(from, { recursive: true });
      const play = "---\nkhai: play\n---\n\nA play with no origin plot at all.\n";
      writeFileSync(join(from, "play_alpha.md"), play);
      git("add", "-A");
      git("commit", "-qm", "base");
      const base = git("rev-parse", "HEAD").trim();

      const to = join(repo, "packages", "khai-cultures-alpha");
      mkdirSync(to, { recursive: true });
      git(
        "mv",
        "packages/khai-cultures/cultures/alpha/play_alpha.md",
        "packages/khai-cultures-alpha/play_alpha.md",
      );
      writeFileSync(
        join(to, "package.json"),
        JSON.stringify({
          name: "@chbrain/khai-cultures-alpha",
          khai: { class: "house", production: "alpha", anchor: "play_alpha.md" },
        }),
      );
      writeFileSync(join(to, "LICENSE"), "text\n");
      git("add", "-A");
      git("commit", "-qm", "migrate");
      const moved = git("rev-parse", "HEAD").trim();

      const { authored, spared } = authoredCultures(base, moved, repo);
      expect([...authored.keys()]).toEqual([]);
      expect(spared).toEqual(["alpha"]);
    } finally {
      rmSync(repo, { recursive: true, force: true });
    }
  });
});

// The house registers twenty-five languages no engine has heard of - Romansh,
// Bavarian, Nahuatl, Church Slavonic - and while every culture lived under the
// umbrella one declaration covered all of them. A production is validated rooted
// on ITSELF, so it must carry the subset its own files are written in. Switzerland
// found this out by failing on two personas written in Romansh, and fifteen
// cultures in this house need a list at all.
//
// Derived and not copied whole: a package that declared all twenty-five to use
// one would be telling an installer something untrue about what is in the box.
describe("Migration: a production registers the languages it is written in", () => {
  function scratchCulture(langs) {
    const dir = mkdtempSync(join(tmpdir(), "khai-langs-"));
    langs.forEach((l, i) =>
      writeFileSync(join(dir, `persona_${i}.md`), `---\nkhai: persona\nlanguage: ${l}\n---\n`),
    );
    return dir;
  }

  it("declares the house-registered languages its files use", () => {
    const dir = scratchCulture(["rm", "de", "rm"]);
    try {
      expect(languagesOf(dir)).toEqual(["rm"]);
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  it("declares nothing for a culture written only in engine languages", () => {
    const dir = scratchCulture(["de", "fr", "it"]);
    try {
      expect(languagesOf(dir)).toEqual([]);
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  it("does not copy the umbrella's whole list", () => {
    const dir = scratchCulture(["nah"]);
    try {
      expect(languagesOf(dir)).toEqual(["nah"]);
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });
});

// Two gaps the first authored culture found, both of which only appear when a
// culture is WRITTEN rather than restaged. A culture authored today carries
// package specifiers from the start, so it has no `../` for the tool to rewrite
// and the tool derived its dependencies from that rewrite alone; and a culture
// authored in the same pull request has never been tracked, so `git mv` refuses
// to move it.
describe("Migration: the tool serves a culture that was written, not restaged", () => {
  it("declares a specifier the culture already carried", () => {
    // ch_uri is written with its parent named as a specifier and nothing to
    // rewrite. Read off the real tree, because the point is that a correctly
    // authored culture produces no rewrite for the derivation to hang on.
    const uri = cultures().find((c) => c.id === "ch_uri");
    if (!uri) return; // not yet in the house
    const declared = uri.migrated
      ? Object.keys(JSON.parse(readFileSync(join(uri.dir, "package.json"), "utf8")).dependencies)
      : Object.keys(plan("ch_uri").manifest.dependencies);
    expect(declared).toContain("@chbrain/khai-cultures-switzerland");
  });

  it("moves an untracked directory instead of failing", () => {
    // Proven on a scratch repository: git will not move what it has never
    // tracked, and a culture authored in the same pull request is exactly that.
    const repo = mkdtempSync(join(tmpdir(), "khai-untracked-"));
    const git = (...args) => execFileSync("git", args, { cwd: repo, encoding: "utf8" });
    try {
      git("init", "-q", "-b", "main");
      git("config", "user.email", "t@example.com");
      git("config", "user.name", "t");
      writeFileSync(join(repo, "seed"), "x");
      git("add", "-A");
      git("commit", "-qm", "base");
      const from = join(repo, "fresh");
      mkdirSync(from);
      writeFileSync(join(from, "play_fresh.md"), "---\nkhai: play\n---\n");
      expect(() => git("mv", "fresh", "moved")).toThrow();
      renameSync(from, join(repo, "moved"));
      expect(readdirSync(join(repo, "moved"))).toEqual(["play_fresh.md"]);
    } finally {
      rmSync(repo, { recursive: true, force: true });
    }
  });
});

// Declaring a dependency and being able to resolve it are two different things,
// and the production gate only ever checked the first. It cost an install: the
// tongues package's minor IS its language count, so adding Turkish took it from
// 0.20.0 to 0.21.0, `^0.20.0` stopped matching, and npm fell back to a registry
// where the package has never been published and failed with a 404. Six manifests
// carried the stale range; there will be two hundred and ninety.
describe("Migration: a declared range must be one this workspace can satisfy", () => {
  it("has no unsatisfiable range in the workspace as it stands", () => {
    expect(rangeFindings()).toEqual([]);
  });

  it("is what a stale range looks like when it happens", () => {
    // Held against the real workspace by construction rather than by fixture:
    // semver's own answer to the exact comparison that failed.
    expect(semver.satisfies("0.21.0", "^0.20.0")).toBe(false);
    expect(semver.satisfies("0.21.0", "^0.21.0")).toBe(true);
    expect(semver.satisfies("0.21.4", "^0.21.0")).toBe(true);
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
