---
---

**Hiberno-English joins the tongues, and Ireland's last blocker goes with it.**

`ireland` held one language position of its own, and it was the only thing between
that culture and its own package. `ga_ie` had already left in the walk that took
the nine United Kingdom tongues, where it became the `ga` anchor. This is the
other one.

**It moved whole, and that is worth recording.** The last English variety this
house moved, `en_gb_eng`, turned out to be the `en` anchor entire and had to be
rewritten before it could ship. Read against the mnemonic on the way through, this
one spends every chapter on itself, and every feature in it has Irish behind it:

- the immediate perfect built with _after_, `I'm after telling him`, which marks an
  action as just completed in a way no other English manages;
- the habitual _does be_, which marks the recurring against the single occasion;
- the cleft that fronts the important word, `It's Irish he speaks`;
- and an answer that has to echo the question's verb, `I am`, `I amn't`, `I will`,
  `I won't`, because the tongue underneath never had a word for yes or no.

That last one is the same fact the `ga` anchor already records from the other
side, and the two files now sit in the same package where a reader can see the
substrate crossing between them, which is precisely what a tongues package is for
and what neither file could show while one of them lived in a country.

It sits under `en` beside `en_gb` and the four `en_gb_*` rather than under any of
them: what marks it is spoken and, unlike theirs, mostly inherited from another
language rather than from another England.

Relinked: ireland's cast, its culture-position and its play, plus two personas
elsewhere who hold it as a mother tongue rather than as the global language, in
chile and croatia. Two more cross-culture links gone.

`build.mjs --write` took the package to **35 languages and 88 varieties**. The
version stays **0.35.0**, because the minor is the language count and English was
already here, so no dependant range moves.

`node tests/migrate_culture.mjs --culture ireland` now reports no blockers and a
clean plan: 0 own link files to rewrite, 2 inbound. The migration itself is the
next change, not this one.
