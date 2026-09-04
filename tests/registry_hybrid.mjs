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

import {
  readFileSync,
  writeFileSync,
  mkdtempSync,
  rmSync,
  mkdirSync,
  cpSync,
  readdirSync,
} from "node:fs";
import { join, relative, sep } from "node:path";
import { tmpdir } from "node:os";
import { pathToFileURL } from "node:url";
import { buildRegistry, deriveVersionFrom } from "@chbrain/khai-tests";
import {
  WORKSPACE,
  HOUSE,
  productions,
  cultures,
  packageIds,
  migratedGroups,
  houseGroups,
} from "./culture_sources.mjs";

const rel = (p) => relative(WORKSPACE, p).split(sep).join("/");
const read = (p) => JSON.parse(readFileSync(p, "utf8"));

const HOUSE_PKG = join(HOUSE, "package.json");
const REGISTRY = join(HOUSE, "registry.json");

/**
 * Run the kit's build over a scratch house assembled from `dirs`, and take the
 * culture entries it produces.
 *
 * The alternative is a second implementation of the kit's `buildItems` here,
 * which would be a second set of rules for what a registry entry contains and
 * would drift from the kit's the first time the kit changed.
 */
function builtFrom(dirs, extra = {}) {
  if (!dirs.length) return [];
  const scratch = mkdtempSync(join(tmpdir(), "khai-registry-"));
  try {
    mkdirSync(join(scratch, "cultures"), { recursive: true });
    for (const [id, dir] of dirs)
      cpSync(dir, join(scratch, "cultures", id), {
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
          ...extra,
        },
        null,
        2,
      ),
    );
    buildRegistry(scratch);
    return read(join(scratch, "registry.json")).cultures ?? [];
  } finally {
    rmSync(scratch, { recursive: true, force: true });
  }
}

/**
 * Registry entries for the migrated cultures, each naming the package that
 * ships it and where inside that package its files sit.
 *
 * `source` is the kit's own field and the kit stamps it on every entry, but it
 * stamps what is true of the SCRATCH tree `builtFrom` hands it: the umbrella's
 * name, and `cultures/<id>`. That is right for a culture still under the
 * umbrella and false for one that has left, so this overwrites it with the two
 * facts only the house knows - the production's npm name, and the empty path
 * that says the package root IS the unit.
 *
 * `package` rides alongside for one minor as a deprecated mirror of
 * `source.package`. It was this house's own field before the kit had one, it is
 * published, and a consumer that adopted it should not find it gone without
 * warning. Nothing in this house reads it any more.
 */
export function migratedEntries(list = productions()) {
  const byId = new Map(list.map((p) => [p.id, p]));
  return builtFrom(list.map((p) => [p.id, p.dir])).map((e) => ({
    ...e,
    source: { package: byId.get(e.id)?.name, path: "" },
    package: byId.get(e.id)?.name,
  }));
}

/** Run `fn` with the kit's console output dropped. Errors are not swallowed. */
function quiet(fn) {
  const { log, warn, error } = console;
  console.log = console.warn = console.error = () => {};
  try {
    return fn();
  } finally {
    Object.assign(console, { log, warn, error });
  }
}

/**
 * Run the kit's build over a scratch house whose `groups/` holds `dirs`, and
 * take the group entries it produces.
 *
 * The same trick as `builtFrom` and for the same reason - the kit decides what
 * an entry contains, not this file - with two differences that are the group's.
 * The scratch manifest declares the referencing collection as well as the
 * cultures one, because a group entry without `references` is a build error in
 * the kit. And `packageIds` goes in, because every member cast in a migrated
 * group is a package specifier and the kit resolves those only when somebody
 * says which package is which culture. The `cultures/` directory is created and
 * left empty on purpose: the references resolve through the map, not through
 * files, and copying three hundred cultures in to prove it would cost minutes
 * per build.
 */
