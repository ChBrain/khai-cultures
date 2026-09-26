// What to do next, decided by the house and not by whoever is reading it.
//
// Every wall in this repository answers one question about one change. None of
// them answers the question that actually costs time: of three hundred and
// nineteen cultures, which one is next? That was decided by whoever opened the
// editor, and it showed - the umbrella emptied in the order cultures came to
// mind, and the ones nobody thought of stayed as they were.
//
// WHY A LADDER AND NOT A SCORE. A score is the obvious shape and the wrong one.
// Weighting "out of order" against "no plot_00" against "still in the umbrella"
// means inventing numbers, and every argument about priority then becomes an
// argument about a number nobody can defend. This orders LEXICOGRAPHICALLY: each
// rung is a yes-or-no fact, the first rung a culture answers to is its rung, and
// the only policy in the file is the ORDER of the rungs. That order is argued
// once, in order_what_to_do_next.md, and is data here rather than control flow.
//
// WHY IT NAMES A CULTURE AND NOT A TASK. Because the house does not let you do
// one fault at a time. Touching any content in a culture authors it, and
// authoring wakes company-coverage, plot-zero, subnational-conformance and links
// together. So for a given culture, WRITING AND REPAIRING ARE THE SAME PULL
// REQUEST - you cannot write its plot_00 without also clearing the company its
// play declares and never casts. There is no choice to make between building and
// fixing. There is a culture to choose, and its ledger is the change's scope.
//
// WHY THE RUNGS ARE IN THIS ORDER, WHICH IS THE ONLY OPINION HERE. Two reasons,
// in this order:
//
// A culture that says something untrue outranks everything, because the house's
// whole claim is that what it writes down is so. A plot line running backwards,
// a file declaring a language it is not written in, a structurally invalid
// nesting - those are not incompleteness, they are the house being wrong in
// public.
//
// After that, SUBSUMPTION and not severity. A culture with no plot_00 ranks
// above one that merely declares a company it never casts, because writing the
// origin authors the culture and drags company-coverage to zero with it, while
// casting a persona forces no brackets. Ordering by which repair contains which
// is what keeps a culture from needing three pull requests where one would do,
// and it is an argument about cost rather than about what matters more.
//
// WHY IT IS NOT A GATE, AND MUST NOT BECOME ONE. A wall refuses a change. This
// ranks work, and a ranking is a reading. Gated, it would refuse a pull request
// for not working the head of the queue, which takes the choice away from the
// person whose choice it is. It reports, it is read, and it is ignored freely.
//
// WHERE THE NUMBERS COME FROM. The house's own walls, never re-implemented here.
// The first draft of the thinness signal hand-rolled a directory scan for board
// members no plot links, which is company_coverage.mjs written worse: that wall
// reads the play's declared Company chapter and honours waivers and one-way
// links, and the hand-rolled version honoured neither. The lesson is in the
// imports - this file computes two things (a span and a hole) and asks for
// everything else.
//
// THE THRESHOLDS ARE THE HOUSE'S OWN MEDIANS, measured at run time and never
// typed. "A long span with a large hole" means at or above the median span and
// the median hole of the cultures that have one, so the line moves with the
// corpus instead of being tuned by hand. That is the same argument
// diacritic_conformance.mjs makes for taking each language's own median rather
// than a global rate.
//
// WHAT RUNG 5 DOES NOT MEAN. Settled means no wall objects. It does not mean the
// culture is good. us_virginia passed all fifteen walls while being wrong about
// its own authorship, and its repair made it LESS machine-readable, not more.
// This file finds where the walls are blind, never where the reading is wrong,
// and the questions it prints for the head of the queue are there to send a
// person outside the repository - they are not the check, they are the
// assignment.
//
// GROUPS ARE OUT OF SCOPE. They carry plots and would rank, but they have their
// own ratchet and their own walk. See order_the_group_ratchet.md.

