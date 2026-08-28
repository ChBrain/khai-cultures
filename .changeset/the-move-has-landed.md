---
---

The move has landed, so the hedges come out — and one gate that went quiet is
woken up.

**The persona-wiring gate had gone silent.** #419 and the workspace move crossed:
its root still pointed at the repository root, which is now the container, and it
reported `0 findings across 0 cultures`. Not clean — _reading nothing_. It has ten
known findings. It now resolves the house package for the personas and the
workspace for `node_modules`, where the manifests it reads its rules out of are
installed, and reports all ten again.

That is the failure #419’s own text named — _“a rule read as an empty set is a gate
that has gone quiet without going red”_ — happening to that gate, one merge later.
So the guard is now general: **`cultureIds` throws on an empty house.** Every check
in this repository reads its cultures through it, so none of them can ever again
pass by reading nothing. Proven by pointing it at the container and watching it
refuse.

The four resolvers that learned both layouts for the move stop hedging, and the
guard config drops the old paths it carried so renames could pair.

**And the gate was reading its second rule by the wrong measure.** _A tongue nobody
acquires first is nobody's mother tongue_ was decided by splitting the Projection
into clauses, which German will not carry: Etter `[spricht] Zugerdeutsch, doch
seine Radioansprachen [schreibt] er in Hochdeutsch` is one clause and two tongues,
so the gate accused him of a fault his sentence does not contain — and so did the
gate for Urs. Taking the tongue that follows the grip instead fixes those two and
breaks Katharina, whose tongue is named before her grip and whose office language
after it. Neither order is the order; **distance is.** The grip now takes the
nearest tongue in the Projection, looking both ways, which is where prose puts it
whichever way the clause runs. Measured across all 290 cultures and both open
DACH branches: Etter, Urs and Katharina clean, Vreni — the one real fault, already
fixed in #425 — still caught. No false positives left, so the check stays blocking
rather than being demoted to a report.
