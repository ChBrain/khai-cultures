import { describe, it, expect } from "vitest";
import { join } from "node:path";
import { readFileSync } from "node:fs";
import {
  coverage,
  cultureIds as coveredCultureIds,
  report as coverageReport,
} from "./company_coverage.mjs";
import { cultureIds as auditCultureIds, dirFor, readCulture } from "./plot_line_audit.mjs";
import { cueDigest, statusOf, readings, repoUrl } from "./plot_line_readings.mjs";
import { declared } from "./type_titles.mjs";
import { cultures, sunken } from "./culture_sources.mjs";
import {
  RUNGS,
  SETTLED,
  rungOf,
  rungName,
  median as rungMedian,
  survey as nextSurvey,
  order as cultureOrder,
  queue as nextQueue,
  WEIGHTS,
  scoreOf,
  levelOf,
  next as nextCulture,
  owed,
  asks,
  sunkenUnits,
  inherit,
  dependencies,
} from "./next.mjs";
import { flat } from "./diacritic_conformance.mjs";
import { groups as allGroups, coverage as groupCoverage } from "./group_coverage.mjs";
import { here, workspaceRoot } from "./house_support.mjs";

// A report that hides rows and does not say so is indistinguishable, to the grep
// someone will inevitably reach for, from a report that found nothing. The
// coverage report shows the worst twenty cultures out of the ~250 carrying debt;
// grepping it for a culture below that cut printed nothing, nothing was read as
// zero, and a culture with four dead Company entries went into a branch as
// "clean". The gate caught it. This pins the line that would have said so.
describe("Cultures house: a truncated report says that it is truncated", () => {
  it("names the number of cultures it is not showing", () => {
    const lines = [];
    const log = console.log;
    console.log = (...a) => lines.push(a.join(" "));
    try {
      coverageReport();
    } finally {
      console.log = log;
    }
    const total = Number(/dead entries: (\d+) of/.exec(lines.join("\n"))?.[1] ?? 0);
    if (total <= 20) return; // nothing hidden, nothing to announce
    expect(
      lines.join("\n"),
      "the coverage report truncates without saying so, so a grep for a hidden culture reads as zero",
    ).toMatch(/NOT SHOWN/);
  });
});

