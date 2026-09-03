---
updated: "2026-09-03"
---

# Brittany: References

The provenance behind this culture: the source data that tunes the pitch (kept
here, never in the prose), the public historical record behind the plots,
personas, places, pieces and processes, the one place this package's `geo.json`
deliberately disagrees with itself, and the note on the language the package is
written in.

## The language this package is written in

Every file here is written in Breton, against
[`position_language_br.md`](@chbrain/khai-cultures-tongues/br/position_language_br.md).

That choice is worth stating plainly, because Breton is a minority language in
Brittany and French is not. Roughly two hundred thousand people speak Breton;
everyone in the five departments speaks French. Staging the culture in French
would have been the majority-accurate choice and it would also have made the
package indistinguishable from France's, which is the whole reason the house
writes a culture in its own tongue: the question this culture is about is what
happened to that tongue, and it cannot be asked in the one that replaced it.

The same decision has a cost the reader should know. Gallo, the Romance speech
of upper Brittany, is as native to the country as Breton and is not staged here
at all - it has no position in the tongues package, so there is nothing to write
it against. The culture-position names it under Has and says it is never
counted. That is honest but it is not staging, and a Gallo position in the
tongues package is the thing that would fix it.

**The Breton in this package has not been read by a speaker.** It was written by
the agent that staged the culture, in peurunvan, from the tongue position and
from written Breton, and it should be treated as staged prose awaiting native
review rather than as attested usage.

The likely faults are the ones a non-speaker makes, and they are worth naming so
a reader knows where to look:

- **The mutations.** They are the first thing the tongue position lists under
  Has and the thing the language most insists on, and they are exactly what a
  non-speaker gets right only by rule-following. Expect errors after the
  possessives, after `ur`/`un`/`ul`, and in the mixed mutation after `e` and
  `o`.
- **The focus-fronting.** The tongue position's Orders chapter says correctly
  that Breton has no neutral word order and that every sentence declares what
  its speaker put forward. Describing that rule is not the same as writing
  well-focused sentences, and these sentences were written by someone
  describing it.
- **The vocabulary is school Breton.** Every file here uses the built,
  standardised register - which is precisely the split the tongue position
  names under Loses. The package is therefore written in one of the two Bretons
  it is about, and a speaker of the other one will find it thin.

A native reader should expect to change words, not the content.

## Why `geo.json` covers five codes and anchors on four

`geo.json` reads:

```json
{ "iso": "FR-BRE", "covers": ["FR-22", "FR-29", "FR-35", "FR-56", "FR-44"] }
```

`FR-BRE` is the région Bretagne: four departments. `covers` adds `FR-44`,
Loire-Atlantique, which is administratively in Pays de la Loire and has been
since a Vichy decree of 30 June 1941 that was never reversed.

This is the case `management/design/what-a-geo-json-carries.md` was written for,
and it names Brittany as its worked example. The anchor names the culture and
`covers` says what to paint; they are allowed to disagree, and here they must.
A Brittany drawn without Nantes would contradict
[plot_04](plot_04_naoned_er_maez_1941.md),
[place_naoned](place_naoned.md) and
[position_ar_pempvet_departamant](position_ar_pempvet_departamant.md), all three
of which exist because the culture and the administrative region are not the
same shape. Painting the five is not a political claim the house is making; it
is the house refusing to publish data that argues with its own content.

Nothing consumes `covers` yet. It is written here because the culture is the
place the fact is known.

## Hofstede source data

The pitch [pitch_brittany.md](pitch_brittany.md) is written from France's
profile inflected by two centuries of institutional patience, by associative
density in place of political representation, and by a grievance that has never
had an enemy to name. It names no dimension and carries no number.

| Dimension                     | Brittany (France proxy, inflected) |
| ----------------------------- | ---------------------------------- |
| Power Distance                | 68                                 |
| Individualism                 | 71                                 |
| Motivation toward Achievement | 43                                 |
| Uncertainty Avoidance         | 86                                 |
| Long Term Orientation         | 63                                 |
| Indulgence                    | 48                                 |

