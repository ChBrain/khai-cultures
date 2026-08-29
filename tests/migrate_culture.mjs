// Lift one culture out of the umbrella and into its own package.
//
// The move is mechanical and it is fiddly, which is a bad combination for a hand:
// a directory rename, a manifest, a licence pair, the culture's own outbound
// links, every inbound link from the cultures it left behind, and a dependency
// on both ends of each of those. Nine hundred cultures' worth of that, typed, is
// a guarantee of a broken link that no gate sees until a tarball is opened.
//
// So the mechanical half is a script and the judged half is not. This tool
// refuses rather than guesses, and what it refuses is exactly what needs a
// person:
//
//   * a culture still holding its own language positions. The tongue move is a
//     read against the mnemonic (Has / Orders / Loses / Drives OF THE OFFICE),
//     not a file move, and `tongues_standalone.mjs` gates the result. The tool
//     prints the moves and stops.
//   * a `../` link that is not a culture-position. Those 38 links are the
//     sub-national nesting and they map onto a package specifier exactly. A link
//     to a neighbour's place or piece does not: it is either content that should
//     be the culture's own or a dependency somebody has to decide on.
//
// Dry by default. `--write` performs it, and prints the gates to run after.

import { readFileSync, writeFileSync, readdirSync, existsSync, copyFileSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { pathToFileURL } from "node:url";
import { execFileSync } from "node:child_process";
import {
  WORKSPACE,
  HOUSE,
  cultures,
  cultureDir,
  productionName,
  isMigrated,
} from "./culture_sources.mjs";

const rel = (p) => relative(WORKSPACE, p).split(sep).join("/");
const read = (p) => JSON.parse(readFileSync(p, "utf8"));
const mds = (dir) => readdirSync(dir).filter((f) => f.endsWith(".md"));

/**
 * Every directory of the umbrella's referencing collections, e.g. `groups/*`.
 *
 * Read off the manifest rather than typed, because a house that adds a second
 * referencing collection would otherwise get the same twelve broken links the
 * groups got.
 */
function referencingDirs() {
  const pkg = read(join(HOUSE, "package.json"));
  const out = [];
  for (const collection of pkg.khai?.collections ?? []) {
    const dir = join(HOUSE, collection.dir);
    if (!existsSync(dir)) continue;
    for (const e of readdirSync(dir, { withFileTypes: true }))
      if (e.isDirectory() && !e.name.startsWith(".")) out.push(join(dir, e.name));
  }
  return out;
}

/** Engine dependencies every culture needs to be validated as a package. */
function inheritedDeps() {
  const pkg = read(join(HOUSE, "package.json"));
  const out = {};
  for (const [name, range] of Object.entries(pkg.dependencies ?? {}))
    if (name.startsWith("@chbrain/khai-engine-")) out[name] = range;
  return out;
}

/**
 * The wiring guide a production ships.
 *
 * Every package that publishes khai content owes one, and the canon says what it
 * is for: how a production is DRAWN ON, not what it holds. The umbrella's own
 * guide is the house's, written once for two hundred and ninety cultures; a
 * production's is the same law narrowed to the one culture in the box, so an
 * installer who took this package alone still reads the rule that stops them
 * casting somebody else's persona. It is generated rather than hand-kept,
 * because two hundred and ninety hand-kept copies of one rule is two hundred and
 * ninety chances for them to disagree.
 */
function instructions(id, name, position) {
  const title = id.replace(/_/g, " ").replace(/\b[a-z]/g, (c) => c.toUpperCase());
  return `---
khai: instructions
title: "${title}"
license: CC-BY-NC-SA-4.0
stamp:
  owner: KAI HACKS AI
  version: v0.1.0
  date: "${new Date().toISOString().slice(0, 10)}"
---

# Instructions: ${title}

How a Playwright wires this culture into a play. You wire by linking this
package's culture-position from your own content; nothing here is edited. Which
tongue a persona holds is the tongues package's instructions, and how well they
hold it is the language engine's. This covers only which culture they belong to.
Authoring guidance, not runtime content, and it does not go on tour.

## Human

- The human decides that a persona belongs to this culture, and that they may
  belong to more than one. Two belongings are not a contradiction and not a
  second passport: which one answers depends on who is asking.

## Agent

- Declare \`${name}\` as a dependency, then link${
    position ? ` \`${name}/${position}\`` : " this culture's culture-position"
  } from the persona who belongs to it. A relative path resolves in a working tree
  and ships broken; the dependency is the only reference npm can check.

## Collaboration

- What belonging to this culture gives, orders, costs and drives is the
  culture-position's; which tongue the persona holds is the tongues package's;
  the width of their grip on it is the language engine's. A fact belongs to
  exactly one of them.

## Knowledge

- This package is one culture staged as a full khai play: its own plots, its own
  cast, its own pitch, anchored by \`${id}\`'s play. You wire to its position,
  never into its production. A culture's cast is cast in its own scenes and
  answers to its own key; borrowed into yours it would answer to neither.

## System

- Do link the culture-position, and link the positions of any other cultures the
  persona belongs to as well.
- Do let this position carry whatever culture it nests in; linking both says the
  same thing twice.
- Do not link this culture's plots, personas, pieces, places or processes. They
  belong to the play that stages them.
- Do not restate in your persona what the culture-position already says; carry
  only what is that person's.
- Do not edit this package's files; wire only from the play's side.
`;
}

