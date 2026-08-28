// Plot 0 and Plot 99: every culture says where it comes from and where it now
// stands.
//
// The house was generated from state history, and it shows in the one place
// nobody looks: where each play begins. Measured across all 290 cultures, the
// opening plot's earliest date fell after 1800 in thirty-six of them and after
// 1900 in eight. Berlin opened at the Wall - a city founded around 1237, capital
// of Prussia, capital of Weimar - because 1961 is the first date a state history
// of Berlin finds interesting. Bavaria opened when Napoleon made it a kingdom,
// eleven hundred years after there were Bavarians.
//
// That is not a gap in the middle of a play, which a reader notices. It is the
// play's floor, and a floor is invisible: nothing looks missing below the first
// plot, because there is nothing below the first plot to look at.
//
// So the origin gets its own slot and its own number. `plot_00` is not the first
// event in a sequence; it is the answer to a different question - where does this
// culture come from - and holding it at zero says so, keeps it out of the
// chronology it precedes, and means an origin found later is prepended rather
// than forcing a renumber of every plot and every cross-reference. Four
// restagings in one day each paid that renumbering cost.
//
// WHAT IS DECIDABLE, AND WHAT IS NOT. That a culture has a plot_00 is a fact a
// script can check. Whether its plot_00 is a true origin, or a state date wearing
// the number, is the dialogue that order_the_defining_question.md protects, and no
// counter can stand in for it. This gate holds only the fact.
//
// HELD AS A RATCHET, AND NARROWLY. It fires only when a pull request touches a
// culture's PLOTS. Touch the plot line and you answer for where it starts; fix a
// persona's tongue link or a typo in a REFERENCES file and nothing is asked of
// you. Coverage can be paid in a sentence, and this cannot: an origin is a
// research pass, and a gate that demanded one for a typo would be answered with
// a bad plot_00, which is worse than none.

import { readdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { execFileSync } from "node:child_process";
import { cultureIds } from "./company_coverage.mjs";

export const ROOT = join(
  dirname(fileURLToPath(import.meta.url)),
  "..",
  "packages",
  "khai-cultures",
);

const has = (id, prefix, root) => {
  const dir = join(root, "cultures", id);
  if (!existsSync(dir)) return true;
  return readdirSync(dir).some((f) => f.startsWith(prefix));
};

/** Does this culture answer where it comes from? */
export const hasOrigin = (id, { root = ROOT } = {}) => has(id, "plot_00", root);

/**
 * Does it reach the present?
 *
 * The ceiling is invisible for the same reason the floor is: nothing looks
 * missing above the last plot. Measured across all 290, only nineteen plot lines
 * reach 2010 or later and a hundred and sixty-seven stop before 1990. Wales ends
 * in 1588, at the Welsh Bible, with nothing of the Blue Books, of
 * industrialisation, of Aberfan or of devolution.
 *
 * `plot_99` is a record and not a forecast. It stages what has actually happened
 * in the decade still resolving; where that points belongs in its Tension and in
 * the play's Stakes, which is a question and not a claim. A guess must never sit
 * where records sit.
 */
export const hasPresent = (id, { root = ROOT } = {}) => has(id, "plot_99", root);

/** Cultures missing either marker, by name. */
export function missing(root = ROOT) {
  return cultureIds(root)
    .map((id) => [id, !hasOrigin(id, { root }), !hasPresent(id, { root })])
    .filter(([, o, p]) => o || p);
}

/** The cultures whose PLOTS a change touches. Not the same as touching a culture. */
export function touchedPlots(paths, root = ROOT) {
  const prefix = "packages/khai-cultures/cultures/";
  const ids = new Set();
  for (const p of paths) {
    const s = p.trim().replace(/\\/g, "/");
    if (!s.startsWith(prefix)) continue;
    const [id, file] = s.slice(prefix.length).split("/");
    if (id && file && (file.startsWith("plot_") || file.startsWith("play_"))) ids.add(id);
  }
  return [...ids].sort();
}

function report(root = ROOT) {
  const rows = missing(root);
  const all = cultureIds(root).length;
  console.log(`cultures missing a marker: ${rows.length} of ${all}`);
  for (const [id, noOrigin, noPresent] of rows)
    console.log(
      `  ${id}: ${[noOrigin && "no plot_00", noPresent && "no plot_99"].filter(Boolean).join(", ")}`,
    );
  console.log(
    "\n  plot_00 answers where a culture comes from; plot_99 stages where it now\n" +
      "  stands. Whether either is true, or a state date wearing the number, is not a\n" +
      "  counter's business: see management/orders/order_plot_zero.md.",
  );
}

function gate(base, head) {
  const changed = execFileSync("git", ["diff", "--name-only", base, head], {
    encoding: "utf8",
    maxBuffer: 32 * 1024 * 1024,
  })
    .split("\n")
    .filter(Boolean);
  const touched = touchedPlots(changed);
  if (!touched.length) {
    console.log("Plot 0: no culture's plot line touched.");
    return 0;
  }
  const offenders = touched
    .map((id) => [id, !hasOrigin(id), !hasPresent(id)])
    .filter(([, o, p]) => o || p);
  if (!offenders.length) {
    console.log(
      `Plot 0 OK: ${touched.length} touched plot line(s), each spanning origin to present.`,
    );
    return 0;
  }
  console.error(
    "::error::Plot 0: a culture whose plot line you touch must say where it begins and where it now stands.",
  );
  for (const [id, noOrigin, noPresent] of offenders)
    console.error(
      `  ${id}: ${[noOrigin && "no plot_00", noPresent && "no plot_99"].filter(Boolean).join(", ")}`,
    );
  console.error(
    "\n  plot_00_<name>.md: where this culture comes from. Not the founding of a state:\n" +
      "  a play that opens on a treaty has described a passport.\n" +
      "  plot_99_<name>.md: where it now stands. A record of the decade still resolving,\n" +
      "  never a forecast; where it points belongs in that plot's Tension and in Stakes.\n" +
      "  See management/orders/order_plot_zero.md.",
  );
  return 1;
}

const isMain = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
const argv = isMain ? process.argv.slice(2) : [];
if (argv.includes("--report")) report();
else if (argv.includes("--gate")) {
  const base = argv[argv.indexOf("--base") + 1];
  const head = argv[argv.indexOf("--head") + 1];
  if (!base || !head) {
    console.error("usage: plot_zero.mjs --gate --base <sha> --head <sha>");
    process.exit(2);
  }
  process.exit(gate(base, head));
}
