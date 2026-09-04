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

The inflection worth recording is not about how the French state behaves. France's
very high Uncertainty Avoidance describes a state that wants one answer, and that
matters here only because it is the thing this culture is least able to give.
What tunes the pitch is the other side of that: four hundred years of villages
that ran on an arrangement rather than a verdict, and a people whose one real
skill has no word that can be said out loud without sounding small. The Tenor is
`Uskumft`, accommodation, and not grievance; the Nerve is knowing something
nameless.

## Historical sources

Drawn from the public historical record; the reference sources are generic
historical encyclopedias and the published texts of the acts named.

| Subject              | In this culture                                                   | Scope                                                                                                                                                                                       |
| -------------------- | ----------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| The strip            | [plot_00](plot_00_s_ried_un_de_wingert.md)                        | The braided Rhine floodplain, seasonally flooded and malarial; the Vosges rain shadow and viticulture on the piedmont since Roman settlement; the village line on the terrace between.      |
| The four communities | [plot_01](plot_01_d_vier_gmeinschafte.md)                         | Reformation in a land of free cities, Habsburg holdings and noble houses; the simultaneum after 1648, over 150 shared churches; rural Jewish Alsace, Yédisch-Daïtsch; emancipation, 1791.   |
| Tulla's Rhine        | [plot_02](plot_02_tulla_macht_de_rhin_grad_1817.md)               | Johann Gottfried Tulla's rectification from 1817: some 2,000 meanders cut, the course shortened by roughly 80 km, malaria ended, floodplain drained, the braided forest economy destroyed.  |
| Cloth and potash     | [plot_03](plot_03_de_stoff_un_s_kali.md)                          | Mulhouse an independent republic allied to the Swiss, cotton printing from 1746, its own vote to join France in 1798; potash found in the Sundgau in 1904, mined to 2002; immigrant labour. |
| The A B C D cards    | [plot_04](plot_04_d_kartle_a_b_c_d_1918.md)                       | The 1918 to 1919 triage commissions sorting inhabitants by grandparents' origin; differential exchange rates; expulsions; French-only schooling. Annexation of 1871 as its Cue.             |
| The Malgré-nous      | [plot_05](plot_05_d_malgre_nous_1942.md)                          | De facto annexation, 1940; conscription decreed 25 August 1942; roughly 131,000 conscripted, mostly to the Eastern Front; Tambov; the Bordeaux trial of 1953 and the amnesty.               |
| No law forbade it    | [plot_99](plot_99_kei_gsetz_het_s_verbote.md)                     | German out of primary schooling after 1945; the "C'est chic de parler français" campaign; transmission collapsing in two generations; Grand Est, 2016; the collectivité, 2021.              |
| De Ried              | [place_de_ried](place_de_ried.md)                                 | The floodplain: remnant oxbows and alluvial forest, the largest groundwater body in central Europe beneath it, and no villages on it.                                                       |
| De Rhin              | [place_de_rhin](place_de_rhin.md)                                 | The river before and after Tulla; the Kehl bridge destroyed and rebuilt repeatedly.                                                                                                         |
| Colmar               | [place_colmar](place_colmar.md)                                   | The Isenheim altarpiece, painted for a hospital; the wine road and the growers' cooperatives; the driest place in the country; Catholic while its neighbours turned Lutheran.               |
| Milhüsa              | [place_milhuesa](place_milhuesa.md)                               | Mulhouse: self-governing republic, cotton printing from 1746, a Protestant industrial bourgeoisie and its schools and collections, the 1798 vote, and the potash basin around it.           |
| Strossburi           | [place_strossburi](place_strossburi.md)                           | Strasbourg: the 1681 surrender and the century of retained language, church and law; the Marseillaise; the German-era university; the Council of Europe and the European Parliament.        |
| D Simultankìrch      | [piece_d_simultankirch](piece_d_simultankirch.md)                 | The shared church: nave to one confession, choir to the other, a grille between; over 150 in Alsace after 1648; a number still in shared use.                                               |
| S Rot un Wiss        | [piece_s_rot_un_wiss](piece_s_rot_un_wiss.md)                     | The red-and-white with the white bend; a whole-province emblem from the nineteenth century; taken up by the autonomists; banned in 1940; adopted officially in 2008.                        |
| S Storichenäscht     | [piece_s_storichenaescht](piece_s_storichenaescht.md)             | The white stork's nest; fewer than ten pairs left by 1974, in part from the drainage that followed the rectification; reintroduction; several hundred pairs today.                          |
| De Herbscht          | [process_de_herbscht](process_de_herbscht.md)                     | The grape harvest: date set by sugar reading and not by calendar, worked downhill row by row, the whole village on the same slope at the same time.                                         |
| S Christkindelsmärik | [process_s_christkindelsmaerik](process_s_christkindelsmaerik.md) | The Strasbourg Christmas market from 1570, when the Lutheran reform replaced the Saint Nicholas fair and put the Christ-child in his place; the name is what survives of that.              |
| S Messti             | [process_s_messti](process_s_messti.md)                           | The village patronal festival: mass, stalls, dance, on a fixed saint's day; the one public occasion where Alsatian is spoken in front of everyone without meaning anything by it.           |
| S Droit local        | [position_s_droit_local](position_s_droit_local.md)               | The Alsace-Moselle local law: the 1801 Concordat with salaried clergy of three confessions and rabbis, religious education in state schools, two extra holidays, the 1883 social insurance. |
| D Malgré-nous        | [position_d_malgre_nous](position_d_malgre_nous.md)               | The name the conscripted gave themselves; the statute recognising forced incorporation, 1981.                                                                                               |

