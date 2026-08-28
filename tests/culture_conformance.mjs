// Sub-national conformance: the id and the parent, held as a ratchet.
//
// Two facts about a sub-national culture are computable from its own geo.json,
// and both were wrong across the house when this was written.
//
// THE ID. A culture's directory id is its package name after the split, and an
// npm name is permanent. `georgia_us` exists because Georgia the country and
// Georgia the state collided in a flat namespace, and the suffix is a patch on a
// naming scheme rather than a name. So a sub-national id carries its parent's
// ISO country code as a prefix: `us_georgia`, `de_schleswig_holstein`,
// `es_navarre`. The rest of the name stays the author's; only the prefix is
// checked, because only the prefix is computable.
//
// THE PARENT. 88 of 90 sub-national cultures held no link to their parent at
// all: a Bavarian held `bayerische Kultur` and was, as staged, not German. The
// nesting goes on the position and not on every persona, because Bavarianness is
// a way of being German rather than a second passport, so the culture-position
// links the parent's culture-position and the personas are left alone.
//
// Both are held the way company coverage is held: a ratchet on the cultures a
// pull request touches, never a sweep. Touch a culture, leave it conforming.

import { readFileSync, readdirSync, existsSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { cultureIds } from "./company_coverage.mjs";
import {
  cultureDir,
  isMigrated,
  productionName,
  authoredCultures,
  relinkNote,
} from "./culture_sources.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
export const ROOT = join(HERE, "..", "packages", "khai-cultures");

function iso(id) {
  const dir = cultureDir(id);
  if (!dir) return "";
  const p = join(dir, "geo.json");
  if (!existsSync(p)) return "";
  try {
    return String(JSON.parse(readFileSync(p, "utf8")).iso ?? "");
  } catch {
    return "";
  }
}

/** The culture that owns a country code, e.g. "DE" -> "germany". */
export function parentOf(code) {
  for (const id of cultureIds()) if (iso(id) === code) return id;
  return null;
}

/**
 * What a sub-national culture still owes. Both halves block.
 *
 * The id half was advisory for one day, because khai-guard read a rename's
 * destination as an added path and so demanded a `minor` changeset for a move
 * that changed no count, which would have landed the release back on a version
 * already published. khai-guard 0.2.1 judges the count-driven add rule on the
 * source as well, so a play that moved is no longer a play that arrived, and a
 * rename can travel in the same pull request as the content it belongs to.
 */
export function conformance(id) {
  const code = iso(id).split("-")[0];
  if (!code || !iso(id).includes("-")) return { blocking: [], advisory: [], findings: [] };
  const blocking = [];
  const advisory = [];
  // kept as a pair so the gate keeps one shape; nothing is advisory today.
  const prefix = `${code.toLowerCase()}_`;

  if (!id.startsWith(prefix))
    blocking.push(
      `id "${id}" must carry its parent's code: rename it "${prefix}<name>" ` +
        `(the package name follows the id, and an npm name is permanent)`,
    );

  const parent = parentOf(code);
  if (parent) {
    const dir = cultureDir(id);
    const own = readdirSync(dir).filter((f) => f.startsWith("position_culture_"));
    // The parent's culture-position is reachable two ways, and which one is
    // correct is not the child's choice. While the parent is a directory under
    // the umbrella, a relative link is the only way there. Once the parent is a
    // production package, the relative path no longer exists, and a migrated
    // child may not carry `../` at all - it would escape its own package and
    // fail the publish invariant. So the required form follows the parent's
    // home, and the message names the one that is right today.
    const spec = productionName(parent);
    const migrated = isMigrated(parent);
    const wanted = migrated
      ? `${spec}/position_culture_*.md`
      : `../${parent}/position_culture_*.md`;
    // Matched with a fixed pattern and an equality test rather than a regex
    // built from the parent's name. A name interpolated into a pattern is a
    // regex the caller did not write, and CodeQL is right to call that an
    // injection even when the name is only ever an id: the fix costs nothing
    // and the habit is what matters at 290 packages.
    const links = (text) =>
      [
        ...text.matchAll(
          /\]\((?:(\.\.)\/([a-z0-9_]+)|(@[a-z0-9-]+\/[a-z0-9-]+))\/position_culture_[a-z0-9_]+\.md\)/g,
        ),
      ].map((m) => (m[1] ? { relative: m[2] } : { package: m[3] }));
    const linked = own.some((f) =>
      links(readFileSync(join(dir, f), "utf8")).some((l) =>
        migrated ? l.package === spec : l.relative === parent,
      ),
    );
    if (!linked)
      blocking.push(
        `nests in "${parent}" and does not say so: its culture-position must link ` +
          `${wanted}, because a sub-national culture is a way of being the culture above it`,
      );
  }
  return { blocking, advisory, findings: [...blocking, ...advisory] };
}

function report() {
  let n = 0;
  const rows = [];
  for (const id of cultureIds()) {
    const { blocking, advisory } = conformance(id);
    if (blocking.length || advisory.length) {
      n++;
      rows.push([id, blocking.length, advisory.length]);
    }
  }
  console.log(`sub-national cultures not yet conforming: ${n}`);
  for (const [id, b, a] of rows) console.log(`  ${id}: ${b} blocking, ${a} advisory`);
}

function gate(base, head) {
  // Authored, not merely touched. A tongue move retargets a link in every culture
  // that casts the variety, and none of them asked for a rename.
  const { authored, relinked } = authoredCultures(base, head);
  const touched = [...authored.keys()].sort();
  const note = relinkNote(relinked);
  if (!touched.length) {
    console.log("Sub-national conformance: no culture authored.");
    if (note) console.log(note);
    return 0;
  }
  if (note) console.log(note);
  const seen = touched.map((id) => [id, conformance(id)]);
  for (const [id, { advisory }] of seen)
    for (const line of advisory) console.log(`::notice::${id}: ${line}`);
  const offenders = seen.filter(([, c]) => c.blocking.length);
  if (!offenders.length) {
    console.log(`Sub-national conformance OK: ${touched.length} authored culture(s).`);
    return 0;
  }
  console.error(
    "::error::Sub-national conformance: a culture you write in must come out conforming.",
  );
  for (const [id, { blocking }] of offenders)
    for (const line of blocking) console.error(`  ${id}: ${line}`);
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
  const { blocking, advisory } = conformance(id);
  console.log(`${id}: ${blocking.length} blocking, ${advisory.length} advisory`);
  for (const f of blocking) console.log(`  blocking ${f}`);
  for (const f of advisory) console.log(`  advisory ${f}`);
  return 0;
}

// Only when run as a command. Without this the CLI fires on import, so one
// module importing the other would run its report as a side effect.
const isMain = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
const argv = isMain ? process.argv.slice(2) : [];
if (argv.includes("--culture")) process.exit(reportCulture(argv[argv.indexOf("--culture") + 1]));
else if (argv.includes("--report")) report();
else if (argv.includes("--gate")) {
  const base = argv[argv.indexOf("--base") + 1];
  const head = argv[argv.indexOf("--head") + 1];
  if (!base || !head) {
    console.error("usage: culture_conformance.mjs --gate --base <sha> --head <sha>");
    process.exit(2);
  }
  process.exit(gate(base, head));
}
