// Sub-national conformance: the id and the parent, held as a ratchet.
//
// Two facts about a sub-national culture are computable from its own geo.json,
// and both were wrong across the house when this was written.
//
// THE ID. A culture's directory id is its package name after the split, and an
// npm name is permanent. `georgia_us` exists because Georgia the country and
// Georgia the state collided in a flat namespace, and the suffix is a patch on a
// naming scheme rather than a name. So a sub-national id carries its parent's
// ISO country code as a prefix: `us_georgia`, `de_schleswig_holstein`,
// `es_navarre`. The rest of the name stays the author's; only the prefix is
// checked, because only the prefix is computable.
//
// THE PARENT. 88 of 90 sub-national cultures held no link to their parent at
// all: a Bavarian held `bayerische Kultur` and was, as staged, not German. The
// nesting goes on the position and not on every persona, because Bavarianness is
// a way of being German rather than a second passport, so the culture-position
// links the parent's culture-position and the personas are left alone.
//
// Both are held the way company coverage is held: a ratchet on the cultures a
// pull request touches, never a sweep. Touch a culture, leave it conforming.
//
// THE MAPLESS CASE. Everything above reads the id and the parent out of
// `geo.json`, and for a year that was every culture there was. A culture
// without a map has no `geo.json` at all - see
// management/orders/order_a_culture_without_a_map.md - and this wall used to
// answer one with an empty verdict and stop, so it was skipped entirely and one
// nesting in nothing would have passed. That was blindness, not leniency, and
// it was never exercised: measured on the tree that added this, 319 cultures,
// 200 country-level, 119 sub-national, none without a sidecar.
//
// So the sidecar routes rather than gates, and there are four cases:
//
//   no geo.json            mapless. The id prefix IS the host, because nothing
//                          else can say who hosts it, and the culture-position
//                          must link that host. A `_minority` id claims a kin
//                          as well, so it must link a second parent.
//   geo.json, no iso       a broken sidecar, not a mapless culture. A file that
//                          declares nothing is the one thing the router cannot
//                          read, so it is a finding rather than a third path.
//   iso without a dash     country-level. Nothing to nest in.
//   iso with a dash        sub-national, as above.
//
// The asymmetry is deliberate and worth naming: for a sub-national culture the
// prefix is what gets CHECKED against the sidecar, and for a mapless one the
// prefix is the only SOURCE there is. The same two letters, read in opposite
// directions, because in one case the ground answers and in the other it does
// not.

import { readFileSync, readdirSync, existsSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { cultureIds } from "./company_coverage.mjs";
import {
  WORKSPACE,
  cultureDir,
  isMigrated,
  productionName,
  authoredCultures,
  cultureUnits,
  notCultureNote,
  relinkNote,
} from "./culture_sources.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
export const ROOT = join(HERE, "..", "packages", "khai-cultures");

function iso(id, workspace = WORKSPACE) {
  const dir = cultureDir(id, workspace);
  if (!dir) return "";
  const p = join(dir, "geo.json");
  if (!existsSync(p)) return "";
  try {
    return String(JSON.parse(readFileSync(p, "utf8")).iso ?? "");
  } catch {
    return "";
  }
}

/**
 * Whether a culture carries a `geo.json` at all, which is a different question
 * from whether that file says anything. `iso()` answers "" for an absent
 * sidecar and for a present one that is empty or unreadable, and those are
 * opposite situations: the first is a culture with no ground, the second is a
 * culture whose ground did not get written down.
 */
function hasGeo(id, workspace = WORKSPACE) {
  const dir = cultureDir(id, workspace);
  return Boolean(dir) && existsSync(join(dir, "geo.json"));
}

/** The culture that owns a country code, e.g. "DE" -> "germany". */
/**
 * ISO country code -> the culture that holds it, built once.
 *
 * WHY THIS IS A MAP AND NOT A LOOP. `parentOf` used to walk every culture in the
 * house and read each one's `geo.json` until it matched. That is O(house) per
 * call, and `production_packages.findings` calls it once per SUB-NATIONAL
 * package, inside a loop over every package - so the canon test paid
 * O(house x packages) and spent 65 of its 69 seconds here, about 836ms a call
 * over some seventy sub-national packages, re-reading the same ~319 geo.json
 * files each time.
 *
 * Both halves of that product are things this house is deliberately growing, so
 * it was getting worse in both directions at once.
 *
 * The index is built on first use and held for the process, KEYED BY WORKSPACE.
 * It used to be one map for one tree, with a comment saying that anything
 * writing a geo.json mid-run would need to clear it and nothing did. A test
 * that builds a fixture house to exercise the mapless branch is exactly that
 * thing, and a single cache would have handed the fixture the real house's
 * answers - green for the wrong reason, which is the worst kind. One map per
 * tree costs a lookup and removes the trap.
 */
const isoIndexes = new Map();
function isoOwners(workspace = WORKSPACE) {
  const held = isoIndexes.get(workspace);
  if (held) return held;
  const index = new Map();
  for (const id of cultureIds(workspace)) {
    const code = iso(id, workspace);
    if (code && !index.has(code)) index.set(code, id);
  }
  isoIndexes.set(workspace, index);
  return index;
}

export function parentOf(code, workspace = WORKSPACE) {
  return isoOwners(workspace).get(code) ?? null;
}

/**
 * What a sub-national culture still owes. Both halves block.
 *
 * The id half was advisory for one day, because khai-guard read a rename's
 * destination as an added path and so demanded a `minor` changeset for a move
 * that changed no count, which would have landed the release back on a version
 * already published. khai-guard 0.2.1 judges the count-driven add rule on the
 * source as well, so a play that moved is no longer a play that arrived, and a
 * rename can travel in the same pull request as the content it belongs to.
 */
/** The gate's verdict shape, kept as a pair so nothing is advisory today. */
function verdict(blocking) {
  return { blocking, advisory: [], findings: [...blocking] };
}

/**
 * Every distinct parent a culture's culture-position files link.
 *
 * Returned as the link text rather than resolved to culture ids, because the
 * only caller that needs an identity already knows which parent it is looking
 * for and compares forward. The caller that does not - the kin check - needs a
 * COUNT and nothing more: "danish" in `de_danish_minority` is not a culture id
 * and no rule can turn it into one, so the wall can hold that a second parent
 * is linked and cannot hold which. That is the whole of what the order asks:
 * a two-parent id is not satisfied by silence.
 *
 * Matched with a fixed pattern and compared for equality rather than a regex
 * built from a parent's name. A name interpolated into a pattern is a regex
 * the caller did not write, and CodeQL is right to call that an injection even
 * when the name is only ever an id.
 */
function parentLinks(dir) {
  const out = new Set();
  for (const f of readdirSync(dir).filter((f) => f.startsWith("position_culture_"))) {
    for (const m of readFileSync(join(dir, f), "utf8").matchAll(
      /\]\((?:(\.\.)\/([a-z0-9_]+)|(@[a-z0-9-]+\/[a-z0-9-]+))\/position_culture_[a-z0-9_]+\.md\)/g,
    ))
      out.add(m[1] ? `../${m[2]}` : m[3]);
  }
  return out;
}

