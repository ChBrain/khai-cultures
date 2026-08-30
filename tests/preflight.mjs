#!/usr/bin/env node
// Run every gate CI runs, locally, before the push.
//
// The gates are real and there are ten of them, spread across `npx khai-guard`,
// `npm test` and seven `node tests/*.mjs` invocations, each with its own flags.
// Knowing that list was tribal: a contributor who ran eight of ten learned about
// the other two from a red pull request, and one who ran none learned nothing at
// all until review.
//
// The list is not repeated here. It is READ FROM `.github/workflows/ci.yml`, so
// a gate added to CI is a gate this runs the same day. A second hand-maintained
// copy of the truth is the failure this house has already had once: two brief
// files, one of them current.
import { execFileSync, spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const root = execFileSync("git", ["rev-parse", "--show-toplevel"], { encoding: "utf8" }).trim();
const git = (...a) => execFileSync("git", a, { cwd: root, encoding: "utf8" }).trim();

// CI compares a pull request's base against its head. Locally the equivalent is
// the merge base with origin/main: the commit this branch actually departs from.
const ref = git("rev-parse", "--abbrev-ref", "HEAD");
const head = git("rev-parse", "HEAD");
let base;
try {
  base = git("merge-base", "origin/main", "HEAD");
} catch {
  console.error("preflight: no origin/main to compare against — run `git fetch origin main`.");
  process.exit(2);
}

// The gates read committed history, not the working tree. A dirty tree means the
// run below is testing the last commit and NOT the edit in front of you, which
// is worth more than a footnote: it is the difference between a green preflight
// and a green push.
const dirty = git("status", "--porcelain");
if (dirty) {
  console.error(
    "preflight: uncommitted changes — the gates read commits, so these are NOT tested:",
  );
  for (const line of dirty.split("\n")) console.error(`  ${line}`);
  console.error("");
}

// Extract each job's gate commands from the workflow. Setup steps (`npm ci`) are
// the environment, not a gate, and are skipped.
function gatesFromWorkflow() {
  const yml = readFileSync(join(root, ".github/workflows/ci.yml"), "utf8").split("\n");
  const jobs = [];
  let current = null;
  let inJobs = false;
  for (const line of yml) {
    if (/^jobs:\s*$/.test(line)) {
      inJobs = true;
      continue;
    }
    if (!inJobs) continue;
    const job = line.match(/^ {2}([A-Za-z0-9_-]+):\s*$/);
    if (job) {
      current = { name: job[1], commands: [] };
      jobs.push(current);
      continue;
    }
    const run = line.match(/^ {8}run:\s+(.+?)\s*$/);
    if (run && current && run[1] !== "npm ci") current.commands.push(run[1]);
  }
  return jobs.filter((j) => j.commands.length);
}

// CI installs with `npm ci`, which refuses a lockfile that does not match the
// manifests. This runner does not install - it uses the node_modules already
// here - so a stale lockfile is invisible to every gate below and fatal to all
// ten above: on a new workspace package, CI failed each job in under twenty
// seconds at the install step, and not one of them on its own content. The
// dry run is the same check CI's install would make, and costs half a second.
function lockfileInSync() {
  const r = spawnSync("npm", ["ci", "--dry-run"], { cwd: root, encoding: "utf8" });
  if (r.status === 0) return true;
  const why = (r.stderr || r.stdout || "")
    .split("\n")
    .filter((l) => /can only install|Missing:|Invalid:|Added:|Removed:/.test(l))
    .map((l) => l.replace(/^npm error\s*/, "  "))
    .join("\n");
  console.error("preflight: package-lock.json does not match the manifests, so CI's `npm ci` will");
  console.error(
    "fail at install and every gate with it. Run `npm install` and commit the lockfile.\n",
  );
  if (why) console.error(why + "\n");
  return false;
}

const jobs = gatesFromWorkflow();
// If the workflow's shape changes, this script must fail loudly rather than
// quietly report that nothing is wrong. Silence is the one result a gate runner
// may never give.
if (jobs.length < 5) {
  console.error(
    `preflight: parsed only ${jobs.length} gate job(s) from ci.yml — the workflow's shape has changed and this script needs updating.`,
  );
  process.exit(2);
}

const only = process.argv.includes("--job")
  ? process.argv[process.argv.indexOf("--job") + 1]
  : null;
const selected = only ? jobs.filter((j) => j.name === only) : jobs;
if (only && !selected.length) {
  console.error(`preflight: no job named ${only}. Known: ${jobs.map((j) => j.name).join(", ")}`);
  process.exit(2);
}

const lockOk = lockfileInSync();
process.stdout.write(`${lockOk ? "PASS" : "FAIL"}  lockfile-in-sync\n`);

const env = { ...process.env, BASE_SHA: base, HEAD_SHA: head, HEAD_REF: ref };
const results = [];
for (const job of selected) {
  let ok = true;
  let output = "";
  const started = Date.now();
  for (const cmd of job.commands) {
    const r = spawnSync(cmd, { cwd: root, env, shell: true, encoding: "utf8" });
    output += (r.stdout || "") + (r.stderr || "");
    if (r.status !== 0) {
      ok = false;
      break;
    }
  }
  results.push({ name: job.name, ok, output, ms: Date.now() - started });
  process.stdout.write(
    `${ok ? "PASS" : "FAIL"}  ${job.name} (${((Date.now() - started) / 1000).toFixed(1)}s)\n`,
  );
}

const failed = results.filter((r) => !r.ok);
for (const f of failed) {
  console.error(`\n${"-".repeat(70)}\n${f.name}\n${"-".repeat(70)}`);
  console.error(f.output.trimEnd());
}

console.log(
  `\n${results.length - failed.length + (lockOk ? 1 : 0)}/${results.length + 1} checks pass on ${ref} (${base.slice(0, 8)}..${head.slice(0, 8)})`,
);
if (dirty) console.log("Uncommitted changes were NOT tested — commit, then run again.");
process.exit(failed.length || !lockOk ? 1 : 0);
