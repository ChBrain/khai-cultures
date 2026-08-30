#!/usr/bin/env node
// A culture's skeleton, and the questions its overlaps raise.
//
// A culture is two or three thousand lines once it is written, and the decisions
// that matter are made before any of them: which moments are staged, in what
// order, and who stands in each scene. Those fit in twenty lines. This prints
// them - as a plan before the writing, and as a lens on someone else's branch
// after it, where three identical Stages are visible at a glance and invisible
// in the diff.
//
// The overlap report NEVER fails. Two cultures sharing a name or a year is
// sometimes the truth: Kappel 1531 belongs to Zurich and to the cantons that
// fought it, and neighbours share their history honestly. It is also how a
// template shows through. The two cannot be told apart by counting, so this
// mandates the asking and mandates no answer - the same stance the Defining
// Question takes, and for the same reason. A fuzzy signal made into a hard gate
// becomes the next thing to satisfy: the coverage counter was answered by
// listing the whole Company under every plot, and the play was never staged.
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";
import { execFileSync } from "node:child_process";
import { cultures } from "./culture_sources.mjs";

const CAST = ["persona", "position", "piece", "place", "process", "plan"];

const plural = (word, n) => (n === 1 ? word : word.endsWith("s") ? `${word}es` : `${word}s`);

