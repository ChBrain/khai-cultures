---
---

The guard config and CLAUDE.md learn the workspace layout, before the move.

Same reason the verifiers did in the pull request before this one, and a second
reason found by CI: a `chore` branch may not touch `CLAUDE.md` or
`khai-guard.config.json`, both governance-owned, so the move cannot carry its own
config change. It comes here instead, and the move then rides a `culture` branch
touching only content and shared files.

Every pattern names **both** layouts. Nothing is frozen between this and the move,
and — the part CI caught — a `play_*.md` renamed out of `cultures/` still pairs
with its arrival under `packages/khai-cultures/cultures/`. With only the new
pattern listed, the guard read 290 renames as 290 new cultures and demanded a
`minor` changeset for a move that adds nothing.

The old patterns come out once the move has landed.
