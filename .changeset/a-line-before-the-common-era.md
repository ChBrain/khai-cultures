---
---

**A year is a magnitude and a direction, and the direction went unwritten.** Every plot line in
this house ran after the common era, so `plot_sequence` compared magnitudes and never needed to
know which way time went. Staging a line that runs 113 to 101 read as **backwards** — forwards
in time, decreasing as integers.

`yearIn` now reads an era marker immediately after the year and returns a negative year for one
before the common era, so ordering a line stays arithmetic rather than becoming a special case.
Markers are per language because the prose is per language: `BC`, `BCE`, `f. Kr.`, `v. Chr.`,
`av. J.-C.`, `a. C.`, `p.n.e.`

**A marker this list misses costs a false "backwards", never a silent pass** — the safe
direction to fail, and why it can be extended later without anything having shipped wrong.

Measured before trusting it: every plot year in the house, all **719** of them, parsed before
and after. Nothing moved.

**And `cultures()` now declines a sunken unit.** `order_the_sunken.md` says the culture count
must not move by a sunken play existing, then says nothing in the non-culture split "needs to
learn the word sunken". That is true of `cultureUnits`, which splits on membership of
`cultureIds()` — and false of `cultures()`, which _defines_ that membership. It filtered
migrated groups out by directory and filtered nothing else. A sunken package walks straight
in, the umbrella's minor moves, the registry counts a culture that is not one, and the
complete-theatre wall demands a pitch of a people that ended in 101 BC.

Found by being handed one, which is the same way the walls found out about groups, and the
order now records the correction rather than the prediction.

Both of these are the verifiers, so they land before the play that needed them — `branch-scope`
is right that tests go first and source second.
