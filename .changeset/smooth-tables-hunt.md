---
---

Three rules that told an agent to do the wrong thing.

**A first release declares no bump.** The rules said a culture lifted into its
own package "takes a `minor` of its own (it is new to the registry)". The
`changeset-check` gate rejects exactly that, and the gate is right: `changeset
version` bumps FROM the manifest version, so a first release carrying a bump
would ship one above it and the version the package was created at would never
exist on the registry. PR 496 followed the rule and was failed by the gate.

**The canon chapter list was partial.** It gave persona, place, piece, process
and pitch, and omitted plot, plan and play - which are the three kinds PR 496 got
wrong. Its plan came out `Intent, Friction, Horizon, Echo`, and `Echo` is in two
of the five lists it WAS given. That is not invention from nothing; it is
extrapolation from an incomplete list, which is the predictable result of
publishing one. All nine kinds are now in a table, with the play's exception
named.

**`khai.production` was described as "the anchoring play".** It is the culture
id; `khai.anchor` is the play file. PR 496 put `play_ag.md` in it, the house read
the id as that literal string and derived an anchor of `play_play_ag.md.md`, and
that one field produced eight findings. The `files` array is named here too,
because without it the package publishes empty and no gate says so.
