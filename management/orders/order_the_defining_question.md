---
khai: order
title: "The Defining Question"
declared: "The Defining Question"
language: english
license: CC-BY-NC-SA-4.0
stamp:
  owner: KAI HACKS AI
  version: v0.0.1
  date: "2026-08-25"
---

# Order: The Defining Question

## Direction

Every culture in this house was staged from outside before it was staged from
inside: a canon of types, filled with what a competent reader knows about a
country. That produces plays that are complete and, here and there, untrue.

Germany carried its whole memory apparatus, the Stolpersteine in its Company,
Erinnern as a process, an Erinnerungskultur plan, an Arc saying the country once
fell into catastrophe and Stakes resting on the memory of its own guilt, and it
staged no plot at all between 1871 and 1949. Of 290 cultures it was the only one
staging its remorse and never its crime. No counter caught that, and no counter
could have: the play was complete, its cast was fielded, its types were present.
What was missing was a question nobody had asked. What defines this culture, and
does the play stage it?

This order directs that the question be asked, culture by culture, whenever a
culture is touched. It mandates the asking. It mandates no answer.

## Orders

- Owner: [The Playwright](../position_playwright.md)

## Implementation

The question fires on the same trigger as the coverage ratchet, a pull request
that touches a culture, and the two are deliberately different in kind. Coverage
is mechanical and gated: does the play field what it lists? The defining question
is editorial and ungated: does the play stage what defines this culture? One is a
machine, the other is a dialogue, and neither can do the other's work.

**It is a dialogue and not a rule, because a rule here would be wrong.** The
house already answers this question differently, culture by culture, and the
survey behind this order shows why that is right. Poland stages `II wojna
światowa`, Spain `La Guerra Civil`, Russia `Великая Отечественная`, each naming
its catastrophe outright. Japan folds its war into `戦後の再生`, postwar rebirth.
Cambodia stages the Khmer Rouge as sorrow and recovery, Rwanda the genocide as
reconciliation and dignity, China as modernity and rebirth. Austria jumps from
Vienna around 1900 to the `Staatsvertrag 1955` and never crosses 1938 to 1945.
Israel has no Shoah plot. Some of those are evasions. Some are the truth of the
culture: Rwanda's national project genuinely is reconciliation, and a house-wide
rule saying every culture must stage its worst chapter would overwrite that with
a foreign judgment. The question keeps the difference the rule would flatten.

**No sweep.** A campaign to put 290 answers on record would produce compliance
and not truth. The question travels with the work, which is the same discipline
the coverage ratchet uses and for the same reason: what a culture gets is the
attention of whoever is already in it.

**What defines a culture is not always its darkest chapter.** It may be a
founding, a tongue, a diaspora, a coastline, a defeat, a craft, a piece of
paper. Germany's answer was a crime. Melilla's was the paperwork that decided who
counted as a citizen. Another culture's may be its patience, and for many the
answer will be that the play already stages it and nothing needs to change.

**A deliberate no is an answer and gets written down.** Where the dialogue
concludes that a culture stands as it is, the reasoning goes into that culture's
`REFERENCES.md`, so the next hand reads the decision instead of re-litigating it.

**Two things are never staged.** An apology in the place of a deed: Nuremberg or
the Kniefall standing in for 1933 to 1945 reproduces the evasion the staging
exists to end, and the same trade is available in every culture that would rather
show its remorse than its act. And a scene invented to satisfy a counter, which
is the failure mode this order shares with the ratchet and guards against by the
same means, by asking a person and not a number.

## Targets

- [x] Name the question and its trigger: a pull request that touches a culture
      asks what defines it
- [x] Establish it as a dialogue and not a rule: the order mandates the asking,
      never the answer
- [x] Record the survey that rules a house-wide rule out: three cultures name
      their catastrophe, five fold it into recovery or omit it
- [x] Record the first answer: Germany, `Machtübernahme und Zivilisationsbruch
1933 bis 1945`
- [x] Hand the standing question to the Playwright, to be carried into each
      culture as it is touched, with a deliberate no written into that
      culture's `REFERENCES.md`; execution rides the culture PR that answers it
- [x] Set the heuristic for choosing where to ask next: a culture whose Arc or
      Stakes name something no plot stages, the tell Germany showed
