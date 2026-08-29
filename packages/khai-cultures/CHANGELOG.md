# @chbrain/khai-cultures

## 0.289.0

### Patch Changes

- aeffe41: Austrian German comes out of Austria and into the package, which finishes the
  German-language tongues of the DACH group except `de_de`.

  It was thinned on the way. Its opening clause restated the anchor and its
  `Orders` began `wie jedes Deutsch` — the exact thinness the `de` anchor was
  written to cure. What it keeps is its own (Erdapfel, Jänner, Sackerl, Marille,
  Paradeiser, Karfiol, the productive `-erl`, the soft onset), and what it gained
  is the grammatical fact it was missing: the **sein-perfect** with the verbs of
  standing, sitting and lying — `ich bin gestanden`, `ich bin gesessen`, `ich bin
gelegen`, where the north takes `haben`. That is a different auxiliary, not a
  colouring, and it falls due in every second sentence without a speaker ever
  choosing it. With it came the near-total avoidance of the simple preterite in
  speech, and the title before the name: whoever does not know the title cannot be
  polite in this language, only vague.

  It cost two cultures, because the four that would have carried the rest were
  finished in the three batches before this one. Fourteen castings, none invented.
  Czech puppet theatre goes into the plot where the language is driven out of the
  cities — the marionette speaks Czech while no stage does. Jaroslav Hašek goes
  into the Munich plot, not as a man present in 1938 but as the author of the
  defence that plot uses, named fifteen years earlier. Jiřina, the pub, the
  dumpling and the weekend cottage go into the Velvet Revolution, which is where
  that private life had been waiting. On the Hungarian side, Széchenyi and the
  buried Holy Crown go to 1848, Erzsi to 1956, and Bence, the paprika, the baths
  and the mulatság to Trianon: he is what the treaty produced, and they are what
  it could not take.

  Twenty languages, 60 varieties, version unchanged at `0.20.0`.

  Tomáš is waived, and he is the sixth of his kind. Every waiver in this house now
  has the same cause: a person whose defining fact — emigration, minority
  standing, being born into the settlement — happened after the last plot their
  play stages. Six is no longer a series of casting problems.

- 61369e6: Bairisch becomes a family with an anchor, the way German already is. The file
  called `position_language_bar.md` held Munich's Mittelbairisch under the family's
  title, which is the same mistake `das bayerische Hochdeutsch` was making with
  Bairisch features one pull request ago. Its content moves down to `bar_mitt` and
  the anchor is written fresh, holding what every Bairisch variety shares: the -l,
  the article before a name, es and enk from the old dual, and the missing preterite.
  Its Loses is the reason this package exists — Bairisch is spoken in Bavaria, Austria
  and South Tyrol by some fourteen million people, so the same dialect is a Mundart in
  one state and nearly the state language in another. Nordbairisch joins it, written
  in Northern Bavarian so its one distinguishing feature is visible rather than
  described: the old diphthongs fall the other way, Brouda and leib where
  Mittelbairisch has Bruada and liab. It came in with no culture behind it, because a
  tongue exists when a speech community speaks it and not when a play casts it.
  Amalie and Gustl move from the family to Mittelbairisch, which is what they actually
  speak; the play and the culture-position keep the family. Six languages still, so
  the version stays 0.6.0 — three files, one language, which is the rule reading
  correctly.
- fae967e: Bairisch becomes its own tongue. It was already in the house as
  `position_bayerisch.md`, an ordinary position titled "The Bavarian Language
  Variety", declared das Bairische and tagged `language: de` — a language position in
  substance wearing another kind of name, which is why the tongues walk never saw it
  and why the coverage gate made a plot stage it. It is now
  `bar/position_language_bar.md`, written in Bavarian, carrying what is Bavarian
  rather than Upper German in general: the -l almost any thing can take, Stoa for
  Stein, the article before a personal name, and es and enk, the second-person plural
  no other German dialect kept. The Bavarian Hochdeutsch keeps its own file, because
  all five Bavarian personas hold the regional standard and only three hold a dialect,
  but it gives up the Bairisch features that were wrongly written into it and keeps
  what is true of a standard: the southern words it holds in checked prose, the
  composite past in speech, and the one structural fact no other Landeshochdeutsch
  has, that it lies over three mutually foreign dialect floors. The package goes to
  six languages, so the version goes 0.5.0 to 0.6.0 — the rule firing on a real
  tongue. Also fixes three provenance entries that a trailing comma had turned into
  one-element arrays four pull requests ago: Bavaria, Hesse and Saxony-Anhalt have
  been rendering blank rows in REFERENCES.md ever since, because the gap check tested
  that a key existed and never that its entry could be read. It tests both now.
- 86b2307: The two autonomous cities come out finished, as the pair they were staged as.
  Ceuta pays all three debts it owed: it becomes `es_ceuta`, it says for the first
  time that being ceutí is una manera de ser española and not a second passport,
  and it comes to zero dead Company entries. The casting is where the history
  already put it: the statute of 1995 is when the city gained its own assembly, so
  that is when the ronda de las fiestas stops being a neighbourly custom and enters
  a calendar somebody has to approve, and when the heritage service Nadia works for
  comes into existence. Both tongues then leave for
  `@chbrain/khai-cultures-tongues`, and both were read against the mnemonic on the
  way. Ceutan Spanish placed itself on the African shore of the Strait and now
  names the community that speaks it, because where is not one of the four
  chapters. Melillan Spanish lost that same opening and one more claim: it
  explained its own closeness to the standard by the city's garrison and civil
  service, which describes who lives in a place, not what a tongue does to whoever
  holds it. Nine varieties of 320 have landed; sub-national conformance goes 83 to 82.
- 2db536b: Austria, Switzerland and Liechtenstein come out finished on their Company, and
  four of the DACH tongues move into the package: Swiss Standard German,
  Liechtenstein Standard German, Swiss French, Swiss Italian and Romansh. `fr/`,
  `it/` and `rm/` open with them, so the package goes from fifteen languages to
  eighteen and the version from `0.15.0` to `0.18.0`.

  Sixteen castings and three waivers. The waivers are all the same finding and it
  is worth stating plainly: **DACH's plot lines stop before their contemporary
  personas were born.** Austria's plots are 1740, 1815, 1900 and 1955, with no
  Anschluss and nothing after the Staatsvertrag. Switzerland's are 1291, 1848,
  1863 and 1971, with no Sprachenartikel of 1938 — which is the whole ground of
  what Gian and Marco carry, so the two personas who exist to hold the
  quadrilingual question have no scene in which the question was decided. Waived
  with that reason rather than answered by inventing a plot.

  `de_de` and `de_at` did **not** move, and the measurement is why. A tongue's
  migration drags every culture that links it into the coverage ratchet:

  | tongue  | cultures linking it | dead entries pulled in |
  | ------- | ------------------- | ---------------------- |
  | `de_ch` | 2                   | 9 — paid here          |
  | `de_at` | 5                   | 33                     |
  | `de_de` | 21                  | ~100                   |

  Ireland and the Holy See are the two that `de_ch` pulled in, and both come out at
  zero. The other two are their own pieces of work, not a rider on this one.

- 75a41f5: Franconian and Swabian become real tongues, which completes the evidence for the
  claim Bavaria's play already makes. Both were ordinary positions titled "The …
  Language Variety" and tagged `language: de`, both about a hundred words, and both
  had a cultural duty where a language position needs a grammatical order — dass man
  die Mundart pflegt is what a stance demands, not what a grammar forces. Ostfränkisch
  now carries the lenition that makes Gonsonanden of Konsonanten, the -la that is
  neither Bairisch's -l nor Swabian's -le, and the feature worth the most: East
  Franconian still genders the numeral two, zwee Männer, zwo Fraan, zwaa Kinner, which
  Standard German lost entirely. Swabian gets an anchor whose heartland is in another
  state, with Bavarian Swabian and Allgäuerisch beneath it — and the Allgäu is where
  Swabian stops being Swabian, because the diphthongisation that made Hous of Huus
  runs out partway down the valley and the old monophthong stands on toward Vorarlberg.
  Sepp moves off the Augsburg variety he was filed under and onto the Allgäu one he
  actually speaks, which was the Bairisch mistake in miniature. Eight languages, so
  0.6.0 becomes 0.8.0.
- 1a451b0: The house ships its own `playwright_instructions.md`.

  `@chbrain/khai-cultures` is a khai package like any other — it declares
  `khai.engine: "cultures"`, its own collection and its own card, and it ships 290
  cultures to whoever installs it. It told a consuming Playwright nothing about how
  to wire one in.

  What it owns is narrow, and the file says only that: which culture a persona
  belongs to. Which tongue they hold is the tongues package’s instructions; how well
  they hold it is the language engine’s.

  Two rules in it are not new inventions. They are what the house already does,
  written down before the next hand breaks them:

  - **Every cross-culture link points at a position.** Of the links this house
    carries between cultures, all point at a `position_` and none at a plot,
    persona, piece, place or process. A culture’s cast is cast in its own scenes and
    answers to its own pitch; borrowed into another play it would answer to neither.
  - **The nesting lives on the position.** Zero personas link both a sub-national
    culture and its parent, across 90 sub-national cultures — because the
    sub-national culture-position already carries the one above it.

  The guard config gains the file in the governance lane, since it is a document
  about the house rather than content of it, and `files` gains it so it reaches the
  people it is written for.

- 84753b8: Eight German Länder come out finished: Berlin, Brandenburg, Bremen, Lower Saxony,
  Mecklenburg-Vorpommern, North Rhine-Westphalia, Rhineland-Palatinate and Saxony.
  Each takes its `de_` identifier, says for the first time that it is eine Art, die
  deutsche Kultur zu leben, kein zweiter Pass, comes to zero dead Company entries,
  and hands its variety to `@chbrain/khai-cultures-tongues`. Sixteen castings, and
  almost none of them needed a new sentence: the plots already named Günter in der
  Porzellanmanufaktur, Jupp in the Wiederaufbau, Antje at the Wolfsburg line and
  Nadja in the Umbruchjahre, in prose, with no link. Reading the varieties turned up
  two cuts and one finding, and the second cut is the newly sorted drift
  queue's first catch. Palatine German said its sound gives the Winzerstube its
  warmth, which is what a room in a culture gets and not what a tongue does to
  whoever holds it. Mecklenburg-Vorpommern's said its clear pronunciation once counted as the
  norm für ganz Deutschland, naming the culture above instead of the standard
  itself; it now says it served the Bühnenaussprache as a model, which is the same
  fact told about the language. And the Berlin, Brandenburg and Bremen varieties claim nothing
  about a culture because they say nothing about themselves either: four chapters of
  Standard German with no Berliner Schnauze, no märkisch Low German floor, nothing
  Bremen. They are marked `review: thin` in the provenance and left standing rather
  than answered by invention. Fifteen varieties of 320 have landed; sub-national
  conformance goes 82 to 74.
