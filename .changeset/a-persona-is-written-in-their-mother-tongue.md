---
---

**A Swiss German, a German German and an Austrian German must be visibly
different in what is written of them.** A persona's file is written in the
language that person thinks in, not the language of the state they live in.

The tongue side is already right: `gsw/position_language_gsw.md` is written in
Alemannic, so the house already writes a tongue in its tongue. This extends it to
the people.

| What                                       | How many                 |
| ------------------------------------------ | ------------------------ |
| personas carrying a Projection             | 1,261                    |
| linking **exactly one** tongue - decidable | 662                      |
| linking more than one - **not asked**      | 588                      |
| findings added                             | **6**, across 4 cultures |
| persona-wiring findings, before → after    | 4 → 10                   |

## Why only one tongue is asked

The first measurement used `gripped`, the nearest-tongue heuristic this file
already relies on, and reported **247 personas across 120 cultures.** That number
was almost entirely wrong. `us_california/persona_chloe.md` says in plain words
that Californian English is her mother tongue and Spanish is what she _"puts on
like a coat"_, and the heuristic returned the Spanish - the coat sits a few
characters closer to the mother-tongue process than the mother tongue does.

Distance is enough for the rule it was built for, which asks only whether a tongue
is one nobody acquires first. It is not enough to decide which language a file must
be **written in**. So this asks the 662 that link one tongue and declines the 588
that link more.

## Two more corrections this change records

**Seven tongues reported missing are all held.** A first pass resolved tongue links
by basename: `en_au`, `en_jm`, `en_za`, `es_mx`, `jv`, `ms_my`, `sw_ke`. Every one
exists, in a sibling culture's directory - Somare reaches Australian English as
`../australia/position_language_en_au.md`. The rule follows the link now.

**A missing `language:` is not a fault.** A draft charged the eighteen personas
that carry none. `resolveLanguageTag` has a stated **file → play → house**
precedence, so those personas inherit their play's language by design. Resolving
the canon's way made the rule stricter, not laxer: `persona_wullenwever.md` is
found only because his play supplies the `de` his own frontmatter omits.

## The six

Two in `ch_st_gallen` and `switzerland/persona_tell.md`, written in `de` holding
Alemannic. `de_schleswig_holstein/persona_wullenwever.md`, written in `de` holding
Low German. And two in `guinea_bissau`, written in `pov` and pointing their mother
tongue at the one genuine Portuguese file in that culture - residue from the
relabel that deliberately kept it Portuguese, so a wiring fix rather than a
rewrite.

## Tests

Both new guards were probed by breaking them, and **both probes failed the first
time** because the tests proved less than they claimed. The multi-tongue test
linked two targets that did not exist, so `soleTongue` answered null because
nothing resolved and the guard was never reached; the inheritance test asserted
the absence of a message no longer in the code. Both are now built on real files in
a temp directory, and weakening either guard fails them.

`order_the_mother_tongue.md` carries the rest, including the one decidable
difference found for the German question: **Swiss orthography has no eszett.**
Measured at 12 across the 27 Swiss cultures against 337 across the 17 German ones,
with 10 of the 12 in `ch_appenzell_innerrhoden`. Not built here, and Liechtenstein's
7 are explicitly not called a fault, because its convention was not established.

No package content changes; this is the governance lane.