// What to do next. Not a wall: it ranks work, and a ranking is a reading. What
// is held here is its CONTRACT - that the order is lexicographic and not a
// score, that the pick is total and therefore deterministic, that a named
// culture always arrives with its reasons, and that it stays out of the gates.
// The counts it prints are findings and are meant to move, so none is asserted.
// See management/orders/order_what_to_do_next.md.
describe("Cultures house: what to do next", () => {
  it("holds the rung order as data, because the order is the whole policy", () => {
    expect(RUNGS.map((r) => r.name)).toEqual(["wrong", "unbracketed", "thin", "unmigrated"]);
    for (const r of RUNGS) {
      expect(typeof r.says).toBe("string");
      expect(typeof r.holds).toBe("function");
    }
    expect(SETTLED).toBe(RUNGS.length);
    expect(rungName(SETTLED)).toBe("settled");
  });

  // The rung is still the first that holds and never a sum: a culture that is
  // both wrong AND thin is wrung as wrong, and that is what names the fault in
  // the report. The order is a different question, and since the score landed it
  // does add the two - see the scoring tests below. Keeping rungOf arithmetic
  // free is what lets the score explain itself in the rung's words.
  it("answers to the first rung that holds, never to a sum of several", () => {
    const clean = {
      disordered: false,
      flat: [],
      blocking: 0,
      origin: true,
      present: true,
      uncast: [],
      chain: [],
      hollow: false,
      migrated: true,
    };
    expect(rungOf(clean)).toBe(SETTLED);
    expect(rungOf({ ...clean, disordered: true, uncast: ["x.md"], migrated: false })).toBe(0);
    expect(rungOf({ ...clean, uncast: ["x.md"] })).toBe(2);
    expect(rungOf({ ...clean, origin: false, uncast: ["x.md"] })).toBe(1);
    expect(rungOf({ ...clean, migrated: false })).toBe(3);
  });

  it("drops zeros before the median, so an absent span cannot lower the line", () => {
    expect(rungMedian([0, 0, 0, 10, 20, 30])).toBe(20);
    expect(rungMedian([])).toBe(0);
    expect(rungMedian([0])).toBe(0);
  });

  it("gives every culture in the house the first rung that holds for it", () => {
    for (const r of nextSurvey().rows) expect(r.rung).toBe(rungOf(r));
  });

  // The weights, pinned. Not tautology: `order_what_to_do_next.md` refused a
  // score because invented numbers "drift towards whatever the last person
  // wanted to work on", and this is the answer to that. A weight cannot move
  // without this line moving with it, in the same diff, where it can be argued.
  it("pins the weights, so a number cannot move quietly", () => {
    expect(WEIGHTS).toEqual({
      disordered: 40,
      blocking: 25,
      flat: 15,
      origin: 30,
      present: 30,
      hollow: 20,
      uncast: 6,
      chain: 6,
      unmigrated: 10,
      level: 12,
      holeYears: 20,
      spanYears: 50,
    });
  });

  // The property the score exists for, and the one the ladder could not hold:
  // owing five things ranks above owing one, whatever rung each answers to.
  it("adds severity, so many faults outrank one", () => {
    const clean = {
      disordered: false,
      flat: [],
      blocking: 0,
      origin: true,
      present: true,
      uncast: [],
      chain: [],
      hollow: false,
      migrated: true,
      level: 1,
      span: 0,
      hole: 0,
    };
    const oneFault = { ...clean, disordered: true };
    const many = {
      ...clean,
      origin: false,
      present: false,
      hollow: true,
      uncast: ["a.md", "b.md"],
    };
    // level 1 is two steps above the deepest, so it carries 2 x the level weight
    expect(scoreOf(oneFault).total).toBe(WEIGHTS.disordered + 2 * WEIGHTS.level);
    expect(scoreOf(many).total).toBeGreaterThan(scoreOf(oneFault).total);
    // and the arithmetic adds up to what is printed, or the explanation lies
    for (const l of [oneFault, many]) {
      const { total, terms } = scoreOf(l);
      expect(terms.reduce((n, [p]) => n + p, 0)).toBe(total);
    }
  });

  // Level is the reason the score was built - a level-2 outranked a level-1 for
  // two working days - but it is a nudge and never a veto: a country owing one
  // thing does not outrank a state owing three.
  it("weighs level without letting it dominate", () => {
    const clean = {
      disordered: false,
      flat: [],
      blocking: 0,
      origin: true,
      present: true,
      uncast: [],
      chain: [],
      hollow: false,
      migrated: true,
      span: 0,
      hole: 0,
    };
    const country = { ...clean, level: 1, disordered: true };
    const state = { ...clean, level: 2, disordered: true };
    expect(scoreOf(country).total).toBeGreaterThan(scoreOf(state).total);
    const brokenState = { ...clean, level: 2, disordered: true, origin: false, present: false };
    expect(scoreOf(brokenState).total).toBeGreaterThan(scoreOf(country).total);
  });

  // A score that reproduced the ladder would be ceremony. This asserts it does
  // not: the two orders disagree on the house as it actually stands.
  it("ranks differently from the ladder it replaced", () => {
    const q = nextQueue();
    const ladder = [...q].sort(
      (a, b) => a.rung - b.rung || b.hole - a.hole || b.span - a.span || a.id.localeCompare(b.id),
    );
    expect(ladder.map((r) => r.id)).not.toEqual(q.map((r) => r.id));
    expect(q.every((r) => typeof r.score === "number" && Array.isArray(r.terms))).toBe(true);
  });

  // Level comes from the culture's own geo.json and never from its id, because
  // ids lie: el_salvador and dr_congo are countries whose ids read sub-national.
  it("reads level from geo.json, not from the id", () => {
    const { rows } = nextSurvey();
    const byId = new Map(rows.map((r) => [r.id, r]));
    for (const id of ["el_salvador", "dr_congo"])
      if (byId.has(id)) expect(byId.get(id).level).toBe(1);
    expect(levelOf("packages/khai-cultures-de-thuringia")).toBe(2);
    expect(levelOf("packages/khai-cultures-sweden")).toBe(1);
    expect(levelOf(null)).toBe(1);
  });

  // Total, or it is not deterministic - and re-running the queue does not prove
  // it, because the rows arrive in the same order twice and a comparator that
  // ties somewhere would pass anyway. What is asserted is the property itself:
  // permute the input and the answer does not move, and no adjacent pair ties.
  it("orders the queue totally, so the input order cannot change the result", () => {
    const q = nextQueue();
    expect(q.length).toBeGreaterThan(0);
    const half = Math.floor(q.length / 2);
    for (const permuted of [[...q].reverse(), [...q.slice(half), ...q.slice(0, half)]])
      expect([...permuted].sort(cultureOrder).map((r) => r.id)).toEqual(q.map((r) => r.id));
    for (let i = 1; i < q.length; i += 1) expect(cultureOrder(q[i - 1], q[i])).not.toBe(0);
    expect(nextCulture().id).toBe(q[0].id);
  });

  it("queues everything that owes something and nothing that does not", () => {
    const { rows } = nextSurvey();
    const settled = rows.filter((r) => r.rung === SETTLED).length;
    expect(nextQueue().length + settled).toBe(rows.length);
    expect(nextQueue().every((r) => r.rung < SETTLED)).toBe(true);
  });

  // A name alone would send someone to read the culture and guess. Every culture
  // it names carries its ledger, and every culture on a rung that needs a
  // reading carries the questions too - rung 4 is a migration and asks nothing.
  it("never names a culture without saying what it owes", () => {
    for (const r of nextQueue()) {
      expect(owed(r).length, r.id).toBeGreaterThan(0);
      if (r.rung < 3) expect(asks(r).length, r.id).toBeGreaterThan(0);
    }
  });

  // The distinction this file rests on, held so it survives the next reader.
  it("stays out of the gates manifest, because a ranking is a reading", () => {
    const { gates } = JSON.parse(
      readFileSync(join(workspaceRoot, "khai-guard.config.json"), "utf8"),
    );
    expect(gates.some((g) => (g.command ?? "").includes("next.mjs"))).toBe(false);
  });
});

