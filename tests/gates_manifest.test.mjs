// tests/preflight.mjs (retired alongside this house's adoption of `khai-tests
// gates`) read its wall list straight out of `.github/workflows/ci.yml`, and
// its own comment said why: "a gate added to CI is a gate this runs the same
// day. A second hand-maintained copy of the truth is the failure this house
// has already had once." The `gates` key in khai-guard.config.json is exactly
// that second copy -- a house DECLARES its walls now, rather than deriving
// them, which is the kit's whole point (one house's manifest is not another
// house's CI). But declared is not derived, and a manifest that quietly falls
// behind ci.yml is precisely the failure this house's own case (conduct.md law
// 6) is about. This is the wall that keeps the two honest: it re-derives the
// job list the way preflight did, and fails, naming the job, the day the
// manifest stops matching it.

import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

/** Every top-level job id under `jobs:` in ci.yml -- a 2-space-indented key,
 * the same shape preflight.mjs parsed. Regex over the YAML rather than a
 * parser dependency: the file has no anchors, aliases or flow mappings at
 * this level, and the retired runner ran this exact derivation against every
 * ci.yml revision the house has had. */
function ciJobs() {
  const yml = readFileSync(join(root, ".github/workflows/ci.yml"), "utf8").split("\n");
  const jobs = [];
  let inJobs = false;
  for (const line of yml) {
    if (/^jobs:\s*$/.test(line)) {
      inJobs = true;
      continue;
    }
    if (!inJobs) continue;
    const m = line.match(/^ {2}([A-Za-z0-9_-]+):\s*$/);
    if (m) jobs.push(m[1]);
  }
  return jobs;
}

/** A job with no local equivalent to declare, and so no gates entry is owed.
 * Both live in a workflow other than ci.yml (codeql.yml's hosted CodeQL scan;
 * release.yml's changesets-driven publish, gated on a repository secret), so
 * neither has ever been a job IN ci.yml. The list exists here, not because
 * ci.yml needs it today, but so a future ci.yml job named after either of
 * them documents its own exemption instead of demanding a gate nothing can
 * run locally. */
const CI_ONLY = ["codeql", "release"];

/** khai-tests runs `prettier --check` and then the vitest suite as two steps
 * of one job, and the manifest declares them as two separate walls (splitting
 * a wall is easier to read than one gate hiding a `&&`). That is the one job
 * whose correspondence cannot be the automatic "khai-<x>" -> gate named "<x>"
 * every other job gets by stripping its own prefix, so it is named once, here,
 * rather than folded into the general rule. */
const SPLIT = { "khai-tests": ["prettier", "conformance"] };

/** khai-<x> -> x, lowercased and stripped to alphanumerics, so "khai-branch-
 * scope" reads as "branchscope" against a gate named "branch-scope" without
 * this test caring which of the two spellings either side used. */
function normalize(name) {
  return name
    .toLowerCase()
    .replace(/^khai-?/, "")
    .replace(/[^a-z0-9]/g, "");
}

describe("the gates manifest still covers every job ci.yml declares", () => {
  const jobs = ciJobs();
  const { gates } = JSON.parse(readFileSync(join(root, "khai-guard.config.json"), "utf8"));
  const gateNames = (gates ?? []).map((g) => g.name);
  const normalizedGates = gateNames.map(normalize);

  it("parses at least one job (a parse that finds nothing must not pass)", () => {
    // Anti-vacuous, the same shape as preflight's own guard: it refused to
    // report a clean run over fewer than five parsed jobs, on the grounds that
    // silence is the one result a gate runner may never give.
    expect(jobs.length).toBeGreaterThan(0);
    expect(jobs).toContain("khai-tests");
  });

  it("every khai-* job has a gates entry, or is named in CI_ONLY", () => {
    const missing = jobs
      .filter((job) => job.startsWith("khai-"))
      .filter((job) => {
        if (SPLIT[job]) return !SPLIT[job].every((name) => gateNames.includes(name));
        if (CI_ONLY.includes(normalize(job))) return false;
        return !normalizedGates.includes(normalize(job));
      });
    expect(
      missing,
      `job(s) with no corresponding wall: ${missing.join(", ")}. Declare each in ` +
        `khai-guard.config.json's "gates", or add it to CI_ONLY above if it has no ` +
        "local equivalent to run.",
    ).toEqual([]);
  });
});
