# Company coverage: the ratchet

**Status:** design of record for the company-coverage gate, adopted 2026-08-25. The rule itself is in `REFERENCES.md` (Restrictions) and [`AGENTS.md`](../../AGENTS.md) (Coverage); the implementation is `tests/company_coverage.mjs`, gated by the `khai-company-coverage` job in CI.

## The finding

A play declares a closed cast in its `## Company` and its plots field that cast by linking it. The kit reports an element no plot fields as a warning, and because a warning fails nothing, the house had accumulated them since the first culture landed.

Measured across all 290 cultures on 2026-08-25: **1,967 dead entries, 40.9% of the 4,807 Company elements in the house, and not one culture at zero.** The median culture carried seven; the worst carried fifteen.

| Kind              | Uncast | Of kind | Reading                   |
| ----------------- | ------ | ------- | ------------------------- |
| culture-position  | 251    | 87%     | held one way              |
| language position | 275    | 86%     | held one way              |
| process           | 460    | 82%     | counted                   |
| plan              | 234    | 80%     | orders personas           |
| piece             | 354    | 61%     | counted                   |
| persona           | 286    | 24%     | counted                   |
| stance position   | 76     | 11%     | counted                   |
| place             | 31     | 5%      | counted                   |
| pitch             | 0      | 0%      | already exempt in the kit |

## What is not a dead entry

Places and stance positions are over 90% cast, so the check works where a scene really does field the element. The mass of the warnings sits in kinds the house's own contract never asked a plot to field:

- A **pitch** keys the run and is never fielded in a scene. The kit already exempts it, with that reasoning in `castingCoverageErrors`. That carve-out is the precedent for the rest.
- A **position** is held one way. `REFERENCES.md` is explicit: a persona links its position, a position never links or names a persona. An uncast culture-position or language variety is the contract working.
- A **plan** issues orders to personas. It is a directive, not a thing fielded in a scene.

Excluding those three leaves **1,207** entries that mean what they say, of which 286 are personas (mostly the living generation, uncastable by historical plots without anachronism) and 921 are places, pieces, processes and stances a culture advertises and never uses.

## Why a ratchet and not a sweep

1,207 fixes is a campaign nobody will finish, and a sweep would produce exactly the wrong content: plots casting elements to satisfy a counter. The gate instead asks nothing of a culture until a pull request is already working in it, and then asks for all of it: **touch a culture and it must come out at zero.**

Two properties follow. Dead entries can only be created by editing a culture's own files, which is precisely what trips the gate, so no baseline file is needed and the debt cannot grow. And a new culture, absent from every history, must ship clean on its first commit.

## The waiver

Some elements cannot be cast without contrivance. Germany's Jonas was born after reunification and the play's last plot is 1989/90; casting him in it would be a lie for a counter. Those are waived in `cultures/<id>/coverage-waivers.json`, one line per element, with a written reason. The house test holds the valve honest: a waiver must name a real culture, a real uncast element, and carry a reason of substance, and a waiver that goes stale (the element got cast, or was dropped) fails until it is removed.

A waiver lives with its culture rather than in a house-wide file, for two reasons. It is read in the same diff as the casting it excuses, and it is inside `cultures/**`, so the culture PR that needs it can write it without crossing the source/test separation gate: a waiver file under `tests/` could only be edited from a governance branch, which is precisely the branch that never touches a culture. That flaw shipped in the first cut of this gate and was found by the first PR that needed a waiver. `node tests/company_coverage.mjs --report` lists every waiver in the house, so auditing them stays one command.

Waivers are visible, reviewable and few by construction. A culture full of them is a culture that has not done the work, and that shows in the diff.

## What this does not do

It does not touch the kit. `@chbrain/khai-tests` still warns on all 1,967, including the 760 its own contract exempts in principle; narrowing `castingCoverageErrors` to match belongs there, not here. Until then the house reads those warnings through this document.
