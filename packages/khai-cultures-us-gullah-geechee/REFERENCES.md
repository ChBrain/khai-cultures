# References

This is a creative staging; sources are generic historical encyclopedias, plus
Lorenzo Dow Turner, _Africanisms in the Gullah Dialect_ (1949) for the tongue,
and _De Nyew Testament_ (Sea Island Translation Team with the American Bible
Society, 2005) for the orthography this package writes in.

## The defining question

**What defines Gullah Geechee, and does the play stage it?**

What defines it is that a people was made in one place out of what was carried
to it, held together by isolation nobody chose, and is now losing the ground
under it by a legal mechanism rather than a violent one. The Arc says: rice
brought us, the mosquito left us alone, the bridge ended the water, the land is
slipping. Every clause of that is a plot. `rice` is `plot_00`, the `skeeter` is
`plot_01`, the `bridge` is `plot_07`, the land slipping is `plot_06` and `99`.

The Name chapter says the tongue was called broken English for two hundred years
and never was. That lands in `plot_05`, where a linguist's 1949 book ends the
claim.

The Stakes say what a people holds when it holds no ground — the tongue, the
basket, the shout, the name. The tongue is the package this play links; the
basket is `plot_03` and `plot_99`; the shout is `plot_02`; the name is the Name
chapter and `plot_05`.

## What acts in this plot line

| plot | subject of the Cue                         | state or its instruments?                                                             |
| ---- | ------------------------------------------ | ------------------------------------------------------------------------------------- |
| 00   | tidal rice, and who could grow it          | no                                                                                    |
| 01   | the anopheles mosquito                     | no                                                                                    |
| 02   | the distance to the mainland church        | no                                                                                    |
| 03   | chaff on the rice                          | no                                                                                    |
| 04   | a fleet arriving, and a crop left standing | **partly** — the fleet is a state instrument; the Cue's subject is the abandoned crop |
| 05   | a five-line song with no English in it     | no                                                                                    |
| 06   | a man dying without a will                 | no                                                                                    |
| 07   | a bridge                                   | no                                                                                    |
| 99   | sweetgrass, and where it will not grow     | no                                                                                    |

**One of nine is even partly the state**, and that one is staged from the crop
rather than from the Navy: what moves first in `plot_04` is a field nobody came
back for. The house runs at about three state plots in six to nine, so this line
sits well below the house habit rather than above it — which is the right side
to err on for a people whose whole difficulty is that the state arrived late and
by paper.

The one to watch is `plot_06`. Its machinery is a court, a filing fee and a
partition sale, and it would have been easy to write with the court as the
actor. The Cue is a man dying without a will in 1912, because that is what
actually moves first, and the court only becomes available a century later.

## Not staged

- **Igbo Landing (1803, St. Simons).** The most widely known Gullah story and
  deliberately absent. `order_a_culture_without_a_map.md` forbids writing a
  minority culture as a grievance, and a mass drowning staged as one plot in
  nine becomes the thing the culture is _for_. The resistance it records is real
  and it is not the shape of this people's daily life, which is what a plot line
  is for. A later hand may disagree; this is the reason to argue with.
- **The Gullah Geechee Cultural Heritage Corridor (2006).** A Congressional
  designation, and so a state instrument. It is named inside `plot_99` as a sign
  by the road, which is what it is on the ground, and it is not the subject of
  any Cue.
- **Special Field Order 15 and its rescission (1865).** Left out for the same
  reason `plot_04` is staged from the crop: the forty-acres story is a story
  about what a general wrote and a president undid, and this play is about what
  ten thousand people did in the three years nobody was watching.
- **The tongue's own grammar and lexicon.** Held in
  `@chbrain/khai-cultures-tongues/gul/`, not here. A culture links a tongue; it
  does not carry one.

## What this package does not have

No `geo.json`, and that is the point: see
`management/orders/order_a_culture_without_a_map.md`. This is the house's first
mapless culture — a people with no ISO code, hosted by `usa`, holding ground it
cannot be painted on because that ground already belongs to the cultures painted
over it. No geo, no fill.

`khai.languages` declares `gul`, which makes it a valid language for this
package and exempts it from machine detection. That is not a dodge. The
detector's registry carries `kri` (Krio), `pcm` (Nigerian Pidgin), `hat` and
`crs`, and has no model for Gullah; run against one it resolves to English or
to Krio, and either answer is wrong in a way that would then be enforced. The
house already holds two creoles on exactly this footing - `mfe` and `kea` are
in the umbrella's own `khai.languages` for the same reason, and the detector's
source names both as exempt in its comments. What this costs is real and worth
saying: no machine checks that these files are Gullah. `review: native` on the
tongue is the only check there is, and it is a person, not a wall.

The prose is in Gullah, for the reason the tongue package gives at length: the
English fallback is for a tongue nobody can write, and this is not one. It ships
under the language's own name and a speaker may find it wrong.
