// Where the cultures live.
//
// A culture used to live in exactly one place, `packages/khai-cultures/cultures/
// <id>/`, and every gate in this repository wrote that path out for itself. It
// is now two places, because a touched culture migrates into its own production
// package (`management/orders/order_the_migration_ratchet.md`), and during the
// walk the house is a hybrid: some cultures are directories under the umbrella,
// some are packages beside it, and both are cultures.
//
// WHY THIS FILE EXISTS AT ALL. The last time a culture's path moved, three
// ratchets went quiet instead of red. `touchedCultures` matched a literal prefix
// that no longer existed, so every culture pull request for weeks reported "no
// culture touched" and passed by reading nothing (#430). The migration moves the
// path again, one culture at a time, which is the same failure spread over
// months and even harder to notice: a gate that still sees 289 of 290 looks
// exactly like a gate that sees all of them.
//
// So there is one resolver and every reader goes through it. A move updates this
// file; nothing else has an opinion about where a culture sits. And every list it
// returns refuses to be empty, because a resolver that has lost the house must go
// red rather than green.
//
// THIS FILE IS NOW A THIN ADAPTER. Finding a house by the manifest that
// declares it, and walking its units, is the kit's (`resolveHouse`, `unitsOf`
// in `@chbrain/khai-tests`); so is the relink RULE itself, whether one changed
// file's whole difference is a rewritten link target rather than authoring
// (`defaultRelink`) - because two implementations of one rule diverge, and this
// house's was the first draft of what the kit now carries for every khai house.
// What stays here is what is true of THIS house and nowhere else: the shape a
// caller gets back (`{id, dir, migrated, packageName, packageDir}`, not the
// kit's bare `{id, dir}`), the culture-specific error wording callers and tests
// are pinned to, and `authoredCultures`'s per-FILE grouping - the kit's own
// `touchedUnits` only ever answers "was this unit authored" as a whole and
// hands back a unit's entire changed-file list either way, which is not enough
// for a caller (plot_zero.mjs's gate) asking whether the PLOT files specifically
// were authored, so that grouping is walked here, over the kit's relink rule.
//
// WHAT MAKES A DIRECTORY A CULTURE. Under the umbrella, being a subdirectory of
// `cultures/` is enough - that is the collection khai-tests counts. Beside it, a
// package is a culture when its manifest declares the production layer:
// `khai.class === "house"` with a `khai.production` id. Not the directory name,
// which is the npm name and carries hyphens where an id carries underscores, and
// not a glob over `packages/*`, which would count the umbrella and the tongues.
// The manifest says what a package is; `resolveHouse` only reads it.

