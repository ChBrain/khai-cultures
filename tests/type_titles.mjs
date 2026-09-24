// A node's title is not its type said twice.
//
// Every node in this house declares `khai:` in its front matter and a `title:`
// beside it. The type is already there, machine-readable, one line up. A title
// that opens by restating it - `title: "Place: Corti"` on a file whose front
// matter already says `khai: place` - spends the reader's first three words on
// something they were just told.
//
// WHY THIS IS NOT A MATTER OF TASTE. The house has already decided, in the only
// way that counts: 340 plays, 126 instructions and 19 orders carry the prefix
// ZERO times. Not one. Against that, 342 nodes across nine other types carry it.
// The convention is settled and these are drift, not a second style.
//
// WHERE IT CAME FROM. 28 units hold all 342, and 291 units hold none. The top
// five are Corsica, Alsace, Brittany, Glarus and Aargau - French regions and
// Swiss cantons, authored in one stretch by someone with the habit. It is an era,
// not a disagreement, which is why touching a unit and cleaning it works: the
// units that have it have a lot of it, 14 to 27 each, and the fix is mechanical.
//
// WHAT COUNTS AS RESTATING IT. The type, then a separator. `Place: Corti` and
// `Plot - U Riacquistu` are faults. `Place de la Concorde` is not, and neither is
// `Plan B: the fallback`: both begin with the type's word and neither puts a
// separator straight after it, which is the difference between a name that starts
// with a word and a label bolted onto one. A title is read in the language it was
// written in, so only the English type name is asked for - the front matter key
// is English, and that is what is being echoed.
//
// TWO PIECES, BECAUSE THEY HAVE DIFFERENT BARS. `play`, `order` and `instructions`
// are at zero across 485 nodes, so house.test.mjs holds those three outright and
// they can never drift. The other nine are a ratchet over written units, because
// 342 findings in 28 packages cannot land in one lane and a wall that turns them
// all red is a wall that gets bypassed.

import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

import { charged, isMarkdown, mds, units } from "./link_resolution.mjs";

const FM = /^---\n([\s\S]*?)\n---/;

/** The `khai:` type and `title:` of a node, or null when it declares no type. */
export function declared(text) {
  const m = FM.exec(text);
  if (!m) return null;
  const kind = /^khai:\s*([a-z_]+)\s*$/m.exec(m[1]);
  if (!kind) return null;
  const title = /^title:\s*"?(.*?)"?\s*$/m.exec(m[1]);
  return { kind: kind[1], title: title ? title[1].trim() : null };
}

/**
 * Whether a title opens by restating the type it sits beside.
 *
 * The separator is what makes it a label rather than a name: `Place: Corti`
 * restates, `Place de la Concorde` is simply called that.
 */
export function restatesType(kind, title) {
  if (!title) return false;
  return new RegExp(`^${kind}\\s*[:\\-–—]\\s*`, "i").test(title);
}

export function findings(unit) {
  const out = [];
  for (const file of mds(unit.dir)) {
    const path = join(unit.dir, file);
    if (!existsSync(path)) continue;
    const d = declared(readFileSync(path, "utf8"));
    if (d && restatesType(d.kind, d.title))
      out.push(`${file}: title "${d.title}" opens by restating khai: ${d.kind}`);
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
  // `charged` returns written as a sorted ARRAY. Asking it for `.size` reads
  // undefined and silently turns the wall off; link_names.mjs was written that
  // way first and reported "no unit written" over a file it had just been handed.
  // Only markdown charges this wall. A tongues release rewrites the dependency
  // range in 120 manifests, which would otherwise make every unit in the house
  // answerable for prose nobody opened.
  const { written } = charged(base, head, list, isMarkdown);
  if (!written.length) {
    console.log("Type titles: no unit written.");
    return 0;
  }
  const scope = new Set(written);
  const offenders = list
    .filter((u) => scope.has(u.id))
    .map((u) => [u.id, findings(u)])
    .filter(([, f]) => f.length);
  if (!offenders.length) {
    console.log(`Type titles OK: ${scope.size} unit(s) answerable, no title restates its type.`);
    return 0;
  }
  console.error("::error::Type titles: a title must not open by restating the node's khai type.");
  for (const [id, f] of offenders) {
    console.error(`  ${id}: ${f.length} finding(s)`);
    for (const line of f) console.error(`    ${line}`);
  }
  console.error(
    '\n  The type is already in the front matter. Name the thing: "Corti", not\n' +
      '  "Place: Corti". A title that merely begins with the word is fine - "Place de\n' +
      '  la Concorde" is a name, "Place: Corti" is a label.\n' +
      "  See management/orders/order_a_title_names_the_thing.md.",
  );
  return 1;
}

const isMain = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
const argv = isMain ? process.argv.slice(2) : [];
if (isMain && argv.includes("--gate")) {
  const base = argv[argv.indexOf("--base") + 1];
  const head = argv[argv.indexOf("--head") + 1];
  if (!base || !head) {
    console.error("usage: type_titles.mjs --gate --base <sha> --head <sha>");
    process.exit(2);
  }
  process.exit(gate(base, head));
} else if (isMain) {
  const rows = report();
  const n = rows.reduce((a, [, f]) => a + f.length, 0);
  console.log(`type titles: ${rows.length} unit(s) owing, ${n} finding(s)`);
  for (const [id, f] of rows) {
    console.log(`  ${id}: ${f.length} finding(s)`);
    for (const line of f) console.log(`    ${line}`);
  }
  process.exit(0);
}
