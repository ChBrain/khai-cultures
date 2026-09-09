---
---

**The sub-national debt gets counted.** "Fifty-nine cultures do not conform" is not a
plan, and it had started to be a reason not to begin.

## What is actually there

**The house holds 119 sub-national cultures. Sixty conform and fifty-nine do not** -
and the fifty-nine are not spread across the house. They sit in exactly two unfinished
campaigns:

| parent | total | conforming | outstanding |
| ------ | ----- | ---------- | ----------- |
| CH     | 26    | 26         | **0**       |
| DE     | 16    | 16         | **0**       |
| GB     | 4     | 4          | **0**       |
| FR     | 3     | 3          | **0**       |
| ES     | 19    | 8          | **11**      |
| US     | 51    | 3          | **48**      |

**Switzerland, Germany, the UK and France are finished.** The shape has been landed
sixty times, and `us_virginia`, `us_ohio` and `us_pennsylvania` are worked examples of
a conforming state sitting in the tree right now. This is not unexplored ground.

**And the "59 US sub-nationals" I have been repeating in the last several pull requests
was wrong: it is 48 American and 11 Spanish.** Correcting my own arithmetic is half the
value of doing the count.

## What it costs

Every one of the fifty-nine carries the same two blocking findings: the id does not
carry its parent's code (`texas` → `us_texas`), and the culture-position does not link
its parent's. The house even has the closing formula - `us_virginia` ends on _"It is a
way of being American, not a second passport."_

The third cost is the one that makes it deep work. Fixing the second finding edits the
culture, which authors it, which charges it for its dead:

```
168 dead Company elements across the 59
distribution   2 dead x27   3 dead x16   4 dead x14   5 dead x2
none at zero
all 59 have exactly 3 plots, and not one holds a plot_00 or a plot_99
```

**For scale: the eight members of the EU walk carried forty-seven dead between them.
This is three and a half times that**, and every one of the fifty-nine will also be
asked for an origin and a present, because the only place a Company element can stand
is a plot's Stage, and touching the plots wakes the plot-zero ratchet.

## The half that is free, and the window that closes

The two findings do not have to be paid together, and this is the whole planning
question.

**Finding 1 is free.** A bare directory rename is content-identical, so it is a relink:
it authors nothing and charges nothing. **Probed on `wyoming` before writing this**, and
the gates said it in their own words:

```
ok  company-coverage        no culture authored, nothing to hold to zero.
ok  subnational-conformance no culture authored.
ok  plot-zero               no culture's plot line authored.
```

**The package name follows the id, and an npm name is permanent.** So the rename is
free only while these cultures are still under the umbrella - **the window closes the
first time one of them ships.** All fifty-nine ids can be corrected in one relink-only
change that costs nothing and halves the outstanding findings.

**Finding 2 is the campaign**, and it cannot be paid in bulk: fifty-nine cultures, one
hundred and eighteen new plots, one hundred and sixty-eight elements staged, at the
size of the culture pull requests this house has been running.

## Spain first

Eleven of the fifty-nine are Spanish, and they are the cheaper half for a reason that
has nothing to do with Spain: **`spain` is already a package**, so a Spanish
subdivision's nesting link resolves to a specifier, while an American one still points
at `../usa/` and is tangled up with the migration of the United States itself. Eight
Spanish subdivisions already conform and several are queued as ready.

**Finishing Spain completes a campaign, proves the recipe against a live parent, and
leaves the United States as the only sub-national debt in the house.**

## What this change is

The measurement, written into `order_stage_the_united_states.md`, which already owns
this work - a `What it costs, measured` section, the fork, the Spain-first
recommendation, and six Targets, three of them ticked because they are what this
survey did. **No culture is touched and no rename is performed here.** The free half is
a decision to take deliberately, not a thing to slip into a survey.

Governance lane. One order, one changeset.