Source: Geert Hofstede, Hofstede Insights (France). No regional Breton profile
exists; the base scores are France's, and the pitch's Tenor and Undertow are
written from the historical record below rather than from the table.

The inflection worth recording is the opposite of Corsica's. France's very high
Uncertainty Avoidance produces, in Corsica, a state that resolves ambiguity by
striking words out of a statute. In Brittany it produces something quieter and
harder to argue with: not a refusal but a non-answer, repeated. Nothing is
struck down here, because nothing is ever put to a court. That is why the pitch's
Nerve is the feeling of losing something with nobody attacking it.

## Historical sources

Drawn from the public historical record; the reference sources are generic
historical encyclopedias and the published texts of the acts named.

| Subject                   | In this culture                                                       | Scope                                                                                                                                                                                        |
| ------------------------- | --------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Kingdom and duchy         | [plot_00](plot_00_rouantelezh_ha_dugelezh_851.md)                     | Nominoë at Ballon, 845; Erispoë at Jengland, 851, and the recognition that followed, with Rennes and Nantes; the duchy that succeeded it; the Parlement de Bretagne sitting until 1789.      |
| The Union (1532)          | [plot_01](plot_01_unvaniezh_1532.md)                                  | Anne of Brittany's two marriages, 1491 and 1499; the edict of union proclaimed at Vannes, August 1532; the conditions retained - the Parlement, Breton law, exemption from the gabelle.      |
| Five departments (1790)   | [plot_02](plot_02_pemp_departamant_1790.md)                           | The abolition of provincial privilege in 1789; the division into five departments in 1790; the Parlement closed; the Chouannerie from 1793 and its suppression.                              |
| The symbole in the school | [plot_03](plot_03_ar_symbol_er_skol.md)                               | French-only schooling from the 1880s; the token passed child to child, the last holder punished; the Deixonne law of 1951 and Breton's late inclusion; transmission already failing by then. |
| Nantes removed (1941)     | [plot_04](plot_04_naoned_er_maez_1941.md)                             | The decree of 30 June 1941 creating a four-department Brittany; the 1950s regional programmes and the 1972 reform confirming it; the question refused again in the 2014 regional reform.     |
| A tongue without a status | [plot_99](plot_99_ur_yezh_hep_statud.md)                              | Alan Stivell and the revival from 1970; fest-noz leaving the parish; the first Diwan school, 1977; no official status for the language, the European Charter unratified, no reunification.   |
| Naoned                    | [place_naoned](place_naoned.md)                                       | Nantes: the ducal château, the tombs of Francis II and Anne; the Edict of 1598; the slave-trade port of the eighteenth century; administratively in Pays de la Loire.                        |
| Roazhon                   | [place_roazhon](place_roazhon.md)                                     | Rennes: the Parlement de Bretagne, 1554 to 1789, burned in February 1994 and rebuilt; the seat of the four-department region.                                                                |
| Karaez                    | [place_karaez](place_karaez.md)                                       | Carhaix: the Diwan headquarters; the Vieilles Charrues festival, founded 1992, the largest in the country, in a town of some seven thousand.                                                 |
| The Gwenn-ha-Du           | [piece_ar_gwenn_ha_du](piece_ar_gwenn_ha_du.md)                       | Designed 1923 by Morvan Marchal; nine bands and an ermine canton; compromised by wartime association; general from the 1960s onward.                                                         |
| The symbole               | [piece_ar_symbol](piece_ar_symbol.md)                                 | The object - clog, coin, token, block - passed to the child caught speaking Breton; never written into any law; known also as "ar vuoc'h"; now a museum object.                              |
| Fest-noz                  | [process_ar_fest_noz](process_ar_fest_noz.md)                         | The night dance; kan ha diskan call-and-response; the open chain that anyone joins; inscribed on the UNESCO Representative List in 2012.                                                     |
| The pardon                | [process_ar_pardon](process_ar_pardon.md)                             | The parish pilgrimage on the saint's day; the procession out and back, often to a fountain; the one public occasion where Breton is sung without being a political act.                      |
| The Emsav                 | [position_an_emsav](position_an_emsav.md)                             | The Breton movement: associations, publishers, schools, lexicography, from the nineteenth century; and the wartime collaboration of part of it, and its long cost.                           |
| The fifth department      | [position_ar_pempvet_departamant](position_ar_pempvet_departamant.md) | The reunification question: five historical departments, four in the region, asked and refused since 1941.                                                                                   |

