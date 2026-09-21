// A file writes its language's diacritics, or it is not written in that language.
//
// Found while moving Madrid's tongue out of the umbrella. Its body reads "la
// conjugacion del verbo", "la distincion entre la ese y la zeta", "el laismo" -
// correct Spanish with every accent removed. It was the third such file in a row
// after es_es_ct and es_es_nc, which is the point at which three accidents stop
// being accidents.
//
// Measured across the house: fifty files declare a language whose other files
// carry diacritics, and carry none themselves. Nothing in this repository folds
// accents - no build step, no generator - so these were written this way and
// have sat unread ever since. The house has thirteen walls and not one of them
// looks at whether the prose is spelled in the language it claims.
//
// NO WORD IS EVER JUDGED. Spanish cannot be spell-checked by machine here, and
// the corpus proves it: que/qué, como/cómo, solo/sólo, esta/está, paso/pasó,
// mas/más, este/esté are all real pairs of real words with different meanings,
// and all of them occur in this house in both spellings, correctly. A counter
// that added accents by frequency would corrupt the prose it was hired to
// protect. Which word is missing which accent is a reading, and readings are
// not a counter's business. That has not changed and must not.
//
// WHAT CHANGED, AND WHY IT HAD TO. This wall first asked whether a file carried
// ONE mark, and a file with one passed. That is the same question asked of three
// hundred words as of sixty, and it let the wall be bought off for a single
// character. Three of guinea_bissau's twenty-one mislabelled files were invisible
// to it for exactly that reason - one stray accent each - and worse, so was
// `position_language_es_es_md.md`, THE FILE THIS WALL WAS WRITTEN FOR. It still
// reads "la conjugacion del verbo", "la distincion entre la ese y la zeta", "el
// laismo", and three surviving marks (español, América, acompaña) hid all of it.
// A wall that cannot see its own founding example is not measuring what it says.
//
// SO THE QUESTION IS NOW ABOUT DENSITY, AND STILL NOT ABOUT WORDS. A file is
// flat when it carries almost nothing of what its own language carries: at most
// SHARE of the marks that language's own files show over prose this long. The
// density is the language's own median, taken from the corpus exactly as
// accentUsing takes membership from it - no external list, no dictionary.
//
// TWO GUARDS KEEP IT HONEST. A rate alone would be useless: the house spans
// three orders of magnitude, from Sesotho at 3.3 marks per hundred words to
// Vietnamese at 613, and the low tail runs continuously through legitimate
// Sesotho. So the comparison is always to the file's OWN language, and it is
// only made when that language would owe at least MIN_EXPECTED marks over prose
// this long - the same reasoning as FLOOR, since a language that owes four
// marks cannot be said to be missing them. Lesotho and San Marino sit below
// that line and are not scored, which is correct: their question is a reading.
//
// A POISSON TAIL TEST WAS TRIED FIRST AND IS WRONG. Marks cluster by topic and
// by name, so the variance is nothing like Poisson: at lambda 1318 the tail is
// razor-thin and a perfectly good Vietnamese file of 933 marks scored p = 0.
// It flagged ordinary variation in dense languages and was abandoned.
//
// THE THRESHOLD SITS IN A MEASURED GAP. Across the house, 15% and 20% catch the
// same four files and nothing lies between 11.6% and 21.1%, so the choice is
// not delicate. SHARE is the low end of that plateau. The four are flagrant -
// accent-stripped French Canadian ("Quebec", "Revolution tranquille", "etre
// maitre") and accent-stripped Spanish ("distincion", "acompana", "preterito").
//
// AND IT STILL DOES NOT CATCH EVERYTHING, BY DESIGN. Just above the plateau sits
// es_gq at 21%, which is PARTLY stripped - "numero", "prestamo", "lexico" flat
// while español, género and ndowé stand. Partial stripping is a continuum and a
// counter cannot cut it; that is the same limit the first paragraph states. This
// wall catches the flagrant case and says so. It does not claim the rest.
//
// THERE ARE TWO REMEDIES AND THE WALL DOES NOT CHOOSE. Thirty-nine of the fifty
// are the cape_verde and guinea_bissau cultures, whose files declare `language:
// pt` and whose prose is not Portuguese at all: "a lingua-mae das ilhas", "undi
// tudu genti ta bin". That is Kabuverdianu and Guinea-Bissau Kriol, written in
// orthographies that use almost no accents, and both cultures already carry two
// files each declaring `kea` and `pov` correctly. Those files do not need
// accents added; they need their `language:` told the truth. So the wall reports
// the fact and names both cures, because it cannot tell unaccented Portuguese
// from accurate Kriol and must not pretend to. See order_voice_from_inside.md.
//
// HELD AS A RATCHET. The fifty are not charged to whoever next walks past them.
// The wall fires on a file whose CONTENT this change wrote, so a byte-identical
// move out of the umbrella carries no debt and a rewritten paragraph does. The
// count comes down as the house is walked, the way the sub-national count does.