- 32dcf6f: Four more German Länder come out finished: Bavaria, Hesse, Saxony-Anhalt and
  Thuringia. Sixteen castings, all where the history already put them. The Oktoberfest
  goes into the plot of the young kingdom, because it began in 1810 as that kingdom's
  own wedding; the Gebirgler and the Fingerhakeln into the plot where Ludwig builds
  his castles, because the Kulisse he built in was somebody's working ground first;
  the Bembel and the Gemütlichkeit into the Paulskirche of 1848, because the factions
  of that parliament met in the inns around it and took their names from them, Casino,
  Deutscher Hof, Donnersberg. Walter, Elisabeth, Maria, Monika and Sepp were already
  named in their plots, in prose, with no link. Reading the varieties turned up a
  rewrite and a cut. Bavarian German was thin the way Berlin was, but by another
  route: not generic German but generic Upper German, naming only what it said itself
  was shared von Bayern bis in die Schweiz. It now carries the -l diminutive, Stoa for
  Stein, the article before a name, and es and enk, the second-person plural no other
  German dialect kept, which descends from the old dual; and it says the structural
  thing the play already stages as three positions, that it is one state language over
  three mutually foreign dialect floors. Hessian German explained its own register
  switch by die Bank und die Börse in Frankfurt, which is a city's finance industry and
  not what a tongue does to whoever holds it; the register stays, the institutions go.
  Twenty-one varieties of 320 have landed; sub-national conformance goes 74 to 70.
- 9c2b322: Schleswig-Holstein comes out finished, the last of the sixteen Länder and the
  heaviest: eleven dead Company entries, more than the eight-Land batch carried
  between them. Every casting is where the history already put it. The Moin goes into
  the Hanse plot, because a greeting that asks nothing about rank belongs where the
  council did not ask the merchant about his birth. The Deichbau and the Wattenmeer go
  into the Mandränke of 1362, whose own lesson is that the dike must be built higher
  and together, and Okke stands on that dike six centuries later. Husum was already
  named in Storm's plot without a link, and the Schimmelreiter is what Storm wrote the
  coast about its own dike in the years after. The Kieler Woche goes to Kiel 1918: the
  harbour the fleet would not leave got its sails back as the city's festival. And
  Sönke, born close to the border and taking neither side as enemy, goes to the
  plebiscite of 1920, because that is precisely what was voted. Both tongues move.
  Low German is the cleanest position in the package and is written in Low German
  itself; nothing was cut from it. Schleswig-Holstein Standard German lost one
  epithet, im Land zwischen den Meeren, the same cut Ceutan and Melillan Spanish took.
  One thing is found and left standing: the package's own `khai.members` has made the
  very mistake its build was written against, hand-kept and naming one member of
  twenty-three. Deriving it is not the one-line fix it looks like, because khai's
  engine contract wants exactly one root and the twenty-three are siblings with no
  parent among them, so the package needs the anchor it has never had. That is the
  composite ceremony it already owed, and it wants its own pass. Twenty-three varieties
  of 320 have landed. Sub-national conformance goes 70 to 69, and all sixteen German
  Länder are finished.
- 34e68cb: Switzerland and Liechtenstein cast the language they actually speak.

  `gsw` has been in the package since the Alemannic file was written, and until now
  the only culture casting it was **Austria**, for Vorarlberg. Neither of the two
  countries where Alemannic is the everyday language of most people pointed at it.
  The tongue was named in prose across both plays and linked nowhere.

  Three links were wrong and one was missing:

  - **Tell** spoke `den [Dialekt]` and the link went to Swiss Standard German — the
    word was right, the target was a writing form.
  - **Franz** had his mother tongue linked to `position_rheintal.md`, a _place_
    position. An Alemannic dialect pointing at a valley.
  - **Katharina** _spoke and thought_ in `de_li`, the written norm that the `de_li`
    file itself says the country did not make and nobody speaks. She now speaks
    Alemannic and writes the standard all day without ever having spoken it.
  - **Vreni** was already right — _"das ist ihre Muttersprache, gesprochen und nie
    geschrieben"_, with `de_ch` only on `schreibt`, _"eine Sprache, die sie so gar
    nicht spricht"_. Hers is the best statement of the diglossia in the house. Her
    Schwiizerdütsch simply had nothing to point at, and now does.

  Switzerland's culture-position also said the four national languages and stopped
  there. The four are the constitution, not the day: under the first of them stands
  Schwiizerdütsch, which the largest of the four communities speaks and never
  writes, so it lives in one language and signs in another. The position says that
  now.

  No new files, no version change. `le francais de Suisse` in the Company list also
  gained the cedilla it had been missing since before the accents were restored.

- 0c2c109: Slovenia and Croatia come out finished, and Austria gains the language Article 7
  guarantees it.

  Both tongues migrate to the package as anchors — `sl/position_language_sl.md`
  and `hr/position_language_hr.md` — and neither needed a cut. Slovene leads with
  the dual, a grammatical number for exactly two that most of its Slavic relatives
  gave up; Croatian is here now rather than later because it is the anchor
  Burgenland Croatian will hang from.

  Fourteen castings, no invented scenes. Anton Janša is the eighteenth-century
  beekeeper the Empress called to Vienna, so he goes into the Habsburg plot with
  the craft, the painted hive panels and the hayrack; `pridnost` was already named
  in that plot's prose and only needed a link. Marija and Luka go into the
  independence plot, the grandmother who lived every Yugoslav decade and the
  grandson born into the state that followed. On the Croatian side the cravat goes
  where the frontiersmen in foreign service are, the klapa and the fjaka to the
  Adriatic plot, and Kata and the šahovnica to the war.

  Austria now casts Slovene, and the reason is in a plot it already had.
  `plot_04_staatsvertrag_1955` staged the treaty without mentioning **Article 7**,
  which in one sentence guarantees the Slovene and Croatian minorities their
  language in school, in office and on the place-name signs — and which stayed
  contested for the next half century. The plot says so now. The Burgenland Croats
  are named in the prose but not linked, because what they write is not Standard
  Croatian and `hr_bur` does not exist yet.

  Serbia came along with them, because two of its personas linked Croatian across
  the culture boundary and the link had to move with the file. Five more castings:
  the `ocilo` goes to the plot where the Church keeps what the state cannot, and
  Ljubica, her `slava` and the `šljivovica` to the decade of sanctions — the one
  thing nobody took from her. Stefan is waived on the same ground as Ivan: the
  leaving happened after every plot.

  Twenty languages, 59 varieties, `0.18.0` → `0.20.0`.

- 3b0995d: Six Spanish autonomous communities come out finished: Andalusia, Aragon,
  Asturias, the Balearic Islands, the Canary Islands and Cantabria. Each takes its
  `es_` identifier, says for the first time that it is `una manera de ser
española, no un segundo pasaporte`, comes to zero dead Company entries, and
  hands its variety to the tongues package.

  Twenty-seven castings, and none of them needed an invented scene. The plots
  already named Manuel and Rocío at the Exposición, Javier and Piluca through both
  sieges of Zaragoza, Xuan and Covadonga in the gorge and again in the pits — in
  prose, with no link, which is exactly how a Company entry dies while the scene it
  belongs to is already written. Where a link was not enough the scene was still
  there: the cante jondo is the thing Manuel was already collecting; the ensaimada
  turns from a Sunday bake into a daily one in the plot about what tourism did to
  the island; the Posidonia count belongs to the decree that protects it; the
  silbo is how Ayose was already reaching the far side of the barranco.

  Six varieties migrate to `es/` and none of them needed a cut: all four chapters
  of each were already the office, and the two that name their region name it as
  their own subject rather than as a culture's institutions. Fifteen languages, 49
  varieties, version unchanged at `0.15.0`.

  Sub-national conformance: 69 outstanding, now 63.

- 0bf3f1c: Seven sub-national cultures take the identifier their parent's ISO code gives them: `de_baden_wuerttemberg`, `de_hamburg`, `de_saarland`, `us_ohio`, `us_pennsylvania`, `us_virginia`, `es_melilla`. The identifier becomes the package name after the split and an npm name is permanent, which is why the house is cleaning identifiers rather than patching them, and why `georgia_us` will become `us_georgia` when its turn comes. The registry ids move with the directories, so seven website URLs change; that break was accepted when the rule was written, since the website is to be rebuilt. Content is untouched: these seven paid their coverage, their nesting and their varieties in the batch before this one.
- c14db4d: The walk's second batch: six sub-national cultures come out finished. Baden-Württemberg, Hamburg, the Saarland, Ohio, Pennsylvania and Virginia each hand their language variety to `@chbrain/khai-cultures-tongues`, rewrite their links to package specifiers, come to zero dead Company entries, and say for the first time that they nest inside the culture above them. The clean identifiers follow in their own pull request, because a rename carrying content changes reads to the guard as a new culture, and only a pure rename is exempt. The castings are where the history already put them: the Kehrwoche in the Napoleonic reordering that reached down to the stairwell, the Fischmarkt at the end of every St. Pauli night, the Schwenker in what the Völklingen furnace left its workers, Harper in the Cleveland deindustrialisation made, and John as the last generation to hold the job the Homestead strike was about. Virginia's Sasha is waived: unlike the other two she carries no thread back to any event on the board. Seven varieties of 320 have landed.
- a460c84: Give the tongues package a directory per language under one root, which settles
  three things at once. khai's engine contract wants exactly one root and the
  twenty-three varieties were siblings with none among them, so the manifest was
  stuck naming one member of twenty-three; the root is now the office of holding a
  tongue at all, each language anchors beneath it, and each variety hangs from its
  own language. The version becomes the language count by the house's existing rule
  and its existing code, `countItems` over one directory per language and
  `deriveVersionFrom` to reconcile: `0.5.0` today, unmoved by a twenty-seventh German
  variety and moved by a sixth language. And the three thin varieties the Länder walk
  found were thin because they were spending their four chapters on the language
  itself; German, English and Spanish now have anchors to carry that, so a variety is
  free to say only what is its own. The 105 package specifiers in the cultures gain
  their language directory. The three English varieties, which had never carried a
  `declared:` name, carry one.