import { readdirSync, readFileSync, existsSync } from "node:fs";
import { join, relative } from "node:path";
import { pathToFileURL } from "node:url";
import { WORKSPACE, cultureIds, cultureDir, isMigrated, sunken } from "./culture_sources.mjs";
import { plotYear, BRACKETS, findings as orderFindings } from "./plot_sequence.mjs";
import { findings as flatFindings } from "./diacritic_conformance.mjs";
import { hasOrigin, hasPresent } from "./plot_zero.mjs";
import { conformance } from "./culture_conformance.mjs";
import { coverage } from "./company_coverage.mjs";
import { coverage as groupCoverage, findings as groupFindings, groups } from "./group_coverage.mjs";

const NUMBERED = /^plot_(\d{2})_.*\.md$/;

/**
 * What each fault is worth, as data and never as control flow, for the same
 * reason the rungs are data: a number that cannot be read without reading code
 * cannot be argued with.
 *
 * `order_what_to_do_next.md` rejected a score once, and the objection was good:
 * invented numbers drift toward whatever the last person wanted to work on. Two
 * things answer it here. The weights are printed with every row, as the
 * arithmetic that produced the rank, so a number is always argued against a
 * culture and never in the abstract. And `house.test.mjs` pins the head and the
 * shape of the top of the queue, so moving a weight to move a favourite to the
 * front fails a test and shows up in a diff.
 *
 * What the ladder could not say is why this order was built: a level-2 culture
 * outranked a level-1 for two working days, and German states were authored
 * while a country waited, because "country before state" is not a yes-or-no
 * fault and a ladder can only hold yes-or-no facts.
 */
export const WEIGHTS = {
  disordered: 40,
  blocking: 25,
  flat: 15,
  origin: 30,
  present: 30,
  hollow: 20,
  uncast: 6,
  // A group's Triggers chapter is its chain: an entry linking no plot is a summary
  // standing where a chain belongs, and a plot no entry links is a scene the play
  // does not know it has - group_coverage.mjs's own words.
  //
  // Rated at `uncast`, and deliberately not higher. The two are nearly the same
  // fault said twice: a declared thing with no staging behind it. Counting them
  // per ITEM rather than per category is what carries the magnitude - eight
  // orphaned plots is not the same problem as one - and picking a new, larger
  // number here would have put every group above every culture on a weight
  // nobody had argued for.
  chain: 6,
  unmigrated: 10,
  level: 12,
  holeYears: 20,
  spanYears: 50,
};

/** The depth of a culture in the tree, from its own `geo.json`. */
export function levelOf(dir) {
  if (!dir) return 1;
  const geo = join(WORKSPACE, dir, "geo.json");
  if (!existsSync(geo)) return 1;
  try {
    const iso = String(JSON.parse(readFileSync(geo, "utf8")).iso ?? "");
    return iso ? iso.split("-").length : 1;
  } catch {
    return 1;
  }
}

/**
 * What a culture owes, in points, with the arithmetic that produced it.
 *
 * Severity adds, which is the whole difference from the ladder: one blocking
 * finding and a line that is backwards with three placeholder chapters and nine
 * findings were the same rung, separated only by how wide the hole was.
 */
export function scoreOf(l, medianSpan = 0, medianHole = 0) {
  const terms = [];
  const add = (points, says) => {
    if (points > 0) terms.push([Math.round(points), says]);
  };
  add(l.disordered ? WEIGHTS.disordered : 0, "backwards");
  add(l.blocking * WEIGHTS.blocking, `${l.blocking} blocking`);
  add(l.flat.length * WEIGHTS.flat, `${l.flat.length} flat`);
  add(l.origin ? 0 : WEIGHTS.origin, "no origin");
  add(l.present ? 0 : WEIGHTS.present, "no present");
  add(l.hollow ? WEIGHTS.hollow : 0, "hollow");
  add(l.uncast.length * WEIGHTS.uncast, `${l.uncast.length} uncast`);
  add(l.chain.length * WEIGHTS.chain, `${l.chain.length} chain`);
  add(l.migrated ? 0 : WEIGHTS.unmigrated, "unmigrated");
  add(Math.max(0, 3 - l.level) * WEIGHTS.level, `level ${l.level}`);
  add(Math.max(0, l.hole - medianHole) / WEIGHTS.holeYears, `hole ${l.hole}y`);
  add(Math.max(0, l.span - medianSpan) / WEIGHTS.spanYears, `span ${l.span}y`);
  return { total: terms.reduce((n, [p]) => n + p, 0), terms };
}

