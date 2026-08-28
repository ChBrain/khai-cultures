// The tongues stand alone.
//
// A language variety is held by the speech community that speaks it, not by a
// country, and the package must be readable by someone who installed it and
// nothing else. That is a stronger claim than "no broken links": it says the
// tongues never reach back into the cultures that wrote them, in either
// direction, so no culture can quietly become a prerequisite for reading a
// tongue.
//
// What is checkable is the explicit half, and it is checked here without mercy:
// no link escapes the package, no link names a culture package, no culture
// package appears in the manifest (which would also be a cycle once the cultures
// are productions), and every variety carries its own `language:` so it is
// self-describing outside the play inheritance it used to sit under.
//
// "Escapes the package" is resolved, not spelled. While the package was flat, any
// `../` left it and a prefix test was the same thing. It is about to hold a
// directory per language under one root, so a variety linking its own anchor must
// write `../`, and the rule that matters - nothing reaches outside the package -
// is the one that has to be checked. This module walks the package rather than
// listing one directory of it, so it reads the same before and after that move
// and cannot pass by finding nothing.
//
// The implicit half is prose, and no validator can hold it, but --drift gives the
// reader a list to read against. A position's chapters are Has, Orders, Loses and
// Drives OF THE OFFICE: what the tongue gives whoever holds it, what its grammar
// forces them to mark, what it cannot say, how it shapes the mind that thinks in
// it. Where is not one of the four. A variety may identify itself and name the
// speech community that holds it, since that community is the position's own
// subject; it may not make claims about a culture's institutions, its cast or its
// scenes, because those describe a culture and not a tongue. So the list is a
// review queue for the walk and not a gate: each variety is read against the
// mnemonic in the slice that moves it.
//
// A flat list of every mention is no queue, because 99 of the 320 varieties named
// a culture when this was measured and nearly all of them were naming themselves.
// So the queue sorts by how much a mention wants reading: a culture that does not
// cast the variety comes first and is nearly always wrong, a culture that does
// cast it is listed second and is the harder read, since the allowed sentence and
// the forbidden one name the same place.

import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join, dirname, resolve, sep } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

// Two roots, because they are two things. WORKSPACE holds the packages; ROOT is
// the house package whose cultures the drift queue reads against.
export const WORKSPACE = join(dirname(fileURLToPath(import.meta.url)), "..");
export const ROOT = join(WORKSPACE, "packages", "khai-cultures");
export const TONGUES = join(WORKSPACE, "packages", "khai-cultures-tongues");
const CULTURE_PKG = /@chbrain\/khai-cultures-(?!tongues)/;

/** Every markdown file in the package, as a path relative to the package root. */
export function packageFiles(dir = TONGUES) {
  const out = [];
  const walk = (sub) => {
    for (const e of readdirSync(join(dir, sub), { withFileTypes: true })) {
      if (e.name.startsWith(".") || e.name === "node_modules") continue;
      const rel = sub ? `${sub}/${e.name}` : e.name;
      if (e.isDirectory()) walk(rel);
      else if (e.name.endsWith(".md")) out.push(rel);
    }
  };
  walk("");
  return out.sort();
}

/** The varieties: every language position, wherever in the package it sits. */
export const varietyFiles = (dir = TONGUES) =>
  packageFiles(dir).filter((f) => f.split("/").pop().startsWith("position_language_"));

/** Findings for the tongues package. Empty means it stands alone. */
export function standalone({ dir = TONGUES } = {}) {
  const findings = [];
  if (!existsSync(dir)) return findings;

  const pkg = JSON.parse(readFileSync(join(dir, "package.json"), "utf8"));
  for (const field of ["dependencies", "devDependencies", "peerDependencies"]) {
    for (const name of Object.keys(pkg[field] ?? {})) {
      if (CULTURE_PKG.test(name))
        findings.push(
          `package.json: ${field} names "${name}"; the tongues depend on no culture, ` +
            `and after the split that dependency would be a cycle`,
        );
    }
  }

  const root = resolve(dir);
  for (const file of packageFiles(dir)) {
    const text = readFileSync(join(dir, file), "utf8");
    const here = dirname(join(dir, file));

    for (const [, target] of text.matchAll(/\]\(([^()\s]+)\)/g)) {
      const clean = target.split("#")[0];
      if (!clean || /^[a-z][a-z0-9+.-]*:/i.test(clean)) continue;
      if (CULTURE_PKG.test(clean)) {
        findings.push(`${file}: link names a culture package (${clean}); the tongues stand alone`);
        continue;
      }
      if (clean.startsWith("@")) continue;
      const abs = resolve(here, clean);
      if (abs !== root && !abs.startsWith(root + sep))
        findings.push(
          `${file}: link escapes the package (${clean}); a tongue reaches back into nothing`,
        );
      else if (!existsSync(abs)) findings.push(`${file}: broken link (${clean})`);
    }

    if (file.split("/").pop().startsWith("position_language_") && !/^language:\s*\S+/m.test(text))
      findings.push(
        `${file}: no \`language:\` of its own; a variety must be self-describing ` +
          `outside the play inheritance it left`,
      );
  }
  return findings;
}

