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
// WHY ZERO AND NOT "TOO FEW". Spanish cannot be spell-checked by machine here,
// and the corpus proves it: que/qué, como/cómo, solo/sólo, esta/está, paso/pasó,
// mas/más, este/esté are all real pairs of real words with different meanings,
// and all of them occur in this house in both spellings, correctly. A counter
// that added accents by frequency would corrupt the prose it was hired to
// protect. So this wall asks the one question that needs no dictionary and
// admits no false positive: a body of running prose in an accented language,
// with not one diacritic in it, is wrong. That is decidable. Which word is
// missing which accent is a reading, and readings are not a counter's business.
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

const WORDS = /[^\W\d_]{3,}/gu;
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
export function accentUsing(files = sources(), read = readCached) {
  const seen = new Map();
  for (const p of files) {
    const text = read(p);
    if (text === null) continue;
    const lang = declaredLanguage(text);
    if (!lang) continue;
    const prose = body(text);
    if (wordCount(prose) < FLOOR) continue;
    const row = seen.get(lang) ?? { files: 0, marked: 0 };
    row.files += 1;
    if (marked(prose)) row.marked += 1;
    seen.set(lang, row);
  }
  const out = new Set();
  for (const [lang, r] of seen)
    if (r.files >= QUORUM && r.marked / r.files >= MAJORITY) out.add(lang);
  return out;
}

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

/** Is this file's prose flat: an accented language, and not one mark in it? */
export function flat(text, accented) {
  const lang = declaredLanguage(text);
  if (!lang || !accented.has(lang)) return null;
  const prose = body(text);
  if (wordCount(prose) < FLOOR) return null;
  return marked(prose) ? null : lang;
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
    const now = readCached(path);
    if (now === null) continue;
    if (status === "R100") continue; // the bytes did not move, only the file did
    let before = null;
    if (!status.startsWith("A")) {
      try {
        before = execFileSync("git", ["show", `${base}:${was}`], {
          cwd: WORKSPACE,
          encoding: "utf8",
          stdio: ["ignore", "pipe", "ignore"],
        });
      } catch {
        before = null;
      }
    }
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

function report() {
  const rows = findings();
  const byLang = new Map();
  for (const [p, l] of rows) byLang.set(l, [...(byLang.get(l) ?? []), p]);
  console.log(`flat files: ${rows.length} in ${byLang.size} language(s)`);
  for (const [l, ps] of [...byLang].sort((a, b) => b[1].length - a[1].length)) {
    console.log(`  ${l}: ${ps.length}`);
    for (const p of ps) console.log(`    ${p}`);
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
  for (const [p, l] of offenders) console.error(`  ${p}: declares "${l}", not one mark in it`);
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