/**
 * The rungs, in the order that is the whole policy of this file.
 *
 * Data and not branches, so a test can assert the order and the order can be
 * read without reading code. Each `holds` takes a ledger and answers yes or no;
 * nothing weighs anything against anything.
 */
export const RUNGS = [
  {
    name: "wrong",
    says: "says something that is not so",
    holds: (l) => l.disordered || l.flat.length > 0 || l.blocking > 0 || l.chain.length > 0,
  },
  {
    name: "unbracketed",
    says: "has no origin, or no present",
    holds: (l) => !l.origin || !l.present,
  },
  {
    name: "thin",
    says: "declares a company it never casts, or spans a hole",
    holds: (l) => l.uncast.length > 0 || l.hollow,
  },
  {
    name: "unmigrated",
    says: "clean, and still in the umbrella",
    holds: (l) => !l.migrated,
  },
];

/** The rung a settled culture is on: past the last one. */
export const SETTLED = RUNGS.length;

/** The rung a ledger answers to: the first that holds, or SETTLED. */
export function rungOf(ledger) {
  const i = RUNGS.findIndex((r) => r.holds(ledger));
  return i === -1 ? SETTLED : i;
}

/** The name of a rung index, SETTLED included. */
export const rungName = (i) => RUNGS[i]?.name ?? "settled";

/**
 * The middle of a list of positive numbers, or 0.
 *
 * Zeros are dropped before the median is taken. A culture with fewer than two
 * dated plots has no span at all, and counting those as span zero would drag the
 * line down until half the house cleared it.
 */
export function median(xs) {
  const s = xs.filter((x) => x > 0).sort((a, b) => a - b);
  return s.length ? s[Math.floor(s.length / 2)] : 0;
}

/**
 * A culture's dated chronology: how far it reaches and its largest hole.
 *
 * The hole is measured between ADJACENTLY NUMBERED dated plots only. A distance
 * between plot_02 and plot_05 is not a hole if plot_03 and plot_04 are sitting
 * in it undated - it is three plots, two of which name no year. (Measured: no
 * unit in the house is in that position today, so the distinction costs nothing
 * and stops the number meaning something else the day one is.)
 */
export function chronology(dir) {
  const plots = readdirSync(dir).filter((n) => NUMBERED.test(n));
  const dated = plots
    .filter((n) => !BRACKETS.has(Number(NUMBERED.exec(n)[1])))
    .map((n) => ({
      n: Number(NUMBERED.exec(n)[1]),
      year: plotYear(readFileSync(join(dir, n), "utf8")),
    }))
    .filter((r) => r.year !== null)
    .sort((a, b) => a.n - b.n);
  const years = dated.map((r) => r.year);
  let hole = 0;
  let pair = null;
  for (let i = 1; i < dated.length; i += 1) {
    if (dated[i].n !== dated[i - 1].n + 1) continue;
    const d = dated[i].year - dated[i - 1].year;
    if (d > hole) {
      hole = d;
      pair = [dated[i - 1], dated[i]];
    }
  }
  return {
    plots: plots.length,
    dated: dated.length,
    span: years.length >= 2 ? Math.max(...years) - Math.min(...years) : 0,
    hole,
    pair,
  };
}

let surveyed = null;

/**
 * Every culture's ledger, with the house's medians and each one's rung.
 *
 * One pass to read the facts, then the medians, then the rung - because "a long
 * span with a large hole" is a statement about this corpus and cannot be decided
 * for one culture before the rest have been read.
 *
 * READ ONCE PER PROCESS, which is not an optimisation so much as the difference
 * between a usable file and an unusable one. A survey asks `company_coverage`
 * and `culture_conformance` about all three hundred and nineteen cultures and
 * asks `diacritic_conformance` for the whole accent corpus, and both the
 * reporter and its tests ask for a survey several times over. Uncached, four
 * tests that each wanted one cost 21s, 54s, 54s and 18s, all of it spent
 * recomputing an answer that had not changed. A survey is a read of one commit's
 * tree, so within one process it cannot change - the same argument
 * `diacritic_conformance.mjs` makes for `readCached`. A caller that edits files
 * and wants a second opinion needs a second process.
 */
