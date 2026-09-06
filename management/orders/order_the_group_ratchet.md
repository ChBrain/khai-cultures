---
khai: order
title: "The Group Ratchet"
declared: "The Group Ratchet"
language: english
license: CC-BY-NC-SA-4.0
stamp:
  owner: KAI HACKS AI
  version: v0.0.1
  date: "2026-09-06"
---

# Order: the Group Ratchet

**A group you write in comes out whole.**

Five content walls ride the cultures — coverage, sub-national conformance,
persona wiring, plot zero, staging. Nothing rode the groups. The groups were
written first, before any of those walls existed, and then nothing ever came
back for them.

## What was actually there

Twenty-one groups have a play. Measured before this order:

| What                                               | How many                 |
| -------------------------------------------------- | ------------------------ |
| `## Triggers` chapters that link no plot at all    | **17 of 21**             |
| of those, with plot files sitting in the directory | 13 with four, 4 with one |
| plot lines spanning `plot_00` to `plot_99`         | 4 of 21                  |
| own Company elements no plot fields                | 2                        |
| findings house-wide                                | **70**                   |

**The EU is the case that names the fault.** It has `plot_01` through `plot_04`
on disk. Its Triggers chapter has three bold entries — _The single market_, _The
shared law and institutions_, _Ever-closer union_ — and links to none of them.
Four plots nothing points at, and a chapter of themes standing where the chain
belongs.

That is not four groups being sloppy. Every group was written to the same
template and the template summarised instead of chaining. The four that are
whole — `dach`, `nordics`, `the_four_nations`, `these_islands` — are whole
because somebody fixed them by hand in the pull request that touched them. A
habit is not a standard, and a habit is exactly what a ratchet is for.

## What the wall asks

Four things, all blocking, all on the group's own material.

**The Triggers chapter chains the plots.** One bold entry per plot, each one a
link. An entry that links no plot is a summary standing where the chain belongs;
a plot no entry links is a scene the play does not know it has; a link pointing
at a plot that is not there is a chain with a hole in it. All three are reported
separately, because they are three different mistakes.

**The group's own Company is staged in the group's own plots.** Same rule as a
culture's, same exemptions — `pitch_`, `plan_`, `position_language_`,
`position_culture_` are held one way and never fielded.

**Members are never counted.** A member, and anything a group borrows from one,
is a package-qualified link _out_. A group does not stage another play's
material; it points at it. Only files that exist in the group's own directory
are charged, which is the same test stated twice.

**`plot_00` and `plot_99`.** Where the grouping comes from and where it now
stands, under [Plot Zero and Plot Ninety-Nine](order_plot_zero.md). A group is a
claim that these cultures belong together, and a claim like that has an origin
outside its own chronology exactly as a culture does — the Nordic thing meets
before there is a Nordic anything, and the meeting that switches to English is
the present.

## What the wall does not ask

**It never fires on a group a change only passed through.** This is the whole
reason it can exist. Every Nordic culture migration retargeted links inside
`groups/eu` and `groups/nato`, because both hold Denmark, Sweden, Norway,
Finland and Iceland. Under a plain touch rule the Sweden pull request would have
been asked for the EU's entire plot line. The answer would have been a bad plot
line written to satisfy a counter, or no migration — and this house forbids the
first in as many words.

So a group is **authored** by the same decidable rule the cultures use: any of
its changed files differs in something other than the target of a markdown link.
Verified against the range that carried Norway, Finland and Iceland: `eu` and
`nato` come back **spared**, and nothing is charged.

**It does not ask a group to be a culture.** A group is a unit and not a
culture; the five culture walls skip it and say so, under
[A Group is not a Culture](order_a_group_is_not_a_culture.md). This is the wall
that reads groups, and it is separate for that reason.

## The debt

Nineteen of twenty-one groups owe something today and the house is green,
because the ratchet fires on what a pull request opens. Seventeen Triggers
chapters and seventeen missing plot lines get written when somebody has a reason
to be in that group, and not before. **A Triggers chapter rewritten across
twenty-one groups in an afternoon to clear a counter would be twenty-one
chapters nobody read**, which is the same failure `order_plot_zero` names about
two hundred and ninety origin plots.

## Targets

- [x] Measure it: 17 of 21 Triggers chapters link no plot, 4 of 21 plot lines
      span origin to present, 70 findings house-wide
- [x] A wall that reads groups in both homes, umbrella and package, so it does
      not go quiet on migration
- [x] Fire on authored groups only, with the relink exemption printed
- [x] Verify against the range that relinked `eu` and `nato`: both spared
- [x] Register it in the gates as `group-ratchet`
- [ ] Carry it through the groups as they are touched, never as a sweep
- [ ] `dach` and `the_four_nations` each carry one dead own persona
      (`persona_die_delegierte`, `persona_the_secretary`); each is one pull
      request in the group that owns it
