---
"@chbrain/khai-cultures": patch
---

Migrate the house to the current kit and give 54 elements their own names.

The kit moves to khai-tests `^0.2.8`, khai-arch `^0.1.25`, khai-guard `^0.1.24`,
khai-language `^0.1.23`, khai-review `^0.1.4` and both content engines `^0.1.5`.
The lockfile, not the ranges, was holding the house back. `registry.json` is
rebuilt and gains the `members[]` casting catalog khai-tests 0.2.3 ships.

khai-tests 0.2.2 added the `titleCollisions` wall, and it found 54 places in 50
cultures where two elements of different kinds carried one display title: a
persona and the plot about them, a place and the stance named after it, a pitch
and the language it was keyed to. Each of those was one name doing two jobs, so
each now has its own, taken from the culture's own words wherever the file
already supplied them -- Czechia's burning is `kostnická hranice` and not a
second `Jan Hus`, Austria's plot is `die Zeit ihrer Herrschaft` as its own
persona already called it, Malta's is `id-Domanda tal-Ilsien`. Where the house
had a convention the name follows it: an English culture-position is
`<Demonym> culture`, and a pitch names the tone rather than the language, as
Solomon Islands already did.

Also repairs a CHANGELOG heading that documented a version which never shipped.
The 11 July release wrote `## 0.289.0` while `registry build` reconciled the
manifest to the culture count at `0.288.0`, and the heal that catches this only
arrived in khai-tests 0.2.4. The reconcile cannot repair it after the fact --
the heal is gated on the build actually moving the version -- so the heading is
set to the version that did ship.
