---
---

**`language:` gets a definition.** It never had one.

`order_voice_from_inside.md` has been enforcing conformance to the field since it
was written - its finding 3 is a list of files whose prose is not in the language
they declare, Bhutan's English play under `language: dzo` among them. But the order
polices the field without ever saying **what the field means**, and that gap is not
academic. Measured across all 340 plays in the house:

**38 stage more than one language family in their own Company, and every one of them
holds a single `language:` value.**

| play                | `language:` | Company stages      |
| ------------------- | ----------- | ------------------- |
| switzerland         | `de`        | de, fr, gsw, it, rm |
| austria             | `de`        | bar, de, gsw, sl    |
| de-bavaria          | `de`        | bar, de, swg, vmf   |
| luxembourg          | `fr`        | de, fr, pt          |
| gb-northern-ireland | `en`        | en, ga, sco         |
| cyprus              | `el`        | el, tr              |

Switzerland stages Romansh in a German-language play. Without a definition, that
reads as either a bug or a slight, and it is neither.

## The rule

**`language:` is the language the culture meets in** - the one where it conducts
itself with itself - and for a group, the language the group meets in. It is not a
census and not a ranking. Switzerland stages Romansh and does not meet in it, which
is why the field holds one value while the Company holds five and the two do not
conflict.

Three things follow, and they are written into the order:

1. The declared language is where the play, its plots and its prose are written.
2. The other languages are **staged, not written in** - they live in the Company as
   language positions and in the personas who carry them, and a persona may be
   written in the language that persona meets the world in. That is why cyprus's
   `persona_mehmet.md` is Turkish inside an `el` culture and is correct.
3. **A plot has no language of its own.** It inherits the play's.

## The cost, recorded rather than hidden

Point 3 has a price and the order now names it. **Cyprus stages a Turkish-speaking
community in Greek prose**, because Greek is where that culture meets - even though
the play's own Arc says the two communities meet, if they meet, in English. **The
culture whose defining wound is that it has no shared language is the one this field
serves worst.**

It is still the right field. The alternative - writing the plot in one community's
language, or in a third - is a heavier claim than the one being avoided. But the
order says so out loud now, so the next person meets a recorded trade-off instead of
an unexplained default.

## What this closes, and what it opens

It closes a design question rather than a defect: no schema change is needed, and the
proposal to give a play more than one `language:` is answered and dropped.

It opens one Target, left unchecked: **nobody has read the 38 against the
definition.** A declared language that is not where the culture meets is now a defect
of the same class as finding 3, and no claim is made here about which of the 38 are
wrong, because none has been checked. But the shape to look for is visible in the
list: **`fr-brittany` declares `br` and `fr-alsace` declares `gsw`**, and both are
regions that plainly meet in French - a minority tongue in the field where the
meeting language belongs. **Luxembourg is the inverse**: it declares `fr` and stages
French, German and Portuguese, and stages Luxembourgish nowhere at all, which was
reported earlier in this walk and is still open.

Governance lane, no package touched.