// The queue named `us_south_carolina` and it could not be worked: thirty of its
// points were `no origin`, and that origin waits on the Gullah Geechee being a
// culture of their own. A survey that scores every row alone cannot see the work
// that makes work payable. See management/orders/order_what_to_do_next.md.
describe("Cultures house: a score is owed by whatever blocks it", () => {
  const rowsOf = (spec) =>
    Object.entries(spec).map(([id, own]) => ({ id, own, kind: "culture", unit: `x/${id}` }));
  // These cases need a graph the filesystem does not hold - a cycle, a chain
  // three deep - so the dependency map is injected and the REAL `inherit` runs.
  // A local reimplementation would assert against its own copy and keep passing
  // after the shipped walk broke.
  const spread = (rows, edges) => {
    const deps = new Map(rows.map((r) => [r.id, new Set(edges[r.id] ?? [])]));
    inherit(rows, deps);
    return new Map(rows.map((r) => [r.id, r]));
  };

  it("derives no edge from a group to its members, because casting is not blocking", () => {
    // This test replaces one that asserted bolivia leads the queue, carrying 737
    // points from five groups. It did lead, and the 737 was arithmetic nobody
    // could fault - and every one of those points was a group's own `no origin`,
    // `no present` and unchained Triggers, which writing bolivia cannot touch.
    // An edge belongs in the graph only when the dependent cannot proceed until
    // the dependency is done, and a group casting a member is not that.
    const rows = nextSurvey().rows;
    const deps = dependencies(rows);
    const edges = [...deps.values()].reduce((n, d) => n + d.size, 0);
    expect(edges, "a derived edge is back: check it blocks rather than composes").toBe(0);
    for (const r of rows) {
      expect(r.inherited, `${r.id} inherited from somewhere`).toBe(0);
      expect(r.score).toBe(r.own);
    }
  });

  it("names the case the mechanism is for, which no file records yet", () => {
    // `us_south_carolina` cannot write its origin until the Gullah Geechee are a
    // culture of their own. That is a blocking edge and nothing in the repository
    // says so - the open Target in order_what_to_do_next.md. Held here so the day
    // a declaration lands, this fails and asks to be rewritten.
    const rows = nextSurvey().rows;
    const sc = rows.find((r) => r.id === "us_south_carolina");
    expect(sc, "us_south_carolina left the house").toBeTruthy();
    expect(dependencies(rows).get("us_south_carolina").size).toBe(0);
  });

  it("adds the whole score to each dependency and never a share of it", () => {
    // Five groups waiting on one culture are five debts hanging on it, not five
    // fifths of one. A split would say that doing it half-moves each of them.
    // One group with TWO members is what catches a split: with one member each,
    // a share and a whole are the same number and the fault is invisible. This
    // case was written that way first and passed with the split planted.
    const rows = rowsOf({ g: 100, m1: 7, m2: 3 });
    const by = spread(rows, { g: ["m1", "m2"] });
    expect(by.get("m1").inherited, "a share would be 50").toBe(100);
    expect(by.get("m2").inherited, "a share would be 50").toBe(100);
    expect(by.get("m1").score).toBe(107);
    expect(by.get("m2").score).toBe(103);
    // And two groups on one member add rather than replace.
    const two = rowsOf({ g1: 60, g2: 40, member: 1 });
    const byTwo = spread(two, { g1: ["member"], g2: ["member"] });
    expect(byTwo.get("member").inherited).toBe(100);
  });

  it("walks the chain, because a dependency of a dependency still blocks", () => {
    const rows = rowsOf({ top: 50, middle: 5, bottom: 1 });
    const by = spread(rows, { top: ["middle"], middle: ["bottom"] });
    expect(by.get("middle").inherited).toBe(50);
    expect(by.get("bottom").inherited, "50 from top through middle, plus 5").toBe(55);
    expect(by.get("bottom").score).toBe(56);
  });

  it("survives a cycle instead of hanging on one", () => {
    // Groups cannot cycle today, casting only cultures. The guard is for the
    // declared edges the order still owes, where a and b can wait on each other.
    const rows = rowsOf({ a: 10, b: 20 });
    const by = spread(rows, { a: ["b"], b: ["a"] });
    expect(by.get("a").inherited).toBe(20);
    expect(by.get("b").inherited).toBe(10);
  });

  it("reads the rung from the unit's own ledger, never from what it inherits", () => {
    // A culture is not in worse condition because something waits on it. The
    // terms and the rung describe this unit; only the ORDER carries the rest.
    for (const r of nextSurvey().rows) {
      expect(
        r.terms.reduce((n, [p]) => n + p, 0),
        `${r.id} terms must sum to own`,
      ).toBe(r.own);
      expect(r.rung).toBe(rungOf(r));
    }
  });

  it("is exported so a caller can propagate over rows it built itself", () => {
    expect(typeof inherit).toBe("function");
  });
});

