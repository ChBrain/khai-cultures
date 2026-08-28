---
"@chbrain/khai-cultures": patch
---

The groups were never in the tarball.

`files` listed `cultures/**` and not `groups/**`, so `npm pack` produced 7,038
files and **not one of the 19 groups** — the Anglosphere, ASEAN, the Baltics,
DACH, the EU, the Visegrád four and thirteen more, 114 files in all. They are
the second half of what CLAUDE.md says this package is: _the cultures, the
groups, the registry._

It is the tongues bug again, one package over and caught before the release
instead of after. There, `files: ["*.md"]` packed 5 of 65 because every variety
lives in a subdirectory. Here the pattern was right and the directory was
missing, and the effect is identical: **`registry.json` ships describing all 19
groups, and every path it names 404s** for anyone who installs the house rather
than checking it out.

Nothing else had to change. The linkage runs one way — 873 links from the groups
into the cultures, none the other way — so the cultures were always
self-sufficient and the groups were the only casualty. With them packed, all
1,043 relative links inside `groups/**` resolve within the tarball, checked by
resolving each one against the packed tree.

7,038 files becomes 7,152.
