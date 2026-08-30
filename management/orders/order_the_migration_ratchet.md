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

It refuses three things. Two need a person; the third is an ordering.

**A culture still holding its own language positions.** The tongue moves first.
That is not a file move: a language position says what the tongue does to
whoever holds it — `Has / Orders / Loses / Drives` **of the office** — and a
variety written inside a culture's directory has almost always absorbed that
culture's institutions into chapters that have no room for them. The read
against the mnemonic is the work; `tests/tongues_standalone.mjs` gates the
result. See the tongues section of `house_instructions.md`.

**A `../` link that is not a culture-position.** The sub-national nesting links
map onto a specifier exactly and the tool rewrites them. A link to a
neighbour's place or piece does not map onto anything: it is either content that
should be this culture's own or a dependency somebody has to decide on. A
published production carries no `../`, so it is decided before the move, not
after.

**A parent that is not a package yet.** The nesting link becomes a specifier and
a specifier needs a package to point at. The first dry run wrote
`@chbrain/khai-cultures-usa` into a manifest while usa was still a directory
under the umbrella — declared, unresolvable, and caught only by the production
gate afterwards. **The parent goes first**, which means a sub-national culture is
held by its parent's tongues as well as its own.

The ordering this imposes is worth reading off the queue rather than guessing at.
`--queue` said six cultures were ready before the check existed; the true answer
was zero, because all six were sub-nationals whose parents are still directories.
Nothing migrates until a national culture with no foreign tongue in its cast
does.

## What counts as touching a culture

A culture you **write in**. Not a culture a rewrite passed through.

The distinction was not needed while every change to a culture was somebody
writing in it, and the tongue walk destroyed that assumption on its first pull
request. Moving `de_de` into the tongues package retargeted one link in
twenty-one cultures that had nothing to do with the move, and the coverage and
conformance ratchets duly asked all twenty-one for zero dead Company entries, a
conforming id and a nesting link. Turkey owed five, Ukraine seven, Illinois a
rename. The next variety is `en_gb`, and it is ninety-four.

The two ways out of that were both wrong. Pay it, and the pull request that moves
one tongue also renames a state and invents scenes in two countries to satisfy a
counter, which this house forbids in as many words. Do not pay it, and there is
no tongue walk, and therefore no migration, because the tongue moves first.

So the rule is narrowed to what it always meant: **a culture is authored when any
of its changed files differs in something other than the target of a markdown
link.** Retarget `](../germany/x.md)` to `](@scope/pkg/x.md)` and the culture is
not charged. Change one word of prose in the same file and it is authored, and
owes everything it owed before. A file added, deleted or renamed is authoring
either way — only a link's destination is exempt, because only a link's
destination is a thing the walk moves out from under a culture that had no part
in it.

A **move** is spared for the same reason and by the same rule, and it has to be:
a migration is a directory rename with a manifest beside it, and if a move
demanded the origin plot the culture never had, the answer would be a bad
`plot_00`, which is worse than none. This house settled that once already — the
sub-national rename deadlocked against `changeset-check` and cost a batch its
renames, and the rule it settled on was that a rename pays no debt and incurs
none. A manifest and a licence pair are spared too: they are packaging, not play.
`geo.json` and `coverage-waivers.json` are **not** spared, and deliberately — one
carries the id and the nesting the conformance ratchet reads, the other is a
written claim that something needs no scene.

Three ratchets take the narrowed rule: coverage, sub-national conformance and
plot zero. **Persona wiring does not**, and the reason is worth keeping: a
retargeted tongue link IS a wiring change, and the gate that reads which tongue a
persona grips is exactly the gate that should look at all ninety-four.

The exemption is never silent. Each of the three prints the cultures it did not
charge, by name, on the line above its result.

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
`tests/registry_hybrid.mjs` reconciles the whole: every culture is in
`registry.json` wherever it lives, a migrated entry names the `package` that
ships it, and the version is the true count.

It **runs the kit's build itself** rather than beside it, and that is not tidying.
While the two were separate commands the first dry run still took `0.290.1` to
`0.290.0`: the kit wrote a directory-count version into the manifest, and the
reconcile then read that number, saw a minor that had moved, and reset the patch.
A version going down was the precise thing this file exists to prevent, and it
was reintroducing it one step later in the same command. Reading the version
before the kit can touch it is what makes this the single writer it always
claimed to be.

**One gate the workspace cannot fake.** A workspace resolves every member
whether or not anybody declared it, so a culture that casts a tongue it does not
depend on works here and breaks for the first person who installs it. That is
the one class of mistake that cannot be found by running the house, and
`tests/production_packages.mjs` is the wall: khai's own
`validateProductionPackage` for the canon and the `../` publish invariant, and
then the four things only this house knows — the name rule, every cast
specifier declared, a sub-national culture depending on its parent, and the
umbrella still naming every production it let go.

## What the first real migration cost, and what it bought

The United Kingdom was migrated on a scratch branch and the suite run against it
before any of this was proposed, twice. Both times it broke, and neither break
was findable by reading.

