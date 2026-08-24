---
"@chbrain/khai-cultures": patch
---

Migrate the house to the current kit: khai-tests `^0.1.27` -> `^0.2.8`, khai-arch
`^0.1.19` -> `^0.1.25`, khai-guard `^0.1.17` -> `^0.1.24`, khai-language `^0.1.21`
-> `^0.1.23`, khai-review `^0.1.3` -> `^0.1.4`, and both content engines
`^0.1.4` -> `^0.1.5`. The lockfile, not the ranges, was holding the house back.

`registry.json` is rebuilt against the new kit and gains the `members[]` casting
catalog khai-tests 0.2.3 ships, so the published registry now carries each
culture's cast rather than its blurb alone. That is package content, so this is a
patch rather than an empty changeset.

Also repairs a CHANGELOG heading that documented a version which never shipped:
the 11 July release wrote `## 0.289.0` while `registry build` reconciled the
manifest to the culture count at `0.288.0`, and the heal that would have caught it
only arrived in khai-tests 0.2.4. The reconcile cannot repair it after the fact --
the heal is gated on the build actually moving the version -- so the heading is
set to the version that did ship.
