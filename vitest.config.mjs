import { defineConfig } from "vitest/config";

// Vitest globs test files from the repository root, and a subagent worktree under
// `.claude/worktrees/` is a full checkout of this repository - so every test file
// in it is discovered a second time and run against that copy. When a worktree has
// no `node_modules` of its own, the manifest reads in `house.test.mjs` fail there
// and report as failures of this repository's suite, which they are not.
//
// `.gitignore` keeps those worktrees out of git; this keeps them out of the test
// run. CI is unaffected either way, because a fresh checkout has no worktrees -
// which is exactly why it is worth writing down: the failure appears only on the
// machine doing the work, and only while an agent is running.
export default defineConfig({
  test: {
    exclude: ["**/node_modules/**", "**/dist/**", ".claude/**"],
  },
});
