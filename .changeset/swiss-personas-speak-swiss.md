---
---

**Three personas named Alemannic as their mother tongue and were written in
German.** They are the last three of the four findings
`order_the_mother_tongue.md` opened; `de_schleswig_holstein/persona_wullenwever`
was the first and is separate.

All three now link `gsw_ch` rather than the pan-Alemannic anchor, and carry
`language: gsw` of their own.

## Two of them also had a writing grip with no tongue under it

That is the prerequisite named in #704, and it is why this is not prose alone.
The engine's channels do not move together, so a persona can stand at the floor
in one language for speaking and somewhere else entirely for writing - and until
the second tongue is named, nothing says what language the file is written down
in.

| persona              | speaks                   | wrote, before                                                                  | writes, now                                          |
| -------------------- | ------------------------ | ------------------------------------------------------------------------------ | ---------------------------------------------------- |
| `der_abt`            | Alemannic, mother tongue | `polished`, **no tongue at all** - Latin named only in prose                   | [`la`](la/position_language_la.md), `polished`       |
| `der_stickereibaron` | Alemannic, mother tongue | `polished` on **Alemannic**, which is not what a St. Gallen export house wrote | [`de_ch`](de/position_language_de_ch.md), `polished` |

`de_ch` rather than plain `de` because Swiss Standard German is the written
register of this culture, and because the house already holds it **and already
says nobody has it as a mother tongue** - it is on the `noMotherTongue` list. A
`polished` grip on it is exactly what that list permits.

## Tell is the argued one, and the argument is his own text

His Projection says he _"isch i dr Mundart gebore und ghört im Gschriebne keim;
die vier Sprachregione reichet en witer, jedi i ihrem eigene Wort"_ - born in the
dialect, belonging to no one in writing, passed on by the four language regions
each in its own word. **Read quickly, that is a reason to leave him in German.**

Read closely, it is the opposite. If the Deutschschweiz retells him _in its own
word_, that word is Mundart - **Standard German is precisely the one word that
belongs to none of the four regions**, and the file was written in it. So he is
now in Innerschweiz Mundart, and the sentence gained a clause saying which word
is which.

He keeps no writing grip. A legendary fourteenth-century peasant has no writing
channel, and adding one to satisfy a counter would be inventing him.

## And `gsw` had to be registered before any of it was allowed

The canon's language policy refused all three files: **"Language 'gsw' is not
registered."** It keeps a per-package allow-list in `khai.languages`, and the two
Swiss packages did not carry `gsw` - `switzerland` declared only `rm`, and
`ch_st_gallen` declared nothing at all. `fr-alsace` has declared `["gsw"]` all
along, which is why Alsace's whole culture could be written in Alemannic and these
three could not.

This was found by the pre-push hook, not by reasoning: the push was **refused**,
`conformance` failed with 1 of 15 walls red, and nothing left the machine. The
registration is now part of this change.

## Measured

|                                         | before | after |
| --------------------------------------- | ------ | ----- |
| `ch_st_gallen` wiring findings          | 2      | **0** |
| `switzerland` wiring findings           | 1      | **0** |
| writing grips with no tongue under them | 2      | **0** |
| `ch_st_gallen` files carrying an eszett | 2      | **1** |
| flat files in the house                 | 10     | 10    |

The eszett is incidental, not the point: `geschäftsmäßig` left with the German
prose. `piece_die_olma_bratwurst.md` still carries one and is not touched here.

## What this cannot claim

**Nothing in this house can check that the Swiss German is good Swiss German**,
and this change goes further than that admission usually has to. The new tongue's
own **Has** says there is no neutral Swiss German and that every sentence names a
canton - so these three should be St. Galler and Urner respectively, not generic.
**That is the part least able to be verified from here.** The wiring above is
defensible on the record; the variety of the prose wants a reader from the
Ostschweiz and one from the Innerschweiz, and the pull request asks for exactly
that rather than for a diff review.

The `gsw_ch` tongue these three link landed first, in its own pull request, so
every address here resolves against `main`.
