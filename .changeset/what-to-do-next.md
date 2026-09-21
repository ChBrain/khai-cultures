---
---

**Every wall in this house answers a question about one change. None of them
answers the question that actually costs time: which culture is next?**

That was decided by whoever opened the editor - the one decision in this
repository with no record, no reasoning and no way to check it afterwards, and
the one that determines what the house becomes. The umbrella emptied in the order
cultures came to mind, and the cultures nobody thought of stayed as they were.

`tests/next.mjs` reads the house's own walls and names one culture, with
everything the walls have against it. Measured over all 319:

| Rung             | What it means                                      | How many |
| ---------------- | -------------------------------------------------- | -------- |
| 1. `wrong`       | says something that is not so                      | 57       |
| 2. `unbracketed` | has no origin, or no present                       | 161      |
| 3. `thin`        | declares a company it never casts, or spans a hole | 44       |
| 4. `unmigrated`  | clean, and still in the umbrella                   | 2        |
| 5. `settled`     | no wall objects, which is not the same as good     | 55       |

**264 of 319 owe something, and the house is green**, because every wall here is
a ratchet that fires on what a pull request opens. That is the right design, and
it has a blind spot shaped exactly like this: a ratchet can say a change is
sound. It cannot say which change to make.

## A ladder, not a score

Weighting _"out of order"_ against _"no plot_00"_ against _"still in the
umbrella"_ means inventing numbers, and then every argument about priority
becomes an argument about a number nobody can defend. Numbers like that drift,
and they drift towards whatever the last person wanted to work on.

So the ordering is lexicographic. Each rung is a yes-or-no fact the house already
computes, the first rung a culture answers to is its rung, and the only policy in
the file is the **order of the rungs** - argued once in
`order_what_to_do_next.md`, and held as data rather than as control flow.

## It names a culture, never a task

Touching any content in a culture authors it, and authoring wakes
`company-coverage`, `plot-zero`, `subnational-conformance` and `links` together.
You cannot write a culture's plot_00 without also clearing the company its play
declares and never casts. **So writing and repairing are the same pull request**,
there is no choice to make between them, and what gets chosen is a culture whose
ledger is then the change's scope.

Rung order is by **subsumption** and not severity: no plot_00 outranks a company
member never cast, because writing the origin drags `company-coverage` to zero
with it while casting a persona forces no brackets. That is an argument about
cost, and it is the weakest claim here - it is carried as a Target.

Thresholds are the house's own medians, measured at run time and never typed: 208
years of span, a 145-year hole. Zeros are dropped first, because a culture with
fewer than two dated plots has no span and counting it as zero would drag the
line down until half the house cleared it without changing.

## It is not a gate

A wall refuses a change. This ranks work, and a ranking is a reading. Gated, it
would refuse a pull request for not working the head of the queue, which takes
the choice away from the person whose choice it is. A test holds it out of the
gates manifest so the distinction survives the next reader.

## Two faults of my own, both caught by measuring

The thinness signal was first hand-rolled as a directory scan for board members
no plot links. That is `company_coverage.mjs` written worse - **the wall reads
the play's declared Company chapter and honours waivers and one-way links**, and
the hand-rolled version honoured neither. This file now computes two things, a
span and a hole, and asks for everything else.

And the first cut put never-cast company members on rung 1, which made **208 of
319** cultures `wrong` - a count that contradicts the house being green, which is
how it was caught. Standing debt is not falsehood.

## What it cannot do

Settled means no wall objects. It does not mean good. `us_virginia` passed all
fifteen walls while being wrong about its own authorship, and its repair made it
_less_ machine-readable: its four plots now name scenes rather than dates, so the
corrected version reads as undated, and any ratchet on readability would have
charged the correction.

This finds where the walls are **blind**, never where the reading is **wrong**.
The questions it prints exist to send a person outside the repository; they are
the assignment, not the check, and _"read it, nothing wrong"_ answers every one.

## The head of the queue

`san_marino`, on four counts at once: `position_language_it_sm.md` is
accent-stripped Italian declaring `it`; there is no plot_00 and no plot_99;
`piece_balestra` and `process_balestrieri` are declared in the Company and cast
by no plot; and the dated line runs 301, 1600, 1849 - a **1299-year hole**, the
largest in the house, with plot_02's own Cue naming _"le sue antiche consuetudini
medievali"_ as what it codifies.

That gap was dismissed on first reading, because the record looked thin, and the
Human refused the dismissal. **A hole is not evidence that the record is silent.
It is evidence that nobody looked.** Which is why rung 3 asks a question and does
not report a finding.

No package content changes here; this is the governance lane.
