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
import { execFileSync } from "node:child_process";
import { cultureIds, touchedCultures } from "./company_coverage.mjs";

export const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

function iso(id, root = ROOT) {
  const p = join(root, "cultures", id, "geo.json");
  if (!existsSync(p)) return "";
  try {
    return String(JSON.parse(readFileSync(p, "utf8")).iso ?? "");
  } catch {
    return "";
  }
}

/** The culture that owns a country code, e.g. "DE" -> "germany". */
export function parentOf(code, root = ROOT) {
  for (const id of cultureIds(root)) if (iso(id, root) === code) return id;
  return null;
}

/**
 * What a sub-national culture still owes. National cultures owe nothing here.
 * Returns a list of finding strings; empty means conforming.
 */
export function conformance(id, { root = ROOT } = {}) {
  const code = iso(id, root).split("-")[0];
  if (!code || !iso(id, root).includes("-")) return [];
  const findings = [];
  const prefix = `${code.toLowerCase()}_`;

  if (!id.startsWith(prefix))
    findings.push(
      `id "${id}" must carry its parent's code: rename it "${prefix}<name>" ` +
        `(the package name follows the id, and an npm name is permanent)`,
    );

  const parent = parentOf(code, root);
  if (parent) {
    const dir = join(root, "cultures", id);
    const own = readdirSync(dir).filter((f) => f.startsWith("position_culture_"));
    const linked = own.some((f) =>
      new RegExp(`\\]\\(\\.\\./${parent}/position_culture_[a-z0-9_]+\\.md\\)`).test(
        readFileSync(join(dir, f), "utf8"),
      ),
    );
    if (!linked)
      findings.push(
        `nests in "${parent}" and does not say so: its culture-position must link ` +
          `../${parent}/position_culture_*.md, because a sub-national culture is a way ` +
          `of being the culture above it`,
      );
  }
  return findings;
}

function report() {
  let n = 0;
  const rows = [];
  for (const id of cultureIds()) {
    const f = conformance(id);
    if (f.length) {
      n++;
      rows.push([id, f.length]);
    }
  }
  console.log(`sub-national cultures not yet conforming: ${n}`);
  for (const [id, count] of rows) console.log(`  ${id}: ${count} finding(s)`);
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
    console.log("Sub-national conformance: no culture touched.");
    return 0;
  }
  const offenders = touched.map((id) => [id, conformance(id)]).filter(([, f]) => f.length);
  if (!offenders.length) {
    console.log(`Sub-national conformance OK: ${touched.length} touched culture(s).`);
    return 0;
  }
  console.error("::error::Sub-national conformance: a touched culture must come out conforming.");
  for (const [id, f] of offenders) for (const line of f) console.error(`  ${id}: ${line}`);
  return 1;
}

// Only when run as a command. Without this the CLI fires on import, so one
// module importing the other would run its report as a side effect.
const isMain = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
const argv = isMain ? process.argv.slice(2) : [];
if (argv.includes("--report")) report();
else if (argv.includes("--gate")) {
  const base = argv[argv.indexOf("--base") + 1];
  const head = argv[argv.indexOf("--head") + 1];
  if (!base || !head) {
    console.error("usage: culture_conformance.mjs --gate --base <sha> --head <sha>");
    process.exit(2);
  }
  process.exit(gate(base, head));
}
