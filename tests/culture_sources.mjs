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
// WHAT MAKES A DIRECTORY A CULTURE. Under the umbrella, being a subdirectory of
// `cultures/` is enough - that is the collection khai-tests counts. Beside it, a
// package is a culture when its manifest declares the production layer:
// `khai.class === "house"` with a `khai.production` id. Not the directory name,
// which is the npm name and carries hyphens where an id carries underscores, and
// not a glob over `packages/*`, which would count the umbrella and the tongues.
// The manifest says what a package is; this file only reads it.

import { readdirSync, existsSync, readFileSync } from "node:fs";
import { join, dirname, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));

/** The workspace container: holds the tooling, publishes nothing. */
export const WORKSPACE = join(HERE, "..");
/** The umbrella package: the cultures not yet migrated live under it. */
export const HOUSE = join(WORKSPACE, "packages", "khai-cultures");
/** The workspace's package directory. */
export const PACKAGES = join(WORKSPACE, "packages");

/** The production layer's class, as khai-arch names it. */
export const PRODUCTION_CLASS = "house";

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
 * Every culture that has been lifted into its own package.
 *
 * Empty is a legitimate answer here and only here: before the first migration
 * there are none, and the walk starts somewhere.
 */
export function productions(workspace = WORKSPACE) {
  const dir = join(workspace, "packages");
  if (!existsSync(dir)) return [];
  const out = [];
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    if (!e.isDirectory() || e.name.startsWith(".")) continue;
    const pkgDir = join(dir, e.name);
    const pkg = manifest(pkgDir);
    const khai = pkg?.khai;
    if (!khai || khai.class !== PRODUCTION_CLASS || !khai.production) continue;
    out.push({
      id: String(khai.production),
      name: pkg.name,
      dir: pkgDir,
      anchor: khai.anchor,
      pkg,
    });
  }
  return out.sort((a, b) => a.id.localeCompare(b.id));
}

/** Cultures still living as directories under the umbrella. */
function monolith(workspace = WORKSPACE) {
  const dir = join(workspace, "packages", "khai-cultures", "cultures");
  if (!existsSync(dir)) return [];
  return readdirSync(dir, { withFileTypes: true })
    .filter((e) => e.isDirectory() && !e.name.startsWith("."))
    .map((e) => ({ id: e.name, dir: join(dir, e.name) }))
    .sort((a, b) => a.id.localeCompare(b.id));
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
  const house = join(workspace, "packages", "khai-cultures");
  const out = [
    ...monolith(workspace).map((c) => ({
      ...c,
      migrated: false,
      packageName: manifest(house)?.name,
      packageDir: house,
    })),
    ...productions(workspace).map((p) => ({
      id: p.id,
      dir: p.dir,
      migrated: true,
      packageName: p.name,
      packageDir: p.dir,
    })),
  ];
  if (!out.length)
    throw new Error(
      `no cultures found under ${rel(join(workspace, "packages"), workspace)}: ` +
        `neither ${rel(join(house, "cultures"), workspace)}/* nor a package declaring ` +
        `khai.class "${PRODUCTION_CLASS}". The content root is wrong, and a check ` +
        `reading it would pass by reading nothing.`,
    );
  const seen = new Map();
  for (const c of out) {
    if (seen.has(c.id))
      throw new Error(
        `culture "${c.id}" is in two places at once: ${rel(seen.get(c.id).dir, workspace)} and ` +
          `${rel(c.dir, workspace)}. A migration moves a culture; it never copies one.`,
      );
    seen.set(c.id, c);
  }
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