/** What stands between this culture and its own package. */
export function blockers(id) {
  const dir = cultureDir(id);
  const out = [];
  if (!dir) return [`no culture "${id}" in this house`];
  if (isMigrated(id)) return [`"${id}" is already a package`];

  const own = readdirSync(dir).filter((f) => f.startsWith("position_language_"));
  if (own.length)
    out.push(
      `holds its own language position(s): ${own.join(", ")}. The tongue moves first, into ` +
        `packages/khai-cultures-tongues/<lang>/, read against the mnemonic and rebuilt with ` +
        `\`node packages/khai-cultures-tongues/build.mjs --write\`. A tongue is held by the ` +
        `speech community, not by the culture that happened to write it down.`,
    );

  const ids = new Set(cultures().map((c) => c.id));
  const waiting = new Set();
  for (const file of mds(dir))
    for (const m of readFileSync(join(dir, file), "utf8").matchAll(/\]\((\.\.\/[^()\s]+)\)/g)) {
      const target = m[1];
      const parts = target.split("/");
      const ok =
        parts.length === 3 && ids.has(parts[1]) && parts[2].startsWith("position_culture_");
      if (!ok) {
        out.push(
          `${file} links ${target}, which is not a culture-position and has no package ` +
            `specifier to become. Resolve it before the move: a published production carries no "../".`,
        );
        continue;
      }
      // A culture-position link becomes a package specifier, and a specifier is
      // only a reference if the package is there. The first dry run wrote
      // `@chbrain/khai-cultures-usa` into a manifest while usa was still a
      // directory under the umbrella: declared, unresolvable, and caught only by
      // the production gate afterwards. THE PARENT GOES FIRST.
      if (!isMigrated(parts[1])) waiting.add(parts[1]);
    }
  for (const parent of [...waiting].sort())
    out.push(
      `nests in "${parent}", which is not a package yet. A culture-position link becomes a ` +
        `package specifier and a specifier needs a package: migrate ${parent} first.`,
    );
  return out;
}

/** The plan: every file this migration writes, and what it writes there. */
export function plan(id) {
  const from = cultureDir(id);
  const name = productionName(id);
  const to = join(WORKSPACE, "packages", name.split("/")[1]);
  const spec = `${name}/`;

  // The culture's own outbound links become specifiers.
  const rewrites = [];
  const deps = { ...inheritedDeps() };
  for (const file of mds(from)) {
    const text = readFileSync(join(from, file), "utf8");
    let next = text;
    for (const m of text.matchAll(/\]\((\.\.\/([a-z0-9_]+)\/([^()\s]+))\)/g)) {
      const dep = productionName(m[2]);
      next = next.split(`](${m[1]})`).join(`](${dep}/${m[3]})`);
      deps[dep] = "^0.1.0";
    }
    if (/@chbrain\/khai-cultures-tongues\//.test(next)) {
      const range = read(join(HOUSE, "package.json")).dependencies?.[
        "@chbrain/khai-cultures-tongues"
      ];
      if (range) deps["@chbrain/khai-cultures-tongues"] = range;
    }
    if (next !== text) rewrites.push([join(to, file), next]);
  }

  // Everyone who linked into it now links the package. Cultures still under the
  // umbrella resolve that specifier through the umbrella's own dependency, which
  // is why the umbrella gains one whether or not it kept any files.
  //
  // EVERYONE means the groups too. They were missed on the first real migration
  // and it cost twelve broken links: a group is a referencing collection, it
  // reaches a culture from one directory deeper (`../../cultures/<id>/...`), and
  // nothing that only walked the cultures could see it. So both depths are
  // rewritten, and the pattern that finds them is fixed rather than built out of
  // the id, which would be a regex assembled from an argument.
  const inbound = [];
  const rewrite = (path) => {
    const text = readFileSync(path, "utf8");
    let next = text;
    for (const m of text.matchAll(/\]\((?:\.\.\/)+(?:cultures\/)?([a-z0-9_]+)\/([^()\s]+)\)/g))
      if (m[1] === id) next = next.split(m[0]).join(`](${spec}${m[2]})`);
    if (next !== text) inbound.push([path, next]);
  };
  for (const c of cultures()) {
    if (c.id === id) continue;
    for (const file of mds(c.dir)) rewrite(join(c.dir, file));
  }
  for (const dir of referencingDirs()) for (const file of mds(dir)) rewrite(join(dir, file));

  const manifest = {
    name,
    version: "0.1.0",
    description: `khai cultures: ${id}, one culture staged as a khai play.`,
    license: "SEE LICENSE IN LICENSE and LICENSE-CODE",
    repository: read(join(HOUSE, "package.json")).repository,
    type: "module",
    files: ["*.md", "geo.json", "coverage-waivers.json", "LICENSE", "LICENSE-CODE"],
    khai: {
      class: "house",
      production: id,
      anchor: readdirSync(from).find((f) => f.startsWith("play_")),
    },
    publishConfig: { registry: "https://npm.pkg.github.com", access: "public" },
    dependencies: Object.fromEntries(Object.entries(deps).sort()),
  };

  const position = readdirSync(from).find((f) => f.startsWith("position_culture_"));
  return {
    id,
    name,
    from,
    to,
    manifest,
    rewrites,
    inbound,
    guide: instructions(id, name, position),
  };
}

