---
---

**Every ratchet in this repository was passing by checking nothing.**

`touchedCultures` decides which cultures a pull request touches, and all three
ratchets — company coverage, sub-national conformance, persona wiring — route
through that one function. It matched the content root as a literal,
`^cultures/<id>/`. The workspace move renamed the content root to
`packages/khai-cultures/cultures/<id>/`, the literal stopped matching anything,
and the gates went quiet. From #429's CI, on a pull request adding five plots
and five personas to Switzerland:

```
Persona wiring: no culture touched.
```

Green. So were coverage and conformance, on every culture pull request since
the move — including #428, which merged on vacuous checks.

This is the failure #424 fixed for `cultureIds`, one function over, and #424's
guard could not catch it: the house reads fine, it is the _touched set_ that
comes back empty. Nor can the same remedy be used, because an empty touched set
is a legitimate state — every governance pull request has one — so a gate that
refuses to read nothing here would refuse on half its runs.

The prefix is therefore **derived from `ROOT`** rather than typed, so one move
updates all three gates at once. What holds it there is a test rather than a
comment: a path taken out of the real tree, spelled the way
`git diff --name-only` prints it, asserted to resolve back to the culture it
came from. Move the content root again and a test fails instead of a gate going
quiet.
