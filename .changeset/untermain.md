---
---

The Untermain gets its tongue, and it is the first in the house with no ISO code.
The Bayerischer Untermain around Aschaffenburg speaks Rhine Franconian, which is
Hessian and not Franconian at all, despite sitting in Bavaria's Franconian third —
the clearest case yet of a language border that is not a state border. Hessian has
no ISO 639-3 code; Pfälzisch has `pfl` and Hessian has nothing. Rather than mint a
code into the ISO space or deny a tongue a position because a registry never named
it, the file carries `language: de-x-hes`, a BCP-47 private-use tag, which
khai-language 0.1.25 accepts on both halves: `resolveLanguage` returns german so the
prose gates against German, `resolveLanguageTag` keeps the full tag so the variety is
still named. It lives under `de/` rather than a directory of its own, because the tag
says it is German and the version rule counts languages — a private-use variety must
not inflate that count. Written in the variety, and one word places it between its
neighbours: Staa where the writing has Stein and Munich has Stoa. Empty changeset:
the tongues package is not in the umbrella's `files`.
