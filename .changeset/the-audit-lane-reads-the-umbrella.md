---
---

**`order_the_passport.md` commissioned a second reader because _"the one who wrote
a plot line is the one who cannot see this in it"_. It could not see two thirds of
the house.**

The extractor matched `packages/khai-cultures-<id>/(plot_|play_)` and the
workflow's `paths:` filter had the same shape. A culture still in the umbrella
lives at `packages/khai-cultures/cultures/<id>/plot_*.md` - **no hyphen suffix,
one path segment deeper** - and matched neither.

|          | plot files | cultures | lane saw them |
| -------- | ---------- | -------- | ------------- |
| umbrella | 795        | **206**  | **no**        |
| migrated | 748        | 123      | yes           |

`--culture andorra` answered _"no culture plot line touched, nothing to ask."_

## What it cost, which is exactly what the order predicted

San Marino, Hawaii and Andorra were staged in one session, **all three in the
umbrella**, and the lane read none of them. Measured afterwards by the order's own
test - name the subject of each Cue and count the states:

| culture     | state Cues  |                              |
| ----------- | ----------- | ---------------------------- |
| San Marino  | 4 of 8      | in the house's range         |
| Hawaii      | 5 of 11     | in the house's range         |
| **Andorra** | **7 of 11** | **the middle is a passport** |

Andorra's brackets carry a second question - grass that cannot be divided, then
fifteen hundred people over housing - but the six plots between them are a bishop
authorising, two states signing, a council commissioning, Napoleon restoring and a
co-prince decreeing. The order says _"three cultures, one author, one week, and
the order was read, quoted and broken each time."_ It happened again, with the
lane built to stop it installed and blind.

## The fix is to stop writing the path shape out

`touchedCultures` maps a path to its culture in either home and `cultureDir`
resolves an id back to either home. **The house already had both**, which is the
third time this session a wall was wrong because it hand-rolled something the
house owns. The extractor now filters a diff to paths whose basename is a
`plot_` or `play_` file and hands those to `touchedCultures`; the workflow gains
the two umbrella patterns.

## The test is over the real tree, because the pattern is what was wrong

It takes one umbrella culture and one migrated culture from the actual directories
and requires the extractor to return plots for both. Probed by restoring the old
`--culture` resolution: it fails with _"the audit lane read no plots for umbrella
culture afghanistan"_.

|                                   | before | after     |
| --------------------------------- | ------ | --------- |
| cultures the audit lane can read  | 123    | **329**   |
| hand-rolled culture-path patterns | 2      | **0**     |
| house tests                       | 1,624  | **1,625** |

No content changes. Andorra's middle is restaged separately, in the culture lane.