import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { execFileSync } from "node:child_process";
import { pathToFileURL } from "node:url";
import { WORKSPACE, PACKAGES } from "./culture_sources.mjs";

/** Prose only: the frontmatter is machine text and spells nothing. */
export function body(text) {
  const m = /^---\r?\n[\s\S]*?\r?\n---\r?\n/.exec(text);
  return m ? text.slice(m[0].length) : text;
}

/** The language a file claims to be written in, or null. */
export function declaredLanguage(text) {
  const m = /^---\r?\n([\s\S]*?)\r?\n---/.exec(text);
  if (!m) return null;
  const hit = /^language:\s*"?([\w-]+)"?\s*$/m.exec(m[1]);
  return hit ? hit[1] : null;
}

const MARKS = /\p{Mn}/u;
/** Does this prose carry a single combining mark? */
export const marked = (prose) => MARKS.test(prose.normalize("NFD"));

const ALL_MARKS = /\p{Mn}/gu;
/** How many combining marks this prose carries, however it is normalised. */
export const markCount = (prose) => (prose.normalize("NFD").match(ALL_MARKS) ?? []).length;

/**
 * A word, in any script the house writes in.
 *
 * THIS WAS ASCII-ONLY AND THE WALL DID NOT KNOW IT. The pattern was
 * `[^\W\d_]{3,}`, and `\w` stays ASCII under the `u` flag, so `\W` matched every
 * letter outside A-Z. Greek, Cyrillic, Armenian, Arabic, Hebrew, Devanagari,
 * Georgian, kana and han all counted as nothing, and the only words such a file
 * scored were the Latin words in its own scaffolding - `Parent group: positions`,
 * `Project: khai-cultures`. Thirteen of them, in a file of two thousand letters.
 *
 * MEASURED: 1,199 files in this house hold more than four hundred letters of real
 * prose and scored below FLOOR, so `flat` declined every one of them. The Greek
 * files are the ones that show what it cost: `plot_99_o_kosmos_erchetai.md` carries
 * 289 combining marks and was scored at 41 words. Greek prose with its accents
 * stripped is the same fault as the Spanish and French this wall was written for,
 * and the wall could not see a single instance of it. A gate that goes quiet when
 * it cannot read a file passes for the wrong reason.
 *
 * `\p{M}` rides along with `\p{L}` so a base letter and its marks count as one
 * word and not as two, which matters for every script that writes a vowel as a
 * mark rather than a letter.
 *
 * WHAT THE WIDENING ADDS, measured before it was kept: twenty-three languages enter
 * the wall's scope, 36 to 59 - be bg bn div dzo el fa hi ja kk km ky lo mk mn my ne
 * ru si tg th uk ur, and none lost - and it reports NO new findings. The ten standing findings are the
 * same ten. The house's non-Latin prose is already spelled correctly; the wall
 * simply had no way to say so.
 *
 * WHAT IT STILL DOES NOT DO. Chinese and Cantonese carry no combining marks, so
 * they never reach the accented set and are never scored, which is right - there
 * is no accent to strip. And in a script written without spaces, `{3,}` counts
 * RUNS and not words, which is crude; it is also self-consistent, because the
 * density a file is measured against is computed from the same corpus with the
 * same counter. That is the argument this wall already makes for taking each
 * language's own median instead of one global rate.
 *
 * And Yiddish, which is the case that exposed all of this, is still not scored: a
 * single file cannot reach QUORUM, so `yi` never becomes an accented language. The
 * fix this file needed was never about Yiddish. It was about the twenty-three.
 */
const WORDS = /[\p{L}\p{M}]{3,}/gu;
/** Enough running prose to have owed an accent. A stub proves nothing. */
export const FLOOR = 60;
export const wordCount = (prose) => (prose.match(WORDS) ?? []).length;

/** Every markdown file under packages/, as repo-relative paths. */
export function sources(root = PACKAGES) {
  const out = [];
  const walk = (dir) => {
    for (const name of readdirSync(dir)) {
      if (name === "node_modules" || name === ".git") continue;
      const p = join(dir, name);
      if (statSync(p).isDirectory()) walk(p);
      else if (name.endsWith(".md")) out.push(relative(WORKSPACE, p));
    }
  };
  walk(root);
  return out.sort();
}

/**
 * Which languages this house writes with diacritics, decided by the house.
 *
 * No external list: a language is accented here if its own files say so. The
 * threshold is deliberately blunt - most of the files, and enough files to have
 * an opinion - because the question it settles is coarse. English, Malay and
 * Swahili fall out on their own; so does a language of eight files where five
 * are flat, which is a finding of its own and not something to assert from.
 */
