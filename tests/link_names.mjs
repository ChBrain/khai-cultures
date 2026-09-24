// A link's name is not its target's filename.
//
// `order_an_address_resolves.md` asks whether the thing on the other end of a
// link exists. It never asks what the link is CALLED, and the two are different
// questions: `[pitch_corsica.md](pitch_corsica.md)` resolves perfectly and still
// stops the sentence dead.
//
// WHAT THE HOUSE READS LIKE TODAY. Measured over 41,944 markdown links: the
// culture prose - every play, plot, persona, place, piece, position and process
// in the house - carries ZERO links whose name repeats the file. The voice was
// already right. 635 sit in `README.md` and `REFERENCES.md`, and they are two
// sentences repeated across the packages:
//
//   The pitch [pitch_corsica.md](pitch_corsica.md) is written from France's profile
//   ...sources are documented in [REFERENCES.md](REFERENCES.md).
//
// The first one hands you the repair: the natural name is already sitting in the
// sentence, one word to the left. `[The pitch](pitch_corsica.md) is written from
// France's profile`.
//
// A REGISTER IS NOT PROSE. A row in the REFERENCES table, a `- **Anchor:**` line
// in a README, a bare `[play_bern](play_bern.md)` on a line of its own - in all
// three the filename IS the information being given, and renaming it would
// destroy the thing the reader came for. 5,494 of the house's 6,129 repeats
// are these.
// Counting them would be building a counter, which
// `management/orders/order_the_passport.md` tells this house not to do. So the
// question is asked of sentences only: a line is prose when, with its links
// taken out, three words of it are still standing.
//
// WHY IT IS A RATCHET. The prose that matters started clean, which argues for
// absolute. The 635 argue against: they live in two files per package across
// ~600 packages, and a wall that turns red on ~600 packages the day it lands is
// a wall that gets bypassed. So it reports the whole house and blocks on the
// units a change actually wrote - touch a README, clean its names. The only
// units it can charge are ones the author had open anyway.
//
// IT DOES NOT CHARGE THE UNDERMINED. `link_resolution` charges a unit when
// somebody else's move breaks ground it links onto, because a path can go dead
// without its author touching it. A NAME cannot: it changes only when the
// sentence holding it is rewritten. So `charged()` is read for `written` alone.

import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

import { charged, mds, units } from "./link_resolution.mjs";

const LINK = /\[([^\]\n]+)\]\(([^)\s]+?\.md)(?:#[^)\s]*)?\)/g;

/**
 * Whether a link's name says nothing the address does not already say.
 *
 * Three spellings of the same failure: the filename, the filename without its
 * extension, and the stem with its underscores opened out - `[play bern]` is
 * the same non-answer as `[play_bern.md]`, typed more politely.
 */
export function repeats(label, target) {
  const base = target.split("/").pop();
  const stem = base.replace(/\.md$/, "");
  const name = label.trim();
  return (
    name === base || name === stem || name.toLowerCase() === stem.replace(/_/g, " ").toLowerCase()
  );
}

/**
 * Whether a line is a register rather than a sentence.
 *
 * Tables, list entries, headings and quoted lines are all places where a
 * filename is the content. So is a line that is nothing but a link: the
 * back-reference footers every unit carries. What is left is prose, and prose
 * is held to reading naturally.
 */
export function register(line) {
  const s = line.trim();
  if (!s || s.startsWith("|") || s.startsWith("#") || s.startsWith(">")) return true;
  if (/^(?:[-*+]|\d+\.)\s/.test(s)) return true;
  const words = s.replace(LINK, " ").match(/[A-Za-zÀ-ɏ]{2,}/g) || [];
  return words.length < 3;
}

/** Every prose link in a file whose name repeats its target, with line numbers. */
export function proseRepeats(text) {
  const out = [];
  let fenced = false;
  const lines = text.split("\n");
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (/^\s*(```|~~~)/.test(line)) {
      fenced = !fenced;
      continue;
    }
    if (fenced || register(line)) continue;
    for (const [, label, target] of line.matchAll(LINK))
      if (repeats(label, target)) out.push({ line: i + 1, label: label.trim(), target });
  }
  return out;
}

export function findings(unit) {
  const out = [];
  for (const file of mds(unit.dir)) {
    const path = join(unit.dir, file);
    if (!existsSync(path)) continue;
    for (const hit of proseRepeats(readFileSync(path, "utf8")))
      out.push(`${file}:${hit.line}: [${hit.label}](${hit.target}) names the file, not the thing`);
  }
  return out;
}

export function report(list = units()) {
  return list
    .map((u) => [u.id, findings(u)])
    .filter(([, f]) => f.length)
    .sort((a, b) => a[0].localeCompare(b[0]));
}

function gate(base, head) {
  const list = units();
  // `charged` returns written as a SORTED ARRAY, not a Set. Asking it for `.size`
  // reads undefined, which is falsy, which silently turns this wall off - it was
  // written that way first and reported "no unit written" over a README it had
  // just been handed.
  const { written } = charged(base, head, list);
  if (!written.length) {
    console.log("Link names: no unit written.");
    return 0;
  }
  const scope = new Set(written);
  const offenders = list
    .filter((u) => scope.has(u.id))
    .map((u) => [u.id, findings(u)])
    .filter(([, f]) => f.length);
  if (!offenders.length) {
    console.log(`Link names OK: ${scope.size} unit(s) answerable, every name reads as prose.`);
    return 0;
  }
  console.error("::error::Link names: a link's name must not repeat the file it points at.");
  for (const [id, f] of offenders) {
    console.error(`  ${id}: ${f.length} finding(s)`);
    for (const line of f) console.error(`    ${line}`);
  }
  console.error(
    "\n  Name the link with the words the sentence would use anyway:\n" +
      "  [The pitch](pitch_corsica.md), not [pitch_corsica.md](pitch_corsica.md).\n" +
      "  Tables, list entries and bare back-references are registers and are not asked.\n" +
      "  See management/orders/order_a_name_reads_as_prose.md.",
  );
  return 1;
}

const isMain = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
const argv = isMain ? process.argv.slice(2) : [];
if (isMain && argv.includes("--gate")) {
  const base = argv[argv.indexOf("--base") + 1];
  const head = argv[argv.indexOf("--head") + 1];
  if (!base || !head) {
    console.error("usage: link_names.mjs --gate --base <sha> --head <sha>");
    process.exit(2);
  }
  process.exit(gate(base, head));
} else if (isMain) {
  const rows = report();
  const n = rows.reduce((a, [, f]) => a + f.length, 0);
  console.log(`link names: ${rows.length} unit(s) owing, ${n} finding(s)`);
  for (const [id, f] of rows) {
    console.log(`  ${id}: ${f.length} finding(s)`);
    for (const line of f) console.log(`    ${line}`);
  }
  process.exit(0);
}
