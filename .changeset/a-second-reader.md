---
---

**A reading that is not recorded did not happen.** `order_the_passport.md` asks a second
reader one question about each culture's Cues. The lane that builds the question works. What
the house never had is anywhere to put the **answer** — so it was printed into a pull request
comment, the comment scrolled away, and nothing recorded that a culture had been read.

Every other debt in this house is a number that can fall. This one evaporated:

| debt                                 | counted      |
| ------------------------------------ | ------------ |
| titles restating their type          | 342          |
| link names repeating their file      | 635          |
| tongues describing, not performing   | 3            |
| groups owing a chain                 | 15           |
| **cultures read by a second reader** | **0 of 319** |

That last row did not exist before this change. `plot_line_audit.mjs` says in its own header
that Hawaii and Andorra were _"staged in the umbrella and read by nobody"_ — the house knew
and did not count.

**The reader was never the hard part.** There is no cheap replacement for the retired GitHub
Models: an API costs more than this is worth, Copilot was disconnected, and a code-review
scaffold can judge boring code but not whether a Cue names a people or a parliament. What
this house uses is Codex, Gemini or Perplexity, by hand — and none of them could record an
answer either. So the record comes first and the reader can be anyone.

`management/readings.json` holds judged data, the same split the tongues package already
keeps. A reading names the reader in **free text, never an enum**, because the list moves. It
goes stale against the plot count and a digest of the Cues in plot order: a new plot moves the
count, a rewritten Cue moves the digest, and editing an Action chapter does neither — the
audit asks about Cues, so a reading covers Cues.

**How it is run: not on every pull request.** A reading is a deliberate choice of culture, so
the command names one — `node tests/plot_line_readings.mjs --ask denmark` — and what it prints
is a prompt **pointing at the repository**, not the prose pasted in. That is how these readers
are actually used: given a link and told to go and read. The URL is derived from the git
remote rather than typed, so a fork or a rename cannot send a reader to somebody else's house,
and it points at `main` because a reading is of what the house ships, not of what a branch
proposes.

A pull request still says whether the culture it wrote has ever been read — a nudge that costs
nothing — but it does not ask for a reading and nobody owes one to merge.

Two things found on the way. `plot_line_audit.mjs` had **no `isMain` guard**, alone among the
modules in `tests/`, so importing it ran the CLI and wrote a question to stdout as a side
effect of asking it anything. And the enumerator here is the audit lane's own rather than
`culture_sources.cultureIds()`, because that reaches for `@chbrain/khai-tests` and this lane
runs with **no install** on purpose — a duplication chosen over a dependency, with a test
holding the two to agreeing rather than hoping they do.
