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
its own text that it is a written form nobody speaks, and nothing could act on a
sentence. It now carries `spoken: false`, as does `de_li`, and `build.mjs` surfaces
both into `khai.wiring.unspoken` so a gate can read them.

The widths a grip can take are deliberately **not** copied here. They derive from
the language engine’s own manifest — 18 leaves of its members tree — and a rule
typed in two places is a rule that will disagree with itself.
