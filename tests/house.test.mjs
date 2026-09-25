import { describe, it, expect } from "vitest";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { readFileSync, readdirSync, existsSync, mkdtempSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { execFileSync } from "node:child_process";
import {
  validateProject,
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
  validateInstanceFile,
} from "@chbrain/khai-tests";
import { referenceCard } from "@chbrain/khai-arch";
import { validateProjectLanguages } from "@chbrain/khai-language";
import {
  coverage,
  cultureIds as coveredCultureIds,
  allWaivers,
  touchedCultures,
  report as coverageReport,
} from "./company_coverage.mjs";
import { conformance } from "./culture_conformance.mjs";
import { cultureIds as auditCultureIds, dirFor, readCulture } from "./plot_line_audit.mjs";
import { cueDigest, statusOf, readings, repoUrl } from "./plot_line_readings.mjs";
import { packageFiles as tonguePackageFiles, standalone, TONGUES } from "./tongues_standalone.mjs";
import { repeats, register, proseRepeats, findings as nameFindings } from "./link_names.mjs";
import { declared, restatesType } from "./type_titles.mjs";
import { charged, isMarkdown, units as linkUnits } from "./link_resolution.mjs";
import { substanceFindings, sceneFindings, FLOOR } from "./staging.mjs";
import {
  widths,
  noMotherTongue,
  projection as personaProjection,
  soleTongue,
  languageOf,
  wiring as personaWiring,
} from "./persona_wiring.mjs";
import {
  cultures,
  cultureDir,
  productions,
  migratedGroups,
  migratedSunken,
  houseSunken,
  sunkenName,
  groupName,
  productionName,
  cultureUnits,
  notCultureNote,
  MONOLITH_DIR,
} from "./culture_sources.mjs";
import { hasOrigin } from "./plot_zero.mjs";
import {
  RUNGS,
  SETTLED,
  rungOf,
  rungName,
  median as rungMedian,
  survey as nextSurvey,
  order as cultureOrder,
  queue as nextQueue,
  WEIGHTS,
  scoreOf,
  levelOf,
  next as nextCulture,
  owed,
  asks,
  sunkenUnits,
} from "./next.mjs";
import {
  plotYear,
  LATEST,
  backwards,
  units as plotUnits,
  findings as orderFindings,
  plotNumber,
  BRACKETS,
} from "./plot_sequence.mjs";
import {
  body as proseBody,
  declaredLanguage,
  marked,
  markCount,
  wordCount,
  describe as describeFinding,
  flat,
  accentUsing,
  findings as flatFindings,
} from "./diacritic_conformance.mjs";
import {
  groups as allGroups,
  groupIds,
  coverage as groupCoverage,
  findings as groupFindings,
  pathGroup,
} from "./group_coverage.mjs";
import { findings as productionFindings, umbrellaFindings } from "./production_packages.mjs";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..", "packages", "khai-cultures");
// The repository root: where the gates manifest, the release workflow, and the
// workspace's own package.json live, and where the kit's delivery and house
// content walls are meant to be asked from.
const workspaceRoot = join(here, "..");
// The umbrella's own collection dir, named by the resolver rather than joined
// here: during the walk it holds only the cultures that have not migrated yet,
// and at the end of the walk it may not exist at all.
const culturesDir = MONOLITH_DIR;

// The khai types every culture must field. A culture is a full play, so the set
// is the play canon; the cultural meaning of each is the house contract
// (REFERENCE.md): plot = a historical event, position = a language position,
// place = the capital, piece = a culture-defining artifact, pitch = the Hofstede
// layer, persona = the people.
const REQUIRED_TYPES = [
  "play_",
  "pitch_",
  "plot_",
  "persona_",
  "position_",
  "place_",
  "process_",
  "piece_",
];

// Where each culture sits, asked of the resolver. During the walk that is two
// places, and a local readdir of `cultures/` would quietly stop testing every
// culture that had migrated - each one dropping out of the suite on the day it
// became a package, which is the day it most needs testing.
function cultureDirs() {
  return cultures().map((c) => [c.id, c.dir]);
}

// Every culture in the house conforms to the canon. Green on an empty house (no
// cultures yet); as cultures land under cultures/, each is validated against its
// khai type, the wiring the installed engines declare, and the cultures registry.
describe("Cultures house: content conforms to the canon", () => {
  it("every instance validates against the canon (zero findings)", () => {
    // Scope the canon scan to the content collections (cultures/ + groups/).
    // management/ is the voice layer, not content: it is chain-owned wiring held
    // to the blueprint (see the management test below), and it carries no
    // declared culture, so the installed content engines (the language engine in
    // particular, which requires every persona to link a language-crossing leaf
    // in its Projection) must not run over the management cast — the chain's
    // Choregos (Pericles, Nicias) speaks no culture's tongue.
    const contentDirs = ["cultures", "groups"]
      .map((d) => join(root, d))
      .filter((d) => existsSync(d));
    const results = contentDirs.flatMap((dir) => validateProject({ root, contentDir: dir }));
    // A migrated culture is validated as its own package, rooted on itself, so
    // the wiring exemptions and the package-specifier resolver come from the
    // dependencies IT declares rather than from the umbrella's.
    for (const prod of productions())
      for (const err of productionFindings(prod))
        results.push({ file: `${prod.name}/${err}`, errors: [err] });
    for (const err of umbrellaFindings())
      results.push({ file: "packages/khai-cultures", errors: [err] });
    const tongueFiles = tonguePackageFiles().filter(
      (file) => !["README.md", "REFERENCES.md"].includes(file.split("/").pop()),
    );
    expect(tongueFiles).toContain("de/position_language_de_ch.md");
    for (const file of tongueFiles) {
      const path = join(TONGUES, file);
      const errors = validateInstanceFile(readFileSync(path, "utf8"), {
        baseDir: dirname(path),
      })
        .filter((finding) => finding.level === "fail")
        .map((finding) => finding.message);
      results.push({ file: path, errors });
    }
    // Two of the kit's registry findings are true of a hybrid house and are not
    // faults: a migrated culture is in the registry with no directory under
    // cultures/, so `validateCollectionRegistry` reports the missing directory
    // and then reports the file as out of date with a build that only counts
    // directories. They are dropped here because they are REPLACED, not waived:
    // `tests/registry_hybrid.mjs` recomputes the whole registry - both halves
    // built by the kit - and `tests/migration.test.mjs` asserts it has no drift.
    // Dropping them without that replacement would leave the house with no drift
    // check at all, which is the shape of failure this repository keeps finding.
    // A third finding of the same kind, and it arrives with the link rule that
    // fixed the groups. `validateCollectionRegistry` rebuilds the registry to
    // compare against, and that rebuild sees only the umbrella's directories, so
    // a group whose members have all migrated derives no references and the
    // kit's new "a group is defined by what it references" error stops the
    // rebuild outright. The reference is not missing - DACH casts all three, by
    // package specifier - and reading that shape needs a packageIds map the kit
    // has no way to build for itself. `buildRegistry` takes one; `verifyRegistry`
    // and `validateCollectionRegistry` do not yet, which is a gap in the kit and
    // NOT this house's to paper over: it is filed for khai-tests, and until it
    // lands the finding is dropped on exactly the terms the other two are - the
    // kit's drift check is REPLACED here by registry_hybrid.mjs, which passes
    // the map, rebuilds both halves and reports no drift.
    //
    // A migrated GROUP is the same finding with a different noun, and it arrives
    // for the same reason: `validateCollectionRegistry` walks `groups/` and a
    // group that has left is not in it. Dropped on the same terms, and the
    // replacement is the same one - `registry_hybrid.mjs` now reconciles the
    // groups as well and `drift()` asks them the three questions it asks the
    // cultures, so the check is moved rather than lost.
    const migrated = productions().map((p) => p.id);
    const movedGroups = migratedGroups().map((g) => g.id);
    const hybridNoise = (file, e) =>
      file.endsWith("registry.json") &&
      (/registry\.json is out of date with its source/.test(e) ||
        /could not rebuild registry\.json to check it for drift/.test(e) ||
        migrated.some((id) => e.includes(`declares culture "${id}"`)) ||
        movedGroups.some((id) => e.includes(`declares group "${id}"`)));
    // The canon does not yet admit `mother_tongue` as a position extra, but the
    // tongues package owns that key as wiring rather than prose: its build turns
    // the false values into `khai.wiring.noMotherTongue`, and persona_wiring.mjs
    // enforces that list. Drop only the canon's exact unknown-key finding here,
    // for this package, because that check is REPLACED by the build plus the
    // persona-wiring contract. Any other finding on either file still gates.
    // khai-arch admitting the key would let this replacement disappear.
    const tongueWiringNoise = (file, e) =>
      file.startsWith(`${TONGUES}/`) && e === "unknown frontmatter key: mother_tongue";
    const errors = results
      .flatMap((r) => (r.errors ?? []).map((e) => [r.file, e]))
      .filter(([file, e]) => !hybridNoise(file, e) && !tongueWiringNoise(file, e))
      .map(([file, e]) => `${file}: ${e}`);
    expect(errors).toEqual([]);
    // THIS SCAN WAS 69 SECONDS AND IS NOW ABOUT 4, AND THE TIMEOUT IS BACK TO
    // THE SUITE'S DEFAULT ON PURPOSE.
    //
    // #623 gave this test its own 600s limit after it timed out on CI, on the
    // reading that the scan is O(house) and the house is growing. The reading
    // was wrong. Measured: the umbrella's whole content collection - 247
    // cultures and 14 groups - validates in 1.5s, while 72 packages took 65.5s.
    // 247 in one and a half seconds against 72 in sixty-five is not scale, it is
    // a bug, and it was `parentOf` walking every culture and re-reading every
    // geo.json once per sub-national package. See tests/culture_conformance.mjs.
    //
    // So the ceiling stays tight, because A TIGHT TIMEOUT IS A REGRESSION
    // DETECTOR. At 600s the same fault could come back and cost a minute a run
    // with nobody noticing; at the suite default it announces itself. If this
    // ever times out again, the first question is what became quadratic, not
    // what number to raise.
  });

  it("the management cast is complete: every position has a persona", () => {
    // The voice layer mirrors a plays house (REFERENCE.md, the blueprint in
    // @chbrain/khai-stage): the shared core is held verbatim and each position
    // is held by a named persona. Engine wiring is out of scope here (see above),
    // so this checks only the casting law: a needed position without a persona is
    // a failure. Run `npx khai-tests management check .` for the full blueprint
    // convergence gate.
    const mgmt = join(root, "management");
    if (!existsSync(mgmt)) return;
    const files = readdirSync(mgmt).filter((f) => f.endsWith(".md"));
    const positions = files.filter((f) => f.startsWith("position_"));
    const linked = new Set();
    for (const p of files.filter((f) => f.startsWith("persona_")))
      for (const m of readFileSync(join(mgmt, p), "utf8").matchAll(/position_[a-z0-9_]+\.md/g))
        linked.add(m[0]);
    const orphans = positions.filter((p) => !linked.has(p));
    expect(orphans, `unheld positions: ${orphans.join(", ")}`).toEqual([]);
  });

  it("every instance satisfies the language policy", () => {
    // Point the validator at the content collection; its default (root/plays)
    // does not exist in a cultures house, which would silently no-op the check.
    const results = [
      ...validateProjectLanguages(root, { contentDir: culturesDir }),
      ...productions().flatMap((p) => validateProjectLanguages(p.dir, { contentDir: p.dir })),
    ];
    const errors = results.flatMap((r) => r.errors.map((e) => `${r.file}: ${e}`));
    expect(errors).toEqual([]);
    // Two corrections compounded into real work here. khai-language 0.1.24 derives
    // the scanned chapter set from khai-arch instead of a hand-typed list of
    // fifteen, which added 43% of the house's prose; and trimming khai.languages
    // from 34 to 18 switched detection back on for sixteen languages that were
    // being skipped, English among them. Measured at 36.9s over 6,171 files after
    // both. The old 30s ceiling was set when the gate read less than half of this.
  }, 120000);

  it("house reference warrant conforms to LORE", () => {
    const refPath = existsSync(join(root, "REFERENCES.md"))
      ? join(root, "REFERENCES.md")
      : join(root, "REFERENCE.md");
    expect(existsSync(refPath)).toBe(true);
    const refText = readFileSync(refPath, "utf8");
    expect(() => referenceCard(refText)).not.toThrow();
  });

  // Note: strict per-culture isolation was retired in favour of ownership +
  // resolvable casting (see REFERENCE.md and the design of record). A play may
  // cast a file in another play's directory; the engine's link check
  // (validateProject, above) is the guard — it proves every cast resolves to a
  // real owned file, so a broken cross-play link is already a finding there.
});

// The mandatory setup: a culture is a complete theatre. Every culture/<id>/
// fields the full khai type set and the casting laws (REFERENCE.md). Empty house
// registers no per-culture cases, so it stays green until the first culture lands.
describe("Cultures house: every culture is a complete theatre", () => {
  it("the house holds cultures, in one home or the other", () => {
    expect(cultures().length).toBeGreaterThan(0);
  });

  for (const [id, dir] of cultureDirs()) {
    it(`culture "${id}" uses every khai type with the mandatory minimums`, () => {
      const files = readdirSync(dir).filter((f) => f.endsWith(".md"));
      const count = (prefix) => files.filter((f) => f.startsWith(prefix)).length;
      const errors = [];

      for (const t of REQUIRED_TYPES) {
        if (count(t) < 1) errors.push(`missing ${t}*.md`);
      }
      if (count("play_") !== 1)
        errors.push(`exactly one play_ anchor required, found ${count("play_")}`);
      if (count("plot_") < 3) errors.push(`>=3 plot_ (history) required, found ${count("plot_")}`);
      if (count("persona_") < 2) errors.push(`>=2 persona_ required, found ${count("persona_")}`);

      // Casting is type-agnostic: a plot casts whatever khai type the scene
      // needs, not necessarily a persona. The canon already enforces coverage
      // (every plot casts >=1 element of its play's Company, any type) via
      // validateProject above, so the per-plot check is left to the engine.

      // Front matter: a culture carries its own README + REFERENCES, like a play.
      for (const doc of ["README.md", "REFERENCES.md"]) {
        if (!existsSync(join(dir, doc))) errors.push(`missing ${doc}`);
      }

      expect(errors, `culture "${id}": ${errors.join("; ")}`).toEqual([]);
    });
  }
});

// The company-coverage ratchet (tests/company_coverage.mjs) gates a PR on the
// cultures it touches: touch one and it must come out at zero. The gate needs
// the diff, so it runs in CI, not here. What runs here is the hygiene of its
// escape valve: a waiver is a written reason for one Company element that
// cannot be cast without contrivance (a persona born after the last plot), and
// a waiver that names nothing real is how a valve turns into a hole.
describe("Cultures house: the company-coverage waivers stay honest", () => {
  const waivers = allWaivers();
  const ids = new Set(coveredCultureIds());

  it("every waiver file sits in a real culture", () => {
    const unknown = Object.keys(waivers).filter((id) => !ids.has(id));
    expect(unknown, `waived cultures that do not exist: ${unknown.join(", ")}`).toEqual([]);
  });

  it("every waiver carries a reason and points at an uncast Company element", () => {
    const errors = [];
    for (const [id, entries] of Object.entries(waivers)) {
      if (!ids.has(id)) continue;
      const { waived } = coverage(id);
      for (const [file, reason] of Object.entries(entries)) {
        if (typeof reason !== "string" || reason.trim().length < 12)
          errors.push(`${id}/${file}: a waiver needs a written reason`);
        else if (!waived.includes(file))
          errors.push(`${id}/${file}: stale waiver, this element is cast or gone; drop it`);
      }
    }
    expect(errors, errors.join("; ")).toEqual([]);
  });

  // Two guarantees that were once confused for each other.
  //
  // The gate destructures four keys off coverage() and reads their lengths.
  // Three of its returns used to carry only three, so the gate died on a
  // TypeError deep inside itself - a throw that says nothing while looking as
  // though it failed on the content, which is the worst of both. Every return
  // carrying four keys fixed that, and this still holds it.
  //
  // But that fix also handed a CLEAN BILL to any id that resolves to no
  // directory: `nordics` (a group, which is a unit and not a culture) and
  // `no_such_culture_at_all` (a typo) both came back spotless, indistinguishable
  // from a culture that had been read. A named refusal is not the same failure
  // as a TypeError: it says which id, and which module should have been asked.
  // plot_zero.mjs already refuses this exact case - "fail closed, loudly, and
  // never in the direction of green" - so the house held two policies for one
  // situation. It now holds one.
  it("coverage answers with every key for a culture it can resolve", () => {
    for (const id of coveredCultureIds().slice(0, 5)) {
      const c = coverage(id);
      for (const key of ["dead", "waived", "superseded", "company"])
        expect(Array.isArray(c[key]), `coverage("${id}").${key} must be an array`).toBe(true);
    }
  });

  it("refuses an id it cannot resolve rather than reporting it clean", () => {
    for (const id of ["nordics", "no_such_culture_at_all"]) {
      expect(() => coverage(id), `coverage("${id}") must refuse, not answer`).toThrow(
        /has no culture directory/,
      );
      expect(() => conformance(id), `conformance("${id}") must refuse, not answer`).toThrow(
        /has no culture directory/,
      );
    }
  });
});

// A unit is anything the house packs; a culture is a unit the count is taken
// over, and a migrated group is the first thing that is one without being the
// other. Every content wall used to decide what to do about that separately,
// which is to say by accident: one crashed, two reported the group as a culture
// they had checked, one never saw it. The answer is one function now, and these
// hold it there. See management/orders/order_a_group_is_not_a_culture.md.
describe("Cultures house: a group is a unit and not a culture", () => {
  it("cultureUnits splits a migrated group off from the cultures", () => {
    const groups = migratedGroups().map((g) => g.id);
    const real = coveredCultureIds().slice(0, 2);
    const { cultures: kept, notCultures } = cultureUnits([...real, ...groups]);
    expect(kept).toEqual(real);
    expect(notCultures).toEqual(groups);
  });

  it("no migrated group is in the culture list, so none can move the count", () => {
    const ids = new Set(coveredCultureIds());
    const leaked = migratedGroups()
      .map((g) => g.id)
      .filter((id) => ids.has(id));
    expect(leaked, `groups counted as cultures: ${leaked.join(", ")}`).toEqual([]);
  });

  it("notCultureNote is silent for none and names them otherwise", () => {
    expect(notCultureNote([])).toBeNull();
    const line = notCultureNote(["@scope/a", "@scope/b"]);
    expect(line).toContain("2 authored unit(s) are not cultures");
    expect(line).toContain("@scope/a, @scope/b");
  });

  // The fail-open this order was written to remove: an id with no directory
  // used to answer "yes, it has plot_00", so the wall reported a marker it
  // never looked for.
  it("plot_zero refuses an id that is not a culture instead of passing it", () => {
    expect(() => hasOrigin("no_such_culture_at_all")).toThrow(/no culture directory/);
    for (const g of migratedGroups()) expect(() => hasOrigin(g.id)).toThrow(/no culture directory/);
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

// The group ratchet reads groups the way the culture ratchets read cultures, and
// what runs here is the hygiene of its inputs: the gate itself needs a diff and
// runs in CI. Nineteen of twenty-one groups owe something today and that is not
// an error - the ratchet fires on what a pull request opens, so the debt shrinks
// and the house stays green. See management/orders/order_the_group_ratchet.md.
describe("Cultures house: the group ratchet reads both homes", () => {
  it("sees every group, under the umbrella and in a package", () => {
    const ids = groupIds();
    expect(ids.length).toBeGreaterThan(0);
    expect(new Set(ids).size, "a group in two places at once").toBe(ids.length);
    for (const g of migratedGroups()) expect(ids).toContain(g.id);
  });

  it("maps a path in either home back to its group", () => {
    for (const g of allGroups()) {
      const rel = g.dir.split("/packages/")[1];
      expect(pathGroup(`packages/${rel}/play_x.md`), `${g.id} in ${g.dir}`).toBe(g.id);
    }
    // Derived, never typed: a culture's path is the resolver's to know, and
    // this file is held to that by migration.test.mjs.
    const someCulture = cultures()[0];
    const cultureRel = someCulture.dir.split("/packages/")[1];
    expect(pathGroup(`packages/${cultureRel}/play_x.md`), someCulture.id).toBeNull();
    expect(pathGroup("tests/house.test.mjs")).toBeNull();
  });

  it("charges only a group's own files, never a member it points at", () => {
    // Every group names its members as package-qualified links out. If those
    // were counted, every group would owe one dead entry per member forever.
    for (const id of groupIds()) {
      const { dead } = groupCoverage(id);
      for (const f of dead) expect(f).not.toMatch(/^play_/);
    }
  });

  it("answers with the same shape for a group the house has not got", () => {
    const c = groupCoverage("no_such_group_at_all");
    for (const key of ["unlinked", "orphans", "broken", "dead", "plots"])
      expect(Array.isArray(c[key]), `coverage.${key} must be an array`).toBe(true);
    expect(groupFindings("no_such_group_at_all")).toEqual([]);
  });

  it("the four whole groups stay whole, so a regression in them is caught here", () => {
    // These four were brought up to the standard by hand before the wall
    // existed. They are the only groups that can be held at zero today, so they
    // are held here rather than only in a gate that needs a diff.
    for (const id of ["nordics", "these_islands"])
      expect(groupFindings(id), `${id}: ${groupFindings(id).join("; ")}`).toEqual([]);
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

// Every other gate checks that something EXISTS - that a plot has a Cue, that a
// Company element is named in some Stage. None of them opens the chapter. A pull
// request arrived whose chapters read `(cue)` and `(proj)`, whose every plot
// staged the identical full Company, and whose Tension said so in prose, and the
// whole suite was green. Both facts are decidable and both start clean across all
// 297 cultures, so they are held outright rather than paid down. Neither is a
// quality bar: what a chapter should SAY is the reading the defining question
// asks for, and no counter stands in for it.
describe("Cultures house: a chapter is written, a plot stages a scene", () => {
  it(`no canon chapter is a placeholder or under ${FLOOR} characters`, () => {
    const findings = substanceFindings();
    expect(findings, findings.slice(0, 12).join("; ")).toEqual([]);
  });

  it("no culture stages the same cast in every plot", () => {
    const findings = sceneFindings();
    expect(findings, findings.join("; ")).toEqual([]);
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

// The persona-wiring gate reads its two rules out of two manifests rather than
// carrying them: the widths a grip can take from the language engine, and the
// tongues nobody acquires first from the tongues package. Neither is asserted
// by value here - the engine may ship a new width and the package a new flag,
// and both are theirs to change. What is asserted is that the reading still
// finds something, because a rule read as an empty set is a gate that has gone
// quiet without going red.
describe("Cultures house: the persona-wiring contract is readable", () => {
  it("the language engine still declares widths", () => {
    expect(widths().size).toBeGreaterThan(0);
  });

  it("the tongues package still declares which tongues nobody acquires first", () => {
    expect(noMotherTongue().size).toBeGreaterThan(0);
  });

  // The care in the mother-tongue rule is what it DECLINES to answer. A
  // Projection that links several tongues names a mother tongue, a worn one and a
  // followed one in the same paragraph, and no distance test separates them:
  // us_california/persona_chloe.md says Californian English is her mother tongue
  // and Spanish is what she puts on like a coat, and the coat sits closer to the
  // mother-tongue process than the mother tongue does. So one tongue is asked and
  // several are not.
  it("declines to name a mother tongue when the Projection links more than one", () => {
    // Real files, because the first version of this test linked two targets that
    // did not exist: soleTongue answered null because nothing resolved, the guard
    // was never reached, and weakening the guard did not fail the test. A probe
    // caught it. The tongues have to be on disk for the guard to be the thing
    // under test.
    const tmp = mkdtempSync(join(tmpdir(), "khai-mother-"));
    writeFileSync(join(tmp, "position_language_xx.md"), "---\nlanguage: xx\n---\n");
    writeFileSync(join(tmp, "position_language_yy.md"), "---\nlanguage: yy\n---\n");
    const one = "[X](position_language_xx.md) is her [mother](process_speaking_mother_tongue.md)";
    const two = `${one}, and [Y](position_language_yy.md) she [wears](process_speaking_worn.md)`;
    expect(soleTongue(one, tmp)?.language).toBe("xx");
    expect(soleTongue(two, tmp)).toBeNull();
    rmSync(tmp, { recursive: true, force: true });
  });

  // One tongue link answers which tongue, and not whose grip. Okinka Pampa says
  // in her own prose that her language is Bijago - a tongue this house does not
  // hold - and the only tongue she LINKS is the Portuguese she carries from far
  // off. A first cut read that link as her mother tongue and charged her for prose
  // that was right, so the tongue must now sit nearer a mother grip than any other.
  it("declines the one tongue when another grip is closer to it than the mother's", () => {
    const tmp = mkdtempSync(join(tmpdir(), "khai-grip-"));
    writeFileSync(join(tmp, "position_language_xx.md"), "---\nlanguage: xx\n---\n");
    const far = " and so on,".repeat(12);
    const borrowed =
      `her language is Bijago, which she [speaks](process_speaking_mother_tongue.md)${far} ` +
      "the [xx](position_language_xx.md) she [carries](process_speaking_borrowed.md)";
    expect(soleTongue(borrowed, tmp)).toBeNull();
    // and the other way round: beside the mother grip, it still answers
    const mother =
      "the [xx](position_language_xx.md) she [speaks](process_speaking_mother_tongue.md)" +
      `${far} Latin she [writes](process_writing_polished.md)`;
    expect(soleTongue(mother, tmp)?.language).toBe("xx");
    rmSync(tmp, { recursive: true, force: true });
  });

  it("reads a Projection out of a file and nothing else", () => {
    const text =
      "---\nkhai: persona\n---\n\n## Bio\n\nbio text\n\n## Projection\n\nproj text\n\n## Stake\n\nstake\n";
    expect(personaProjection(text).trim()).toBe("proj text");
    expect(personaProjection("no projection here")).toBe("");
  });

  // Eighteen personas carry no `language:` and are entitled to their play's, by
  // the language engine's own file -> play -> house precedence. A first draft of
  // this rule called the missing field a finding, which would have invented a
  // requirement the canon declines to make. The precedence is what is asserted -
  // an earlier version of this test only checked that a message no longer in the
  // code was absent, which could never fail.
  it("resolves a persona's language file first and then its play", () => {
    const tmp = mkdtempSync(join(tmpdir(), "khai-inherit-"));
    writeFileSync(join(tmp, "play_x.md"), "---\nkhai: play\nlanguage: de\n---\n");
    expect(languageOf("---\nkhai: persona\nlanguage: nds\n---\n", tmp)).toBe("nds");
    expect(languageOf("---\nkhai: persona\n---\n", tmp)).toBe("de");
    rmSync(join(tmp, "play_x.md"));
    expect(languageOf("---\nkhai: persona\n---\n", tmp)).toBeNull();
    rmSync(tmp, { recursive: true, force: true });
  });

  // A mother tongue here is the one language a persona grew up dominant in - not
  // the language their mother speaks, and not family heritage. Every person has
  // one, so a Projection with grips and none of them naming it has left out the
  // fact the other rules stand on. Asserted as a contract over the house: every
  // finding of this class really is one.
  it("reports a persona with grips and no dominant language, and only those", () => {
    const owed = coveredCultureIds().flatMap((id) =>
      personaWiring(id)
        .filter((f) => /grips but no mother tongue/.test(f))
        .map((f) => [id, f.split(":")[0]]),
    );
    expect(owed.length).toBeGreaterThan(0);
    const GRIP = /process_(?:speaking|hearing|reading|writing|thinking)_[a-z_]+\.md/;
    const MOTHER = /process_(?:speaking|hearing|reading|writing|thinking)_mother_tongue\.md/;
    for (const [id, file] of owed) {
      const proj = personaProjection(readFileSync(join(cultureDir(id), file), "utf8"));
      expect(GRIP.test(proj), `${id}/${file} has no grip at all`).toBe(true);
      expect(MOTHER.test(proj), `${id}/${file} does name a mother tongue`).toBe(false);
    }
  });

  // MORE THAN ONE MOTHER TONGUE IS ADMITTED, AND THAT HAS TO BE A CONTRACT RATHER
  // THAN A SIDE EFFECT. The language engine caps nothing: every sentence in it
  // that sounds like uniqueness is a floor claim - "There is no width below this.
  // There is no language the persona can think in that sits closer" - and two
  // languages can be level. The research agrees, and about half the world is
  // functionally bilingual. So a Projection holding two tongues at mother-tongue
  // width must not be charged by either rule, and this asserts it rather than
  // leaving it to the fact that rule 3 happens to decline multi-tongue links.
  it("charges nothing for a persona that holds two mother tongues", () => {
    const tmp = mkdtempSync(join(tmpdir(), "khai-two-"));
    writeFileSync(join(tmp, "position_language_xx.md"), "---\nlanguage: xx\n---\n");
    writeFileSync(join(tmp, "position_language_yy.md"), "---\nlanguage: yy\n---\n");
    const both =
      "she [speaks](process_speaking_mother_tongue.md) [xx](position_language_xx.md) " +
      "and [yy](position_language_yy.md) she also [speaks](process_speaking_mother_tongue.md)";
    // Rule 3 declines: two floors, so there is no single language the file owes.
    expect(soleTongue(both, tmp)).toBeNull();
    // Rule 4 is satisfied: a mother grip is named, which is all it asks.
    expect(/process_speaking_mother_tongue\.md/.test(both)).toBe(true);
    rmSync(tmp, { recursive: true, force: true });
  });

  // AND ONE PERSONA CAN HOLD TWO FLOORS ON TWO CHANNELS, WHICH IS THE ORDINARY
  // SWISS CASE. The engine's card: "One channel may sit at a different width than
  // another in the same language; widths do not move together." A persona whose
  // writing sits below the floor still gets the finding - which channel decides a
  // house FILE is not the engine's question and is not answered by this rule - but
  // the finding has to carry the writing grip, because the fix is not prose alone:
  // der Abt writes "in Dokumenten auf Latein" under a grip with no tongue at all.
  it("says so in the finding when the writing channel sits below the floor", () => {
    const tmp = mkdtempSync(join(tmpdir(), "khai-chan-"));
    writeFileSync(join(tmp, "position_language_xx.md"), "---\nlanguage: xx\n---\n");
    const spoken =
      "the [xx](position_language_xx.md) he [speaks](process_speaking_mother_tongue.md)" +
      " and in documents [writes](process_writing_polished.md) in Latin";
    expect(soleTongue(spoken, tmp)?.writes).toBe("process_writing_polished.md");
    const floor = "the [xx](position_language_xx.md) he [writes](process_writing_mother_tongue.md)";
    expect(soleTongue(floor, tmp)?.writes).toBeNull();
    rmSync(tmp, { recursive: true, force: true });
  });

  // The findings are meant to move, so the census is not asserted - only that
  // every finding of this class really is one: a resolved language that differs
  // from the one tongue the persona holds as a mother tongue.
  it("reports a mother-tongue mismatch only where the two really differ", () => {
    const rows = coveredCultureIds().flatMap((id) => personaWiring(id));
    const mism = rows.filter((f) => /a persona is written in the tongue they speak/.test(f));
    for (const f of mism) {
      const m =
        /written in "([^"]+)" and holds (\S+) as its mother tongue, which is "([^"]+)"/.exec(f);
      expect(m, f).not.toBeNull();
      expect(m[1], f).not.toBe(m[3]);
    }
  });
});

// Every ratchet in this repository - coverage, sub-national conformance, persona
// wiring - decides what to check by asking `touchedCultures` which cultures a
// pull request's changed paths belong to. It carried the prefix as a literal,
// the workspace move renamed the content root out from under it, and all three
// gates went to "no culture touched" on pull requests that added plots and
// personas. Green, and reading nothing - the same failure as an empty house,
// one function over.
//
// The prefix is now derived, and this is what holds it there: a path taken out
// of the real tree, made relative the way `git diff --name-only` prints it, and
// asserted to resolve back to the culture it came from. Move the content root
// again and this test fails, which is the whole point of writing it.
describe("Cultures house: the ratchets can still see a touched culture", () => {
  it.skipIf(!existsSync(culturesDir))("resolves a real content path back to its culture", () => {
    const id = readdirSync(culturesDir, { withFileTypes: true })
      .filter((e) => e.isDirectory())
      .map((e) => e.name)
      .sort()[0];
    const file = readdirSync(join(culturesDir, id)).find((f) => f.endsWith(".md"));
    const asGitPrints = ["packages", "khai-cultures", "cultures", id, file].join("/");
    expect(
      touchedCultures([asGitPrints]),
      `a ratchet handed ${asGitPrints} saw no culture, so every ratchet is passing by checking nothing`,
    ).toEqual([id]);
  });

  it("does not claim a culture for a path outside the content root", () => {
    expect(
      touchedCultures(["tests/house.test.mjs", "packages/khai-cultures-tongues/de/x.md"]),
    ).toEqual([]);
  });

  // AND THE THREE RATCHETS MUST AGREE ON WHAT COUNTS AS TOUCHED, WHICH THEY DID
  // NOT. `company-coverage` and `subnational-conformance` both gate on
  // `authoredCultures`; `persona-wiring` gated on `touchedCultures`, and the two
  // answer differently the moment a change edits many packages without authoring
  // any of them. Adding one tongue that raises the language count bumps the
  // tongues package's count-derived version and the build rewrites the dependency
  // range in 119 packages: `touchedCultures` called that 117 touched cultures,
  // `authoredCultures` called it 0 authored and 117 spared, and the wiring gate
  // demanded two unrelated personas' mother tongues as the price of adding a
  // tongue file.
  //
  // THIS IS A SOURCE CHECK AND SAYS SO. The selection happens inside each gate,
  // against a git range, and a first draft of this test asserted
  // `authoredCultures("HEAD", "HEAD")` was empty - which is true of any repository
  // in any state and would have passed with the bug still in. What is actually
  // load-bearing is which function each gate reaches for, so that is what is
  // asserted.
  it("gates all three ratchets on what a change authored, not what it touched", () => {
    const gates = {
      "persona_wiring.mjs": readFileSync(join(here, "persona_wiring.mjs"), "utf8"),
      "company_coverage.mjs": readFileSync(join(here, "company_coverage.mjs"), "utf8"),
      "culture_conformance.mjs": readFileSync(join(here, "culture_conformance.mjs"), "utf8"),
    };
    for (const [file, src] of Object.entries(gates)) {
      const gate = src.slice(src.indexOf("function gate(base, head)"));
      expect(gate, `${file}: its gate does not ask authoredCultures`).toContain(
        "authoredCultures(base, head)",
      );
      expect(
        /\btouchedCultures\(/.test(gate.slice(0, gate.indexOf("\nfunction ") + 1 || undefined)),
        `${file}: its gate still selects cultures with touchedCultures`,
      ).toBe(false);
    }
  });

  // AND THE AUDIT LANE MUST REACH BOTH HOMES, WHICH IT DID NOT.
  // `order_the_passport.md` commissioned a second reader because "the one who
  // wrote a plot line is the one who cannot see this in it". Its extractor
  // matched `packages/khai-cultures-<id>/(plot_|play_)` and its workflow filtered
  // the same shape, so a culture still in the umbrella - one segment deeper and
  // with no hyphen suffix - matched neither. Measured when found: 795 plot files
  // across 206 umbrella cultures unseen, against 748 across 123 migrated ones
  // seen. San Marino, Hawaii and Andorra were all staged in the umbrella and the
  // lane read none of them; Andorra shipped with seven of eleven Cues a state.
  //
  // Asserted over the real tree rather than over a pattern, because the pattern
  // is what was wrong. Both a migrated culture and an umbrella one must come back
  // with plots.
  // AND IT MUST DO IT WITH NODE BUILTINS ONLY, WHICH IS A CONTRACT THAT WAS ONLY
  // EVER A COMMENT. The workflow runs the extractor on a fresh clone with no
  // `npm install` - its own step says so: "No install: the extractor uses node
  // builtins only, deliberately, so this lane cannot be broken by a registry it
  // does not need." Nothing enforced it. The first fix for the umbrella blindness
  // reached for `cultureDir` and `touchedCultures`, which pull in
  // `@chbrain/khai-tests`, and the lane died with ERR_MODULE_NOT_FOUND on the very
  // pull request it was meant to read - the one restaging the culture it had
  // failed to catch.
  //
  // Reaching for the house's own resolver is right everywhere else in this
  // repository and wrong here, which is exactly why it needs a test rather than a
  // comment.
  it("builds the passport question with node builtins only", () => {
    const src = readFileSync(join(here, "plot_line_audit.mjs"), "utf8");
    const imports = [...src.matchAll(/^import\s[^"']*["']([^"']+)["']/gm)].map((m) => m[1]);
    expect(imports.length).toBeGreaterThan(0);
    for (const spec of imports) {
      expect(
        spec.startsWith("node:"),
        `plot_line_audit.mjs imports ${spec}; the audit lane runs with no node_modules`,
      ).toBe(true);
    }
  });

  // The lane reached the reader and said it could not. The endpoint answered a
  // 302, `--fail-with-body` fails only from 400 up, so curl exited 0 and `jq`
  // died on the redirect stub `<a href="...">Found</a>.` at column 3. The step
  // now follows the redirect and reads the status itself, and this holds it
  // there - the last contract of this lane that lived in a YAML comment was
  // broken by the fix above, and comments do not run.
  it("follows a redirect and reads the status itself", () => {
    const yml = readFileSync(
      join(here, "..", ".github", "workflows", "plot-line-audit.yml"),
      "utf8",
    );
    const call = yml.slice(yml.indexOf("curl -sS"), yml.indexOf("wired=true"));
    expect(call, "the audit lane's curl call was not found").toContain("curl -sS");
    expect(/\s-L[\s\\]/.test(call), "the audit lane must follow a redirect").toBe(true);
    expect(call, "the audit lane must read the status itself").toContain("%{http_code}");
    // Curl drops the method and the body on a 301, 302 or 303 unless told not
    // to, so a followed redirect asked the reader nothing and brought back the
    // endpoint's bare `OK`.
    for (const keep of ["--post301", "--post302", "--post303"]) {
      expect(call, `the audit lane must keep the POST across a redirect (${keep})`).toContain(keep);
    }
    expect(call, "the audit lane must say where a redirect landed").toContain("%{url_effective}");
    expect(
      call.includes("--location-trusted"),
      "--location-trusted hands the token to whatever host the redirect names",
    ).toBe(false);
  });

  // `\Z` is not a JavaScript escape. The chapter reader ended `(?=^## |\Z)`,
  // which compiled to the literal letter Z, so every Cue was cut at its first
  // capital one: 63 of the house's 1,551 Cues truncated mid-sentence and 9
  // emptied outright, among them Schwyz's origin plot, which opens "Zwischen dem
  // Talkessel". The second reader was shown "(no Cue chapter)" and asked who
  // acts in it. Any culture with such a Cue holds the line.
  it("reads a Cue whole when it contains a capital Z", () => {
    const homes = [
      ...readdirSync(culturesDir, { withFileTypes: true })
        .filter((e) => e.isDirectory())
        .map((e) => [e.name, join(culturesDir, e.name)]),
      ...productions().map((p) => [p.id, p.dir]),
    ];
    let found = null;
    for (const [id, dir] of homes) {
      for (const f of readdirSync(dir).filter((f) => f.startsWith("plot_"))) {
        const cue = /^## Cue\s*$/m.exec(readFileSync(join(dir, f), "utf8"));
        if (!cue) continue;
        const rest = readFileSync(join(dir, f), "utf8").slice(cue.index + cue[0].length);
        const body = (rest.slice(0, /^## /m.exec(rest)?.index ?? rest.length) ?? "").trim();
        const z = body.indexOf("Z");
        if (z > 0 && body.length > z + 20) {
          found = { id, tail: body.slice(z, z + 20) };
          break;
        }
      }
      if (found) break;
    }
    expect(found, "no Cue in the house contains a capital Z to hold this with").not.toBe(null);
    const out = execFileSync("node", [join(here, "plot_line_audit.mjs"), "--culture", found.id], {
      encoding: "utf8",
      cwd: join(here, ".."),
    });
    expect(
      out.includes(found.tail),
      `the audit lane cut ${found.id}'s Cue at a capital Z; it must read the chapter whole`,
    ).toBe(true);
  });

  it("builds the passport question for a culture in either home", () => {
    const umbrella = readdirSync(culturesDir, { withFileTypes: true })
      .filter((e) => e.isDirectory())
      .map((e) => e.name)
      .find((id) => readdirSync(join(culturesDir, id)).some((f) => f.startsWith("plot_")));
    const migrated = productions().find((p) =>
      readdirSync(p.dir).some((f) => f.startsWith("plot_")),
    )?.id;
    for (const [home, id] of [
      ["umbrella", umbrella],
      ["migrated", migrated],
    ]) {
      if (!id) continue;
      const out = execFileSync("node", [join(here, "plot_line_audit.mjs"), "--culture", id], {
        encoding: "utf8",
        cwd: join(here, ".."),
      });
      expect(
        (out.match(/^### plot_/gm) ?? []).length,
        `the audit lane read no plots for ${home} culture ${id}`,
      ).toBeGreaterThan(0);
    }
  });

  // The same proof for the other home. Skipped only while there is nothing to
  // prove it on; `tests/migration.test.mjs` holds the synthetic case that runs
  // whether or not a culture has migrated yet.
  it.skipIf(productions().length === 0)(
    "resolves a real production path back to its culture",
    () => {
      const prod = productions()[0];
      const file = readdirSync(prod.dir).find((f) => f.endsWith(".md"));
      const asGitPrints = ["packages", prod.dir.split("/").pop(), file].join("/");
      expect(touchedCultures([asGitPrints])).toEqual([prod.id]);
    },
  );
});

// A report that hides rows and does not say so is indistinguishable, to the grep
// someone will inevitably reach for, from a report that found nothing. The
// coverage report shows the worst twenty cultures out of the ~250 carrying debt;
// grepping it for a culture below that cut printed nothing, nothing was read as
// zero, and a culture with four dead Company entries went into a branch as
// "clean". The gate caught it. This pins the line that would have said so.
describe("Cultures house: a truncated report says that it is truncated", () => {
  it("names the number of cultures it is not showing", () => {
    const lines = [];
    const log = console.log;
    console.log = (...a) => lines.push(a.join(" "));
    try {
      coverageReport();
    } finally {
      console.log = log;
    }
    const total = Number(/dead entries: (\d+) of/.exec(lines.join("\n"))?.[1] ?? 0);
    if (total <= 20) return; // nothing hidden, nothing to announce
    expect(
      lines.join("\n"),
      "the coverage report truncates without saying so, so a grep for a hidden culture reads as zero",
    ).toMatch(/NOT SHOWN/);
  });
});

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

// The wall that reads whether prose is spelled in the language it claims. What
// runs here is the reading, not the gate: the gate needs a diff and runs in CI.
// Thirty-two files are flat today and that is not an error - the ratchet fires on
// prose a pull request writes, so the count comes down as the house is walked.
// See management/orders/order_the_written_accent.md.
describe("Cultures house: prose is spelled in the language it declares", () => {
  // A Set means "accented, density unknown"; a Map carries the language's own
  // marks-per-word. Both are exercised here, because the wall takes either and
  // must answer less with the Set, never more.
  const es = { name: "es", accented: new Set(["es"]) };
  // 0.1149 is Spanish's real density in this house, measured: ~11.5 marks per
  // hundred words. Hard-coded here so these cases do not drift with the corpus.
  const esDense = new Map([["es", 0.1149]]);
  const fm = (lang, prose) => `---\nkhai: position\nlanguage: ${lang}\n---\n\n${prose}`;
  const long = (w) => Array.from({ length: 80 }, () => w).join(" ");
  const words = (n, w) => Array.from({ length: n }, () => w).join(" ");

  it("reads the declared language and drops the frontmatter from the prose", () => {
    const text = fm("es", "una frase cualquiera");
    expect(declaredLanguage(text)).toBe("es");
    expect(proseBody(text)).not.toContain("khai:");
    expect(proseBody(text)).toContain("una frase");
  });

  it("sees a combining mark however the file is normalised", () => {
    expect(marked("cancion")).toBe(false);
    expect(marked("canci\u00f3n")).toBe(true); // precomposed
    expect(marked("cancio\u0301n")).toBe(true); // decomposed
  });

  // The guarantee that must never be traded away: both spellings below are
  // correct Spanish, and no counter can choose between them. The wall reads the
  // file's mark density and never a word, so prose at its language's own
  // density passes whatever it spells.
  it("never judges an individual word", () => {
    expect(flat(fm("es", long("est\u00e1")), esDense)).toBeNull();
    expect(flat(fm("es", long("esta")), es.accented)).toBe("es");
  });

  // The defect this rule was written for. One stray accent used to buy a pass
  // for a whole file, which is how three of guinea_bissau's mislabelled files
  // and position_language_es_es_md.md - the file the wall exists because of -
  // stayed invisible. 300 Spanish words owe about 34 marks; one is not "some".
  it("is not bought off by a single stray accent in three hundred words", () => {
    const strayed = fm("es", `${words(299, "esta")} caf\u00e9`);
    expect(markCount(proseBody(strayed))).toBe(1);
    expect(flat(strayed, esDense)).toBe("es");
  });

  it("passes prose that carries its language's own density", () => {
    // 300 words with 34 marks: right at the Spanish median, so not a finding.
    expect(flat(fm("es", `${words(266, "esta")} ${words(34, "est\u00e1")}`), esDense)).toBeNull();
  });

  // FLOOR's argument, applied to marks. A language that would owe only a few
  // marks over this much prose cannot be said to be missing them, so the wall
  // declines to score the file at all rather than guess. This is what keeps
  // legitimate Sesotho and Italian, which genuinely carry few accents, out.
  it("declines to score a file whose language would owe too few marks", () => {
    const sparse = new Map([["es", 0.01]]); // 100 words would owe 1 mark
    const text = fm("es", `${words(199, "esta")} caf\u00e9`);
    expect(flat(text, sparse)).toBeNull(); // expected 2, under MIN_EXPECTED
    expect(flat(text, esDense)).toBe("es"); // same file, a dense language
  });

  // The same guard, on the empty case, which is where it used to be missing: the
  // zero-mark branch returned before MIN_EXPECTED could speak. Macedonian is the
  // real instance - its only letters that decompose to a mark are ѓ, ќ, ѐ and ѝ,
  // all rare, so sound Macedonian prose of a hundred words carries none and owes
  // about two.
  it("declines a file with no marks at all when its language owes too few", () => {
    const sparse = new Map([["mk", 0.0219]]); // Macedonian's real density here
    const bare = fm("mk", words(109, "\u043e\u0445\u0440\u0438\u0434"));
    expect(flat(bare, sparse)).toBeNull();
    // and the empty case still reports where the language really owes marks
    expect(flat(fm("es", words(199, "esta")), esDense)).toBe("es");
  });

  // The counter was `[^\W\d_]{3,}`, and \w stays ASCII under the u flag, so every
  // letter outside A-Z counted as nothing. A file of two thousand Greek letters
  // scored the dozen Latin words in its own scaffolding and fell under FLOOR.
  it("counts words in the scripts the old pattern could not see", () => {
    const samples = {
      greek: "\u03b5\u03bb\u03bb\u03b7\u03bd\u03b9\u03ba\u03ac",
      cyrillic: "\u043e\u0445\u0440\u0438\u0434\u0441\u043a\u0438",
      hebrew: "\u05d9\u05d9\u05b4\u05d3\u05d9\u05e9",
      devanagari: "\u0939\u093f\u0928\u094d\u0926\u0940",
      armenian: "\u0570\u0561\u0575\u0565\u0580\u0565\u0576",
    };
    for (const [name, w] of Object.entries(samples))
      expect(wordCount(words(70, w)), name).toBeGreaterThanOrEqual(70);
    // and the old exclusions hold: digits and underscores are not words
    expect(wordCount("123 4567 ____ __")).toBe(0);
  });

  // Asked of the house, because the point of the widening is that this prose is
  // really here. Greek carries a tonos on almost every word and was invisible;
  // Chinese carries no combining mark at all and must stay out, since there is no
  // accent to strip.
  it("brings the non-Latin scripts into scope, and leaves out what has no marks", () => {
    const accented = accentUsing();
    for (const lang of ["el", "ru", "uk", "bg", "mk"]) expect(accented.has(lang), lang).toBe(true);
    for (const lang of ["zh", "yue"]) expect(accented.has(lang), lang).toBe(false);
    expect(accented.get("el")).toBeGreaterThan(accented.get("es"));
  });

  // A Set carries no density, so the wall must fall back to the original
  // question and report less. Reporting more from a Set would be a silent
  // change of meaning for every old caller.
  it("degrades to the zero-mark question when given a bare Set", () => {
    const strayed = fm("es", `${words(299, "esta")} caf\u00e9`);
    expect(flat(strayed, es.accented)).toBeNull();
    expect(flat(strayed, esDense)).toBe("es");
  });

  // Found by running the gate against a probe rather than by reading the code:
  // the message still said "not one mark in it" about a file holding one. This
  // wall exists because a file claimed something untrue about itself, so its own
  // findings have to say what they measured.
  it("reports a near-zero finding in the file's own numbers", () => {
    const accented = accentUsing();
    // The wall's own findings supply the examples, so this types no culture
    // path and does not go stale when one of them is packaged.
    const said = flatFindings().map(([p, l]) => describeFinding(p, l, accented));
    const zero = said.filter((t) => t.includes("not one mark in it"));
    const near = said.filter((t) => !t.includes("not one mark in it"));
    expect(zero.length, "the zero-mark rule should still hold findings").toBeGreaterThan(0);
    expect(near.length, "the near-zero rule should hold at least one finding").toBeGreaterThan(0);
    for (const t of near)
      expect(t).toMatch(/\d+ mark\(s\) in \d+ words where this language carries about \d+/);
  });

  it("says nothing about a language this house does not write with accents", () => {
    expect(flat(fm("en", long("plain")), es.accented)).toBeNull();
  });

  it("spares a stub, which is too short to have owed an accent", () => {
    expect(flat(fm("es", "una linea corta"), es.accented)).toBeNull();
  });

  it("decides which languages are accented from the house itself", () => {
    const accented = accentUsing();
    for (const l of ["es", "fr", "pt", "it", "de"]) expect(accented.has(l)).toBe(true);
    for (const l of ["en", "ms", "id"]) expect(accented.has(l)).toBe(false);
  });

  // The density comes from the corpus too, never from a table. Asserted as a
  // wide band, not a number, so ordinary drift in the house does not fail it:
  // what matters is the ORDER, that the house's low-accent and high-accent
  // languages land decades apart, which is why one global rate cannot work.
  it("carries each language's own density, and they differ by orders of magnitude", () => {
    const accented = accentUsing();
    const per100 = (l) => accented.get(l) * 100;
    expect(per100("es")).toBeGreaterThan(5);
    expect(per100("es")).toBeLessThan(20);
    expect(per100("st")).toBeLessThan(per100("es")); // Sesotho carries few
    expect(per100("vi")).toBeGreaterThan(per100("es") * 10); // Vietnamese carries many
  });

  // The finding this wall was written for, held as a fact so it cannot be lost:
  // the flat files are two different faults wearing one symptom, and the larger
  // one is a `language:` that names a language the file is not written in.
  it("finds the flat files, and most of them are creole declared as Portuguese", () => {
    const rows = flatFindings();
    expect(rows.length).toBeGreaterThan(0);
    const pt = rows.filter(([, l]) => l === "pt").map(([p]) => p);
    expect(pt.every((p) => /cape_verde|guinea_bissau/.test(p))).toBe(true);
  });
});

// The wall that reads whether a plot line runs forwards. What runs here is the
// arithmetic and the exclusions; the gate needs a diff and runs in CI. Twenty-three
// units are out of order today and that is not an error - the ratchet fires on plot
// prose a change writes, so the count comes down as the house is walked.
// See management/orders/order_a_plot_line_runs_forwards.md.
describe("Cultures house: a plot line runs forwards", () => {
  const plot = (declared, cue) =>
    `---\nkhai: plot\ndeclared: "${declared}"\n---\n\n## Cue\n\n${cue ?? "Sin fecha."}\n\n## Action\n\nx\n`;

  it("takes the year from the declared name first, and the Cue as fallback", () => {
    expect(plotYear(plot("The Opry Founding 1925", "In 1954 something else."))).toBe(1925);
    expect(plotYear(plot("La puerta", "En agosto de 1415 la flota cruza."))).toBe(1415);
  });

  it("takes the first year, because these are written subject-first", () => {
    expect(plotYear(plot("El Estatuto de 1995", "En 1995, tras la ley de 1978."))).toBe(1995);
  });

  it("returns null for a plot that names no year, which is legitimate", () => {
    expect(plotYear(plot("Agua del aire", "El bosque peina la niebla."))).toBeNull();
  });

  // The nine plots the old four-digit pattern could not express. Each of these is
  // the shape of a real declared name in the house: a bare three-digit year, a
  // parenthesised one, and one hedged with "ca.".
  it("reads a year before 1000, which four digits could not express", () => {
    expect(plotYear(plot("La fondazione da parte di San Marino 301"))).toBe(301);
    expect(plotYear(plot("Այբուբենի ստեղծումը (405)"))).toBe(405);
    expect(plotYear(plot("Jellingstenene ca. 965"))).toBe(965);
    expect(plotYear(plot("Sin año", "Alþingi kom saman á Þingvöllum árið 930."))).toBe(930);
  });

  // Why the widening is a precedence and not just a wider pattern. Both of these
  // are real declared names, and both put a number that is not a year before the
  // year, so "first number wins" dates them 500 and 128.
  it("lets four digits outrank three in the same field, so a race is not a year", () => {
    expect(plotYear(plot("The Indianapolis 500 Inauguration 1911"))).toBe(1911);
    expect(plotYear(plot("The Route 128 Tech Boom 1970"))).toBe(1970);
  });

  // One and two digits are refused on both sides of the same coin: they can mean
  // a year without saying which century, and they can mean no year at all.
  it("refuses one and two digits, which never say which century", () => {
    expect(plotYear(plot("Mai 68"))).toBeNull();
    expect(plotYear(plot("Kovo 11"))).toBeNull();
    expect(plotYear(plot("Sin año", "Eran 60 hombres en el naufragio."))).toBeNull();
  });

  // The bound is what keeps the widening from reading counts as years, and the
  // year after next decade is what the old bound of 2029 could not reach.
  it("reads past 2029 and stops at a stated bound", () => {
    expect(plotYear(plot("The Plan of 2030"))).toBe(2030);
    expect(plotYear(plot(`El plan de ${LATEST}`))).toBe(LATEST);
    expect(plotYear(plot(`El plan de ${LATEST + 1}`))).toBeNull();
    expect(plotYear(plot("Sin año", "Vinieron 3000 personas al puerto."))).toBeNull();
  });

  // Asked of the house and not of a fabricated string, because the point of the
  // widening is that these years are really in the corpus. If the pattern is ever
  // narrowed back, this is the test that goes red - the fabricated ones above
  // would keep passing against a reader that no file exercises.
  it("finds pre-1000 years in the house itself, not only in test strings", () => {
    const early = [...plotUnits().values()].flat().filter((r) => r.year < 1000);
    expect(early.length).toBeGreaterThanOrEqual(9);
    expect(early.every((r) => /^plot_\d{2}_/.test(r.file.split("/").pop()))).toBe(true);
  });

  it("holds the origin and the present outside the chronology", () => {
    expect(BRACKETS.has(0)).toBe(true);
    expect(BRACKETS.has(99)).toBe(true);
    expect(BRACKETS.has(1)).toBe(false);
  });

  it("allows two plots in the same year, and refuses a year that goes backwards", () => {
    const rows = (...ys) => ys.map((y, i) => ({ n: i + 1, year: y, file: `plot_0${i + 1}_x.md` }));
    expect(backwards(rows(1900, 1900, 1901))).toEqual([]);
    expect(backwards(rows(1900, 1901, 1902))).toEqual([]);
    expect(backwards(rows(1496, 1492))).toHaveLength(1);
    expect(backwards(rows(1861, 1745, 2006))).toHaveLength(1);
  });

  it("walks directories, so cultures, groups and packages all reach it", () => {
    const all = plotUnits();
    expect(all.size).toBeGreaterThan(200);
    const keys = [...all.keys()].join("\n");
    expect(keys).toMatch(/packages\/khai-cultures\/cultures\//); // umbrella
    expect(keys).toMatch(/packages\/khai-cultures-[a-z]/); // migrated package
  });

  // This asserted a census on its first draft - "es_canary_islands is among the
  // offenders" - and then the next change fixed es_canary_islands and the test
  // failed. A wall's tests must hold its CONTRACT, which does not move, and not
  // its findings, which are supposed to go to zero. What is asserted here is the
  // invariant: findings() reports a unit if and only if that unit really has a
  // pair running backwards.
  it("reports a unit if and only if its dated plots run backwards", () => {
    const all = plotUnits();
    const reported = new Set(orderFindings(all).map(([u]) => u));
    for (const [unit, rows] of all) expect(reported.has(unit)).toBe(backwards(rows).length > 0);
  });

  it("counts a renumber as written, and a move that keeps its numbers as not", () => {
    expect(plotNumber("packages/x/plot_02_a.md")).toBe(2);
    expect(plotNumber("packages/x/plot_00_a.md")).toBe(0);
    expect(plotNumber("packages/x/play_x.md")).toBeNull();
    // a migration keeps the number and changes the home; a renumber does the reverse
    expect(plotNumber("cultures/es_x/plot_01_a.md")).toBe(
      plotNumber("packages/khai-cultures-es-x/plot_01_a.md"),
    );
    expect(plotNumber("x/plot_01_a.md")).not.toBe(plotNumber("x/plot_02_a.md"));
  });
});

// What to do next. Not a wall: it ranks work, and a ranking is a reading. What
// is held here is its CONTRACT - that the order is lexicographic and not a
// score, that the pick is total and therefore deterministic, that a named
// culture always arrives with its reasons, and that it stays out of the gates.
// The counts it prints are findings and are meant to move, so none is asserted.
// See management/orders/order_what_to_do_next.md.
describe("Cultures house: what to do next", () => {
  it("holds the rung order as data, because the order is the whole policy", () => {
    expect(RUNGS.map((r) => r.name)).toEqual(["wrong", "unbracketed", "thin", "unmigrated"]);
    for (const r of RUNGS) {
      expect(typeof r.says).toBe("string");
      expect(typeof r.holds).toBe("function");
    }
    expect(SETTLED).toBe(RUNGS.length);
    expect(rungName(SETTLED)).toBe("settled");
  });

  // The rung is still the first that holds and never a sum: a culture that is
  // both wrong AND thin is wrung as wrong, and that is what names the fault in
  // the report. The order is a different question, and since the score landed it
  // does add the two - see the scoring tests below. Keeping rungOf arithmetic
  // free is what lets the score explain itself in the rung's words.
  it("answers to the first rung that holds, never to a sum of several", () => {
    const clean = {
      disordered: false,
      flat: [],
      blocking: 0,
      origin: true,
      present: true,
      uncast: [],
      chain: [],
      hollow: false,
      migrated: true,
    };
    expect(rungOf(clean)).toBe(SETTLED);
    expect(rungOf({ ...clean, disordered: true, uncast: ["x.md"], migrated: false })).toBe(0);
    expect(rungOf({ ...clean, uncast: ["x.md"] })).toBe(2);
    expect(rungOf({ ...clean, origin: false, uncast: ["x.md"] })).toBe(1);
    expect(rungOf({ ...clean, migrated: false })).toBe(3);
  });

  it("drops zeros before the median, so an absent span cannot lower the line", () => {
    expect(rungMedian([0, 0, 0, 10, 20, 30])).toBe(20);
    expect(rungMedian([])).toBe(0);
    expect(rungMedian([0])).toBe(0);
  });

  it("gives every culture in the house the first rung that holds for it", () => {
    for (const r of nextSurvey().rows) expect(r.rung).toBe(rungOf(r));
  });

  // The weights, pinned. Not tautology: `order_what_to_do_next.md` refused a
  // score because invented numbers "drift towards whatever the last person
  // wanted to work on", and this is the answer to that. A weight cannot move
  // without this line moving with it, in the same diff, where it can be argued.
  it("pins the weights, so a number cannot move quietly", () => {
    expect(WEIGHTS).toEqual({
      disordered: 40,
      blocking: 25,
      flat: 15,
      origin: 30,
      present: 30,
      hollow: 20,
      uncast: 6,
      chain: 6,
      unmigrated: 10,
      level: 12,
      holeYears: 20,
      spanYears: 50,
    });
  });

  // The property the score exists for, and the one the ladder could not hold:
  // owing five things ranks above owing one, whatever rung each answers to.
  it("adds severity, so many faults outrank one", () => {
    const clean = {
      disordered: false,
      flat: [],
      blocking: 0,
      origin: true,
      present: true,
      uncast: [],
      chain: [],
      hollow: false,
      migrated: true,
      level: 1,
      span: 0,
      hole: 0,
    };
    const oneFault = { ...clean, disordered: true };
    const many = {
      ...clean,
      origin: false,
      present: false,
      hollow: true,
      uncast: ["a.md", "b.md"],
    };
    // level 1 is two steps above the deepest, so it carries 2 x the level weight
    expect(scoreOf(oneFault).total).toBe(WEIGHTS.disordered + 2 * WEIGHTS.level);
    expect(scoreOf(many).total).toBeGreaterThan(scoreOf(oneFault).total);
    // and the arithmetic adds up to what is printed, or the explanation lies
    for (const l of [oneFault, many]) {
      const { total, terms } = scoreOf(l);
      expect(terms.reduce((n, [p]) => n + p, 0)).toBe(total);
    }
  });

  // Level is the reason the score was built - a level-2 outranked a level-1 for
  // two working days - but it is a nudge and never a veto: a country owing one
  // thing does not outrank a state owing three.
  it("weighs level without letting it dominate", () => {
    const clean = {
      disordered: false,
      flat: [],
      blocking: 0,
      origin: true,
      present: true,
      uncast: [],
      chain: [],
      hollow: false,
      migrated: true,
      span: 0,
      hole: 0,
    };
    const country = { ...clean, level: 1, disordered: true };
    const state = { ...clean, level: 2, disordered: true };
    expect(scoreOf(country).total).toBeGreaterThan(scoreOf(state).total);
    const brokenState = { ...clean, level: 2, disordered: true, origin: false, present: false };
    expect(scoreOf(brokenState).total).toBeGreaterThan(scoreOf(country).total);
  });

  // A score that reproduced the ladder would be ceremony. This asserts it does
  // not: the two orders disagree on the house as it actually stands.
  it("ranks differently from the ladder it replaced", () => {
    const q = nextQueue();
    const ladder = [...q].sort(
      (a, b) => a.rung - b.rung || b.hole - a.hole || b.span - a.span || a.id.localeCompare(b.id),
    );
    expect(ladder.map((r) => r.id)).not.toEqual(q.map((r) => r.id));
    expect(q.every((r) => typeof r.score === "number" && Array.isArray(r.terms))).toBe(true);
  });

  // Level comes from the culture's own geo.json and never from its id, because
  // ids lie: el_salvador and dr_congo are countries whose ids read sub-national.
  it("reads level from geo.json, not from the id", () => {
    const { rows } = nextSurvey();
    const byId = new Map(rows.map((r) => [r.id, r]));
    for (const id of ["el_salvador", "dr_congo"])
      if (byId.has(id)) expect(byId.get(id).level).toBe(1);
    expect(levelOf("packages/khai-cultures-de-thuringia")).toBe(2);
    expect(levelOf("packages/khai-cultures-sweden")).toBe(1);
    expect(levelOf(null)).toBe(1);
  });

  // Total, or it is not deterministic - and re-running the queue does not prove
  // it, because the rows arrive in the same order twice and a comparator that
  // ties somewhere would pass anyway. What is asserted is the property itself:
  // permute the input and the answer does not move, and no adjacent pair ties.
  it("orders the queue totally, so the input order cannot change the result", () => {
    const q = nextQueue();
    expect(q.length).toBeGreaterThan(0);
    const half = Math.floor(q.length / 2);
    for (const permuted of [[...q].reverse(), [...q.slice(half), ...q.slice(0, half)]])
      expect([...permuted].sort(cultureOrder).map((r) => r.id)).toEqual(q.map((r) => r.id));
    for (let i = 1; i < q.length; i += 1) expect(cultureOrder(q[i - 1], q[i])).not.toBe(0);
    expect(nextCulture().id).toBe(q[0].id);
  });

  it("queues everything that owes something and nothing that does not", () => {
    const { rows } = nextSurvey();
    const settled = rows.filter((r) => r.rung === SETTLED).length;
    expect(nextQueue().length + settled).toBe(rows.length);
    expect(nextQueue().every((r) => r.rung < SETTLED)).toBe(true);
  });

  // A name alone would send someone to read the culture and guess. Every culture
  // it names carries its ledger, and every culture on a rung that needs a
  // reading carries the questions too - rung 4 is a migration and asks nothing.
  it("never names a culture without saying what it owes", () => {
    for (const r of nextQueue()) {
      expect(owed(r).length, r.id).toBeGreaterThan(0);
      if (r.rung < 3) expect(asks(r).length, r.id).toBeGreaterThan(0);
    }
  });

  // The distinction this file rests on, held so it survives the next reader.
  it("stays out of the gates manifest, because a ranking is a reading", () => {
    const { gates } = JSON.parse(
      readFileSync(join(workspaceRoot, "khai-guard.config.json"), "utf8"),
    );
    expect(gates.some((g) => (g.command ?? "").includes("next.mjs"))).toBe(false);
  });
});

// A link's name is not its target's filename. The wall in ci.yml is a ratchet
// over written units, because the 635 findings in README.md and REFERENCES.md
// cannot all be repaired in one lane. What is held HERE is the half that is
// already absolute: the culture prose - every play, plot, persona, place, piece,
// position and process - carries zero, and this is what keeps it at zero without
// waiting for someone to touch the file. The classifier is pinned separately,
// because the whole rule turns on telling a sentence from a register.
// See management/orders/order_a_name_reads_as_prose.md.
describe("Cultures house: a name reads as prose", () => {
  it("knows the three spellings of naming a link after its file", () => {
    expect(repeats("pitch_corsica.md", "pitch_corsica.md")).toBe(true);
    expect(repeats("play_bern", "play_bern.md")).toBe(true);
    expect(repeats("play bern", "play_bern.md")).toBe(true);
    expect(repeats("PLAY BERN", "play_bern.md")).toBe(true);
    expect(repeats("REFERENCES.md", "../a/REFERENCES.md")).toBe(true);
    expect(repeats("The pitch", "pitch_corsica.md")).toBe(false);
    expect(repeats("Bern, which decides slowly", "play_bern.md")).toBe(false);
  });

  // The carve-out is the whole reason this wall is holdable: 5,494 of the 6,129
  // repeats are places where the filename IS the information, and a wall that
  // counted them would be the counter order_the_passport.md forbids.
  it("tells a register from a sentence, because only a sentence is prose", () => {
    expect(register("| Corti | [place_corti](place_corti.md) | The interior capital |")).toBe(true);
    expect(register("- **Anchor:** [play_bern.md](play_bern.md), the culture itself.")).toBe(true);
    expect(register("[play_bern](play_bern.md)")).toBe(true);
    expect(register("## [play_bern](play_bern.md)")).toBe(true);
    expect(register("The pitch [pitch_corsica.md](pitch_corsica.md) is written from France.")).toBe(
      false,
    );
  });

  it("does not read a fenced block, where a filename is the example", () => {
    const fenced = ["```", "The pitch [pitch_x.md](pitch_x.md) is written from here.", "```"].join(
      "\n",
    );
    expect(proseRepeats(fenced)).toEqual([]);
    expect(proseRepeats("The pitch [pitch_x.md](pitch_x.md) is written from here.")).toHaveLength(
      1,
    );
  });

  // The absolute half. The ratchet in ci.yml can only charge a unit somebody
  // opened; this charges the house. It is the claim the order makes, and the
  // only thing standing between the voice and the first plot that says
  // "see [plot_04_x.md](plot_04_x.md)".
  // The shape this wall's scoping reads. `charged` returns a sorted array; a Set
  // was assumed once and `!written.size` is undefined-and-falsy, so the wall
  // answered "no unit written" over a README it had just been handed and exited
  // 0. Nothing else would have caught that: the gate is green either way.
  it("is handed written units as an array, which is what the gate counts", () => {
    const head = execFileSync("git", ["rev-parse", "HEAD"], {
      cwd: workspaceRoot,
      encoding: "utf8",
    }).trim();
    const { written } = charged(head, head);
    expect(Array.isArray(written)).toBe(true);
  });

  it("holds the culture prose at zero, which is where it already is", () => {
    const spec = new Set(["README.md", "REFERENCES.md"]);
    const offenders = [];
    for (const u of linkUnits())
      for (const line of nameFindings(u))
        if (!spec.has(line.split(":")[0])) offenders.push(`${u.id}: ${line}`);
    expect(offenders).toEqual([]);
  });
});

// A title is not its type said twice. The wall in ci.yml is a ratchet over
// written units, because 342 findings sit in 28 packages and cannot land in one
// lane. What is held HERE is the half already at zero: `play`, `order` and
// `instructions` carry the prefix not once across 485 nodes, which is how the
// house decided this in the first place, and holding them outright means the
// settled types can never drift back. The classifier is pinned separately,
// because the whole rule turns on telling a label from a name.
// See management/orders/order_a_title_names_the_thing.md.
// What to do next, over three populations. The queue used to enumerate cultures
// alone, so twenty-one groups answered to the group ratchet and to nothing that
// ranked them: `latin_america` owes eight chain faults and both brackets and had
// never once been offered as work. Held here is what widening must NOT do - move
// a culture - and the mapping that lets a group be read on the same ledger.
// See management/orders/order_what_to_do_next.md.
// A second reader, and the record that makes one possible. The lane could always
// ask; it could never record, so 319 cultures had been read by nobody and the
// house could not name one. What is held here is the shape of the record, the
// staleness rule, and the duplication the audit lane chose over a dependency.
// See management/orders/order_a_second_reader.md.
// A year is a magnitude and a direction, and the direction went unwritten until a
// line ran entirely before the common era. `plot_sequence` compared magnitudes, so
// 113 followed by 101 read as backwards when it is forwards. Held here: the
// markers, per language, and that nothing in the existing house moves - measured
// over all 719 plot years, and only the two BC ones changed.
describe("Cultures house: a line can run before the common era", () => {
  it("reads the era off the prose, in the languages the house writes in", () => {
    const cue = (s) => `## Cue\n\n${s}\n\n`;
    expect(plotYear(cue("In 113 BC a people arrives."))).toBe(-113);
    expect(plotYear(cue("On 30 July 101 BC the line breaks."))).toBe(-101);
    expect(plotYear(cue("omkring 500 f. Kr. kom de."))).toBe(-500);
    expect(plotYear(cue("Um 800 v. Chr. herrschte."))).toBe(-800);
  });

  it("leaves a year with no era marker exactly where it was", () => {
    const cue = (s) => `## Cue\n\n${s}\n\n`;
    expect(plotYear(cue("I 1864 taber landet Slesvig."))).toBe(1864);
    expect(plotYear(cue("The Grand Ole Opry 1925 founding."))).toBe(1925);
    expect(plotYear(cue("Den 28. maj 1891 skaerer to toervearbejdere."))).toBe(1891);
  });

  // A marker this list misses costs a false "backwards", never a silent pass.
  // That is the safe direction to fail, and it is why the list can be extended
  // later without anything having shipped wrong in the meantime.
  it("fails towards a complaint, never towards a quiet pass", () => {
    const cue = (s) => `## Cue\n\n${s}\n\n`;
    expect(plotYear(cue("In 113 vor unserer Zeitrechnung."))).toBe(113);
  });
});

describe("Cultures house: a reading that is not recorded did not happen", () => {
  // The audit lane runs with NO INSTALL so a registry it does not need cannot
  // break it, so it enumerates cultures itself rather than importing
  // culture_sources, which reaches for @chbrain/khai-tests. A duplication chosen
  // over a dependency is only safe while the two agree, so they are held to it.
  it("enumerates the same cultures as culture_sources, by a different route", () => {
    expect(auditCultureIds()).toEqual([...coveredCultureIds()].sort());
  });

  it("digests the Cues and nothing else, so an Action edit does not stale a reading", () => {
    const one = { plots: [{ file: "plot_00_a.md", cue: "En mose." }] };
    const same = { plots: [{ file: "plot_00_a.md", cue: "En mose." }] };
    const moved = { plots: [{ file: "plot_00_a.md", cue: "En anden mose." }] };
    const added = { plots: [...one.plots, { file: "plot_01_b.md", cue: "Og en tyr." }] };
    expect(cueDigest(one)).toBe(cueDigest(same));
    expect(cueDigest(one)).not.toBe(cueDigest(moved));
    expect(cueDigest(one)).not.toBe(cueDigest(added));
    expect(cueDigest(null)).toBe(null);
  });

  it("calls a culture never read, read, or stale, against that digest", () => {
    const id = coveredCultureIds()[0];
    expect(statusOf(id, {}).status).toBe("never");
    const fresh = readCulture(dirFor(id));
    const good = {
      [id]: [
        { read: "2026-09-24", reader: "gemini", plots: fresh.plots.length, cues: cueDigest(fresh) },
      ],
    };
    expect(statusOf(id, good).status).toBe("current");
    const wrong = {
      [id]: [
        { read: "2026-09-24", reader: "gemini", plots: fresh.plots.length, cues: "000000000000" },
      ],
    };
    expect(statusOf(id, wrong).status).toBe("stale");
  });

  // The digest is what a reader copies into the record, and it used to be
  // computed inside the branch that already had a reading - so the one path that
  // most needs it, a culture nobody has read, printed `"cues": "undefined"`.
  it("offers the digest on the never-read path, which is the path that needs it", () => {
    const s = statusOf(coveredCultureIds()[0], {});
    expect(s.status).toBe("never");
    expect(s.digest).toMatch(/^[0-9a-f]{12}$/);
  });

  // The reader is pointed AT the repo rather than handed the prose, so the URL is
  // load-bearing - and derived from the remote, because a fork or a rename would
  // otherwise send every reader to somebody else's house.
  it("derives the repository a reader is pointed at, rather than carrying one", () => {
    const url = repoUrl();
    expect(url).toMatch(/^https:\/\/github\.com\/[^/]+\/[^/]+$/);
    expect(url.endsWith(".git")).toBe(false);
  });

  it("holds the record parseable, and counts what it does not yet hold", () => {
    const r = readings();
    expect(typeof r).toBe("object");
    for (const [id, list] of Object.entries(r)) {
      expect(Array.isArray(list), `readings["${id}"] must be an array`).toBe(true);
      for (const e of list) {
        expect(typeof e.read).toBe("string");
        expect(typeof e.reader, `readings["${id}"] needs a named reader`).toBe("string");
        expect(e.reader.length).toBeGreaterThan(0);
      }
    }
  });
});

describe("Cultures house: the queue reads groups and sunken too", () => {
  const s = nextSurvey();

  it("carries every unit with a kind, and cultures are no longer all of them", () => {
    const kinds = new Set(s.rows.map((r) => r.kind));
    expect([...kinds].sort()).toEqual(expect.arrayContaining(["culture", "group"]));
    for (const r of s.rows) expect(["culture", "group", "sunken"]).toContain(r.kind);
    expect(s.rows.filter((r) => r.kind === "group").length).toBe(allGroups().length);
  });

  // The medians are per kind, and this is the guard on the reason why. Most
  // groups have no dated plot at all, so one house-wide median would drag the
  // span down and re-wring cultures nobody had touched - a widening that
  // re-ranked the queue as a side effect of looking somewhere new.
  it("holds a median per kind, so one population cannot re-rank another", () => {
    expect(s.medianSpanBy.get("culture")).toBe(s.medianSpan);
    expect(s.medianHoleBy.get("culture")).toBe(s.medianHole);
    const groupSpans = s.rows.filter((r) => r.kind === "group").map((r) => r.span);
    const allSpans = s.rows.map((r) => r.span);
    // The two populations really are different, or this guard proves nothing.
    expect(Math.max(...groupSpans)).toBeLessThan(Math.max(...allSpans));
  });

  // group_coverage answers where company_coverage refuses. `dead` IS uncast, and
  // noOrigin/noPresent are the same two questions asked of any plot line.
  it("reads a group off its own wall, mapped onto the same ledger", () => {
    for (const g of allGroups()) {
      const row = s.rows.find((r) => r.kind === "group" && r.id === g.id);
      expect(row, `${g.id} must be in the survey`).toBeTruthy();
      const c = groupCoverage(g.id);
      expect(row.origin).toBe(!c.noOrigin);
      expect(row.present).toBe(!c.noPresent);
      expect(row.uncast).toEqual(c.dead);
      expect(row.chain.length).toBe(c.unlinked.length + c.orphans.length + c.broken.length);
      // Level 1 deliberately: a group is not in the ISO tree, it collects the
      // things that are, so it stands where a country stands.
      expect(row.level).toBe(1);
      expect(row.migrated).toBe(g.migrated);
    }
  });

  it("wrings a broken chain as wrong, because the chapter claims a chain it has not got", () => {
    const clean = {
      disordered: false,
      flat: [],
      blocking: 0,
      origin: true,
      present: true,
      uncast: [],
      chain: [],
      hollow: false,
      migrated: true,
    };
    expect(rungOf(clean)).toBe(SETTLED);
    expect(rungOf({ ...clean, chain: ["a plot no entry chains"] })).toBe(0);
  });

  it("counts chain faults per item, so eight orphans outrank one", () => {
    const base = {
      disordered: false,
      flat: [],
      blocking: 0,
      origin: true,
      present: true,
      uncast: [],
      chain: [],
      hollow: false,
      migrated: true,
      level: 1,
    };
    const one = scoreOf({ ...base, chain: ["a"] }).total;
    const eight = scoreOf({ ...base, chain: [..."abcdefgh"] }).total;
    expect(eight - one).toBe(7 * WEIGHTS.chain);
  });

  // Written when the population was empty, and rewritten by the first play that
  // filled it. What matters is not the count but that a sunken unit is ranked as
  // sunken and is NOT a culture: `cimbri` entering `cultureIds()` moved the
  // umbrella's minor to 320 and had the complete-theatre wall demanding a pitch of
  // a people that ended in 101 BC.
  it("ranks the sunken as sunken, and never as a culture", () => {
    const ids = sunkenUnits().map((u) => u.id);
    for (const id of ids) {
      expect(coveredCultureIds(), `"${id}" is sunken and must not be a culture`).not.toContain(id);
      const row = s.rows.find((r) => r.id === id);
      expect(row, `"${id}" must be in the survey`).toBeTruthy();
      expect(row.kind).toBe("sunken");
    }
    expect(s.rows.filter((r) => r.kind === "sunken").map((r) => r.id)).toEqual(ids);
  });
});

describe("Cultures house: a title names the thing", () => {
  // A tongues release rewrites the dependency range in 120 manifests. Both prose
  // walls read only markdown, so charging them off a version bump made 117 units
  // answerable for READMEs nobody opened - measured, the first time a tongue was
  // added after these walls landed, and both went red on other packages' prose.
  // `links` keeps the wide default on purpose: a cast specifier must be a declared
  // dependency, so a manifest edit really is its business.
  it("is charged by prose and not by a dependency bump", () => {
    expect(isMarkdown("packages/khai-cultures-albania/README.md")).toBe(true);
    expect(isMarkdown("packages/khai-cultures-albania/package.json")).toBe(false);
    expect(isMarkdown("package-lock.json")).toBe(false);
  });

  it("knows a label from a name", () => {
    expect(restatesType("place", "Place: Corti")).toBe(true);
    expect(restatesType("plot", "Plot - U Riacquistu")).toBe(true);
    expect(restatesType("persona", "Persona: the Singer")).toBe(true);
    expect(restatesType("position", "position: a pulinumia")).toBe(true);
    // Begins with the word, but nothing is bolted on: these are what the thing
    // is called, and a wall that flagged them would be renaming real places.
    expect(restatesType("place", "Place de la Concorde")).toBe(false);
    expect(restatesType("plan", "Plan B: the fallback")).toBe(false);
    expect(restatesType("place", "Corti")).toBe(false);
  });

  it("reads the type and title off the front matter, or answers null", () => {
    expect(declared('---\nkhai: place\ntitle: "Corti"\n---\n\n# Corti')).toEqual({
      kind: "place",
      title: "Corti",
    });
    expect(declared("# Corti\n\nNo front matter here.")).toBe(null);
    expect(declared("---\nstamp: x\n---\n")).toBe(null);
  });

  // The absolute half. 485 nodes of three types, at zero, and this is what keeps
  // them there - the ratchet in ci.yml can only charge a unit somebody opened.
  it("holds play, order and instructions at zero, which is where they already are", () => {
    const roots = [join(workspaceRoot, "packages"), join(workspaceRoot, "management")];
    const settled = new Set(["play", "order", "instructions"]);
    const offenders = [];
    const walk = (dir) => {
      for (const e of readdirSync(dir, { withFileTypes: true })) {
        if (e.name === "node_modules" || e.name.startsWith(".")) continue;
        const full = join(dir, e.name);
        if (e.isDirectory()) walk(full);
        else if (e.name.endsWith(".md")) {
          const d = declared(readFileSync(full, "utf8"));
          if (d && settled.has(d.kind) && restatesType(d.kind, d.title))
            offenders.push(`${full.slice(workspaceRoot.length + 1)}: "${d.title}"`);
        }
      }
    };
    for (const r of roots) if (existsSync(r)) walk(r);
    expect(offenders).toEqual([]);
  });
});
