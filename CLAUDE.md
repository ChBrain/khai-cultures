# CLAUDE.md, the Cultures house

This repository is a **khai content house**: a house dedicated to cultures. It is
structured and governed exactly like a khai **plays** house, but its content
folder is **`cultures/`** (indexing a `cultures` collection) instead of `plays/`.

## What lives here

- `cultures/` holds the cultures: each a full khai **play** staged as a culture —
  a subdirectory of khai instances across the whole play canon (play, pitch,
  plot, persona, position, place, process, piece) anchored by a `play_*.md`. This
  is the only content.
- The rest is the wiring and the gates, raised once and not improvised.

## The house is the Estate

`README.md` is this house's **Estate identity**: the production that answers for
the run. Every culture logs the house in its `Estate` (E), and the conformance
test checks the link resolves. A culture with no Estate is not yet a production.

## Branching

Computed, not chosen. Let the guard pick the lane:

```
npx khai-guard branch <topic>
```

- `culture/<topic>` owns `cultures/**` (the content).
- `governance/<topic>` owns the gates and config (`.github/**`, `.husky/**`,
  `khai-guard.config.json`, `tests/**`, `CLAUDE.md`, `GEMINI.md`, `README.md`,
  `REFERENCE.md`, `REFERENCES.md`, `management/**`).
- `changeset-release/*` is a bot-controlled general lane for version releases.

A **management order** (`management/orders/**`) is a **rider**: an order directs
work in any lane, so it rides the lane of the change it drives. Write the order
beside that change and the guard folds both onto one branch (an order that
restages a culture lands as one `culture/` PR); committed alone, an order homes to
`governance/`. So an order and the change it commands are one PR, never two.

Never `--no-verify`. Never merge; open the PR and stop.

## Versioning

The minor version IS the culture count, computed not chosen; the **Version
Packages** PR is the deploy gate every release passes through. `npx khai-tests
registry build` (run by the `version` script) sets the version from the count:
`0.<count>.0` (the minor is the count, the patch resets to 0), reconciling both
`package.json` and `registry.json`. The build is the single writer of the version
number; never hand-edit it. A fresh, empty house stays `0.0.x`.

- **Adding a culture** -> a `minor` changeset. The PR carries it, so the deploy is
  steered through the Version Packages PR and the CHANGELOG names the culture.
  `changeset version` bumps the minor and the build reconciles it back to the
  culture count, resetting the patch to 0 (`0.<count>.0`). It **must** be `minor`:
  a `patch` (or empty) changeset survives the reconcile (count === minor) and
  drifts the version to `0.<count>.1`, so the `changeset-check` gate rejects it.
- **A fix to existing content** (ships package `files`) -> a `patch` changeset; it
  ships at the same culture count (`0.<count>.1`).
- **A change that ships nothing** (governance, tooling, docs, tests) -> an
  **empty** changeset (`npx changeset add --empty`); it records the PR and merges
  green without republishing identical content.

## Coverage

A play's `Company` is a closed cast and its plots field it. Touch a culture and
that culture must come out with **zero dead Company entries**: every place,
piece, process, stance position and persona it lists is cast by at least one of
its plots. Pitches, language and culture positions, and plans are never counted
(they are keyed or held one way, not fielded in a scene). Check before you push:

```
node tests/company_coverage.mjs --report
```

The gate runs on the cultures a PR touches, so the debt only ever shrinks. If
casting something would be anachronistic or contrived, waive it with a reason in
`cultures/<id>/coverage-waivers.json`; never invent a scene to satisfy a counter.

## The tongues stand alone

The language varieties live in `packages/khai-cultures-tongues`, held by the
speech community that speaks them rather than by a country, and a culture casts
one by package specifier. The package must be readable by someone who installed
it and nothing else: no link escaping it, no link naming a culture package, no
culture in its manifest, and every variety carrying its own `language:`. Checked
on every pull request, not as a ratchet, because it started clean.

```
node tests/tongues_standalone.mjs
```

The implicit half is yours, not the gate's, and the mnemonic settles it. A
position's chapters are `Has / Orders / Loses / Drives` **of the office**: what
the tongue gives whoever holds it, what its grammar forces them to mark, what it
cannot say, how it shapes the mind that thinks in it. **Where is not one of the
four.** A variety may identify itself and name the speech community that holds
it, because that community is the position's own subject. It may not make claims
about a culture's institutions, cast or scenes: "no place in the schools of
Melilla" describes a city's schooling, not a tongue. Read a variety against the
mnemonic in the slice that moves it, with `node tests/tongues_standalone.mjs
--drift` for the queue. The queue sorts by how much a mention wants reading:
`FOREIGN` is a culture that does not cast the variety and is nearly always
wrong; `held by` is a culture that does, and is the harder read, because the
allowed sentence and the forbidden one name the same place.

## Sub-national cultures

A sub-national culture carries two facts its `geo.json` already knows, and both
are gated the way coverage is: on the cultures a pull request touches.

Its **id carries its parent's ISO country code**, `de_schleswig_holstein`,
`us_georgia`, `es_navarre`, because the id becomes the package name and an npm
name is permanent. Only the prefix is checked; the rest of the name is yours.

Its **culture-position links its parent's**, because a sub-national culture is a
way of being the culture above it. The nesting goes on the position, never on
every persona: Bavarianness is a way of being German, not a second passport.

```
node tests/culture_conformance.mjs --report
```

## The defining question

Coverage is a counter; it cannot tell you whether a play is true. So whenever a
culture is touched, the other question is asked with it: **what defines this
culture, and does the play stage it?** Germany passed every counter while
staging its whole memory apparatus and no plot between 1871 and 1949.

This is a dialogue, culture by culture, not a rule: the house has cultures that
name their catastrophe and cultures that stage the recovery instead, and both can
be right. See [The Defining Question](management/orders/order_the_defining_question.md).
Where the answer is that a culture stands as it is, write the reasoning into its
`REFERENCES.md` rather than leaving the next hand to ask again. Never stage an
apology in place of a deed, and never invent a scene to satisfy a counter.

## Protection

Content is CC-BY-NC-SA, code is MIT (see `LICENSE` and `LICENSE-CODE`); sources
are credited where they are in the public domain, never claimed. `main` is
protected: pull requests and the gate checks (`khai-tests`, `khai-guard`,
`khai-branch-scope`, `khai-company-coverage`, `khai-subnational-conformance`) are
required before merge.
