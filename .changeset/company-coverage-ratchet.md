---
---

Turn the dead Company entries into a ratchet. A play's cast is closed and its plots field it; an element no plot fields is a culture claiming a place, an artifact, a practice or a person that never appears in its own history. The house had 1,967 of them, 41% of every Company element, with no culture at zero, because the kit reports them as warnings and a warning fails nothing.

The new `khai-company-coverage` gate asks nothing of a culture until a pull request touches it, and then asks for all of it: a touched culture must come out at zero. No baseline file is needed, since dead entries can only appear by editing a culture's own files, and a new culture must ship clean. Pitches, language and culture positions, and plans are never counted: they are keyed or held one way, not fielded in a scene, which is the kit's own reasoning for exempting the pitch. Where casting would be anachronistic, `tests/company-coverage-waivers.json` takes a written reason instead, and two house tests keep that valve from becoming a hole. Governance only; the house ships nothing.
