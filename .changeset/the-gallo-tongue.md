---
---

**Gallo joins the tongues.**

Brittany shipped one release ago naming Gallo in its culture-position as the
thing that is never counted, because there was no position to cast. This writes
it, and closes that gap.

Every chapter is the office and not the map. What it gives: the preterite still
alive in the mouth, where spoken French keeps it only in books; a vocabulary of
weather, soil and field-work French never had; words taken from Breton along the
line that has cut Brittany in two for a thousand years; and three ways of
writing it - ELG, MOGA, ABCD - that almost nobody knows. What its grammar makes
a speaker mark: whether a past thing is finished or still bears on now, chosen
sentence by sentence rather than settled by the tense system; and which parish
the speaker is from, because the preposition `o` and how it binds to the
following word are not the same from one to the next. What it cannot say: its
own name, since ISO 639-3 files it inside `fra` and a century of schooling
taught its speakers `patois`, or bad French, as the only word they had for
themselves; and Brittany, since the flag, the schools, the festivals and the
road signs are Breton's, and Gallo covers half the ground with none of the
symbols. And how it sorts the world: by teaching that being from a place and
having the right to say so are different things.

**Gallo is a top-level language directory, not a variety under `fr/`.** The
package's tree already says sister rather than daughter for the Germanic case -
`bar`, `ksh`, `nds`, `swg` all hang from the root and not from `de` - and Gallo
stands to French exactly as Bavarian stands to German. The only reason the
Germanic sisters get their own directory is that ISO gave them a code. Gallo has
none, and filing it under `fr/` because of that would let an ISO omission make a
genealogical claim the package does not believe. `language: fr-x-gallo` in the
frontmatter is the detector's business and not the tree's: it says the prose can
only honestly be gated against French, which is true, and says nothing about
descent.

This is the third tongue here whose Has and Loses turn on a written norm, and
the three answer differently. Corsican has no norm because nobody wanted one.
Breton has three because everybody did. Gallo has three that nobody has heard
of - and is the only one of the three that can still be spoken without meaning
anything by it, because nobody ever made a banner of it.

Flagged `review: native`, and it is the weakest of the three: see the note in
`provenance.json`. `build.mjs --write` took the package to 0.30.0 at 30 languages
and 75 varieties and updated the declared range in the 51 packages that depend on
it. Ships no package content of its own.
