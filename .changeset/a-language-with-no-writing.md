---
---

**Sign and braille were proposed together, and taken together they break the same
assumption from opposite ends.**

Every one of the eighty-six files in the tongues package is a spoken tongue
simulated through writing, and `build.mjs` says so in its own comment. That holds
because for a spoken tongue the language and the medium are one axis. They are
not one axis:

|                 | its own grammar and lexicon | a written form of its own |
| --------------- | --------------------------- | ------------------------- |
| a spoken tongue | yes                         | yes                       |
| a sign language | yes                         | no                        |
| braille         | no, it carries another's    | yes, that is all it is    |

The design note now settles both, and the standards that name them already knew
the difference: `bfi` is an ISO 639-3 **language** code and `Brai` is an ISO 15924
**script** code.

**A sign language is a tongue and takes an anchor.** It passes every part of the
variety test except visibility in writing, and it fails that one totally rather
than partly, so the file is written in the surrounding written language and the
provenance says so. The exception does not leak: a spoken variety that cannot be
written here is unwritten because the hand at the desk lacks a source, which the
note already answers with _get a source_. No source will ever give a sign language
an orthography.

What keeps it honest is that the inability is not a hole in the file. It is the
most important fact about the language and it goes in the position's own **Loses**

- a tongue with no orthography has no archive of its own, keeps no letters and no
  diaries, and survives only on video or transcribed into somebody else's language.
  The mnemonic absorbs the exception instead of being bent around it, which is the
  test of whether an exception is real. And sign languages get no shared anchor
  ever: BSL and ASL are unrelated, ASL descends from French sign and BSL does not,
  so each takes its own anchor in the shape `co` and `br` already have.

**Braille is not a tongue and takes no anchor.** It has no grammar and no lexicon;
it is English, or German, or Arabic, set in cells. So it hangs under the language
it writes, `en-Brai` under `en/`, adding a variety and not a language, and the
count stays honest. Its file is written in print for the opposite reason to the
sign file: not because it cannot be set in its own medium but because it can, and
doing so would give the same text re-encoded rather than a second text. A page of
Unicode braille cells would demonstrate the point by being unreadable instead of
by stating it.

It still earns a position, because a script has an office even without a lexicon.
What it may never do is claim to be a variety in the sense the test means, and the
provenance has to say so plainly, because nothing about `en-Brai` differs from
English in phonology, grammar or word stock and the next reader must not go
looking for a minimal pair that cannot exist.

Governance only. The two positions this authorises are a separate change in the
package, since the guard will not take a lane mix.
