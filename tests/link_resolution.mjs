// Every address a unit writes must resolve for whoever installs it.
//
// The house has two walls about links and there is a hole between them, and a
// second hole underneath both.
//
// `isolationErrors` (the kit, run by the conformance wall) asks whether a
// relative link ESCAPES its unit, and it enumerates through `unitsOf`, which
// keys a migrated group by its npm name and so does cover the five group
// PACKAGES. It does not cover the sixteen groups still under the umbrella:
// `unitsOf` answers 324 units on this house and not one of them is `eu`, `nato`,
// `benelux`, `iberia` or `visegrad`. `validateProductionPackage` asks the escape
// question again and adds the one that bites, whether a cast specifier is
// declared - but it runs over `productions()`, which filters on `khai.production`
// and a group declares `khai.group`, so no group answers to it at all. Measured
// by injecting the same broken link twice: a culture package reports two
// findings, a group package reports none.
//
// UNDERNEATH BOTH, unasked by either: does the address point at anything.
//
// WHAT FELL THROUGH. #602 moved `the_four_nations` out of the umbrella. Another
// group, `these_islands`, still under the umbrella, held
// `[the Four Nations](../the_four_nations/...)`. The migration's inbound rewrite
// did not match it, the link pointed at an emptied directory, and it stayed
// broken across two pull requests with twelve walls green over it: the umbrella
// group was outside isolation's reach, and nothing anywhere asks whether a link
// resolves. It was found by reading, which is not a wall.
//
// THREE FACTS, ONE SENTENCE. An address resolves; a packaged unit carries no
// `../`; a cast specifier is declared. They are one rule read at three ranges -
// on disk, at publish, and at install - and they are held together because a
// link that fails any of them is broken for the same person, the one who
// installed the package and is not standing in this workspace.
//
// A NAME IS NOT AN ADDRESS. `](process_speaking_mother_tongue.md)` is a name the
// house resolves by convention: it names a process the language engine ships,
// and 17 such names appear across the cultures. So a bare link is held to
// resolving in the unit's own directory OR in a package that unit declares -
// checked against the engine, never assumed. What that rule catches is the case
// nobody would call a convention: three bare `plot_*` links, in `arizona` and
// `fr_brittany`, left behind when a chronology was renumbered and REFERENCES was
// not. A plot always lives in its own culture. Those are dead links, one of them
// inside a published package.
//
// WHY THIS IS A RATCHET AND NOT ABSOLUTE. `staging` is absolute because it
// started clean; `group-ratchet` is a ratchet because it started at seventy.
// This starts at three, which sounds absolute until you price them: `arizona`
// carries two dead Company elements, so repairing its two links AUTHORS it and
// charges it for both, and a wall that cannot be made green without unrelated
// content work is a wall that gets bypassed. So it reports the whole house and
// blocks on what a change is answerable for.
//
// AND IT BLOCKS ON ONE THING MORE THAN THE UNIT YOU WROTE IN. A ratchet scoped
// to authored units would not have caught #602 either: that change authored
// `the_four_nations` and broke `these_islands`, which it never touched. So a
// unit is also charged when a link of its own points at a path THIS CHANGE
// removed or moved away. That is the whole failure, stated as a rule, and it is
// computable from the same `--name-status -M` every ratchet here already reads.

import { execFileSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, relative, resolve, sep } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { resolveHouse, unitsOf } from "@chbrain/khai-tests";
import { groups } from "./group_coverage.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const WORKSPACE = join(HERE, "..");
const rel = (p) => relative(WORKSPACE, p).split(sep).join("/");

/**
 * Every package a specifier in this house can name, by its npm name.
 *
 * Both homes, and the workspace wins. `packages/*` holds what this repository
 * writes; `node_modules/@scope/*` holds what it depends on, and the engines a
 * culture casts - `@chbrain/khai-engine-language` above all - are only ever
 * there. A resolver that read one of the two would call every engine process in
 * the house a broken link.
 */
export function packagesByName(workspace = WORKSPACE) {
  const out = new Map();
  const take = (dir) => {
    const manifest = join(dir, "package.json");
    if (!existsSync(manifest)) return;
    const pkg = JSON.parse(readFileSync(manifest, "utf8"));
    if (pkg.name && !out.has(pkg.name)) out.set(pkg.name, { dir, pkg });
  };
  const scoped = join(workspace, "node_modules", "@chbrain");
  if (existsSync(scoped))
    for (const e of readdirSync(scoped, { withFileTypes: true }))
      if (e.isDirectory() || e.isSymbolicLink()) take(join(scoped, e.name));
  const own = join(workspace, "packages");
  if (existsSync(own))
    for (const e of readdirSync(own, { withFileTypes: true }))
      if (e.isDirectory()) {
        const manifest = join(own, e.name, "package.json");
        if (!existsSync(manifest)) continue;
        const pkg = JSON.parse(readFileSync(manifest, "utf8"));
        if (pkg.name) out.set(pkg.name, { dir: join(own, e.name), pkg });
      }
  return out;
}

