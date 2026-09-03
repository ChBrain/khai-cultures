---
---

**France leaves the umbrella.**

`node tests/migrate_culture.mjs france --write`: the directory moves to
`packages/khai-cultures-france`, the manifest declares the tongues and the two
engines, and ten inbound links elsewhere in the house are rewritten from the
relative path to the package specifier. France itself carried no outbound
culture links, so nothing of its own needed rewriting.

It was one of four cultures the queue reported ready. Nothing is authored here:
the prose is the prose France already had, and its nine plots, four positions and
two plans move unchanged.

**Why now.** `fr_corsica` follows, and it cannot be a package while its parent is
a directory. `tests/culture_conformance.mjs` requires a sub-national culture to
link its parent's culture-position, and the required form follows the parent's
home: `../france/position_culture_*.md` while France is under the umbrella, the
package specifier once it is not. A migrated child may not carry `../` at all -
it would escape its own package and fail the publish invariant - so a package
child of an umbrella parent has no legal form of the link. France moves first or
Corsica cannot be written at all.
