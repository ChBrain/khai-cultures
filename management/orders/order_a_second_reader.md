---
khai: order
title: "A Second Reader"
declared: "A Second Reader"
language: english
license: CC-BY-NC-SA-4.0
stamp:
  owner: KAI HACKS AI
  version: v0.0.1
  date: "2026-09-24"
---

# Order: a Second Reader

**A reading that is not recorded did not happen. The lane asked a good question
into a comment that scrolled away.**

`order_the_passport.md` asks one thing of a second reader: name the subject of
each Cue, and say whether it is a state or one of its instruments. The lane that
builds that question works. What the house never had is anywhere to put the
answer.

So the question was printed into a pull request comment, the comment scrolled
away, and nothing recorded that a culture had been read. Three hundred and
nineteen cultures, and no way to name one a second reader has looked at.

## Every other debt here is a number

| debt                                 | counted      |
| ------------------------------------ | ------------ |
| titles restating their type          | 342          |
| link names repeating their file      | 635          |
| tongues describing, not performing   | 3            |
| groups owing a chain                 | 15           |
| **cultures read by a second reader** | **0 of 319** |

The last row is the one that did not exist. `plot_line_audit.mjs` says in its own
header that Hawaii and Andorra were _"staged in the umbrella and read by
nobody"_. The house knew that was the failure and still did not count it.

## The reader was never the hard part

The lane was written against GitHub Models, retired on 30 July 2026, and the
instinct is to wire a replacement. There is no cheap one: an API costs more than
this is worth, the Copilot service was disconnected, and a code-review scaffold
can judge boring code but not whether a Cue names a people or a parliament.

What this house actually uses is **Codex, Gemini or Perplexity, by hand, when
somebody has ten minutes** - and none of them could record an answer either.
Wiring a reader before there is a place to put the reading is the same mistake as
three correct fixes to a service that had been retired eight weeks earlier.

So the record comes first, and then the reader can be anyone.

## What is recorded

`management/readings.json`, judged data written by whoever did the judging, the
same split `khai-cultures-tongues/provenance.json` already keeps:

```json
"denmark": [
  { "read": "2026-09-24", "reader": "gemini", "plots": 9, "cues": "cf2b27630e5c", "state": 4, "says": "one line" }
]
```

An array, because a culture is read more than once: a line that gains a plot owes
another reading.

`reader` is **free text and never an enum**, because the list moves - it has
already been GitHub Models and is now three others. The one value that is always
wrong is the author's own. No field can prevent that; what the record does is
make it visible, which is the whole of the protection available.

## What a reading goes stale against

The plot count and a digest of the Cues, in plot order. A new plot moves the
count; a rewritten Cue moves the digest. Either makes the reading stale.

That is deliberately narrow. The audit asks about Cues and nothing else, so a
reading covers Cues and nothing else - edit a culture's Action chapters all day
and the reading stands, because it was never about them.

## Builtin-only, on purpose

The audit lane runs with no install so a registry it does not need cannot break
it. The enumerator here is therefore the lane's own and not
`culture_sources.cultureIds()`, which reaches for `@chbrain/khai-tests`. That is
a duplication chosen over a dependency, and the two are held to agreeing by a
test rather than by hope.

## Targets

- [ ] The first recorded reading, by anyone who did not write the culture.
- [ ] `denmark`, which gained `plot_04` and has never been read.
- [ ] Weigh "never read" in `next`, once enough readings exist to know what the
      term is worth. It is not weighed today, because a term calibrated against
      zero data is a number nobody argued for.
- [ ] Extend the record to groups, which have Triggers and Cues and answer to the
      same question.

---

**The question was never the problem. The house had nowhere to write the
answer.**
