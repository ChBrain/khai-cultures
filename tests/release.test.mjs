// The release workflow calls what it says it calls.
//
// This exists because the khai monorepo's release was down for four consecutive
// runs and nothing said so. A dependabot bump moved it to changesets/action v2,
// which RENAMED its inputs -- `version` -> `version-script`, `publish` ->
// `publish-script` -- and the action refuses to run under the old names rather
// than falling back. `npm test` stayed green in every failed run, because the
// failure is in the last step of a job whose visible work all passes, and the
// only downstream symptom is that a release does not appear.
//
// This house was down the same way earlier, for four hours, for the same reason.
// Neither outage was caught by anything; both were noticed by a person wondering
// where a Version Packages pull request had got to.
//
// So the input NAMES are pinned, and they are pinned rather than merely the
// script names because the name is the load-bearing half: under the wrong one the
// action does not degrade, it refuses. A test that pins an external contract has
// to be re-pinned when that contract moves -- khai's equivalent was written
// against v1 and went on asserting the broken spelling was present, certifying
// the failure through four dead releases.
//
// Deliberately NOT pinned here: `push-with-git-cli`. khai needs it because it
// ships CLI entry points and v2 writes the release branch through the GitHub
// API, which has no mode for an executable file. This house tracks zero
// executable files, so the API path never meets one and the setting would be
// cargo. Copying a pin that works elsewhere is how the wrong thing gets asserted
// confidently.

import { describe, it, expect } from "vitest";
import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const WORKFLOW = join(ROOT, ".github/workflows/release.yml");

describe("release: the workflow invokes this repo's own scripts", () => {
  it("passes the version script under the input name changesets v2 requires", () => {
    const wf = readFileSync(WORKFLOW, "utf8");
    expect(wf).toMatch(/version-script:\s*npm run version/);
  });

  it("passes the publish script under the input name changesets v2 requires", () => {
    const wf = readFileSync(WORKFLOW, "utf8");
    expect(wf).toMatch(/publish-script:\s*npm run release/);
  });

  it("keeps the scripts it names, so the workflow never points at nothing", () => {
    // The other half of the same claim: pinning the invocation is worthless if
    // the script it invokes has been renamed away underneath it.
    const scripts = JSON.parse(readFileSync(join(ROOT, "package.json"), "utf8")).scripts ?? {};
    expect(typeof scripts.version).toBe("string");
    expect(typeof scripts.release).toBe("string");
  });

  it("does not pass a GITHUB_TOKEN env var beside the github-token input", () => {
    // v2's second break, and the one that only becomes visible after the first is
    // fixed: the action has a `github-token` input defaulting to the built-in
    // token, and refuses to run when a GITHUB_TOKEN env var is set to something
    // else. The PAT belongs in the input.
    //
    // Scoped to the changesets STEP, and the first draft was not -- it read the
    // whole file and failed on the `install` step, where `npm ci` needs
    // GITHUB_TOKEN to reach GitHub Packages and is entitled to it. A workflow-wide
    // assertion about one step's environment is the wrong claim however right it
    // looks; the step is the unit.
    const wf = readFileSync(WORKFLOW, "utf8");
    const step = wf.slice(wf.indexOf("changesets/action@"));
    expect(step).toMatch(/github-token:\s*\$\{\{\s*secrets\./);
    expect(step).not.toMatch(/^\s*GITHUB_TOKEN:/m);
  });

  it("has a workflow to pin at all", () => {
    expect(existsSync(WORKFLOW)).toBe(true);
  });
});
