// Company coverage: the ratchet.
//
// A play declares a closed cast in its `## Company`; its plots field that cast
// by linking it. An element the Company advertises and no plot ever fields is a
// dead entry: the culture claims a practice, an artifact or a person that never
// appears in anything that happened to it. The kit reports these as warnings,
// which is how the house accumulated ~1,900 of them without noticing.
//
// This module makes them a gate, but only where a PR is already working. Touch a
// culture and that culture must come out at zero; leave it alone and nothing is
// asked of you. The debt can therefore only shrink, and no sweep is needed: the
// work lands wherever someone is already looking.
//
// ONE-WAY KINDS ARE NOT DEAD. The house's own contract (REFERENCES.md) says a
// position is held by a persona and that the link runs one way, a persona links
// its position and never the reverse; a plan issues orders to personas; a pitch
// keys the run and is never fielded in a scene (the kit already exempts it). An
// uncast culture-position, language position or plan is the contract working,
// not failing, so the gate does not count them. What it counts is what a scene
// can actually field: places, pieces, processes, stance positions, personas.
//
// WAIVERS are the pressure valve, so the gate never forces contrived casting.
// A persona born after the last plot cannot be cast without anachronism; that
// wants a waiver with a reason, not a fake scene. See company-coverage-waivers.json.

import { readFileSync, readdirSync, existsSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";

const HERE = dirname(fileURLToPath(import.meta.url));
export const ROOT = join(HERE, "..");
export const WAIVERS_PATH = join(HERE, "company-coverage-waivers.json");

// Held one way (by a persona) or keying the run: never fielded in a scene.
const ONE_WAY = ["pitch_", "position_language_", "position_culture_", "plan_"];
const isOneWay = (base) => ONE_WAY.some((p) => base.startsWith(p));

/** Basenames of every relative markdown link target in a block of text. */
function linkBasenames(text) {
  const out = [];
  const re = /\]\(([^()\s]+)\)/g;
  let m;
  while ((m = re.exec(text))) {
    const target = m[1].split("#")[0];
    if (!target || /^[a-z]+:\/\//i.test(target)) continue;
    out.push(target.split(/[/\\]/).pop());
  }
  return out;
}

/** The body of one `## Section` of a markdown document. */
function section(text, name) {
  const re = new RegExp(`^## ${name}[ \\t]*$`, "m");
  const m = re.exec(text);
  if (!m) return null;
  const rest = text.slice(m.index + m[0].length);
  const next = /^## /m.exec(rest);
  return next ? rest.slice(0, next.index) : rest;
}

export function readWaivers() {
  if (!existsSync(WAIVERS_PATH)) return {};
  return JSON.parse(readFileSync(WAIVERS_PATH, "utf8"));
}

export function cultureIds(root = ROOT) {
  const dir = join(root, "cultures");
  if (!existsSync(dir)) return [];
  return readdirSync(dir, { withFileTypes: true })
    .filter((e) => e.isDirectory() && !e.name.startsWith("."))
    .map((e) => e.name)
    .sort();
}

/**
 * Company entries of one culture that no plot fields, minus the one-way kinds
 * and minus anything waived. Returns { dead, waived, company } basenames.
 */
export function coverage(id, { root = ROOT, waivers = readWaivers() } = {}) {
  const dir = join(root, "cultures", id);
  if (!existsSync(dir) || !statSync(dir).isDirectory())
    return { dead: [], waived: [], company: [] };
  const files = readdirSync(dir).filter((f) => f.endsWith(".md"));
  const playFile = files.find((f) => f.startsWith("play_"));
  if (!playFile) return { dead: [], waived: [], company: [] };

  const companyBody = section(readFileSync(join(dir, playFile), "utf8"), "Company");
  const company = new Set(companyBody ? linkBasenames(companyBody) : []);
  if (company.size === 0) return { dead: [], waived: [], company: [] };

  const cast = new Set();
  for (const plot of files.filter((f) => f.startsWith("plot_")))
    for (const b of linkBasenames(readFileSync(join(dir, plot), "utf8")))
      if (company.has(b)) cast.add(b);

  const waivedHere = waivers[id] ?? {};
  const uncast = [...company].filter((b) => !cast.has(b) && !isOneWay(b));
  return {
    dead: uncast.filter((b) => !waivedHere[b]).sort(),
    waived: uncast.filter((b) => waivedHere[b]).sort(),
    company: [...company].sort(),
  };
}

/** Cultures a set of changed paths touches. */
export function touchedCultures(paths) {
  const ids = new Set();
  for (const p of paths) {
    const m = /^cultures\/([^/]+)\//.exec(p.trim().replace(/\\/g, "/"));
    if (m) ids.add(m[1]);
  }
  return [...ids].sort();
}

function changedPaths(base, head) {
  const out = execFileSync("git", ["diff", "--name-only", `${base}`, `${head}`], {
    encoding: "utf8",
    maxBuffer: 32 * 1024 * 1024,
  });
  return out.split("\n").filter(Boolean);
}

function report() {
  let total = 0;
  const rows = [];
  for (const id of cultureIds()) {
    const { dead, waived } = coverage(id);
    total += dead.length;
    if (dead.length || waived.length) rows.push([id, dead.length, waived.length]);
  }
  rows.sort((a, b) => b[1] - a[1]);
  for (const [id, d, w] of rows.slice(0, 20)) console.log(`  ${id}: ${d} dead, ${w} waived`);
  console.log(
    `cultures carrying dead entries: ${rows.filter((r) => r[1]).length} of ${cultureIds().length}`,
  );
  console.log(`dead Company entries house-wide: ${total}`);
}

function gate(base, head) {
  const touched = touchedCultures(changedPaths(base, head));
  if (!touched.length) {
    console.log("Company coverage: no culture touched, nothing to hold to zero.");
    return 0;
  }
  const offenders = [];
  for (const id of touched) {
    const { dead, waived } = coverage(id);
    if (dead.length) offenders.push([id, dead]);
    else
      console.log(
        `Company coverage OK: "${id}" is at zero${waived.length ? ` (${waived.length} waived)` : ""}.`,
      );
  }
  if (!offenders.length) {
    console.log(`Company coverage OK: ${touched.length} touched culture(s), all at zero.`);
    return 0;
  }
  console.error("::error::Company coverage: a touched culture must come out at zero.");
  for (const [id, dead] of offenders) {
    console.error(`  ${id}: ${dead.length} Company element(s) no plot fields`);
    for (const b of dead) console.error(`    ${b}`);
  }
  console.error(
    "\n  Fix: cast each one in the plot whose scene needs it, or drop it from the play's Company.\n" +
      "  If casting it would be anachronistic or contrived, waive it with a reason in\n" +
      "  tests/company-coverage-waivers.json. Positions held one way (language, culture),\n" +
      "  plans and pitches are never counted.",
  );
  return 1;
}

const argv = process.argv.slice(2);
if (argv.includes("--report")) report();
else if (argv.includes("--gate")) {
  const base = argv[argv.indexOf("--base") + 1];
  const head = argv[argv.indexOf("--head") + 1];
  if (!base || !head) {
    console.error("usage: company_coverage.mjs --gate --base <sha> --head <sha>");
    process.exit(2);
  }
  process.exit(gate(base, head));
}
