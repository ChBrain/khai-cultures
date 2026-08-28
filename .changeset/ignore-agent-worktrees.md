---
---

**Subagent worktrees stop showing up as untracked files.**

The agent runtime gives each subagent its own git worktree under
`.claude/worktrees/`, so that parallel agents cannot collide on the same files.
Each is a full checkout of this repository, created and removed by the runtime.
None of it is repository content, and none of it should ever be committed: a
worktree checked in would be the house inside the house.

`.claude/` is now ignored. One line, and the working tree is clean again while
agents are running.

**And out of the test run.** Vitest globs from the repository root, so a worktree
is discovered a second time and every test file in it runs against that copy. A
worktree without its own `node_modules` then fails the manifest reads in
`house.test.mjs`, and reports them as failures of this suite. That happened during
review of the first Länder batch and cost a few minutes deciding whether the
content or the tooling was wrong.

`vitest.config.mjs` excludes `.claude/**`. Verified live, with four agent
worktrees on disk: with the config, 322 pass; with it removed, the same run fails
in two of the four worktrees.

CI never saw either problem, because a fresh checkout has no worktrees. That is
the reason to write it down rather than remember it: the failure appears only on
the machine doing the work, and only while an agent is running.
