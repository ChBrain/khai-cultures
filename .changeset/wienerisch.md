---
"@chbrain/khai-cultures": patch
---

Wienerisch becomes its own tongue. Grete and Lukas both said they spoke
_Wienerisch_ and then linked `position_language_de_at.md`, the Austrian
**standard** — the same fault Bavaria's and Berlin's files had before Bairisch
and Berlinisch were split out of them.

The rule that earns it a file is the **Wiener Monophthongierung**: where rural
Middle Bavarian keeps the diphthong, Vienna has a long `a`. `oans zwoa drei`
against `ans zwa drei`, `Stoa` against `Staa`, `hoaß` against `haaß` — clean in
both directions, running through every word that carries the vowel, and the
whole Viennese dialect literature is written with it. Its second layer is
lexical and belongs to no other Bairisch: `Powidl`, `Buchtln`, `Kolatschn` from
Czech, `Beisl` and `Hawara` from Yiddish, `Fiaker` and `Trafik` from further
off — the words the city drew in because the monarchy came to it.

Research came back mid-PR and corrected three things before it merged. The
monophthongisation is **variable and socially stratified, not categorical** —
present when a speaker goes broad, receding when they pull in, and the same
person does it both ways inside one conversation. It is _not_ a youth recession:
younger Viennese still produce the forms. So `Orders` no longer demands the
vowel; it demands that you know what the vowel says about you. The lexical claim
was an exclusivity claim and exclusivity is wrong — `Powidl`, `Beisl`, `Tschick`,
`Hawara`, `Trafik`, `Häferl`, `Gschropp` are Austrian or wider Habsburg-contact
vocabulary, dense in Vienna but not Vienna's alone; only `Fiaker` is safely
Vienna-specific. The file now says so itself, and says what the real distinction
is: not that the city has words the countryside lacks, but that all of them
arrived in one place at once. And the rule covers both diphthongs, so `Haus` →
`Håås` was added.

Deliberately not claimed: the l-vocalisation (`Goid`, `Woid`, `Soiz`), which is
Middle Bavarian and which `bar_mitt` already holds; the `-erl` diminutive, which
is `de_at`'s; and `es`/`enk`, which is the `bar` anchor's. The Meidlinger L is
named and explicitly not claimed, because a difference that is only sound cannot
carry a text file.

Writing it turned up an error in a shipped file. `bar_mitt` claimed Munich and
Vienna spoke `dieselbe Sortn` and gave both the `oa`, which is wrong about
Vienna. It now says the eastern end takes that `oa` one step further to the long
`a`, so the two files agree and the correction sits where the mistake was.

Austria also stops staging one tongue. Its culture-position now says what the
country actually speaks — Bairisch below the standard, Viennese in the capital,
and Alemannic west of the Arlberg, so the country's larger language border runs
through it rather than around it — and the play's Company casts all three.
`gsw` was already in the package; Austria simply never cast it.
