---
"@chbrain/khai-cultures": minor
---

**Guinea-Bissau said it spoke Portuguese, and it did not.**

Twenty-one files in `guinea_bissau` declared `language: pt` over prose that is
Guinea-Bissau Kriol. The declaration was the fault, not the spelling.

Eighteen of them were already findings of the `diacritics` wall - a file
declaring an accent-using language with no accents anywhere in it. They have no
accents because Kiriol does not use them. The wall was right that something was
wrong and structurally unable to say what: it can measure a declaration against
a spelling, and the fault was one level up, in the declaration itself.

The grammar is not ambiguous. `ta` as the preverbal marker, `i` as copula, `ku`
for _with_, `ki` as relativizer, `ningin`, `djuntu`, `undi` - between 25 and 107
markers a file. `position_tabanca.md` opens

> a komunidadi di undi tudu genti ta bin i undi ningin ta vivi so

which is not Portuguese by any reading. The house's own detector agrees:
`khai-language` carries `pov` as a clean franc target, and `conformance` passes
on all twenty-one after the relabel. That is the engine confirming the prose,
not a count of my own choosing.

**Three of the twenty-one were invisible to the wall**, and that is the more
useful finding. `piece_caju`, `process_fanadu` and `process_kolheita_di_caju`
carry the same fault and the same grammar, and each holds exactly one stray
accent - which exempts the whole file. A single character anywhere buys a pass.
The repair belongs in `tests/`, which is the governance lane, so it is recorded
here and fixed separately.

**`position_language_pt_gw.md` keeps `pt`.** Seventy accents, zero Kiriol
markers: genuine Portuguese, correctly declared, and the file that proves the
other twenty-one were not. `pitch_pt.md` becomes `pitch_pov.md`, because a file
named for a language it does not hold would plant a new fault where this one is
being removed.

Relabelling authored the culture, which woke the rest of the recipe, so it is
paid here: four dead Company elements cleared, and the two brackets written.

- `plot_00_ningin_ta_nasi_djintadu.md` - the origin, and not a founding. Before
  the trading posts there was a law in no book: nobody is born grown. A child is
  born; the tabanca makes a person, and only after the bush does anyone have a
  voice in the circle of elders. Authority comes from age and from what one has
  passed through, never from blood or crown - and so no ruler on this coast
  could ever command all the others. Everything downstream is that law: the
  islands held out, no people ruled the rest, the nation had to be invented in
  a tongue nobody was born speaking, and the state still does not hold.
- `plot_99_o_presu_i_a_lingua.md` - the present, as a record. Cashew is close to
  ninety per cent of exports and leaves raw, so the last step's money stays in
  India and Vietnam; a land that knew how to grow rice in reclaimed mangrove now
  buys part of its rice with cashew money. And the state speaks Portuguese while
  the country speaks Kriol, so a child enters school in a language not heard at
  home. Its Stage is the harvest, the writer, and the tongue.

**Cape Verde is deliberately not relabelled**, and it is the harder half. Its
twenty-one flat files carry **zero** Kiriolu grammar - Portuguese syntax under
creole-style spelling with the accents stripped, `kriolu` and `korason` and
`povu` over `a lingua-mae das ilhas ... que a alma se diga na sua propria
lingua`. And `kea` is exempt from detection in `khai-language`, because it
false-fails to its Upper Guinea sibling. So declaring `kea` there would silence
all twenty-one permanently and read as a fix.

The direction of the two halves is the whole point. `pov` is detected clean, so
this change hands its files to a real check. `kea` would excuse them from one.
Cape Verde needs its prose written, in one language or the other, and that is
authoring rather than a relabel.