The three personas - [de Grossvadder](persona_de_grossvadder.md),
[d Lehrere](persona_d_lehrere.md) and
[de Grenzgänger](persona_de_grenzgaenger.md) - are archetypes, not historical
people: the man conscripted into the wrong army, the teacher who brought a
language back into a classroom and found it was a different one, and the first
generation for whom the dialect pays.

## The defining question, asked of Alsace

**This section replaces an earlier one, and the replacement is the point.**

The first staging of this culture answered the defining question with a
constitutional line: six plots, five of them a state acting on a people, and an
Arc, Name and Stakes built on five changes of nationality. It ran the tell that
`order_the_defining_question.md` prescribes - take the words the play uses about
itself in Arc, Name, Stakes and pitch, and ask which appear in a plot - and it
passed, because those words were themselves constitutional. **A play whose
self-description is a passport passes that tell perfectly.** The order names this
exact failure ("a play that stages only the statehood has described a passport")
and the first staging cited the order by name while committing it.

What the plot line stages now: the land that leaves one habitable strip, the four
communities that shared one church because none could win, the engineer who
straightened the river, and the two industries the country chose for itself.
Three of seven plots are a state acting, which is the range the house sits in
(Aargau 3 of 6, Hesse 3 of 5, Bavaria 3 of 9). **The politics did not go away and
should not have** - the cards and the conscription are defining, and the third
plot's Tension now says why they cut so deep: they demanded the one thing four
hundred years of village practice had never had to produce, a single answer.

Checked against the order: the Arc names `Bord`, `Ried`, `Räbe`, `Simultankìrch`,
`vier Gmeinschafte`, `Tulla`, `Milhüsa`, `Kali`, `Kartle`, `Malgré-nous` and
`kei Gsetz`; the Name names the strip, the shared church and the five demands;
the Stakes ask what becomes of a country whose one real skill has no name; the
pitch names `Uskumft` and the grille in the church. Every one lands in a plot.

Five things are deliberately not staged, and the reasoning is recorded here so
the next hand argues with a reason instead of asking again:

- **1681 and 1871 as plots of their own.** Both are in the Arc, and 1871 is the
  Cue of the cards. Neither carries a scene, because the annexations are the
  weather this culture lives in rather than turns in it: what the country did
  under each of them is the same, and staging both would spend two of seven
  plots restating that the border moved.
- **The Struthof.** The only Nazi camp on French soil is in Alsace and gets no
  scene. The Reich built it on ground it had annexed and the people in it were
  overwhelmingly not Alsatian; staging it would make this arc absorb a crime that
  happened _on_ the country rather than _to_ it.
- **Oradour-sur-Glane itself**, which belongs to the Limousin. What is staged is
  the 1953 trial, where the event entered Alsace's arc.
- **Moselle.** The local law is Alsace-Moselle and the conscription took
  Mosellans, but Moselle is a Francique country with its own arc; folding it in
  to tidy the legal story would be the border-driven staging this house refuses.
- **The 1928 Colmar autonomist trial and the 2013 referendum.** Both were in the
  first staging. Both are procedural episodes inside questions other plots
  already carry, and both were there because constitutional material is cheap to
  find - which is the habit this rewrite exists to break.
