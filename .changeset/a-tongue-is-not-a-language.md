---
---

**A tongue is not a language, and this package has always been named for the
first while counting the second.**

Sign and braille were proposed together and between them they made the house say
out loud a distinction it had been carrying without needing: a **tongue** is an
office somebody holds and stands at a depth in, channel by channel, and a
**language** is a system with its own grammar and lexicon. Every one of the
eighty-six positions here was both, so nobody ever had to tell them apart. These
two are the first that come apart, and they come apart in opposite directions.

`position_language.md`, the root, already set the office: speaking and writing
carry meaning out, hearing and reading let it in, thinking runs underneath and
never reaches the room.

|                 | out, live | in, live | thinking | out, durable | in, durable | a language? |
| --------------- | --------- | -------- | -------- | ------------ | ----------- | ----------- |
| a spoken tongue | speaking  | hearing  | yes      | writing      | reading     | yes         |
| a sign language | signing   | watching | yes      | none         | none        | yes         |
| braille         | none      | none     | none     | writing      | reading     | **no**      |

**`bfi`, British Sign Language, is both, and takes an anchor.** The live pair maps
without straining, because the channel names are functional and not anatomical:
signing carries meaning out, watching lets it in, both need the other party
present, neither leaves a record. What is absent is the durable pair, absent
rather than weak, and that is the position's own **Loses** rather than a hole in
the file. A tongue with a literature, a poetics and centuries of Deaf community
behind it has no archive in its own hand.

The consequence is mechanical and the house can check it: a persona holding a sign
language can be wired to `process_speaking_*`, `process_hearing_*` and
`process_thinking_*` in it, and cannot be wired to `process_reading_*` or
`process_writing_*` in it at all, not at any depth, because there is no channel to
stand at a depth in. Its Drives ends on the rarest thing in the package, a
linguistic community nobody is born into by descent.

**Braille is a tongue and not a language, and hangs from the root.** It has no
grammar and no words, and it is nobody's: the same sixty-three cells carry Arabic,
Chinese, Greek and Hebrew, carry mathematics in their own codes and carry music in
a notation read the same way in Osaka and São Paulo, and the first ten letters are
the same cells in nearly every alphabetic braille because they still follow the
assignment Louis Braille made at fifteen.

It was first drafted as `en/position_language_en_brai.md`, a variety of English,
and that was wrong twice: it made braille English's property when English is only
one of the things poured into it, and it invited the next reader to hunt for a
minimal pair against English that cannot exist. Withdrawn and rewritten at the
package root.

The root is what keeps the version honest. `languages()` and the kit's
`countItems` both walk directories, so a position at the top level is a member,
carries provenance, renders in both documents, and **moves no number** - and the
minor is the language count, which braille is not. `build.mjs` gained
`nonLanguages()` for the slot, and any future occupant goes in the same way: a
manual coding of a spoken language, speech-to-text, anything held in some channels
without being a system of its own.

Its own **Loses** is the finding: three of the five channels, never had. Nobody
speaks braille, nobody hears it and nobody thinks in it, because the thinking
underneath belongs to the language in the cells.

`build.mjs --write` took the package to **0.35.0 at 35 languages and 87
varieties**, the minor moved by `bfi` alone. `bfi` is flagged `review: native`,
and the flag matters more here than anywhere else, because a hearing author
writing about a signed language in a written language is at two removes rather
than one. Braille is not flagged: its prose is English, and braille's readers read
the language they read.
