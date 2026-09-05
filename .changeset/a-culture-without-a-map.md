---
---

**Nothing in the canon ever said a culture is a place. The `geo.json` said it
silently, three hundred and nineteen times out of three hundred and nineteen.**

The house holds two shapes: a culture, which has an ISO code and gets painted, and
a group, which has neither and references its members. The Danish-German border is
where that stops being enough. Staging it needs four communities and only one of
them exists:

| the four                               | what it is                    | what the house has           |
| -------------------------------------- | ----------------------------- | ---------------------------- |
| Schleswig-Holstein                     | the German majority, a Land   | `de_schleswig_holstein`      |
| Sønderjylland                          | the Danish majority, a region | nothing                      |
| the Danish minority in South Schleswig | a people inside Germany       | nothing, and no shape for it |
| the German minority in North Schleswig | a people inside Denmark       | nothing, and no shape for it |

The majorities are ordinary. The minorities are not an edge case: each has its own
schools, its own newspaper, its own party sitting in a parliament under an
exemption written for it, and its own name for itself. Each is unmistakably a
culture and each holds no ground.

This order writes down the build order and the shape.

**Four tiers, and it is a dependency rather than a preference.** Tongues, then
cultures, then regions, then groups. A tongue belongs to the speech community and
`migrate_culture.mjs` already refuses a culture that holds one, so tier one is
enforced rather than advised; a group is defined by casting member plays, so it is
last by construction. The border example is four tiers deep, which is why the
group cannot be written yet, and saying so is more useful than writing a thin one.

**A culture without a map carries no `geo.json`.** The kit already treats `iso` as
optional on a registry entry. `iso` does five jobs, and four can be taken from the
id; the fifth is the region colour, which a mapless culture must never have,
because a fill is a claim on ground that already belongs to the culture living on
it. No geo, no fill: a website lists it under its host and paints nothing.

**A mapless culture has two parents and its id names both.** A territorial
sub-national culture nests in the polity above it, which is what
`subnational-conformance` checks today. A minority nests in the **host** it is
governed by and the **kin** whose tongue and calendar it holds — not a
complication bolted on, but the definition, since a minority is a community
holding a kinship across a border it does not cross. So `de_danish_minority` and
`dk_german_minority`, and the id says both before anyone opens the file. Its
culture-position links both, because a file linking only the host has described a
regional variation and one linking only the kin has described an exile.

**And what it must not do:** claim the host's ISO, since a code is a package name
and a URL and two cultures cannot hold one; take a group's shape, since it has no
member plays; or be written as a grievance, since the difficulty goes where every
culture's difficulty goes.

**It does not say every minority earns a culture.** The test is the one a variety
file already has to pass: can a play be staged from it? A community with schools,
press, party and a name for itself can be. A population that exists as a census
figure cannot. The shape exists so the ones that qualify have somewhere to go, not
so the count can grow.

Four targets, all unchecked, and the last is that the first two are done before
the first mapless culture ships rather than after.

Governance only.
