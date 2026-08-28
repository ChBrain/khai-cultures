// The registry of a house whose cultures live in two places.
//
// `khai-tests registry build` counts the subdirectories of the collection dir
// and derives the version from that count. It is right about the house it can
// see, and during the walk it can only see half of one: a culture migrated into
// its own production package is no longer a subdirectory of `cultures/`, so the
// kit's build drops its entry and its count, and the minor version - which IS
// the culture count in this house - goes DOWN. A version that goes down is a
// version already published, and the release stops.
//
// So the kit builds what it owns and this reconciles the whole. It runs after
// the kit's build, never instead of it: the entry shape, the description
// fallback, the members catalog and the geo sidecar all stay the kit's rules,
// taken by running the kit's own build over the migrated packages in a scratch
// tree and lifting the entries out. Nothing about what an entry looks like is
// decided here.
//
// TWO THINGS THIS ADDS, and they are the house's own.
//
// `package` on a migrated entry. The registry is the index a consumer reads, and
// for 290 cultures it used to be able to say "the files are in this tarball,
// under cultures/<id>/". For a migrated culture that is false, and silently so.
// The entry therefore names the package that ships it, which is also what the
// packing test reads: an entry without `package` must be in the box, an entry
// with one must be a declared dependency.
//
// The count. `0.<count>.0` where count is every culture the house has, wherever
// it lives. The umbrella's identity is the count; the walk moves files, not
// cultures.

import { readFileSync, writeFileSync, mkdtempSync, rmSync, mkdirSync, cpSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { tmpdir } from "node:os";
import { pathToFileURL } from "node:url";
import { buildRegistry, deriveVersionFrom } from "@chbrain/khai-tests";
import { WORKSPACE, HOUSE, productions, cultureIds } from "./culture_sources.mjs";

const rel = (p) => relative(WORKSPACE, p).split(sep).join("/");
const read = (p) => JSON.parse(readFileSync(p, "utf8"));

const HOUSE_PKG = join(HOUSE, "package.json");
const REGISTRY = join(HOUSE, "registry.json");

/**
 * Registry entries for the migrated cultures, built by the kit.
 *
 * A scratch house is assembled whose `cultures/` holds a copy of each production
 * package, the kit's build is run over it, and its entries are taken. Copying is
 * bounded by what has migrated, and the alternative - a second implementation of
 * `buildItems` here - is a second set of rules for what an entry contains, which
 * would drift from the kit's the first time the kit changed.
 */
export function migratedEntries(list = productions()) {
  if (!list.length) return [];
  const scratch = mkdtempSync(join(tmpdir(), "khai-registry-"));
  try {
    mkdirSync(join(scratch, "cultures"), { recursive: true });
    for (const prod of list)
      cpSync(prod.dir, join(scratch, "cultures", prod.id), {
        recursive: true,
        filter: (src) => !src.split(sep).includes("node_modules"),
      });
    writeFileSync(
      join(scratch, "package.json"),
      JSON.stringify(
        {
          name: read(HOUSE_PKG).name,
          version: "0.0.0",
          khai: { collection: { dir: "cultures", key: "cultures", anchor: "play_" } },
        },
        null,
        2,
      ),
    );
    buildRegistry(scratch);
    const built = read(join(scratch, "registry.json")).cultures ?? [];
    const byId = new Map(list.map((p) => [p.id, p]));
    return built.map((e) => ({ ...e, package: byId.get(e.id)?.name }));
  } finally {
    rmSync(scratch, { recursive: true, force: true });
  }
}

/** The registry the house's whole content builds to, and the version that goes with it. */
export function hybrid() {
  const registry = read(REGISTRY);
  const pkg = read(HOUSE_PKG);
  const mine = (registry.cultures ?? []).filter((e) => !e.package);
  const cultures = [...mine, ...migratedEntries()].sort((a, b) => a.id.localeCompare(b.id));
  const count = cultures.length;
  const version = deriveVersionFrom(pkg.version, count);
  return { ...registry, version, cultures, groups: registry.groups ?? [] };
}

/** Write the reconciled registry and the version it implies. Returns what changed. */
export function write() {
  const next = hybrid();
  const pkg = read(HOUSE_PKG);
  const changed = [];
  // Compared as data, not as text. Prettier owns the formatting of this file and
  // runs after the build; a byte comparison would report a rewrite on every run
  // and make a real change indistinguishable from a reflow.
  const before = readFileSync(REGISTRY, "utf8");
  if (JSON.stringify(JSON.parse(before)) !== JSON.stringify(next)) {
    writeFileSync(REGISTRY, `${JSON.stringify(next, null, 2)}\n`);
    changed.push(rel(REGISTRY));
  }
  if (pkg.version !== next.version) {
    pkg.version = next.version;
    writeFileSync(HOUSE_PKG, `${JSON.stringify(pkg, null, 2)}\n`);
    changed.push(rel(HOUSE_PKG));
  }
  return { version: next.version, count: next.cultures.length, changed };
}

/** What the committed registry gets wrong about the house that is actually here. */
export function drift() {
  const registry = read(REGISTRY);
  const pkg = read(HOUSE_PKG);
  const out = [];
  const listed = (registry.cultures ?? []).map((e) => e.id).sort();
  const actual = cultureIds();
  const missing = actual.filter((id) => !listed.includes(id));
  const extra = listed.filter((id) => !actual.includes(id));
  if (missing.length) out.push(`registry.json does not list: ${missing.join(", ")}`);
  if (extra.length)
    out.push(`registry.json lists cultures the house has not got: ${extra.join(", ")}`);

  const names = new Map(productions().map((p) => [p.id, p.name]));
  for (const entry of registry.cultures ?? []) {
    const want = names.get(entry.id);
    if (want && entry.package !== want)
      out.push(
        `${entry.id}: migrated into ${want} and its registry entry does not say so ` +
          `(a consumer would look for its files in a tarball that no longer has them)`,
      );
    if (!want && entry.package)
      out.push(`${entry.id}: names package ${entry.package} and is not a production package`);
  }

  const want = deriveVersionFrom(pkg.version, actual.length);
  if (pkg.version !== want)
    out.push(`package.json version ${pkg.version} is not the culture count: ${want}`);
  if (registry.version !== pkg.version)
    out.push(`registry.json version ${registry.version} != package.json version ${pkg.version}`);
  return out;
}

const isMain = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
if (isMain) {
  const argv = process.argv.slice(2);
  if (argv.includes("--write")) {
    const { version, count, changed } = write();
    console.log(
      `registry: ${count} culture(s), version ${version}` +
        (changed.length ? ` -- rewrote ${changed.join(", ")}` : " -- already reconciled"),
    );
  } else {
    const rows = drift();
    console.log(rows.length ? `registry drift: ${rows.length} finding(s)` : "registry: no drift");
    for (const line of rows) console.log(`  ${line}`);
    process.exit(rows.length ? 1 : 0);
  }
}
