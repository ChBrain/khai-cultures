---
updated: "2026-09-03"
---

# Alsace: References

The provenance behind this culture: the source data that tunes the pitch (kept
here, never in the prose), the public historical record behind the plots,
personas, places, pieces and processes, what `geo.json` says, and the note on the
language the package is written in.

## The language this package is written in

Every file here is written in Alsatian, against
[`position_language_gsw_fr.md`](@chbrain/khai-cultures-tongues/gsw/position_language_gsw_fr.md).

**The Alsatian in this package has not been read by a speaker.** It was written
by the agent that staged the culture, in Orthal in its Bas-Rhin reading, and
should be treated as staged prose awaiting native review rather than as attested
usage. Where to look: the monophthongs the Alemannic anchor names as its Orders
are the thing a non-speaker slips on first, and any drift into written German
spellings is exactly that slip; the Sundgau is High Alemannic and will find every
file here northern; and the second lexicon the tongue position describes under
Has - French stems with Alemannic endings - is used sparingly here, where a
speaker would use it more, because a non-speaker cannot tell which borrowings are
naturalised and which would read as showing off.

A speaker should expect to change words, not the content.

## Why `geo.json` covers two codes

```json
{ "iso": "FR-6AE", "covers": ["FR-67", "FR-68"] }
```

`FR-6AE` is the Collectivité européenne d'Alsace, created in 2021 from the two
departments and sitting inside the Grand Est region. `covers` names the two
departments themselves, Bas-Rhin and Haut-Rhin.

This is the second use of `covers` in the house and it is doing something
different from Brittany's. There, the anchor and the drawing disagree, because a
culture is larger than its administrative unit. Here they agree exactly - the
collectivité **is** the two departments - and `covers` is written anyway, because
`FR-6AE` is four years old and nothing older will resolve it. A renderer holding
a 2016 or a 1990 code table can still paint Alsace from `FR-67` and `FR-68`. The
field is being used as a fallback, not as a correction, and that is worth
recording as a second legitimate reason to write it.

Grand Est is not named in `geo.json` at all. It is where the collectivité sits
administratively and it is not a culture; naming it would put a container in a
field that holds cultures.

## Hofstede source data

The pitch [pitch_alsace.md](pitch_alsace.md) is written from France's profile
inflected by a border position, by a habit of not answering, and by a local law
that has survived a century inside a state that calls itself indivisible. It
names no dimension and carries no number.

| Dimension                     | Alsace (France proxy, inflected) |
| ----------------------------- | -------------------------------- |
| Power Distance                | 68                               |
| Individualism                 | 71                               |
| Motivation toward Achievement | 43                               |
| Uncertainty Avoidance         | 86                               |
| Long Term Orientation         | 63                               |
| Indulgence                    | 48                               |

Source: Geert Hofstede, Hofstede Insights (France). No regional Alsatian profile
exists; the base scores are France's, and the pitch's Tenor and Undertow are
written from the historical record below rather than from the table.

The inflection worth recording completes a set. France's very high Uncertainty
Avoidance produces, in Corsica, a state that strikes words out of a statute; in
Brittany, a state that never answers; in Alsace, a state that **asks** - with
cards, with a deadline, with a uniform. Same score, three different instruments,
and the third is the only one where the demand was made by both sides in turn.
That is why the pitch's Tenor is restraint rather than grievance: a land asked
five times learns that anything it says will be quoted back by whoever comes
next.

## Historical sources

Drawn from the public historical record; the reference sources are generic
historical encyclopedias and the published texts of the acts named.

