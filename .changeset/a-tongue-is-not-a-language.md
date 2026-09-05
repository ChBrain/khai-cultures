---
---

**The design note still describes a file that no longer exists.**

#569 and #570 merged in that order, and the second corrected a framing the first
had already fixed in place. The package now holds braille as
`position_braille.md` at its root, a tongue that is not a language; the note on
`main` still says braille hangs under `en/` as `en-Brai`, a variety of English.
Main documents a path nothing is at. This replaces the section with the framing
the code actually implements.

**The correction is that a tongue is not a language, and the package counts the
second.** A tongue is an office somebody holds and stands at a depth in, channel
by channel. A language is a system with its own grammar and lexicon. Every
position here was both, so nobody had to tell the two tests apart, and the package
could be named for the first while its version counts the second without the
difference ever showing. Sign and braille are the first two that come apart, and
they come apart in opposite directions.

`position_language.md` already set the office: speaking and writing carry meaning
out, hearing and reading let it in, thinking runs underneath. So a candidate is
asked two questions rather than one.

|                 | out, live | in, live | thinking | out, durable | in, durable | a language |
| --------------- | --------- | -------- | -------- | ------------ | ----------- | ---------- |
| a spoken tongue | speaking  | hearing  | yes      | writing      | reading     | yes        |
| a sign language | signing   | watching | yes      | none         | none        | yes        |
| braille         | none      | none     | none     | writing      | reading     | no         |

**A sign language is both and takes an anchor.** The live pair maps without
straining, because the channel names are functional rather than anatomical.
The durable pair is absent rather than weak, which is the position's own Loses,
and the consequence is checkable: a persona holding one can be wired to
`process_speaking_*`, `process_hearing_*` and `process_thinking_*` and to no
reading or writing process at any depth, because there is no channel to stand at
a depth in.

**Braille is a tongue and not a language and hangs from the root.** The root is
what keeps the version honest: `languages()` and the kit's `countItems` both walk
directories, so a top-level position is a member, carries provenance, renders, and
moves no number. `build.mjs` holds the slot as `nonLanguages()`.

**And the objection is answered rather than waved off.** If braille is a medium,
why is signing not? Because signing has a medium of its own alongside it: a manual
coding of a spoken language is to speech what braille is to print, and BSL is not
that. Deaf communities distinguish the two sharply and for exactly this reason.
That pair is now in the note, because it is what keeps the two tests from
collapsing back into one.

Governance only, and it removes a contradiction rather than adding a rule.
