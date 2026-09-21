// Persona wiring: the two edges a script can hold, as a ratchet.
//
// A linguistic fact about a person is held by three forces at once. The language
// engine owns the width of a grip - how well, on which channel - and ships that
// as a closed set of processes. The tongues package owns which tongue is being
// gripped, and what that tongue gives, orders, loses and drives. The persona owns
// only what is true of them and of nobody else holding the same tongue at the
// same width.
//
// Two of those edges are decidable and so belong here rather than in a document:
//
//   1. A grip needs a tongue. A Projection that says how well someone speaks and
//      never says what, has named a width with nothing under it.
//   2. A tongue nobody acquires first is nobody's mother tongue. Swiss Standard
//      German says in its own text that it is written and read aloud and hardly
//      spoken; two personas held it as a first language anyway, because prose
//      cannot be checked and a flag can.
//
//   3. A persona is written in its mother tongue. This is the house's rule, and it
//      is only decidable where the Projection links exactly ONE tongue, so that is
//      the only place it is asked. See WHY ONLY ONE, below, which is the whole
//      care in this rule.
//
//   4. A persona HAS a mother tongue. Nearly everyone grew up dominant in one
//      language, so a Projection that names grips and never names that one has
//      left out the fact the other three rules stand on.
//
// HOW STRONG THAT FOURTH CLAIM IS, AND IT IS WEAKER THAN IT FIRST READ. A draft
// of this header said two mother tongues was "possible and very unlikely". That
// is not what the research says. About half the world is functionally bilingual
// and the majority of those bilinguals are native speakers of BOTH their
// languages; native bilingual communities across South America, Africa and Asia
// are places where a monolingual norm may not exist at all; and Canada's census
// recognises more than one mother tongue outright, where the languages were
// learned at the same time and are both still understood. In a house of three
// hundred and nineteen world cultures, two is not an exception.
//
// So rule 4 asks only that the file SAY. Its finding is a prompt to read, and it
// is answered three ways: name the language, or say this persona holds two, or
// say they hold none. What it refuses is silence, which is the one thing a reader
// cannot weigh. A persona who really holds two has no single language their file
// must be written in, and rule 3 already declines them - the Projection links
// more than one tongue, so it is not asked.
//
// AND THE FORK THIS HOUSE HAS NOT DECIDED. "Mother tongue" and "dominant
// language" are different things and the literature keeps them apart: L1 is the
// order of acquisition, mother tongue and heritage name family and culture, and
// dominance names institutions and present proficiency. They diverge
// systematically in one population - heritage speakers, who acquire the home
// language first and then shift, because "most often their language dominance
// shifts with schooling".
//
// That is `united_kingdom/persona_aisha.md`, and it means the reading below has a
// twin. UNESCO, the UN and Canada all define mother tongue by CHILDHOOD HOME
// ACQUISITION, and on that definition her parents' language is her mother tongue,
// English is her dominant language, and a file that names English `worn` is
// describing acquisition correctly. On a dominance definition the wiring is
// backwards. Rule 3 keys on the grip the engine ships, which is named
// `mother_tongue`, so it currently follows the first reading - and which of the
// two governs "the language the file is written in" is not a counter's call. It
// is carried in order_the_mother_tongue.md as the open question it is.
//
// WHAT "MOTHER TONGUE" MEANS HERE, BECAUSE THE WORD MISLEADS. It is the one
// language a persona grew up dominant in. It is not the language their mother
// speaks, and it is not family heritage - those are extremely often the same
// thing and the sameness is not the point.
//
// `united_kingdom/persona_aisha.md` is what the distinction costs. English is
// "already on her lip before she reaches for it" and carries "every public hour
// of her day", and it is wired `worn`; her parents' language, which she was
// "never schooled in" and keeps "for the family table", is the heritage. Her
// dominant language is English and the file says she wears it. Read as heritage,
// the wiring looks right. Read as dominance, it is backwards.
//
// THE LANGUAGE IS RESOLVED, NOT READ. Eighteen personas carry no `language:` of
// their own, and a first draft of rule 3 called that a finding - which would have
// invented a requirement the canon explicitly declines to make.
// `resolveLanguageTag` in the language engine has a stated file -> play -> house
// precedence, so a persona without the field inherits its play's language by
// design, and 1,243 of 1,261 declare one only because that is the habit here and
// not because it is owed. So this rule resolves the same way the canon does, and
// asks about the language the file is ACTUALLY written in rather than about the
// presence of a field.
//
// WHY ONLY ONE, AND WHAT IT COST TO LEARN. The first measurement of rule 4 used
// `gripped` - the nearest-tongue heuristic rule 2 relies on - and reported 247
// personas across 120 cultures. That number was almost entirely wrong.
// `us_california/persona_chloe.md` says in plain words that Californian English is
// her mother tongue and that Spanish is what she "puts on like a coat", and the
// heuristic returned the Spanish, because the coat sits a few characters closer to
// the mother-tongue process than the mother tongue does. Distance is enough for
// rule 2, which only asks whether a tongue is one nobody acquires first and can
// absorb an occasional mis-pick; it is not enough to decide which language a file
// must be WRITTEN in. So rule 4 declines to guess: 662 personas link one tongue
// and are asked, 588 link more and are not, and those 588 belong to the packages'
// playwright instructions for the same reason the paragraph below gives.
//
// Neither rule is typed here. The widths come from the language engine's own
// manifest and the tongues from `khai.wiring` in the tongues package, because a
// rule written in two places is a rule that will disagree with itself.
//
// What is NOT here: whether a Projection repeats what its tongue already says.
// That was tried and it cannot be decided by a script - no check separates a
// persona naming its tongue, which is right, from a persona describing it, which
// is the tongue's job done twice. It belongs to the packages' playwright
// instructions, where it is applied while the prose is being written.
//
// Held as a ratchet on the cultures a pull request touches, like coverage and
// sub-national conformance. Touch a culture, leave it wired.

