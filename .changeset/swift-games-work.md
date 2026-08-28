---
---

The changeset wall asserted a non-empty corpus, and failed the one branch where
empty is correct.

`tests/changesets.test.mjs` opened with an anti-vacuity check -- a reader that
matched nothing must not pass the wall in silence -- and reached for a count:
`expect(changesets.length).toBeGreaterThan(0)`. The intent was right and the
instrument was wrong. The corpus is empty on exactly one branch,
`changeset-release/main`, because `changeset version` has consumed every
changeset there, and that is the correct state. So the wall failed the **Version
Packages** pull request -- the one branch whose whole job is to publish -- and
blocked the release it was written to protect, in this house and in the misfits
house, on the first release after it shipped.

The replacement holds on every branch: the two packages are found and the
changeset directory is the one changesets itself reads. **The real guard was
already there and needed no corpus**: the parser is proved on literal inputs,
which is where a reader that matched nothing actually shows. A count only ever
proved that somebody had written a changeset lately.

The shape is the mirror of the one this house keeps writing down about gates that
pass by checking nothing: **a check whose precondition is "there is work here"
fails on the branch that has finished the work.** Verified against both states --
a full `main`, and zero changesets on the release branch.
