---
khai: order
title: "The Passport"
declared: "The Passport"
language: english
license: CC-BY-NC-SA-4.0
stamp:
  owner: KAI HACKS AI
  version: v0.0.1
  date: "2026-09-03"
---

# Order: The Passport

## Direction

[The defining question](order_the_defining_question.md) asks whether a play stages
what defines its culture, and it names the failure it keeps finding: **the answer
is a cultural moment, not a constitutional one.** A play that stages only the
statehood has described a passport. That order also gives a tell for finding it.

This order records that the tell does not work, what does, and what three
rewrites taught that neither could have.

The evidence is a week of staging. Corsica, Brittany and Alsace were written in
sequence, France's first three sub-national cultures, eighteen plots between
them. **Sixteen of the eighteen were a state acting on a people** - a treaty, a
conquest, a decree, a census, a conscription order, a court. Alsace was six for
six. All three shipped with a `REFERENCES.md` whose defining-question section
opens "Checked against the house order on the defining question". Corsica's went
further and defended the shape in writing, calling its arc "a legal argument, not
a security file" - a sentence that is right about leaving the FLNC years out and
is also, unnoticed, an argument that a constitutional plot line is a virtue.

Three cultures, one author, one week, and the order was read, quoted and broken
each time.

**The tell is self-referential.** It reads: take the words the play uses about
itself in its Arc, Name, Stakes and pitch, and ask which of them appear in a
plot. That was run on all three and all three passed, honestly - because the Arc,
Name and Stakes were themselves constitutional. `Ponte Novu`, `an unvaniezh`,
`d Kartle` are words a play uses about itself, and each landed in a plot. The
tell measures the agreement between a play's self-description and its scenes. It
cannot see a play where both halves are a passport, and a play like that passes
it perfectly.

The tell is not wrong. It found Switzerland's Helvetii and Austria's `barock`,
which are real gaps, and it should be kept. It is a coverage test wearing the
clothes of a content test, and this order names the difference.

**What finds a passport is the subject of the Cue.** Read each plot's Cue and
name what acts in it. A house plot line that is doing its work has cues like
these: an irrigation channel in a dry valley, a duke ordering pure beer, an oak
felled at Geismar, an engineering company founded, chestnuts ordered planted, a
mosquito. A passport has a king, a parliament, an army, a commission, a court.
The test costs a minute per culture, it needs no tooling, and it caught all three
of these in an afternoon after the tell had cleared them.

## Orders

- Owner: [The Playwright](../position_playwright.md)

## Implementation

**Do not build a counter for this.** Two were built and measured against the
whole house, and both fail, in opposite directions.

The first was structural: does a plot's Stage cast a piece or a process, and so
touch material life at all? Measured over 322 plots, correcting for the two Stage
formats the house uses, 171 of them do - 53 per cent. The three passports scored
2 of 6, 2 of 6 and 4 of 6. **Corsica sat above the house median while being the
worst of the three**, and after the rewrite that took it from a passport to a
land-first line it moved to 6 of 9, landing where it had already been.

The second was cheaper still: does a plot title carry a year? 215 of 322 do, 66
per cent. The counter is inverted from what it should be. Hesse dates five of
five titles and is a sound plot line; the restaged Brittany dates one of eight.
Dating a plot is a sign of research, not of statecraft.

| counter                  | house | before the rewrites | after      |
| ------------------------ | ----- | ------------------- | ---------- |
| casts a piece or process | 53%   | 2/6, 2/6, 4/6       | 4/7 to 6/9 |
| title carries a year     | 66%   | 5/6, 4/6, 3/6       | 3/7 to 1/8 |

A number would have passed Corsica and failed Hesse. What the failure is made of
is what a plot is _about_, and no property of the file records that.

**What the three rewrites taught is not what the diagnosis predicted.** The
expected fix was proportion: too many state plots, add cultural ones. That is not
what happened in any of the three. Putting the land first changed what the
political plots meant, and each culture's real question only became sayable
afterwards.