import { readFileSync, readdirSync, existsSync, statSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { execFileSync } from "node:child_process";
import { cultureIds, touchedCultures } from "./company_coverage.mjs";
import { cultureUnits, notCultureNote } from "./culture_sources.mjs";
import { cultureDir } from "./culture_sources.mjs";

// Two roots, because they are two things. WORKSPACE holds node_modules, where the
// manifests this gate reads its rules out of are installed; ROOT is the house
// package, whose personas are what the rules are read against.
export const WORKSPACE = join(dirname(fileURLToPath(import.meta.url)), "..");
export const ROOT = join(WORKSPACE, "packages", "khai-cultures");

const manifest = (pkg) =>
  JSON.parse(readFileSync(join(WORKSPACE, "node_modules", pkg, "package.json"), "utf8")).khai;

/** The widths a grip can take: the leaves of the language engine's own tree. */
export function widths() {
  const members = manifest("@chbrain/khai-engine-language").members ?? [];
  const parents = new Set(members.map((m) => m.parent).filter(Boolean));
  return new Set(members.filter((m) => m.parent && !parents.has(m.file)).map((m) => m.file));
}

/** The tongues nobody acquires first, as the tongues package declares them. */
export function noMotherTongue() {
  const wiring = manifest("@chbrain/khai-cultures-tongues").wiring ?? {};
  return new Set((wiring.noMotherTongue ?? []).map((f) => f.split("/").pop()));
}

const WIDTH = /process_(?:speaking|hearing|reading|writing|thinking)_[a-z_]+\.md/g;
const TONGUE = /position_language_[a-z0-9_]+\.md/g;

// Two objects for one pattern: `matchAll` needs the /g flag and `test` on a /g
// regex carries lastIndex between calls, which silently answers false every other
// time it is asked. The bug that costs an afternoon.
const MOTHER_ALL = /process_(?:speaking|hearing|reading|writing|thinking)_mother_tongue\.md/g;
const MOTHER = /process_(?:speaking|hearing|reading|writing|thinking)_mother_tongue\.md/;

/**
 * The tongue a grip grips: the nearest tongue link in the Projection, measured
 * in characters and looking both ways.
 *
 * Sentence structure will not carry this. Splitting on punctuation puts Etter's
 * dialect and the Hochdeutsch he only writes in one clause, because German joins
 * them with `, doch`; taking the next tongue after the grip reads Katharina's
 * `Muttersprache ist [Alemannisch] ... in dem sie [spricht]; [Hochdeutsch] ist
 * die Sprache der Gesetze` backwards, because her tongue is named before her
 * grip and the office language after it. Distance survives both, in both
 * directions, because prose puts the tongue beside the grip that takes it
 * whichever order the clause runs in - and it is measured over the whole
 * Projection, so the reading does not depend on where a full stop happens to
 * fall.
 */
const gripped = (proj) => {
  const tongues = [...proj.matchAll(TONGUE)].map((m) => ({ t: m[0], i: m.index }));
  return [...proj.matchAll(MOTHER_ALL)].map((g) => {
    const distance = (t) =>
      t.i >= g.index ? t.i - (g.index + g[0].length) : g.index - (t.i + t.t.length);
    return tongues.reduce((a, b) => (a === null || distance(b) < distance(a) ? b : a), null)?.t;
  });
};

export const projection = (text) => text.split("## Projection")[1]?.split("\n## ")[0] ?? "";

/** What a file says it is written in, or null. */
const declaredLanguage = (text) => /^language:\s*(\S+)/m.exec(text)?.[1] ?? null;

/**
 * The language a file is written in, resolved the way the canon resolves it.
 *
 * File first, then the play beside it. That precedence is the language engine's
 * own (`resolveLanguageTag`: file -> play -> house), and reading only the file
 * would charge eighteen personas for inheriting a language they are entitled to
 * inherit.
 */
export function languageOf(text, dir) {
  const own = declaredLanguage(text);
  if (own) return own;
  const play = readdirSync(dir).find((f) => f.startsWith("play_"));
  return play ? declaredLanguage(readFileSync(join(dir, play), "utf8")) : null;
}

/** Every tongue a Projection actually LINKS, as written targets. */
const TONGUE_LINK = /\[[^\]]*\]\(([^()\s]*position_language_[a-z0-9_]+\.md)\)/g;

