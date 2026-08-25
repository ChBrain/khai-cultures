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
// The implicit half is prose, and no validator can hold it, but --drift gives the
// reader a list to read against. A position's chapters are Has, Orders, Loses and
// Drives OF THE OFFICE: what the tongue gives whoever holds it, what its grammar
// forces them to mark, what it cannot say, how it shapes the mind that thinks in
// it. Where is not one of the four. A variety may identify itself and name the
// speech community that holds it, since that community is the position's own
// subject; it may not make claims about a culture's institutions, its cast or its
// scenes, because those describe a culture and not a tongue. 99 of the 320
// varieties named their own culture when this was measured, so the list is a
// review queue for the walk and not a gate: each variety is read against the
// mnemonic in the slice that moves it.

import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

export const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
export const TONGUES = join(ROOT, "packages", "khai-cultures-tongues");
const CULTURE_PKG = /@chbrain\/khai-cultures-(?!tongues)/;

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

  for (const file of readdirSync(dir).filter((f) => f.endsWith(".md"))) {
    const text = readFileSync(join(dir, file), "utf8");

    for (const [, target] of text.matchAll(/\]\(([^()\s]+)\)/g)) {
      const clean = target.split("#")[0];
      if (!clean || /^[a-z][a-z0-9+.-]*:/i.test(clean)) continue;
      if (clean.startsWith("../"))
        findings.push(
          `${file}: link escapes the package (${clean}); a tongue reaches back into nothing`,
        );
      else if (CULTURE_PKG.test(clean))
        findings.push(`${file}: link names a culture package (${clean}); the tongues stand alone`);
      else if (!clean.startsWith("@") && !existsSync(join(dir, clean)))
        findings.push(`${file}: broken link (${clean})`);
    }

    if (file.startsWith("position_language_") && !/^language:\s*\S+/m.test(text))
      findings.push(
        `${file}: no \`language:\` of its own; a variety must be self-describing ` +
          `outside the play inheritance it left`,
      );
  }
  return findings;
}

/** Culture names appearing in a variety's chapters: a review queue, not a verdict. */
export function drift({ dir = TONGUES, root = ROOT } = {}) {
  const names = [];
  const culturesDir = join(root, "cultures");
  if (existsSync(culturesDir)) {
    for (const id of readdirSync(culturesDir)) {
      const d = join(culturesDir, id);
      if (!existsSync(join(d, "geo.json"))) continue;
      const play = readdirSync(d).find((f) => f.startsWith("play_"));
      if (!play) continue;
      const m = /^declared:\s*"([^"]+)"/m.exec(readFileSync(join(d, play), "utf8"));
      for (const n of [m?.[1], id.replace(/_/g, " ")]) if (n && n.length > 3) names.push(n);
    }
  }
  const out = [];
  if (!existsSync(dir)) return out;
  for (const file of readdirSync(dir).filter((f) => f.startsWith("position_language_"))) {
    const body = readFileSync(join(dir, file), "utf8").split("## Has")[1] ?? "";
    const hit = names.filter((n) => body.toLowerCase().includes(n.toLowerCase()));
    if (hit.length) out.push({ file, names: [...new Set(hit)] });
  }
  return out;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  if (process.argv.includes("--drift")) {
    const d = drift();
    console.log(`varieties naming a culture in their chapters: ${d.length}`);
    for (const { file, names } of d) console.log(`  ${file}: ${names.join(", ")}`);
    process.exit(0);
  }
  const f = standalone();
  const n = readdirSync(TONGUES).filter((x) => x.startsWith("position_language_")).length;
  console.log(`tongues: ${n} varieties, ${f.length} finding(s)`);
  for (const line of f) console.log(`  ${line}`);
  process.exit(f.length ? 1 : 0);
}
