---
khai: order
title: "What To Do Next"
declared: "What To Do Next"
language: english
license: CC-BY-NC-SA-4.0
stamp:
  owner: KAI HACKS AI
  version: v0.0.1
  date: "2026-09-21"
---

# Order: What To Do Next

**Every wall in this house answers a question about one change. None of them
answers the question that actually costs time: which culture is next?**

That was decided by whoever opened the editor. It is the one decision in this
repository with no record, no reasoning and no way to check it afterwards, and it
is the decision that determines what the house becomes. The umbrella emptied in
the order cultures came to mind. The cultures nobody thought of stayed as they
were.

## What was actually there

Measured over all 319 cultures:

| Rung             | What it means                                      | How many |
| ---------------- | -------------------------------------------------- | -------- |
| 1. `wrong`       | says something that is not so                      | 57       |
| 2. `unbracketed` | has no origin, or no present                       | 161      |
| 3. `thin`        | declares a company it never casts, or spans a hole | 44       |
| 4. `unmigrated`  | clean, and still in the umbrella                   | 2        |
| 5. `settled`     | no wall objects, which is not the same as good     | 55       |

**264 of 319 cultures owe something.** The house is green, and has been green
throughout, because every wall here is a ratchet that fires on what a pull
request opens. That is the right design and it has a blind spot shaped exactly
like this order: a ratchet can tell you a change is sound. It cannot tell you
which change to make.

## A ladder, and then a score

This order first said a score was the obvious shape and the wrong one: weighting
_"out of order"_ against _"no plot_00"_ against _"still in the umbrella"_ means
inventing numbers, and then every argument about priority becomes an argument
about a number nobody can defend, and numbers like that drift towards whatever
the last person wanted to work on.

That objection was right about the risk and wrong about the remedy, and two facts
overturned it.

**The ladder could not say "a country before a state."** Depth in the tree is not
a yes-or-no fault, so a ladder made of yes-or-no facts cannot hold it. What
happened in practice: `de_thuringia` and then `de_saxony_anhalt` were authored on
two consecutive working days while `sweden`, a level-1 culture, waited behind
them, because all three were "wrong" and the tiebreak was hole width.

**And severity did not add.** One blocking finding and a line that is backwards
with three placeholder chapters and nine findings were the same rung, separated
only by how wide the hole was. Measured when the score landed:
`us_south_carolina` owes seven things at once and sat fifth, behind cultures
owing one thing each.

So the ordering is now **points, highest first**, with the id as the last term so
it stays total. The rungs remain, and remain data: they name the fault in the
report and they are still the first thing a reader sees. What changed is that the
rung no longer decides the order by itself.

### What answers the drift

Not a promise. Two devices.

- **The arithmetic is printed with every row.** `sweden 101 = 40 backwards + 20
hollow + 24 level 1 + 13 hole 405y + 4 span 421y`. A weight is therefore always
  argued against a named culture and never in the abstract, which is the thing
  the original objection actually feared.
- **The weights are pinned by a test.** `house.test.mjs` asserts the table
  exactly, so a number cannot move without that line moving in the same diff,
  where a reader sees it. Probed by changing `disordered` from 40 to 95: the test
  fails.

And a third, which is the point of the whole file: **this ranks work, it refuses
nothing.** A score that is read and overruled has done its job. The failure it
exists to prevent is not a wrong number; it is a queue chosen by whatever the
last reader happened to be looking at.

### The one thing the ladder guaranteed and the score does not

Under the ladder, anything false ranked above anything merely missing. Under
points, a culture owing five missing things outranks a culture owing one false
one: the rung bands overlap, measured at mean 132 for `wrong` against 121 for
`unbracketed`, with a `wrong` low of 58 and an `unbracketed` high of 184.

That is the intended trade and not a side effect. If the guarantee is ever wanted
back, it is one line - add `rung * 1000` to the score and the bands separate
again, with the points ordering inside each.

## It names a culture, never a task

This is what dissolves the question of whether to build or to repair.

The house does not let you do one fault at a time. **Touching any content in a
culture authors it**, and authoring wakes `company-coverage`, `plot-zero`,
`subnational-conformance` and `links` together. You cannot write a culture's
plot_00 without also clearing the company its play declares and never casts —
the recipe demands both in the same change, and `khai-guard` will not let you
split them across lanes.

So there is no choice to be made between writing and fixing. There is a **culture**
to choose, and its **ledger** is the change's scope. `tests/next.mjs` prints the
ledger with the name, because the name alone would send someone to read the
culture and guess.

## Why the rungs are in this order, which the weights inherit

**A culture that says something untrue outranks everything else.** The house's
entire claim is that what it writes down is so. A plot line running backwards, a
file declaring a language it is not written in, a structurally invalid nesting —
none of those are incompleteness. They are the house being wrong in public.

**After that, subsumption rather than severity.** A culture with no plot_00 ranks
above one that merely declares a company it never casts, because writing the
origin authors the culture and drags `company-coverage` to zero with it, while
casting a persona forces no brackets. Ordering by which repair _contains_ which
is what stops a culture needing three pull requests where one would do. That is
an argument about cost, not about what matters more, and it is the one that
should be attacked first if this order is ever wrong.

