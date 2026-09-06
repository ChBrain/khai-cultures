---
---

**Five content walls ride the cultures. Nothing rode the groups, and it shows.**

Measured across the twenty-one groups that have a play:

| What                                               | How many                 |
| -------------------------------------------------- | ------------------------ |
| `## Triggers` chapters that link no plot at all    | **17 of 21**             |
| of those, with plot files sitting in the directory | 13 with four, 4 with one |
| plot lines spanning `plot_00` to `plot_99`         | 4 of 21                  |
| own Company elements no plot fields                | 2                        |
| findings house-wide                                | **70**                   |

**The EU names the fault.** It has `plot_01` through `plot_04` on disk. Its
Triggers chapter has three bold entries — _The single market_, _The shared law
and institutions_, _Ever-closer union_ — and links to none of them. Four plots
nothing points at, and a chapter of themes standing where the chain belongs.

That is not four groups being sloppy: every group was written to the same
template, and the template summarised instead of chaining. The four that are
whole are whole because somebody fixed them by hand in the pull request that
touched them. A habit is not a standard.

## What the wall asks

Four things, all blocking, all on the group's **own** material.

- **The Triggers chapter chains the plots.** An entry linking no plot, a plot no
  entry links, and a link pointing at a plot that is not there are reported
  separately, because they are three different mistakes.
- **The group's own Company is staged in its own plots** — same exemptions as a
  culture's (`pitch_`, `plan_`, `position_language_`, `position_culture_`).
- **Members are never counted.** A member, and anything borrowed from one, is a
  package-qualified link _out_; a group points at another play's material rather
  than staging it. Only files in the group's own directory are charged.
- **`plot_00` and `plot_99`**, under `order_plot_zero`.

## What lets it exist at all

**It never fires on a group a change only passed through.** Every Nordic culture
migration retargeted links inside `groups/eu` and `groups/nato`, because both
hold all five members. Under a plain touch rule the Sweden pull request would
have been asked for the EU's entire plot line, and the answer would have been a
plot line written to satisfy a counter, or no migration.

So a group is **authored** by the same decidable rule the cultures use: a changed
file differs in something other than a markdown link's target.

## Verified three ways, against real commits

| Case                                                    | Result                                                             |
| ------------------------------------------------------- | ------------------------------------------------------------------ |
| the nordics group migration (`462f6d49..6ab9a819`)      | `OK: 1 authored group(s), all whole` — exit 0                      |
| Norway + Finland + Iceland (`de9200c7..462f6d49`)       | `2 group(s) were only relinked … : eu, nato` / `no group authored` |
| a prose line added to `groups/eu/play_eu.md`, committed | **exit 1**, all four findings named                                |

The third was a throwaway commit made and reset for the purpose; it is the only
one of the three that proves the wall can go red.

It reads **both homes**, umbrella and package, so it does not go quiet the day a
group migrates — the failure `touchedCultures` already had once and paid for.

Registered as `group-ratchet` in the gates and as `khai-group-ratchet` in CI; the
kit's CI-parity check enforced that second half and caught its absence. Five
tests in `house.test.mjs`, running without a diff. Two helpers,
`linkBasenames`/`section`/`isOneWay`, are now exported from `company_coverage.mjs`
rather than copied.

## The debt stays

Nineteen of twenty-one groups owe something today and the house is green, because
the ratchet fires on what a pull request opens. **Seventeen Triggers chapters
rewritten in an afternoon to clear a counter would be seventeen chapters nobody
read** — the same failure `order_plot_zero` names about two hundred and ninety
origin plots.

`management/orders/order_the_group_ratchet.md` records it, and names the two
smallest debts: `dach` and `the_four_nations` each carry one dead own persona.