export const QUORUM = 8;
export const MAJORITY = 0.7;

/**
 * A Map, not a Set, and the value carries the weight.
 *
 * `.has(lang)` answers the old question, so every caller that only asked
 * whether a language is accented still reads the same. `.get(lang)` is that
 * language's own density: the MEDIAN marks-per-word across its marked files.
 * The median and not the mean, because the flat files are in this corpus too
 * and a mean would let them drag down the very line they are measured against.
 */
export function accentUsing(files = sources(), read = readCached) {
  const seen = new Map();
  for (const p of files) {
    const text = read(p);
    if (text === null) continue;
    const lang = declaredLanguage(text);
    if (!lang) continue;
    const prose = body(text);
    const words = wordCount(prose);
    if (words < FLOOR) continue;
    const row = seen.get(lang) ?? { files: 0, marked: 0, rates: [] };
    row.files += 1;
    const n = markCount(prose);
    if (n > 0) {
      row.marked += 1;
      row.rates.push(n / words);
    }
    seen.set(lang, row);
  }
  const out = new Map();
  for (const [lang, r] of seen) {
    if (r.files < QUORUM || r.marked / r.files < MAJORITY) continue;
    const sorted = r.rates.sort((a, b) => a - b);
    out.set(lang, sorted[Math.floor(sorted.length / 2)]);
  }
  return out;
}

/**
 * How few marks is too few, once the language is known to use them.
 *
 * SHARE sits at the low end of a measured plateau: across the house 15% and
 * 20% catch the same four files, and nothing lies between 11.6% and 21.1%.
 * MIN_EXPECTED is FLOOR's argument applied to marks instead of words - a
 * language that would owe four marks over this much prose cannot be said to be
 * missing them, so the wall does not score that file at all.
 */
export const SHARE = 0.15;
export const MIN_EXPECTED = 10;

const cache = new Map();
function readCached(p) {
  if (!cache.has(p)) {
    try {
      cache.set(p, readFileSync(join(WORKSPACE, p), "utf8"));
    } catch {
      cache.set(p, null);
    }
  }
  return cache.get(p);
}

/**
 * Is this file's prose flat: an accented language, and almost nothing of it?
 *
 * Two questions, in order. No mark at all is the original one and still
 * decides on its own. Otherwise the marks are weighed against what this
 * language's own files carry over prose this long, and the file is flat only
 * when it holds at most SHARE of that. No word is ever looked at.
 *
 * `accented` is the Map from accentUsing. A bare Set is accepted and means
 * "accented, density unknown", which degrades to the zero-mark question alone -
 * safe, because it can only report less, never more.
 */
export function flat(text, accented) {
  const lang = declaredLanguage(text);
  if (!lang || !accented.has(lang)) return null;
  const prose = body(text);
  const words = wordCount(prose);
  if (words < FLOOR) return null;
  const n = markCount(prose);
  const density = typeof accented.get === "function" ? accented.get(lang) : undefined;
  // A bare Set carries no density, so it can only ask the old question.
  if (density === undefined) return n === 0 ? lang : null;
  if (!density) return null;
  const expected = density * words;
  // MIN_EXPECTED GUARDS THE ZERO-MARK CASE TOO, AND IT USED TO NOT.
  //
  // `if (n === 0) return lang` sat above this line and returned before the guard
  // could speak, so the density argument was applied to the thin case and not to
  // the empty one - and the header above claimed both. It read "a language that
  // would owe four cannot be said to be missing them", which was false whenever
  // the count was zero.
  //
  // It was invisible for as long as the wall could only read Latin script, because
  // a Spanish or French file of sixty words essentially always carries an accent,
  // so zero marks really was a finding. Widening the word counter brought in
  // Macedonian, where the only letters that decompose to a mark are ѓ, ќ, ѐ and ѝ -
  // all rare - and `place_ohrid.md` was accused of being unspelled for containing
  // none of them in a hundred and nine words of sound Macedonian, where its own
  // language owes about two. Five files, all Macedonian, all correct.
  //
  // Silence proves nothing about a language that had little to say.
  if (expected < MIN_EXPECTED) return null;
  return n <= SHARE * expected ? lang : null;
}

/** Every flat file in the house, as [path, language]. */
export function findings(files = sources(), read = readCached) {
  const accented = accentUsing(files, read);
  const out = [];
  for (const p of files) {
    const text = read(p);
    if (text === null) continue;
    const lang = flat(text, accented);
    if (lang) out.push([p, lang]);
  }
  return out;
}

/**
 * The content of a path AT a commit, or null.
 *
 * Read from the commit and not from the working tree. The gates invoke these
 * walls with `--head $(git rev-parse HEAD)` on a checked-out head, so disk and
 * head agree in ordinary use and reading disk looked fine - until the first
 * replay of an older range, where every path resolved to a file that does not
 * exist on the branch in hand and the scope came back empty. A gate that goes
 * quiet when it cannot find a file is a gate that passes for the wrong reason.
 */