function builtGroupsFrom(dirs) {
  if (!dirs.length) return [];
  const scratch = mkdtempSync(join(tmpdir(), "khai-registry-groups-"));
  try {
    mkdirSync(join(scratch, "cultures"), { recursive: true });
    mkdirSync(join(scratch, "groups"), { recursive: true });
    // Every culture, as its play file and nothing else. The kit checks each
    // derived reference against the cultures collection, so an empty one turns
    // every group into "references X, which is not a cultures member" and turns
    // a fully migrated group - DACH, whose casts are all package specifiers -
    // into a build failure. The whole directories would also do it and cost
    // minutes; a play file is the vertex, and membership is all this scratch
    // tree is asked for.
    for (const c of cultures()) {
      const play = readdirSync(c.dir).find((f) => f.startsWith("play_") && f.endsWith(".md"));
      if (!play) continue;
      mkdirSync(join(scratch, "cultures", c.id), { recursive: true });
      cpSync(join(c.dir, play), join(scratch, "cultures", c.id, play));
    }
    for (const [id, dir] of dirs)
      cpSync(dir, join(scratch, "groups", id), {
        recursive: true,
        filter: (src) => !src.split(sep).includes("node_modules"),
      });
    writeFileSync(
      join(scratch, "package.json"),
      JSON.stringify(
        {
          name: read(HOUSE_PKG).name,
          version: "0.0.0",
          khai: {
            collection: { dir: "cultures", key: "cultures", anchor: "play_" },
            collections: [{ dir: "groups", anchor: "play_", references: "cultures" }],
          },
        },
        null,
        2,
      ),
    );
    // Built quietly, and this is the one place that is warranted.
    //
    // `buildRegistry` derives the group's references correctly from the map it
    // is given, and then re-verifies what it just wrote WITHOUT that map. For a
    // group whose members have all migrated - today only DACH - the casts are
    // package specifiers, the re-verification cannot read them, and it prints
    // that the group casts nothing. The entries this returns are right; the
    // complaint is the kit talking to itself about a scratch tree, and printing
    // it on every `npm run registry` would teach a reader to ignore a line that
    // means something real elsewhere. A throw still throws.
    quiet(() => buildRegistry(scratch, { packageIds: packageIds() }));
    return read(join(scratch, "registry.json")).groups ?? [];
  } finally {
    rmSync(scratch, { recursive: true, force: true });
  }
}

/**
 * Registry entries for the migrated groups, each naming the package that ships
 * it. `source` is overwritten for the same reason a culture's is: the kit
 * stamps what is true of the scratch tree, which says the umbrella and
 * `groups/<id>`, and both are false once the group has left.
 */
export function migratedGroupEntries(list = migratedGroups()) {
  const byId = new Map(list.map((g) => [g.id, g]));
  return builtGroupsFrom(list.map((g) => [g.id, g.dir])).map((e) => ({
    ...e,
    source: { package: byId.get(e.id)?.name, path: "" },
  }));
}

/** Every group entry the house's source builds to, wherever the group lives. */
export function builtGroups() {
  const migratedIds = new Set(migratedGroups().map((g) => g.id));
  const mono = houseGroups().filter(([id]) => !migratedIds.has(id));
  return [...builtGroupsFrom(mono), ...migratedGroupEntries()].sort((a, b) =>
    a.id.localeCompare(b.id),
  );
}

/**
 * Every culture entry the house's source builds to, wherever the culture lives.
 *
 * The monolith half is built the same way as the migrated half rather than read
 * back off the committed file, because reading it back is what a drift check
 * must not do: it would compare the registry against itself.
 */
export function builtCultures() {
  const mono = cultures().filter((c) => !c.migrated);
  return [...builtFrom(mono.map((c) => [c.id, c.dir])), ...migratedEntries()].sort((a, b) =>
    a.id.localeCompare(b.id),
  );
}

/**
 * The registry the house's whole content builds to, and the version that goes
 * with it.
 *
 * `from` is the version to reconcile FROM, and it must be the one the house had
 * before the kit's build ran. The first migration found out why. The kit counts
 * directories, so lifting a culture out made it derive 0.289.0 and write that
 * into the manifest; this function then read the manifest, saw a minor that had
 * moved, and reset the patch - taking 0.290.1 to 0.290.0. A version going DOWN
 * onto one already published is the exact failure this file exists to prevent,
 * and it was reintroducing it one step later in the same command.
 */
