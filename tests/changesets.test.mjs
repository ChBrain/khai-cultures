// A changeset names a package this workspace actually has.
//
// This exists because nine of them in the misfits house did not. They declared
// `"khai-misfits"` against a package named `@chbrain/khai-misfits`, so
// `changeset version` threw -- "Found changeset ... for package khai-misfits
// which is not in the workspace" -- and took that release down for two days.
// `npm test` was green in every failed run, the failure sitting in the last step
// of a job whose visible work all passes, and the only symptom was a Version
// Packages pull request that stopped moving.
//
// The gate that should have caught it could not see that half of the file.
// `khai-guard changeset-check` parsed each changeset's frontmatter into
// `{ name, level }` entries and read `level` alone, which is the rule about a
// content add owing a `minor`; all nine declared `minor` correctly. It now reads
// the name too, and that is the wall going forward -- but it reads the changesets
// a pull request TOUCHES, so it prevents the next wrong name and cannot sweep a
// backlog. This is the corpus-wide half, and the two are complementary.
//
// Nothing is wrong here today. That is the point of writing it now: the misfits
// house accumulated nine over two weeks with every gate green, and the cheapest
// moment to close a hole is while it is still empty.
//
// This house is the harder case, and is why the guard's rule takes the workspace
// names rather than the publishable ones: there are TWO publishable packages plus
// a private root container, and a rule that judged names against one manifest
// would be wrong about the other.

import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

/** Every package name in the workspace, the private root container included.
 * Private is not the question: a private package IS in the workspace and
 * `changeset version` resolves it. Existence is the question. */
function workspaceNames() {
  const rootPkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
  const names = rootPkg.name ? [rootPkg.name] : [];
  const patterns = Array.isArray(rootPkg.workspaces)
    ? rootPkg.workspaces
    : (rootPkg.workspaces?.packages ?? []);
  for (const pattern of patterns) {
    const p = String(pattern)
      .replace(/^\.?\//, "")
      .replace(/\/+$/, "");
    const dirs = p.endsWith("/*")
      ? readdirSync(join(root, p.slice(0, -2)), { withFileTypes: true })
          .filter((e) => e.isDirectory())
          .map((e) => `${p.slice(0, -2)}/${e.name}`)
      : p.includes("*")
        ? []
        : [p];
    for (const dir of dirs) {
      const manifest = join(root, dir, "package.json");
      if (!existsSync(manifest)) continue;
      const pkg = JSON.parse(readFileSync(manifest, "utf8"));
      if (pkg.name) names.push(pkg.name);
    }
  }
  return names;
}

/** The package names a changeset declares, one per bump line in its frontmatter.
 * An `--empty` changeset -- the kind that records a pull request shipping nothing
 * -- declares none, and owes none. */
function declaredNames(text) {
  const m = /^﻿?---\r?\n([\s\S]*?)\r?\n?---/.exec(text);
  if (!m) return [];
  return m[1]
    .split(/\r?\n/)
    .map((line) => /^\s*["']?([^"':]+)["']?\s*:\s*(patch|minor|major)\s*$/.exec(line))
    .filter(Boolean)
    .map((hit) => hit[1].trim());
}

const NAMES = workspaceNames();
const changesets = readdirSync(join(root, ".changeset"))
  .filter((f) => f.endsWith(".md") && f !== "README.md")
  .map((f) => ({ file: f, text: readFileSync(join(root, ".changeset", f), "utf8") }));

describe("every changeset names a package this workspace has", () => {
  it("finds the workspace's packages, and the changesets to check", () => {
    // A reader that found nothing would pass the wall below in silence, which is
    // the whole failure mode this file is about.
    expect(NAMES).toContain("@chbrain/khai-cultures");
    expect(NAMES).toContain("@chbrain/khai-cultures-tongues");
    expect(changesets.length).toBeGreaterThan(0);
  });

  it("declares no package the workspace does not have", () => {
    const wrong = changesets.flatMap(({ file, text }) =>
      declaredNames(text)
        .filter((name) => !NAMES.includes(name))
        .map((name) => `${file}: "${name}"`),
    );
    expect(wrong, `the workspace has: ${NAMES.join(", ")}`).toEqual([]);
  });

  it("reads the bump line it claims to read", () => {
    // The parser is the load-bearing half, so it is exercised directly rather
    // than trusted because the corpus happens to pass.
    expect(declaredNames('---\n"@chbrain/khai-cultures": patch\n---\n\nbody\n')).toEqual([
      "@chbrain/khai-cultures",
    ]);
    expect(declaredNames('---\n"khai-cultures": minor\n---\n\nbody\n')).toEqual(["khai-cultures"]);
    expect(declaredNames("---\n---\n\nan empty changeset\n")).toEqual([]);
  });
});

describe("a changeset can be committed on a lane the guard computes", () => {
  it("holds .changeset/** as a rider, not as shared", () => {
    // `shared` is for build artefacts, which are never the whole of a change, so
    // a shared path owns no lane and `khai-guard branch` refuses: "this change is
    // not one lane". A changeset REPAIR is a change whose whole content is
    // .changeset/**, so under `shared` the fix for an outage like the one above
    // would have nowhere to be committed -- which is exactly what happened in the
    // misfits house. A rider already means what was wanted: it rides the lane of
    // the change it accompanies and homes to a fallback when it rides alone.
    const { branchScope } = JSON.parse(readFileSync(join(root, "khai-guard.config.json"), "utf8"));
    expect(branchScope.shared).not.toContain(".changeset/**");
    expect(branchScope.riders).toContainEqual({ pattern: ".changeset/**", fallback: "governance" });
  });
});
