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
import { join, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { execFileSync } from "node:child_process";
import { cultureIds, touchedCultures } from "./company_coverage.mjs";

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

/**
 * Clauses of a Projection, with link targets masked first. A bare split on the
 * full stop would cut every link in half at its own `.md`, and the rule this
 * feeds is about what stands together in one statement. The semicolon counts as
 * a boundary because it joins independent clauses: a persona whose mother tongue
 * is named before one and whose office language is named after it has said two
 * things, not one, and reading them as one accused Liechtenstein's Katharina of
 * a fault her sentence does not contain.
 */
const clauses = (text) =>
  text
    .replace(/\.md\)/g, "_md_)")
    .split(/[.;]/)
    .map((s) => s.replace(/_md_\)/g, ".md)"));

const projection = (text) => text.split("## Projection")[1]?.split("\n## ")[0] ?? "";

/** What one culture's personas still owe. Every finding blocks. */
export function wiring(id, { root = ROOT } = {}) {
  const dir = join(root, "cultures", id);
  if (!existsSync(dir)) return [];
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

    for (const s of clauses(proj)) {
      if (!/_mother_tongue\.md/.test(s)) continue;
      for (const t of new Set(s.match(TONGUE) ?? []))
        if (unacquired.has(t))
          findings.push(`${file}: holds ${t} as a mother tongue, which nobody acquires first`);
    }
  }
  return findings.sort();
}

function report(root = ROOT) {
  const rows = cultureIds(root)
    .map((id) => [id, wiring(id, { root })])
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
  const offenders = touched.map((id) => [id, wiring(id)]).filter(([, f]) => f.length);
  if (!offenders.length) {
    console.log(`Persona wiring OK: ${touched.length} touched culture(s).`);
    return 0;
  }
  console.error("::error::Persona wiring: a touched culture must come out wired.");
  for (const [id, f] of offenders) for (const line of f) console.error(`  ${id}/${line}`);
  return 1;
}

const isMain = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
const argv = isMain ? process.argv.slice(2) : [];
if (argv.includes("--report")) report();
else if (argv.includes("--gate")) {
  const base = argv[argv.indexOf("--base") + 1];
  const head = argv[argv.indexOf("--head") + 1];
  if (!base || !head) {
    console.error("usage: persona_wiring.mjs --gate --base <sha> --head <sha>");
    process.exit(2);
  }
  process.exit(gate(base, head));
}