/**
 * Every unit in the house, cultures and groups alike: `{ id, dir, pkg }`, where
 * `pkg` is the manifest when the unit ships as a package of its own and null
 * when it still lives inside the umbrella.
 *
 * `unitsOf` is asked first and answers for the cultures and for the five group
 * packages, which it keys by npm name; `groups()` is asked for the groups and
 * answers for both homes. The overlap is dropped by directory, so a migrated
 * group is one unit and not two, and the sixteen umbrella groups - which
 * `unitsOf` does not know at all - arrive from `groups()` alone.
 */
export function units(workspace = WORKSPACE) {
  const house = resolveHouse(workspace, { name: "@chbrain/khai-cultures" });
  const out = unitsOf(house).map((u) => ({ id: u.id, dir: u.dir }));
  const seen = new Set(out.map((u) => u.dir));
  for (const g of groups()) if (!seen.has(g.dir)) out.push({ id: g.id, dir: g.dir });
  for (const u of out) {
    const manifest = join(u.dir, "package.json");
    u.pkg = existsSync(manifest) ? JSON.parse(readFileSync(manifest, "utf8")) : null;
  }
  return out.sort((a, b) => a.id.localeCompare(b.id));
}

const mds = (dir) =>
  existsSync(dir) && statSync(dir).isDirectory()
    ? readdirSync(dir)
        .filter((f) => f.endsWith(".md"))
        .sort()
    : [];

/** Every markdown link in a file, anchors stripped, URLs dropped. */
export function addresses(text) {
  const out = [];
  for (const [, raw] of text.matchAll(/\]\(([^()\s]+)\)/g)) {
    const target = raw.split("#")[0];
    if (!target) continue;
    if (/^[a-z][a-z0-9+.-]*:/i.test(target)) continue;
    out.push(target);
  }
  return out;
}

/** The declared dependencies of a unit, or of the umbrella it still lives in. */
function reachable(unit, byName) {
  const own = unit.pkg ?? byName.get("@chbrain/khai-cultures")?.pkg;
  return Object.keys(own?.dependencies ?? {});
}

/**
 * What one unit's addresses owe. Each finding is a link that is broken for
 * somebody, and each says for whom.
 */
export function findings(unit, byName = packagesByName()) {
  const out = [];
  const deps = new Set(reachable(unit, byName));
  for (const file of mds(unit.dir)) {
    const here = unit.dir;
    for (const target of addresses(readFileSync(join(here, file), "utf8"))) {
      // 1. A package specifier: `@scope/name/rest`.
      if (target.startsWith("@")) {
        const parts = target.split("/");
        const name = parts.slice(0, 2).join("/");
        const rest = parts.slice(2).join("/");
        const hit = byName.get(name);
        if (!hit) {
          out.push(`${file}: casts "${target}", and no package in this workspace is named ${name}`);
          continue;
        }
        if (rest && !existsSync(join(hit.dir, rest)))
          out.push(`${file}: casts "${target}", and ${name} ships no ${rest}`);
        if (unit.pkg && !deps.has(name))
          out.push(
            `${file}: casts "${target}" and ${unit.pkg.name} does not depend on ${name} -- ` +
              `a workspace resolves it either way and an install does not`,
          );
        continue;
      }
      // 2. An address: anything carrying a separator is a path and must resolve.
      const abs = resolve(here, target);
      if (target.includes("/")) {
        if (unit.pkg && abs !== unit.dir && !abs.startsWith(unit.dir + sep))
          out.push(
            `${file}: "${target}" escapes the package -- a published unit carries no "../"; ` +
              `reach the neighbour by package specifier and declare it`,
          );
        if (!existsSync(abs)) out.push(`${file}: "${target}" resolves to nothing`);
        continue;
      }
      // 3. A bare name: the unit's own file, or one an engine it declares ships.
      if (existsSync(abs)) continue;
      const provider = [...deps].find((d) => {
        const hit = byName.get(d);
        return hit && existsSync(join(hit.dir, target));
      });
      if (!provider)
        out.push(
          `${file}: "${target}" is neither a file here nor one any declared dependency ships`,
        );
    }
  }
  return out.sort();
}

