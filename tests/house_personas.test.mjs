import { describe, it, expect } from "vitest";
import { join } from "node:path";
import { readFileSync, readdirSync, existsSync, mkdtempSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { validateProject } from "@chbrain/khai-tests";
import { coverage, cultureIds as coveredCultureIds, allWaivers } from "./company_coverage.mjs";
import { conformance } from "./culture_conformance.mjs";
import { charged } from "./link_resolution.mjs";
import {
  widths,
  noMotherTongue,
  projection as personaProjection,
  soleTongue,
  languageOf,
  wiring as personaWiring,
} from "./persona_wiring.mjs";
import { cultures, cultureDir } from "./culture_sources.mjs";
import { owed, asks, inherit } from "./next.mjs";
import { REQUIRED_TYPES, cultureDirs, here } from "./house_support.mjs";

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