The weights were set to inherit this argument rather than to restate it, and the
house can be measured to check that they did: mean points come out at 132 for
`wrong`, 121 for `unbracketed`, 60 for `thin` and 37 for `unmigrated`, which is
the rung order surviving as a tendency instead of as a gate. Where a weight and
this section disagree, this section is the one that was argued.

## The thresholds are the house's own medians

_"A long span with a large hole"_ means at or above the **median span** and the
**median hole** of the cultures that have one — 208 years and 145 years today,
measured at run time and never typed into the file. The line moves with the
corpus instead of being tuned by hand, which is the same argument
`order_the_written_accent.md` makes for taking each language's own median rather
than one global rate.

Zeros are dropped before the median is taken. A culture with fewer than two dated
plots has no span at all, and counting those as span zero would drag the line
down until half the house cleared it without changing.

## The queue is total, so it is deterministic

Rung, then the widest hole, then the longest span, then the id. The id cannot
tie, so two runs over one commit name the same head. **The head stays the head
until it is cleared** — the queue advances because working it removes its head,
not because it shuffles.

## It is not a gate, and must not become one

A wall refuses a change. This ranks work, and a ranking is a reading. Gated, it
would refuse a pull request for not working the head of the queue, which takes
the choice away from the person whose choice it is. It reports, it is read, and
it is ignored freely. A test holds it out of the gates manifest so that the
distinction survives whoever reads this next.

## What it cannot do

**Settled means no wall objects. It does not mean the culture is good.**
`us_virginia` passed all fifteen walls while being wrong about its own
authorship, and the repair made it _less_ machine-readable, not more: its four
plots now name scenes rather than dates, so the corrected version reads as
undated. Any ratchet on machine-readability would have charged that correction.

This file finds where the **walls are blind**, never where the **reading is
wrong**. The questions it prints for the head of the queue exist to send a person
outside the repository. They are the assignment, not the check, and _"read it,
nothing wrong"_ is a legitimate answer to every one of them.

## The finding this order was written for

`san_marino` came out as the head of the queue, and it is the case that shows why
a counter was needed for this at all. Its dated line is 301, 1600, 1849: a
**1299-year hole** between the founding and the statutes, which is the largest in
the house. The gap was dismissed on first reading — the record is thin, so the
hole looked true — and the Human refused that reading outright.

The house had already written down why the dismissal was wrong, in three places
nobody had put together:

- `plot_02`'s own Cue says it codifies _"le sue antiche consuetudini medievali"_.
  The line names the medieval period as the thing that made this culture, and
  gives it no plot.
- `piece_balestra` and `process_balestrieri` are declared in the play's Company
  and cast by no plot. A medieval tradition sitting on the board with no scene.
- `position_language_it_sm.md` is accent-stripped Italian declaring `it`, so the
  culture is also wrong about its own tongue.

**A hole is not evidence that the record is silent. It is evidence that nobody
looked.** The burden of proof runs the other way round, and the only reason this
was caught is that a person said so. That is why rung 3 is a question and not a
finding.

## How it is held

Read, never enforced. `npm run next` from the repository root prints the medians,
the tally, the head of the queue with its full ledger and its questions, and the
twelve behind it.

## Targets

- [x] Measure it: 264 of 319 cultures owe something, across four rungs
- [x] Establish that a score cannot be defended, and order lexicographically
- [x] Overturn that, with the reasons written above rather than the line deleted:
      the ladder cannot express depth in the tree, and severity did not add
      instead, with the rung order as the only policy and as data
- [x] Name a culture rather than a task, because authoring wakes the whole recipe
      and writing and repairing are therefore the same pull request
- [x] Take every fact from the house's own walls. The first draft hand-rolled a
      directory scan for board members no plot links, which is
      `company_coverage.mjs` written worse — that wall reads the play's declared
      Company chapter and honours waivers and one-way links, and the hand-rolled
      version honoured neither
- [x] Correct a first cut that put never-cast company members on rung 1: it made
      208 of 319 cultures `wrong`, a count that contradicts the house being
      green, and that contradiction is what exposed it. Standing debt is not
      falsehood
- [x] Thresholds as measured medians, never typed, with zeros dropped
- [x] A total order, so two runs over one commit name the same head
- [x] Hold it out of the gates manifest, with a test, because a ranking is a
      reading
- [ ] `san_marino`, the head of the queue: the flat tongue, the brackets, the
      crossbow, and the 1299-year hole — one pull request, in the culture lane
- [ ] The 57 on rung 1, as each is next named, never as a sweep
- [ ] Calibrate the weights against work actually done, not against taste: the
      first numbers are a starting point and the arithmetic in the report is what
      makes a better one arguable
- [ ] Read whether rung 2 belongs above rung 3. The argument here is subsumption
      and it is the weakest claim in this order
- [ ] Groups are out of scope and would rank if they were in it. They have their
      own ratchet and their own walk — see `order_the_group_ratchet.md`
