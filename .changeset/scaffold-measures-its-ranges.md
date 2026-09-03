---
---

The scaffold no longer types the dependency ranges it writes. It reads each one
from the workspace as it stands - the parent culture and tongues from
`packages/`, the two engines from `node_modules/` - and emits `^` against the
version it measured.

Two changesets already stand on this class of mistake. The tongues build updates
every dependant in the workspace when its own version moves, and the production
gate checks the result independently. Neither reaches a package that does not
exist yet, and the scaffold was writing `^0.27.0` against a workspace at 0.28.0:
a caret on a 0.x minor does not reach across it, so npm falls through to the
registry and 404s. That is the range Corsica shipped with and had corrected by
hand in the same pull request.

The build heals a range that went stale. This closes the other half, where the
range was stale the moment it was written. Where a name cannot be resolved the
scaffold now stops and says to run `npm install` first, rather than writing a
number nothing was measured from. Ships nothing.
