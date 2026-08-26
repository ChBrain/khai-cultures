---
---

Stop exempting sixteen languages khai already detects. `khai.languages` is the list
of tongues the local detector cannot read, routed to assisted verification instead.
It held 34 codes and sixteen of them were registered in khai-language's own
`ISO_MAP` or `FRANC_MAP` all along, so naming them here did not add verification, it
switched detection off: `validateLanguageOfFile` checks the exempt list before it
runs anything and returns clean. English, French, Portuguese, Swahili and Somali
were among them, which means no English prose in this house has ever been
language-checked, in a house where two dozen cultures hold an English variety. The
list is now the eighteen that genuinely have no model. Verified against khai #1395's
shipped 33-chapter set over 6,171 content files: zero findings before, zero after,
so nothing in the house was relying on the exemption. And verified in the other
direction, because a gate that finds nothing has to be shown to be looking: a French
paragraph planted in an English position is missed at 34 and caught at 18.
Governance only; the house ships nothing.
