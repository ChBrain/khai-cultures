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
