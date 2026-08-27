---
---

The tongues package ships its own `playwright_instructions.md`, which is the half
of persona wiring it owns: which tongue a grip is on. The language engine already
owns the other half and says so explicitly — _"The human sets the tongues in the
room"_ — so the tongue side was never khai’s to state, and this package simply was
not stating it either.

It covers what the engine cannot: link the variety a persona actually speaks
rather than the standard above it; put in the Projection only what is true of
that person and not of everyone holding the tongue; never write how a tongue
sounds into a persona, because those four chapters are the tongue’s and written
twice they will disagree.

With it, the tongue → language edge becomes data instead of prose. `de_ch` said in
its own text that it is a written form nobody grows up in, and nothing could act on
a sentence. It now carries `mother_tongue: false`, as does `de_li`, and `build.mjs`
surfaces both into `khai.wiring.noMotherTongue` so a gate can read them.

The field is named for the width it forbids and not for speech, because every file
in this package is a spoken tongue simulated through writing — `bar_wien` is
Wienerisch on a page, a tongue that lives in the mouth made readable — so `spoken`
would have been exactly the wrong word. What is true of `de_ch` is not that it goes
unspoken but that nobody acquires it first.

The widths a grip can take are deliberately **not** copied here. They derive from
the language engine’s own manifest — 18 leaves of its members tree — and a rule
typed in two places is a rule that will disagree with itself.

## Every tongue declares how it is written

A tongue file is that tongue **performed** rather than described, and where a
tongue has no codified spelling somebody had to choose one. That choice was
being made 16 times and recorded 4 times, so the performance was happening and
its method was not.

Every tongue now carries `orthography:`, `build.mjs` renders it as its own column
in REFERENCES, and a file that declares none is a finding:

```
tongues docs: 1 finding(s)
  wep/position_language_wep.md: declares no orthography
```

44 of 60 follow a codified norm. **16 are reconstructions** — the Bairisch four,
the three `de-x-*` dialects, Alemannic, Kölsch, Palatine, the Swabian three,
Upper Saxon, Main-Franconian and Westphalian — and they now say so, including
where they deliberately depart from an existing convention (`not
Dieth-Schreibung`, `not Rheinische Dokumenta`, `deliberately not Luxembourgish
orthography`). That distinction is owed to a reader who cannot otherwise tell an
invention from a tradition.
