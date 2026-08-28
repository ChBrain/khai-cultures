# Order: the migration ratchet

**A culture you touch moves into its own package.**

Not a wave, not a campaign, not a day set aside. The house has 290 cultures and
a plan to make each one a package ([Cultures as
packages](../design/cultures-as-packages.md)), and a plan of that size executed
as a project is a project that is always about to start. So it rides the work
that is already happening: the culture you were going to edit anyway comes out
of the umbrella and into `packages/khai-cultures-<name>/`, and the pull request
that carried the edit carries the move.

This is the same shape as every other ratchet here — coverage, sub-national
conformance, persona wiring, plot zero — and for the same reason. Fire on the
cultures a pull request touches and the debt only ever shrinks, nobody is ever
asked to pay for a culture they did not open, and the house is never red.

## Why a package at all

Because a dependency is the only reference npm can check.

`../france/position_language_fr_fr.md` resolves perfectly in this working tree
and ships broken: the neighbour is not in the tarball, and nothing anywhere says
so. `@chbrain/khai-cultures-france/position_language_fr_fr.md` resolves only
through a declared dependency and fails closed when there is none. That is the
whole trade, and it is the reason the split is worth its cost.

The rest follows from it. A culture that is a package can be installed on its
own, so another house can draw on one culture as material without taking 289
with it. The umbrella keeps the count and the identity; what changes is only
where the count is taken.

## What a migration is

`node tests/migrate_culture.mjs <id>` prints the plan; `--write` performs it.
The mechanical half is the tool's and the judged half is yours, and the split is
deliberate: the tool refuses rather than guesses.

It performs:

- the directory move, `git mv` so the history follows;
- the manifest — the production layer (`khai.class "house"`, `khai.production`,
  the anchoring play, **no `khai.engine`**), the frozen name
  (`@chbrain/khai-cultures-<id with hyphens>`), the licence pair, `files`;
- the culture's own outbound links, rewritten to package specifiers, with a
  dependency declared for each;
- every inbound link from the cultures it left behind, rewritten the same way,
  with the umbrella declaring the dependency on their behalf;
- the umbrella's own dependency on the production it let go.

It refuses two things, and both need a person.

**A culture still holding its own language positions.** The tongue moves first.
That is not a file move: a language position says what the tongue does to
whoever holds it — `Has / Orders / Loses / Drives` **of the office** — and a
variety written inside a culture's directory has almost always absorbed that
culture's institutions into chapters that have no room for them. The read
against the mnemonic is the work; `tests/tongues_standalone.mjs` gates the
result. See the tongues section of `CLAUDE.md`.

**A `../` link that is not a culture-position.** The sub-national nesting links
map onto a specifier exactly and the tool rewrites them. A link to a
neighbour's place or piece does not map onto anything: it is either content that
should be this culture's own or a dependency somebody has to decide on. A
published production carries no `../`, so it is decided before the move, not
after.

## What holds the house while it is in two pieces

During the walk a culture lives in one of two homes and both are homes. Three
things make that safe, and each of them exists because the alternative failed
once already.

**One resolver.** `tests/culture_sources.mjs` is the only file that knows where
a culture can live. Every gate, every report and every test asks it. When the
content last moved, three ratchets kept a literal path that no longer matched
and spent weeks reporting "no culture touched" on pull requests that added
plots and personas — green, and reading nothing. The migration moves the path
again, once per culture, which is that failure in a slower and quieter form: a
resolver that finds 289 of 290 looks exactly like a resolver that works.
`tests/migration.test.mjs` pins both halves — that a production package is
found, proven on a synthetic workspace so the proof exists before the first real
move, and that no other file has typed the path again.

**One count.** The minor version IS the culture count, and the kit's registry
build counts subdirectories. Migrate a culture and the kit's count goes DOWN,
which lands the release on a version already published.
`tests/registry_hybrid.mjs` runs after the kit's build and reconciles the whole:
every culture is in `registry.json` wherever it lives, a migrated entry names
the `package` that ships it, and the version is the true count.

**One gate the workspace cannot fake.** A workspace resolves every member
whether or not anybody declared it, so a culture that casts a tongue it does not
depend on works here and breaks for the first person who installs it. That is
the one class of mistake that cannot be found by running the house, and
`tests/production_packages.mjs` is the wall: khai's own
`validateProductionPackage` for the canon and the `../` publish invariant, and
then the four things only this house knows — the name rule, every cast
specifier declared, a sub-national culture depending on its parent, and the
umbrella still naming every production it let go.

## The order of the walk, as measured rather than as planned

The design expected the tongues to move in fan-in order, narrowest first, so the
widest variety would be the cheapest to land. That is still true of the tongues.
It is not what orders the _migration_, because a culture is held by whatever its
personas happen to reach for, and one persona with a foreign tongue holds the
whole culture. `node tests/migrate_culture.mjs --queue` prints the real queue:
what is ready, and what holds the rest, largest block first. On the day this
order was written six cultures were ready, 258 were held by their own tongue,
and `en_gb` alone held ninety-four.

So the wide varieties are not last any more. They are the ones worth moving,
because each one unblocks a hundred cultures rather than one.

## What this order does not say

It does not say migrate a culture you are not otherwise touching. The ratchet is
the point: the move is paid by the work already being done, and a culture nobody
has opened stays where it is until somebody does.

It does not make the split a goal in itself. A culture is a play before it is a
package, and every question the house asks about a play — what defines this
culture, does it say where it comes from, does it reach the present, is the
Company alive — is asked before this one and outranks it. A clean package around
a play that answers the wrong question is worth nothing.