/** Whether a directory ships a plot with this prefix. */
const hasPlot = (dir, prefix) =>
  existsSync(dir) && readdirSync(dir).some((f) => f.startsWith(prefix));

/**
 * The sunken units: `{ id, dir }` for each one, in either home.
 *
 * This walked `packages/*` for a manifest declaring `khai.sunken` and nothing
 * else, which was right for the only shape a sunken unit could have when it was
 * written and wrong the moment one was authored. Every culture and every group
 * in this house is authored INSIDE the umbrella and migrated out later, and the
 * sunken is no different: `cimbri` went into `sunken/cimbri/`, carries no
 * manifest of its own, and this reported zero while the header said so out loud.
 *
 * It reads `sunken()` now, which composes both homes exactly as `groups()` does
 * - which is how the group half of this survey was already right. A survey that
 * cannot see a unit does not rank it low; it does not rank it at all.
 */
export function sunkenUnits(workspace = WORKSPACE) {
  return sunken(workspace).map((s) => ({ id: s.id, dir: s.dir, migrated: s.migrated }));
}

export function survey() {
  if (surveyed) return surveyed;
  const disordered = new Set(orderFindings().map(([unit]) => unit));
  const flatBy = new Map();
  for (const [path] of flatFindings()) {
    const dir = path.split("/").slice(0, -1).join("/");
    if (!flatBy.has(dir)) flatBy.set(dir, []);
    flatBy.get(dir).push(path.split("/").pop());
  }

  const rows = [];
  for (const id of cultureIds()) {
    const dir = cultureDir(id);
    if (!dir || !existsSync(dir)) continue;
    const unit = relative(WORKSPACE, dir);
    const cover = coverage(id);
    const conf = conformance(id);
    rows.push({
      kind: "culture",
      id,
      unit,
      migrated: isMigrated(id),
      ...chronology(dir),
      disordered: disordered.has(unit),
      flat: flatBy.get(unit) ?? [],
      blocking: Array.isArray(conf?.blocking) ? conf.blocking.length : (conf?.blocking ?? 0),
      uncast: cover?.dead ?? [],
      superseded: cover?.superseded ?? [],
      chain: [],
      origin: hasOrigin(id),
      present: hasPresent(id),
      level: levelOf(relative(WORKSPACE, dir)),
    });
  }

  // Groups, on the same ledger and out of their own wall.
  //
  // `company_coverage` and `culture_conformance` are not asked here: they refuse
  // a group outright, which is the whole point of that refusal. `group_coverage`
  // answers instead, and its fields line up - `dead` IS uncast, both being a
  // Company element no plot fields, and noOrigin/noPresent are the same two
  // questions the plot line asks anywhere. What has no culture equivalent is the
  // Triggers chain, so it is carried as its own term rather than bent into one.
  //
  // LEVEL 1, deliberately and not by levelOf's fallback. A group ships no
  // geo.json because it is not in the ISO tree at all: it collects cultures
  // rather than nesting under one, so it stands where a country stands. The tree
  // term is about depth, and a group has none to be measured.
  for (const g of groups()) {
    const unit = relative(WORKSPACE, g.dir);
    const c = groupCoverage(g.id);
    const chain = [
      ...c.unlinked.map((e) => `Trigger entry "${e}" links no plot`),
      ...c.orphans.map((f) => `${f} is a plot no Trigger entry chains`),
      ...c.broken.map((f) => `a Trigger entry links ${f}, which is not here`),
    ];
    rows.push({
      kind: "group",
      id: g.id,
      unit,
      migrated: g.migrated,
      ...chronology(g.dir),
      disordered: disordered.has(unit),
      flat: flatBy.get(unit) ?? [],
      blocking: 0,
      uncast: c.dead ?? [],
      superseded: [],
      chain,
      origin: !c.noOrigin,
      present: !c.noPresent,
      level: 1,
    });
  }

  // The sunken. `order_the_sunken.md` defines the third collection, and this read
  // zero for as long as the only shape it looked for was a package - which is
  // every day between the survey learning the word and the first play being
  // authored in the umbrella, where every unit in this house starts.
  for (const s of sunkenUnits()) {
    const unit = relative(WORKSPACE, s.dir);
    rows.push({
      kind: "sunken",
      id: s.id,
      unit,
      // Read, not assumed. Hardcoding `true` was harmless while the only shape
      // was a package and wrong the moment one was authored in the umbrella: it
      // would drop the `unmigrated` weight and the line that says so. The group
      // rows above have always carried `g.migrated` for the same reason.
      migrated: s.migrated,
      ...chronology(s.dir),
      disordered: disordered.has(unit),
      flat: flatBy.get(unit) ?? [],
      blocking: 0,
      uncast: [],
      superseded: [],
      chain: [],
      origin: hasPlot(s.dir, "plot_00"),
      present: hasPlot(s.dir, "plot_99"),
      level: 1,
    });
  }

  // MEDIANS PER KIND, because hollow is a comparison against what is normal and
  // the kinds are not normal in the same way. Most groups have no dated plots at
  // all, so folding twenty-one of them into one house median drags the span down
  // and quietly re-wrings cultures that had not changed - the widening would have
  // re-ranked the whole queue as a side effect of looking at something else.
  const spanBy = new Map();
  const holeBy = new Map();
  for (const kind of new Set(rows.map((r) => r.kind))) {
    const of = rows.filter((r) => r.kind === kind);
    spanBy.set(kind, median(of.map((r) => r.span)));
    holeBy.set(kind, median(of.map((r) => r.hole)));
  }
  for (const r of rows) {
    const spans = spanBy.get(r.kind) ?? 0;
    const holes = holeBy.get(r.kind) ?? 0;
    r.hollow = r.span >= spans && r.hole >= holes && spans > 0;
    r.rung = rungOf(r);
    const { total, terms } = scoreOf(r, spans, holes);
    r.own = total;
    r.terms = terms;
  }
  inherit(rows);
  surveyed = {
    rows,
    medianSpan: spanBy.get("culture") ?? 0,
    medianHole: holeBy.get("culture") ?? 0,
    medianSpanBy: spanBy,
    medianHoleBy: holeBy,
  };
  return surveyed;
}