- bdeb2bb: The tongues walk begins: Tarifit leaves Melilla for `@chbrain/khai-cultures-tongues`, and the five links that reach it become package specifiers, resolved through a declared dependency and failing closed without one. Melilla pays the ratchet in the same pass: el día de la ciudad is cast in the 1497 taking it commemorates, el paso de Beni Enzar in the 1986 citizenship fight, where the condition of being a foreigner in your own city was enforced most concretely at the crossing, and Alba is waived as born after every event the play stages. The tongues package is private and owes the composite ceremony before it can publish. One variety of 320.
- 517a98c: Wienerisch becomes its own tongue. Grete and Lukas both said they spoke
  _Wienerisch_ and then linked `position_language_de_at.md`, the Austrian
  **standard** — the same fault Bavaria's and Berlin's files had before Bairisch
  and Berlinisch were split out of them.

  The rule that earns it a file is the **Wiener Monophthongierung**: where rural
  Middle Bavarian keeps the diphthong, Vienna has a long `a`. `oans zwoa drei`
  against `ans zwa drei`, `Stoa` against `Staa`, `hoaß` against `haaß` — clean in
  both directions, running through every word that carries the vowel, and the
  whole Viennese dialect literature is written with it. Its second layer is
  lexical and belongs to no other Bairisch: `Powidl`, `Buchtln`, `Kolatschn` from
  Czech, `Beisl` and `Hawara` from Yiddish, `Fiaker` and `Trafik` from further
  off — the words the city drew in because the monarchy came to it.

  Research came back mid-PR and corrected three things before it merged. The
  monophthongisation is **variable and socially stratified, not categorical** —
  present when a speaker goes broad, receding when they pull in, and the same
  person does it both ways inside one conversation. It is _not_ a youth recession:
  younger Viennese still produce the forms. So `Orders` no longer demands the
  vowel; it demands that you know what the vowel says about you. The lexical claim
  was an exclusivity claim and exclusivity is wrong — `Powidl`, `Beisl`, `Tschick`,
  `Hawara`, `Trafik`, `Häferl`, `Gschropp` are Austrian or wider Habsburg-contact
  vocabulary, dense in Vienna but not Vienna's alone; only `Fiaker` is safely
  Vienna-specific. The file now says so itself, and says what the real distinction
  is: not that the city has words the countryside lacks, but that all of them
  arrived in one place at once. And the rule covers both diphthongs, so `Haus` →
  `Håås` was added.

  Deliberately not claimed: the l-vocalisation (`Goid`, `Woid`, `Soiz`), which is
  Middle Bavarian and which `bar_mitt` already holds; the `-erl` diminutive, which
  is `de_at`'s; and `es`/`enk`, which is the `bar` anchor's. The Meidlinger L is
  named and explicitly not claimed, because a difference that is only sound cannot
  carry a text file.

  Writing it turned up an error in a shipped file. `bar_mitt` claimed Munich and
  Vienna spoke `dieselbe Sortn` and gave both the `oa`, which is wrong about
  Vienna. It now says the eastern end takes that `oa` one step further to the long
  `a`, so the two files agree and the correction sits where the mistake was.

  Austria also stops staging one tongue. Its culture-position now says what the
  country actually speaks — Bairisch below the standard, Viennese in the capital,
  and Alemannic west of the Arlberg, so the country's larger language border runs
  through it rather than around it — and the play's Company casts all three.
  `gsw` was already in the package; Austria simply never cast it.

## 0.290.0

### Minor Changes

- aa665c6: Add Ceuta (ISO ES-CE) and Melilla (ISO ES-ML) as khai cultures, written in Spanish, completing Spain's autonomous cities alongside its seventeen communities. Ceuta: the Portuguese conquest of 1415, the thirty-year siege, and the 1995 statute; Antonio the stevedore and Nadia the heritage officer; the Strait, the four cultures, Ceutan culture and Ceutan Spanish; Monte Hacho and the Royal Walls; the porteo through the Tarajal and the round of the four festive calendars; the Caliphal Gate and the border fence. Melilla: the taking of 1497, the Wolf Ravine of 1909 that paid for the modernist quarter, and the 1986 citizenship fight; Dris the jeweller and Alba the restoration surveyor; the Amazigh root, the garrison town, Melillan culture, Melillan Spanish and Tarifit (the Riffian tongue of the city's homes, written in Tarifit and registered as `rif` for assisted verification, prose flagged for native review); Old Melilla and the ensanche; the crossing at Beni Enzar and the 17 September commemoration; the identity card and the modernist stained glass. Two new cultures: the minor version bumps to the new culture count.

### Patch Changes

- a30e27d: Give Germany its road, its car and the argument it never settled. The Autobahn lands as a place, with the Reichsautobahn myth in its Withheld (Weimar planning, the 1932 Cologne to Bonn road opened by mayor Adenauer, propaganda that took finished plans, forced labour in the war) and the deflation that much of the network is limited anyway. The car lands as a piece, from the Wolfsburg works of 1938 through the Käfer to the collision with the Energiewende, and by way of the Trabant that Elke waited thirteen years for. Between the economic miracle and the fall of the Wall a fourth plot now sits: the car-free Sundays of 1973, the temporary limit that lapsed, and the advisory Richtgeschwindigkeit of 1978, the one rule a rule-keeping country declined to make binding. The Mauerfall plot renumbers to plot_05. Existing content, no new culture: a patch.
- c568362: Germany stages what it did. The play carried the whole memory apparatus, the Stolpersteine, the Erinnern process, the Erinnerungskultur plan, an Arc naming the catastrophe and Stakes resting on the memory of guilt, and staged no plot between 1871 and 1949: the only culture in the house that staged its remorse without staging its crime. A third plot now sits where it belongs, Machtübernahme und Zivilisationsbruch 1933 bis 1945: the legal appointment and the Enabling Act passed by a majority of the elected Reichstag, the administration turned into an instrument of exclusion and deportation, the war, the murder of six million Jews and of millions of Sinti and Roma, disabled people, prisoners of war, forced labourers and the persecuted, and the Tension that they were neighbours and colleagues and not strangers. The later plots renumber to 04, 05 and 06. Germany also comes out at zero under the new coverage ratchet: der Meister and Pünktlichkeit are cast in the Reichsgründung where the Kaiserreich actually put them, Mülltrennung in the environmental awareness that grew out of 1973, and the Stolpersteine and Erinnern in the new plot's Tension; Jonas is waived, born after the last plot. Existing content, no new culture: a patch.

## 0.288.1

### Patch Changes

- 4f89f65: Migrate the house to the current kit and give 54 elements their own names.

  The kit moves to khai-tests `^0.2.8`, khai-arch `^0.1.25`, khai-guard `^0.1.24`,
  khai-language `^0.1.23`, khai-review `^0.1.4` and both content engines `^0.1.5`.
  The lockfile, not the ranges, was holding the house back. `registry.json` is
  rebuilt and gains the `members[]` casting catalog khai-tests 0.2.3 ships.

  khai-tests 0.2.2 added the `titleCollisions` wall, and it found 54 places in 50
  cultures where two elements of different kinds carried one display title: a
  persona and the plot about them, a place and the stance named after it, a pitch
  and the language it was keyed to. Each of those was one name doing two jobs, so
  each now has its own, taken from the culture's own words wherever the file
  already supplied them -- Czechia's burning is `kostnická hranice` and not a
  second `Jan Hus`, Austria's plot is `die Zeit ihrer Herrschaft` as its own
  persona already called it, Malta's is `id-Domanda tal-Ilsien`. Where the house
  had a convention the name follows it: an English culture-position is
  `<Demonym> culture`, and a pitch names the tone rather than the language, as
  Solomon Islands already did.

  Also repairs a CHANGELOG heading that documented a version which never shipped.
  The 11 July release wrote `## 0.289.0` while `registry build` reconciled the
  manifest to the culture count at `0.288.0`, and the heal that catches this only
  arrived in khai-tests 0.2.4. The reconcile cannot repair it after the fact --
  the heal is gated on the build actually moving the version -- so the heading is
  set to the version that did ship.

- e47ab46: Give Palau's pitch its own name. It declared `tekoi er a Belau` while the
  language position declared `a tekoi er a Belau` — the same name one article
  apart, which is what the six Pacific pitches corrected in the kit migration were
  doing, sitting just under the `titleCollisions` wall rather than tripping it.

  The pitch now declares `melekoi el oba a omengull`, speaking with respect, which
  is what its own Tenor says Palauans do; the language position keeps the language.
  That is the shape Solomon Islands already had, `tok blong Solomon` against
  `Pijin`. The play's Company listed the pitch under the position's form, so that
  citation moves with it.

## 0.288.0

### Minor Changes

- a22e653: Add the Faroe Islands (Foroyar) as a khai culture (ISO FO), written in Faroese (fo, registered for assisted verification, prose flagged for native review). A North Atlantic archipelago that made a nation of its language and its sea: plots (the Norse settlement and the Logting, the language awakening, the wartime occupation and home rule), personas (the skipper and the young Faroese in generational tension, with Trondur i Gotu of the sagas, V.U. Hammershaimb who gave Faroese its written form, and Nolsoyar Pall the national forerunner), positions (Foroyingur the culture-position, Havid the sea, and Foroyskt mal the language), places (Torshavn, the villages), processes (the chain dance, the grind - written neutrally), and pieces (the grass roof, the wool sweater). A new culture: the minor version bumps to the new culture count.
- 6470670: Add Hong Kong as a khai culture (ISO HK). A barren rock turned into the harbour where East meets West, staged with its full cast: the plots (the cession and free port, the refugees and factories, the 1997 handover, the contested autonomy), personas (the refugee industrialist and the young Hongkonger in generational tension, with Bruce Lee, Louis Cha/Jin Yong, Anita Mui, and the last governor Chris Patten), positions (the Hongkonger culture-position, the Lion Rock spirit, one country two systems, the entrepot, and the languages Cantonese and Hong Kong English), places (Victoria Harbour, Kowloon), processes (yum cha, the races), and pieces (the Star Ferry, the neon signs). Also re-homes the dangling Cantonese link: canada/jun's heritage Cantonese now links Hong Kong's Cantonese position. A new culture: the minor version bumps to the new culture count.

### Patch Changes

- a76d8d7: Culture-position coverage: wire the last two personas to a culture-position. moldova/elena holds la moldovenitate (her hold was dropped in the #339/#340 merge); bahrain/bibby, an English archaeologist cast into Bahrain, holds British culture cross-culture (../united_kingdom/position_culture_britishness.md) as his own. Every persona house-wide (1155/1155) now carries a culture-position. Enrichment; culture count and version unchanged.
- c33ba4d: Culture-position pass: every culture owns one canonical culture-position named position_culture_<slug>.md, the culture-as-a-whole driving whoever is raised in it - the same Has/Orders/Loses/Drives frame as position_language, but the culture's story. Where a whole-culture anchor already existed it is renamed to the convention and its holders repointed (germany: position_deutsche_kultur -> position_culture_deutsche_kultur); where none existed one is authored, in the culture's own language, persona-free (one-way rule), and wired to its personas so nothing orphans. Enrichment of existing cultures; culture count and version unchanged.
- 20d1872: De-personalize position files: a position never links or names a persona (the direction
  is one-way — a persona links its position, never the reverse). Rewrite ## Drives (and any
  section that named holders) to describe what the position drives — its force and effect —
  regardless of who holds it, keeping the impact but dropping every persona link and name.
  House-wide convention fix across all position_*.md.
