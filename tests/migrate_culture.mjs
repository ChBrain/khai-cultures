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

/** Engine dependencies every culture needs to be validated as a package. */
function inheritedDeps() {
  const pkg = read(join(HOUSE, "package.json"));
  const out = {};
  for (const [name, range] of Object.entries(pkg.dependencies ?? {}))
    if (name.startsWith("@chbrain/khai-engine-")) out[name] = range;
  return out;
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
  for (const file of mds(dir))
    for (const m of readFileSync(join(dir, file), "utf8").matchAll(/\]\((\.\.\/[^()\s]+)\)/g)) {
      const target = m[1];
      const parts = target.split("/");
      const ok =
        parts.length === 3 && ids.has(parts[1]) && parts[2].startsWith("position_culture_");
      if (!ok)
        out.push(
          `${file} links ${target}, which is not a culture-position and has no package ` +
            `specifier to become. Resolve it before the move: a published production carries no "../".`,
        );
    }
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
  const inbound = [];
  for (const c of cultures()) {
    if (c.id === id) continue;
    for (const file of mds(c.dir)) {
      const path = join(c.dir, file);
      const text = readFileSync(path, "utf8");
      const next = text.replace(
        new RegExp(`\\]\\(\\.\\./${id}/([^()\\s]+)\\)`, "g"),
        (_, tail) => `](${spec}${tail})`,
      );
      if (next !== text) inbound.push([path, next]);
    }
  }

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

  return { id, name, from, to, manifest, rewrites, inbound };
}

function apply(p) {
  execFileSync("git", ["mv", rel(p.from), rel(p.to)], { cwd: WORKSPACE });
  writeFileSync(join(p.to, "package.json"), `${JSON.stringify(p.manifest, null, 2)}\n`);
  for (const licence of ["LICENSE", "LICENSE-CODE"])
    if (existsSync(join(HOUSE, licence))) copyFileSync(join(HOUSE, licence), join(p.to, licence));
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
      const key =
        /links \.\.\/[a-z0-9_]+\/(position_language_[a-z0-9_]+)\.md/.exec(line)?.[1] ??
        (line.startsWith("holds its own language position") ? "its own tongue" : "other");
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
    process.exit(0);
  }
  const id = argv.find((a) => !a.startsWith("-"));
  if (!id) {
    console.error("usage: migrate_culture.mjs <id> [--write]");
    process.exit(2);
  }
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
