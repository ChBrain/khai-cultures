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
import { execFileSync } from "node:child_process";
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
 */
const LINK_TARGET = /\]\([^()\s]*\)/g;
const blindLinks = (text) => text.replace(LINK_TARGET, "](-)");

function show(ref, path, workspace) {
  try {
    return execFileSync("git", ["show", `${ref}:${path}`], {
      cwd: workspace,
      encoding: "utf8",
      maxBuffer: 32 * 1024 * 1024,
      stdio: ["ignore", "pipe", "ignore"],
    });
  } catch {
    return null; // added on one side, deleted on the other: not a relink
  }
}

/**
 * Files that are packaging rather than play.
 *
 * A migration writes a manifest and a licence pair into the culture's new
 * directory, and neither is a statement about the culture: the play is the same
 * play. `geo.json` and `coverage-waivers.json` are NOT here, and deliberately -
 * one carries the id and the nesting the conformance ratchet reads, the other is
 * a written claim that something needs no scene, and changing either is
 * authoring.
 */
const PACKAGING = new Set(["package.json", "LICENSE", "LICENSE-CODE"]);

/**
 * Whether a change to one file is something other than authoring.
 *
 * Two exemptions, and the second is the one a migration needs. A file whose
 * whole change is where its LINKS point was rewritten by a walk it had no part
 * in. A file that only MOVED is the same file: this house settled that once
 * already, when the sub-national rename deadlocked against changeset-check and
 * cost a batch its renames, and the rule it settled on - a rename pays no debt
 * and incurs none - is the same rule the migration needs, because a migration is
 * a directory rename with a manifest beside it.
 *
 * Take them together and a culture that migrated and nothing else is not
 * authored, which is correct and is the only thing that makes the migration
 * ratchet affordable: a move must not demand an origin plot the culture never
 * had, or the answer will be a bad plot_00, which is worse than none.
 *
 * @param {{from: string|null, to: string|null}} change  paths on each side; null
 *   where the file did not exist, which is an add or a delete and is authoring.
 */
export function relinkOnly(change, base, head, workspace = WORKSPACE) {
  const { from, to } = typeof change === "string" ? { from: change, to: change } : change;
  // Packaging is judged before existence, because a manifest and a licence
  // ARRIVE with a migration: asking whether they changed would file every first
  // migration as authoring and defeat the exemption it needs.
  if (PACKAGING.has((to ?? from).split("/").pop())) return true;
  if (!from || !to) return false;
  const before = show(base, from, workspace);
  const after = show(head, to, workspace);
  if (before === null || after === null) return false;
  // A file that moved and did not change is the same file, whatever its type.
  // This is checked BEFORE the markdown gate, because it was not, and the first
  // real migration flagged its culture as authored on `geo.json` alone: twenty-
  // eight files moved untouched and were spared, and the one that was not
  // markdown charged the whole culture. A migration would then demand coverage
  // of every culture it moved, which is the exemption defeated at the first
  // culture that has any debt.
  if (before === after) return true;
  // Only markdown gets the link exemption: a link is a markdown idea.
  if (!to.endsWith(".md")) return false;
  return blindLinks(before) === blindLinks(after);
}

/** Every path a change touches, as `{from, to}` pairs with renames resolved. */
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
    const real = changes.filter((c) => !relinkOnly(c, base, head, workspace));
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