describe("Cultures house: the queue reads groups and sunken too", () => {
  const s = nextSurvey();

  it("carries every unit with a kind, and cultures are no longer all of them", () => {
    const kinds = new Set(s.rows.map((r) => r.kind));
    expect([...kinds].sort()).toEqual(expect.arrayContaining(["culture", "group"]));
    for (const r of s.rows) expect(["culture", "group", "sunken"]).toContain(r.kind);
    expect(s.rows.filter((r) => r.kind === "group").length).toBe(allGroups().length);
  });

  // The medians are per kind, and this is the guard on the reason why. Most
  // groups have no dated plot at all, so one house-wide median would drag the
  // span down and re-wring cultures nobody had touched - a widening that
  // re-ranked the queue as a side effect of looking somewhere new.
  it("holds a median per kind, so one population cannot re-rank another", () => {
    expect(s.medianSpanBy.get("culture")).toBe(s.medianSpan);
    expect(s.medianHoleBy.get("culture")).toBe(s.medianHole);
    const groupSpans = s.rows.filter((r) => r.kind === "group").map((r) => r.span);
    const allSpans = s.rows.map((r) => r.span);
    // The two populations really are different, or this guard proves nothing.
    expect(Math.max(...groupSpans)).toBeLessThan(Math.max(...allSpans));
  });

  // group_coverage answers where company_coverage refuses. `dead` IS uncast, and
  // noOrigin/noPresent are the same two questions asked of any plot line.
  it("reads a group off its own wall, mapped onto the same ledger", () => {
    for (const g of allGroups()) {
      const row = s.rows.find((r) => r.kind === "group" && r.id === g.id);
      expect(row, `${g.id} must be in the survey`).toBeTruthy();
      const c = groupCoverage(g.id);
      expect(row.origin).toBe(!c.noOrigin);
      expect(row.present).toBe(!c.noPresent);
      expect(row.uncast).toEqual(c.dead);
      expect(row.chain.length).toBe(c.unlinked.length + c.orphans.length + c.broken.length);
      // Level 1 deliberately: a group is not in the ISO tree, it collects the
      // things that are, so it stands where a country stands.
      expect(row.level).toBe(1);
      expect(row.migrated).toBe(g.migrated);
    }
  });

  it("wrings a broken chain as wrong, because the chapter claims a chain it has not got", () => {
    const clean = {
      disordered: false,
      flat: [],
      blocking: 0,
      origin: true,
      present: true,
      uncast: [],
      chain: [],
      hollow: false,
      migrated: true,
    };
    expect(rungOf(clean)).toBe(SETTLED);
    expect(rungOf({ ...clean, chain: ["a plot no entry chains"] })).toBe(0);
  });

  it("counts chain faults per item, so eight orphans outrank one", () => {
    const base = {
      disordered: false,
      flat: [],
      blocking: 0,
      origin: true,
      present: true,
      uncast: [],
      chain: [],
      hollow: false,
      migrated: true,
      level: 1,
    };
    const one = scoreOf({ ...base, chain: ["a"] }).total;
    const eight = scoreOf({ ...base, chain: [..."abcdefgh"] }).total;
    expect(eight - one).toBe(7 * WEIGHTS.chain);
  });

  // Written when the population was empty, and rewritten by the first play that
  // filled it. What matters is not the count but that a sunken unit is ranked as
  // sunken and is NOT a culture: `cimbri` entering `cultureIds()` moved the
  // umbrella's minor to 320 and had the complete-theatre wall demanding a pitch of
  // a people that ended in 101 BC.
  it("ranks the sunken as sunken, and never as a culture", () => {
    const ids = sunkenUnits().map((u) => u.id);
    // This asserted nothing for as long as the reader found nothing: an empty
    // list makes every loop below vacuous and the final comparison `[]` to `[]`.
    // The survey reported "0 sunken" in its own header while a sunken play sat
    // in the umbrella, and this test passed throughout.
    expect(ids.length, "no sunken unit found, so this test checks nothing").toBeGreaterThan(0);
    for (const id of ids) {
      expect(coveredCultureIds(), `"${id}" is sunken and must not be a culture`).not.toContain(id);
      const row = s.rows.find((r) => r.id === id);
      expect(row, `"${id}" must be in the survey`).toBeTruthy();
      expect(row.kind).toBe("sunken");
    }
    expect(s.rows.filter((r) => r.kind === "sunken").map((r) => r.id)).toEqual(ids);
  });

  // `migrated` was hardcoded `true` on the sunken row while the only shape a
  // sunken unit could have was a package. Read rather than assumed now, because
  // a unit authored in the umbrella that claims to have left it drops the
  // `unmigrated` weight and the line of advice that says where it is.
  it("reads whether a sunken unit has left the umbrella, rather than assuming", () => {
    const rows = s.rows.filter((r) => r.kind === "sunken");
    expect(rows.length, "no sunken row to check").toBeGreaterThan(0);
    for (const r of rows) {
      const inUmbrella = r.unit.startsWith("packages/khai-cultures/sunken/");
      expect(r.migrated, `${r.id} is at ${r.unit}`).toBe(!inUmbrella);
    }
  });
});