/** Names a culture answers to: what it declares itself, and its id without the code. */
function cultureNames(root) {
  const out = new Map();
  const culturesDir = join(root, "cultures");
  if (!existsSync(culturesDir)) return out;
  for (const id of readdirSync(culturesDir)) {
    const d = join(culturesDir, id);
    if (!existsSync(join(d, "geo.json"))) continue;
    const play = readdirSync(d).find((f) => f.startsWith("play_"));
    if (!play) continue;
    const code = String(JSON.parse(readFileSync(join(d, "geo.json"), "utf8")).iso ?? "")
      .split("-")[0]
      .toLowerCase();
    const local = code && id.startsWith(`${code}_`) ? id.slice(code.length + 1) : id;
    const declared = /^declared:\s*"([^"]+)"/m.exec(readFileSync(join(d, play), "utf8"))?.[1];
    const seen = new Map();
    for (const n of [declared, local.replace(/_/g, " ")])
      if (n && n.length > 3 && !seen.has(n.toLowerCase())) seen.set(n.toLowerCase(), n);
    if (seen.size) out.set(id, [...seen.values()]);
  }
  return out;
}

/** Cultures that cast a variety, by the package specifier they cast it with. */
function holders(root, files) {
  // Keyed by the path the specifier carries, which is the path inside the package:
  // flat while the package was flat, `de/...` once a language owns a directory.
  const out = new Map(files.map((f) => [f, new Set()]));
  const culturesDir = join(root, "cultures");
  if (!existsSync(culturesDir)) return out;
  for (const id of readdirSync(culturesDir)) {
    const d = join(culturesDir, id);
    if (!existsSync(join(d, "geo.json"))) continue;
    for (const md of readdirSync(d).filter((f) => f.endsWith(".md"))) {
      const text = readFileSync(join(d, md), "utf8");
      for (const f of files)
        if (text.includes(`@chbrain/khai-cultures-tongues/${f}`)) out.get(f).add(id);
    }
  }
  return out;
}

// A leading boundary, and deliberately no trailing one. The leading boundary is
// what kills the substring: the German "weniger" is not the country Niger,
// because a letter stands in front of it. A trailing boundary would kill the
// inflections the mention actually arrives in - "baden-wuerttembergische",
// "saarlaendische", the genitive "Melillas" - and those are the mentions worth
// reading, so the queue takes the noise and keeps them.
const mentions = (body, name) =>
  new RegExp(`(?<![\\p{L}\\p{N}])${name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`, "iu").test(body);

/**
 * Cultures a variety names in its chapters: a review queue, not a verdict, and
 * sorted by how much it wants reading.
 *
 * FOREIGN is a culture that does not cast this variety. The tongue is talking
 * about a stranger's house, and there is almost no sentence for which that is
 * right.
 *
 * HELD is a culture that casts it. That is where the reading is genuinely hard,
 * because both the allowed and the forbidden sentence name the same place: the
 * variety may say which tongue it is and which community holds it, and may not
 * say what that community's schools do. The Tarifit finding lived in this tier,
 * so it is listed rather than excused - it is the second question, not a
 * settled one.
 */
export function drift({ dir = TONGUES, root = ROOT } = {}) {
  const out = [];
  if (!existsSync(dir)) return out;
  const files = varietyFiles(dir);
  const names = cultureNames(root);
  const held = holders(root, files);
  for (const file of files) {
    const body = readFileSync(join(dir, file), "utf8").split("## Has")[1] ?? "";
    const foreign = [];
    const owned = [];
    for (const [id, list] of names) {
      const hit = list.filter((n) => mentions(body, n));
      if (hit.length) (held.get(file).has(id) ? owned : foreign).push(...hit);
    }
    if (foreign.length || owned.length)
      out.push({ file, foreign: [...new Set(foreign)], held: [...new Set(owned)] });
  }
  return out.sort((a, b) => b.foreign.length - a.foreign.length);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  if (process.argv.includes("--drift")) {
    const d = drift();
    const foreign = d.filter((x) => x.foreign.length);
    console.log(
      `varieties naming a culture in their chapters: ${d.length} ` +
        `(${foreign.length} naming a culture that does not cast them)`,
    );
    for (const { file, foreign: f, held } of d) {
      if (f.length) console.log(`  ${file}: FOREIGN ${f.join(", ")}`);
      if (held.length) console.log(`  ${file}: held by ${held.join(", ")}`);
    }
    process.exit(0);
  }
  const f = standalone();
  const n = varietyFiles().length;
  console.log(`tongues: ${n} varieties, ${f.length} finding(s)`);
  for (const line of f) console.log(`  ${line}`);
  process.exit(f.length ? 1 : 0);
}
