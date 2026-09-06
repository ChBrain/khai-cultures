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
// wants a waiver with a reason, not a fake scene. A waiver lives WITH its
// culture, in cultures/<id>/coverage-waivers.json, for two reasons: it is read
// and reviewed in the same diff as the casting it excuses, and it is inside
// cultures/**, so the culture PR that needs it can write it without crossing
// the source/test separation gate (a waiver file under tests/ could only be
// edited from a governance branch, which is the one branch that never touches
// a culture).

import { readFileSync, readdirSync, existsSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

import {
  cultureDir,
  cultureIds as sourceCultureIds,
  touchedCultures as sourceTouchedCultures,
  authoredCultures,
  relinkNote,
} from "./culture_sources.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
// The house package. The repository root above it is the workspace container,
// which holds the tooling and publishes nothing.
//
// A culture is no longer always under it: a touched culture migrates into its
// own production package beside the umbrella, so where a culture SITS is asked
// of `culture_sources.mjs` and never computed here. ROOT stays exported because
// callers pass it, and it still names the umbrella; it simply no longer implies
// that every culture is inside it.
export const ROOT = join(HERE, "..", "packages", "khai-cultures");
export const WAIVERS_FILE = "coverage-waivers.json";

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

/** Every `## Section` of a markdown document, as { name: body }. */
function sections(text) {
  const out = {};
  for (const part of text.split(/^## /m).slice(1)) {
    const nl = part.indexOf("\n");
    out[part.slice(0, nl).trim()] = part.slice(nl);
  }
  return out;
}

/** One culture's waivers: { "<file>.md": "<written reason>" }. */
export function readWaivers(id) {
  const dir = cultureDir(id);
  if (!dir) return {};
  const path = join(dir, WAIVERS_FILE);
  if (!existsSync(path)) return {};
  return JSON.parse(readFileSync(path, "utf8"));
}

/** Every culture that carries a waiver file, as { id: { file: reason } }. */
export function allWaivers() {
  const out = {};
  for (const id of cultureIds()) {
    const w = readWaivers(id);
    if (Object.keys(w).length) out[id] = w;
  }
  return out;
}

/**
 * Every culture id in the house, migrated or not.
 *
 * The emptiness refusal that used to live here moved to the resolver with the
 * question it answers: one list, one guard, and a `root` argument would now be a
 * lie, because half the answer is outside any one package.
 */
export function cultureIds() {
  return sourceCultureIds();
}

/**
 * Company entries of one culture that no plot fields, minus the one-way kinds
 * and minus anything waived. Returns { dead, waived, company } basenames.
 */
export function coverage(id) {
  // Every return here carries all four keys. The gate destructures `superseded`
  // and reads its length, so an early return that omits it does not report a
  // clean culture, it throws - and a wall that throws is a wall that says
  // nothing while looking like it failed on the content.
  const empty = { dead: [], waived: [], superseded: [], company: [] };
  const dir = cultureDir(id);
  if (!dir || !existsSync(dir) || !statSync(dir).isDirectory()) return empty;
  const files = readdirSync(dir).filter((f) => f.endsWith(".md"));
  const playFile = files.find((f) => f.startsWith("play_"));
  if (!playFile) return empty;

  const companyBody = section(readFileSync(join(dir, playFile), "utf8"), "Company");
  const company = new Set(companyBody ? linkBasenames(companyBody) : []);
  if (company.size === 0) return empty;

  const cast = new Set();
  for (const plot of files.filter((f) => f.startsWith("plot_")))
    for (const b of linkBasenames(readFileSync(join(dir, plot), "utf8")))
      if (company.has(b)) cast.add(b);

  const waivedHere = readWaivers(id);
  const uncast = [...company].filter((b) => !cast.has(b) && !isOneWay(b));
  return {
    dead: uncast.filter((b) => !waivedHere[b]).sort(),
    waived: uncast.filter((b) => waivedHere[b]).sort(),
    // A waiver excuses something no plot fields. Once a plot fields it, the
    // waiver is a second and contradictory statement about the same entry, and
    // casting by consequence produces exactly that drift: the plot gains the
    // persona, the waiver that stood in for it stays behind. Both DACH branches
    // had to remove theirs by hand. See management/orders/order_casting_by_
    // consequence.md - this is the one part of that order a script can decide.
    superseded: Object.keys(waivedHere)
      .filter((b) => cast.has(b))
      .sort(),
    company: [...company].sort(),
  };
}

/**
 * Personas a plot casts only in its Tension: the queue of consequence-castings.
 *
 * Reported, never gated. A script can see that a persona is cast as what an
 * event left rather than as someone present at it; it cannot tell whether the
 * thread back to the event is real. That is the Virginia test - "invention
 * rather than consequence" - and it belongs to a person.
 */
export function consequences() {
  const out = [];
  for (const id of cultureIds()) {
    const dir = cultureDir(id);
    const files = readdirSync(dir).filter((f) => f.endsWith(".md"));
    const personas = new Set(files.filter((f) => f.startsWith("persona_")));
    const where = new Map();
    for (const plot of files.filter((f) => f.startsWith("plot_")))
      for (const [name, body] of Object.entries(sections(readFileSync(join(dir, plot), "utf8"))))
        for (const b of linkBasenames(body))
          if (personas.has(b)) (where.get(b) ?? where.set(b, new Set()).get(b)).add(name);
    for (const [b, secs] of where)
      if (secs.size === 1 && secs.has("Tension")) out.push(`${id}/${b}`);
  }
  return out.sort();
}

/** The cultures a list of changed repository paths touches. */
// Derived, never typed. The workspace move renamed `cultures/<id>/` to
// `packages/khai-cultures/cultures/<id>/`, and the literal prefix that used to be
// written here stopped matching anything: every ratchet in this repository runs
// through `touchedCultures`, so all three reported "no culture touched" on pull
// requests that added plots and personas, and passed. The migration moves the
// path again, one culture at a time, so the shapes now live in
// `culture_sources.mjs` and this is the thin forward that keeps every caller.
export function touchedCultures(paths) {
  return sourceTouchedCultures(paths);
}

const TOP = 20;

// The house-wide picture. It shows the worst cultures, not all of them, because
// nineteen hundred dead entries across two hundred and ninety cultures is not a
// list anyone reads - but it now SAYS so on the line where the list stops.
//
// It did not, and that cost a pull request. Asking `--report | grep egypt` for a
// culture sitting below the cut printed nothing, nothing was read as zero, and
// the culture went into a branch carrying four dead entries that the gate then
// caught. A truncated list and an empty answer are indistinguishable to a grep,
// so a report that hides rows has to name the number it is hiding, and there has
// to be a way to ask about one culture rather than filtering a list that may not
// contain it. That is what `--culture <id>` is for.
export function report({ all = false } = {}) {
  let total = 0;
  const rows = [];
  for (const id of cultureIds()) {
    const { dead, waived } = coverage(id);
    total += dead.length;
    if (dead.length || waived.length) rows.push([id, dead.length, waived.length]);
  }
  rows.sort((a, b) => b[1] - a[1]);
  const shown = all ? rows : rows.slice(0, TOP);
  for (const [id, d, w] of shown) console.log(`  ${id}: ${d} dead, ${w} waived`);
  if (shown.length < rows.length)
    console.log(
      `  ... and ${rows.length - shown.length} more culture(s) NOT SHOWN. ` +
        `This list is the worst ${TOP}; do not read a culture's absence from it as zero. ` +
        `Use --all, or --culture <id> for one.`,
    );
  console.log(
    `cultures carrying dead entries: ${rows.filter((r) => r[1]).length} of ${cultureIds().length}`,
  );
  console.log(`dead Company entries house-wide: ${total}`);
}

/** One culture, answered directly, so nobody has to grep a list that truncates. */
function reportCulture(id) {
  if (!cultureIds().includes(id)) {
    console.error(`no such culture: ${id}`);
    return 2;
  }
  const { dead, waived, company } = coverage(id);
  console.log(`${id}: ${dead.length} dead, ${waived.length} waived, ${company.length} in Company`);
  for (const b of dead) console.log(`  dead   ${b}`);
  for (const b of waived) console.log(`  waived ${b}`);
  return 0;
}

function gate(base, head) {
  // Authored, not merely touched: a culture whose only change is where a link
  // points was not opened by this pull request. See authoredCultures().
  const { authored, spared } = authoredCultures(base, head);
  const touched = [...authored.keys()].sort();
  const note = relinkNote(spared);
  if (!touched.length) {
    console.log("Company coverage: no culture authored, nothing to hold to zero.");
    if (note) console.log(note);
    return 0;
  }
  if (note) console.log(note);
  // `authoredCultures` answers in UNITS, and a migrated group is a unit. The
  // culture list deliberately is not: see the note in culture_sources.mjs, a
  // migrated group is a unit and not a culture, because the minor IS the
  // culture count and a group must not move it. So the two lists disagree by
  // design, and this wall reads cultures. Skip what it does not hold - and say
  // which, because an exemption this wall applies silently is the same fault
  // `relinkNote` exists to prevent.
  const known = new Set(cultureIds());
  const notCultures = touched.filter((id) => !known.has(id));
  const charged = touched.filter((id) => known.has(id));
  if (notCultures.length)
    console.log(
      `  ${notCultures.length} authored unit(s) are not cultures and are not charged ` +
        `by this wall: ${notCultures.join(", ")}`,
    );
  if (!charged.length) {
    console.log("Company coverage: no culture authored, nothing to hold to zero.");
    return 0;
  }
  const offenders = [];
  const stale = [];
  for (const id of charged) {
    const { dead, waived, superseded } = coverage(id);
    if (superseded.length) stale.push([id, superseded]);
    if (dead.length) offenders.push([id, dead]);
    else
      console.log(
        `Company coverage OK: "${id}" is at zero${waived.length ? ` (${waived.length} waived)` : ""}.`,
      );
  }
  if (!offenders.length && !stale.length) {
    console.log(`Company coverage OK: ${charged.length} authored culture(s), all at zero.`);
    return 0;
  }
  if (offenders.length) {
    console.error("::error::Company coverage: a culture you write in must come out at zero.");
    for (const [id, dead] of offenders) {
      console.error(`  ${id}: ${dead.length} Company element(s) no plot fields`);
      for (const b of dead) console.error(`    ${b}`);
    }
    console.error(
      "\n  Fix: cast each one in the plot whose scene needs it, or drop it from the play's Company.\n" +
        "  If casting it would be anachronistic or contrived, waive it with a reason in\n" +
        "  cultures/<id>/coverage-waivers.json. Positions held one way (language, culture),\n" +
        "  plans and pitches are never counted.",
    );
  }
  if (stale.length) {
    console.error("::error::Company coverage: a waiver for something a plot now casts.");
    for (const [id, entries] of stale) {
      console.error(`  ${id}: ${entries.length} waiver(s) the play has outgrown`);
      for (const b of entries) console.error(`    ${b}`);
    }
    console.error(
      "\n  A waiver excuses something no plot fields. Once a plot fields it, the waiver is a\n" +
        "  second and contradictory statement about the same entry - which is the drift casting\n" +
        "  by consequence produces: the plot gains the persona and the waiver stays behind.\n" +
        "  Delete the entry (and the file, if it is the last one).",
    );
  }
  return 1;
}

// Only when run as a command. Without this the CLI fires on import, so one
// module importing the other would run its report as a side effect.
const isMain = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
const argv = isMain ? process.argv.slice(2) : [];
if (argv.includes("--consequences")) {
  const rows = consequences();
  console.log(`cast only by a Tension: ${rows.length}`);
  for (const r of rows) console.log(`  ${r}`);
  console.log(
    "\n  Read each against the Virginia test: does the plot MAKE the world this persona\n" +
      "  lives in, with a named mechanism? If not it is invention, and wants a waiver or a\n" +
      "  plot. See management/orders/order_casting_by_consequence.md.",
  );
} else if (argv.includes("--culture"))
  process.exit(reportCulture(argv[argv.indexOf("--culture") + 1]));
else if (argv.includes("--report")) report({ all: argv.includes("--all") });
else if (argv.includes("--gate")) {
  const base = argv[argv.indexOf("--base") + 1];
  const head = argv[argv.indexOf("--head") + 1];
  if (!base || !head) {
    console.error("usage: company_coverage.mjs --gate --base <sha> --head <sha>");
    process.exit(2);
  }
  process.exit(gate(base, head));
}
