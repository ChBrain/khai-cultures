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
(`management/design/cultures-as-packages.md`) reaches them. **23 landed.**

Before this package publishes it owes the composite ceremony: the WIRES card, the
Playwright wiring guide, `index.mjs`, and its own language check, since a variety
leaves the reach of the house's `validateProjectLanguages` when it leaves
`cultures/`. Until then `private: true` keeps it out of any release.

## Contents

| Variety                         | Tongue                                                                                                               | Language |
| ------------------------------- | -------------------------------------------------------------------------------------------------------------------- | -------- |
| `position_language_de_de_bb.md` | Brandenburg Standard German, on the East Low German floor of the Mark, pulled toward Berlin                          | `de`     |
| `position_language_de_de_be.md` | Berlin Standard German, over the Metrolekt of a Low German city that went High German and kept the old sounds        | `de`     |
| `position_language_de_de_bw.md` | the Standard German of Baden-Württemberg, coloured by Swabian and Badisch                                            | `de`     |
| `position_language_de_de_by.md` | ?                                                                                                                    | `de`     |
| `position_language_de_de_hb.md` | Bremen Standard German, on a North Low Saxon floor, holding Low German words undeclined                              | `de`     |
| `position_language_de_de_he.md` | ?                                                                                                                    | `de`     |
| `position_language_de_de_hh.md` | the Standard German of Hamburg, over a Low German floor                                                              | `de`     |
| `position_language_de_de_mv.md` | Mecklenburg-Vorpommern Standard German, learned late and laid over Platt                                             | `de`     |
| `position_language_de_de_ni.md` | Lower Saxon Standard German, the High German that lies over a Low German floor                                       | `de`     |
| `position_language_de_de_nw.md` | North Rhine-Westphalian Standard German, carrying the rheinische Verlaufsform                                        | `de`     |
| `position_language_de_de_rp.md` | Rhineland-Palatinate Standard German, Palatine softness under the standard                                           | `de`     |
| `position_language_de_de_sh.md` | Schleswig-Holstein Standard German, the closest to the stage pronunciation because no High German dialect colours it | `de`     |
| `position_language_de_de_sl.md` | the Standard German of the Saarland, on a Rhenish-Franconian base beside French                                      | `de`     |
| `position_language_de_de_sn.md` | Saxon German, the Meissen chancery sound that helped found the written standard                                      | `de`     |
| `position_language_de_de_st.md` | ?                                                                                                                    | `de`     |
| `position_language_de_de_th.md` | Thuringian German, singing and soft, and closest of all to the standard it helped make                               | `de`     |
| `position_language_en_us_oh.md` | Ohio English, split between the Inland North and the Midland                                                         | `en`     |
| `position_language_en_us_pa.md` | Pennsylvania English, Pittsburgh and the Dutch country                                                               | `en`     |
| `position_language_en_us_va.md` | Virginian English, the drawl and the second-person plural English otherwise lost                                     | `en`     |
| `position_language_es_es_ce.md` | Ceutan Spanish, Andalusian in its sounds and full of Darija that nobody hears as borrowed                            | `es`     |
| `position_language_es_es_ml.md` | Melillan Spanish, close to the standard and carrying the complete vocabulary of accreditation                        | `es`     |
| `position_language_nds.md`      | Low German, the northern branch that never took the High German consonant shift                                      | `nds`    |
| `position_language_rif.md`      | Tarifit, the Riffian Amazigh of the Rif coast                                                                        | `rif`    |

<!-- Rendered by build.mjs. Edit provenance.json or the varieties, then run `node build.mjs --write`. -->
