---
"@chbrain/khai-cultures": patch
---

Danish and American English leave the cultures that were holding them, and the
last two German Länder become packages. Sixteen of sixteen.

`da` moves as an anchor, the fifth tongue to do so after `tr`, `hu`, `la` and
`cs`: what `denmark` held was the Danish language and not a variety of it - its
own frontmatter said `det danske sprog` - and the package had no `da` anchor. No
`da_dk` is invented, because there is no sibling here to distinguish it from.
Seven cultures held it and all seven now hold the anchor.

`en_us` is the first tongue that needed neither retiring nor inventing: already
a variety, already correctly named, only ever in the wrong package. So it is a
plain rename into the `en` anchor that was already there, byte for byte, and
the reading against the mnemonic is deliberately kept out of the move. It still
owes the entry price - what it carries is rhoticity, which is sound and cannot
go in a text file, and verbing nouns, which `en_gb` does too - and its
provenance entry now says so, along with what it should carry instead and what
its General American material wants trimming for. That reading is the next pull
request, and it charges nobody, because by then the file lives here.

With their blockers gone, `de_schleswig_holstein` and `de_saxony` migrate. Saxony
also loses two `REFERENCES.md` links that escaped four levels up into
`management/orders`; the order is now cited the way every other migrated package
cites it, by path in backticks.

The tongues package's minor IS its language count, and Danish is the
twenty-fifth, so its build moved it `0.24.0 -> 0.25.0` and its own `syncRanges`
carried that into all twenty-one dependants - which is exactly the failure that
function was written for. It declares no bump of its own; it has never been
published. Neither do the two new Länder packages.
