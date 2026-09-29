import { describe, it, expect } from "vitest";
import { join } from "node:path";
import { readFileSync, readdirSync, existsSync } from "node:fs";
import {
  verifyGatesAgainstCi,
  verifyRelease,
  packedFiles,
  checkPacking,
  checkRegistryPacking,
  checkManagement,
  resolveHouse,
  isolationErrors,
  filenameErrors,
  loadIsolationPolicy,
} from "@chbrain/khai-tests";
import { standalone } from "./tongues_standalone.mjs";
import { declared } from "./type_titles.mjs";
import { mds, units as linkUnits } from "./link_resolution.mjs";
import {
  cultures,
  productions,
  migratedGroups,
  migratedSunken,
  houseSunken,
  sunken,
  sunkenName,
  groupName,
  productionName,
  cultureUnits,
} from "./culture_sources.mjs";
import { dependencies } from "./next.mjs";
import { marked } from "./diacritic_conformance.mjs";
import { here, root, workspaceRoot } from "./house_support.mjs";

// The kit's own delivery and house content walls: the manifest, the release,
// the box, and (for a workspace house mid-migration) the cross-unit idiom this
// house has documented and the ASCII filename rule. Each is a wall the kit
// ships, held here the same way this house holds every other wall - a finding
// list asked to be empty. `verifyRegistry`, the kit's own registry drift check,
// is deliberately not among these: it builds from the collection DIRECTORY
// alone, so on this hybrid house it reports every migrated culture as a
// missing directory. `tests/registry_hybrid.mjs`'s `drift()` replaces it, the
// same way it replaces the kit's registry build for this house's own reasons.
describe("Cultures house: the walls the kit holds", () => {
  it("the gates manifest matches the CI workflow's own job ids", () => {
    const findings = verifyGatesAgainstCi(workspaceRoot);
    expect(findings, findings.join("; ")).toEqual([]);
  });

  it("the release workflow is pinned to the changesets v2 input names", () => {
    const findings = verifyRelease(workspaceRoot);
    expect(findings, findings.join("; ")).toEqual([]);
  });

  it("registry.json's promise is held against the tarball (packing completeness)", () => {
    const packed = packedFiles(workspaceRoot);
    // checkPacking proves a manifest's own promise ships (khai.members, `main`,
    // an on-disk playwright_instructions.md) - the tongues package's failure
    // mode, `files: ["*.md"]` reaching only the package root while every one of
    // its sixty varieties lived below it. checkRegistryPacking proves the
    // registry's promise against the same box: a shipped entry's anchor file is
    // in the tarball, a delegated entry names a declared dependency and ships no
    // file of its own here.
    const findings = [
      ...checkPacking(workspaceRoot, packed),
      ...checkRegistryPacking(workspaceRoot, packed),
    ].map((f) =>
      f.missing ? `${f.package}: ${f.missing.join(", ")}` : `${f.package}/${f.path}: ${f.reason}`,
    );

    // Two of this house's own packing incidents sit outside both kit walls, and
    // stay local for it. `checkRegistryPacking` reads only the PRIMARY
    // collection a package's manifest declares (`resolveCollection`), which for
    // the umbrella is "cultures" - `groups` is a second, house-specific
    // collection the kit has no way to know about, and the house shipped a
    // registry describing nineteen groups with none of them in the box before
    // this existed. And for a SHIPPED entry it proves only the anchor file
    // (`play_<id>.md`) is packed, not every member - the anchor is what the
    // tongues incident above would have failed on, but a `files` glob that
    // reaches play_*.md and not persona_*.md would still pass it. So both stay
    // held here, off the same box the kit walls above were just given.
    const registry = JSON.parse(readFileSync(join(root, "registry.json"), "utf8"));
    const box = packed.get("@chbrain/khai-cultures") ?? new Set();
    const promised = (kind, entries) =>
      (entries ?? []).flatMap((e) => (e.members ?? []).map((m) => `${kind}/${e.id}/${m.file}`));
    const shipped = (registry.cultures ?? []).filter((e) => !e.package);
    // A migrated group's files are not in the umbrella's box and must not be
    // looked for there. Read that off `source.path`, the same way the hybrid
    // registry does: an entry still under the umbrella carries a path below it,
    // one that has left carries the empty string that says its package root IS
    // the unit. Asking the umbrella to ship what it no longer holds is how a
    // green wall would have gone red on a correct move.
    const shippedGroups = (registry.groups ?? []).filter((e) => e.source?.path !== "");
    const missing = [
      ...promised("cultures", shipped).filter((p) => !box.has(p)),
      ...promised("groups", shippedGroups).filter((p) => !box.has(p)),
    ];
    if (missing.length)
      findings.push(
        `registry.json names ${missing.length} file(s) not in the tarball, e.g. ${missing.slice(0, 5).join(", ")}`,
      );
    if (!box.has("registry.json")) findings.push("registry.json itself is not in the tarball");

    expect(findings, findings.join("; ")).toEqual([]);
  }, 120000);

  it("management converges with the blueprint core", () => {
    const errors = checkManagement(workspaceRoot);
    expect(errors, errors.join("; ")).toEqual([]);
  });

  it("no relative link escapes its own unit, beyond the house's declared idiom", () => {
    const house = resolveHouse(workspaceRoot, { name: "@chbrain/khai-cultures" });
    const policy = loadIsolationPolicy(workspaceRoot);
    const findings = isolationErrors(house, { allow: policy.allow });
    expect(findings, findings.map((f) => f.message).join("; ")).toEqual([]);
  });

  it("every unit's filenames are ASCII", () => {
    const house = resolveHouse(workspaceRoot, { name: "@chbrain/khai-cultures" });
    const findings = filenameErrors(house);
    expect(findings, findings.map((f) => f.file).join("; ")).toEqual([]);
  });
});

