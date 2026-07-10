# Pass B — Cross-Culture Foreign-Use Links (execution scope)

Companion to the Design of Record (`language-engine-and-plans.md` §2.6, §3) and the
Pass-A manifest (`language-positions-manifest.md`). Pass A is **complete**: every
culture owns a `position_language_*.md` for each variety its personas natively hold,
and every persona links a language position (house-wide scan: 0 unmarked). This
document scopes **Pass B**, the second and final wiring pass — done in **one pass over
every foreign channel** (§3), so each persona is finished right the first time.

## 1. What Pass B is

The ownership rule (§2.6): a variety belongs to its **home** culture; when a persona
_uses_ a **foreign** tongue it does not get a local copy — it links **cross-culture
by relative path** to the exact variety in that variety's home culture. Pass A wired
every persona's **own** tongues (bare, same-directory links). Pass B wires the
**foreign** tongues — the languages a persona produces that are not native to its own
culture.

The reference already in the tree (Adenauer, `cultures/germany/persona_adenauer.md`):

> Er … muss … mit dem **[Französischen](../france/position_language_fr_fr.md)** und
> dem Englischen verhandeln, Sprachen, die er nur
> [wie ein Werkzeug trägt](process_speaking_carried.md) …

His French is already cross-linked to France's variety; his **English is not yet** —
that missing link is a Pass B target. Adenauer is one of ~645.

## 2. Population (measured)

- **1155** personas house-wide.
- **645** carry an **active foreign-speech** channel — `process_speaking_carried`,
  `_borrowed`, or `_worn` (the tongues a persona actually _produces_ beyond the mother
  tongue). This is the **B1** population.
- **5** personas currently hold any cross-culture link (Adenauer + the four Iberian
  personas re-marked in Pass A). So B1 is effectively greenfield: **~640** personas to
  wire.

Not every carried channel is a _foreign_ tongue — some carry a **co-official** tongue
of their own culture (already owned bare, e.g. a Swiss francophone carrying Swiss
German → `position_language_de_ch.md`, same house, not cross-culture). The agent
distinguishes per persona: **own-culture co-official → bare link (or already present);
foreign → cross-culture path.**

## 3. Channel scope — every foreign channel, one pass per persona

Pass B wires a persona's foreign tongues on **every** channel it uses them, in one
pass — not active speech first and passive later. The expensive step is cognitive:
read the persona, identify which tongues are foreign, and resolve each to its home
variety (§4). Once that judgment is made, marking every channel that tongue appears on
is marginal — so splitting speech from reading/hearing would only force reading all
~645 personas twice and risk the two sweeps disagreeing on the variety. The unit of
work is therefore **per persona → per foreign tongue → all its channels**:

- active **speech** — `speaking_carried` / `_borrowed` / `_worn`;
- passive **reading** — `reading_followed` / `_deciphered` / `_caught`;
- passive **hearing** — `hearing_followed` / `_caught`.

