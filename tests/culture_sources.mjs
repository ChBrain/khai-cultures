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
// THIS FILE IS NOW A THIN ADAPTER, and both limits it once kept locally are now
// the kit's. Finding a house by the manifest that declares it, and walking its
// units, is the kit's (`resolveHouse`, `unitsOf` in `@chbrain/khai-tests`); so
// is the relink RULE itself, whether one changed file's whole difference is a
// rewritten link target rather than authoring (`defaultRelink`) - because two
// implementations of one rule diverge, and this house's was the first draft of
// what the kit now carries for every khai house. `pathCulture` used to carry a
// hand-rolled string match on the monolith branch because `unitsOf` once saw a
// moved unit twice when a migration's `git mv` left the old directory empty on
// disk; `unitsOf` now counts only a content-dir directory that still holds the
// collection's own anchor file, and a caller that wants the leftover directories
// themselves has `emptyUnitDirs`, so `pathCulture` now just walks `unitsOf`'s
// list like any other reader. And `authoredCultures` used to walk its own
// per-file diff grouping (`changePairs`) because the kit's `touchedUnits` only
// ever answered "was this unit authored" as a whole, handing back a unit's
// entire changed-file list regardless of which file earned the verdict - not
// enough for a caller (plot_zero.mjs's gate) asking whether the PLOT files
// specifically were authored. `touchedUnits` now carries that verdict per file
// (`files[].authored`), and `authoredFiles` is the same answer reshaped as a
// lookup by unit id, so `authoredCultures` is now built on those instead.
//
// What stays here is what is true of THIS house and nowhere else: the shape a
// caller gets back (`{id, dir, migrated, packageName, packageDir}`, not the
// kit's bare `{id, dir}`), and the culture-specific error wording callers and
// tests are pinned to.
//
// WHAT MAKES A DIRECTORY A CULTURE. Under the umbrella, being a subdirectory of
// `cultures/` is enough - that is the collection khai-tests counts. Beside it, a
// package is a culture when its manifest declares the production layer:
// `khai.class === "house"` with a `khai.production` id. Not the directory name,
// which is the npm name and carries hyphens where an id carries underscores, and
// not a glob over `packages/*`, which would count the umbrella and the tongues.
// The manifest says what a package is; `resolveHouse` only reads it.
//
// AND A GROUP PACKAGE IS NOT ONE. A migrated group also declares
// `khai.class === "house"`, because it is a play that ships as a package like
// any other, so the kit's `unitsOf` hands it back as a unit. It is not a
// culture: it has no `khai.production`, it must not move the minor, and the
// culture minimums do not apply to it - a group has no place, no process and no
// piece unless its arc needs one, and DACH's needs none. So `cultures()` drops
// the migrated groups by directory, and the two readers stay disjoint.

import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join, dirname, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";
import {
  resolveHouse,
  unitsOf,
  touchedUnits,
  authoredFiles,
  defaultRelink,
} from "@chbrain/khai-tests";

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
 * The npm name of every migrated culture, mapped to the culture id it ships.
 *
 * What the kit's registry build needs to read a cast that has become a package
 * specifier: `](@chbrain/khai-cultures-germany/play_germany.md)` names a culture
 * only if somebody can say which. The kit will not derive it, and is right not
 * to - the name is this house's own rule, frozen before the first publish, and a
 * kit that hard-coded it would be wrong for the next house to walk. So the house
 * that owns the rule hands over the answer.
 *
 * Derived from the productions actually present, never a maintained list, so it
 * is correct at every point of a one-way walk including both of its ends.
 */