- 0dea136: Language positions: variety standard + pilot. A language position is a variety,
  named `position_language_<bcp47>.md` (the locale: `language:` ISO 639 subtag +
  `geo.json` region, lowercased, hyphens as underscores — `de_de`, `de_ch`,
  `en_us`; monocentric tongues bare — `rm`, `hu`), written in its own tongue and
  owned by the culture whose personas natively hold it. Every persona marks each
  tongue it uses on any channel twice: the `process_*` ladder leaf and the
  variety's position; foreign tongues link cross-culture by path to the exact
  variety in its home culture. Pilot: Switzerland split into `de_ch`/`fr_ch`/
  `it_ch`/`rm` (all seven personas re-linked at their channels), France `fr_fr`,
  Germany renamed to `de_de` (all refs incl. Bavaria and groups/DACH repointed),
  and Adenauer's negotiated French wired cross-culture to `../france/
position_language_fr_fr.md`. Standard in `REFERENCES.md` and the language-engine
  design of record §2.6; Pass-A manifest (304 own-variety positions) recorded.
- 52320c6: Pass A wave 2: own-variety language positions for 22 monolingual national
  cultures (japan, poland, hungary, czechia, slovakia, slovenia, croatia,
  serbia, bulgaria, romania, greece, ukraine, russia, lithuania, latvia,
  estonia, iceland, denmark, norway, sweden, netherlands, portugal). Each owns
  one position_language_<locale>.md, written in its tongue and wired to every
  holder persona's Projection + the play Positions list; ad-hoc language
  positions migrated to locale codes. Enrichment; culture count unchanged.
- 31470c4: Pass A: own-variety language positions across the cultures. Each culture gains
  one `position_language_<locale>.md` per variety its personas natively hold,
  written in that tongue, wired to every holder's `## Projection` and the play's
  Positions list; ad-hoc language positions migrated to locale codes. Enrichment
  of existing cultures (no new culture); the culture count and version are
  unchanged.
- 4d047d7: Pass B: cross-culture foreign-use language links. Each persona's foreign tongues
  (spoken, read, heard) link cross-culture by relative path to the exact variety in that
  tongue's home culture. Wave 1: 12 cultures, 47 personas. Enrichment of existing
  cultures; culture count and version unchanged.
- f0f1a0d: Pass B tail: cross-culture foreign-use language links for the remaining cultures. Each persona's foreign tongues (spoken, read, heard) link cross-culture by relative path to the exact variety in that tongue's home culture; own co-official tongues stay bare Pass-A links. Positions are never touched (one-way rule: persona links position, never the reverse). Enrichment of existing cultures; culture count and version unchanged.
- 15aa66a: Pass B waves 3-4: cross-culture foreign-use links for 59 cultures (multilingual
  states, post-colonial Africa/Asia, Latin America, Middle East, Balkans, Francophone
  Africa, Asia/Pacific, Americas). Each persona's foreign tongues linked to the exact
  variety in that tongue's home culture; the recurring classical tongues (Quranic
  Arabic, Persian, Church Slavonic, Classical Chinese) routed to their custodians.
  Enrichment of existing content; culture count unchanged.
- 9cb60b8: Re-voice the templated cultures from inside (order: voice from inside): hygiene fixes, US states, Spanish communities, German Länder, twins, Bhutan.

## 0.287.0

### Minor Changes

- c03cf08: Add the missing Wave 9 United States subdivisions as full cultures: Idaho (US-ID), Mississippi (US-MS), Nebraska (US-NE), New Hampshire (US-NH), and Rhode Island (US-RI). Each is staged as a complete play with its own plots, personas, places, pieces, positions, processes, and plan.
- 3ea4e69: Stage Wave 1 of Spain subdivisions (autonomous communities) as full cultures: Catalonia (ES-CT), Basque Country (ES-PV), Galicia (ES-GA), and Andalusia (ES-AN). Each is configured as an independent play with regional plots, personas, places, pieces, positions, processes, and an operational plan.
- 4f4cba3: Stage Wave 2 of Spain subdivisions (autonomous communities) as full cultures: Madrid (ES-MD), Valencian Community (ES-VC), Aragon (ES-AR), and Canary Islands (ES-CN). Each is configured as an independent play with regional plots, personas, places, pieces, positions, processes, and an operational plan.
- e9c1c7a: Stage Wave 3 of Spain subdivisions (autonomous communities) as full cultures: Castile and León (ES-CL), Castilla–La Mancha (ES-CM), Balearic Islands (ES-IB), and Extremadura (ES-EX). Each is configured as an independent play with regional plots, personas, places, pieces, positions, processes, and an operational plan.
- fd2a6ca: Stage Wave 4 of Spain subdivisions (autonomous communities) as full cultures: Asturias (ES-AS), Cantabria (ES-CB), Navarre (ES-NC), La Rioja (ES-RI), and Murcia (ES-MC). Each is configured as an independent play with regional plots, personas, places, pieces, positions, processes, and an operational plan.

## 0.265.0

### Minor Changes

- e68e23e: Add the first wave of United States subdivisions as full cultures: California (US-CA), New York (US-NY), and Texas (US-TX). Each is staged as a complete play with its own plots, personas, places, pieces, positions, processes, and plan.
- f0509f7: Add the tenth wave of United States subdivisions as full cultures: Arkansas (US-AR), Delaware (US-DE), Iowa (US-IA), Montana (US-MT), and North Dakota (US-ND). Each is staged as a complete play with its own plots, personas, places, pieces, positions, processes, and plan.
- b497bca: Add the eleventh and final wave of United States subdivisions as full cultures: South Dakota (US-SD), Vermont (US-VT), and Wyoming (US-WY). Each is staged as a complete play with its own plots, personas, places, pieces, positions, processes, and plan.
- 05627cb: Add the second wave of United States subdivisions as full cultures: Florida (US-FL), Illinois (US-IL), Massachusetts (US-MA), Pennsylvania (US-PA), and Washington, D.C. (US-DC). Each is staged as a complete play with its own plots, personas, places, pieces, positions, processes, and plan.
- 69f3306: Add the third wave of United States subdivisions as full cultures: Georgia (US-GA), Louisiana (US-LA), Ohio (US-OH), Virginia (US-VA), and Washington (US-WA). Each is staged as a complete play with its own plots, personas, places, pieces, positions, processes, and plan.
- fa84038: Add the fourth wave of United States subdivisions as full cultures: Colorado (US-CO), Hawaii (US-HI), Michigan (US-MI), North Carolina (US-NC), and Oregon (US-OR). Each is staged as a complete play with its own plots, personas, places, pieces, positions, processes, and plan.
- 724afe4: Add the fifth wave of United States subdivisions as full cultures: New Jersey (US-NJ), Arizona (US-AZ), Tennessee (US-TN), Wisconsin (US-WI), and Minnesota (US-MN). Each is staged as a complete play with its own plots, personas, places, pieces, positions, processes, and plan.
- f4d94b0: Add the sixth wave of United States subdivisions as full cultures: Maryland (US-MD), Indiana (US-IN), Missouri (US-MO), Alabama (US-AL), and South Carolina (US-SC). Each is staged as a complete play with its own plots, personas, places, pieces, positions, processes, and plan.
- 00f8e8d: Add the seventh wave of United States subdivisions as full cultures: Kentucky (US-KY), Utah (US-UT), Nevada (US-NV), Connecticut (US-CT), and Oklahoma (US-OK). Each is staged as a complete play with its own plots, personas, places, pieces, positions, processes, and plan.
- 17d040e: Add the eighth wave of United States subdivisions as full cultures: Alaska (US-AK), New Mexico (US-NM), Maine (US-ME), Kansas (US-KS), and West Virginia (US-WV). Each is staged as a complete play with its own plots, personas, places, pieces, positions, processes, and plan.

### Patch Changes

- dc2204c: Add the ASEAN group: the Association of Southeast Asian Nations, all eleven member states from the five founders of the 1967 Bangkok Declaration to Timor-Leste, admitted in October 2025 as the first enlargement since 1999. A referencing play (no geo, no pitch) whose membership the registry build derives from its casts, listing every member with its year of entry. Like NATO and the EU, its four plots trace the association's growth and change rather than a single event: the Bangkok Declaration (the 1967 founding by five neighbours fresh from confrontation), From Five to Ten (Brunei in 1984, then Vietnam, Laos, Myanmar, and Cambodia across the old Cold War line), the ASEAN Way Tested (the 1997 financial crisis, the 2007 Charter, and Myanmar since 2021), and the Eleventh Chair (Timor-Leste's accession, the ASEAN Economic Community, and ASEAN centrality). A referencing collection; it does not move the culture count, so it ships at the same count with a patch changeset.
- 93003fe: Add the Francophonie group: the French-speaking world, the twenty-nine states on five continents that hold French as an official language, from France and its European neighbours through Canada and Haiti to the great Francophone Africa and Vanuatu. Authored in French (a single-language group, like the Hispanidad in Spanish and the Lusophone World in Portuguese). The cut is the language, not the institution: the OIF (whose full members since 2024 include states without official French, and which Mali, Burkina Faso, and Niger left in 2025 while keeping the language) is staged in the plots as the institutional circle, not in the Company. Its four plots trace the family's growth: la langue du roi (Villers-Cotterets, the Academie, and the first circle of neighbours), la traversee des oceans (New France and the survivance; Saint-Domingue and Haiti's 1804 republic), l'empire et les independances (the French and Belgian empires staged soberly, and the year 1960), and le basculement africain (Niamey 1970, the African majority of speakers, Kinshasa as the largest Francophone city, and the 2025 Sahel rupture). A referencing collection; it does not move the culture count, so it ships at the same count with a patch changeset.

## 0.219.0

### Minor Changes

- e620358: Add Andorra as a khai culture.
- d0861ca: Add Bavaria (Bayern) as a khai culture.
- 9b2828e: Add Berlin, Bremen, and Hamburg as German state khai cultures.
- 21c73df: stage Batch 2 of German states: Baden-Württemberg, Hesse, Lower Saxony, North Rhine-Westphalia, Rhineland-Palatinate, and Saarland in German.
- 266c8ae: Add Greenland (Kalaallit Nunaat) as a khai culture.
- 9264968: Add Liechtenstein as a khai culture.
- b38aa0c: Add Holy See, Kosovo, Monaco, and San Marino as khai cultures.

