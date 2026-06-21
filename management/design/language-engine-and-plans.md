# Design of Record - Deepening the Language Engine, and Adopting Plans

**Status:** agreed plan (paper trail). The pilot has landed on one culture
(Wales, PR #41); this document is the contract the remaining rollout lands
against.

**Date:** 2026-06-21

---

## 1. Problem

Two capacities of the canon were under-used across the house:

1. **The language engine was used at roughly a twentieth of its model.** Of 76
   personas, every one linked exactly **one** language leaf, in **one** language,
   and only the **speaking** and **writing** channels were ever touched. The
   engine (`@chbrain/khai-engine-language`) models five channels - speaking,
   writing (out), hearing, reading (in), and thinking (inner) - each held at a
   **width** per language (borrowed, carried, worn, mother tongue). Its whole
   point is the **gap**: "what is heard is not what is understood, what is
   understood is not what is said." That gap is where **culture is lost at the
   limits of a tongue**, and it was not being embodied.

2. **The `plan` type was unused.** `plan` is a `cast` type in the playbook
   (`process, position, piece, place, persona, plan, pitch`), and no culture
   fielded one, leaving the plays weaker than the canon allows.

## 2. The model

### 2.1 Personas carry a full language read

Each persona links, under `## Projection`, its read **per language, per channel**,
at the width it truly holds - and the prose **enacts** the loss (the engine's
rule: show it in the first beat, never narrate the width). The seam between a deep
inner channel (thinking, mother tongue) and a shallow outward one (speaking,
carried) is the loss made visible. Worked patterns from the pilot:

- **Full possession**, the baseline of what was whole (Glyndwr: Welsh across
  speaking, thinking, writing).
- **The writing seam** (Gwen: lives in Welsh, was schooled to write the world in
  English).
- **The caught echo** (Bevan: the chapel Welsh reaches him only as sound).
- **Behind glass** (Rhys: a few borrowed words, an ear for the hymn, the
  eisteddfod with no key).
- **The diaspora inversion** (for the rollout: heritage tongue received inward,
  public tongue carried outward).

This brings hearing, reading, and thinking into use for the first time, not
speaking alone.

### 2.2 Cultures field plans

A culture carries one or two `plan` instances - a deliberate national scheme,
owned by the project, tied to the cast - with `Direction`, `Orders`,
`Implementation`, and a `Targets` checklist using the canon verdicts (`[x]` done,
`[F]` failed, `[W]` waived/overtaken, `[-]` struck, `[ ]` open). The pilot fields
two: **Cymraeg 2050** (the scheme to reverse the language loss the personas
embody) and **Datganoli** (devolution, reaching by ballot what Glyndwr sought by
arms). Plans are listed in the play's `Company` and are **not counted** in the
version (the minor stays the culture count).

### 2.3 The engine law, declared once

The engine's first requirement is that the law be declared once, in an
`instructions` instance's `## Knowledge` chapter, linking the root
`process_using_language.md`, so the ladder reads system-wide. The house does not
declare it today; the rollout adds it (a governance step).

## 3. Rollout

- **Cadence:** one PR per culture, sequential (do one, merge, next), mirroring the
  build phase. Each is a non-count enrichment of an existing culture and ships
  with a **patch** changeset; the version is unchanged.
- **Order of reads:** target where loss bites hardest - the multilingual cultures
  (Switzerland, Spain, Scotland, Northern Ireland), the diaspora/young-global
  archetypes everywhere, the writers and orators - and hold native majorities
  whole as the baseline with loss at the edges.
- **One governance PR** declares the engine law (the `instructions` / `Knowledge`
  chapter).

### 3.1 Candidate plans per culture (first draft, to be tuned)

| Culture            | Candidate plan(s)                                            |
| ------------------ | ------------------------------------------------------------ |
| Wales (pilot)      | Cymraeg 2050; Datganoli                                      |
| Germany            | die Energiewende; Erinnerungskultur                          |
| France             | la defense de la langue / francophonie; the European project |
| Spain              | el Estado de las Autonomias; the Transition pact             |
| Switzerland        | direct democracy / Konkordanz; armed neutrality              |
| Austria            | the Staatsvertrag and neutrality                             |
| Denmark            | the welfare-state settlement; the green transition           |
| Sweden             | folkhemmet; neutrality to NATO                               |
| Norway             | the oil fund (Oljefondet); language normalisation            |
| Finland            | the comprehensive-school reform; EU/NATO accession           |
| Iceland            | post-2008 recovery; renewable self-sufficiency               |
| United Kingdom     | the post-war settlement; the Union                           |
| Scotland           | the independence question; Gaelic revival                    |
| Northern Ireland   | the Good Friday settlement; the Irish-language question      |
| England            | the centralisation / levelling-up question                   |
| Portugal           | the European recovery; lusofonia                             |
| Schleswig-Holstein | the dyke and coastal-defence compact                         |

## 4. Status

- **Pilot:** Wales (PR #41) - full language reads on all four personas + two
  plans. Landed against this design.
- **Remaining:** 16 culture PRs + 1 governance PR (the engine law).

Content is CC-BY-NC-SA, code is MIT; the staging and the architecture are original
work.
