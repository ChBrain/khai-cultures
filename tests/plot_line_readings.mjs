// Which cultures a second reader has actually read.
//
// `order_the_passport.md` asks a second reader one question: name the subject of
// each Cue, and say whether it is a state or one of its instruments. The lane
// that asks it works. What the house never had is anywhere to put the ANSWER.
//
// So the question was printed into a pull request comment, the comment scrolled
// away, and nothing recorded that a culture had been read. Three hundred and
// nineteen cultures, and no way to name one that a second reader has looked at.
// plot_line_audit.mjs says in its own header that Hawaii and Andorra were
// "staged in the umbrella and read by nobody" - the house knew that was the
// failure and still did not count it.
//
// EVERY OTHER DEBT HERE IS A NUMBER. The titles that restate their type, the
// link names that repeat their file, the tongues that describe instead of
// perform, the groups that owe a chain: each is counted and each can fall. This
// was the last one that evaporated.
//
// WHY THAT MATTERED MORE THAN THE READER. The lane was written against GitHub
// Models, which retired on 30 July 2026, and the instinct is to wire a
// replacement. But the readers this house actually uses are Codex, Gemini and
// Perplexity, by hand, when somebody has ten minutes - and none of them could
// record an answer either. Wiring a reader before there is a place to put the
// reading is the same mistake as three correct fixes to a service that had been
// retired eight weeks earlier.
//
// WHAT A READING GOES STALE AGAINST. A reading names the plot count and a digest
// of the Cues it read. A new plot changes the count; a rewritten Cue changes the
// digest. Either makes the reading stale, which is honest about what it covers:
// the Cues, and nothing else. Edit a culture's Action chapters all day and the
// reading stands, because the reading was never about them.
//
// WHO MAY BE THE READER. Anyone who did not write the culture. Recorded by name,
// free text rather than an enum, because the list moves - it has already been
// GitHub Models, and is now Codex, Gemini and Perplexity. The one value that is
// always wrong is the author's own, and no field can stop that: the order says
// it and the name in the record is what makes it visible.

import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

// All three from the audit lane, which is builtin-only on purpose: this module
// is read by the workflow that runs with no install.
import { cultureIds, dirFor, readCulture, touchedCultures } from "./plot_line_audit.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const WORKSPACE = join(HERE, "..");
export const RECORD = join(WORKSPACE, "management", "readings.json");

/** The judged data: `{ id: [ { read, reader, plots, cues, state, says } ] }`. */
export function readings(path = RECORD) {
  if (!existsSync(path)) return {};
  try {
    return JSON.parse(readFileSync(path, "utf8"));
  } catch {
    return {};
  }
}

/**
 * A short digest of one culture's Cues, in plot order.
 *
 * The Cue is the only thing the audit asks about, so it is the only thing a
 * reading is held against. Twelve hex characters: this is a staleness marker
 * and not a signature, and nothing turns on a collision nobody can engineer.
 */
export function cueDigest(culture) {
  if (!culture) return null;
  const h = createHash("sha256");
  for (const p of culture.plots) h.update(`${p.file}\n${p.cue ?? ""}\n`);
  return h.digest("hex").slice(0, 12);
}

/** `never`, `stale` or `current`, with the reading that says so. */
export function statusOf(id, record = readings()) {
  const culture = readCulture(dirFor(id));
  if (!culture) return { id, status: "absent", reading: null };
  // The digest is computed before the branch, not inside it. It was inside, so a
  // culture nobody had read printed `"cues": "undefined"` in the very line a
  // reader is meant to copy - the field that matters, missing from the path that
  // needs it most.
  const digest = cueDigest(culture);
  const seen = record[id];
  if (!Array.isArray(seen) || !seen.length)
    return { id, status: "never", reading: null, culture, digest };
  const last = seen[seen.length - 1];
  const fresh = last.cues === digest && last.plots === culture.plots.length;
  return { id, status: fresh ? "current" : "stale", reading: last, culture, digest };
}

export function report(ids = cultureIds(), record = readings()) {
  const rows = ids.map((id) => statusOf(id, record));
  const by = (s) => rows.filter((r) => r.status === s);
  return { rows, never: by("never"), stale: by("stale"), current: by("current") };
}

const isMain = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
if (isMain) {
  const argv = process.argv.slice(2);
  // --touched is what the workflow asks: the reading history of the cultures this
  // pull request wrote, so the comment can say whether anyone has ever answered
  // rather than only asking again.
  if (argv.includes("--touched")) {
    const at = (f) => (argv.includes(f) ? argv[argv.indexOf(f) + 1] : null);
    const ids = touchedCultures(at("--base") ?? "origin/main", at("--head") ?? "HEAD");
    if (!ids.length) process.exit(0);
    const record = readings();
    for (const id of ids) {
      const s = statusOf(id, record);
      if (s.status === "current")
        console.log(
          `\n**\`${id}\` was read** on ${s.reading.read} by ${s.reading.reader}, and the Cues have not moved since.`,
        );
      else if (s.status === "stale")
        console.log(
          `\n**\`${id}\` was last read** on ${s.reading.read} by ${s.reading.reader}, but the Cues have moved since. It owes another reading.`,
        );
      else if (s.status === "never")
        console.log(`\n**\`${id}\` has never been read** by a second reader.`);
      if (s.status !== "current" && s.culture)
        console.log(
          `\nRecord the answer in \`management/readings.json\`:\n\n` +
            "```json\n" +
            `"${id}": [{ "read": "<date>", "reader": "<who>", "plots": ${s.culture.plots.length}, "cues": "${s.digest}", "state": <n>, "says": "<one line>" }]\n` +
            "```\n",
        );
    }
    process.exit(0);
  }
  const one = argv.includes("--culture") ? argv[argv.indexOf("--culture") + 1] : null;
  if (one) {
    const s = statusOf(one);
    console.log(`${s.id}: ${s.status}`);
    if (s.reading)
      console.log(
        `  last read ${s.reading.read} by ${s.reading.reader}` +
          (s.reading.state !== undefined ? `, ${s.reading.state} state of ${s.reading.plots}` : ""),
      );
    if (s.status !== "current" && s.culture)
      console.log(
        `  to read it:  node tests/plot_line_audit.mjs --culture ${s.id}\n` +
          `  then record: { "read": "<date>", "reader": "<who>", "plots": ${s.culture.plots.length}, ` +
          `"cues": "${s.digest}", "state": <n>, "says": "<one line>" }`,
      );
    process.exit(0);
  }
  const r = report();
  console.log(
    `second reader: ${r.current.length} current, ${r.stale.length} stale, ` +
      `${r.never.length} never read, of ${r.rows.length} culture(s)`,
  );
  for (const s of r.stale)
    console.log(
      `  stale   ${s.id} (read ${s.reading.read} by ${s.reading.reader}, the Cues moved)`,
    );
  if (r.never.length)
    console.log(
      `  never   ${r.never.length}: ${r.never
        .slice(0, 12)
        .map((s) => s.id)
        .join(", ")}${r.never.length > 12 ? ", ..." : ""}`,
    );
  console.log("\n  See management/orders/order_a_second_reader.md.");
  process.exit(0);
}
