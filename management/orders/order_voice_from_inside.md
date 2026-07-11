---
khai: order
title: "Voice from Inside: Re-voice the Templated Cultures"
declared: "Voice from Inside: Re-voice the Templated Cultures"
language: english
license: CC-BY-NC-SA-4.0
stamp:
  owner: KAI HACKS AI
  version: v0.0.1
  date: "2026-07-11"
---

# Order: Voice from Inside: Re-voice the Templated Cultures

## Direction

A culture in this house is loaded to be **performed**: whoever (or whatever)
loads it is expected to _be_ the culture, not cartoon it. That sets the bar for
every file: the prose must speak _as_ the culture - its idiom, its cadence, its
self-understanding - and a performer loading it must be distinguishable, blind,
from every sibling. A full-house review (all 288 cultures, play and pitch read
in full, positions and personas where cloning showed) found the
sovereign-country canon largely passing that bar, and the three subdivision
waves failing it wholesale. This order directs the repair.

## Orders

- Owner: [The Playwright](../position_playwright.md)

## Implementation

What the review found, and the path to fix it. The house pitch form (the
Taxonomy frame "it changes nothing of what happens, it only sets how it
sounds"; the Arc's closing "under it all runs one nerve") is canon, not a
defect - the defect is noun-swapped **filling** inside that form, and an
outside-narrator register no one would use of their own home.

**Findings.**

1. **Three production-line waves - 82 cultures.** The 50 US states + DC
   (49 Arcs open "A land of X and Y, defined by…"; 16 pitches share the
   verbatim Tenor "A thoughtful, polite, and mechanical tone"; 42 Nerves end
   "…are the true anchors of a resilient society"; all 102 state personas
   contain "the loss lies in the seam"). The 17 Spanish autonomous communities
   (one pitch skeleton in all 17: "polarización geográfica persistente
   entre…", "el instinto protector de los…", " : un eco…"). 14 of 16 German
   Länder (administrative-merger Arcs "1946 durch die Zusammenlegung…",
   Amtsdeutsch noun-phrase Stakes, " : ein Echo, das … klingt", English
   exonyms in their own German prose). Local idiom, where present, is
   catalogued in language positions instead of spoken in the register.
2. **Broken orthography a performer would imitate.** 13 of 19 French-language
   cultures are written without accents (France itself: "Mediterranee…
   laicite"); Mozambique and São Tomé strip Portuguese accents; Honduras and
   Nicaragua strip Spanish accents.
3. **Wrong-language leaks under assisted-verification tongues.** Bhutan's
   play body is entirely English under `language: dzo` (the one file; the rest
   of the culture is genuine Dzongkha). Nauru's prose is not a language at
   all: looping pseudo-text of Tongan loans, Kiribati articles, and English
   nouns. Haiti, Maldives, Marshall Islands, PNG, Solomons, Kiribati caption
   links in English; Taiwan's pitch Taxonomy opens in English; Timor-Leste
   embeds the English word "nerve" in Tetun.
4. **Twins and thin voices.** England ≡ UK open with the identical sentence;
   Slovakia is a translation-twin of Bulgaria; Kazakhstan ≈ Kyrgyzstan,
   Rwanda ≈ Burundi, PNG ≈ Solomons; Kosovo is a thin echo of Albania.
   Moldova defines itself from outside ("identitate definită din exterior");
   Uganda borrows the US-state "A land of…" opening; Saudi Arabia, Jordan,
   Malawi, Zambia, Guyana, Greenland, Tuvalu describe rather than speak.
5. **Point defects.** Mali's pitch claims Senegal's teranga (Mali's own word
   is jatigiya); Andorra's Undertow all but names a Hofstede dimension ("una
   gran aversió a la incertesa"); the Balearics are called
   "atlántico-mediterráneo"; Galicia declares Galician co-official but ships
   no `position_language_gl.md`; seven pitches miss their `language:` key;
   garbled tokens (Mauritius "lapnetworld", San Marino "sich considerano").

**The repair path.** Fixes ride a `culture/` lane and ship in harvested
batches - each wave is committed, tested green, and pushed before the next
begins, so no batch is lost to a session limit. Exemplars set the standard:
`usa` and `hawaii` for the states, `spain` for the regions,
`schleswig_holstein` and `austria` for the Länder, `kentucky` for a
culture-position that speaks its idiom instead of cataloguing it.

- **Wave H (hygiene, mechanical):** restore accents in the 17 stripped
  cultures; localize English link labels from each target's own `declared:`;
  add the seven missing `language:` keys; fix the garbles, the teranga leak,
  the Andorra near-naming, the Balearic geography.
- **Waves S1 - S5 (the states):** re-voice all 51 US-state cultures from inside - play Arc and Stakes, the whole pitch, the culture-position, both defining
  personas. Kill the template strings outright; deploy the idiom in the
  register rather than cataloguing it.
- **Waves E1 - E2 (the Spanish regions):** re-voice the 17 regional pitches and
  Arcs; each community in its own key, not one clerk's.
- **Waves G1 - G2 (the Länder):** re-voice the 14 Family-B Länder - endonyms,
  dramatic Stakes, dialect spoken where it lives.
- **Wave T (twins and thin voices):** de-twin England/UK, Slovakia/Bulgaria,
  Kazakhstan/Kyrgyzstan, Rwanda/Burundi, PNG/Solomons, Kosovo; give Moldova,
  Uganda, Malawi, Zambia, Guyana, Saudi Arabia, Jordan a voice of their own.
- **Wave B (Bhutan):** translate the play body to Dzongkha, patterned on the
  culture's own existing Dzongkha files.

**Decision items (not executed by this order - the house must choose).**

- **Nauru** cannot be fixed by rewriting in place: producing genuine Nauruan
  needs native sources. Either source them, or honestly re-declare (English is
  co-official in Nauru) and rebuild the culture's files in that declaration.
- **Greenland and the Faroes** are genuine but thin; deepening kl/fo prose
  responsibly also wants native sources.
- **North Korea** is deliberately staged in the state's own sympathetic
  register, as its play declares. Ratify or revise - but decide.
- **Guinea-Bissau and Cape Verde** are (excellently) written in Kriol/Kriolu
  under `language: pt`; the declaration or the routing should acknowledge the
  creole.
- **The rider gap:** CLAUDE.md promises an order rides the lane of the change
  it drives, but `khai-guard.config.json` declares no `branchScope.riders`, so
  the guard forces order and change into two PRs. A governance follow-up
  should add `riders: [{ pattern: "management/orders/**", fallback:
"governance" }]` to make the law real.

## Targets

- [x] Review the full house - all 288 cultures, play and pitch read in full -
      against the voice-from-inside bar
- [x] Record the findings: the three production-line waves, the stripped
      orthography, the wrong-language leaks, the twins and thin voices, the
      point defects
- [x] Set the bar and name the exemplars: `usa`, `hawaii`, `kentucky`,
      `spain`, `schleswig_holstein`, `austria`
- [x] Direct the repair in harvested `culture/` waves (H, S1-S5, E1-E2,
      G1-G2, T, B); execution is tracked on the culture PR that carries the
      fixes
- [x] Name the decision items the house must choose: Nauru, Greenland and the
      Faroes, North Korea's register, the Kriol declarations, the rider gap
