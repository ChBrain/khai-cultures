# CLAUDE.md, the Cultures house

This repository is a **khai content house**: a house dedicated to cultures. It is
structured and governed exactly like a khai **plays** house, but its content
folder is **`packages/khai-cultures/cultures/`** (indexing a `cultures` collection)
instead of `plays/`.

## What lives here

- `packages/khai-cultures/cultures/` holds the cultures: each a full khai **play**
  staged as a culture —
  a subdirectory of khai instances across the whole play canon (play, pitch,
  plot, persona, position, place, process, piece) anchored by a `play_*.md`. This
  is the only content.
- The rest is the wiring and the gates, raised once and not improvised.

## The repository is a workspace

The root is a container, `@chbrain/khai-cultures-workspace`, private and forever
`0.0.0`. It publishes nothing and holds the tooling: the gates, the changesets,
the workflows, this file. Everything that ships lives in a package beneath it,
which is how khai itself is arranged, and for the same reason: changesets treats
a workspace root as the container and not as something it can version, so a root
that tried to be both would stop being releasable the moment it gained a second
package.

- `packages/khai-cultures` is the house: the cultures, the groups, the registry.
- `packages/khai-cultures-tongues` is the tongues, depended on by name and range
  like any other package, resolved locally here and from the registry by anyone
  who installs the house.

## The house is the Estate

`packages/khai-cultures/README.md` is this house's **Estate identity**: the
production that answers for
the run. Every culture logs the house in its `Estate` (E), and the conformance
test checks the link resolves. A culture with no Estate is not yet a production.

## Branching

Computed, not chosen. Let the guard pick the lane:

```
npx khai-guard branch <topic>
```

- `culture/<topic>` owns `packages/khai-cultures/cultures/**` and
  `packages/khai-cultures-tongues/**` (the content).
- `governance/<topic>` owns the gates and config (`.github/**`, `.husky/**`,
  `khai-guard.config.json`, `tests/**`, `CLAUDE.md`, `GEMINI.md`, `management/**`,
  and the house package's own word about itself: its `README.md`,
  `REFERENCES.md` and `playwright_instructions.md`).
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
- **Migrating a culture into its own package** moves no count and adds no
  culture: the new package takes a `minor` of its own (it is new to the
  registry), the umbrella takes a `patch`, and the culture count is unchanged, so
  the reconcile lands on `0.<count>.1`. Never a `minor` on the umbrella for a
  move — the count has not gone up, and a minor that reconciles against an
  unchanged count drifts the version and the `changeset-check` gate rejects it.

## A culture you touch becomes a package

The house is walking from one package holding 290 cultures to one package per
culture, and it walks on the work already happening: **touch a culture and it
moves into `packages/khai-cultures-<name>/`**, in the same pull request.

```
node tests/migrate_culture.mjs <id>            # the plan, and what blocks it
node tests/migrate_culture.mjs <id> --write    # perform it
node tests/migrate_culture.mjs --queue         # the whole house, by what holds it
```

**Writing a new culture**: take the chapter names from the canon and never from
memory - `@chbrain/khai-arch` exports them as `types`, and a persona is
`Projection, Action, Shadow, Tell` with a required `type`, a place is `Shown,
Holds, Offers, Withheld`, a piece is `Place, Load Bearing, Apparent, Yearbook`, a
process is `Initiated by, Direction, Lever, Echo`, a pitch is `Tenor, Undertow,
Nerve, Echo`, each after `Taxonomy` and `Owner`. Write it with package specifiers
from the start so it owes no `../`, then **commit it and migrate it second**: the
tool moves an untracked directory by plain rename, but the ratchets read a
committed rename, and both commits ride the same pull request.

The tool does the mechanical half — the move, the manifest (`khai.class "house"`,
`khai.production`, the anchoring play, and **no `khai.engine`**), the frozen name
`@chbrain/khai-cultures-<id with hyphens>`, the licence pair, the outbound links
rewritten to package specifiers, every inbound link from the cultures left
behind, and the dependency declared at both ends. It refuses three things: a
culture still holding its own language positions (**the tongue moves first**, and
that is a read against the mnemonic, not a file move); a `../` link that is not a
culture-position (a published production carries no `../`, so it is resolved
before the move); and a **parent that is not a package yet**, because the nesting
link becomes a specifier and a specifier needs a package to point at.

A migration is a rename, so it is spared by the ratchets the way any rename is:
it pays no debt and incurs none. Otherwise a move would demand the `plot_00` the
culture never had, and the answer would be a bad one.

