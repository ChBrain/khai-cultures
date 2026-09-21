---
khai: order
title: "A Persona Is Written In Their Mother Tongue"
declared: "A Persona Is Written In Their Mother Tongue"
language: english
license: CC-BY-NC-SA-4.0
stamp:
  owner: KAI HACKS AI
  version: v0.0.1
  date: "2026-09-21"
---

# Order: a Persona Is Written In Their Mother Tongue

**A Swiss German, a German German and an Austrian German must be visibly
different in what is written of them.** Otherwise the house has one German with
three flags on it.

`order_voice_from_inside.md` already holds this for a culture and
`order_the_written_accent.md` holds it for spelling. This holds it for the person:
the file that describes someone is written in the language that person thinks in,
not in the language of the state they live in.

## What "mother tongue" means here, because the word misleads

**It is the one language a persona grew up dominant in.** Not the language their
mother speaks, and not family heritage. Those are extremely often the same thing,
and the sameness is not the point - dominance is.

`united_kingdom/persona_aisha.md` is what the distinction costs. English is
_"already on her lip before she reaches for it"_ and carries _"every public hour of
her day"_, and the file wires it `worn`. Her parents' language, which she was
_"never schooled in"_ and keeps _"for the family table"_, is the heritage. **Read as
heritage, that wiring looks right. Read as dominance, it is backwards.** Her
dominant language is English, the file is already written in English, and only the
grip is wrong.

Nearly everyone has exactly one such language, which makes a further thing
decidable and needs no heuristic at all: a Projection that names grips and never
names the dominant one has left out the fact the rest of this order stands on.
**Seven do.**

**It is a default and not a law.** Two languages at mother-tongue level is
possible and very unlikely; none at all is possible and very unlikely. So the
finding is a prompt to read, answered three ways: by naming the dominant language,
or by the file saying this persona genuinely holds two, or genuinely holds none.
What it refuses is silence, which is the one thing a reader cannot weigh. And a
persona who really holds two has no single language their file must be written in -
their Projection links more than one tongue, so the rule above already declines
them.

They come in two shapes, and only one can be cleared by wiring:

- **The dominant language is there under another grip.** Aisha's case. The prose is
  already right and the grip is wrong.
- **The dominant language is one this house cannot hold.**
  `libya/persona_septimius.md` grew up in Punic - _"لغة أهله ومدينته"_, carried as
  one carries the language of home - which is extinct and unheld, so his file is in
  Arabic, a language that reached that coast centuries after he died. No wiring
  clears that, and writing him in Punic is not available. It is the same shape as
  Bijago and as a BC plot in `order_a_plot_line_runs_forwards.md`: a thing the rule
  wants that the world does not supply.

## What was actually there

| What                                                      | How many                 |
| --------------------------------------------------------- | ------------------------ |
| personas carrying a Projection                            | 1,261                    |
| of those, linking **exactly one** tongue - decidable      | 662                      |
| linking more than one - **not asked**                     | 588                      |
| carrying no `language:` of their own, inheriting the play | 18                       |
| findings for the wrong written language                   | **4**, across 3 cultures |
| Projections naming grips and no dominant language         | **7**, across 6 cultures |

The four: two in `ch_st_gallen` and `switzerland/persona_tell.md`, written in `de`
and holding Alemannic as a mother tongue; and
`de_schleswig_holstein/persona_wullenwever.md`, written in `de` and holding Low
German. All four are written in the standard and speak the dialect.

**The tongue side is already right.** `gsw/position_language_gsw.md` is written in
Alemannic - _"S Alemannische het das, wo s Hochdüütsche verlore het: d alte
Monophthäng"_ - so the house already writes a tongue in its tongue. This extends
the same practice to the people who speak it, and the material to do it exists.

## Why only one tongue is asked, which is the whole care in this rule

A Projection names several languages in one paragraph: the mother tongue, one worn
like a coat, one heard only as a distant echo. **Nothing separates them by
counting.**

The first measurement of this rule used `gripped`, the nearest-tongue heuristic
that `persona_wiring.mjs` already relies on, and reported **247 personas across
120 cultures**. That number was almost entirely wrong.
`us_california/persona_chloe.md` says in plain words that Californian English is
her mother tongue and that Spanish is what she _"puts on like a coat"_, and the
heuristic returned the Spanish - because the coat sits a few characters closer to
the mother-tongue process than the mother tongue does.

Distance is enough for the rule it was built for, which only asks whether a tongue
is one nobody acquires first and can absorb an occasional mis-pick. It is not
enough to decide which language a file must be **written in**. So this rule asks
the 662 personas that link one tongue and declines the 588 that link more, which
belong to the packages' playwright instructions for the same reason
`persona_wiring.mjs` already gives about a neighbouring question: no check
separates a persona naming its tongue from a persona describing it.

**The Swiss case is mostly in the 588.** Three are found; most Swiss personas name
their Alemannic alongside the Hochdeutsch they write in, which is the truthful
thing to say about a Swiss speaker and also the thing that puts them beyond a
counter.

## And the one tongue has to be the mother's, not merely the only one

One tongue link removes the question Chloe's case poses - which of several tongues
the mother grip takes - and leaves a second one, which the first cut of this rule
missed: **whether that single tongue belongs to the mother grip at all.**

