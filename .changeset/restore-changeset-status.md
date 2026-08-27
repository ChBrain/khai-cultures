---
---

Restores `changeset status`, which #416 broke.

Adding `workspaces` made this repository a workspace root, and changesets treats a
workspace root as the container rather than as a package it manages — so
`@chbrain/khai-cultures` stopped being visible to it and every changeset naming
the house errored. `workspaces` and the `dependencies` move both come back out.

Empty, because it ships nothing: the published manifest goes back to the shape
`0.290.1` already has, and only the container config and the lockfile move.

What #416 got right is kept — the tongues package packs `**/*.md` rather than
`*.md`, and its build runs inside the `version` script so its version cannot
drift off the language count.