/**
 * What each unit BLOCKS on: `id -> Set(id)`, and empty today.
 *
 * An edge belongs here only when the dependent cannot proceed until the
 * dependency is done. That is a narrower thing than "refers to", and the
 * difference is the whole correctness of the score.
 *
 * **A group casting a member is not one.** This function derived exactly that
 * edge on the day it was written, from `castIds`, because the cast was there to
 * be read and the arithmetic came out satisfying: `bolivia` sat in five groups
 * and went from seventieth in the queue to first. Then the five groups were
 * asked what they owe, and all of it was their own - `no origin`, `no present`,
 * a Triggers chapter that summarises where it should chain, `unmigrated`,
 * `level`. Writing bolivia's origin gives `latin_america` no origin. Seven
 * hundred and thirty-seven points were attributed to a culture that could not
 * discharge a single one of them, which is the fault this whole mechanism was
 * built to remove, arriving by the other door.
 *
 * `broken` was the last candidate and is not one either: it reads
 * `!files.includes(f)`, a plot file missing from the group's own directory, not
 * a member that is not there.
 *
 * So a group composes and does not block, and nothing else in the house records
 * a blocking edge at all. A culture waiting on a unit that does not exist -
 * `us_south_carolina` on the Gullah Geechee - is the real case and cannot be
 * read off any file: it is the open Target in `order_what_to_do_next.md`. This
 * returns empty until a unit can say what it waits on, and returning empty is
 * the honest answer rather than the absence of one.
 */
export function dependencies(rows) {
  return new Map(rows.map((r) => [r.id, new Set()]));
}