// The engines a culture runs on are CONTENT, not tooling. npm's *production*
// dependency graph is the single source of truth for which engines a culture
// carries (the zip bundler derives the set from it, never a hardcoded list), so
// every @chbrain/khai-engine-* must be a runtime `dependency`. An engine stranded
// in `devDependencies` is present for the test run (engine discovery scans
// node_modules) yet invisible to the production graph — green here, but dropped
// from the bundle. That split is the exact gap this guard closes: a finding, not
// a style choice.
describe("Cultures house: engines are declared as content dependencies", () => {
  const pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
  const isEngine = (name) => name.startsWith("@chbrain/khai-engine-");

  it("no engine is stranded in devDependencies", () => {
    const stranded = Object.keys(pkg.devDependencies ?? {}).filter(isEngine);
    expect(
      stranded,
      `engines are content and must be runtime dependencies; move to "dependencies": ${stranded.join(", ")}`,
    ).toEqual([]);
  });

  it("the spine engine is a runtime dependency (the contract every culture runs on)", () => {
    expect(Object.keys(pkg.dependencies ?? {})).toContain("@chbrain/khai-engine-spine");
  });
});

// `khai-guard changeset-check` has read the corpus (every changeset names a
// package this workspace has) since 0.3.1 - see `workspaceNames` in
// @chbrain/khai-guard/index.mjs. What is not the guard's to check is which
// LANE a repair to that corpus lands on: `.changeset/**` has to be a rider, not
// `shared`, because `shared` is for build artefacts that are never the whole of
// a change, and a changeset REPAIR (a wrong package name, nothing else touched)
// is exactly that - the misfits house hit this once, with nowhere to commit the
// fix.
describe("Cultures house: a changeset can be committed on a lane the guard computes", () => {
  it("holds .changeset/** as a rider, not as shared", () => {
    const { branchScope } = JSON.parse(
      readFileSync(join(workspaceRoot, "khai-guard.config.json"), "utf8"),
    );
    expect(branchScope.shared).not.toContain(".changeset/**");
    expect(branchScope.riders).toContainEqual({ pattern: ".changeset/**", fallback: "governance" });
  });
});

