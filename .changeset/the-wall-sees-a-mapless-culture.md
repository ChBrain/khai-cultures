---
---

**`subnational-conformance` sees a culture with no map.**

The wall read `geo.json` for an ISO code and returned an empty verdict when
there was none, so a mapless culture was skipped whole and one nesting in
nothing would have passed. The sidecar now routes rather than gates: absent is
mapless, present-but-silent is a broken sidecar and charged, no dash is
country-level, a dash is sub-national as before.

A mapless culture takes its host from its id prefix, because nothing else in a
unit without a sidecar can name one, and must link that host's culture-position.
A `_minority` id must link a second parent.

`parentOf`'s ISO index was one map for the process. A test that builds a fixture
house would have been handed the real house's answers - green for the wrong
reason - so it is keyed by workspace.
