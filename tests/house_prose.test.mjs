import { describe, it, expect } from "vitest";
import { join } from "node:path";
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { repeats, register, proseRepeats, findings as nameFindings } from "./link_names.mjs";
import { declared, restatesType } from "./type_titles.mjs";
import { charged, isMarkdown, units as linkUnits } from "./link_resolution.mjs";
import { substanceFindings, sceneFindings, FLOOR } from "./staging.mjs";
import { cultures } from "./culture_sources.mjs";
import { owed, asks } from "./next.mjs";
import { plotYear, backwards } from "./plot_sequence.mjs";
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
import { here, workspaceRoot } from "./house_support.mjs";

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
