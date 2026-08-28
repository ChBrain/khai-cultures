---
---

The verifiers learn where the house will be, before it moves there.

The repository is becoming a workspace on khai’s shape: a private root that
publishes nothing, with the house as a package beneath it. The move and the
verifiers cannot travel together — the source/test gate forbids it, and rightly,
but a restructure couples them by nature: the tests must point at the new place in
the same commit that creates it.

So they point at both. Each root resolver looks for the house package and falls
back to the repository root, which is true in either layout and green in both.
The move follows in its own pull request, touching no test path.

`tongues_standalone` gains a second root because it needs two: the workspace holds
the package it reads, the house package holds the cultures it reads that package
against.
