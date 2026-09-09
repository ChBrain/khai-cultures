---
---

Aragonese joins the tongues as `an`, and a persona stops thinking in a language
the house does not hold.

**Found while preparing Aragon to leave the umbrella.** `es_aragon` casts
Piluca, a Pyrenean shepherd in a high valley of Huesca. The play gives her mother
tongue as _"el aragonés de montaña"_ — as a bare phrase, linking nowhere. Her
**second** language, the Castilian of Aragon, links correctly to `es_es_ar`.
There was no `an/` in the tongues package at all.

**No wall catches that.** `persona_wiring` asks whether a persona has a tongue
under their grip, not whether the mother tongue they are given resolves. Piluca
has one — the wrong one, the one she was not raised in — so she passed every
gate while thinking in a language this house did not hold. That is a new class of
miss, and a narrower one than the `language:` fault of #640: there the play names
the wrong language, here it names the right one and nothing is behind it.

So the working order applies as written — _move the needed tongues, then move the
culture_ — and this is step 3 on its own, before Aragon goes anywhere.

**Aragonese** is a Romance language of the Huesca valleys, definitely endangered,
with perhaps ten thousand active speakers. What it holds is largely what
Castilian let go: the Latin initial F- (_ferro_, _fillo_, _fer_), the intact
`pl-`, `cl-`, `fl-` clusters, and the `-it-` outcome that is audible from a
distance (_feito_, _nueit_, _muito_, _güello_). And two clitics Castilian has no
way to say at all, `en/ne` and `bi/i`, which put _of that_ and _in that place_
inside the verb: _bi ha pan_, _no'n quiero_.

What it loses is the honest part. It has no monolingual speakers — all of them
hold Castilian too, so it is never the language of the paperwork, the school or
the office. It has no agreed standard, so cheso, ansotano, belsetán, chistabín
and patués each write the same word three ways, and choosing a spelling is
choosing a side before the first noun. And it lost its own name in law, when a
statute called it _"lengua propia de las áreas pirenaica y prepirenaica"_ rather
than say _aragonés_.

Its closing turn is the exact inverse of Esperanto's, added last change. Esperanto
is a language nobody was born into. Aragonese is one that fewer and fewer are:
_bella part d'os que la charran millor no la sintioron en casa, sino que la
aprendioron a costa suya de mayors, de traza que una luenga materna se ye
tornando, ta muitos, una luenga trigada._

Written in Aragonese like the other anchors, in the common orthography with the
`o`/`a` articles. **Flagged for native review with more weight than usual**: the
standard itself is contested, so a speaker will place the choices made here
before they read a sentence.

Counts, run rather than assumed: tongues languages 65 → 66, varieties 145 → 146,
package minor 0.65.0 → 0.66.0 — the language count, so the dependency range
ripples through every package that installs the tongues, with no content change
in any of them. `tongues: 146 varieties, 0 finding(s)`; flat files unchanged
at 46.

Reported, not repaired: `persona_wiring` cannot see a named mother tongue that
resolves to nothing. Piluca was the one instance found while walking Aragon;
nobody has swept the house for others, and that is a governance-lane question,
not this change.