export function packageIds(workspace = WORKSPACE) {
  return new Map(productions(workspace).map((p) => [p.name, p.id]));
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

  const all = unitsOf(house); // throws its own "two places at once" on a real duplicate
  // A migrated group is a unit and not a culture. See the note at the top.
  const groupDirs = new Set(groupsOf(house).map((g) => g.dir));
  const units = all.filter((u) => !groupDirs.has(u.dir));
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
  const house = findHouse(workspace);
  if (!house) return null;
  const s = String(p).trim().replace(/\\/g, "/");
  // `unitsOf` only counts a content-dir directory when it still holds the
  // collection's own anchor file, so an emptied monolith directory a migration
  // left behind is never a unit here and never collides with the production
  // package the culture moved to - `unitsOf` throws its own "two places at
  // once" only on a genuine duplicate, both still carrying an anchor.
  const prods = new Map(productionsOf(house).map((x) => [x.id, x]));
  for (const u of unitsOf(house)) {
    const prefix = `${rel(u.dir, workspace)}/`;
    if (s.startsWith(prefix)) {
      const file = s.slice(prefix.length);
      if (!file) return null;
      return { id: u.id, file, migrated: prods.has(u.id) };
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

/**
 * The cultures a change authors, and the ones it did not.
 *
 * `{ authored: Map<id, string[]>, spared: string[] }` - the map's values are the
 * repository paths that carry real changes, so a caller asking "were the PLOTS
 * authored" reads them rather than running its own diff. A culture appears in
 * `spared` when every one of its changed files was a retargeted link, a move, or
 * packaging.
 *
 * Built on the kit's own per-file verdict: `touchedUnits(house, { base, head })`
 * classifies each unit (and, inside it, each changed file) as authored or
 * relink-only under `defaultRelink`, and `authoredFiles` is that same verdict
 * reshaped as `Map<unit id, string[]>` of exactly the files that earned it - the
 * finer question plot_zero.mjs's gate asks (were the PLOT files specifically
 * authored, as opposed to some other file in the same culture) reads straight
 * off that map rather than off a per-culture diff walked here.
 */
export function authoredCultures(base, head, workspace = WORKSPACE) {
  const house = findHouse(workspace);
  if (!house) return { authored: new Map(), spared: [] };
  const units = touchedUnits(house, { base, head });
  const authored = authoredFiles(house, { base, head });
  const spared = units
    .filter((u) => u.relinkOnly)
    .map((u) => u.id)
    .sort();
  return { authored, spared };
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
/**
 * Every GROUP that has been lifted into its own package.
 *
 * Keyed on `khai.group` and never on `khai.production`, and the difference is
 * the version. `productionsOf` counts what it finds, the minor IS the culture
 * count, and a group is not a culture: a migrated group declaring
 * `khai.production` would move the number by existing. So the two markers are
 * disjoint by construction, and a package carrying both is a mistake this
 * house would rather fail on than average out.
 */
function groupsOf(house) {
  if (!house) return [];
  return house.productions
    .filter((p) => p.pkg?.khai?.group)
    .map((p) => ({
      id: String(p.pkg.khai.group),
      name: p.name,
      dir: p.dir,
      anchor: p.pkg.khai.anchor,
      pkg: p.pkg,
    }))
    .sort((a, b) => a.id.localeCompare(b.id));
}

/** Every migrated group. Empty is legitimate: the walk starts somewhere. */
export function migratedGroups(workspace = WORKSPACE) {
  return groupsOf(findHouse(workspace));
}

/** The umbrella's own groups, the ones that have not moved: `[id, dir]`. */
export function houseGroups(workspace = WORKSPACE) {
  const dir = join(workspace, "packages", "khai-cultures", "groups");
  if (!existsSync(dir)) return [];
  return readdirSync(dir, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => [e.name, join(dir, e.name)])
    .sort((a, b) => a[0].localeCompare(b[0]));
}

/**
 * The npm name of a group package. Same shape as a culture's, because a play
 * vertex id is unique across both collections and the manifest says which kind
 * it is. Kept as its own function so a caller reads what it meant.
 */
export function groupName(id) {
  return `@chbrain/khai-cultures-${id.replace(/_/g, "-")}`;
}

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
