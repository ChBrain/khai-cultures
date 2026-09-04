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

Gallo, the Romance speech of upper Brittany, is now staged alongside it. When
this culture first shipped there was no Gallo position in the tongues package,
and the culture-position named it as the thing that is never counted - honest,
and not sufficient. `gallo/position_language_gallo.md` closed that, and this
restaging casts it: the tongue is in the Company, the culture-position's Has
opens on two languages rather than one, and [ar gallaouer](persona_ar_gallaouer.md)
is a persona who speaks it and no Breton at all. The line between the two runs
through the middle of the country and is on no map, which is what
[plot_00](plot_00_tremen_ar_mor.md) is about.

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

| Subject                    | In this culture                                                       | Scope                                                                                                                                                                           |
| -------------------------- | --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Crossing the sea           | [plot_00](plot_00_tremen_ar_mor.md)                                   | Brittonic migration from Britain, fifth to seventh centuries; settlement of the west; the Romance east unchanged; the Breton/Gallo line, never drawn on any map.                |
| The parish close           | [plot_01](plot_01_mein_al_lin.md)                                     | Linen and hemp sold to England and Spain for ships' canvas, 1550 to 1700; parishes competing to build higher calvaries; the trade's collapse leaving several closes unfinished. |
| The sea and the Icelanders | [plot_02](plot_02_ar_mor_hag_an_islandiz.md)                          | Newfoundland cod from the sixteenth century; the Paimpol Iceland fishery 1852 to 1935, February to September, some 2,000 lost; the sardine canneries; Penn Sardin strike, 1924. |
| The symbole in the school  | [plot_03](plot_03_ar_symbol_er_skol.md)                               | French-only schooling from the 1880s; the token passed child to child; the Deixonne law of 1951; transmission already failing by then.                                          |
| Going to Paris             | [plot_04](plot_04_mont_da_bariz.md)                                   | Around a million leaving Brittany 1850 to 1950; the rail line to Montparnasse; domestic service; the Breton quarter and its papers; remittances sustaining rural households.    |
| Nantes removed             | [plot_05](plot_05_naoned_er_maez_1941.md)                             | The 1532 conditions broken in 1789 and five departments made in 1790; the decree of 30 June 1941 creating a four-department Brittany; confirmed 1972; refused again in 2014.    |
| The fields get big         | [plot_06](plot_06_ar_parkeier_a_zeu_bras.md)                          | Remembrement from the 1950s; thousands of kilometres of bocage cleared; pig, poultry and dairy; France's first meat region; green algae from the 1970s; the Saint-Michel death. |
| A tongue without a status  | [plot_99](plot_99_ur_yezh_hep_statud.md)                              | The revival from 1970; fest-noz leaving the parish; the first Diwan school, 1977; no official status, the European Charter unratified, no reunification.                        |
| Argoad                     | [place_argoad](place_argoad.md)                                       | The interior: bocage and its clearing, the food industry that followed, and the Breton/Gallo line running through it unmarked.                                                  |
| Pempoull                   | [place_pempoull](place_pempoull.md)                                   | Paimpol: the Iceland fishery and the memorial wall of names; the households run by women for six months a year.                                                                 |
| Naoned                     | [place_naoned](place_naoned.md)                                       | Nantes: the ducal château, the tombs of Francis II and Anne; the Edict of 1598; the slave-trade port; administratively in Pays de la Loire.                                     |
| Roazhon                    | [place_roazhon](place_roazhon.md)                                     | Rennes: the Parlement de Bretagne, 1554 to 1789, burned in 1994 and rebuilt; the seat of the four-department region.                                                            |
| Karaez                     | [place_karaez](place_karaez.md)                                       | Carhaix: the Diwan headquarters; the Vieilles Charrues festival, founded 1992, in a town of some seven thousand.                                                                |
| An enkloz parrezel         | [piece_an_enkloz_parrezel](piece_an_enkloz_parrezel.md)               | The parish close: wall, triumphal arch, church, ossuary, calvary with two or three hundred figures; some eighty still standing, chiefly in Léon and upper Cornouaille.          |
| Ar Gwenn-ha-Du             | [piece_ar_gwenn_ha_du](piece_ar_gwenn_ha_du.md)                       | Designed 1923 by Morvan Marchal; nine bands and an ermine canton; compromised by wartime association; general from the 1960s.                                                   |
| Ar symbol                  | [piece_ar_symbol](piece_ar_symbol.md)                                 | The object passed to the child caught speaking Breton; never written into law; known also as "ar vuoc'h"; now a museum object.                                                  |
| Ar fest-noz                | [process_ar_fest_noz](process_ar_fest_noz.md)                         | The night dance; kan ha diskan; the open chain; inscribed on the UNESCO Representative List in 2012.                                                                            |
| Ar pardon                  | [process_ar_pardon](process_ar_pardon.md)                             | The parish pilgrimage on the saint's day; the procession out and back; the one public occasion where Breton is sung without being a political act.                              |
| An Emsav                   | [position_an_emsav](position_an_emsav.md)                             | The Breton movement: associations, publishers, schools, lexicography; and the wartime collaboration of part of it, and its long cost.                                           |
| Ar pempvet departamant     | [position_ar_pempvet_departamant](position_ar_pempvet_departamant.md) | The reunification question: five historical departments, four in the region, asked and refused since 1941.                                                                      |