describe("Cultures house: a reading that is not recorded did not happen", () => {
  // The audit lane runs with NO INSTALL so a registry it does not need cannot
  // break it, so it enumerates cultures itself rather than importing
  // culture_sources, which reaches for @chbrain/khai-tests. A duplication chosen
  // over a dependency is only safe while the two agree, so they are held to it.
  it("enumerates the same cultures as culture_sources, by a different route", () => {
    expect(auditCultureIds()).toEqual([...coveredCultureIds()].sort());
  });

  it("digests the Cues and nothing else, so an Action edit does not stale a reading", () => {
    const one = { plots: [{ file: "plot_00_a.md", cue: "En mose." }] };
    const same = { plots: [{ file: "plot_00_a.md", cue: "En mose." }] };
    const moved = { plots: [{ file: "plot_00_a.md", cue: "En anden mose." }] };
    const added = { plots: [...one.plots, { file: "plot_01_b.md", cue: "Og en tyr." }] };
    expect(cueDigest(one)).toBe(cueDigest(same));
    expect(cueDigest(one)).not.toBe(cueDigest(moved));
    expect(cueDigest(one)).not.toBe(cueDigest(added));
    expect(cueDigest(null)).toBe(null);
  });

  it("calls a culture never read, read, or stale, against that digest", () => {
    const id = coveredCultureIds()[0];
    expect(statusOf(id, {}).status).toBe("never");
    const fresh = readCulture(dirFor(id));
    const good = {
      [id]: [
        { read: "2026-09-24", reader: "gemini", plots: fresh.plots.length, cues: cueDigest(fresh) },
      ],
    };
    expect(statusOf(id, good).status).toBe("current");
    const wrong = {
      [id]: [
        { read: "2026-09-24", reader: "gemini", plots: fresh.plots.length, cues: "000000000000" },
      ],
    };
    expect(statusOf(id, wrong).status).toBe("stale");
  });

  // The digest is what a reader copies into the record, and it used to be
  // computed inside the branch that already had a reading - so the one path that
  // most needs it, a culture nobody has read, printed `"cues": "undefined"`.
  it("offers the digest on the never-read path, which is the path that needs it", () => {
    const s = statusOf(coveredCultureIds()[0], {});
    expect(s.status).toBe("never");
    expect(s.digest).toMatch(/^[0-9a-f]{12}$/);
  });

  // The reader is pointed AT the repo rather than handed the prose, so the URL is
  // load-bearing - and derived from the remote, because a fork or a rename would
  // otherwise send every reader to somebody else's house.
  it("derives the repository a reader is pointed at, rather than carrying one", () => {
    const url = repoUrl();
    expect(url).toMatch(/^https:\/\/github\.com\/[^/]+\/[^/]+$/);
    expect(url.endsWith(".git")).toBe(false);
  });

  it("holds the record parseable, and counts what it does not yet hold", () => {
    const r = readings();
    expect(typeof r).toBe("object");
    for (const [id, list] of Object.entries(r)) {
      expect(Array.isArray(list), `readings["${id}"] must be an array`).toBe(true);
      for (const e of list) {
        expect(typeof e.read).toBe("string");
        expect(typeof e.reader, `readings["${id}"] needs a named reader`).toBe("string");
        expect(e.reader.length).toBeGreaterThan(0);
      }
    }
  });
});