/**
 * Add each unit's own score, WHOLE, to everything it depends on.
 *
 * Whole and not divided: each dependency is a thing that, once done, moves the
 * dependent, and a half share would say it half-moves it. Five groups waiting on
 * `bolivia` are five debts hanging on one culture, not five fifths of one.
 *
 * Transitive, because a dependency of a dependency is still something the work
 * waits on. The visited set is per SOURCE, so a cast that comes back on itself
 * costs one skipped edge rather than a hang - groups cannot cycle today, casting
 * only cultures, and the guard is for the declared edges the order still owes.
 *
 * Sets `own`, `inherited`, `score` and `blocks` on every row. `score` is what the
 * queue orders by; `own` is the ledger the terms add up to and is what the rung
 * was read from, because a unit's condition is its own and is not inherited.
 *
 * `deps` is injectable so a caller can propagate over a graph the filesystem does
 * not hold - a cycle, a chain three deep - and still be running THIS function.
 * A test that reimplemented the walk to reach those cases would be asserting
 * against its own copy, and would keep passing after this one broke.
 *
 * @param {object[]} rows
 * @param {Map<string, Set<string>>} [deps] `id -> what it depends on`
 */
export function inherit(rows, deps = dependencies(rows)) {
  const by = new Map(rows.map((r) => [r.id, r]));
  for (const r of rows) {
    r.inherited = 0;
    r.blocks = [];
  }
  for (const r of rows) {
    if (!r.own) continue;
    const seen = new Set([r.id]);
    const stack = [...(deps.get(r.id) ?? [])];
    while (stack.length) {
      const id = stack.pop();
      if (seen.has(id)) continue;
      seen.add(id);
      const d = by.get(id);
      if (!d) continue;
      d.inherited += r.own;
      d.blocks.push(r.id);
      for (const next of deps.get(id) ?? []) stack.push(next);
    }
  }
  for (const r of rows) {
    r.blocks.sort((a, b) => a.localeCompare(b));
    r.score = r.own + r.inherited;
  }
  return rows;
}

/**
 * The order two cultures stand in: points first, then id.
 *
 * TOTAL, and that is the whole claim to determinism. The id can never tie, so
 * this never returns 0 for two distinct cultures, so the sort cannot depend on
 * the order the rows were read in. Exported because that property is what a test
 * has to hold: feed the same rows in any permutation and the answer is the same
 * answer. A comparator that ties somewhere would pass a re-run - the rows arrive
 * in the same order twice - and fail a reader who added a culture above it.
 */
export const order = (a, b) => b.score - a.score || a.id.localeCompare(b.id);

/**
 * The queue: every culture with something owed, worst first.
 *
 * The head stays the head until it is cleared, which is the point: the queue
 * advances because working it removes its head, not because it shuffles.
 */
export function queue(s = survey()) {
  return s.rows.filter((r) => r.rung < SETTLED).sort(order);
}

/** The culture to work next, or null if the house is settled. */
export function next(s = survey()) {
  return queue(s)[0] ?? null;
}

/** Everything the walls have against one culture, as lines. */
export function owed(r) {
  const out = [];
  if (r.disordered) out.push("its plot line runs backwards somewhere");
  for (const f of r.flat) out.push(`${f} declares a language it is not written in`);
  if (r.blocking) out.push(`${r.blocking} blocking conformance finding(s)`);
  if (!r.origin) out.push("no plot_00: the line has no origin");
  if (!r.present) out.push("no plot_99: the line has no present");
  for (const c of r.uncast) out.push(`its play declares ${c} and no plot casts it`);
  for (const c of r.superseded) out.push(`${c} is cast and still carries a waiver`);
  for (const c of r.chain) out.push(c);
  if (r.hollow && r.pair)
    out.push(
      `${r.span}y of line with a ${r.hole}y hole in it, ` +
        `between plot_${String(r.pair[0].n).padStart(2, "0")} (${r.pair[0].year}) and ` +
        `plot_${String(r.pair[1].n).padStart(2, "0")} (${r.pair[1].year})`,
    );
  if (!r.migrated) out.push("still in the umbrella");
  return out;
}