The three personas - [an hini kozh](persona_an_hini_kozh.md),
[an diwaner](persona_an_diwaner.md) and [ar soner](persona_ar_soner.md) - are
archetypes, not historical people: the last generation born into the language at
home, the first generation to receive it from a school instead, and the singer
who carries it in songs without claiming to speak it.

## The defining question, asked of Brittany

Checked against the house order on the defining question
(`management/orders/order_the_defining_question.md`): the Arc names `rouantelezh`,
`emglev`, `divizoù`, `pemp departamant`, `ar symbol`, `Liger-Atlantel`, `Diwan`
and `statud`; the Name names `ISO FR-BRE`, `yezh br` and `pevar departamant eus
ar pemp`; the Stakes name `un doare da vezañ enni n'he deus ket c'hoazh desket
skrivañ`; the pitch names `pasianted`, `ur fulor n'eo ket bet lavaret` and the
question never answered.

Every word of the Arc lands in a plot. The plot line runs to six rather than the
house floor of three because the shape of this culture is a sequence of
non-answers, and three of them would read as bad luck: 1789 removes the treaty,
1790 removes the province, the school removes the transmission, 1941 removes the
capital, and 2014 declines to give it back. What makes it one arc rather than
five incidents is that no single one of them was ever argued in public as a
decision about Brittany.

The comparison with Corsica, staged one release earlier, is the reason both are
worth having. Both are French sub-national cultures whose central question is
the standing of a tongue. Corsica's four erasures are all courts and
legislatures - the claim is made, and struck, in public, on the record. Brittany's
are decrees, school practice and reforms that simply did not include it. Neither
country got what it asked for; only one of them was ever told no.

Four things are deliberately not staged, and the reasoning is recorded here so
the next hand argues with a reason instead of asking again:

- **Gallo.** The Romance speech of upper Brittany is native to the country and
  has no position in the tongues package, so there is nothing here to write it
  against. It is named in the culture-position's Has, as the thing that is never
  counted, which is the most this package can honestly do. A Gallo position in
  the tongues package is the fix, and it is a tongues question, not a culture
  one.
- **The armed campaign.** The FLB and ARB bombings of the 1960s to 1980s,
  including the 1978 explosion at Versailles and the 2000 death at Quévert, are
  documented and are not given a scene. This culture's arc is an administrative
  argument, not a security file: every non-answer in the plot line is a decree
  or a reform, and a plot about explosives would answer a question about
  violence that the Arc, the Name and the Stakes never ask. Corsica's
  [plot_03](@chbrain/khai-cultures-fr-corsica/plot_03_u_riacquistu.md) stages
  Aleria because there the violence changed the legal argument; here it did not
  change anything, which is precisely the difference the two cultures are for.
- **The wartime collaboration as its own plot.** It is held inside
  [position_an_emsav](position_an_emsav.md), where it belongs: it is not an
  event in the country's arc but a permanent condition of the movement that
  carries the language, and it works in this culture as a thing that can always
  be raised instead of answering.
- **The Bonnets Rouges of 2013.** The eco-tax revolt wore the name of a
  seventeenth-century Breton rising and was, in substance, a dispute about road
  haulage and agriculture. Staging it would put a plot in the line whose subject
  is not the question the line is about, and the coverage rule warns against
  exactly that.
