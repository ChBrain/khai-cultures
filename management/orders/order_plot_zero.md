---
khai: order
title: "Plot Zero and Plot Ninety-Nine"
declared: "Plot Zero and Plot Ninety-Nine"
language: english
license: CC-BY-NC-SA-4.0
stamp:
  owner: KAI HACKS AI
  version: v0.0.1
  date: "2026-08-28"
---

# Order: Plot Zero and Plot Ninety-Nine

## Direction

The defining question asks whether a play stages what defines its culture, and
[A cultural moment, not a constitutional one](order_the_defining_question.md)
names the way the answer fails. This order names where the failure hides.

It hides at the floor. A gap in the middle of a plot line is visible: Germany had
three hundred and fifty-four empty years and Bavaria a missing century, and both
show up as soon as anyone reads the plots in order. **The first plot is different,
because nothing looks missing below it.** There is no reader who notices what a
play does not begin with.

Measured across all two hundred and ninety cultures, taking the earliest date in
the opening plot's Cue:

| opening       | cultures |
| ------------- | -------- |
| antiquity     | 2        |
| before 1000   | 6        |
| 1000 to 1499  | 23       |
| 1500 to 1799  | 28       |
| 1800 to 1899  | 36       |
| 1900 or later | 8        |

Berlin opened at the Wall. A city founded around 1237, capital of Prussia, capital
of Weimar, and the play began in 1961, because 1961 is the first date a state
history of Berlin finds interesting. Bavaria opened when Napoleon made it a
kingdom, eleven hundred years after there were Bavarians and nine hundred after
Bonifatius drew the four bishoprics that still shape it. The two cultures that
opened in antiquity are the two restaged on the day this was measured.

**The ceiling is invisible for the same reason.** Nothing looks missing above the
last plot either. Taking the latest date anywhere in each culture's plot line:

| plot line reaches | cultures |
| ----------------- | -------- |
| 2010 or later     | 19       |
| 2000 to 2009      | 20       |
| 1990 to 1999      | 31       |
| 1980 to 1989      | 22       |
| before 1980       | 145      |
| no date at all    | 53       |

Wales ends in 1588, at the Welsh Bible, with nothing of the Blue Books, of
industrialisation, of Aberfan or of devolution. Scotland stops in 1750, England
in 1840, Peru and Colombia at independence. A hundred and sixty-seven plays do
not reach 1990.

So every culture answers two more questions, and they are the first and the last:
**where do I come from, and where do I now stand?**

## Orders

- Owner: [The Playwright](../position_playwright.md)

## Implementation

**The origin is `plot_00`, and the number is the point.** It is not the first
event in a chronology; it is the answer to a different question, and holding it
at zero says so. Three practical things follow. It stays out of the sequence it
precedes, so the numbering of what happened is not disturbed by what came before.
It can be prepended when it is found, instead of forcing a renumber of every plot
and every cross-reference; four restagings in a single day each paid that cost.
And it is checkable, which the question itself is not.

**What a plot_00 is.** The origin of a culture, not the founding of a state. A
people that coalesced, a tongue that separated, a mineral, a pass, a faith taken
or refused, a settlement left behind by an empire's collapse. Austria's is salt
and a trade route into Rome; Switzerland's is four language zones left by Rome's
reach and its retreat; Bavaria's is a name appearing in the sources for a people
that was a mixture agreeing to be one. None of the three is a founding, and all
three are true.

**What it is not.** A treaty, an independence, a constitution, a border. Those are
real and they belong in the plot line, numbered like everything else. A play that
opens on one has described a passport, and putting a `00` on it changes nothing
except that the gate stops asking.

**A myth may be the origin, told as a myth.** Where a culture's beginning is a
story it tells rather than an event that happened, the deed to stage is the
telling. Germany's resistance to Rome is a nineteenth-century monument and not a
battle in the year 9, and the plot that carries it says so in its own text. Never
stage a legend as though it were a record.

**The present is `plot_99`, and it is a record and not a forecast.** It stages
what has actually happened in the decade still resolving - who came, what closed,
what the numbers did - with a Stage of people who were there, like any other plot.
Where it points belongs in its Tension and in the play's Stakes, and nowhere else.

That distinction is the whole reason the direction does not get a plot of its own.
A direction is a judgement and a guess, and by design it is likely wrong. A plot
is a record, and a wrong record is not a revised opinion but a lie in the archive.
The house already keeps the guess in the right place and in the right grammar:
fifty-seven per cent of the Stakes chapters open with _Ob_ or _Whether_, and a
question cannot be wrong the way a forecast can - it can only turn out to have
been the wrong question. Intentions have their own type as well, `plan`, whose
Targets are the one place in this house that records its own failure with `[F]`.
Record, intention and wager are three things, and this order keeps them apart.

**The number is the point at this end too.** Held at ninety-nine, the present
stays last however many plots are added before it, and when its events settle
into history it is renumbered into the sequence and a new `plot_99` written. A
play therefore always spans from an origin outside the chronology to a present
outside it, with what happened in between.

**The gate holds the fact and not the judgement.** That a culture has a `plot_00`
is decidable and is therefore a gate. Whether a given `plot_00` is a true origin
or a state date wearing the number is the dialogue the defining question protects,
and no counter can stand in for it. A reviewer who lets a treaty through as a
`plot_00` has defeated this order with the gate still green, and that is the
correct division of labour: the machine cannot read.

**Narrow ratchet.** It fires only when a pull request touches a culture's plots or
its play file. Touch the plot line and you answer for where it begins; fix a
persona's tongue link or a typo and nothing is asked of you. Coverage debt can be
paid in a sentence and an origin cannot: it is a research pass, and a gate that
demanded one for a typo would be answered with a bad `plot_00`, which is worse
than none.

## Targets

- [x] Measure the floor: the opening date of every culture's first plot, and the
      thirty-six after 1800
- [x] Measure the ceiling: only nineteen plot lines reach 2010, a hundred and
      sixty-seven stop before 1990, and Wales ends in 1588
- [x] Fix the origin at `plot_00`, out of the chronology and prependable
- [x] Fix the present at `plot_99`, out of the chronology and appendable, a
      record of the decade still resolving and never a forecast
- [x] Keep record, intention and wager apart: `plot`, `plan`, and the Stakes
      question that is allowed to be wrong
- [x] Gate the fact, as a ratchet on the cultures whose plot lines a change
      touches
- [x] Leave the judgement to the defining question, explicitly
- [ ] Carry it through the cultures as they are touched, never as a sweep: two
      hundred and ninety plot_00 files written to satisfy a counter would be two
      hundred and ninety passports
