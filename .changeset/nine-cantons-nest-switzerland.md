---
---

**Nine cantons say what they are a way of being.**

`AGENTS.md`: a sub-national culture's culture-position links its parent's,
because it is a way of being the culture above it. Seventeen of the twenty-six
cantons did; nine did not, and the gate never said so, because those nine store
their ISO code lowercase and `parentOf` compares the stored string as stored, so
`"ch" === "CH"` is false and the whole nesting branch is skipped.

The link is not pasted. The clause after it says in what respect, which is the
part that had to be written: Innerrhoden takes federalism at its word and prefers
half a canton with whole sovereignty; Basel-Landschaft runs its 1833 separation
as a founding; Fribourg is the bridge between the languages that stayed Catholic;
Geneva entered last, in 1815, and holds itself first; Jura is the only canton
born of a secession and had to fight for its place; Neuchâtel was a Prussian
principality until 1848 and dates its republic from the break; St. Gallen was
assembled by Napoleon out of remnants and administers a unity it does not have;
Vaud speaks it in French and carries the weight of saying so; Zug takes
inter-cantonal tax competition at its word and runs it to its end.

Two accent corruptions in the same files are fixed with them: `L'àDN` for
`L'ADN` and `l'àncien Régime` for `l'Ancien Régime`.

The lowercase codes stay lowercase here. Normalising them is the next change, and
it is only safe once this one has landed - which is the whole reason these two
are separate.
