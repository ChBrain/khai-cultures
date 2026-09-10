// A plot line is a sequence, or it is not a plot line.
//
// `order_plot_zero.md` gave the origin its own number and held the present at 99
// so that the numbers between them would be a chronology: prepend an origin,
// append before the present, and nothing renumbers. All of that assumes the
// middle is in order. Nothing checked.
//
// Measured across the house: twenty-three units number their dated plots out of
// order. Nine are already shipped as production packages, two of them are groups,
// and one is es_canary_islands, where plot_01 is dated 1496 and plot_02 is dated
// 1492 - Columbus's provisioning stop numbered after the conquest it preceded.
// That one shipped at #670 with a plot_00 and a plot_99 written around it, by the
// same hand that is writing this wall and did not look at the middle. Northern
// Ireland runs 1609, 1921, 1912, 1998, 1795, 1884, 1985. Virginia puts the
// Constitution before Yorktown.
//
// WHY THIS IS THE CHEAP WALL AND NOT A JUDGEMENT. Whether a plot is the right
// plot, whether its Cue is a true origin, whether the line covers what matters -
// none of that is decidable and `order_the_defining_question.md` protects it from
// counters. But whether 1492 comes after 1496 is arithmetic. This wall holds only
// the arithmetic, and it holds it on the two things the house already writes down:
// the number in the filename and the year in the prose.
//
// WHAT IS EXCLUDED, AND WHY. `plot_00` and `plot_99` never take part. They are
// the origin and the present, deliberately outside the chronology they bracket -
// an origin is not the earliest event in a sequence, it is the answer to a
// different question. And an undated plot is skipped rather than failed: a plot
// that names no year makes no claim about when, which is legitimate, and several
// plots in this house are written that way on purpose.
//
// WHY NON-DECREASING AND NOT INCREASING. Two plots can share a year. A play that
// stages two things from 1936 is not disordered, and a wall that called it
// disordered would be answered by moving a date.
//
// WHAT IT CANNOT DECIDE. Given 01:1955 and 03:1880, it cannot tell whether the
// numbering is wrong or the dates are. It reports the pair and says so. The
// remedy is usually a renumber, which is a rename and a relink and authors
// nothing - the same probe result the id rename rests on - but it is a reading
// and not a counter's call.
//
// HELD AS A RATCHET, ON PLOTS A CHANGE WRITES. Renames are followed by content,
// so a culture migrating out of the umbrella carries no debt for prose it moved
// unaltered. Writing a plot_00 into a line whose middle is out of order does
// carry it: that is the case this wall exists for, and it would have refused
// #670.

import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, dirname } from "node:path";
import { execFileSync } from "node:child_process";
import { pathToFileURL } from "node:url";
import { WORKSPACE, PACKAGES } from "./culture_sources.mjs";

const NUMBERED = /^plot_(\d{2})_.*\.md$/;
const YEAR = /\b(1[0-9]{3}|20[0-2][0-9])\b/;

/** The origin and the present sit outside the chronology they bracket. */
export const BRACKETS = new Set([0, 99]);

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

/** The number in a plot filename, or null. */
export function plotNumber(path) {
  const m = NUMBERED.exec((path ?? "").split("/").pop() ?? "");
  return m ? Number(m[1]) : null;
}

/**
 * The year a plot claims, or null.
 *
 * The declared name is asked first because that is where these plots put it -
 * "The Grand Ole Opry Founding 1925" - and the Cue is the fallback, because some
 * carry the date only in the prose. The FIRST year wins in both: these are
 * written as "The X of 1925" and "In November 1925, ...", so the first year is
 * the subject and any later one is context.
 */
export function plotYear(text) {
  const declared = /^declared:\s*"(.*)"\s*$/m.exec(text);
  const fromDeclared = declared && YEAR.exec(declared[1]);
  if (fromDeclared) return Number(fromDeclared[1]);
  const cue = /^## Cue\s*\n+([\s\S]*?)(?:\n\n|$)/m.exec(text);
  const fromCue = cue && YEAR.exec(cue[1]);
  return fromCue ? Number(fromCue[1]) : null;
}

/**
 * Every directory in the house that holds numbered plots, with those plots.
 *
 * Read from the working tree, so the gate is defined for a checked-out head -
 * which is how khai-guard invokes it, with `--head $(git rev-parse HEAD)`. The
 * SCOPE is read from the commits; the ORDER is read from the tree.
 *
 * Directories and not ids, deliberately. Cultures carry plots, groups carry
 * plots, and a migrated package carries plots; walking the tree reads all three
 * the same way and reads the same before and after a migration, so this cannot
 * pass by finding nothing - the failure `tongues_standalone.mjs` names about
 * listing one directory instead of walking.
 */
