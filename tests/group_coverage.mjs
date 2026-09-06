/**
 * The group ratchet: a group you write in comes out whole.
 *
 * Every content wall in this house rides the cultures. Nothing rode the groups,
 * and it showed: of the twenty-one groups with a play, seventeen carried a
 * `## Triggers` chapter that linked no plot at all, and thirteen of those
 * seventeen had four plot files sitting unlinked in the same directory. The EU
 * is the sharp case - `plot_01` through `plot_04` on disk, and a Triggers
 * chapter naming four themes and pointing at none of them.
 *
 * The four groups that are whole are whole because somebody did it by hand in
 * the pull request that touched them. That is not a standard, it is a habit,
 * and a habit is what a ratchet is for.
 *
 * Same shape as the other four, and for the same reasons. It fires on the
 * groups a pull request AUTHORS - not the ones a link rewrite passed through,
 * because every Nordic culture migration retargeted links inside `groups/eu`
 * and `groups/nato`, and charging those two for a plot line they had no part in
 * would be answered with a bad plot line or with no migration. So the debt only
 * ever shrinks, nobody pays for a group they did not open, and the house is
 * never red.
 *
 * See management/orders/order_the_group_ratchet.md.
 */
import { execFileSync } from "node:child_process";
import { readdirSync, readFileSync, existsSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

import { linkBasenames, section, isOneWay } from "./company_coverage.mjs";
import { houseGroups, migratedGroups, relinkOnly } from "./culture_sources.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const WORKSPACE = join(HERE, "..");

/** Every group, in both homes: `{ id, dir, migrated }`, sorted by id. */
export function groups() {
  const out = houseGroups().map(([id, dir]) => ({ id, dir, migrated: false }));
  for (const g of migratedGroups()) out.push({ id: g.id, dir: g.dir, migrated: true });
  return out.sort((a, b) => a.id.localeCompare(b.id));
}

/** One group's directory, wherever it lives. Null for an id the house has not got. */
export function groupDir(id) {
  return groups().find((g) => g.id === id)?.dir ?? null;
}

/** Every group id. */
export const groupIds = () => groups().map((g) => g.id);

/**
 * The group a repository-relative path belongs to, or null.
 *
 * Both homes, because a group is under the umbrella until the day it is not,
 * and a ratchet that only knew one of them would go quiet on migration - which
 * is the exact failure `touchedCultures` already had once and paid for.
 */
export function pathGroup(p) {
  const s = String(p).trim().replace(/\\/g, "/");
  for (const g of groups()) {
    const prefix = `${g.dir.replace(/\\/g, "/").slice(WORKSPACE.length + 1)}/`;
    if (s.startsWith(prefix) && s.length > prefix.length) return g.id;
  }
  return null;
}

/**
 * What one group still owes.
 *
 * `{ unlinked, orphans, broken, dead, noOrigin, noPresent, plots, entries }`.
 * Everything is a basename, so a caller prints it without splitting a path.
 */
export function coverage(id) {
  const empty = {
    unlinked: [],
    orphans: [],
    broken: [],
    dead: [],
    noOrigin: false,
    noPresent: false,
    plots: [],
    entries: 0,
  };
  const dir = groupDir(id);
  if (!dir || !existsSync(dir) || !statSync(dir).isDirectory()) return empty;
  const files = readdirSync(dir).filter((f) => f.endsWith(".md"));
  const playFile = files.find((f) => f.startsWith("play_"));
  if (!playFile) return empty;
  const text = readFileSync(join(dir, playFile), "utf8");
  const plots = files.filter((f) => f.startsWith("plot_")).sort();

  // Triggers. An entry is a bold line; the chapter's job is to chain the plots,
  // so an entry that links no plot is a summary standing where a chain belongs,
  // and a plot no entry links is a scene the play does not know it has.
  const trig = section(text, "Triggers") ?? "";
  const blocks = trig
    .split(/\n(?=\*\*)/)
    .map((b) => b.trim())
    .filter((b) => b.startsWith("**"));
  const unlinked = [];
  const linked = new Set();
  const broken = [];
  for (const b of blocks) {
    const hits = linkBasenames(b).filter((f) => f.startsWith("plot_"));
    if (!hits.length) {
      unlinked.push(b.split("\n")[0].replace(/\*\*/g, "").trim());
      continue;
    }
    for (const f of hits) {
      linked.add(f);
      if (!files.includes(f)) broken.push(f);
    }
  }
  const orphans = plots.filter((f) => !linked.has(f));

  // Company. Only the group's OWN files are charged: a member and a cast entry
  // borrowed from one are package-qualified links out, and a group does not
  // stage another play's material, it points at it.
  const compBody = section(text, "Company") ?? "";
  const own = new Set(
    linkBasenames(compBody).filter(
      (f) => files.includes(f) && !f.startsWith("play_") && !isOneWay(f),
    ),
  );
  const cast = new Set();
  for (const p of plots)
    for (const b of linkBasenames(readFileSync(join(dir, p), "utf8"))) cast.add(b);
  const dead = [...own].filter((f) => !cast.has(f)).sort();

  return {
    unlinked,
    orphans,
    broken: [...new Set(broken)].sort(),
    dead,
    noOrigin: !plots.some((f) => f.startsWith("plot_00")),
    noPresent: !plots.some((f) => f.startsWith("plot_99")),
    plots,
    entries: blocks.length,
  };
}

/** One group's blocking findings, as lines. */
export function findings(id) {
  const c = coverage(id);
  const out = [];
  if (c.unlinked.length)
    out.push(`${c.unlinked.length} Trigger entr(y/ies) link no plot: ${c.unlinked.join("; ")}`);
  if (c.orphans.length)
    out.push(`${c.orphans.length} plot(s) no Trigger entry chains: ${c.orphans.join(", ")}`);
  if (c.broken.length)
    out.push(
      `${c.broken.length} Trigger link(s) point at a plot that is not here: ${c.broken.join(", ")}`,
    );
  if (c.dead.length)
    out.push(`${c.dead.length} own Company element(s) no plot fields: ${c.dead.join(", ")}`);
  if (c.noOrigin) out.push("no plot_00: the play does not say where the grouping comes from");
  if (c.noPresent) out.push("no plot_99: the play does not say where it now stands");
  return out;
}

/** The house-wide picture. Not truncated: twenty-one rows is a list someone reads. */
function report() {
  const rows = groupIds().map((id) => [id, findings(id)]);
  const owing = rows.filter(([, f]) => f.length);
  for (const [id, f] of rows) console.log(`  ${id}: ${f.length} finding(s)`);
  console.log(`groups: ${owing.length} of ${rows.length} owing`);
  console.log(`group findings house-wide: ${rows.reduce((n, [, f]) => n + f.length, 0)}`);
}

/** One group, answered directly, so nobody has to grep a list. */
function reportGroup(id) {
  if (!groupIds().includes(id)) {
    console.error(`no such group: ${id}`);
    return 2;
  }
  const f = findings(id);
  console.log(`${id}: ${f.length} finding(s)`);
  for (const line of f) console.log(`  ${line}`);
  return 0;
}

/**
 * The groups a change AUTHORS, and the ones it only passed through.
 *
 * The same rule the culture ratchets use and for the same reason: a group is
 * authored when any of its changed files differs in something other than the
 * target of a markdown link. A member becoming a package rewrites every link to
 * it in the groups that hold it, and none of those groups asked.
 */
export function authoredGroups(base, head) {
  const lines = execFileSync("git", ["diff", "--name-status", "-M", base, head], {
    encoding: "utf8",
    maxBuffer: 32 * 1024 * 1024,
  })
    .split("\n")
    .filter(Boolean);
  const byGroup = new Map();
  for (const line of lines) {
    const parts = line.split("\t");
    const status = parts[0];
    const pair = status.startsWith("R")
      ? { from: parts[1], to: parts[2] }
      : status === "A"
        ? { from: "", to: parts[1] }
        : status === "D"
          ? { from: parts[1], to: "" }
          : { from: parts[1], to: parts[1] };
    const id = pathGroup(pair.to || pair.from);
    if (!id) continue;
    const authored = !relinkOnly(pair, base, head);
    const seen = byGroup.get(id) ?? { authored: false, paths: [] };
    seen.authored ||= authored;
    if (authored) seen.paths.push(pair.to || pair.from);
    byGroup.set(id, seen);
  }
  const authored = [...byGroup]
    .filter(([, v]) => v.authored)
    .map(([id]) => id)
    .sort();
  const spared = [...byGroup]
    .filter(([, v]) => !v.authored)
    .map(([id]) => id)
    .sort();
  return { authored, spared };
}

function gate(base, head) {
  const { authored, spared } = authoredGroups(base, head);
  if (spared.length)
    console.log(
      `  ${spared.length} group(s) were only relinked, moved or repackaged and are not ` +
        `charged: ${spared.join(", ")}`,
    );
  if (!authored.length) {
    console.log("Group ratchet: no group authored.");
    return 0;
  }
  const offenders = authored.map((id) => [id, findings(id)]).filter(([, f]) => f.length);
  if (!offenders.length) {
    console.log(`Group ratchet OK: ${authored.length} authored group(s), all whole.`);
    return 0;
  }
  console.error("::error::Group ratchet: a group you write in must come out whole.");
  for (const [id, f] of offenders) {
    console.error(`  ${id}: ${f.length} finding(s)`);
    for (const line of f) console.error(`    ${line}`);
  }
  console.error(
    "\n  A group's Triggers chapter chains its plots, the same as a culture's: one bold\n" +
      "  entry per plot, each one a link. A summary standing where the chain belongs is\n" +
      "  how a play ends up with four plots nothing points at.\n" +
      "  Its own Company must be staged in its own plots; members and anything borrowed\n" +
      "  from a member are links out and are never counted.\n" +
      "  plot_00 says where the grouping comes from and plot_99 where it now stands.\n" +
      "  See management/orders/order_the_group_ratchet.md and order_plot_zero.md.",
  );
  return 1;
}

// Only when run as a command, so an import never fires the CLI.
const isMain = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
const argv = isMain ? process.argv.slice(2) : [];
if (argv.includes("--group")) process.exit(reportGroup(argv[argv.indexOf("--group") + 1]));
else if (argv.includes("--report")) report();
else if (argv.includes("--gate")) {
  const base = argv[argv.indexOf("--base") + 1];
  const head = argv[argv.indexOf("--head") + 1];
  if (!base || !head) {
    console.error("usage: group_coverage.mjs --gate --base <sha> --head <sha>");
    process.exit(2);
  }
  process.exit(gate(base, head));
}
