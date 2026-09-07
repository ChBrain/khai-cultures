---
---

**The maximum-choices turn, and it found a mis-filed anchor.**

`pt` was the last language family with **no anchor at all** and eight files waiting
under the umbrella. This takes the two that `lusophone` needs, and the anchor it
creates is what the other six will hang from.

## The anchor was already written, under a variety's code

`portugal` held `position_language_pt_pt.md`, and it is not a European variety. Its
own declared name is **`a língua portuguesa`**, its own title read _the Portuguese
Language_, and every chapter is language-wide:

- **ser** against **estar**, splitting essence from passing state where other
  languages have one verb
- the **personal infinitive**, inflected for person (_falar, falares, falarmos_) —
  no other major Romance language keeps it
- the **future subjunctive**, alive in daily speech (_quando ele chegar_), which
  Spanish and French have nearly lost
- **saudade**, naming in one word what other languages need a sentence for
- and in Orders, **mesoclisis**: the pronoun locked into the middle of the verb,
  _dar-lhe-ei_, _contar-te-ia_

So it is **renamed to the anchor**, on the `ar_sa` and `ro_ro` precedent, byte for
byte. **No `pt_pt` is written** — inventing a European variety now to fill the hole
a rename left would be the opposite of the correction.

**One item is arguably not the anchor's.** Mesoclisis is in living use in Portugal
and largely bookish in Brazil. It stays, because it is a rule of the standard
language rather than of one country, and a variety that does not use it says so in
its own Orders — which is what a variety file is for.

## The variety is genuine in three chapters of four

My first reading of `pt_br` was that it duplicated the anchor. **That was wrong, and
the correction is worth the space.** Its Orders, Loses and Drives are Brazilian and
nothing else:

- the **Brazilian gerund**, _estou fazendo_, named explicitly against the _estou a
  fazer_ that other variants use
- the choice at every greeting between **você** and the rarer **tu**, which now
  marks region rather than formality
- the **collapse of the tu/você distance** that other variants still keep
- and the habit of preferring the gerund, which _marks the speaker from here the
  moment they open their mouth_

**Its `## Has` is the anchor's.** It opens _"O que o português permite dizer"_ and
then lists the personal infinitive, the future subjunctive and nasal vowels — all
pan-Portuguese, and the first two are in the anchor in substance. That is the
`sv_fi` fault confined to **one chapter rather than a whole file**, which makes it
much smaller than it first looked.

It is **not repaired here**: rewriting that chapter authors `brazil` and charges it
for five dead Company elements that belong to brazil's own migration. What the
chapter should carry instead is already known — open and closed vowels, the
near-total loss of the second person plural, proclisis where Portugal has enclisis,
and _a gente_ for we.

## Both land byte for byte, and here is why

This move serves **two cultures at once**, so it is its own pull request, and the
limit established at #608 applies: one edited byte would author `portugal` and
`brazil` and charge them for **twelve dead Company elements** between them, seven
and five. So both titles are left wrong — the anchor still reads _the Portuguese
Language_ where this package writes the bare name — and each is corrected when its
culture migrates, which is the pull request that was going to author it anyway.

## Counts

**48 languages, 106 varieties, 0.48.0** — one new language, so the minor moves by
one; `pt_br` is a variety and moves nothing. **319 cultures at 0.319.0.**

Inbound: the anchor was linked by eleven files — six inside portugal, **four in
`timor_leste` and one in `maldives`**, both of which reach it by specifier now.
`pt_br` by ten — seven inside brazil, one each in `cape_verde`, `italy` and
`uruguay`.

**After this, `portugal` and `brazil` both plan clean**, which is all of
`lusophone`:

```
portugal  portugal -> @chbrain/khai-cultures-portugal
brazil    brazil -> @chbrain/khai-cultures-brazil
```

And the anchor is now standing for the six `pt` files still under the umbrella:
angola, cape_verde, guinea_bissau, luxembourg, mozambique, sao_tome_principe.