export function units(root = PACKAGES, read = readFileSync) {
  const out = new Map();
  const walk = (dir) => {
    let rows = null;
    for (const name of readdirSync(dir)) {
      if (name === "node_modules" || name === ".git") continue;
      const p = join(dir, name);
      if (statSync(p).isDirectory()) {
        walk(p);
        continue;
      }
      const m = NUMBERED.exec(name);
      if (!m) continue;
      const n = Number(m[1]);
      if (BRACKETS.has(n)) continue;
      const year = plotYear(read(p, "utf8"));
      if (year === null) continue;
      (rows ??= []).push({ n, year, file: relative(WORKSPACE, p) });
    }
    if (rows)
      out.set(
        relative(WORKSPACE, dir),
        rows.sort((a, b) => a.n - b.n),
      );
  };
  walk(root);
  return out;
}

/** The adjacent pairs where the year goes backwards as the number goes forwards. */
export function backwards(rows) {
  const out = [];
  for (let i = 1; i < rows.length; i += 1)
    if (rows[i].year < rows[i - 1].year) out.push([rows[i - 1], rows[i]]);
  return out;
}

/** Every unit whose dated plots are not in order, as [unit, pairs, rows]. */
export function findings(all = units()) {
  const out = [];
  for (const [unit, rows] of all) {
    const pairs = backwards(rows);
    if (pairs.length) out.push([unit, pairs, rows]);
  }
  return out.sort((a, b) => a[0].localeCompare(b[0]));
}

/** The units whose plot prose this change wrote, ignoring an unaltered move. */
export function written(base, head) {
  const rows = execFileSync("git", ["diff", "--name-status", "-M", base, head], {
    cwd: WORKSPACE,
    encoding: "utf8",
  })
    .split("\n")
    .map((l) => l.split("\t"))
    .filter(([s, a]) => s && a);
  const out = new Set();
  for (const [status, a, b] of rows) {
    const path = status.startsWith("R") ? b : a;
    if (!path || !NUMBERED.exec(path.split("/").pop() ?? "")) continue;
    if (status.startsWith("D")) continue;
    // Charged for either of two things, and the second is easy to miss.
    //
    // A RENUMBER moves a plot's number and carries its bytes unaltered, so a
    // content comparison alone reports nothing changed - which is how the first
    // fix this wall demanded slipped past it unexamined. A renumber is precisely
    // the remedy the wall asks for, so it is precisely what has to be re-read.
    //
    // A MIGRATION also renames every plot byte-identically, but it keeps the
    // numbers and only changes the home, so it stays spared.
    const renumbered = status.startsWith("R") && plotNumber(a) !== plotNumber(path);
    if (!renumbered) {
      const now = atCommit(head, path);
      if (now === null) continue;
      const before = status.startsWith("A") ? null : atCommit(base, a);
      if (before === now) continue;
    }
    out.add(dirname(path));
  }
  return out;
}

const CURE =
  "\n  A plot line's numbers are its chronology: plot_00 is the origin and plot_99 the\n" +
  "  present, and everything between them has to run forwards, or prepending an\n" +
  "  origin and appending before the present stop meaning anything.\n" +
  "  This wall cannot tell you which end is wrong. Either the numbering is out of\n" +
  "  order, and a renumber is a rename and a relink that authors nothing; or a date\n" +
  "  in the prose is wrong, and that is a reading. Look before you renumber.\n" +
  "  See management/orders/order_a_plot_line_runs_forwards.md and order_plot_zero.md.";

function report() {
  const rows = findings();
  const all = units();
  console.log(`plot lines out of order: ${rows.length} of ${all.size} with dated plots`);
  for (const [unit, pairs, all_] of rows) {
    const line = all_.map((r) => `${String(r.n).padStart(2, "0")}:${r.year}`).join("  ");
    console.log(`  ${unit}`);
    console.log(`    ${line}`);
    for (const [a, b] of pairs)
      console.log(
        `    plot_${String(b.n).padStart(2, "0")} (${b.year}) comes after plot_${String(a.n).padStart(2, "0")} (${a.year})`,
      );
  }
  console.log(CURE);
}

function gate(base, head) {
  const scope = written(base, head);
  if (!scope.size) {
    console.log("Plot order: no plot prose written.");
    return 0;
  }
  const all = units();
  const offenders = findings(new Map([...all].filter(([u]) => scope.has(u))));
  if (!offenders.length) {
    console.log(`Plot order OK: ${scope.size} unit(s) written, each line running forwards.`);
    return 0;
  }
  console.error("::error::Plot order: a plot line you write in must run forwards.");
  for (const [unit, pairs] of offenders)
    for (const [a, b] of pairs)
      console.error(
        `  ${unit}: plot_${String(b.n).padStart(2, "0")} is dated ${b.year}, after plot_${String(a.n).padStart(2, "0")} dated ${a.year}`,
      );
  console.error(CURE);
  return 1;
}

const isMain = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
const argv = isMain ? process.argv.slice(2) : [];
if (isMain && argv.includes("--gate")) {
  const base = argv[argv.indexOf("--base") + 1];
  const head = argv[argv.indexOf("--head") + 1];
  if (!base || !head) {
    console.error("usage: plot_sequence.mjs --gate --base <sha> --head <sha>");
    process.exit(2);
  }
  process.exit(gate(base, head));
} else if (isMain) report();