The four personas - [an hini kozh](persona_an_hini_kozh.md),
[an diwaner](persona_an_diwaner.md), [ar soner](persona_ar_soner.md) and
[ar gallaouer](persona_ar_gallaouer.md) - are archetypes, not historical people:
the last generation born into Breton at home, the first to receive it from a
school instead, the singer who carries it in songs without claiming to speak it,
and the man from the other half of the country who speaks the other language and
is not counted when the country talks about its language.

## The defining question, asked of Brittany

**This section replaces an earlier one, and the replacement is the point.**

The first staging answered the defining question with a constitutional line: six
plots, five of them a state acting on a people - 851, 1532, 1790, the school,
1941, no status - with an Arc and Stakes built on being received by treaty and
dismantled by decree. It ran the tell that `order_the_defining_question.md`
prescribes, take the words the play uses about itself in Arc, Name, Stakes and
pitch and ask which appear in a plot, and it passed, because those words were
themselves constitutional. **A play whose self-description is a passport passes
that tell perfectly.** The order names this exact failure - "a play that stages
only the statehood has described a passport" - and the first staging cited the
order by name while committing it.

The line now runs: a people arriving by sea and splitting the country in two
languages; linen money turned into stone; three centuries of men at sea and
women running what they left; a million people leaving for Paris; and the bocage
cleared for a food industry. Around three of eight plots are a state acting,
which is where the house sits (Aargau 3 of 6, Hesse 3 of 5, Bavaria 3 of 9).
**The politics did not go away and should not have.** The symbole and Nantes are
defining, and 1532 and 1790 keep their place in the Arc and in the Cue of the
Nantes plot.

What the rewrite found is that the political plots were not only over-weighted,
they were answering a different question from the one the culture asks. The Arc
now names what all of it has in common: a country that has always lived on what
lies outside it - the sea, cloth sold to the English, money sent from Paris,
meat sold to the state - and has paid for each with something of its own. The
language question is the same shape: nobody is destroying it, someone is
offering something else instead, and the offer is accepted.

Four things are deliberately not staged:

- **851 and 1532 as plots of their own.** Both are in the Arc, and 1532 is in
  the Cue of [plot_05](plot_05_naoned_er_maez_1941.md). The duchy's frame
  mattered and its removal mattered, and two of eight plots spent on the shape
  of an administration is what produced the passport.
- **The FLB and ARB bombings.** This arc is not a security file, and the
  violence changed nothing in it.
- **The wartime collaboration**, held inside [an Emsav](position_an_emsav.md),
  where it is a permanent condition of the movement rather than an event in the
  country's arc.
- **The 2013 Bonnets Rouges**, a seventeenth-century Breton name over a dispute
  about road haulage.