function atCommit(commit, path) {
  try {
    return execFileSync("git", ["show", `${commit}:${path}`], {
      cwd: WORKSPACE,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    });
  } catch {
    return null;
  }
}

/**
 * What a change wrote, ignoring a move that carried the bytes unaltered.
 *
 * Rename detection is not a nicety here. Every culture that leaves the umbrella
 * moves its tongue file to a new home byte for byte, and a diff read by name
 * alone sees that as a brand new file and charges the mover for prose they never
 * touched. The house's own limit on when a tongue may be edited (#608) exists
 * precisely so those moves stay clean; a wall that punished them would push the
 * work back into exactly the mixed change that limit forbids. So the old path is
 * followed and the bytes are compared.
 */
export function written(base, head) {
  const rows = execFileSync("git", ["diff", "--name-status", "-M", base, head], {
    cwd: WORKSPACE,
    encoding: "utf8",
  })
    .split("\n")
    .map((l) => l.split("\t"))
    .filter(([status, a]) => status && a);
  const out = [];
  for (const [status, a, b] of rows) {
    const path = status.startsWith("R") ? b : a;
    const was = status.startsWith("R") ? a : a;
    if (!path || !path.endsWith(".md") || !path.startsWith("packages/")) continue;
    if (status.startsWith("D")) continue;
    if (status === "R100") continue; // the bytes did not move, only the file did
    // Read from the commit, not the working tree: the same defect found in
    // plot_sequence.mjs, where replaying an older range resolved every path
    // against the branch in hand and quietly found nothing.
    const now = atCommit(head, path);
    if (now === null) continue;
    const before = status.startsWith("A") ? null : atCommit(base, was);
    if (before !== now) out.push(path);
  }
  return out;
}

const CURE =
  "\n  Either the prose is missing the diacritics its language requires, or the file's\n" +
  "  `language:` names a language it is not written in. The wall cannot tell those\n" +
  "  apart and does not try: unaccented Portuguese and accurate Kabuverdianu look the\n" +
  "  same to a counter. Read the file and pick the true one.\n" +
  "  See management/orders/order_the_written_accent.md and order_voice_from_inside.md.";

/**
 * What was actually found, in the file's own numbers.
 *
 * The wall exists because a file claimed something untrue about itself, so its
 * findings say what they measured. "not one mark in it" was accurate while zero
 * was the only question and is a falsehood about a file holding one.
 */
export function describe(path, lang, accented) {
  const prose = body(readCached(path) ?? "");
  const n = markCount(prose);
  if (n === 0) return `declares "${lang}", not one mark in it`;
  const expected = (accented.get?.(lang) ?? 0) * wordCount(prose);
  return (
    `declares "${lang}", ${n} mark(s) in ${wordCount(prose)} words ` +
    `where this language carries about ${Math.round(expected)}`
  );
}

function report() {
  const rows = findings();
  const byLang = new Map();
  for (const [p, l] of rows) byLang.set(l, [...(byLang.get(l) ?? []), p]);
  console.log(`flat files: ${rows.length} in ${byLang.size} language(s)`);
  for (const [l, ps] of [...byLang].sort((a, b) => b[1].length - a[1].length)) {
    console.log(`  ${l}: ${ps.length}`);
    for (const p of ps) {
      const n = markCount(body(readCached(p) ?? ""));
      console.log(`    ${p}${n ? `  (${n} mark(s), near-zero)` : ""}`);
    }
  }
  console.log(CURE);
}

function gate(base, head) {
  const paths = written(base, head);
  if (!paths.length) {
    console.log("Diacritics: no prose written.");
    return 0;
  }
  const accented = accentUsing();
  const offenders = paths.map((p) => [p, flat(readCached(p) ?? "", accented)]).filter(([, l]) => l);
  if (!offenders.length) {
    console.log(`Diacritics OK: ${paths.length} file(s) written, each spelled in its language.`);
    return 0;
  }
  console.error(
    "::error::Diacritics: prose you write in an accented language must carry its accents.",
  );
  for (const [p, l] of offenders) console.error(`  ${p}: ${describe(p, l, accented)}`);
  console.error(CURE);
  return 1;
}

const isMain = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
const argv = isMain ? process.argv.slice(2) : [];
if (isMain && argv.includes("--gate")) {
  const base = argv[argv.indexOf("--base") + 1];
  const head = argv[argv.indexOf("--head") + 1];
  if (!base || !head) {
    console.error("usage: diacritic_conformance.mjs --gate --base <sha> --head <sha>");
    process.exit(2);
  }
  process.exit(gate(base, head));
} else if (isMain) report();