function apply(p) {
  execFileSync("git", ["mv", rel(p.from), rel(p.to)], { cwd: WORKSPACE });
  writeFileSync(join(p.to, "package.json"), `${JSON.stringify(p.manifest, null, 2)}\n`);
  for (const licence of ["LICENSE", "LICENSE-CODE"])
    if (existsSync(join(HOUSE, licence))) copyFileSync(join(HOUSE, licence), join(p.to, licence));
  writeFileSync(join(p.to, "playwright_instructions.md"), p.guide);
  for (const [path, text] of [...p.rewrites, ...p.inbound]) writeFileSync(path, text);

  // The umbrella keeps the reference it no longer keeps the files for.
  const pkgPath = join(HOUSE, "package.json");
  const pkg = read(pkgPath);
  pkg.dependencies = Object.fromEntries(
    Object.entries({ ...pkg.dependencies, [p.name]: "^0.1.0" }).sort(),
  );
  writeFileSync(pkgPath, `${JSON.stringify(pkg, null, 2)}\n`);
}

/**
 * The whole house, by what is standing in its way.
 *
 * Worth printing before planning a wave. The blocking set is not the fan-in
 * ordering the design expected: it is whatever tongues the touched culture's
 * personas reach for, and a culture with one foreign-speaking persona is held by
 * a variety ninety-four other cultures also hold.
 */
export function queue() {
  const ready = [];
  const held = new Map();
  for (const c of cultures()) {
    if (c.migrated) continue;
    const stop = blockers(c.id);
    if (!stop.length) {
      ready.push(c.id);
      continue;
    }
    for (const line of stop) {
      const nests = /^nests in "([a-z0-9_]+)"/.exec(line)?.[1];
      const key =
        /links \.\.\/[a-z0-9_]+\/(position_language_[a-z0-9_]+)\.md/.exec(line)?.[1] ??
        (nests
          ? `its parent ${nests}`
          : line.startsWith("holds its own language position")
            ? "its own tongue"
            : "other");
      if (!held.has(key)) held.set(key, new Set());
      held.get(key).add(c.id);
    }
  }
  return { ready, held: [...held].sort((a, b) => b[1].size - a[1].size) };
}

const isMain = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
if (isMain) {
  const argv = process.argv.slice(2);
  if (argv.includes("--queue")) {
    const { ready, held } = queue();
    console.log(`ready to migrate: ${ready.length}`);
    for (const id of ready) console.log(`  ${id}`);
    console.log(`\nheld, by what holds them:`);
    for (const [what, ids] of held) console.log(`  ${String(ids.size).padStart(3)}  ${what}`);
    // The queue is a planning instrument and this is the line worth planning on:
    // a culture held by one thing is one move from being ready.
    const one = [];
    for (const c of cultures()) {
      if (c.migrated) continue;
      const stop = blockers(c.id);
      if (stop.length === 1) one.push([c.id, stop[0].split(",")[0].split(".")[0]]);
    }
    console.log(`\none move away: ${one.length}`);
    process.exit(0);
  }
  const asked = argv.find((a) => !a.startsWith("-"));
  if (!asked) {
    console.error("usage: migrate_culture.mjs <id> [--write]");
    process.exit(2);
  }
  // The argument selects a culture; it never becomes one. Everything below uses
  // the id off the discovered record, so no path this tool renames, no file it
  // writes and no argument it hands `git` was ever assembled out of what
  // somebody typed.
  const found = cultures().find((c) => c.id === asked);
  if (!found) {
    console.error(`no culture "${asked}" in this house`);
    process.exit(1);
  }
  const id = found.id;
  const stop = blockers(id);
  if (stop.length) {
    console.error(`${id} cannot migrate yet:`);
    for (const line of stop) console.error(`  - ${line}`);
    process.exit(1);
  }
  const p = plan(id);
  console.log(`${p.id} -> ${p.name}`);
  console.log(`  move    ${rel(p.from)} -> ${rel(p.to)}`);
  console.log(`  depends ${Object.keys(p.manifest.dependencies).join(", ") || "(nothing)"}`);
  console.log(`  rewrite ${p.rewrites.length} own link file(s), ${p.inbound.length} inbound`);
  if (!argv.includes("--write")) {
    console.log("\n  dry run. Pass --write to perform it.");
    process.exit(0);
  }
  apply(p);
  console.log("\n  done. Now:");
  console.log("    npm install --package-lock-only");
  console.log("    npx khai-tests registry build packages/khai-cultures");
  console.log("    node tests/registry_hybrid.mjs --write");
  console.log("    node tests/production_packages.mjs --report");
  console.log(`    node tests/company_coverage.mjs --culture ${p.id}`);
  console.log("    npm run format && npm test");
}
