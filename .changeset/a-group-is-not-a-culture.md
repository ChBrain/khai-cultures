---
---

**Three of the four content walls passed the nordics group. All three were lying.**

#586 fixed the one that crashed. The crash was the only visible symptom, and it
was the least of it — the other three were green:

| Wall                    | What it reported on the group migration                                                  |
| ----------------------- | ---------------------------------------------------------------------------------------- |
| company-coverage        | `FAIL` + stack trace (fixed in #586)                                                     |
| subnational-conformance | `OK: 1 authored culture(s)` — it had checked none                                        |
| plot-zero               | `OK: 1 authored plot line(s), each spanning origin to present` — no directory was opened |
| persona-wiring          | `OK: 1 touched culture(s)` — it had checked none                                         |

The distinction itself was already written down and already enforced in exactly
one place: `culture_sources.mjs` says _a migrated group is a unit and not a
culture_, and `cultures()` filters groups out, because the umbrella's minor **is**
the culture count and a group must not move a published version by existing. What
was never written down is what a **wall** does when a group turns up in its input.
So each wall decided separately, which is to say by accident.

**The worst of it was not about groups at all.** `plot_zero`'s `has()` read:

```js
if (!dir || !existsSync(dir)) return true;
```

An id whose directory cannot be found _has_ the marker. That is a wall answering
yes to a question it never asked, and it would answer the same way for a real
culture the day anything else made a directory unresolvable. It went unnoticed
only because nothing unresolvable had reached it before.

## The fix

- **`cultureUnits(ids)`** in `culture_sources.mjs` — one shared split into
  `{ cultures, notCultures }`, so the four cannot fork again.
- **`notCultureNote(notCultures)`** — the sibling of `relinkNote`. A declined
  unit is printed, never dropped in silence: a wall that quietly skips an input
  is indistinguishable from one that checked it and found nothing.
- **`plot_zero`'s `has()` throws** instead of returning `true`. Only culture ids
  reach it now, so an unresolvable one is a fault in the caller and says so.
  Never fail open, and never toward green.
- All four walls wired through it, `company-coverage` included — #586's local
  copy is replaced by the shared one.

## Verified against the commit that exposed it

`--gate --base 462f6d49 --head 6ab9a819` (the nordics group migration), all four:

```
  1 authored unit(s) are not cultures and are not charged by this wall: @chbrain/khai-cultures-nordics
```

…and the same range for the three Nordic cultures before it still charges
normally: `3 authored culture(s), all at zero`, `3 authored plot line(s)`,
`3 touched culture(s)`.

Four tests in `house.test.mjs`, running without a diff: the split holds, no
migrated group leaks into the culture list, the note is silent for none and names
them otherwise, and `hasOrigin` refuses a non-culture rather than passing it.
**1573 tests pass.**

## The order

`management/orders/order_a_group_is_not_a_culture.md` records the rule and why
the alternative was rejected — putting groups into `cultureIds()` would let every
wall charge them, and would also move a published version number to say something
untrue.

It also names the hole this does **not** close. The content ratchets ride the
cultures and nothing rides the groups. Of the twenty-one groups with a play,
**seventeen have a `## Triggers` chapter that links no plot**, and the EU is the
sharp case: it has four plots, `plot_01` through `plot_04`, and its Triggers
chapter names four themes and links to none of them. The nordics group has a
whole plot line and a staged persona only because they were done by hand in the
pull request that moved it. That wants a group ratchet, which is its own order —
but it could not be written while four walls disagreed about whether a group is a
thing they look at.