**The tool rewrote inbound links from the cultures and not from the groups.**
Twelve broken links, because a group is a referencing collection and reaches a
culture from one directory deeper (`../../cultures/<id>/...`). The tool now reads
the umbrella's referencing collections off its manifest rather than assuming
there is one kind of inbound link.

**A production owes a Playwright wiring guide**, as every package that publishes
khai content does, and the tool was not writing one. It is generated rather than
hand-kept and narrowed to the one culture in the box: two hundred and ninety
hand-kept copies of one rule is two hundred and ninety chances for them to
disagree.

**`geo.json` moved untouched and charged the whole culture.** Twenty-eight files
were spared as pure renames and the one that was not markdown was not, because
the link exemption was gated on the extension before the move exemption ran. A
migration would then have demanded coverage of every culture it moved, which is
the exemption defeated at the first culture that has any debt.

**Two of the kit's registry findings are true of a hybrid house and are not
faults.** A migrated culture is in the registry with no directory under
`cultures/`, so `validateCollectionRegistry` reports the missing directory and
then reports the file as out of date with a build that only counts directories.
They are dropped in `tests/house.test.mjs` because they are REPLACED:
`tests/registry_hybrid.mjs` now recomputes the whole registry, both halves built
by the kit, and compares. Dropping them without that would have left the house
with no drift check at all, which is the shape of failure this repository keeps
finding.

**A production registers its own languages.** The house registers twenty-five
that no engine has heard of - Romansh, Bavarian, Nahuatl, Church Slavonic - and
one declaration under the umbrella covered every culture. A production is
validated rooted on itself, so it carries the subset its own files are written
in, derived from those files and not copied whole: a package declaring
twenty-five to use one would be telling an installer something untrue about what
is in the box. Switzerland found this by failing on two personas written in
Romansh; fifteen cultures in the house need a list at all.

**The packing promise split in two.** A migrated culture is in the registry and
not in the umbrella's tarball, and that is the arrangement rather than a fault -
so what the umbrella still ships it must ship, what it has let go must be a
declared dependency, and it must not ship a file for a culture it let go. Three
assertions where there was one.

None of this was visible from the code. A shape that two hundred and ninety
cultures will follow is worth breaking once on purpose, and it is worth breaking
on a culture that is already finished, so that a real failure and a failure of
the culture cannot be confused.

## What the first AUTHORED culture found

Uri was written from nothing and migrated in the same pull request, and that is a
different exercise from restaging one. Two gaps only appear this way round.

**A culture written correctly declares nothing.** The tool derived a package's
dependencies from the `../` links it rewrote, and a culture authored today is
written with package specifiers from the start - so it has no `../`, nothing is
rewritten, and nothing is derived. Uri named its parent and did not depend on it.
Every specifier a culture ends up carrying is now declared, whether this tool
wrote it or a person did, with the range taken from the umbrella where the house
already pins one.

**Git will not move what it has never tracked.** `git mv` is right for a culture
that has been committed - it records a rename, the ratchets spare it as a rename,
and the history follows - and it fails outright on a directory authored in the
same pull request. The tool now falls back to a plain rename when the source is
untracked, which is what that move is: there is no history to preserve and
nothing for git to detect. The workflow either way is author, commit, migrate,
and the pull request carries both commits.

And one thing that is not a tool gap and is worth writing down beside them. The
chapter names of every element type are the canon's and are exported by
`@chbrain/khai-arch` as `types`: a persona is `Projection, Action, Shadow, Tell`
with a required `type` in its frontmatter, a place is `Shown, Holds, Offers,
Withheld`, a piece is `Place, Load Bearing, Apparent, Yearbook`, a process is
`Initiated by, Direction, Lever, Echo`, a pitch is `Tenor, Undertow, Nerve, Echo`,
all of them after `Taxonomy` and `Owner`. Uri was written with invented names for
all five and the canon validator returned fifteen findings. Whoever writes the
next culture reads that list first; whoever briefs an agent to write one puts it
in the brief.

## A declared range is not a resolvable one

The production gate checked that every specifier a culture casts is DECLARED, and
that is half the question. The other half cost an install.

The tongues package's minor version is its language count, in the same way the
umbrella's is its culture count. Adding Turkish took it from `0.20.0` to
`0.21.0`, and `^0.20.0` does not match `0.21.0`, so npm could no longer resolve
it from the workspace, fell back to the registry where this package has never
been published, and failed the whole install with a 404. Six manifests carried
the stale range. There will be two hundred and ninety.

The gate holds it now: every dependency on a workspace member must be satisfiable
by that member's actual version, checked unconditionally rather than on touched
productions, because the change that breaks it need not touch a production at all.
Only workspace members are judged - a range on something published elsewhere is
npm's business, and pinning it here would turn every upstream release into a red
build.

The failure was legible and I did not read it. `npm install` printed the 404 and
I had piped it to `tail -1`. What made it recoverable was that the canon
validator failed thirty-six times over on the next run; what makes it
unrepeatable is that the gate now fails on the manifest rather than on the
symptom.

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