This satisfies the §2.6 coverage law ("every tongue a persona uses on any channel,
marked twice") in a single pass. The active-speech count (645) sizes the population
that _speaks_ a foreign tongue; the same personas' passive foreign channels are wired
in the same edit.

## 4. Variety-selection policy — context per persona, no global default

The design law is explicit: **"the variety chosen follows the persona's heritage and
context, not a default."** Pass B honours this — there is **no** blanket
"English → en_us." For each foreign tongue a persona speaks, the agent reads the
persona's prose (heritage, biography, era, institutions, geography) and picks the
**one** variety whose home culture best fits that context, then links it by path.

Resolution procedure, per foreign tongue per persona:

1. **Heritage tie** — mixed/immigrant background naming a country → that country's
   variety (German-Nigerian's English → `../nigeria/position_language_en_ng.md`).
2. **Institutional/colonial context** — the education system, employer, empire, or
   church the prose ties them to (Indian civil servant → `../united_kingdom/…en_gb…`;
   Francophone-African official → `../france/…fr_fr…`; Latin-American professional's
   English → `../usa/…en_us…`).
3. **Geographic adjacency / lingua-franca reality** — the dominant regional standard
   they would actually meet, when 1–2 are silent.
4. **Era guard** — do not link a variety that post-dates the persona; a pre-modern
   figure references the tongue's then-form or its closest owned variety, never an
   anachronism (same rule Pass A used for Kupe/Massinissa).

If, after 1–4, the prose genuinely underdetermines the variety, the agent records the
persona in an **`## Undetermined`** review list in its wave report rather than
guessing — the coordinator (or the user) rules on those, keeping the "no default"
promise honest.

### Link targets already in the tree (the home-culture varieties B1 points at)

| Tongue     | Owned varieties available (examples)                                                                                                                                         | Count     |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| English    | `usa/en_us` (+ 50 states `en_us_<st>`), `united_kingdom`/`england/en_gb_eng`, `ireland/en_ie`, `australia/en_au`, `canada/en_ca`, `nigeria/en_ng`, `jamaica/en_jm`, `india`… | 87 `en_*` |
| French     | `france/fr_fr`, `switzerland/fr_ch`, `canada`/`quebec`, `belgium`, W-African francophone…                                                                                    | 21 `fr_*` |
| Spanish    | `spain/es_es` (+ CCAA `es_es_<sub>`), the Latin-American nationals `es_<cc>`                                                                                                 | 37 `es_*` |
| Portuguese | `portugal/pt_pt`, `brazil/pt_br`, lusophone Africa                                                                                                                           | 8 `pt_*`  |
| Arabic     | the Arab nationals `ar_<cc>`                                                                                                                                                 | 20 `ar_*` |

The canon link-check already gates both ends: a link that resolves to no owned file
fails, and a variety no one links fails — so a wrong or dangling target cannot merge.

## 5. Execution

- **Cadence:** batched **accumulating waves on one branch** (`culture/pass-b`), one PR,
  committed green per wave — the model that carried Pass A. This **supersedes** the
  Design-of-Record §3 line "one PR per culture" (≈286 PRs), impractical at this scale;
  §3 is amended in spirit, not by re-litigating the ordering law (Pass A before B,
  which still holds).
- **Wave unit:** one agent per culture-cluster (~6–8 cultures), ≤4 agents in flight
  (the session-limit ceiling learned in Pass A). Order of reads targets where loss
  bites hardest first: the multilingual states, then the diaspora/young-global and
  writer/orator archetypes, then the long tail.
- **Per persona:** add the foreign-variety link at the **existing** foreign-speech
  channel in `## Projection` (keep the `process_*` leaf), written in the file's own
  tongue as an appositive — never inventing a channel, never re-marking a mother
  tongue. Existing Pass-A links stay intact.
- **Position `## Drives`:** a cross-culture holder is a real holder — add the foreign
  persona to the target variety's `## Drives` by relative path
  (`../<culture>/persona_*.md`), so the linked variety names who reaches for it.
- **Gates each wave:** `npx vitest run` (0 failures, no orphan/broken-link),
  `npx khai-tests registry build` + `prettier --write registry.json`, `prettier --check .`.
  Ships a **patch** changeset (enrichment, culture count unchanged, version stays
  `0.286.x`). Culture-lane only.

## 6. Definition of done

- Every persona that uses a foreign tongue links it cross-culture (or bare, where the
  tongue is own-culture co-official) on **every channel** it uses that tongue, or is
  listed as reviewed-undetermined with a reason.
- Every target variety's `## Drives` names its cross-culture holders.
- House-wide scan clean: no foreign tongue used on any channel without a linked
  position (the same coverage bar Pass A met for own tongues).
- All gates green on the single `culture/pass-b` PR.

## 7. Out of scope

- New **cultures** (e.g. Hong Kong, Macau, provinces/cantons) — separate content
  authoring, not a language pass.
- Any change to the engine law, gates, or naming standard — Pass B only wires links
  the standard already defines.
