---
"@chbrain/khai-cultures": patch
---

Saxony's plot line had a floor and a ceiling missing, and both were invisible.

The Name chapter names `Erzgebirge`, and no plot ever staged it. The three
existing plots (August der Starke 1697, the industrial rise from 1830, Leipzig 1989) all stage what the mineral wealth and the mining tradition later paid for,
and never the wealth itself: a mining margravate rich enough that in 1423 it
inherited an electoral title and a name, Sachsen, that belonged to a different
people three hundred kilometres away. The land the name now covers was the Mark
Meißen, settled by the Slavic Sorbs since the sixth century, before German
miners ever reached it. **Die Mark Meißen, das Erzgebirgssilber und der
geliehene Name Sachsen** is the new `plot_00`: 965 (the march founded against
the Sorbs), 1168 (the Freiberg silver find), 1423 (the name's move from
Wittenberg to Meißen). Three new Company members carry it: `place_erzgebirge`,
`process_bergbau` (whose Echo is the throughline from Bergakademie Freiberg,
1765, to the microelectronics `der Erfindergeist` already claimed), and
`position_sorbisches_erbe`, the Sorbian minority the land was settled from and
still holds today, roughly 40,000 strong in the Saxon Oberlausitz (the wider
West Slavic Sorbian population, including the Lower Sorbs of Brandenburg, is
larger, and the file says so rather than folding one into the other).
`der Erfindergeist`'s Drives and `die sächsische Kultur`'s Has now name this
root as well.

The Stakes chapter asks whether Saxony manages rural demographic decline and
grows its Hightech industry without losing Wohlstand, and no plot had staged
either as something that had actually happened, only as an open question. **Zwischen
Montagsspaziergang und Chipfabrik 2014 bis 2025** is the new `plot_99`: Pegida's
Monday walks in Dresden from October 2014, borrowing 1989's own slogan `Wir
sind das Volk` for a different cause; the killing of Daniel Hillig in Chemnitz
on 26 August 2018 and the video-documented street chases and days of far-right
riots that followed, which a chancellor called `Hetzjagden`; the AfD's best-yet
Saxon result in the 1 September 2024 Landtagswahl (31.9 percent for the CDU,
30.6 for the AfD, consistently stronger on the land than in Dresden or
Leipzig); the 20 August 2024 groundbreaking for the ESMC chip fab in Dresden,
Saxony's largest single investment since reunification; and Chemnitz, seven
years after 2018, spending 2025 as European Capital of Culture. No new
Company: it casts `der Bürgerprotest`, `der Erfindergeist`, `das Silicon
Saxony`, `Peggy` and `Günter`, and both `der Bürgerprotest` and `die
sächsische Kultur` now name in their own Drives and Loses that the 1989
slogan gets reused this way.

Two Arc and Name words were checked and deliberately left unstaged, with the
reasoning recorded in `REFERENCES.md`: `Understatement`/`Kaffeesachsen` name a
register the pitch already carries, not an event, and `Freistaat` names a state
form change (1918, 1990) rather than a change in what Saxons are, on the same
reasoning that keeps foundings out of Germany's own plot line.

QA caught two numbers that should not have shipped: the constituency-level
election percentages and the Erzgebirgskreis's 2040 population forecast were
both dropped, since I had not opened either source and the sentences work
without them. `position_sorbisches_erbe` also conflated the Sorbs as a whole
(about 60,000, including the Lower Sorbs around Cottbus in Brandenburg) with
Saxony's own Upper Sorbian population (about 40,000); the file now gives the
Saxon figure and says explicitly that Lower Lusatia lies in Brandenburg.

Coverage, sub-national conformance, persona wiring and `plot_zero` all come out
clean for `de_saxony`.