export function hybrid(from = read(HOUSE_PKG).version) {
  const registry = read(REGISTRY);
  // The kit's build has just rewritten this file and could only see the
  // umbrella's own directories, so every entry in it is a monolith one. Read
  // that off `source` rather than off the absence of `package`: an entry under
  // the umbrella carries a path below it, one that has left carries "". The
  // house no longer asks a deprecated field where a unit lives.
  const built = (registry.cultures ?? []).filter((e) => e.source?.path !== "");
  const all = [...built, ...migratedEntries()].sort((a, b) => a.id.localeCompare(b.id));
  const version = deriveVersionFrom(from, all.length);
  // Groups reconcile exactly as cultures do, and for the same reason: the kit's
  // build has just walked `groups/` and can only have seen the ones still in it.
  // Before this, a migrated group would simply have vanished from the registry -
  // the pass-through said `registry.groups ?? []`, and the kit cannot list a
  // directory that is not there. Unlike a culture, that loss would have been
  // silent, because groups are not counted and no version would have moved.
  const builtG = (registry.groups ?? []).filter((e) => e.source?.path !== "");
  const groups = [...builtG, ...migratedGroupEntries()].sort((a, b) => a.id.localeCompare(b.id));
  return { ...registry, version, cultures: all, groups };
}

/**
 * Build the registry and write the version it implies. Returns what changed.
 *
 * The kit's build runs from HERE rather than beside it, so that the version it
 * is reconciled from is read before the kit can overwrite it. That makes this
 * the single writer of the number, which is what it has claimed to be since it
 * was written and was not while the two ran as separate commands.
 */
export function write() {
  const from = read(HOUSE_PKG).version;
  // The map is what lets a group whose members have migrated still derive them.
  // Its casts became package specifiers when they left, and the kit's link rule
  // reads that shape only when somebody says which package is which culture.
  // Without it DACH derives nothing - and since the kit now treats a referencing
  // entry that derives nothing as a build error, a forgotten map goes red here
  // rather than shipping a hollow group, which is exactly what it did before.
  buildRegistry(HOUSE, { packageIds: packageIds() });
  const next = hybrid(from);
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

/**
 * What the committed registry gets wrong about the house that is actually here.
 *
 * This REPLACES the kit's own drift check rather than supplementing it, and the
 * swap is deliberate. `validateCollectionRegistry` compares the committed file
 * against a build of the collection DIRECTORY, so in a hybrid house it reports
 * two things that are true and not faults - that a culture in the registry has
 * no directory, and that the file therefore does not match a directory-only
 * build. Filtering those without replacing them would leave the house with no
 * drift check at all, which is the shape of failure this repository keeps
 * finding. So the whole registry is recomputed here, both halves built by the
 * kit, and compared.
 */
export function drift() {
  const registry = read(REGISTRY);
  const pkg = read(HOUSE_PKG);
  const out = [];

  const built = builtCultures();
  const listed = registry.cultures ?? [];
  const key = (e) => JSON.stringify(e);
  const builtById = new Map(built.map((e) => [e.id, e]));
  const listedById = new Map(listed.map((e) => [e.id, e]));

  for (const id of [...builtById.keys()].filter((i) => !listedById.has(i)))
    out.push(`registry.json does not list "${id}"`);
  for (const id of [...listedById.keys()].filter((i) => !builtById.has(i)))
    out.push(`registry.json lists "${id}", which the house has not got`);
  for (const [id, entry] of builtById) {
    const there = listedById.get(id);
    if (there && key(there) !== key(entry))
      out.push(
        `${id}: registry.json is out of date with its source - run \`npm run registry\` ` +
          `(the build is the single writer; never hand-edit registry.json)`,
      );
  }

  // The same three questions asked of the groups. A migrated group drifts
  // silently otherwise: nothing about it moves the version, so the count checks
  // below would stay green with the entry gone.
  const builtG = builtGroups();
  const listedG = registry.groups ?? [];
  const gBuilt = new Map(builtG.map((e) => [e.id, e]));
  const gListed = new Map(listedG.map((e) => [e.id, e]));
  for (const id of [...gBuilt.keys()].filter((i) => !gListed.has(i)))
    out.push(`registry.json does not list the group "${id}"`);
  for (const id of [...gListed.keys()].filter((i) => !gBuilt.has(i)))
    out.push(`registry.json lists the group "${id}", which the house has not got`);
  for (const [id, entry] of gBuilt) {
    const there = gListed.get(id);
    if (there && key(there) !== key(entry))
      out.push(
        `${id}: registry.json is out of date with its source - run \`npm run registry\` ` +
          `(the build is the single writer; never hand-edit registry.json)`,
      );
  }

  const want = deriveVersionFrom(pkg.version, built.length);
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
