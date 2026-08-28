---
---

**The persona-wiring gate was reading its second rule by the wrong measure.**

_A tongue nobody acquires first is nobody's mother tongue_ was decided by
splitting the Projection on `.` and `;` and asking whether an unacquired tongue
stood in the same clause as a mother-tongue grip. German will not carry that.
Switzerland's Etter — `[spricht] Zugerdeutsch, doch seine Radioansprachen
[schreibt] er in Hochdeutsch` — is one clause with two tongues, and the gate
called it a fault; so did Urs's sentence. Taking the tongue that _follows_ the
grip instead fixes those two and breaks Liechtenstein's Katharina, whose
mother tongue is named before her grip and whose office language after it.

Neither order is the order. **Distance is:** prose puts the tongue beside the
grip that takes it, whichever way the clause runs. A grip now takes the nearest
tongue link in the Projection, looking both ways, measured over the whole
chapter rather than inside whatever a full stop happens to enclose.

Measured across all 290 cultures and both open DACH branches: Etter, Urs and
Katharina clean, Vreni — the one real fault, fixed in #425 — still caught. No
false positives left, so the check stays blocking rather than being demoted to
a report.

---

**And every ratchet was passing by checking nothing.** Found while this branch
was in flight, on #429's own CI:

```
Persona wiring: no culture touched.
```

— on a pull request that adds five plots and five personas to Switzerland.
`touchedCultures` matched `^cultures/<id>/` as a literal; the workspace move
renamed the content root to `packages/khai-cultures/cultures/<id>/`, and all
three ratchets route through that one function. Coverage, sub-national
conformance and persona wiring have all been green by reading nothing since the
move.

This is #424's failure in the sibling function, and #424's guard could not see
it: the house reads fine, it is the _touched set_ that comes back empty — and
an empty touched set is legitimate, every governance pull request has one, so
it cannot simply refuse. The prefix is therefore derived from `ROOT` rather
than typed, so one move updates all three, and a test pins it: a path taken out
of the real tree, spelled the way `git diff --name-only` prints it, asserted to
resolve back to the culture it came from.