`guinea_bissau/persona_okinka_pampa.md` says in her own prose that her language is
**Bijago**, and the only tongue she LINKS is the Portuguese she _"ta karega di
longi"_ - carries from far off, under a `borrowed` grip. The rule read the one link
as her mother tongue and charged her, and her prose was right all along. Her
sister finding, `persona_lavrador_di_caju.md`, was wrong the same way.

So the single tongue must sit nearer a mother grip than to any other grip. That is
a distance test, and a much weaker one than the test that failed: it is not
choosing between tongues, only asking which grip the one tongue stands beside. Der
Abt keeps his finding, because `[Schweizerdeutsch](gsw)` sits next to the verb he
_spricht_ and the Latin he writes in is named in prose without a link. Okinka Pampa
loses hers.

**Her real fault is a different one, and it is the Aragonese fault again**: a
mother tongue named in prose that links nowhere, because this house holds no
Bijago. `persona_wiring` still cannot see that - it asks whether a grip has a
tongue, not whether the tongue a persona is SAID to think in exists - and it is
carried below.

## Two other corrections this order records

**Seven tongues the house was said not to hold, and holds.** A first pass resolved
tongue links by basename and reported `en_au`, `en_jm`, `en_za`, `es_mx`, `jv`,
`ms_my` and `sw_ke` as named and missing. All seven are held, in sibling culture
directories: Somare reaches Australian English as `../australia/position_language_en_au.md`.
A persona reaches a tongue three ways and two of them leave the culture, so the
rule follows the link rather than the name.

**A missing `language:` is not a fault.** A draft of this rule charged the
eighteen personas that carry none. The language engine's `resolveLanguageTag` has
a stated **file → play → house** precedence, so a persona without the field
inherits its play's language by design. The rule now resolves the same way the
canon does - and that makes it stricter, not laxer: `persona_wullenwever.md` is
found only because the play supplies the `de` its own frontmatter omits.

## How it is held

A ratchet, inside `persona_wiring.mjs`, on the cultures a pull request touches -
the third edge in a file that already holds two. Six findings stand today and the
house is green, because the ratchet fires on what a change opens. Six personas
rewritten in an afternoon to clear a counter would be six personas nobody read,
and two of them are a wiring question and not a prose one.

## What it cannot do

It cannot tell whether the prose is _good_ Alemannic, and it cannot tell a
Hochdeutsch persona from an Austrian one where both declare `de`. The decidable
part of that is narrower and is carried as a Target below.

## Targets

- [x] Measure it: 662 of 1,261 personas decidable, 6 findings across 4 cultures
- [x] Establish that the tongue side is already right, so the material exists:
      `gsw` is written in Alemannic
- [x] Ask only where the Projection links one tongue, after the nearest-tongue
      heuristic returned 247 findings of which Chloe's was demonstrably wrong
- [x] Follow the link rather than the basename, after seven tongues were reported
      missing and all seven were held in sibling directories
- [x] Resolve the language file-then-play, as the canon does, rather than charging
      eighteen personas for inheriting
- [x] Hold it as a ratchet in `persona_wiring.mjs`, beside the two edges already
      there
- [x] Require the one tongue to stand nearer a mother grip than any other grip.
      Without it, `guinea_bissau`'s two personas were charged for prose that was
      right: Okinka Pampa's language is Bijago and the only tongue she links is the
      Portuguese she carries from far off
- [x] Ask that a persona HAS a dominant language, not only that it is written in
      it. Seven Projections name grips and never name the one that says which
      language the person grew up in, which needs no heuristic to see
- [ ] The seven. `persona_aisha.md` and the others whose dominant language is
      present under another grip are wiring fixes with the prose already right.
      `libya/persona_septimius.md` is not: he grew up in Punic, which is extinct
      and unheld, and no wiring clears that
- [ ] **Bijago is named and not held.** Okinka Pampa is said to think in a tongue
      this house has no file for, which is the fault `an`'s provenance note opened
      about Aragonese and the one that brought Yiddish to light. A rule for it
      would ask whether the tongue a persona is SAID to think in exists, which
      means reading prose for a language name, which no counter here does yet
- [ ] `ch_st_gallen` and `switzerland/persona_tell.md`, and
      `de_schleswig_holstein/persona_wullenwever.md`: written in the standard,
      speaking the dialect. These are rewrites and each wants a reader - and a
      native one, since nothing in this house can check Alemannic or Low German
- [ ] The 588 that name more than one tongue. Not a counter's business; the
      playwright instructions' queue
- [ ] **Swiss orthography has no eszett**, which is one decidable difference
      between a Swiss German text and a German one, needing no dictionary and
      judging no word. Measured: 12 across the 27 Swiss cultures against 337
      across the 17 German ones, so the house is mostly already right - and
      `ch_appenzell_innerrhoden` carries 10 of the 12 and `ch_st_gallen` 2.
      Liechtenstein carries 7 and is **not** counted a fault here, because whether
      Liechtenstein follows the Swiss convention was not established
- [ ] Austrian against German German, where both declare `de`. Nothing decidable
      has been found for this yet, and the lexical tells (Jänner, Erdapfel,
      Sackerl) are word-level, which `order_the_written_accent.md` refuses
