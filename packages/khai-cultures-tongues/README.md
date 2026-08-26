# khai-cultures-tongues

The tongues of the Cultures house: one khai **position** per language variety,
carrying what a tongue does to whoever holds it, written in that tongue.

A language position is a cultural position, which is why it is worth a package.
It is simply not a country's property: nobody owns Latin, and the Holy See was
cast forty-two times only because Latin was filed there. A variety belongs to the
speech community that speaks it, so it lives here and every culture that needs it
declares a dependency and links it by package specifier, which npm can check.

A position says what the tongue does to whoever holds it: what it gives them,
what its grammar forces them to mark, what it cannot say, how it shapes the mind
that thinks in it. Where it is spoken is not one of the four.

## Status

**Under construction, and private.** The varieties arrive one at a time,
narrowest first, as the walk described in the Cultures house design record
(`management/design/cultures-as-packages.md`) reaches them. **38 landed.**

Before this package publishes it owes the composite ceremony: the WIRES card, the
Playwright wiring guide, `index.mjs`, and its own language check, since a variety
leaves the reach of the house's `validateProjectLanguages` when it leaves
`cultures/`. Until then `private: true` keeps it out of any release.

## Contents

| Variety                                | Tongue                                                                                                               | Language   |
| -------------------------------------- | -------------------------------------------------------------------------------------------------------------------- | ---------- |
| `bar/position_language_bar.md`         | Bavarian as such: the family, spoken across three states and owned by none of them                                   | `bar`      |
| `bar/position_language_bar_mitt.md`    | Central Bavarian: the Danube belt, Munich and Vienna both                                                            | `bar`      |
| `bar/position_language_bar_nord.md`    | Northern Bavarian: the Oberpfalz, and the gestürzte Diphthonge                                                       | `bar`      |
| `de/position_language_de.md`           | German as such, of which every de_* here is a variety                                                                | `de`       |
| `de/position_language_de_de_bb.md`     | Brandenburg Standard German, on the East Low German floor of the Mark, pulled toward Berlin                          | `de`       |
| `de/position_language_de_de_be.md`     | Berlin Standard German, over the Metrolekt of a Low German city that went High German and kept the old sounds        | `de`       |
| `de/position_language_de_de_bw.md`     | the Standard German of Baden-Württemberg, coloured by Swabian and Badisch                                            | `de`       |
| `de/position_language_de_de_by.md`     | Bavarian Standard German, one state language over three mutually foreign dialect floors                              | `de`       |
| `de/position_language_de_de_hb.md`     | Bremen Standard German, on a North Low Saxon floor, holding Low German words undeclined                              | `de`       |
| `de/position_language_de_de_he.md`     | Hessian Standard German, gell? and a case system that collapses in the mouth                                         | `de`       |
| `de/position_language_de_de_hh.md`     | the Standard German of Hamburg, over a Low German floor                                                              | `de`       |
| `de/position_language_de_de_mv.md`     | Mecklenburg-Vorpommern Standard German, learned late and laid over Platt                                             | `de`       |
| `de/position_language_de_de_ni.md`     | Lower Saxon Standard German, the High German that lies over a Low German floor                                       | `de`       |
| `de/position_language_de_de_nw.md`     | North Rhine-Westphalian Standard German, carrying the rheinische Verlaufsform                                        | `de`       |
| `de/position_language_de_de_rp.md`     | Rhineland-Palatinate Standard German, Palatine softness under the standard                                           | `de`       |
| `de/position_language_de_de_sh.md`     | Schleswig-Holstein Standard German, the closest to the stage pronunciation because no High German dialect colours it | `de`       |
| `de/position_language_de_de_sl.md`     | the Standard German of the Saarland, on a Rhenish-Franconian base beside French                                      | `de`       |
| `de/position_language_de_de_sn.md`     | Saxon German, the Meissen chancery sound that helped found the written standard                                      | `de`       |
| `de/position_language_de_de_st.md`     | Saxony-Anhalt German, the Anhalt and Mansfeld sound that fed the chancery language                                   | `de`       |
| `de/position_language_de_de_th.md`     | Thuringian German, singing and soft, and closest of all to the standard it helped make                               | `de`       |
| `de/position_language_de_x_hes.md`     | Rhine Franconian of the Untermain: Hessian inside Bavaria, and the first tongue here with no ISO code                | `de-x-hes` |
| `dsb/position_language_dsb.md`         | Lower Sorbian: the smaller of the two, and taught rather than handed down                                            | `dsb`      |
| `en/position_language_en.md`           | English as such, of which every en_* here is a variety                                                               | `en`       |
| `en/position_language_en_us_oh.md`     | Ohio English, split between the Inland North and the Midland                                                         | `en`       |
| `en/position_language_en_us_pa.md`     | Pennsylvania English, Pittsburgh and the Dutch country                                                               | `en`       |
| `en/position_language_en_us_va.md`     | Virginian English, the drawl and the second-person plural English otherwise lost                                     | `en`       |
| `es/position_language_es.md`           | Spanish as such, of which every es_* here is a variety                                                               | `es`       |
| `es/position_language_es_es_ce.md`     | Ceutan Spanish, Andalusian in its sounds and full of Darija that nobody hears as borrowed                            | `es`       |
| `es/position_language_es_es_ml.md`     | Melillan Spanish, close to the standard and carrying the complete vocabulary of accreditation                        | `es`       |
| `hsb/position_language_hsb.md`         | Upper Sorbian: West Slavic, and it still has a living dual                                                           | `hsb`      |
| `ksh/position_language_ksh.md`         | Kölsch: a tongue defined by which sound shifts reached it and which did not                                          | `ksh`      |
| `nds/position_language_nds.md`         | Low German, the northern branch that never took the High German consonant shift                                      | `nds`      |
| `rif/position_language_rif.md`         | Tarifit, the Riffian Amazigh of the Rif coast                                                                        | `rif`      |
| `swg/position_language_swg.md`         | Swabian as such: the anchor, and its heartland is in another state                                                   | `swg`      |
| `swg/position_language_swg_allgaeu.md` | Allgäu Swabian: the variety standing on the Swabian/Alemannic line                                                   | `swg`      |
| `swg/position_language_swg_by.md`      | Bavarian Swabian: Swabian on the wrong side of the state border                                                      | `swg`      |
| `sxu/position_language_sxu.md`         | Upper Saxon: it helped found the written standard and is now judged by it                                            | `sxu`      |
| `vmf/position_language_vmf.md`         | East Franconian: no hard consonants, -la, and a gendered two                                                         | `vmf`      |

<!-- Rendered by build.mjs. Edit provenance.json or the varieties, then run `node build.mjs --write`. -->
