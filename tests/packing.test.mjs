// What a package promises must be in the box.
//
// Twice now a package here has shipped a manifest describing content the tarball
// did not contain, and both times it was invisible because nothing reads a
// tarball. The tongues package listed `files: ["*.md"]`, which reaches only the
// package root while all sixty varieties live in subdirectories, so a publish
// would have carried 5 files of 65 with every one of the 236 links in
// `cultures/**` still 404ing. The house listed `cultures/**` and not
// `groups/**`, so `registry.json` shipped describing nineteen groups and every
// path it named was absent.
//
// Different mistakes, one failure: the manifest is the promise and `files` is
// the delivery, and nothing held them to each other. This does. Every file a
// package's own manifest names must appear in what `npm pack` would produce -
// asked of npm itself rather than by re-implementing its glob semantics, because
// a second implementation of the packing rules is a second thing to get wrong.

import { describe, it, expect } from "vitest";
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const WORKSPACE = join(dirname(fileURLToPath(import.meta.url)), "..");

/** The paths `npm pack` would put in the tarball, as the package sees them. */
function packed(pkgDir) {
  const out = execFileSync("npm", ["pack", "--dry-run", "--json"], {
    cwd: join(WORKSPACE, "packages", pkgDir),
    encoding: "utf8",
    maxBuffer: 64 * 1024 * 1024,
  });
  return new Set(JSON.parse(out)[0].files.map((f) => f.path));
}

const manifest = (pkgDir) =>
  JSON.parse(readFileSync(join(WORKSPACE, "packages", pkgDir, "package.json"), "utf8"));

describe("Packing: the house ships everything its registry names", () => {
  const registry = JSON.parse(
    readFileSync(join(WORKSPACE, "packages", "khai-cultures", "registry.json"), "utf8"),
  );

  // One pack for both assertions; it walks 7,000 files and is the slow part.
  const box = packed("khai-cultures");

  const promised = (kind, entries) =>
    (entries ?? []).flatMap((e) => (e.members ?? []).map((m) => `${kind}/${e.id}/${m.file}`));

  // A migrated culture is in the registry and not in this tarball, and that is
  // the arrangement rather than a fault: the entry names the package that ships
  // it. So the promise splits in two and BOTH halves are held. What the umbrella
  // still ships, it must ship; what it has let go, it must still be able to
  // reach, which means a declared dependency and not a hopeful specifier.
  const shipped = (registry.cultures ?? []).filter((e) => !e.package);
  const delegated = (registry.cultures ?? []).filter((e) => e.package);

  it("packs every culture file the registry lists as its own", () => {
    const want = promised("cultures", shipped);
    expect(want.length).toBeGreaterThan(0);
    const missing = want.filter((p) => !box.has(p));
    expect(
      missing.slice(0, 5),
      `registry.json names ${want.length} culture file(s) and ${missing.length} are not in the tarball`,
    ).toEqual([]);
  });

  it("declares a dependency on every culture it has let go", () => {
    const deps = manifest("khai-cultures").dependencies ?? {};
    const undeclared = delegated.filter((e) => !deps[e.package]);
    expect(
      undeclared.map((e) => `${e.id} -> ${e.package}`),
      "a registry entry naming a package the umbrella does not depend on is a culture " +
        "an installer cannot reach: the files are not in the tarball and npm was never told " +
        "where they are",
    ).toEqual([]);
  });

  it("ships no file for a culture it has let go", () => {
    const strays = promised("cultures", delegated).filter((p) => box.has(p));
    expect(
      strays.slice(0, 5),
      "a migrated culture must be gone from the tarball, not shipped twice",
    ).toEqual([]);
  });

  it("packs every group file the registry lists", () => {
    const want = promised("groups", registry.groups);
    expect(want.length).toBeGreaterThan(0);
    const missing = want.filter((p) => !box.has(p));
    expect(
      missing.slice(0, 5),
      `registry.json names ${want.length} group file(s) and ${missing.length} are not in the tarball`,
    ).toEqual([]);
  });

  it("packs the registry itself, which is how an installer finds any of it", () => {
    expect(box.has("registry.json")).toBe(true);
  });
});

describe("Packing: the tongues ship every variety their manifest names", () => {
  it("packs every member of khai.members", () => {
    const box = packed("khai-cultures-tongues");
    const want = (manifest("khai-cultures-tongues").khai?.members ?? []).map((m) => m.file);
    expect(want.length).toBeGreaterThan(0);
    const missing = want.filter((p) => !box.has(p));
    expect(
      missing.slice(0, 5),
      `the manifest names ${want.length} member(s) and ${missing.length} are not in the tarball`,
    ).toEqual([]);
  });
});