Why a package: a relative path resolves in this working tree and ships broken,
and a declared dependency is the only reference npm can check. During the walk a
culture lives in one of two homes and `tests/culture_sources.mjs` is the only
file that knows which — every gate asks it, and
`node tests/production_packages.mjs --report` holds what only this house knows:
the name rule, every cast specifier declared, a sub-national culture depending on
its parent, and the umbrella still naming every production it let go. The count
survives the move (`tests/registry_hybrid.mjs`), because the umbrella's minor is
the number of cultures and not the number of directories.

See [The Migration Ratchet](management/orders/order_the_migration_ratchet.md).
A culture is a play before it is a package: every question below this one is
asked first.

## Coverage

A play's `Company` is a closed cast and its plots field it. Touch a culture and
that culture must come out with **zero dead Company entries**: every place,
piece, process, stance position and persona it lists is cast by at least one of
its plots. Pitches, language and culture positions, and plans are never counted
(they are keyed or held one way, not fielded in a scene). Check before you push:

```
node tests/company_coverage.mjs --culture <id>
```

Ask about the culture, never grep `--report`: it prints the worst twenty and a
culture's absence from that list is not zero.

The gate runs on the cultures a PR **authors**, so the debt only ever shrinks. A
culture whose only change is where a link points — what a tongue move does to
every culture that casts the variety — is named in the gate's output and not
charged; one word of prose in the same file makes it authored again. Coverage,
sub-national conformance and plot zero all read it that way; persona wiring does
not, because a retargeted tongue link is precisely a wiring change. If
casting something would be anachronistic or contrived, waive it with a reason in
`packages/khai-cultures/cultures/<id>/coverage-waivers.json`; never invent a scene
to satisfy a counter.

A persona born after the last plot has a third option besides a scene and a
waiver: the plot may cast them in its **Tension** as what the event produced.
Ohio's Harper works out of the Cleveland the collapse left behind. The test, and
where it goes, and what it must never be used to dodge, are in
[Casting by Consequence](management/orders/order_casting_by_consequence.md); the
one decidable part is a gate, because a waiver the play has outgrown is now an
error.

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

A tongue is written **in that tongue**; that is the point of holding it as a
position at all. Which sets the entry price, because you cannot write in a variety
you cannot tell apart from its neighbour. **A variety whose distinguishing feature
cannot be named and sourced does not get a file.** Name the rule, give the minimal
pair on both sides, say whether it is categorical or shades off, and say whether it
survives in writing — a difference that is only intonation cannot go in a text file.
Fail that and the file is a regional costume on a variety already shipped, which is
how the thin ones got written: `das bayerische Hochdeutsch` wearing Bairisch
features, `bar` wearing Munich's, Augsburg's name on the Allgäu's tongue.

This is a different question from `review: "native"`, and the two are often
confused. That flag says _no speaker has read this prose_ — Tarifit carries it, and
it is the right answer to doubt about idiom. The hard stop is prior: _is there a
system here to write at all_. No flag covers that, and none should.

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

**Every culture answers where it comes from, and the answer is `plot_00`.** The
origin is not the first event in the chronology but the reply to a different
question, so it is held out of the numbering and can be prepended when it is
found. It is gated as a ratchet: touch a culture's plots or its play file and it
must have one. That the file exists is a gate; whether it is a true origin or a
state date wearing the number is this dialogue's business and never a counter's.
And every culture says where it now stands, in `plot_99`: a record of the decade
still resolving, never a forecast, held at the far end so it stays last and is
renumbered into the sequence once its events settle. Where a culture is _going_ is
a judgement and by design likely wrong, so it never becomes a plot; it lives in
that plot's Tension and in the play's Stakes, which is a question and not a claim.
See [Plot Zero](management/orders/order_plot_zero.md). Berlin opened at the Wall
and Wales ends in 1588.

**The answer is a cultural moment, not a constitutional one.** A play can carry
ten plots and still answer the wrong question: a culture named after a country
makes the country the obvious material, and foundings, treaties and borders read
as complete while describing a passport. To find the gap, take the words the play
uses about itself in its Arc, Name, Stakes and pitch, and ask which appear in a
plot. Switzerland's Name chapter says `Confoederatio Helvetica` and no plot knows
the Helvetii existed.

## Protection

Content is CC-BY-NC-SA, code is MIT (see `LICENSE` and `LICENSE-CODE`); sources
are credited where they are in the public domain, never claimed. `main` is
protected: pull requests and the gate checks (`khai-tests`, `khai-guard`,
`khai-branch-scope`, `khai-company-coverage`, `khai-subnational-conformance`,
`khai-persona-wiring`, `khai-plot-zero`, `khai-production-packages`) are
required before merge.