/**
 * The link a child must carry to reach `parent`, and whether it carries it.
 *
 * The parent's culture-position is reachable two ways, and which one is correct
 * is not the child's choice. While the parent is a directory under the
 * umbrella, a relative link is the only way there. Once the parent is a
 * production package the relative path no longer exists, and a migrated child
 * may not carry `../` at all - it would escape its own package and fail the
 * publish invariant. So the required form follows the parent's home, and the
 * message names the one that is right today.
 */
function nesting(dir, parent, workspace) {
  const spec = productionName(parent);
  const migrated = isMigrated(parent, workspace);
  const target = migrated ? spec : `../${parent}`;
  return { linked: parentLinks(dir).has(target), wanted: `${target}/position_culture_*.md` };
}

/**
 * What a mapless culture owes. Its id names its host and its culture-position
 * has to agree, because with no sidecar there is nothing else in the unit that
 * can say who hosts it.
 */
function maplessConformance(id, dir, workspace) {
  const blocking = [];
  const code = /^([a-z]{2})_/.exec(id)?.[1];
  const host = code ? parentOf(code.toUpperCase(), workspace) : null;
  if (!host)
    return verdict([
      `carries no geo.json, so it is a mapless culture, and its id must begin ` +
        `with the lowercased ISO country code of the polity that hosts it - ` +
        `"us_", "de_" - resolving to a culture this house holds. "${id}" does ` +
        `not, and nothing else in a mapless unit can name its host ` +
        `(management/orders/order_a_culture_without_a_map.md)`,
    ]);

  const { linked, wanted } = nesting(dir, host, workspace);
  if (!linked)
    blocking.push(
      `is hosted by "${host}" and does not say so: its culture-position must ` +
        `link ${wanted}. A mapless culture's only nesting is the one it writes down`,
    );

  // `_minority` is a role marker, not a kind marker: it says the name between
  // the host and the suffix is a KIN and not a place inside the host. A file
  // claiming a kin and linking one parent has claimed something it did not
  // write, and the fix is either link or suffix - both are honest, and the
  // wall does not choose between them.
  if (id.endsWith("_minority") && parentLinks(dir).size < 2)
    blocking.push(
      `is named "<host>_<kin>_minority" and its culture-position links fewer ` +
        `than two parents. The suffix says a kin exists, so link the kin as ` +
        `well as the host - or, if there is no kin, drop the suffix: a culture ` +
        `formed or indigenous in place is "<host>_<name>" and nests in the host ` +
        `alone (management/orders/order_a_culture_without_a_map.md)`,
    );

  return verdict(blocking);
}

/** What a sub-national culture owes: the id prefix, and the parent link. */
function subnationalConformance(id, dir, code, workspace) {
  const blocking = [];
  const prefix = `${code.toLowerCase()}_`;

  if (!id.startsWith(prefix))
    blocking.push(
      `id "${id}" must carry its parent's code: rename it "${prefix}<name>" ` +
        `(the package name follows the id, and an npm name is permanent)`,
    );

  const parent = parentOf(code, workspace);
  if (parent) {
    const { linked, wanted } = nesting(dir, parent, workspace);
    if (!linked)
      blocking.push(
        `nests in "${parent}" and does not say so: its culture-position must link ` +
          `${wanted}, because a sub-national culture is a way of being the culture above it`,
      );
  }
  return verdict(blocking);
}

