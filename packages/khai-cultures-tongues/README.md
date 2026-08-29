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
(`management/design/cultures-as-packages.md`) reaches them. **65 landed.**

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
| `bar/position_language_bar_wien.md`    | Viennese: Middle Bavarian with one vowel moved, and a vocabulary the countryside never had                           | `bar`      |
| `de/position_language_de.md`           | German as such, of which every de_* here is a variety                                                                | `de`       |
| `de/position_language_de_at.md`        | Austrian Standard German: the same grammar with another vocabulary, and one different auxiliary                      | `de`       |
| `de/position_language_de_ch.md`        | Swiss Standard German: a written form and almost nothing else                                                        | `de`       |
| `de/position_language_de_de.md`        | German Standard German: the unmarked one of the three, and the sharp s                                               | `de`       |
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
| `de/position_language_de_li.md`        | Liechtenstein Standard German: a written norm the country did not make                                               | `de`       |
| `de/position_language_de_x_brl.md`     | Berlinisch: a Low German city's High German, with the commonest words left unshifted                                 | `de-x-brl` |
| `de/position_language_de_x_hes.md`     | Rhine Franconian of the Untermain: Hessian inside Bavaria, and the first tongue here with no ISO code                | `de-x-hes` |
| `de/position_language_de_x_mos.md`     | Moselle Franconian: the tongue that says dat Dorf, which is the only one that does                                   | `de-x-mos` |
| `dsb/position_language_dsb.md`         | Lower Sorbian: the smaller of the two, and taught rather than handed down                                            | `dsb`      |
| `en/position_language_en.md`           | English as such, of which every en_* here is a variety                                                               | `en`       |
| `en/position_language_en_gb.md`        | British English: the older of the two large written forms, and the marked one                                        | `en`       |
| `en/position_language_en_us_oh.md`     | Ohio English, split between the Inland North and the Midland                                                         | `en`       |
| `en/position_language_en_us_pa.md`     | Pennsylvania English, Pittsburgh and the Dutch country                                                               | `en`       |
| `en/position_language_en_us_va.md`     | Virginian English, the drawl and the second-person plural English otherwise lost                                     | `en`       |
| `es/position_language_es.md`           | Spanish as such, of which every es_* here is a variety                                                               | `es`       |
| `es/position_language_es_es_an.md`     | Andalusian Spanish: the open vowel doing the work the lost consonant did                                             | `es`       |
| `es/position_language_es_es_ar.md`     | Aragonese Spanish: the -ico diminutive and the apocope, and the Aragonese underneath both                            | `es`       |
| `es/position_language_es_es_as.md`     | Asturian Spanish: the -in diminutive and the metaphony the Asturian underneath pushes up                             | `es`       |
| `es/position_language_es_es_cb.md`     | Cantabrian Spanish: the unhurried line and a vocabulary split between the sea and the high pasture                   | `es`       |
| `es/position_language_es_es_ce.md`     | Ceutan Spanish, Andalusian in its sounds and full of Darija that nobody hears as borrowed                            | `es`       |
| `es/position_language_es_es_cn.md`     | Canarian Spanish: seseo, ustedes, and an Atlantic rather than peninsular set of tenses                               | `es`       |
| `es/position_language_es_es_ib.md`     | Balearic Spanish: Castilian grammar carrying a Mallorcan ear it cannot write down                                    | `es`       |
| `es/position_language_es_es_ml.md`     | Melillan Spanish, close to the standard and carrying the complete vocabulary of accreditation                        | `es`       |
| `fr/position_language_fr.md`           | French as such, of which every fr_* here is a variety                                                                | `fr`       |
| `fr/position_language_fr_ch.md`        | Swiss French: septante and nonante, and the meals a word earlier                                                     | `fr`       |
| `fr/position_language_fr_fr.md`        | French Standard French: an arithmetic in its numbers, and a norm with an address                                     | `fr`       |
| `gsw/position_language_gsw.md`         | Alemannic: the monophthongs High German lost, across three states                                                    | `gsw`      |
| `hr/position_language_hr.md`           | Croatian as such, of which Burgenland Croatian will be a variety                                                     | `hr`       |
| `hsb/position_language_hsb.md`         | Upper Sorbian: West Slavic, and it still has a living dual                                                           | `hsb`      |
| `it/position_language_it.md`           | Italian as such, of which every it_* here is a variety                                                               | `it`       |
| `it/position_language_it_ch.md`        | Swiss Italian: a minority twice over, and in two different directions                                                | `it`       |
| `it/position_language_it_it.md`        | Italian Standard Italian: a standard out of a library, over a second system                                          | `it`       |
| `ksh/position_language_ksh.md`         | Kölsch: a tongue defined by which sound shifts reached it and which did not                                          | `ksh`      |
| `nds/position_language_nds.md`         | Low German, the northern branch that never took the High German consonant shift                                      | `nds`      |
| `pfl/position_language_pfl.md`         | Palatine: Rhine Franconian, which made the sound shift only halfway                                                  | `pfl`      |
| `rif/position_language_rif.md`         | Tarifit, the Riffian Amazigh of the Rif coast                                                                        | `rif`      |
| `rm/position_language_rm.md`           | Romansh: five written idioms and a sixth made to hold them together                                                  | `rm`       |
| `sl/position_language_sl.md`           | Slovene as such: the dual, and six cases                                                                             | `sl`       |
| `swg/position_language_swg.md`         | Swabian as such: the anchor, and its heartland is in another state                                                   | `swg`      |
| `swg/position_language_swg_allgaeu.md` | Allgäu Swabian: the variety standing on the Swabian/Alemannic line                                                   | `swg`      |
| `swg/position_language_swg_by.md`      | Bavarian Swabian: Swabian on the wrong side of the state border                                                      | `swg`      |
| `sxu/position_language_sxu.md`         | Upper Saxon: it helped found the written standard and is now judged by it                                            | `sxu`      |
| `tr/position_language_tr.md`           | Turkish as such: agglutination, vowel harmony, and an evidential in every sentence                                   | `tr`       |
| `vmf/position_language_vmf.md`         | East Franconian: no hard consonants, -la, and a gendered two                                                         | `vmf`      |
| `wep/position_language_wep.md`         | Westphalian: Low German, with the breaking no other Low German has                                                   | `wep`      |

<!-- Rendered by build.mjs. Edit provenance.json or the varieties, then run `node build.mjs --write`. -->
