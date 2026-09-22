---
---

**`persona-wiring` said it was held "like coverage and sub-national conformance".
It was not.** Both of those gate on `authoredCultures`, which knows the difference
between a culture a pull request wrote and one whose files it merely moved past.
This wall gated on `touchedCultures`, which maps any changed path to its culture
and cannot tell the two apart.

## The difference is invisible until it is the whole gate

Adding **one** tongue file that raises the language count bumps the tongues
package's count-derived version, and the build rewrites the dependency range in
every package that casts a variety - 119 of them, none of which asked for it.

Measured on exactly that change:

|                             | answer                     |
| --------------------------- | -------------------------- |
| files authored              | **1** (the new tongue)     |
| `touchedCultures`           | **117 cultures**           |
| `authoredCultures`          | **0 authored, 117 spared** |
| `company-coverage` reported | _no culture authored_      |
| `subnational-conformance`   | _no culture authored_      |
| `persona-wiring` reported   | **FAIL - 2 findings**      |

The two findings were `ch_zug/persona_der_crypto_bro` and
`united_kingdom/persona_aisha`, in cultures the change had not opened, and they
are two of the seven standing rule-4 findings `order_the_mother_tongue.md`
carries open **on purpose**. The wall was demanding that Aisha's mother tongue be
settled as the price of adding a Yiddish file - and the order says in as many
words that hers is a reader's call and not a mechanical one.

**Standing debt is not a fault this wall may collect from a version bump.** The
ratchet is "touch a culture, leave it wired", and a range the build rewrote is not
a touch.

## The test is a source check and says so

A first draft asserted `authoredCultures("HEAD", "HEAD")` was empty - **true of any
repository in any state**, and it would have passed with the bug still in. What is
load-bearing is which function each of the three gates reaches for, so that is what
is asserted, across all three files rather than the one that was wrong. Probed by
reverting the fix; it fails.

|                               | before | after      |
| ----------------------------- | ------ | ---------- |
| ratchets gating on `authored` | 2 of 3 | **3 of 3** |
| house-wide wiring findings    | 11     | 11         |
| persona-wiring tests          | 10     | **11**     |

No content changes; reported findings are untouched at 11 across 8 cultures. This
is the governance lane, and it unblocks the Yiddish tongue rather than being
motivated in the abstract.