| Subject                   | In this culture                                                   | Scope                                                                                                                                                                                         |
| ------------------------- | ----------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Into France, 1648 to 1681 | [plot_00](plot_00_s_rich_kummt_zue_frankrich_1681.md)             | Westphalia's ambiguous cession of the Habsburg holdings; the réunions; Strasbourg surrenders 30 September 1681; language, Lutheran church, local law and customs status all left in place.    |
| The Rhine becomes an edge | [plot_01](plot_01_de_rhin_wurd_e_graenz_1789.md)                  | The two departments, 1790; the customs frontier moved to the river; full citizenship for Alsace's Jews, 27 September 1791, the first in Europe; the Marseillaise written in Strasbourg, 1792. |
| The Reichsland, 1871      | [plot_02](plot_02_s_richsland_1871.md)                            | Annexation of 10 May 1871; the Reichsland under direct imperial administration; the option deadline of 1 October 1872 and the roughly 131,000 who opted; the 1911 constitution.               |
| The A B C D cards         | [plot_03](plot_03_d_kartle_a_b_c_d_1918.md)                       | The 1918 to 1919 triage commissions sorting inhabitants by grandparents' origin; differential exchange rates; expulsions; French-only schooling; the Colmar autonomist trial of 1928.         |
| The Malgré-nous           | [plot_04](plot_04_d_malgre_nous_1942.md)                          | De facto annexation, 1940; conscription decreed 25 August 1942; roughly 131,000 conscripted, mostly to the Eastern Front; Tambov; the Bordeaux trial of 1953 and the amnesty.                 |
| No law forbade it         | [plot_99](plot_99_kei_gsetz_het_s_verbote.md)                     | German out of primary schooling after 1945; the "C'est chic de parler français" campaign; transmission collapsing in two generations; Grand Est, 2016; the collectivité, 2021.                |
| Strossburi                | [place_strossburi](place_strossburi.md)                           | Strasbourg: the 1681 surrender; the Marseillaise; the German-era university; the Council of Europe from 1949 and the European Parliament.                                                     |
| Colmar                    | [place_colmar](place_colmar.md)                                   | The Isenheim altarpiece at the Unterlinden; the 1928 autonomist trial, and two of the convicted elected to the Chamber shortly after.                                                         |
| De Rhin                   | [place_de_rhin](place_de_rhin.md)                                 | The Rhine: a valley's middle until 1790, a state edge after; the Kehl bridge destroyed and rebuilt repeatedly.                                                                                |
| S Rot un Wiss             | [piece_s_rot_un_wiss](piece_s_rot_un_wiss.md)                     | The red-and-white with the white bend; nineteenth-century as a whole-province emblem; taken up by the autonomists; banned in 1940; adopted officially by the Regional Council in 2008.        |
| S Storichenäscht          | [piece_s_storichenaescht](piece_s_storichenaescht.md)             | The white stork's nest; fewer than ten pairs left in Alsace by 1974; reintroduction programmes; several hundred pairs today.                                                                  |
| S Christkindelsmärik      | [process_s_christkindelsmaerik](process_s_christkindelsmaerik.md) | The Strasbourg Christmas market from 1570, when the Lutheran reform replaced the Saint Nicholas fair and put the Christ-child in his place; the name is what survives of that.                |
| S Messti                  | [process_s_messti](process_s_messti.md)                           | The village patronal festival: mass, stalls, dance, on a fixed saint's day; the one public occasion where Alsatian is spoken in front of everyone without meaning anything by it.             |
| S Droit local             | [position_s_droit_local](position_s_droit_local.md)               | The Alsace-Moselle local law: the 1801 Concordat with salaried clergy, religious education in state schools, two extra holidays, the 1883 social insurance, still in force.                   |
| D Malgré-nous             | [position_d_malgre_nous](position_d_malgre_nous.md)               | The name the conscripted gave themselves; the statute recognising forced incorporation, 1981.                                                                                                 |

The three personas - [de Grossvadder](persona_de_grossvadder.md),
[d Lehrere](persona_d_lehrere.md) and
[de Grenzgänger](persona_de_grenzgaenger.md) - are archetypes, not historical
people: the man conscripted into the wrong army, the teacher who brought a
language back into a classroom and found it was a different one, and the first
generation for whom the dialect pays.

## The defining question, asked of Alsace

Checked against the house order on the defining question
(`management/orders/order_the_defining_question.md`): the Arc names `1681`,
`de Rhin`, `s Richsland`, `Kartle A B C D`, `d Malgré-nous`, `kei Gsetz`,
`Grand Est` and `d Kollektivität`; the Name names `ISO FR-6AE`, `Sproch gsw` and
`fenf Mol d Sitt gwächslet`; the Stakes ask whether this is a land that lost its
language or one that learned that speaking is dangerous and silence is not; the
pitch names `Zruckhaltung`, the tenderness that only comes out indoors, and the
silence left when someone stops talking.

Every word of the Arc lands in a plot. Six rather than the house floor of three,
because the count is the content: five changes of side is the claim the Name
makes, and a plot line that showed three of them would not support it.

This completes a set of three French sub-national cultures, and the three are
worth holding together because the same state behaves differently in each.
Corsica is told no, on the record, by courts. Brittany is not answered. Alsace is
asked - and it is the only one of the three where the asking came from both
sides in turn, which is why its culture-position's Orders is not to say which
side you are on.

Four things are deliberately not staged, and the reasoning is recorded here so
the next hand argues with a reason instead of asking again:

- **The Struthof.** The only Nazi concentration camp on French soil is in
  Alsace, and it is not given a scene. It is a camp the Reich built in a place it
  had annexed, and the people in it were overwhelmingly not Alsatian; staging it
  here would make the country's arc absorb a crime that happened on its ground
  rather than to it. The house rule that a play stages its own culture settles
  it, and this is the case where that rule does the most work.
- **Oradour-sur-Glane itself.** The massacre belongs to the Limousin. What is
  staged in [plot_04](plot_04_d_malgre_nous_1942.md) is the 1953 Bordeaux trial
  and the amnesty, because that is where the event entered Alsace's arc - not
  as a crime but as the moment the rest of France and Alsace read the same verdict
  in opposite directions.
- **Lorraine, and Moselle in particular.** The local law is Alsace-Moselle, the
  conscription took Mosellans too, and the 1871 annexation took part of
  Lorraine. Moselle is a Francique-speaking country with its own arc and it is
  not a part of Alsace; folding it in to make the legal story tidy would be
  precisely the border-driven staging this house refuses. It is named where the
  facts require it and staged nowhere.
- **The 2013 referendum on merging the two departments**, which failed on
  turnout in Bas-Rhin. It is a procedural episode inside the same open question
  that [plot_99](plot_99_kei_gsetz_het_s_verbote.md) already carries, and giving
  it a scene would add a date without adding a turn.
