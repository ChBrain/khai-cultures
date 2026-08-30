---
---

**A chapter is written, and a plot stages a scene.** Two facts nothing in this
house was checking.

Every gate here until now checked that something _exists_: the canon checks a
plot has a Cue, coverage checks a Company element is named in some Stage, plot
zero checks a file called `plot_00` is on disk. None of them opens the chapter,
and none asks whether the casting means anything.

A pull request arrived that passed all of them and was scaffolding. Its plot
chapters read `(cue)` and `(action)`, its personas read `(proj)`, `(shadow)`,
`(tell)`, and every plot in every one of its three cultures staged the identical
full Company list. Coverage reported zero for all three - honestly, because it
cannot tell the difference - and the whole suite was green. One Tension said the
quiet part in its own prose: _"Placeholder for the actual tension, casting all
company members to satisfy the gate."_

`tests/staging.mjs` holds the two decidable facts, and **neither is a ratchet**,
because both start clean across all 297 cultures - the same footing the tongues
check stands on.

- **Substance.** A canon chapter carries prose: no placeholder, no body under
  forty characters. The floor is measured from the house itself rather than
  invented - across 26,342 canon chapters the shortest real one is forty-two,
  Bashō's Tell in `japan/persona_basho.md`, short because CJK is dense and not
  because it is unwritten. The first permille sits at 63 and the median at 308.
- **Scene.** A culture with three or more plots does not stage one single cast
  throughout. Coverage asks whether every Company element is fielded by a scene;
  a play that lists the whole Company under every plot answers that with a
  tautology. No culture in this house does it.

Verified in both directions: 0 findings on `main`, **138 on the pull request that
prompted it** - 135 unwritten chapters and all three cultures staging one cast.

Neither rule is a quality bar and neither may be used as one. A culture can clear
both and still be thin; whether a chapter is _true_ stays the dialogue the
defining question protects. This gate holds the floor and nothing above it.

Wired as `khai-staging` in CI, asserted in `house.test.mjs`, and written into
`CLAUDE.md`. Ships nothing, so an empty changeset.