export function conformance(id, workspace = WORKSPACE) {
  // Empty here means "not a sub-national unit", which is the right answer for a
  // country-level culture and the wrong one for an id that names nothing. Both
  // used to get it, so a group and a misspelling read as conformant. Resolve
  // first, then decide whether the wall applies.
  const dir = cultureDir(id, workspace);
  if (!dir || !existsSync(dir))
    throw new Error(
      `culture_conformance: "${id}" has no culture directory. Only culture ids ` +
        `reach here; a unit that is not a culture must be split off with ` +
        `cultureUnits() before it is asked how it nests.`,
    );

  if (!hasGeo(id, workspace)) return maplessConformance(id, dir, workspace);

  const code = iso(id, workspace);
  if (!code)
    return verdict([
      `has a geo.json that declares no usable "iso" - absent, empty, or ` +
        `unreadable. A culture is mapped or it is not, and a sidecar that says ` +
        `nothing is the one thing this wall cannot route on: give the file its ` +
        `ISO code, or delete the file and let the culture be mapless ` +
        `(management/orders/order_a_culture_without_a_map.md)`,
    ]);
  if (!code.includes("-")) return verdict([]);

  return subnationalConformance(id, dir, code.split("-")[0], workspace);
}

function report() {
  let n = 0;
  const rows = [];
  for (const id of cultureIds()) {
    const { blocking, advisory } = conformance(id);
    if (blocking.length || advisory.length) {
      n++;
      rows.push([id, blocking.length, advisory.length]);
    }
  }
  console.log(`sub-national cultures not yet conforming: ${n}`);
  for (const [id, b, a] of rows) console.log(`  ${id}: ${b} blocking, ${a} advisory`);
}

function gate(base, head) {
  // Authored, not merely touched. A tongue move retargets a link in every culture
  // that casts the variety, and none of them asked for a rename.
  const { authored, spared } = authoredCultures(base, head);
  const touched = [...authored.keys()].sort();
  const note = relinkNote(spared);
  if (!touched.length) {
    console.log("Sub-national conformance: no culture authored.");
    if (note) console.log(note);
    return 0;
  }
  if (note) console.log(note);
  // A migrated group is a unit and not a culture. `conformance()` answered it
  // with an empty verdict - correctly, since a group has no parent ISO code to
  // nest under - and the count below then reported a culture this wall had
  // checked, which it had not. See
  // management/orders/order_a_group_is_not_a_culture.md.
  const { cultures: charged, notCultures } = cultureUnits(touched);
  const skipped = notCultureNote(notCultures);
  if (skipped) console.log(skipped);
  if (!charged.length) {
    console.log("Sub-national conformance: no culture authored.");
    return 0;
  }
  const seen = charged.map((id) => [id, conformance(id)]);
  for (const [id, { advisory }] of seen)
    for (const line of advisory) console.log(`::notice::${id}: ${line}`);
  const offenders = seen.filter(([, c]) => c.blocking.length);
  if (!offenders.length) {
    console.log(`Sub-national conformance OK: ${charged.length} authored culture(s).`);
    return 0;
  }
  console.error(
    "::error::Sub-national conformance: a culture you write in must come out conforming.",
  );
  for (const [id, { blocking }] of offenders)
    for (const line of blocking) console.error(`  ${id}: ${line}`);
  return 1;
}

/**
 * One culture, answered directly. Every report in this repository is something
 * someone will reach for with a grep, and a grep cannot tell an absent row from
 * a hidden one - which is how a culture carrying four dead entries got into a
 * branch as "clean". This report is not truncated, but the query is the safe
 * habit, so all three checks offer it.
 */
function reportCulture(id) {
  if (!cultureIds().includes(id)) {
    console.error(`no such culture: ${id}`);
    return 2;
  }
  const { blocking, advisory } = conformance(id);
  console.log(`${id}: ${blocking.length} blocking, ${advisory.length} advisory`);
  for (const f of blocking) console.log(`  blocking ${f}`);
  for (const f of advisory) console.log(`  advisory ${f}`);
  return 0;
}

// Only when run as a command. Without this the CLI fires on import, so one
// module importing the other would run its report as a side effect.
const isMain = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
const argv = isMain ? process.argv.slice(2) : [];
if (argv.includes("--culture")) process.exit(reportCulture(argv[argv.indexOf("--culture") + 1]));
else if (argv.includes("--report")) report();
else if (argv.includes("--gate")) {
  const base = argv[argv.indexOf("--base") + 1];
  const head = argv[argv.indexOf("--head") + 1];
  if (!base || !head) {
    console.error("usage: culture_conformance.mjs --gate --base <sha> --head <sha>");
    process.exit(2);
  }
  process.exit(gate(base, head));
}