- Alsace opens on a strip of habitable ground between a floodplain and a
  mountain, and on four confessions sharing one church because none could win.
  The 1918 sorting cards then cut for a stated reason: they demanded the single
  answer that four hundred years of village practice had never had to produce.
- Brittany opens on a migration that split the peninsula into two languages, then
  linen money turned to stone, then three centuries of men at sea, then a million
  people leaving for Paris. The Arc could then say what all of it shares - a
  country that has always lived on what lies outside it and paid for each with
  something of its own - and the language question turned out to be that shape
  too: nobody is destroying it, something else is offered, and the offer is taken.
- Corsica opens on malaria holding the plain, chestnuts ordered planted by Genoa,
  and a village justice with the voceru as its public instrument. The DDT plot
  that follows makes Aleria legible for the first time: the 1975 cellar stood on
  the plain the spraying had opened and the state had settled with repatriates.
  The first staging had the siege without the ground.

So the finding is sharper than over-weighting. **The political plots were
answering a different question, and they could not stop, because a plot line with
the state as its only actor has only one question available to it: what was done
to us, and on what terms.** That question is real and every one of these cultures
asks it. It is not the whole of any of them, and a play that can ask nothing else
has described a passport whatever its proportions.

**Politics is not the fault.** All three rewrites kept their state plots -
Alsace's cards and conscription, Brittany's symbole and the removal of Nantes,
Corsica's Paoli and Ponte Novu - and all three land at three state plots out of
seven, eight and nine, which is where the house sits: Aargau 3 of 6, Hesse 3 of
5, Bavaria 3 of 9. A rule against constitutional plots would be as wrong as the
habit it corrects.

**Where this should bite is the scaffold.** All eighteen titles were chosen
before a word of prose existed, in a single `tests/new_culture.mjs` invocation.
That is the cheapest moment to catch it and the only one where nothing has been
written yet. The scaffold already prints a "Still to stage" advisory and already
cites `order_plot_zero.md`; naming the Cue-subject test there, against the plot
titles it has just been handed, costs nothing.

**The trigger is the defining question's trigger**, a pull request that touches a
culture, and this stays a dialogue for the same reason that one does, now with a
measurement behind it rather than a preference.

**No sweep.** Three cultures were restaged because three cultures were wrong and
the author was already in them. Reading 316 plot lines for this would produce
compliance and not truth, and the counters that would make a sweep cheap are the
counters this order has just shown do not work.

**On a second model auditing the first.** The house is wiring an advisory NLP
lane, and two constraints follow from what is written above. It must judge the
plot line in English - the titles and the Cues - and never the staged prose: a
model grading prose a model wrote, in a tongue neither can verify, is a mirror.
And it prints a distribution before it sets any threshold, the way
`order_plot_zero.md` measured 290 opening dates before fixing anything. There is
already an unfilled slot for it: a file whose language is in `khai.languages`
logs `routed to assistant/LLM verification` and returns nothing, which is how all
twenty-two Alsatian files passed the language wall by being skipped.

## Targets

- [x] Record the failure at scale: three cultures, eighteen plots, sixteen of
      them a state acting, all three citing the order they were breaking
- [x] Name the defect in the defining question's tell: it measures the agreement
      between a play's self-description and its scenes, so a play whose
      self-description is a passport passes it
- [x] Give the test that works: name the subject of each plot's Cue, and count
      how many are a state or its instruments
- [x] Measure two candidate counters against the whole house and record that both
      fail, one passing the worst offender and one inverted
- [x] Record what the rewrites taught: the political plots were answering a
      different question, not merely crowding out others
- [x] State that politics is not the fault, with the house's own range as evidence
- [ ] Carry the Cue-subject test into `tests/new_culture.mjs`, where the titles
      are chosen and nothing has been written yet
- [ ] Wire the advisory audit lane: English plot line only, distribution before
      threshold, into the LLM slot that already exists and is empty
- [ ] Ask it of cultures as they are touched, never as a sweep