// The sunken is the third collection, and it is a referencing one like groups:
// it collects what the living are holding and adds a line of its own. These
// hold the two things that make it a collection rather than a special case -
// the count cannot move by it existing, and its name cannot say what it is.
// See management/orders/order_the_sunken.md.
describe("Cultures house: the sunken is a collection and not a culture", () => {
  it("names a sunken unit exactly as a group and a culture are named", () => {
    // The kind lives in the manifest and never in the name. A `khai-sunken-*`
    // prefix was proposed and is wrong: it would make the sunken the one unit
    // type that spells its kind in its name, and `groupName` already settled
    // the question for the first unit type that was not a culture.
    for (const id of ["cimbri", "unetice", "two_words"]) {
      expect(sunkenName(id)).toBe(groupName(id));
      expect(sunkenName(id)).toBe(productionName(id));
    }
    expect(sunkenName("cimbri")).toBe("@chbrain/khai-cultures-cimbri");
  });

  it("reads both homes, and an absent collection is empty and not a throw", () => {
    // The umbrella half before the collection is declared: no directory is a
    // fact about the house, not a fault. `houseGroups` answers the same way for
    // a house with no groups, and a throw here would make the readers
    // undeployable in the PR that adds them.
    expect(Array.isArray(houseSunken())).toBe(true);
    expect(Array.isArray(migratedSunken())).toBe(true);
    for (const [id, dir] of houseSunken()) {
      expect(typeof id).toBe("string");
      expect(dir.endsWith(`/sunken/${id}`)).toBe(true);
    }
  });

  it("no unit marked other than a production is in the culture list", () => {
    // The property `order_the_sunken.md` puts first, and it was broken once by
    // the order's own first play: `cultures()` DEFINES the membership that
    // `cultureUnits` merely splits on, so a marker it does not read walks in.
    //
    // Asserted over both non-production markers together rather than over the
    // sunken alone. There is no sunken unit in the house until the collection
    // is declared, so a sunken-only assertion would pass by iterating nothing -
    // and would still pass if the filter line were deleted. The groups give the
    // same line real data today, and the sunken joins them without a new test.
    const dirs = new Set(cultures().map((c) => c.dir));
    const ids = new Set(cultures().map((c) => c.id));
    const notCultures = [...migratedGroups(), ...migratedSunken()];
    expect(notCultures.length, "no non-production unit to check the filter with").toBeGreaterThan(
      0,
    );
    const leaked = notCultures.filter((u) => dirs.has(u.dir) || ids.has(u.id));
    expect(
      leaked.map((u) => u.name),
      `counted as cultures: ${leaked.map((u) => u.name).join(", ")}`,
    ).toEqual([]);
  });

  it("the three markers are disjoint, so no unit is counted twice or not at all", () => {
    // `khai.production`, `khai.group` and `khai.sunken` are what tell the kinds
    // apart now that the NAME does not. A package carrying two of them is a
    // mistake this house would rather fail on than average out.
    // Read off every package manifest rather than off `productions()`, which
    // is already filtered to `khai.production` and so could never hold a unit
    // carrying a second marker - it would iterate 113 packages and find, by
    // construction, nothing.
    const dir = join(workspaceRoot, "packages");
    const seen = [];
    for (const e of readdirSync(dir, { withFileTypes: true })) {
      if (!e.isDirectory()) continue;
      const file = join(dir, e.name, "package.json");
      if (!existsSync(file)) continue;
      const khai = JSON.parse(readFileSync(file, "utf8")).khai ?? {};
      const marks = ["production", "group", "sunken"].filter((m) => khai[m]);
      if (marks.length > 0) seen.push({ name: e.name, marks });
    }
    expect(seen.length, "no marked package found: the walk is looking in the wrong place").toBe(
      productions().length + migratedGroups().length + migratedSunken().length,
    );
    const doubled = seen.filter((u) => u.marks.length > 1);
    expect(
      doubled.map((u) => `${u.name}: ${u.marks.join(" + ")}`),
      "a package carrying more than one kind marker",
    ).toEqual([]);
  });

  it("the link walls can see the sunken, which for a while they could not", () => {
    // The failure this closes: `units()` was `unitsOf(house)` plus `groups()`,
    // and `unitsOf` walks `cultures/` and the packages. A sunken unit under the
    // umbrella is in neither, so `links`, `link-names` and `type-titles` all
    // reported "no unit written" about the thirteen files of the first sunken
    // play. Not a refusal by name - they never saw it. Found by planting
    // `[REFERENCES.md](REFERENCES.md)` in one of those files and watching the
    // wall stay green.
    const here = sunken();
    expect(here.length, "no sunken unit to check the readers with").toBeGreaterThan(0);
    const byDir = new Map(linkUnits().map((u) => [u.dir, u]));
    for (const s of here) {
      expect(byDir.has(s.dir), `${s.id} is not in units(), so no link wall reads it`).toBe(true);
      expect(mds(s.dir).length, `${s.id} contributes no markdown to the walls`).toBeGreaterThan(0);
    }
  });

  it("the changeset gate treats a sunken add as it treats a group add", () => {
    // Not because a sunken play moves the count - it does not, and neither does
    // a group - but because both ADD umbrella content that has to be
    // republished. The glob list is named for the count and does the other job;
    // leaving `sunken/` out of it lets a play merge green and publish nothing.
    const { changesetPolicy } = JSON.parse(
      readFileSync(join(workspaceRoot, "khai-guard.config.json"), "utf8"),
    );
    const globs = changesetPolicy?.countDrivenAdd ?? [];
    expect(globs).toContain("packages/khai-cultures/groups/*/play_*.md");
    expect(globs).toContain("packages/khai-cultures/sunken/*/play_*.md");
  });
});

// The tongues package is not a culture and must never need one. This runs on
// every pull request rather than as a ratchet, because the package started clean
// and has no debt to pay down: the moment a variety reaches back into a culture,
// the tongues have stopped being a shared vocabulary and become an extract.
describe("Cultures house: the tongues stand alone", () => {
  it("no variety reaches back into a culture", () => {
    const findings = standalone();
    expect(findings, findings.join("; ")).toEqual([]);
  });
});