### Patch Changes

- f829d9d: Bump @chbrain/khai-language to ^0.1.21 to restore the native creole support and Mauritian Creole exemption.

## 0.162.1

### Patch Changes

- 4b73861: Bump @chbrain/khai-language to ^0.1.21 and add Mauritian Creole (mfe) to the khai.languages exempt list, to unblock the Indian Ocean region. 0.1.21 registers Seychellois Creole / Seselwa (crs) in the detector itself (French-lexified but tops cleanly, French well back), so Seychelles gates natively. Its sister creole, Mauritian Morisien (mfe), has no franc model, so it takes the NLP-fallback exempt path instead (the same treatment as Amharic) rather than detector registration. Together these let Mauritius and Seychelles be authored in their true mother-tongue creoles. A dependency-and-config update with no content change and no culture count change; the existing cultures still validate.

## 0.160.1

### Patch Changes

- a983938: Add Amharic (am) to the khai.languages exempt list, so a culture authored in Amharic validates through the NLP fallback rather than the franc detector. This is deliberate and permanent, not a stopgap: Amharic and Tigrinya are close Ge'ez-script siblings, and franc is biased toward Tigrinya, so canonical Amharic prose (for example UDHR Article 1) reads as Tigrinya beyond the detector's margin and would false-fail if registered. The khai-language detector already documents this decision (Amharic left exempt because it false-fails to Tigrinya); the exempt entry is the correct treatment, mirroring Cape Verdean Kriolu. This unblocks staging Ethiopia in the Horn and East Africa region. No content change and no culture count change; the existing cultures still validate.

## 0.158.1

### Patch Changes