/** Every grip in a Projection, with which width it is. */
const GRIP_KIND = /process_(?:speaking|hearing|reading|writing|thinking)_([a-z_]+)\.md/g;

/**
 * The one tongue a Projection links, or null when it links none or several.
 *
 * Targets and not basenames, because a persona reaches a tongue three ways and
 * two of them leave the culture: its own directory, a sibling culture's
 * (`../australia/position_language_en_au.md`, which is how Somare holds Tok
 * Inglis), and the tongues package by specifier. A first pass resolved basenames
 * and reported seven tongues the house did not hold; all seven were held, in
 * sibling directories, and the finding was an artefact of not following the link.
 */
export function soleTongue(proj, fromDir) {
  const links = [...proj.matchAll(TONGUE_LINK)];
  const targets = [...new Set(links.map((m) => m[1]))];
  if (targets.length !== 1) return null;
  const target = targets[0];

  // AND IT HAS TO BE THE MOTHER'S TONGUE, NOT MERELY THE ONLY ONE.
  //
  // One tongue link removes the question Chloe's case poses - which of several
  // tongues the mother grip takes - and leaves a second one, which the first cut
  // of this rule missed: whether that single tongue belongs to the mother grip at
  // all. `guinea_bissau/persona_okinka_pampa.md` says in her own prose that her
  // language is Bijago, a tongue this house does not hold, and the only tongue she
  // LINKS is the Portuguese she "ta karega di longi" - carries from far off. The
  // rule read the one link as her mother tongue and charged her for prose that was
  // right.
  //
  // So the tongue must sit nearer a mother grip than to any other grip. That is a
  // distance test, and a much weaker one than the test that failed: it is not
  // choosing between tongues, only asking which grip this one tongue is beside.
  // Der Abt keeps his finding - `[Schweizerdeutsch](gsw)` sits next to `spricht`
  // and the Latin he writes in is named in prose without a link - and Okinka Pampa
  // loses hers, because `borrowed` is closer to the Portuguese than her mother
  // grips are.
  const at = links[0].index;
  const end = at + links[0][0].length;
  let mother = Infinity;
  let other = Infinity;
  for (const g of proj.matchAll(GRIP_KIND)) {
    const d = g.index >= end ? g.index - end : at - (g.index + g[0].length);
    if (g[1] === "mother_tongue") mother = Math.min(mother, d);
    else other = Math.min(other, d);
  }
  if (!(mother < other)) return null;
  const path = target.startsWith(TONGUES_SPEC)
    ? join(WORKSPACE, "packages", "khai-cultures-tongues", target.slice(TONGUES_SPEC.length))
    : resolve(fromDir, target);
  if (!existsSync(path)) return null;
  return { target, language: declaredLanguage(readFileSync(path, "utf8")) };
}

const TONGUES_SPEC = "@chbrain/khai-cultures-tongues/";

