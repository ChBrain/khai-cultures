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

### 2.4 Communication between personas

Whether two personas can speak is **emergent** - read off their two language
reads, never authored pairwise (that would be O(n-squared) and would drift). The
law, declared once in `instructions.md`, states the resolution ladder:

1. **Same mother tongue and variety** -> meaning crosses whole, culture and all.
2. **Same language, different variety** (de-DE / de-AT, en-GB / en-US, Scots / en)
   -> the words cross, idiom and connotation slip.
3. **Only the worn common tongue** (Business English = English at the **worn**
   width, not a separate language) -> the transaction crosses, the culture does
   not.
4. **No shared tongue -> a proxy relays it.** A third persona who shares a tongue
   with each carries the meaning across two gaps; it arrives **twice-worn**,
   stripped a little at each hop, and the proxy holds the power.
5. **No shared tongue and no proxy** -> silence; it does not cross.

**Standing rule:** every multilingual culture fields at least one
no-shared-language pair and a **named proxy** (Switzerland: Menga reaches the
country only through Gian). Cross-**culture** dialogue resolves by the same
ladder and is staged in **groups** (a group casts member-culture personas into
one encounter) - a follow-on workstream after the per-culture rollout.

### 2.5 Language variety as a position

A language **variety** is a `position` (Has / Orders / Loses / Drives), **held and
shared** by a culture's personas - the position's `Drives` names them. A German
persona holds **German Standard German**; three Austrians share one **Austrian
German**; an English persona holds **British English**, a Scot **Scots**. `Has` is
the standard's authority, `Orders` what it prescribes as correct, `Loses` where
dialect or another variety wins, `Drives` who holds it. Varieties are
**per-culture** (self-contained); the cross-variety friction of tier 2 is read off
two personas holding different variety-positions of a shared base tongue. `pitch`
stays reserved for the single Hofstede tone; it is not used for varieties.

### 2.6 The language-position standard (naming and coverage)

Every language a culture's personas hold gets its **own** language position - one
per tongue, never one collapsed position naming several (Switzerland fields four:
`position_language_german.md`, `_french.md`, `_italian.md`, `_romansh.md`, not a
single "Viersprachigkeit"). The **coverage law** is exact: the required set is the
**union of the `language:` markers across the culture's content files**, so **no
persona is ever written in a tongue the culture has no position for** - the very
point of the position is that it holds the culture that tongue carries.

- **Naming.** `position_language_<english-name>.md`, lowercase, ASCII, underscores
  (`position_language_low_german.md`, `position_language_haitian_creole.md`). One
  per base language a culture holds; the file's `title`/`declared` still carry the
  variety's own name (`das Schweizer Hochdeutsch`, `il rumantsch`).
- **Written in its own tongue.** The `french` position carries `language: fr`, the
  `romansh` one `language: rm`; rare tongues are registered in `khai.languages`.
- **Linked by every holder.** Each persona links its language position **in its
  `## Projection`, at the channel it truly holds** (`schreibt [Hochdeutsch](...)`
  for a writer of the standard; `[sia pitschna lingua](...)` at the mother-tongue
  channel) - the position's `Drives` names them back. The canon's link check fails
  a position no persona links, so coverage is a gate, not a habit.

## 3. Rollout

- **Cadence:** one PR per culture, sequential (do one, merge, next), mirroring the
  build phase. Each is a non-count enrichment of an existing culture and ships
  with a **patch** changeset; the version is unchanged.
- **Order of reads:** target where loss bites hardest - the multilingual cultures
  (Switzerland, Spain, Scotland, Northern Ireland), the diaspora/young-global
  archetypes everywhere, the writers and orators - and hold native majorities
  whole as the baseline with loss at the edges.
- **Variety-positions:** where a culture shares a base language with another, it
  declares its variety as a `position` (German Standard German, Austrian German,
  British English, Scots) and links its personas to it.
- **Proxy, every multilingual culture:** at least one no-shared-language pair and
  a named proxy (per 2.4).
- **One governance PR** declares the engine law (the `instructions` / `Knowledge`
  chapter), including the communication ladder of 2.4.

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
  plans. Merged.
- **Switzerland:** reads + two plans (#44, merged); the proxy / no-shared-language
  case via Menga and Gian (#45).
- **Remaining:** the other 15 cultures (each: reads, plans, a variety-position
  where it shares a base tongue, and a proxy pair if multilingual), 1 governance
  PR for the engine law and the communication ladder, and a later groups
  workstream for cross-culture dialogue.

Content is CC-BY-NC-SA, code is MIT; the staging and the architecture are original
work.
