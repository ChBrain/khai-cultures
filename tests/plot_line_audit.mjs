#!/usr/bin/env node
// The audit lane's extractor, and only the extractor.
//
// `order_the_passport.md` asks a second reader one question about a culture:
// name the subject of each plot's Cue, and count how many are the state or one
// of its instruments. That order also records why this is not a gate - two
// counters were measured against all 322 plots in the house and both fail, one
// passing the worst offender and one inverted - so nothing here scores, and
// nothing here exits non-zero over content.
//
// The split is deliberate. This file finds the plot lines a change touches and
// builds the question; a model answers it; the workflow posts the answer. That
// keeps the house's half vendor agnostic, runnable by hand, and readable in the
// diff, and it means the lane still does something useful when no model is
// wired: it prints the prompt for a person to paste anywhere.
//
// It sends the title and the Cue of every plot in a touched culture, and never
// the staged prose. A model grading prose a model wrote, in a tongue neither can
// verify, is a mirror. Naming who acts in a Cue is a far lower bar than judging
// how it is written, and it is the only thing asked for.
//
// Usage:
//   node tests/plot_line_audit.mjs --base <sha> --head <sha>   # what a PR touches
//   node tests/plot_line_audit.mjs --culture fr_corsica        # one, by id
// NODE BUILTINS ONLY, AND THAT IS A CONTRACT AND NOT A PREFERENCE. The workflow
// runs this on a fresh clone with no `npm install`, so any import that resolves
// through node_modules takes the lane down. It did: a first fix for the umbrella
// blindness below reached for `cultureDir` and `touchedCultures`, which pull in
// `@chbrain/khai-tests`, and the lane died with ERR_MODULE_NOT_FOUND on the very
// pull request it was meant to read. The invariant was written in a comment above
// the workflow step and nothing enforced it; `house.test.mjs` now does.
import { readFileSync, existsSync, readdirSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { join } from "node:path";

const argv = process.argv.slice(2);
const flag = (n) => {
  const i = argv.indexOf(`--${n}`);
  return i === -1 ? undefined : argv[i + 1];
};
const root = execFileSync("git", ["rev-parse", "--show-toplevel"], { encoding: "utf8" }).trim();

// `\\Z` IS NOT JAVASCRIPT. This read `(?=^## |\\Z)` and meant "up to the next
// chapter or the end of the file"; JS has no `\\Z` escape, so it compiled to the
// literal letter Z and every Cue was cut at its first capital one. Measured
// across the house when found: of 1,551 plots with a Cue, 63 were truncated
// mid-sentence and 9 came back empty because their Cue opens on a Z - Thüringen's
// glassworks plot begins "Zwei Glasmacher" and the lane reported it as having no
// Cue chapter at all. No regex end-of-input escape here: find the heading, take
// everything to the next one.
const chapter = (text, name) => {
  const start = new RegExp(`^## ${name}\\s*$`, "m").exec(text);
  if (!start) return "";
  const rest = text.slice(start.index + start[0].length);
  const next = /^## /m.exec(rest);
  return (next ? rest.slice(0, next.index) : rest).trim();
};
const field = (text, key) => new RegExp(`^${key}:\\s*"?([^"\\n]+)"?`, "m").exec(text)?.[1] ?? "";
const h1 = (text) => /^# \w+: (.*)$/m.exec(text)?.[1] ?? "";

/** The two homes a culture can live in, as path shapes. */
const UMBRELLA = "packages/khai-cultures/cultures";
const MIGRATED = /^packages\/khai-cultures-[^/]+$/;

/**
 * A changed path's culture directory, or null.
 *
 * IT USED TO SEE ONLY THE MIGRATED HALF, WHICH IS THE HALF THAT NEEDS IT LEAST.
 * The pattern was `packages/khai-cultures-[^/]+/(plot_|play_)`, and a culture in
 * the umbrella sits at `packages/khai-cultures/cultures/<id>/plot_*.md` - no
 * hyphen suffix, one segment deeper. Measured when found: 795 plot files across
 * 206 umbrella cultures matched nothing against 748 across 123 migrated ones that
 * matched, so the lane had never run on two thirds of the house. San Marino,
 * Hawaii and Andorra were all staged in the umbrella and read by nobody; Andorra
 * shipped with seven of eleven Cues a state acting.
 *
 * The house has `cultureDir` for this and it cannot be used here - see the import
 * note above. So both shapes are written out, and `house.test.mjs` asserts the
 * extractor returns plots for a real culture in each home, which is the check the
 * original pattern would have failed.
 */
function dirOf(path) {
  const parts = path.split("/");
  const file = parts[parts.length - 1];
  if (!/^(plot_|play_)/.test(file)) return null;
  const dir = parts.slice(0, -1).join("/");
  if (dir.startsWith(`${UMBRELLA}/`) && parts.length === 5) return dir;
  if (MIGRATED.test(dir)) return dir;
  return null;
}

/** Culture directories a diff touches through their plots or play. */
function touched(base, head) {
  const out = execFileSync("git", ["diff", "--name-only", `${base}..${head}`], {
    encoding: "utf8",
    cwd: root,
  });
  const dirs = new Set();
  for (const line of out.split("\n")) {
    const d = dirOf(line.trim());
    if (d) dirs.add(d);
  }
  return [...dirs].sort();
}

/** A culture id resolved to whichever home holds it. */
function dirFor(id) {
  const umbrella = join(UMBRELLA, id);
  if (existsSync(join(root, umbrella))) return umbrella;
  const migrated = `packages/khai-cultures-${id.replace(/_/g, "-")}`;
  if (existsSync(join(root, migrated))) return migrated;
  return null;
}

function readCulture(dir) {
  if (!dir) return null;
  const abs = join(root, dir);
  if (!existsSync(abs)) return null;
  const files = readdirSync(abs).filter((f) => f.endsWith(".md"));
  const playFile = files.find((f) => f.startsWith("play_"));
  const play = playFile ? readFileSync(join(abs, playFile), "utf8") : "";
  const plots = files
    .filter((f) => f.startsWith("plot_"))
    .sort()
    .map((f) => {
      const t = readFileSync(join(abs, f), "utf8");
      return { file: f, title: h1(t), cue: chapter(t, "Cue") };
    });
  return {
    id: dir.startsWith(`${UMBRELLA}/`)
      ? dir.slice(UMBRELLA.length + 1)
      : dir.replace("packages/khai-cultures-", "").replace(/-/g, "_"),
    language: field(play, "language") || "unknown",
    declared: field(play, "declared"),
    plots,
  };
}

const PREAMBLE = `You are a second reader for a house of staged world cultures. You are auditing
one thing and nothing else.

Every culture here is staged as a play whose plots are its history. A recurring
failure is that a plot line stages only the statehood of a country - treaties,
conquests, decrees, censuses, court rulings - which describes a passport rather
than a culture. Three cultures shipped that way in one week before this lane
existed.

For each plot below, do exactly this:

1. Name, in English and in a few words, the subject of its Cue: who or what acts
   first. Not the theme, not the period. The thing that moves.
2. Mark yes or no: is that subject a state or one of its instruments - a king, a
   parliament, an army, a ministry, a commission, a court, a decree, a census?

Then give the count (how many yes, out of how many plots) and at most three
sentences of judgement. If most of the line is yes, say so plainly.

Rules for you:

- Do NOT judge the prose, the style, or the language. The Cues are written in the
  culture's own tongue and you are not reviewing how they are written.
- Do NOT propose rewordings.
- Do NOT score anything out of ten, and do not invent a threshold. The house has
  measured two mechanical counters for this against all its plots and both fail.
- Politics is not the fault. This house runs at roughly three state plots in six
  to nine, and a line with no state plots at all would be as wrong as one with
  nothing else. You are reporting a proportion and what it is made of, not
  enforcing a maximum.
- If the line looks sound, say that in one sentence and stop.
`;

function render(cultures) {
  const parts = [PREAMBLE];
  for (const c of cultures) {
    parts.push(`\n---\n\n## Culture: ${c.id}${c.declared ? ` (${c.declared})` : ""}`);
    parts.push(`Language of the staged prose: \`${c.language}\`. ${c.plots.length} plots.\n`);
    for (const p of c.plots) {
      parts.push(`### ${p.file}\n\n**${p.title}**\n\n${p.cue || "(no Cue chapter)"}\n`);
    }
  }
  return parts.join("\n");
}

const one = flag("culture");
const dirs = one ? [dirFor(one)] : touched(flag("base") ?? "origin/main", flag("head") ?? "HEAD");

const cultures = dirs.map(readCulture).filter((c) => c && c.plots.length);
if (!cultures.length) {
  console.error("plot-line audit: no culture plot line touched, nothing to ask.");
  process.exit(0);
}
process.stdout.write(render(cultures));
