import { describe, it, expect } from "vitest";
import { dirname, join } from "node:path";
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { validateProject, validateInstanceFile } from "@chbrain/khai-tests";
import { referenceCard } from "@chbrain/khai-arch";
import { validateProjectLanguages } from "@chbrain/khai-language";
import { parentOf } from "./culture_conformance.mjs";
import { packageFiles as tonguePackageFiles, TONGUES } from "./tongues_standalone.mjs";
import { declared } from "./type_titles.mjs";
import { noMotherTongue } from "./persona_wiring.mjs";
import { cultures, productions, migratedGroups } from "./culture_sources.mjs";
import { asks, dependencies } from "./next.mjs";
import { findings as productionFindings, umbrellaFindings } from "./production_packages.mjs";
import { culturesDir, here, root } from "./house_support.mjs";

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