/**
 * The questions a culture's own files raise, for whoever takes it on.
 *
 * Generated from facts and phrased as questions, because that is the honest form:
 * every one of them is answered outside this repository, and the answer may well
 * be "read it, nothing wrong". A counter can see that a hole is there. Only a
 * person can say whether the hole is the record or the writing.
 */
export function asks(r) {
  const out = [];
  if (r.hollow && r.pair)
    out.push(
      `Is the ${r.hole}y hole between ${r.pair[0].year} and ${r.pair[1].year} the record ` +
        `being silent, or nobody having written it? What does this culture's own ` +
        `tradition put in there, and does any plot stage it?`,
    );
  for (const c of r.uncast)
    out.push(`${c} is declared and never staged. Which plot is it in, and if none, why keep it?`);
  if (!r.origin)
    out.push(
      "What did this culture coalesce out of - a people, a tongue that separated, a " +
        "mineral, a pass, a faith taken or refused? Not a founding.",
    );
  if (!r.present) out.push("What is the present here, as a record rather than a forecast?");
  for (const f of r.flat)
    out.push(`${f}: is the prose in the wrong language, or is the spelling stripped?`);
  if (r.disordered)
    out.push("Is the numbering wrong, or is a date in the prose wrong? Look before renumbering.");
  if (r.chain.length)
    out.push(
      "Does the Triggers chapter chain the plots that are here, or summarise them? " +
        "A grouping that cannot chain its own scenes may be a list rather than a play.",
    );
  return out;
}

function report(limit = 12) {
  const s = survey();
  const q = queue(s);
  const by = (k) => s.rows.filter((r) => r.kind === k).length;
  console.log(
    `units: ${s.rows.length} (${by("culture")} culture, ${by("group")} group, ${by("sunken")} sunken)` +
      `   culture median span ${s.medianSpan}y   median hole ${s.medianHole}y`,
  );
  const tally = new Map();
  for (const r of s.rows) tally.set(r.rung, (tally.get(r.rung) ?? 0) + 1);
  for (let i = 0; i <= SETTLED; i += 1)
    console.log(
      `  ${i + 1}. ${rungName(i).padEnd(12)} ${String(tally.get(i) ?? 0).padStart(4)}` +
        (RUNGS[i] ? `   ${RUNGS[i].says}` : "   no wall objects, which is not the same as good"),
    );

  const head = q[0];
  if (!head) {
    console.log("\nNothing owed. Read order_what_to_do_next.md before believing that.");
    return;
  }
  console.log(`\nNext: ${head.id}  ${head.kind}  ${head.score} points  (${rungName(head.rung)})`);
  console.log(`  ${head.unit}`);
  console.log(`  ${head.terms.map(([n, says]) => `${n} ${says}`).join("  +  ")}`);
  // The inherited half is printed apart from the ledger and never folded into
  // it: the terms are what THIS unit owes, and a reader who saw 737 inside them
  // would go looking for a fault here that belongs to five other units.
  if (head.inherited)
    console.log(
      `  ${head.own} its own  +  ${head.inherited} owed by ${head.blocks.length} unit(s) waiting on it: ${head.blocks.join(", ")}`,
    );
  console.log("  What it owes:");
  for (const line of owed(head)) console.log(`    - ${line}`);
  console.log("  What has to be answered outside this repository:");
  for (const line of asks(head)) console.log(`    ? ${line}`);

  console.log(`\nBehind it:`);
  for (const r of q.slice(1, limit + 1))
    console.log(
      `  ${String(r.score).padStart(4)}  ${r.kind === "culture" ? `L${r.level}` : r.kind.slice(0, 2).toUpperCase()}  ${r.id.padEnd(24)} ` +
        (r.inherited ? `+${r.inherited} blocking ${r.blocks.length}  ` : "") +
        r.terms.map(([n, says]) => `${n} ${says}`).join("  "),
    );
  console.log(
    `\n  ${q.length} unit(s) owe something. This ranks work; it refuses nothing.\n` +
      "  A score is this unit's own plus, whole, the score of everything waiting on it,\n" +
      "  so totals are larger than one unit can owe and only the ORDER is comparable.\n" +
      "  See management/orders/order_what_to_do_next.md.",
  );
}

const isMain = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
if (isMain) report();