/** What one culture's personas still owe. Every finding blocks. */
export function wiring(id) {
  const dir = cultureDir(id);
  if (!dir || !existsSync(dir)) return [];
  const known = widths();
  const unacquired = noMotherTongue();
  const findings = [];
  for (const file of readdirSync(dir).filter((f) => f.startsWith("persona_"))) {
    const proj = projection(readFileSync(join(dir, file), "utf8"));
    if (!proj) continue;
    const grips = proj.match(WIDTH) ?? [];
    const tongues = proj.match(TONGUE) ?? [];

    if (grips.length && !tongues.length) findings.push(`${file}: a grip with no tongue under it`);

    for (const g of new Set(grips))
      if (!known.has(g)) findings.push(`${file}: ${g} is not a width the language engine ships`);

    for (const t of new Set(gripped(proj)))
      if (unacquired.has(t))
        findings.push(`${file}: holds ${t} as a mother tongue, which nobody acquires first`);

    // Rule 4, and it needs no heuristic at all: grips, and none of them the one
    // that says which language this person grew up dominant in.
    //
    // Two shapes come out of it. `persona_aisha.md` holds her dominant language
    // under `worn`, which is a wiring fault with the prose already right. And
    // `libya/persona_septimius.md` grew up in Punic - "لغة أهله ومدينته", carried
    // as one carries the language of home - which this house does not hold and
    // cannot, so his file is in Arabic, a language that reached that coast
    // centuries after he died. The second shape cannot be cleared by wiring. Both
    // are worth saying out loud, and neither is decided here.
    if (grips.length && !MOTHER.test(proj)) {
      findings.push(
        `${file}: grips but no mother tongue; nearly everyone grew up dominant in ` +
          `one language, so say which - or say that this one holds two, or none`,
      );
      continue;
    }
    if (!MOTHER.test(proj)) continue;
    const wrote = languageOf(readFileSync(join(dir, file), "utf8"), dir);
    if (!wrote) continue;
    const sole = soleTongue(proj, dir);
    if (sole && sole.language && sole.language !== wrote)
      findings.push(
        `${file}: written in "${wrote}" and holds ${sole.target} as its mother tongue, ` +
          `which is "${sole.language}"; a persona is written in the tongue they speak`,
      );
  }
  return findings.sort();
}

function report() {
  const rows = cultureIds()
    .map((id) => [id, wiring(id)])
    .filter(([, f]) => f.length);
  const n = rows.reduce((a, [, f]) => a + f.length, 0);
  console.log(`persona wiring: ${n} finding(s) across ${rows.length} culture(s)`);
  for (const [id, f] of rows) for (const line of f) console.log(`  ${id}/${line}`);
}

function gate(base, head) {
  const changed = execFileSync("git", ["diff", "--name-only", base, head], {
    encoding: "utf8",
    maxBuffer: 32 * 1024 * 1024,
  })
    .split("\n")
    .filter(Boolean);
  const touched = touchedCultures(changed);
  if (!touched.length) {
    console.log("Persona wiring: no culture touched.");
    return 0;
  }
  // A migrated group is a unit and not a culture, and `touchedCultures` maps
  // paths through `pathCulture`, which answers in units. See
  // management/orders/order_a_group_is_not_a_culture.md.
  const { cultures: charged, notCultures } = cultureUnits(touched);
  const skipped = notCultureNote(notCultures);
  if (skipped) console.log(skipped);
  if (!charged.length) {
    console.log("Persona wiring: no culture touched.");
    return 0;
  }
  const offenders = charged.map((id) => [id, wiring(id)]).filter(([, f]) => f.length);
  if (!offenders.length) {
    console.log(`Persona wiring OK: ${charged.length} touched culture(s).`);
    return 0;
  }
  console.error("::error::Persona wiring: a touched culture must come out wired.");
  for (const [id, f] of offenders) for (const line of f) console.error(`  ${id}/${line}`);
  return 1;
}

/**
 * One culture, answered directly. Every report in this repository is something
 * someone will reach for with a grep, and a grep cannot tell an absent row from
 * a hidden one - which is how a culture carrying four dead entries got into a
 * branch as "clean". This report is not truncated, but the query is the safe
 * habit, so all three checks offer it.
 */
function reportCulture(id) {
  if (!cultureIds().includes(id)) {
    console.error(`no such culture: ${id}`);
    return 2;
  }
  const findings = wiring(id);
  console.log(`${id}: ${findings.length} finding(s)`);
  for (const f of findings) console.log(`  ${f}`);
  return 0;
}

const isMain = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
const argv = isMain ? process.argv.slice(2) : [];
if (argv.includes("--culture")) process.exit(reportCulture(argv[argv.indexOf("--culture") + 1]));
else if (argv.includes("--report")) report();
else if (argv.includes("--gate")) {
  const base = argv[argv.indexOf("--base") + 1];
  const head = argv[argv.indexOf("--head") + 1];
  if (!base || !head) {
    console.error("usage: persona_wiring.mjs --gate --base <sha> --head <sha>");
    process.exit(2);
  }
  process.exit(gate(base, head));
}