function skeleton(c) {
  const files = existsSync(c.dir) ? readdirSync(c.dir).filter((f) => f.endsWith(".md")) : [];
  const plots = files
    .filter((f) => f.startsWith("plot_"))
    .sort()
    .map((f) => {
      const body = readFileSync(join(c.dir, f), "utf8");
      // Split on chapter headings rather than matching to end-of-chapter: with
      // /m the `$` in a lookahead matches every line end, and the lazy quantifier
      // stops on the first one, which silently reports every Stage as empty.
      const stageChapter = body.split(/^## /m).find((ch) => ch.startsWith("Stage"));
      const stage = [...new Set((stageChapter ?? "").match(/[a-z0-9_]+\.md/g) ?? [])];
      return { file: f, slug: f.replace(/^plot_\d+_/, "").replace(/\.md$/, ""), stage };
    });
  const cast = {};
  for (const kind of CAST) cast[kind] = files.filter((f) => f.startsWith(`${kind}_`));
  return { id: c.id, plots, cast, files };
}

function printSkeleton(s) {
  console.log(`\n${s.id}`);
  for (const p of s.plots)
    console.log(
      `  ${p.file.replace(/\.md$/, "").padEnd(44)} ${p.stage.map((x) => x.replace(/\.md$/, "")).join(", ") || "—"}`,
    );
  console.log(
    `  Company: ${CAST.map((k) => `${s.cast[k].length} ${plural(k, s.cast[k].length)}`).join(", ")}`,
  );
}

// The three signals, each phrased as a question. None is evidence of a fault.
function questions(subjects, all) {
  const out = [];

  // 1. A cast member's name in more than one culture. Two cultures with a
  // place_marktplatz have two different squares; two with a piece_boeoegg have
  // one Zurich tradition and one culture that borrowed it.
  const owners = new Map();
  for (const s of all)
    for (const f of s.files)
      if (CAST.some((k) => f.startsWith(`${k}_`))) {
        if (!owners.has(f)) owners.set(f, []);
        owners.get(f).push(s.id);
      }
  for (const s of subjects)
    for (const f of s.files) {
      const holders = owners.get(f);
      if (!holders || holders.length < 2 || holders.length > 4) continue;
      const others = holders.filter((h) => h !== s.id);
      if (!others.length) continue;
      out.push(
        `${s.id} and ${others.join(", ")} each stage ${f.replace(/\.md$/, "")}.\n    Whose is it, and what does the other stage in its place?`,
      );
    }

  // 2. The same year anchoring a plot in more than one culture.
  const years = new Map();
  for (const s of all)
    for (const p of s.plots)
      for (const y of p.slug.match(/\b(1[0-9]{3}|20[0-9]{2})\b/g) ?? []) {
        if (!years.has(y)) years.set(y, []);
        years.get(y).push(`${s.id}/${p.file.replace(/\.md$/, "")}`);
      }
  for (const s of subjects)
    for (const p of s.plots)
      for (const y of p.slug.match(/\b(1[0-9]{3}|20[0-9]{2})\b/g) ?? []) {
        const others = (years.get(y) ?? []).filter((v) => !v.startsWith(`${s.id}/`));
        if (!others.length || others.length > 4) continue;
        out.push(
          `${s.id} anchors ${y} in ${p.file.replace(/\.md$/, "")}; so do ${others.join(", ")}.\n    Is that one event seen from two places, or one plot written twice?`,
        );
      }

  // 3. An identical structural shape. Same number of plots, same Stage sizes in
  // the same order, same Company composition: a template filled, or two places
  // that genuinely rhyme.
  const shape = (s) =>
    JSON.stringify([
      s.plots.length,
      s.plots.map((p) => p.stage.length),
      CAST.map((k) => s.cast[k].length),
    ]);
  const shapes = new Map();
  for (const s of all) {
    const k = shape(s);
    if (!shapes.has(k)) shapes.set(k, []);
    shapes.get(k).push(s.id);
  }
  const reported = new Set();
  for (const s of subjects) {
    const twins = (shapes.get(shape(s)) ?? []).filter((i) => i !== s.id);
    if (!twins.length || reported.has(shape(s))) continue;
    reported.add(shape(s));
    out.push(
      `${s.id} has the same shape as ${twins.join(", ")}: ${s.plots.length} plots, identical Stage sizes, identical Company counts.\n    Did these places arrive at the same shape, or did one template?`,
    );
  }
  return out;
}

// The overlap report asks about one culture at a time. Asked of the house at
// once, the same question has a different weight: if most cultures share a
// handful of shapes, the shape is not a property of the places.
function shapes(all) {
  const dist = new Map();
  for (const s of all) {
    const key = `${s.plots.length}p  ${CAST.map((k) => s.cast[k].length).join("/")}`;
    if (!dist.has(key)) dist.set(key, []);
    dist.get(key).push(s.id);
  }
  const rows = [...dist.entries()].sort((a, b) => b[1].length - a[1].length);
  console.log(`\n${all.length} cultures carry ${rows.length} distinct shapes.`);
  console.log(`plots  ${CAST.join("/")}\n`);
  for (const [key, ids] of rows.slice(0, 8))
    console.log(
      `  ${String(ids.length).padStart(4)}  ${key}   ${ids.slice(0, 3).join(", ")}${ids.length > 3 ? ", …" : ""}`,
    );
  const top = rows.slice(0, 3).reduce((n, r) => n + r[1].length, 0);
  console.log(
    `\n  ${top} of ${all.length} cultures (${Math.round((top / all.length) * 100)}%) share the three commonest shapes.`,
  );
  for (const k of CAST) {
    const counts = new Map();
    for (const s of all) counts.set(s.cast[k].length, (counts.get(s.cast[k].length) ?? 0) + 1);
    const [value, n] = [...counts.entries()].sort((a, b) => b[1] - a[1])[0];
    const pct = Math.round((n / all.length) * 100);
    if (pct >= 80) console.log(`  ${plural(k, 2)}: ${value} in ${pct}% of cultures.`);
  }
  console.log(`\n  Did three hundred places arrive at these shapes, or did a template?`);
}

const argv = process.argv.slice(2);
const ask = argv.includes("--ask");
const ids = argv.filter((a) => !a.startsWith("--"));
const all = cultures().map(skeleton);
if (argv.includes("--shapes")) {
  shapes(all);
  process.exit(0);
}
const byId = new Map(all.map((s) => [s.id, s]));

let subjects = ids.map((i) => byId.get(i)).filter(Boolean);
const unknown = ids.filter((i) => !byId.has(i));
if (unknown.length) console.error(`skeleton: no such culture: ${unknown.join(", ")}\n`);

// With no culture named, scope to what this branch touched — the cultures whose
// choices are actually up for review.
if (!subjects.length) {
  try {
    const base = execFileSync("git", ["merge-base", "origin/main", "HEAD"], {
      encoding: "utf8",
    }).trim();
    const changed = execFileSync("git", ["diff", "--name-only", `${base}...HEAD`], {
      encoding: "utf8",
    })
      .trim()
      .split("\n");
    const touched = new Set(
      changed
        .map(
          (p) =>
            p.match(/cultures\/([a-z0-9_-]+)\//)?.[1] ??
            p.match(/packages\/khai-cultures-([a-z0-9-]+)\//)?.[1],
        )
        .filter(Boolean),
    );
    subjects = all.filter((s) => touched.has(s.id));
  } catch {
    /* no origin/main; fall through to the whole house */
  }
}
if (!subjects.length) {
  console.error("skeleton: name a culture, or run on a branch that touches one.");
  process.exit(0);
}

for (const s of subjects) printSkeleton(s);

if (ask) {
  const qs = questions(subjects, all);
  console.log(`\n${"—".repeat(70)}`);
  if (!qs.length) console.log("No overlaps to question.");
  else {
    console.log(
      `${qs.length} question(s). None is a finding; each wants an answer before the culture is called done.\n`,
    );
    for (const q of qs) console.log(`  - ${q}\n`);
  }
}
// Advisory, always. See the header.
process.exit(0);
