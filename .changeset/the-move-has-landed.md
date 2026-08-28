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
