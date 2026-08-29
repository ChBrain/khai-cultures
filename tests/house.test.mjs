import { describe, it, expect } from "vitest";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { validateProject } from "@chbrain/khai-tests";
import { referenceCard } from "@chbrain/khai-arch";
import { validateProjectLanguages } from "@chbrain/khai-language";
import {
  coverage,
  cultureIds as coveredCultureIds,
  allWaivers,
  touchedCultures,
  report as coverageReport,
} from "./company_coverage.mjs";
import { standalone } from "./tongues_standalone.mjs";
import { widths, noMotherTongue } from "./persona_wiring.mjs";
import { cultures, productions, MONOLITH_DIR } from "./culture_sources.mjs";
import { findings as productionFindings, umbrellaFindings } from "./production_packages.mjs";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..", "packages", "khai-cultures");
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
    // Two of the kit's registry findings are true of a hybrid house and are not
    // faults: a migrated culture is in the registry with no directory under
    // cultures/, so `validateCollectionRegistry` reports the missing directory
    // and then reports the file as out of date with a build that only counts
    // directories. They are dropped here because they are REPLACED, not waived:
    // `tests/registry_hybrid.mjs` recomputes the whole registry - both halves
    // built by the kit - and `tests/migration.test.mjs` asserts it has no drift.
    // Dropping them without that replacement would leave the house with no drift
    // check at all, which is the shape of failure this repository keeps finding.
    const migrated = productions().map((p) => p.id);
    const hybridNoise = (file, e) =>
      file.endsWith("registry.json") &&
      (/registry\.json is out of date with its source/.test(e) ||
        migrated.some((id) => e.includes(`declares culture "${id}"`)));
    const errors = results
      .flatMap((r) => (r.errors ?? []).map((e) => [r.file, e]))
      .filter(([file, e]) => !hybridNoise(file, e))
      .map(([file, e]) => `${file}: ${e}`);
    expect(errors).toEqual([]);
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

// Filenames must be ASCII. A non-ASCII filename (Danish oe/ae written as the raw
// letter, German umlauts, and the like) breaks its links across platforms: macOS
// stores paths decomposed (NFD) and Linux composed (NFC), so a link's bytes stop
// matching the stored name, and tooling and zip-bundling mishandle the UTF-8
// path. The house convention transliterates; this guard makes that a gate, not a
// habit.
describe("House: filenames are ASCII", () => {
  it("no file carries a non-ASCII name", () => {
    const offenders = [];
    const walk = (dir) => {
      for (const e of readdirSync(dir, { withFileTypes: true })) {
        if (e.name === "node_modules" || e.name.startsWith(".")) continue;
        const full = join(dir, e.name);
        if (/[^\x00-\x7F]/.test(e.name)) offenders.push(full.slice(root.length + 1));
        if (e.isDirectory()) walk(full);
      }
    };
    walk(root);
    expect(
      offenders,
      `non-ASCII filenames break links across platforms (NFC/NFD); transliterate them: ${offenders.join(", ")}`,
    ).toEqual([]);
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
