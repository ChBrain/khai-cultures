---
---

**Arabic was filed under Saudi Arabia, and twenty-three cultures that do not speak
it were linking that file.**

`ar_sa` arrived titled _Saudi Arabic_. Its own declared name is **لسان العرب**,
the tongue of the Arabs, and there is not one Saudi thing in it. Every chapter is
language-wide: the triliteral root that a fixed set of patterns turns into a whole
family of related words, كتب and كاتب and مكتوب and مكتبة off one root; the dual
standing as its own number between singular and plural; the broken plural that
rebuilds a word from the inside rather than adding an ending; obligatory gender on
every verb, adjective and pronoun; and the إعراب, the short case vowels the written
standard requires and the spoken dialect drops.

Its Drives could not belong to any one country. It habituates its holder to move
between a فصحى that carries the case vowels and addresses the book and the pulpit,
and a dialect that drops them and addresses the room, so a speaker carries two
systems for one language. That is the anchor's material, and it was sitting under
a flag.

So it is renamed to `ar/position_language_ar.md`, the fourth time this house has
made the same correction after `da`, `sco` and `ga`.

**Why the misfiling mattered more here than anywhere else.** Forty-seven files
across twenty-four cultures linked it, and most of those cultures are not Arab:
Afghanistan, Azerbaijan, Bangladesh, Bosnia, the Comoros, Iran, Kazakhstan, the
Maldives, Mali, Pakistan, Senegal, Somalia, Tajikistan, Turkey, Turkmenistan,
Uzbekistan. What they are reaching for is the liturgical tongue, the Arabic of the
Qur'an that a Bosnian or a Bengali learns to recite and frequently not to speak,
and every one of them was pointed at one modern state's national file for it.
They now reach an anchor by specifier.

**No `ar_sa` is written**, on the `da` precedent: what saudi_arabia held was the
language and not a variety of it, so the file moves and nothing is invented. A
Najdi or Hijazi position may be written later and would be a real variety;
inventing one now to fill the hole a rename left would be the opposite of this
correction.

**One correction to an earlier claim of mine.** This unblocks **one** culture, not
twenty-three. `saudi_arabia` now reports no blockers, 0 own link files and 0
inbound. The other twenty-three were linking Arabic wrongly but are held by their
own tongues, Urdu, Bosnian, Persian and the rest, and this does nothing for them.

Nineteen Arabic country files remain in their cultures and are a later walk. Each
needs reading against this anchor first, because at least some of them will turn
out to be carrying anchor material too.

**One thing is deliberately left wrong for one release.** The file still carries
`title: "Saudi Arabic"`. Changing it here would make the move an edit rather than a
rename, which authors `saudi_arabia` and charges it for five dead Company elements
that have nothing to do with this change - the same trap #562 hit and wrote down.
So the move lands byte for byte, saudi_arabia stays relink-only, and the title is
corrected in a follow-up inside the package where it touches no culture. Nothing
renders it in the meantime: `build.mjs` reads `declared` and `language` off the
file and everything else from provenance, so neither `README.md` nor
`REFERENCES.md` shows that field, and `declared` has said لسان العرب all along.

`build.mjs --write` took the package to **0.36.0 at 36 languages and 89
varieties** and updated the declared range in every dependant. Flagged
`review: native`.
