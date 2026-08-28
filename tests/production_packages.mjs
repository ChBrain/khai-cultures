// A migrated culture is a package, and a package must be true on its own.
//
// The whole reason a culture becomes a package is that a dependency is the only
// reference npm can check. A relative path across a working tree resolves
// perfectly and ships broken; `@chbrain/khai-cultures-germany/position_culture_
// deutsche_kultur.md` resolves only through a declared dependency, and fails
// closed when there is none. That is the material relationship the split buys,
// and it is worth nothing unless the declaration is actually there.
//
// So khai holds the package to the canon and this holds it to the house.
// `validateProductionPackage` (khai-tests) checks the class, the production id,
// the absence of a wiring law, the one anchoring play and the `../` publish
// invariant, and then validates the content rooted on the package. It cannot
// check what only this house knows: that the npm name follows the naming rule
// frozen before the first publish, that every package specifier the content
// casts is a dependency the manifest declares, that a sub-national culture
// declares its parent, and that the umbrella still names every production it
// has let go. Those four are here, and nothing here reimplements the five above.
//
// THE ONE THAT BITES. Specifier-declared is the check that will fail most, and
// it is the one worth having: a culture that casts a tongue it does not depend
// on works in this workspace, because a workspace resolves every member whether
// or not anybody asked, and breaks for the first person who installs it. The
// workspace is exactly the environment in which the mistake is invisible.

import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { pathToFileURL } from "node:url";
import { execFileSync } from "node:child_process";
import { validateProductionPackage } from "@chbrain/khai-tests";
import { WORKSPACE, HOUSE, productions, productionName, pathCulture } from "./culture_sources.mjs";
import { parentOf } from "./culture_conformance.mjs";

const rel = (p) => relative(WORKSPACE, p).split(sep).join("/");

/** Every `@scope/name` specifier a package's markdown casts, with the file that casts it. */
export function specifiers(dir) {
  const out = new Map();
  for (const file of readdirSync(dir).filter((f) => f.endsWith(".md"))) {
    const text = readFileSync(join(dir, file), "utf8");
    for (const m of text.matchAll(/\]\((@[a-z0-9-]+\/[a-z0-9-]+)\/[^()\s]+\)/g)) {
      if (!out.has(m[1])) out.set(m[1], new Set());
      out.get(m[1]).add(file);
    }
  }
  return out;
}

/** The umbrella's manifest. */
function umbrella() {
  return JSON.parse(readFileSync(join(HOUSE, "package.json"), "utf8"));
}

/** What one production package still owes the house. Every finding blocks. */
export function findings(prod) {
  const out = [];
  const { id, name, dir, pkg } = prod;

  // 1. The canon, delegated whole.
  for (const result of validateProductionPackage(dir))
    for (const err of result.errors ?? []) out.push(`${result.file}: ${err}`);

  // 2. The name. An npm name is permanent, so the rule is checked on the way in
  //    and never negotiated afterwards.
  const wanted = productionName(id);
  if (name !== wanted)
    out.push(
      `package.json: name "${name}" must be "${wanted}" (the id with hyphens for underscores)`,
    );

  // 3. Every specifier the content casts is declared. This is the check the
  //    workspace hides: unresolved here, broken for everyone else.
  const declared = new Set([
    ...Object.keys(pkg.dependencies ?? {}),
    ...Object.keys(pkg.peerDependencies ?? {}),
  ]);
  for (const [spec, files] of specifiers(dir))
    if (!declared.has(spec))
      out.push(
        `package.json: casts ${spec} (in ${[...files].sort().join(", ")}) and does not depend on it ` +
          `-- it resolves in this workspace and breaks for anyone who installs the package`,
      );

  // 4. A sub-national culture declares its parent, as a dependency and not only
  //    as a link. The nesting itself is culture_conformance's; this is the half
  //    that makes the nesting resolvable off this machine.
  const geo = join(dir, "geo.json");
  if (existsSync(geo)) {
    const iso = String(JSON.parse(readFileSync(geo, "utf8")).iso ?? "");
    if (iso.includes("-")) {
      const code = iso.split("-")[0];
      const parent = parentOf(code);
      if (parent && !declared.has(productionName(parent)))
        out.push(`package.json: nests in "${parent}" and must depend on ${productionName(parent)}`);
    }
  }
  return out.sort();
}

/**
 * What the umbrella owes: a production it let go must still be a dependency.
 *
 * The count is the house's identity and the install is its promise. Lift a
 * culture out and forget this line and the umbrella quietly ships 289 cultures
 * under a version that says 290, with no error anywhere: the directory is gone,
 * so nothing looks for it.
 */
export function umbrellaFindings() {
  const pkg = umbrella();
  const deps = pkg.dependencies ?? {};
  const out = [];
  for (const prod of productions())
    if (!deps[prod.name])
      out.push(
        `${rel(join(HOUSE, "package.json"))}: ${prod.name} was lifted out of cultures/ and is not ` +
          `a dependency -- the umbrella keeps the count, so it must keep the reference`,
      );
  return out;
}

/** Every finding in the house, by package. */
export function report() {
  const rows = productions().map((p) => [p.name, findings(p)]);
  const extra = umbrellaFindings();
  const n = rows.reduce((a, [, f]) => a + f.length, 0) + extra.length;
  console.log(`productions: ${rows.length} package(s), ${n} finding(s)`);
  for (const [name, f] of rows) for (const line of f) console.log(`  ${name}/${line}`);
  for (const line of extra) console.log(`  ${line}`);
  return n;
}

function gate(base, head) {
  const changed = execFileSync("git", ["diff", "--name-only", base, head], {
    encoding: "utf8",
    maxBuffer: 32 * 1024 * 1024,
  })
    .split("\n")
    .filter(Boolean);
  // Touch a production and it answers; touch the umbrella's manifest and every
  // production answers, because that is where a dropped dependency hides.
  const touchedManifest = changed.some((p) => p === rel(join(HOUSE, "package.json")));
  const touched = new Set();
  for (const p of changed) {
    const hit = pathCulture(p);
    if (hit?.migrated) touched.add(hit.id);
  }
  const scope = touchedManifest ? productions() : productions().filter((p) => touched.has(p.id));
  const extra = umbrellaFindings();
  const rows = scope.map((p) => [p.name, findings(p)]);
  const n = rows.reduce((a, [, f]) => a + f.length, 0) + extra.length;
  if (!n) {
    console.log(
      scope.length
        ? `Productions OK: ${scope.length} package(s) checked.`
        : "Productions: no production package touched.",
    );
    return 0;
  }
  console.error("::error::A migrated culture must be true as a package, not only in this tree.");
  for (const [name, f] of rows) for (const line of f) console.error(`  ${name}/${line}`);
  for (const line of extra) console.error(`  ${line}`);
  console.error(
    "\n  See management/orders/order_the_migration_ratchet.md. A workspace resolves\n" +
      "  every member whether or not anybody declared it, so this is the one class of\n" +
      "  mistake that cannot be found by running the house.",
  );
  return 1;
}

const isMain = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
const argv = isMain ? process.argv.slice(2) : [];
if (argv.includes("--report")) process.exit(report() ? 1 : 0);
else if (argv.includes("--gate")) {
  const base = argv[argv.indexOf("--base") + 1];
  const head = argv[argv.indexOf("--head") + 1];
  if (!base || !head) {
    console.error("usage: production_packages.mjs --gate --base <sha> --head <sha>");
    process.exit(2);
  }
  process.exit(gate(base, head));
}