/** The whole house, unit by unit. */
export function report(list = units()) {
  const byName = packagesByName();
  return list
    .map((u) => [u.id, findings(u, byName)])
    .filter(([, f]) => f.length)
    .sort((a, b) => a[0].localeCompare(b[0]));
}

/**
 * What a diff range is answerable for: the units it wrote in, and the units
 * whose ground it moved out from under.
 *
 * The second half is the one that matters and the one a plain ratchet misses. A
 * change that MOVES or DELETES a path can break a link in a unit it never
 * opened, which is exactly how #602 broke `these_islands` while authoring
 * `the_four_nations`. So every removed path is collected, and any unit holding a
 * link that resolves onto one is charged alongside the units actually written.
 */
export function charged(base, head, list = units()) {
  const lines = execFileSync("git", ["diff", "--name-status", "-M", base, head], {
    encoding: "utf8",
    maxBuffer: 32 * 1024 * 1024,
  })
    .split("\n")
    .filter(Boolean);
  const touched = new Set();
  const removed = new Set();
  for (const line of lines) {
    const parts = line.split("\t");
    const status = parts[0];
    if (status.startsWith("R")) {
      removed.add(parts[1]);
      touched.add(parts[2]);
    } else if (status === "D") {
      removed.add(parts[1]);
    } else {
      touched.add(parts[1]);
    }
  }
  const unitOf = (p) => {
    const abs = resolve(WORKSPACE, p);
    return list.find((u) => abs === u.dir || abs.startsWith(u.dir + sep))?.id ?? null;
  };
  const written = new Set([...touched].map(unitOf).filter(Boolean));
  return {
    written: [...written].sort(),
    undermined: underminedBy(removed, list, written),
  };
}

/**
 * Which units hold a link that lands on one of these removed paths.
 *
 * Kept apart from the git read so it can be held to a fixture: the failure it
 * describes - a change breaking a unit it never opened - is the one thing here
 * worth a test, and a test that has to reconstruct a historical worktree to
 * reach it would be testing git.
 */
export function underminedBy(removed, list, skip = new Set()) {
  const set = removed instanceof Set ? removed : new Set(removed);
  const out = new Set();
  for (const u of list) {
    if (skip.has(u.id)) continue;
    for (const file of mds(u.dir))
      for (const target of addresses(readFileSync(join(u.dir, file), "utf8"))) {
        if (target.startsWith("@") || !target.includes("/")) continue;
        if (set.has(rel(resolve(u.dir, target)))) out.add(u.id);
      }
  }
  return [...out].sort();
}

function gate(base, head) {
  const list = units();
  const { written, undermined } = charged(base, head, list);
  if (undermined.length)
    console.log(
      `  ${undermined.length} unit(s) are charged because this change moved ground they ` +
        `link onto: ${undermined.join(", ")}`,
    );
  const scope = new Set([...written, ...undermined]);
  if (!scope.size) {
    console.log("Links: no unit written and no ground moved.");
    return 0;
  }
  const byName = packagesByName();
  const offenders = list
    .filter((u) => scope.has(u.id))
    .map((u) => [u.id, findings(u, byName)])
    .filter(([, f]) => f.length);
  if (!offenders.length) {
    console.log(`Links OK: ${scope.size} unit(s) answerable, every address resolves.`);
    return 0;
  }
  console.error("::error::Links: an address a unit writes must resolve for whoever installs it.");
  for (const [id, f] of offenders) {
    console.error(`  ${id}: ${f.length} finding(s)`);
    for (const line of f) console.error(`    ${line}`);
  }
  console.error(
    '\n  A link resolves on disk, a packaged unit carries no "../", and a cast specifier\n' +
      "  is a declared dependency. A unit is charged for the links you wrote and for the\n" +
      "  links your move broke under it: the pull request that carried the edit carries\n" +
      "  the move. See management/orders/order_the_migration_ratchet.md.",
  );
  return 1;
}

const isMain = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
const argv = isMain ? process.argv.slice(2) : [];
if (isMain && argv.includes("--gate")) {
  const base = argv[argv.indexOf("--base") + 1];
  const head = argv[argv.indexOf("--head") + 1];
  if (!base || !head) {
    console.error("usage: link_resolution.mjs --gate --base <sha> --head <sha>");
    process.exit(2);
  }
  process.exit(gate(base, head));
} else if (isMain) {
  const rows = report();
  const n = rows.reduce((a, [, f]) => a + f.length, 0);
  console.log(`links: ${rows.length} unit(s) owing, ${n} finding(s)`);
  for (const [id, f] of rows) {
    console.log(`  ${id}: ${f.length} finding(s)`);
    for (const line of f) console.log(`    ${line}`);
  }
  process.exit(0);
}
