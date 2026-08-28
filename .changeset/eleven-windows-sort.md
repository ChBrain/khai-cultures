---
---

Sync the kit: khai-tests, khai-guard and khai-language to current.

Three separate drifts, and the caret is why the first two were invisible.

**khai-tests `^0.2.8` -> `^0.3.3`.** A caret does not cross a minor on 0.x, so
`^0.2.8` could never resolve past 0.2.x however often anything was installed.
The house was two minors behind and pinned there. 0.3.x carries the production
package validator and the Playwright instruction collector, both of which the
packages campaign needs.

**khai-guard `^0.2.1` -> `^0.3.0`, and this is the one that mattered.** The
manifest already asked for 0.2.1 -- the release that made a renamed play stop
reading as a new play -- and the lockfile held **0.1.24**, so the fix the
sub-national rename campaign is blocked on was declared and not installed. A
rename now passes `changeset-check` on a patch changeset, verified against a
`hamburg` -> `de_hamburg` move.

**khai-language `^0.1.25`, installed 0.1.23.** Same shape: the chapter-set fix
that brought 612,572 words of this house's prose under the language gate was
declared and not running.

Two of the three were manifests promising a version the tree did not hold. That
is worth naming as its own failure mode: a declared range is a claim, and only
the lockfile says what is true.

`npm test` 306 passed, `npm run format:check` clean. Coverage and conformance
report their standing debt unchanged. Ships nothing.
