// Staging: a chapter is written, and a plot stages a scene.
//
// Every gate in this house until now checked that something EXISTS. The canon
// checks that a play has an Arc and a plot has a Cue; coverage checks that every
// Company element is named in some plot's Stage; plot zero checks that a file
// called plot_00 is on disk. None of them opens the chapter and asks whether it
// says anything, and none of them asks whether the casting means anything.
//
// A pull request arrived that passed all of them and was scaffolding. Its plot
// chapters read `(cue)`, `(action)`, and its personas read `(proj)`, `(shadow)`,
// `(tell)`. Coverage reported zero for all three cultures, honestly, because
// every plot in every culture staged the identical full Company list - and one
// Tension said so in its own prose: "Placeholder for the actual tension, casting
// all company members to satisfy the gate." The whole suite was green.
//
// So two facts that are decidable get held here, and neither is a ratchet,
// because both start clean across all 297 cultures - the same reason the tongues
// package is checked outright rather than paid down.
//
//   SUBSTANCE   a canon chapter carries prose, not a placeholder
//   SCENE       a culture's plots do not all stage the same cast
//
// WHAT THIS CANNOT DO. It cannot tell good prose from bad, and it must not try:
// whether a chapter is TRUE is the dialogue that order_the_defining_question.md
// protects, and no counter stands in for it. It holds the floor and nothing
// above it. A culture can pass this gate and still be thin, and the reading is
// still owed.

import { readdirSync, readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { types } from "@chbrain/khai-arch";
import { cultureIds } from "./company_coverage.mjs";
import { cultureDir } from "./culture_sources.mjs";

/**
 * The shortest real canon chapter in this house is 42 characters: Bashō's Tell
 * in `japan/persona_basho.md`, which is short because CJK is dense and not
 * because it is unwritten. Measured over 26,342 canon chapters, the first
 * permille sits at 63 and the first percentile at 95.
 *
 * So the floor is set at 40 - below the house's own shortest honest chapter, and
 * an order of magnitude above `(cue)`. It is deliberately not a quality bar. A
 * chapter that clears it can still be bad, and this gate has no opinion about
 * that; what it forbids is a chapter that was never written at all.
 */
export const FLOOR = 40;

/**
 * Scaffolding, whatever its length. The first pattern is the one that actually
 * appeared - a lone parenthesised word standing in for the chapter it names -
 * and the rest are the shapes the same habit takes in other hands.
 */
const PLACEHOLDER = [
  /^\(\s*[\p{L} ]{1,24}\s*\)$/u,
  /\bplaceholder\b/i,
  /\blorem ipsum\b/i,
  /\bTODO\b|\bTBD\b|\bFIXME\b|\bXXX\b/,
  /^\.{3,}$/,
  /^[-–—_\s]*$/,
];

/** The canon's chapter names for a khai type, or null if it has none. */
const chaptersFor = (kind) => {
  const t = types[kind];
  const list = Array.isArray(t) ? t : t?.chapters;
  return Array.isArray(list) && list.length ? list : null;
};

/**
 * A chapter's body, by heading. The heading is matched as a fixed string rather
 * than assembled into a pattern from the file's own text: the names come from
 * the canon and nothing here is built out of anything a culture wrote.
 */
export function chapterBody(text, name) {
  const lines = text.split("\n");
  const at = lines.findIndex((l) => l.trim() === `## ${name}`);
  if (at === -1) return null;
  const rest = lines.slice(at + 1);
  const end = rest.findIndex((l) => l.startsWith("## "));
  return (end === -1 ? rest : rest.slice(0, end)).join("\n").trim();
}

const isPlaceholder = (body) => PLACEHOLDER.some((p) => p.test(body));

/** Canon chapters that were never written. */
export function substanceFindings(ids = cultureIds()) {
  const out = [];
  for (const id of ids) {
    const dir = cultureDir(id);
    if (!dir || !existsSync(dir)) continue;
    for (const file of readdirSync(dir).filter((f) => f.endsWith(".md"))) {
      const text = readFileSync(join(dir, file), "utf8");
      const kind = /^khai:\s*([a-z]+)\s*$/m.exec(text)?.[1];
      const chapters = kind && chaptersFor(kind);
      if (!chapters) continue;
      for (const name of chapters) {
        const body = chapterBody(text, name);
        if (body === null) continue; // the canon owns a missing chapter, not this gate
        if (isPlaceholder(body))
          out.push(`${id}/${file}: chapter "${name}" is a placeholder, not prose`);
        else if (body.length < FLOOR)
          out.push(
            `${id}/${file}: chapter "${name}" is ${body.length} characters; the floor is ${FLOOR}`,
          );
      }
    }
  }
  return out.sort();
}

/** The set of files a plot's Stage casts, as a comparable key. */
export function stageCast(text) {
  const body = chapterBody(text, "Stage");
  if (body === null) return null;
  return [...body.matchAll(/\]\(([^)]+\.md)\)/g)]
    .map((m) => m[1].split("/").pop())
    .sort()
    .join("|");
}

/**
 * Plots that all stage the same cast.
 *
 * Coverage asks whether every Company element is fielded by a scene. A play that
 * lists the entire Company under every plot answers that question with a tautology:
 * it proves nothing about whether any scene needs anyone. The tell is exact and
 * cheap to check, and no culture in this house does it - a play with three or
 * more plots that stages one single cast throughout has satisfied a counter
 * rather than staged anything, which is what the house rule forbids by name.
 *
 * Fewer than three plots is left alone: two scenes that happen to draw on the
 * same three places is a coincidence, not a pattern.
 */
export function sceneFindings(ids = cultureIds()) {
  const out = [];
  for (const id of ids) {
    const dir = cultureDir(id);
    if (!dir || !existsSync(dir)) continue;
    const plots = readdirSync(dir).filter((f) => f.startsWith("plot_") && f.endsWith(".md"));
    const casts = plots.map((f) => stageCast(readFileSync(join(dir, f), "utf8"))).filter(Boolean);
    if (casts.length < 3) continue;
    if (new Set(casts).size === 1)
      out.push(
        `${id}: all ${casts.length} plots stage the same cast -- a Stage is the scene's own, ` +
          `and a play that lists the whole Company under every plot has satisfied the coverage ` +
          `counter rather than staged anything`,
      );
  }
  return out.sort();
}

/** Everything this gate holds. */
export const staging = (ids = cultureIds()) => [...substanceFindings(ids), ...sceneFindings(ids)];

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const findings = staging();
  console.log(`staging: ${findings.length} finding(s)`);
  for (const line of findings) console.log(`  ${line}`);
  if (findings.length) {
    console.log(
      "\n  A chapter is written or it is not there yet, and a plot stages the scene it needs.\n" +
        "  Neither is a quality bar: what a chapter should SAY is the reading the defining\n" +
        "  question asks for, and no counter stands in for it.",
    );
    console.log(`::error::Staging: ${findings.length} finding(s)`);
  }
  process.exit(findings.length ? 1 : 0);
}