import { existsSync, readFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { join, dirname, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { resolveHouse, unitsOf, defaultRelink } from "@chbrain/khai-tests";

const HERE = dirname(fileURLToPath(import.meta.url));

/** The workspace container: holds the tooling, publishes nothing. */
export const WORKSPACE = join(HERE, "..");
/** The umbrella package: the cultures not yet migrated live under it. */
export const HOUSE = join(WORKSPACE, "packages", "khai-cultures");
/** The workspace's package directory. */
export const PACKAGES = join(WORKSPACE, "packages");

/** The production layer's class, as khai-arch names it. */
export const PRODUCTION_CLASS = "house";

/** The declaring package name `resolveHouse` picks the umbrella out by, among
 * every workspace package (the tongues package indexes its own collection too,
 * and would otherwise be a second, ambiguous candidate). */
const HOUSE_NAME = "@chbrain/khai-cultures";

// Relative to the workspace being asked about, which is not always this one:
// the migration pin builds a synthetic workspace in a scratch directory, and a
// resolver that quietly measured against its own would pass that test while
// proving nothing.
const rel = (p, workspace = WORKSPACE) => relative(workspace, p).split(sep).join("/");

/** The umbrella's own collection directory, derived rather than typed. */
export const MONOLITH_DIR = join(HOUSE, "cultures");

function manifest(dir) {
  const path = join(dir, "package.json");
  if (!existsSync(path)) return null;
  try {
    return JSON.parse(readFileSync(path, "utf8"));
  } catch {
    return null;
  }
}

/**
 * The kit's house at `workspace`, or null when it finds none.
 *
 * `resolveHouse` throws on a workspace with no manifest declaring
 * `khai.collection` (a scratch fixture with no package.json at all, or one that
 * has not yet written the field), and its message is about the kit's own
 * vocabulary. This house's callers - and the tests pinned to them - read a
 * house-specific one instead ({@link cultures}'s "pass by reading nothing"),
 * so the kit's error is caught here and never surfaced directly.
 */
function findHouse(workspace) {
  try {
    return resolveHouse(workspace, { name: HOUSE_NAME });
  } catch {
    return null;
  }
}

/** `house.productions`, filtered and shaped to this file's own contract: an id
 * (never the npm name, which carries hyphens where an id carries underscores),
 * and only a package that actually declares one - a package on `khai.class
 * "house"` with no `khai.production` is not yet a production this house
 * recognizes, whatever `resolveHouse` itself would fall back to. Internal: both
 * exported readers below build on one `findHouse` call rather than each other,
 * so a caller asking for the whole house (`cultures`) or one path in it
 * (`pathCulture`) does not resolve it twice. */
function productionsOf(house) {
  if (!house) return [];
  return house.productions
    .filter((p) => p.pkg?.khai?.production)
    .map((p) => ({
      id: String(p.pkg.khai.production),
      name: p.name,
      dir: p.dir,
      anchor: p.pkg.khai.anchor,
      pkg: p.pkg,
    }))
    .sort((a, b) => a.id.localeCompare(b.id));
}

/**
 * Every culture that has been lifted into its own package.
 *
 * Empty is a legitimate answer here and only here: before the first migration
 * there are none, and the walk starts somewhere.
 */
export function productions(workspace = WORKSPACE) {
  return productionsOf(findHouse(workspace));
}

/**
 * Every culture in the house, wherever it lives, as
 * `{ id, dir, migrated, packageName, packageDir }`.
 *
 * Refuses to be empty. A house with no cultures is a resolver that has lost the
 * house, not a house that is empty, and a check reading this list would
 * otherwise pass by reading nothing.
 */
export function cultures(workspace = WORKSPACE) {
  const houseDir = join(workspace, "packages", "khai-cultures");
  const fail = () => {
    throw new Error(
      `no cultures found under ${rel(join(workspace, "packages"), workspace)}: ` +
        `neither ${rel(join(houseDir, "cultures"), workspace)}/* nor a package declaring ` +
        `khai.class "${PRODUCTION_CLASS}". The content root is wrong, and a check ` +
        `reading it would pass by reading nothing.`,
    );
  };
  const house = findHouse(workspace);
  if (!house) fail();

  const units = unitsOf(house); // throws its own "two places at once" on a real duplicate
  if (!units.length) fail();

  const prods = new Map(productionsOf(house).map((p) => [p.id, p]));
  const housePkgName = manifest(house.packageDir)?.name;
  const out = units.map((u) => {
    const p = prods.get(u.id);
    return p
      ? { id: u.id, dir: u.dir, migrated: true, packageName: p.name, packageDir: p.dir }
      : {
          id: u.id,
          dir: u.dir,
          migrated: false,
          packageName: housePkgName,
          packageDir: house.packageDir,
        };
  });
  return out.sort((a, b) => a.id.localeCompare(b.id));
}

/** Every culture id, migrated or not. */
export function cultureIds(workspace = WORKSPACE) {
  return cultures(workspace).map((c) => c.id);
}

/** One culture's directory, wherever it lives. Null for an id the house has not got. */
export function cultureDir(id, workspace = WORKSPACE) {
  return cultures(workspace).find((c) => c.id === id)?.dir ?? null;
}

/** Whether a culture has been lifted into its own package. */
export function isMigrated(id, workspace = WORKSPACE) {
  return Boolean(cultures(workspace).find((c) => c.id === id)?.migrated);
}

/**
 * The culture a repository-relative path belongs to, and the file within it.
 *
 * The one place that knows the shape of both homes. Returns
 * `{ id, file, migrated }` or null. `file` is the path below the culture's
 * directory, so a caller asking "did this touch a plot" reads it rather than
 * splitting the path again.
 */
export function pathCulture(p, workspace = WORKSPACE) {
  const s = String(p).trim().replace(/\\/g, "/");
  // The monolith branch is a STRING match on the path's own shape, never a
  // listing of `cultures/` - deliberately, and kept local rather than read off
  // `unitsOf` (which does list it). A migration's own diff carries the culture's
  // OLD path on the delete/rename side after the directory it named has already
  // gone empty on disk (`git mv` moves the file, not the now-empty parent), so a
  // check keyed on "does this directory currently exist" would call that leg of
  // a migrating culture's own rename unowned - and worse, an emptied monolith
  // directory a migration has not yet finished cleaning up would collide with
  // the production package claiming the same id, which is `unitsOf`'s "two
  // places at once" and not a real duplicate at all. Parsing the id out of the
  // path's own shape has neither failure mode: it does not care whether
  // anything is still there.
  const monolithPrefix = `${rel(join(workspace, "packages", "khai-cultures", "cultures"), workspace)}/`;
  if (s.startsWith(monolithPrefix)) {
    const rest = s.slice(monolithPrefix.length);
    const slash = rest.indexOf("/");
    if (slash < 1) return null;
    return { id: rest.slice(0, slash), file: rest.slice(slash + 1), migrated: false };
  }
  for (const prod of productions(workspace)) {
    const prefix = `${rel(prod.dir, workspace)}/`;
    if (s.startsWith(prefix)) {
      const file = s.slice(prefix.length);
      if (!file) return null;
      return { id: prod.id, file, migrated: true };
    }
  }
  return null;
}

/**
 * A culture somebody WROTE IN, as opposed to one a rewrite passed through.
 *
 * The content ratchets fire on the cultures a pull request touches, and that was
 * the right rule while every change to a culture was somebody writing in it. The
 * tongue walk breaks it. Moving one variety into the tongues package rewrites the
 * link in every culture that casts it - `en_gb` alone is ninety-four - and under
 * a plain touch rule each of those ninety-four is then asked for zero dead
 * Company entries, a conforming id and a nesting link it never owed. Twenty-one
 * were asked on the day this was written, and the answer would have been either a
 * pull request that renames Illinois and invents scenes in Turkey and Ukraine to
 * satisfy a counter - which this house forbids in as many words - or no tongue
 * walk at all.
 *
 * So the ratchets ask this instead, and the rule is decidable and narrow: a
 * culture is AUTHORED when any of its changed files differs in something other
 * than the target of a markdown link. Rewrite `](../germany/x.md)` to
 * `](@scope/pkg/x.md)` and the culture is untouched by the ratchets; change one
 * word of prose in the same file and it is authored, and owes everything it owed
 * before. Adding a file, deleting one, or renaming one is authoring too: only a
 * link's destination is exempt, because only a link's destination is something
 * the walk moves out from under a culture that had no part in it.
 *
 * This is the ratchet's own stated intent and not a softening of it: nobody is
 * asked to pay for a culture they did not open, and the debt still only shrinks.
 * What is exempted is printed, never silent.
 *
 * The comparison itself - packaging judged before existence, a moved-but-
 * unchanged file spared before the markdown gate, only markdown getting the
 * link exemption - is now `@chbrain/khai-tests`' `defaultRelink`, byte-identical
 * to what this house wrote first: same `PACKAGING` set (`package.json`,
 * `LICENSE`, `LICENSE-CODE`), same blind-link comparison. This function stays
 * only to accept the shape callers already pass it: a bare path (both sides the
 * same) as well as a `{from, to}` pair.
 */
export function relinkOnly(change, base, head, workspace = WORKSPACE) {
  const pair = typeof change === "string" ? { from: change, to: change } : change;
  return defaultRelink(pair, base, head, workspace);
}

/** Every path a diff range touches, as `{from, to}` pairs with renames resolved.
 * Kept local rather than read off `touchedUnits`: that function groups by unit
 * and reports a unit's WHOLE changed-file list regardless of which of those
 * files the relink rule exempts, because its own callers only ever ask
 * "was this unit authored" (a boolean). This house's callers ask a finer
 * question - plot_zero.mjs's gate reads `authored.get(id)` for the PLOT and PLAY
 * files specifically, to tell "the plot line was authored" from "something else
 * in this culture was, and a link inside a plot happened to get rewritten" -
 * so the per-file filter has to survive into the returned list, which means the
 * diff is walked here rather than through the kit's unit-level summary. */
function changePairs(base, head, workspace) {
  const out = [];
  const raw = execFileSync("git", ["diff", "--name-status", "-M", base, head], {
    cwd: workspace,
    encoding: "utf8",
    maxBuffer: 32 * 1024 * 1024,
  });
  for (const line of raw.split("\n").filter(Boolean)) {
    const cols = line.split("\t");
    const status = cols[0];
    if (status.startsWith("R") || status.startsWith("C")) out.push({ from: cols[1], to: cols[2] });
    else if (status.startsWith("A")) out.push({ from: null, to: cols[1] });
    else if (status.startsWith("D")) out.push({ from: cols[1], to: null });
    else out.push({ from: cols[1], to: cols[1] });
  }
  return out;
}

/**
 * The cultures a change authors, and the ones it did not.
 *
 * `{ authored: Map<id, string[]>, spared: string[] }` - the map's values are the
 * repository paths that carry real changes, so a caller asking "were the PLOTS
 * authored" reads them rather than running its own diff. A culture appears in
 * `spared` when every one of its changed files was a retargeted link, a move, or
 * packaging.
 */
export function authoredCultures(base, head, workspace = WORKSPACE) {
  const byCulture = new Map();
  for (const change of changePairs(base, head, workspace)) {
    // A rename is filed under the culture it landed in; a deletion under the one
    // it left. Both sides of a move across cultures therefore get their say.
    for (const side of [change.to, change.from]) {
      if (!side) continue;
      const hit = pathCulture(side, workspace);
      if (!hit) continue;
      if (!byCulture.has(hit.id)) byCulture.set(hit.id, []);
      const list = byCulture.get(hit.id);
      if (!list.some((c) => c.from === change.from && c.to === change.to)) list.push(change);
    }
  }

  const authored = new Map();
  const spared = [];
  for (const [id, changes] of byCulture) {
    const real = changes.filter((c) => !defaultRelink(c, base, head, workspace));
    if (real.length) authored.set(id, real.map((c) => c.to ?? c.from).sort());
    else spared.push(id);
  }
  return { authored, spared: spared.sort() };
}

/** One line for a gate to print, so an exemption is never silent. */
export function relinkNote(spared) {
  if (!spared.length) return null;
  return (
    `  ${spared.length} culture(s) were only relinked, moved or repackaged and are not ` +
    `charged: ${spared.join(", ")}`
  );
}

/** The cultures a list of changed repository paths touches. */
export function touchedCultures(paths, workspace = WORKSPACE) {
  const ids = new Set();
  for (const p of paths) {
    const hit = pathCulture(p, workspace);
    if (hit) ids.add(hit.id);
  }
  return [...ids].sort();
}

/**
 * The npm name the naming rule gives a culture id.
 *
 * The design's rule reads `-<id>` for a national culture and `-<cc>-<id>` for a
 * sub-national one, and the two collapse into one line here, because the
 * sub-national ids already carry their parent's code: `de_bavaria` is the id
 * conformance requires, so `@chbrain/khai-cultures-de-bavaria` is both forms of
 * the rule at once. Underscores become hyphens; an npm name has no others.
 */
export function productionName(id) {
  return `@chbrain/khai-cultures-${id.replace(/_/g, "-")}`;
}

/** Sanity for a caller that wants the path shapes in a message. */
export function homes(workspace = WORKSPACE) {
  return {
    monolith: `${rel(join(workspace, "packages", "khai-cultures", "cultures"), workspace)}/<id>/`,
    production: `${rel(join(workspace, "packages"), workspace)}/khai-cultures-<name>/`,
  };
}
