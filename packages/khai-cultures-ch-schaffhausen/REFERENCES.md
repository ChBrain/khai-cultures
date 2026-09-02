# References

This is a creative staging; sources are generic historical encyclopedias (e.g. HLS).

## The defining question

**What defines Schaffhausen, and does the play stage it?**

One fact generates the rest: this canton lies on the wrong side of its own
country's river. The Rhine falls end navigation, so goods had to be unloaded and
carted around them - that is why a town is there at all, and `plot_00` stages it.
The same drop later turned from a barrier into power and carried Georg Fischer's
ironworks and, in 1868, a watch company an American put down a thousand
kilometres from the Jura (`plot_02`). And because the town sits north of the
river, jutting into Germany, American bombers took it for a German target on
1 April 1944 (`plot_03`). Neutrality is an agreement between governments; from
seven thousand metres it is not a feature of the ground.

The thread the earlier version did not have runs from `plot_01` to `plot_99`.
The Munot was built between 1564 and 1585 out of the citizens' compulsory labour,
in a design already obsolete when it was begun, and it was never besieged. Its
real yield was the habit: a town where everyone must turn up when the community
calls. Four centuries later Schaffhausen is the only canton that fines a citizen
for not voting. `position_die_anwesenheitspflicht` holds that line, and `plot_99`
sets it against the several thousand cross-border commuters who turn up every
morning and may not vote at all.

## Two corrections to the version replaced

- **The 1944 bombing did not level the old town.** The branch said the historic
  centre was laid in rubble. It was not: the raid killed forty people and struck
  housing, factories and the Allerheiligen museum, but Schaffhausen's Erker
  facades survive, which is why the old town reads as intact today. Overstating
  it costs the actual loss its shape, so `piece_das_erkerhaus` carries both
  halves.
- **"Zehntausende" German commuters is the wrong order of magnitude** for a
  canton of about eighty thousand people. It is several thousand, and the play
  now says so.

The border-guard persona was also replaced. Swiss border control is federal, not
cantonal, and casting an officer as defending the canton's reason to exist put a
national corps in a cantonal role. `persona_die_grenzgaengerin` stages the border
as it is actually lived here - from the side that crosses it daily and cannot
vote on either end.

**What is deliberately not staged.** Büsingen, the German municipality enclaved
inside the canton, paid in francs and served by Swiss post, is held in
`process_der_grenzverkehr` rather than given a plot. It is the sharpest single
image of the border but it happened to Schaffhausen rather than through it, and
a sixth plot would not add a turn the arc does not already have. A later hand may
disagree; this is the argument to answer.

**On the package.** Regenerated from `tests/new_culture.mjs` and the written
prose moved across. What it replaces used `## Grip` / `## Value` on its positions
and `## Input` / `## Method` / `## Output` on its process, none of them canon
chapters; carried no parent nesting; had no `type:` on either persona; and was
CRLF throughout.