- c958f01: Bump @chbrain/khai-language to ^0.1.14, which registers the East and Southeast Asian languages (Chinese, Japanese, Korean, Vietnamese, Thai, Khmer, Lao, Burmese, and Tibetan) and adds handling for scriptio-continua scripts, the writing systems that do not delimit words with spaces (Han, Japanese kana, Thai, Lao, Khmer, Myanmar, and Tibetan), measuring paragraph span length in characters rather than whitespace tokens so their prose validates correctly. This unblocks staging the East and Southeast Asian nations, the next region. A dependency update with no content change; the existing cultures still validate, so it ships at the same culture count.
- 660a0cf: Bump @chbrain/khai-language to ^0.1.15, which registers a set of South Asian, Central Asian, and Middle Eastern languages (Marathi, Kannada, Malayalam, Hebrew, Pashto, Kyrgyz, Tajik, Turkmen, and Azerbaijani, among others) and extends the scriptio-continua handling to the Indic scripts (Devanagari, Bengali, Gurmukhi, Gujarati, Oriya, Tamil, Telugu, Kannada, Malayalam, and Sinhala), measuring paragraph span length in characters rather than whitespace tokens so their prose validates correctly. This unblocks staging the South Asian, Central Asian, and Middle Eastern nations, the next region. A dependency update with no content change; the existing cultures still validate, so it ships at the same culture count.
- 1b120fb: Bump @chbrain/khai-language to ^0.1.17, which registers the languages of the Caucasus (Georgian and Armenian) and a broad set of African languages (Tigrinya, Oromo, Yoruba, Wolof, Bambara, Twi, Kinyarwanda, Shona, Sesotho, Luganda, Lingala, and Malagasy, among others), and adds Ethiopic to the scriptio-continua script handling. This unblocks staging Georgia and Armenia (previously deferred) and the nations of Africa, the next regions. A dependency update with no content change; the existing cultures still validate, so it ships at the same culture count.
- 6f43e57: Bump @chbrain/khai-language to ^0.1.20, which registers the West African creoles and lingua francas in the detector itself: Guinea-Bissau Kriol (pov), Krio (kri), and Nigerian Pidgin (pcm), so a culture authored with one of those as its base code now gates natively rather than needing a project-side exempt entry. The frontmatter exempt list (`khai.languages`) and the detector registrations are complementary: the bump removes future friction for the African and creole-speaking regions without requiring any change here today, since the cultures shipped so far author creoles as prose flavour over a detector-known base (en/fr/pt/nl). A dependency update with no content change; the existing cultures still validate, so it ships at the same culture count.
- c3a4e10: Revise eight Caribbean English-language cultures into their authentic national varieties (show, not tell), embedding real island idiom, lilt, and proverbs into the prose while keeping Caribbean Standard English as the matrix (still reads as English), and giving each small island a distinct voice instead of an interchangeable template: Saint Kitts and Nevis (Kittitian-Nevisian creole, the two-sister banter, Culturama/Sugar Mas), Belize (Belizean Kriol, fi we / all a we, and the Kriol-Maya-Mestizo-Garifuna plurality made to sound), Saint Vincent and the Grenadines (Vincy idiom, the Bequia seafaring/whaling register, Nine Mornings), Saint Lucia (Kweyol warmed into English, the Pitons, the two flower societies, the two Nobel laureates), Grenada (Grenadian rhythm, the Spice Isle made sensory, jab jab and oil-down, Carriacou Big Drum), Dominica (Kweyol proverbs, the Nature Isle, the Kalinago Territory), Antigua and Barbuda (Antiguan creole, Wadadli, Moko Jumbie, the Master Blaster, Barbuda's distinct life), and Barbados (Bajan creole and the dry wit shown, cou-cou and flying fish, tuk band and the Landship). Content-only revisions; no change to the culture count.
- a52ceea: Revise five English-language cultures into their authentic national/regional varieties (show, not tell): Canada (consistent Canadian spelling and register: toque, double-double, the two solitudes, the reflexive sorry; the French-bodied Quebec files left as-is), Ireland (Hiberno-English syntax: the after-perfect, sure, would you ever, your man, above in Dublin; the Irish-language persona left as-is), USA (American idiom woven into the connective prose, not just the furniture: fair shake, go for broke, bootstraps, no free lunch), Singapore (Singlish enacted where the local voice speaks: can lah, where got, chope, shiok, the kopi order, kept over a Standard English matrix), and Micronesia (a warm Pacific-island English lilt, island time, the sakau circle, the four states kept distinct). Content-only revisions; no change to the culture count.
- e740299: De-template the four Gulf Arabic pitches so each is unmistakably its own and not interchangeable: the audit found the Khaleeji pitches shared a near-identical Tenor opener and a near-cloned Nerve sentence (Kuwait and Bahrain the most alike). Each pitch_ar.md is rewritten to drop the shared frame and stand on the nation's distinctive identity: Kuwait (the merchant town and the boom dhow, the great pearling voyage, the diwaniya, the nahham, Failaka), Bahrain (the land of the two seas and the sweet spring under salt, five-thousand-year Dilmun and the burial mounds, the finest pearls, fann al-sawt), Qatar (the peninsula and falconry, Nabati poetry and the majlis of poets, sadu, Al Zubarah, from pearl to today), and the United Arab Emirates (the union of the seven and Zayed, the ghaus and Liwa, the falcon and Arabian horse). Content-only revisions (each touches only its pitch); no change to the culture count.
- 675ccf4: Revise five more cultures into their authentic national varieties: Austria (restore the eszett ss that the culture wrongly wrote in the Swiss convention; Austrian Standard German uses gross as grosse->grosse... i.e. grosse->grosze where a long vowel requires it, plus the Austrian lexicon kept), Belgium (Belgian French: septante and nonante, la drache nationale, un kot, une fois, chicon, abbey beers, the zwanze performed; the Dutch-language personas left as-is), Brazil (Brazilian Portuguese cadence: the progressive gerund vai virando / foi se modernizando replacing the European esta a fazer, voce/a gente register, everyday BP lexicon), Suriname (Surinaams-Nederlands with tasteful Sranan Tongo woven into a Dutch matrix: fa waka, a no span, switi, sma, the multi-ethnic nation made oral), and Afghanistan (Dari/Kabuli Persian diction distinct from Iranian Persian: watan, qafila, kalan, famidan, gap zadan, the warmer Khorasani cadence). Content-only revisions; no change to the culture count.
- 3042a73: Revise six Spanish-language cultures into their authentic national varieties, moving the distinctive idiom and the correct address forms out of the pitch glossary and into the prose bodies (show, not tell): Chile (chilenismos: al tiro, ya po, harto, lueguito), Nicaragua (voseo + the singsong burlon wit, maje, ideay, dale pues, pinolero), Guatemala (the real usted/vos/tu tripartite system and chapin softeners like fijese que, replacing prose that had erased Guatemalan voseo), Honduras (catracho voseo and pisto/tuanis, differentiated from El Salvador), Dominican Republic (que lo que as a live greeting, tiguere, chin, vaina, colmado; also fixes a typo tongo to tono), and Uruguay (rioplatense voseo throughout, fixing two files that wrongly used tu address for the egalitarian point). Content-only revisions to existing cultures; no change to the culture count.
- d0acae4: Revise eleven more Spanish-language cultures into their authentic national varieties (show, not tell), moving idiom and the correct address forms into the prose: Mexico (nomas, ni modo, sale, la calaca, courteous indirectness), Cuba (asere, que bola, choteo, el invento), Peru (chamba, jato, al toque, ayni/Pachamama, de todas las sangres), Bolivia (paceno pues/pe, wawa, casera, the Aymara/Quechua presence), Ecuador (serrano usted, guambra, nano, de ley, sierra/costa), Argentina (rioplatense voseo, che, lunfardo), Colombia (ustedeo, diminutives like tintico/momentico, a la orden, de una), Venezuela (chevere, pana, chamo, que mas, the parranda warmth), Panama (que xopa, fren, juega vivo; plus restores the n-tilde in panameno -> panameno with tilde), El Salvador (guanaco voseo, cipote, chero, pisto), and Paraguay (jopara: Guarani woven into a Spanish matrix, plus voseo). Content-only revisions to existing cultures; no change to the culture count.

## 0.94.1

### Patch Changes

- 9c5dda4: Add the Anglosphere group: the five core English-speaking nations and the Five Eyes circle - the United Kingdom, the United States, Canada, Australia, and New Zealand - now that all five are staged. A referencing play (no geo, no pitch) whose membership the registry build derives from its casts. Like NATO and the EU, its four plots trace the family's growth and change rather than a single event: the English Seed (the spread of the language and the common law, and the American break of 1776), the Dominions (Canada, Australia, and New Zealand grown to nationhood under a shared Crown), the Wars and the Special Relationship, and the Five Eyes (the UKUSA agreement grown into the deepest intelligence alliance in history). Referencing collections do not move the culture count, so this ships at the same count.
- e1ff2e5: Add the CARICOM group: the fourteen-member Caribbean Community, small states bound by a plantation past and a shared future across islands and the South American mainland. A referencing collection; it does not move the culture count, so it ships at the same count with a patch changeset.
- 9315091: Add the Central America group: the SICA isthmus bloc, the seven Central American states and the Dominican Republic, from the Maya world to a system of integration. A referencing collection; it does not move the culture count, so it ships at the same count with a patch changeset.
- e748c05: Add four khai groups over existing cultures: Benelux (Belgium, the Netherlands, Luxembourg), the Visegrad Four (Poland, Czechia, Slovakia, Hungary), the Baltics (Estonia, Latvia, Lithuania), and Iberia (Spain, Portugal). Each is a referencing play (no geo, no pitch) whose membership the registry build derives from its casts, and each carries one shared cross-culture plot: the Benelux customs union, the 1991 Visegrad Declaration, the 1989 Baltic Way, and the 1494 Treaty of Tordesillas. Referencing collections do not move the culture count, so this ships at the same count.
- 18b0201: Add the European Union group: all twenty-seven member states, completed now that Cyprus and Malta are staged. A referencing play (no geo, no pitch) whose membership the registry build derives from its casts, listing every member with its accession year. Like NATO, its four plots trace the EU's growth and change rather than a single event: the Treaty of Rome (1957), the Widening (1973-1995), Maastricht and the euro, and the Big Bang and the Strains (the eastward enlargement to twenty-eight, the crises, and Brexit back to twenty-seven). Referencing collections do not move the culture count, so this ships at the same count.
- e29f476: Add the Hispanidad group: the Spanish-speaking world, Spain and eighteen American republics bound by one tongue across an ocean. Authored in Spanish (a single-language group, like DACH in German). A referencing collection; it does not move the culture count, so it ships at the same count with a patch changeset.
- ada386e: Bump @chbrain/khai-language to ^0.1.10. The update extends the language registry, registering Belarusian (be) and Bosnian (bs) among others, which unblocks staging those cultures. A dependency update with no content change; the existing cultures still validate, so it ships at the same culture count.
- 0afe5e2: Bump @chbrain/khai-language to ^0.1.11, which registers Maltese (mt) among others. This unblocks staging Malta, the last unstaged EU member, and so makes a complete 27-member European Union group possible. A dependency update with no content change; the existing cultures still validate, so it ships at the same culture count.
- b827b08: Bump @chbrain/khai-language to ^0.1.12, which registers Haitian Creole (ht) among others. This unblocks staging Haiti, whose prose is authored in Kreyol ayisyen, and so makes a complete Caribbean (and ultimately a complete Americas) possible. A dependency update with no content change; the existing cultures still validate, so it ships at the same culture count.
- 680f044: Bump @chbrain/khai-language to ^0.1.13, which registers a set of Pacific and Oceanian languages (Tok Pisin, Bislama, Pijin, Chamorro, Tahitian, Marshallese, and Palauan, among others). This unblocks staging the Pacific island nations, the next region. A dependency update with no content change; the existing cultures still validate, so it ships at the same culture count.
- 8602851: Add the Latin America group: the twenty Iberian-and-French American nations bound by Latin tongues, faith, and mestizaje. A referencing collection over existing cultures; it does not move the culture count, so it ships at the same count with a patch changeset.
- 1a3eadf: Add the Lusophone World group: Portugal and Brazil, the Atlantic core of the Portuguese-speaking world. Authored in Portuguese (a single-language group, like DACH in German). A referencing collection; it does not move the culture count, so it ships at the same count with a patch changeset.
- c52cfd7: Add the Mercosur group: the Southern Common Market of the Southern Cone, born of rivals reconciled into a river-basin union. A referencing collection; it does not move the culture count, so it ships at the same count with a patch changeset.
- b71e92b: Add the NATO group: the transatlantic alliance of all thirty-two members, the largest group in the house. A referencing play (no geo, no pitch) whose membership the registry build derives from its casts, listing every ally with its accession year. Unlike the other groups, its four plots trace NATO's growth and change rather than a single event: the Founding (1949), the Cold War Line (the 1952-1982 enlargements), Out of Area or Out of Business (the post-1991 reinvention and the only Article 5 invocation after 9/11), and the Return East (the eastward enlargement and the 2023-2024 accession of Finland and Sweden). Referencing collections do not move the culture count, so this ships at the same count.
- 7856246: Register Gilbertese (gil), Tuvaluan (tvl), and Nauruan (nau) in the khai.languages exempt list. These three are absent from franc's 329-language model, so they cannot pass the deterministic gate (they mis-read as Maori/Samoan/Marshallese) and must ride the NLP-verification layer via the exempt path - the route documented in khai LANGUAGES.md. Adding them to the franc map would false-fail every paragraph of genuine native prose; the exempt list is the correct and only safe mechanism. This unblocks staging Kiribati, Tuvalu, and Nauru in their native tongues. Config-only change, no content; existing cultures still validate, same culture count.
- cd4a8c0: Switzerland: add the missing language-position, die Viersprachigkeit. As the house's most multilingual culture (German, French, Italian, Romansh, with the Menga-Gian Romansh proxy and the Schwiizerduetsch-Hochdeutsch diglossia), Switzerland was the one multilingual or shared-tongue culture without a position naming its language reality, where Belgium has la frontiere linguistique and Luxembourg le regime des langues. The new position holds the four national languages bound to their cantons, the Roestigraben, the territoriality principle, and the confederation held together by die Konkordanz rather than by a common tongue; it casts Dufour, Marco, Vreni, Menga and Gian, who already live it, and Marco's read is wired to it. A consistency fix to existing content, at the same culture count.
- e7e7b49: Add the Americas group: the OAS hemisphere of all thirty-five American states, from first peoples to republics. A referencing collection over existing cultures; it does not move the culture count, so it ships at the same count with a patch changeset.
- a6dd525: Add the Andes group: the four-nation Andean Community, heirs of the Inca along the great cordillera. Authored in Spanish (a single-language group, like DACH in German). A referencing collection; it does not move the culture count, so it ships at the same count with a patch changeset.

## 0.20.2

### Patch Changes

- b54d4aa: Update the @chbrain/khai-language toolchain dependency from 0.1.8 to 0.1.9. A dev-dependency bump only; no content change, so it ships at the same culture count. All conformance tests pass against the new version.

## 0.20.1

### Patch Changes

- fd7b01b: Move `@chbrain/khai-engine-language` from devDependencies to dependencies. The language engine is content the cultures embody (reads, language positions, proxy pairs), not a dev-only tool — and engine discovery scans `node_modules`, so it was already enforced and green while sitting in the wrong section. Promoting it to a runtime dependency makes npm's production tree the single source of truth for the engines a culture runs on (spine + language), so the zip bundler can derive the engine set from the dependency graph instead of a hardcoded list. Adds a conformance guard that fails if any `@chbrain/khai-engine-*` is stranded in devDependencies.

## 0.17.1

### Patch Changes

- c6208a7: Adopt the shared @chbrain/khai-engine-spine as a dependency - the Prose register the house runs on (everything is a Scene, played through Personas). The house authors no instructions copy of its own: the engine law is documented in REFERENCES.md and plumbed into Instructions at deploy by the Roadie, per the language engine's playwright wiring guide. Non-content; the culture count is unchanged.
- e7e6d92: Bring Austria up to the language-engine standard, add its German variety-position and a forward plan. The five defining personas now carry full per-channel reads under Projection, each showing the gap at the limit of its tongue: Freud (German written to give the soul its words, English exile carried, his own terms read back as id/ego/superego), Grete (Wienerisch whole, the world's English only caught, the bundesdeutsch she understands yet whose tone stays foreign), Lukas (Wienerisch with the Schmaeh, English worn and read all day, the Austrian variety thinning in the global English), Maria Theresia (German the ground over an empire whose tongues reach her only by interpreter and ear), and Metternich (German and a worn diplomatic French played to the room, the gap between said and meant his craft). A variety-position joins the cast, das oesterreichische Deutsch (Austrian Standard German and Wienerisch, its own norm of the same tongue, losing ground to the bundesdeutsch tide) - the counterpart to Germany's das deutschlaendische Deutsch. And one forward mandate, die oesterreichische Identitaet, the post-1945 project of an Austrian nation distinct from Germany, with the variety as a pillar. Content fix at the same culture count.
- 4c06d55: Add the first DACH cross-culture plot: die Orthographische Konferenz 1901. A group plot in the `groups/` referencing collection, anchored to play_dach, that casts all three member plays - Germany, Austria, and Switzerland - to stage the event that gave the German-speaking sphere a shared written tongue without a shared state: the Second Orthographic Conference in Berlin, Konrad Duden's unified spelling, adopted by Austria and Switzerland on their own terms. It picks up the through-line already in germany's position_deutsches_deutsch (Luther sows the page, the Duden codifies it) and carries it across the three. The plot's source is credited in the group REFERENCES. Groups are not counted, so the culture minor is unchanged.
- 727382c: Bring Denmark up to the language-engine standard and add its plans. The four defining personas now carry full per-channel reads under Projection, each showing the gap at the limit of its tongue: Grundtvig (the living word given to the whole folk in the mother tongue, Latin and German carried then turned from, the old Norse writings read to wake the past), Harald (the daner's tongue spoken and cut in runes on the Jelling stone, the Church's Latin only caught), Inger (Danish plain and low, Norwegian and Swedish followed almost as her own - skandinavisk - while the world's English stays on the doorstep), and Mads (Danish whole but English worn and read all day, the young tongue giving way to English at work and screen). Two forward mandates join the play's Company, neither re-telling a plot: folkeoplysningen (Grundtvig's folk-enlightenment, dannelse for all in the mother tongue) and velfaerdsstaten (the universal welfare model of trust and equality, carried by Janteloven). Content fix at the same culture count.
- 4b9897e: Bring England up to the language-engine standard, add its variety-position and one forward plan. The four personas now carry full per-channel reads, each showing the gap at the limit of its tongue: Dickens (English written to a nation's conscience, every class voice caught by ear and set on the page against the polite King's English), Edith (the received gentry voice, fluent above all in the unsaid, the gap of understatement), Henry VIII (the scholar-king's English made England's own, breaking Rome's Latin to set the English word over the altar), and Liam (the world's tongue his by birth, yet his broad northern vowels still placed below by the King's English at home). A variety-position joins the cast, the King's English (received pronunciation as the class shibboleth, the accent that opens doors, now softening), the English family's counterpart to Scots and yr iaith but turned inward on class. And one forward mandate, the world's tongue (the deliberate cultivation of English as the global lingua franca, and the irony that a tongue once spread belongs to everyone and no longer to England alone). Content fix at the same culture count.
- 7987076: Bring Finland up to the language-engine standard, add its bilingual proxy pair and a language plan. The four standing personas now carry full per-channel reads, each showing the gap at the limit of its tongue: Aino (Finnish whole and sparse, school Swedish forgotten and only caught, no shared tongue with the Swedish coast without a go-between), Eero (Finnish whole but English worn and read all day), Lonnrot (Finnish written to a literary tongue, the gentry's Swedish carried, the singers' Finnish heard in the villages and raised to a book), and Mannerheim (Swedish his mother tongue, Finnish learned and carried to serve a people not his own, the bridge who shares Swedish with the coast and Finnish with the nation). A proxy pair joins the cast: Solveig, a monolingual Aland Swedish-speaker who reaches the Finnish country only through Mannerheim, who carries her words into Finnish twice-worn. And one forward language-mandate, kaksikielisyys (the two national languages, Finnish and Swedish equal before the law, so the minority's voice carries without a single bridge). Content fix at the same culture count.
- 482b3b7: Bring France up to the language-engine standard and add its plans. The four defining personas now carry full per-channel reads under Projection, each showing the gap at the limit of its tongue: de Gaulle (French as the verb-weapon, English handled at arm's length while he demands the world hear France in French), Zola (French written to public force, the rigged dossier read to its flaw, his Italian father's tongue only caught), Colette (French whole and savoured, the world's English left on the threshold), and Yasmine (French held entire with every register, her parents' Arabic only caught and thinning in one generation, English carried for the grandes ecoles). Two language-themed plans join the play's Company: l'ecole republicaine (the free secular school that made French the common tongue, at the cost of the regional languages) and la defense de la langue francaise (the Academie, the loi Toubon, the Francophonie holding French as a living world language). Content fix at the same culture count.
- 4b18335: Enrich the Germany culture (rollout): full per-language, per-channel language reads on all six personas, the culture and its language variety both modelled as positions, and two plans.

  The identity hierarchy (new pattern): a persona holds its culture as a position and its language variety as a position, and the culture position links the variety. position_deutsche_kultur ("die deutsche Kultur") is held by all six personas (its Drives names them) and links its tongue, position_deutsches_deutsch ("das deutschländische Deutsch", German Standard German), which each persona also carries through its language read. So a persona reads as: belongs to a culture, which carries a variety, which the persona speaks - and a cross-culture encounter can read the friction off both.

  The reads put the loss at the edges of a largely monolingual tongue: Luther forges the page-as-standard and stands at the origin of the culture; Adenauer carries French and English as tools to anchor the republic in the West; Kohl must hear the Eastern German of 1990; Elke, born in the DDR, finds her Eastern idiom slipping out of the Western standard, the one culture in two lives; Jonas carries worn English as the global bridge while the depth stays in German.

  Two plans enrich the play: die Energiewende and die Erinnerungskultur. Non-count enrichment; version unchanged.

- 43b7507: Bring Iceland up to the language-engine standard and add its plan. The four defining personas now carry full per-channel reads under Projection, each showing the gap at the limit of its tongue: Snorri (Icelandic written to make the living tongue an immortal book, Latin carried but the vernacular chosen, so the nation still reads him eight centuries on), Jon Sigurdsson (the nation's cause pleaded in the king's Copenhagen on the Danish he carries, fighting in law and history for the right to his own tongue), Gudrun (Icelandic whole and plain, school Danish only caught and the world's English barely read), and Birna (Icelandic whole but English worn and read all day, the tongue thinning on screen despite all the language work). One forward language-mandate joins the play's Company, not a re-telling of any plot: malraektin (the deliberate purism and word-coining that keeps Icelandic so unchanged the nation still reads the sagas). Content fix at the same culture count.
- a1fa49c: Extend the design of record with the aligned communication model: the emergent resolution ladder (same variety; same language but different variety; the worn Business-English bridge; the proxy relay, twice-worn; silence), Business English as the worn width of English, the standing proxy rule for every multilingual culture, and language variety modelled as a position held and shared by a culture's personas (pitch reserved for the Hofstede tone). Cross-culture dialogue is recorded as a later groups workstream.
- 4ca4ae7: Record the design of record for deepening the language engine (full per-persona, per-channel language reads that enact the loss of culture at the limits of a tongue) and adopting the plan type in cultures, with the sequential per-culture rollout and the engine-law governance step. The Wales pilot (PR #41) lands against this document.
- 983cdd3: Add the management voice layer (the blueprint MANAGEMENT_CORE and the house cast:
  Hofstede, Minkov, Hall) so the Cultures house carries the same company as the
  plays houses; scope the canon test to the content collections and check the
  management cast is complete. Align the governance docs: the management-order
  rider in CLAUDE.md, and rename the house warrant REFERENCE.md -> REFERENCES.md to
  match every other house. Non-content; the culture count is unchanged.
- 9402e47: Bring Northern Ireland up to the language-engine standard, add its identity-position and one plan. The four personas now carry full per-channel reads, each showing the gap at the limit of its tongue: Davy (Ulster-Scots his badge, the daily English shared with the other side, the Irish of his neighbours heard as a foreign flag), Niamh (Irish her badge in the same way, the Ulster-Scots of the unionists a foreign banner, the two sharing one English), Hume (the shared English used as a bridge where others made language a flag, the constructive ambiguity of the settlement weighed and drafted so each side reads its own hope), and Trimble (the arguing English of unionist Ulster bent against his grain from No to a guarded Yes). An identity-position joins the cast, the two tongues (Irish and Ulster-Scots each a badge of one community while both live in the same English, so language is read as allegiance, and even Derry or Londonderry cannot be said without choosing). And one forward mandate, parity of esteem (the peace's promise to give both tongues official standing so language joins rather than divides, through the stalled Irish Language Act to New Decade New Approach). Content fix at the same culture count.
- 7021f03: Bring Norway up to the language-engine standard, add its language position and a forward plan. The four defining personas now carry full per-channel reads under Projection, each showing the gap at the limit of its tongue: Kari (her spoken dialect against the written norm she learned, Danish and Swedish followed almost as her own, the world's English only caught), Nansen (mother tongue whole, but pleading the stateless cause abroad in English and French that never become his own), Olav (the old Norse spoken, the Church's Latin only caught, sainted in a Mass on a tongue his folk do not own), and Sondre (dialect whole but English worn and read all day, Norwegian giving way on screen). A language position joins the cast, maalstriden (Bokmaal and Nynorsk, two written norms of one tongue in a land that speaks dialect and bows to no spoken standard, both losing written ground to English), held by Kari and Sondre. And one forward mandate, fredsnasjonen (the deliberate peace-and-aid nation, carrying Nansen's humanitarian legacy), not a re-telling of any plot. Content fix at the same culture count.
- 09b5f0e: Portugal: drop the Descobrimentos plan that re-told the plot. A plan is a deliberate forward mandate, distinct from the historical-event plots (as in Germany's Energiewende, Switzerland's direkte Demokratie, Wales's Cymraeg 2050); a empresa dos Descobrimentos merely doubled plot_01_descobrimentos. Portugal keeps one strong forward language-mandate, a lusofonia, and the Discoveries stay a plot. Plans are an optional type, so the count follows the culture. Content fix at the same culture count.
- 34c9e17: Bring Portugal up to the language-engine standard and add its plans. The four defining personas now carry full per-channel reads under Projection, each showing the gap at the limit of its tongue: Camoes (Portuguese written to its monument and the word saudade fixed forever, Castilian carried, the tongues of India and Africa only caught), da Gama (his mother tongue planted in distant ports while the world reaches him only through the interpreter and foreign script he can barely read), Amalia (fado and saudade whole in her tongue, the applauding world's languages left outside, no outsider translating them without loss), and Tiago (Portuguese carrying the emigrants' saudade, English carried and read for the future calling him away). Two language-themed plans join the play's Company: a empresa dos Descobrimentos (the deliberate sea-venture that planted Portuguese across four continents) and a lusofonia (the CPLP and the Acordo Ortografico holding the Portuguese-speaking world together by the shared tongue). Content fix at the same culture count.
- 623c602: Bring Schleswig-Holstein up to the language-engine standard, add its Low German variety-position and a forward plan. All seven personas now carry full per-channel reads, each showing the gap at the limit of its tongue: Okke and Wiebke (Platt their mother tongue, Hochdeutsch drafted stiffly for the office, the regional tongue dying with the old), Soenke (Platt and a little borrowed Danish, so the border is no wall but a permeable line), Merle (Hochdeutsch and worn English, the grandparents' Platt only caught), Storm (the grey coast fixed in High German prose though it lives in Platt), Artelt (the engine room's plain tongue against the officers' command German), and Wuellenwever (his Middle Low German once the lingua franca of the whole Hanse, now the fading coast dialect). A variety-position joins the cast, dat Plattdüütsch (Low German as its own tongue beneath Hochdeutsch, once the Hanse's lingua franca, now retreating to the old and the coast). And one forward mandate, das Miteinander der Minderheiten (the Bonn-Copenhagen model that turned a fought-over border into mutual minority protection, a bridge not a wall) - not a re-telling of the 1864 or 1920 plots. Content fix at the same culture count.
- 0e95ee6: Bring Scotland up to the language-engine standard, add its Scots variety-position and two plans. The four personas now carry full per-channel reads, each showing the gap at the limit of its tongue: Bruce (the people's tongue the ground of his crown, Latin and Norman French carried by the feudal court), Burns (braid Scots written to a literature, the genteel English of the drawing-rooms put on like a borrowed coat), Eilidh (one tongue in two registers, street Scots and standard English, the Highland Gaelic barely caught), and Mairi (Gaelic her mother tongue, the English of the school carried, the tongue beaten out of the glens and held now only by the old). A variety-position joins the cast, the Scots tongue (braid Scots as a leid in its own right, the sister of English, losing ground to the standard). And two forward mandates, neither re-telling a plot: the Gaelic revival (bringing Gaelic back from the edge of death) and the national question (the modern drive for Scotland to govern itself, the reconvened Parliament and the open question of independence). Content fix at the same culture count.
- c150ccc: Spain: stage the multilingual proxy pair its languages call for. Spain is genuinely multilingual (Castilian, Catalan, Basque, Galician), so per the design it owes a no-shared-language pair bridged by a named proxy, as Switzerland has Menga and Gian and Finland has Solveig and Mannerheim. A new persona, Joxepa, an old woman from a remote Basque baserri who speaks, hears, reads, and thinks only in euskera and no Castilian, reaches the Castilian-speaking state only through Ane, the young bilingual Basque already in the cast, who carries her euskera into Castilian and back, twice-worn. Ane's read is extended to name her as that bridge. Euskera, a language isolate wholly unrelated to Castilian, makes the gap absolute: without the bridge, Joxepa's tongue does not cross the valley. Content fix at the same culture count.
- b3474cf: Spain: replace the Transicion plan that re-told a plot with a distinct forward language-mandate. A plan is a deliberate, ongoing mandate distinct from the historical-event plots (as in Germany's Energiewende, Switzerland's direkte Demokratie, Wales's Cymraeg 2050); el pacto de la Transicion merely doubled plot_04_transicion. In its place, el espanol en el mundo: the panhispanic norm of the RAE and the ASALE, the Instituto Cervantes, Spanish as a shared world tongue whose centre of gravity is now America - the external counterpart to the internal plurality of el Estado de las Autonomias. Content fix at the same culture count.
- 16ca1e7: Bring Spain up to the language-engine standard and add its plans. The four defining personas now carry full per-channel reads under Projection - Cervantes (Castilian written to its summit, Italian carried, the captive's tongue only caught), Gaudí (Catalan spoken and thought, Castilian drafted under duress for the Crown), Carmen (Castilian whole, the world's English caught at the threshold), and Ane (Euskara across every channel, the page and the form Castilian) - so each shows the gap at the limit of its tongue. Two plans join the play's Company: el Estado de las Autonomías (the post-dictatorship devolution that returned the regional tongues to official life) and el pacto de la Transición (the consensus passage from dictatorship to democracy). Content fix at the same culture count.
- 46fe608: Bring Sweden up to the language-engine standard and add its plans. The four defining personas now carry full per-channel reads under Projection, each showing the gap at the limit of its tongue: Astrid (Swedish plain and low, the silence let to speak, Danish and Swedish neighbours followed as her own while the world's English stays on the threshold), Linnea (Swedish whole but English worn and read all day), Vasa (the folk's tongue spoken and the Bible printed in Swedish to give the written tongue its form, against the Danish union and the Mass's Latin), and Wallenberg (mother tongue carried as a shield, yet saving lives in the perpetrators' German, the neutral passport his weapon). Two forward mandates join the play's Company, neither re-telling a plot: neutraliteten (the two-century non-alignment used as shield and room for mediation, its old tradition struck by the 2024 NATO accession) and jamstalldheten (the ongoing project of gender equality beyond the 1921 suffrage). Content fix at the same culture count.
- fd3f4b3: Enrich the Switzerland culture (rollout, after the Wales exemplar): full per-language, per-channel language reads on all six personas, and two plans.

  The reads embody the Swiss seams of language loss: Gian speaks, hears, and thinks in Romansh but reads and writes the world in German, his Romansh halting on the page; Vreni lives the Swiss-German diglossia, speaking a dialect she never writes and writing a Hochdeutsch she never speaks; Marco follows Bern in the German and French he carries while the centre rarely answers in his Italian; Dunant writes his appeal in French and the world replies in tongues he can barely read; Dufour holds the Confederation together by command in a tongue not his own; Tell is the myth every region retells in its own voice. This brings hearing, reading, and thinking into use alongside speaking.

  Two plans enrich the play end to end: die direkte Demokratie (direct democracy and concordance) and die bewaffnete Neutralitaet (perpetual armed neutrality and the militia), both listed in the play's Company.

  Non-count enrichment of an existing culture; version unchanged.

- 87fd817: Add the proxy / no-shared-language case to the Switzerland culture, the concrete demonstration of the communication model's third tier: Menga, a monolingual Romansh elder who holds no German and no English, cannot reach the canton, a Ticinese, or any outsider at all except through Gian, who carries her Romansh into German and back, the meaning arriving twice-worn. Gian and Dufour are named as the proxies (Dufour the bridge by which Dunant's French reaches the German cantons). The failure to communicate and the relay are read off the personas' holdings, not authored pairwise. Non-count enrichment; version unchanged.
- 54cb433: Bring the United Kingdom up to the language-engine standard, add its common-tongue position and one plan. The four personas now carry full per-channel reads, each showing the gap at the limit of its tongue: Shakespeare (English written to its summit and, through the union and its reach, made the language the world borrowed, his words now on lips that forgot him), Churchill (the common tongue forged into a people's nerve in the dark hour, the same theatrical English that steadies also gilds a reverse), Margaret (the plain understated English of the post-war generation, a class written into the flatness of the voice), and Aisha (English worn as the shared public tongue over a heritage language kept only for the family table). A position joins the cast, the common tongue (English the shared public tongue of a multinational, multicultural state, held above Welsh, Gaelic, Scots, Irish and the home tongues of the Commonwealth, the union mistaking a shared language for a shared belonging). And one forward mandate, the union (the deliberate, ongoing effort to hold four nations in one state by consent, through devolution and common goods, against the strains of independence and Brexit). Content fix at the same culture count.
- 99ea90d: Enrich the Wales culture as the exemplar for two upgrades, ahead of a house-wide rollout.

  Language engine, used in full: the four personas now carry a per-language, per-channel read under Projection instead of a single speaking link, and the prose enacts the loss of culture at the limits of the tongue, generation by generation - Glyndwr holds Welsh whole but argues his sovereignty in the crown's Latin; Gwen lives in Welsh but was schooled to write the world in English; Bevan has the Welsh of the chapel only as a sound he can catch but not answer; Rhys finds the eisteddfod behind glass, with a few borrowed words and an ear for the tune. This brings the hearing, reading, thinking, and writing channels into use for the first time, not speaking alone.

  Plans, a cast type the cultures had not used: two plan instances enrich the play end to end - Cymraeg 2050 (the scheme to reverse the language loss the personas embody) and Datganoli (the long devolution settlement, reaching by ballot what Glyndwr sought by arms). Each carries Direction, Orders, Implementation, and a Targets checklist with the canon verdicts, and both are listed in the play's Company.

## 0.14.1

### Patch Changes

- e18e1a0: Add the Nordics group: Denmark, Sweden, Norway, Finland, and Iceland. A khai group play in the `groups/` referencing collection - no geo, no pitch, English as its logical tongue since the members share no single language - whose `references` the registry build derives from the member plays it casts. The registry gains a second `groups` entry stamped `kind: "group"`. Groups are not counted, so the culture minor is unchanged.

## 0.5.3

### Patch Changes

- 72db8b8: Format release output: the `version` script now runs `npm run format` after the registry build, so the bot-generated "Version Packages" PR ships a prettier-clean `registry.json` (and CHANGELOG) and no longer fails the `format:check` gate.

## 0.5.2

### Patch Changes

- 02053ea: Add the first group: DACH (Germany, Austria, Switzerland). A khai group play in the `groups/` referencing collection — no geo, no pitch — whose `references` the registry build derives from the member plays it casts. The registry gains a `groups` entry stamped `kind: "group"`. Groups are not counted, so the culture minor is unchanged.

## 0.5.1

### Patch Changes

- 76b117d: Adopt `@chbrain/khai-engine-language`: install the language engine and wire every persona's `## Projection` to the language-crossing width it holds (speaking/writing/thinking × mother-tongue/borrowed/worn/carried). This activates the engine layer (previously the house installed no engine, so its wiring was never enforced) and models language as process per persona — natives in their mother tongue, Sönke borrowing Danish across the border, Merle wearing English, Luther and Storm forging the written mother tongue.
- 25d0b39: Align the house to the upgraded engine: declare the `groups` referencing collection (anchored by `play_`, referencing `cultures`, not counted) and register `nds` (Plattdeutsch) in `khai.languages`; add a `group/*` branch lane; fix the language test (it pointed at the non-existent `root/plays`, silently no-op) to validate `cultures/`; document groups, the registry `kind`/`iso` shape, and the language path in `REFERENCE.md`. `registry.json` gains an empty `groups` array.
- 9411077: Fix the count-driven add gate to match the real culture anchor (`play_*.md`, not the legacy `culture_*.md`), and correct CLAUDE.md to describe the full play canon. Adding a culture is once again changeset-free per the documented versioning model.
- 23b4130: Germany: declare `language: de` on the play (per-play language, now that the engine enforces the language policy) and trim `geo.json` to iso-only (the website derives region/parent from the ISO code).
- 3086050: REFERENCE: document the language engine — how khai engines are installed and enforced, and the rule that every persona links its language-crossing width in its Projection. Also correct the worked example's geo to the iso-only shape.
- 470ad90: Retire strict per-culture isolation in favour of ownership + resolvable casting, and make the plot-casting law type-agnostic, aligning the gates and the REFERENCE contract with the approved design of record. Geo contract restated as iso-required with region/parent/name as website-derived optional overrides. (Repo-side deltas only; the groups collection and registry changes await the khai-tests engine work.)
- dd76464: Upgrade the khai engine (khai-tests 0.1.26, khai-language 0.1.4, khai-arch 0.1.19, khai-guard 0.1.12, khai-rules 0.1.6). The registry build now stamps each entry with its `kind` and folds in the `iso` from a `geo.json` sidecar, so `registry.json` gains `kind: "culture"` and `iso` on every entry.

## 0.1.2

### Patch Changes

- 8a46e49: Correct the authoring contract: a culture's geo (region, ISO) lives in a
  per-culture geo.json sidecar, not in play frontmatter (khai frontmatter keys
  are closed). Document geo.json as a required per-culture file alongside README
  and REFERENCES.
- b49cca3: Germany: add `geo.json` (`{ region: "europe", iso: "DE" }`) so the website map producer can place Germany on the world map. Sidecar data only; no change to the culture content or the count.

## 0.1.1

### Patch Changes

- a3d2552: Define and enforce the culture authoring contract. Anchor the cultures
  collection on the play file (a culture is a play); recast REFERENCE.md as the
  LORE warrant carrying the contract (every khai type, history as plots, the
  Hofstede-from-data-never-named pitch, own-language, per-culture README +
  REFERENCES); and gate it in the house test: every culture uses all eight khai
  types, >=3 plots each casting a persona, >=2 personas, and its own
  README + REFERENCES. Green on the empty house.

## 0.0.1

### Patch Changes

- bb67b32: Raise the Cultures content house: a flat khai house that indexes a `cultures`
  collection (the new `@chbrain/khai-tests` collection support) and is governed
  exactly like a plays house — package wiring, computed-minor numbering, the
  guard lanes, husky, CI, and the conformance test. The `cultures/` content
  folder is seeded next; content is authored later.
- 575f26b: Seed the empty `cultures/` content folder. The house now ships its content
  directory (still empty); cultures are authored later. The registry stays the
  empty bill at the current culture count.
