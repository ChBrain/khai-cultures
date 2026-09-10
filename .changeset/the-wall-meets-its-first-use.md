---
---

Three repairs to the plot-order wall of #675, all of them found by using it once.

I went to fix the first thing that wall demanded — `es_canary_islands`, the
disordered line I shipped myself at #670 — and the wall did not charge the fix.
That is how these came out.

**1. It did not charge a renumber.** The remedy the wall asks for is usually to
move a plot's number, and a renumber carries the plot's bytes unaltered. The gate
decided scope by comparing content, so a renumber reported nothing changed and
the unit was never re-read. **The one repair this wall exists to demand was the
one thing it could not verify.** It now charges a rename whose plot _number_
moved, regardless of content — while a migration, which renames every plot
byte-identically but keeps its numbers and only changes the home, stays spared.

**2. Scope was read from the working tree, not from the commits.** This one is
worse and it is in two walls. Both this wall and `diacritic_conformance.mjs`
resolved each changed path against the file on disk. The gates invoke them with
`--head $(git rev-parse HEAD)` on a checked-out head, so disk and head agree in
ordinary use and it looked fine — until the first replay of an older range, where
every path resolved to a file that does not exist on the branch in hand, the scope
came back empty, and the gate reported `no plot prose written`. **A gate that goes
quiet when it cannot find a file passes for the wrong reason.** Both now read
content from the commits. The boundary that remains is stated in the code: scope
comes from the commits, order comes from the tree, so the gate is defined for a
checked-out head, which is how it is invoked.

**3. A test asserted a census instead of a contract.** The first draft asserted
that `es_canary_islands` was among the offenders. The next change fixed
`es_canary_islands`, and the test failed — correctly, and for the wrong reason. A
wall's tests must hold what does not move. It now asserts the invariant:
`findings()` reports a unit if and only if that unit really has a pair running
backwards. Plus a test for the renumber-versus-migration distinction.

**Verified on three ranges**, which is the only reason to believe any of it:

| range                                                | expected           | got     |
| ---------------------------------------------------- | ------------------ | ------- |
| #670, which wrote brackets around a backwards middle | refuse             | refused |
| the parked `es_canary_islands` renumber              | charge, then judge | charged |
| #673 Melilla's migration, plots moved unaltered      | spare              | spared  |

Counts, run rather than assumed: `npm test` 414 passing; plot lines out of order
unchanged at 23, since nothing was repaired here — the repair is the next change,
and now it will be checked.

The lane rule is what put this first: the fix lives in `tests/**` and the
`es_canary_islands` renumber lives in `packages/**`, and khai-guard refuses the
mix. The renumber is parked on its branch and comes next.
