# @chbrain/khai-cultures

## 0.268.0

### Minor Changes

- ca4cc37: Added culture for Appenzell Innerrhoden
- 5d0bb20: Appenzell Ausserrhoden joins the house.
- f60b2c5: Glarus joins the house.
- f60b2c5: Schaffhausen joins the house.
- f60b2c5: Solothurn joins the house.
- f60b2c5: Thurgau joins the house.
- cb895f3: Alsace joins the house.
- 5d0bb20: Brittany joins the house.
- 850d456: Corsica joins the house, written in Corsican and nesting France. The Corsican prose has not been read by a speaker; REFERENCES.md says so and says what a native reader should expect to change.
- 17f3feb: Added culture for Fribourg
- 5d0bb20: Added culture for Geneva
- 773079a: Added culture for Jura
- 2bc45fc: Added culture for Neuchâtel
- 655a404: Added culture for St. Gallen
- cb895f3: Added culture for Vaud
- f60b2c5: Added culture for Zug
- 6cf5d9b: Zürich, Bern and Luzern. The three largest cantons by population, written off
  current `main` after #487 was found to be scaffolding.

  **The plot lines come from #487 and are its real contribution** - Zürich's guild
  revolution, sausages, Kappel, Stäfa, Escher and Züri brännt; Bern's Aare loop,
  Murten, the Vaud, the peasants' war, the Grauholz, the federal city and the Jura
  question; Luzern's Sempach, the Jesuit college, the Sonderbund and the Rigi
  railway. Those selections took judgement and they survive here. Everything else
  is written.

  **Zürich** does not open at 1336. The guild revolution is a constitutional act,
  and the origin that actually explains this place is older and less flattering:
  the Romans put no settlement at the narrows where the lake becomes a river, they
  put an office that counted other people's goods and kept a share, and the town
  formed around the office rather than the reverse. Read from there, everything
  else changes register - the Reformation's work ethic lands on a book-keeping that
  was already present, and Escher's bank is the toll post in its penultimate form.
  Its second position is `das Zählen`. Its `plot_99` closes the arc `plot_05` opens
  at the same address: over the weekend of 18 and 19 March 2023, the bank Escher
  founded in 1856 is handed to its neighbour on the other side of the Paradeplatz.

  **Bern** begins with a landform. A city built on a sandstone peninsula, where
  correcting is expensive and space cannot be added, has to plan before it builds -
  and has done everything that way since. That is `die Behäbigkeit`, and the play
  holds it up in both directions: it lost an empire in a single morning at the
  Grauholz because gründlich is not the same as fast, and fifty years later it was
  handed the administration of a country **because** it was no longer dangerous.
  The old lordship is staged plainly, not apologised for: three centuries over a
  French-speaking population that was never asked, a treaty broken in 1653 once the
  troops were ready, and a secession resolved in thirty-one years of plebiscites.

  **Luzern** does not open at Sempach either, for the same reason. It exists where
  boat becomes road, and its first and greatest building is therefore a bridge with
  its own history hanging in the roof. Everything since is that arrangement with
  different travellers: pack trains, then pilgrims, then - after the Sonderbund is
  lost here in 1847 and a new trade has to be found - the visitors that the first
  mountain railway in Europe brings in 1871. Its position is `der Blick`, and its
  `plot_99` is ninety minutes at the Schwanenplatz.

  The three refuse the obvious casting and say so. Zwingli and Escher are staged
  and not cast; so is the Lion Monument, which is the most photographed object in
  Lucerne and commemorates something that belongs to France and to the mercenary
  trade rather than to what that city does. Tell and the Rütli are left to the
  neighbours whose plays already stage them.

  Three cultures, so a `minor`: 297 to 300, and the umbrella lands on `0.300.0`.
  The three new packages declare no bump of their own; none has been published.
  They are named `ch-zuerich`, `ch-bern` and `ch-luzern`, in full, like the seven
  cantons already here - an npm name is permanent, and `ch-zh` would have been the
  only ISO-coded one in the house.

- 83d5442: Uri, the first Swiss canton, authored and migrated in one motion:
  `@chbrain/khai-cultures-ch-uri`.

  A valley that was a dead end until somebody hung a bridge in the Schöllenen
  around 1200 and made it the shortest crossing of the Alps. Its freedom of 1231 is
  bought with the pass, its oath of 1291 is an insurance among neighbours, and
  every improvement of the road since - the tunnel of 1882, the motorway, the flat
  tunnel of 2016 - has made the passage larger and this country's share of it
  smaller, until the traffic goes under it in twenty minutes without seeing it.

  Born package-clean: it links no `../` at all, and casts only tongues already in
  the tongues package. The new package declares no bump of its own.

- 50f0295: Basel-Landschaft joins the house: a canton that took its existence by force in
  1833 and defends it hardest now that it commutes into the city every morning.

  The culture ships as its own package, which declares no bump of its own - a first
  release IS its manifest version. Only the umbrella carries one.

- c2336fb: Aargau joins the house: the ground the Habsburgs came from, taken from them in
  1415, and made to carry the country's electricity five centuries later.

  The culture ships as its own package. A package that has never been published
  declares no bump of its own - its manifest version IS its first release - so only
  the umbrella carries one, and the culture count goes up by one.

- 64daa0a: The three cantons that carry Switzerland's languages. Its play rests on four of
  them and had one plot about any: Graubünden, Ticino and Wallis are now written,
  and `rm`, `it_ch` and `fr_ch` are finally held by the cultures that speak them.

  **Graubünden** has no founding, only a geography: a hundred and fifty valleys
  draining in three directions with a pass between each pair, which is why there
  are three languages, five written Romansh idioms and once fifty jurisdictions
  that each thought themselves sovereign. That is `plot_00`, and the point of it is
  that the plurality is not decay but the original form. The canton did not build
  one league but three, was an associate of the Confederation rather than a member
  until 1803, and in 1620 nearly killed itself with the same plurality. In 1864 a
  hotelier bet English summer guests they would sit in the sun in January, won, and
  invented winter tourism; in 1914 the same canton took a hundred and seventy square
  kilometres out of use to watch what happens when nobody manages anything. In 1982
  it built itself a common written language because five were too expensive, and
  from 2011 the communes took their idioms back.

  **Ticino** looks south and belongs north, and every later fact follows from a
  border drawn along a watershed rather than a line of life. It did not join the
  Confederation; between 1403 and 1512 it was taken, and administered for three
  centuries as eight bailiwicks by bailiffs drawn by lot - the exact inverse of the
  cantons that took it, whose whole story is never having been anyone's subject.
  Its founding decision is `liberi e svizzeri`, February 1798: free overnight, the
  square in Lugano chose the former master over the people who spoke its language,
  and the choice has never been revised or entirely explained. Today the work comes
  in from the south every morning and the young go north in two hours and mostly
  stay.

  **Wallis** begins with a bill for water. A valley drier than parts of Spain hung
  its water off the cliffs in channels kilometres long, built and maintained by
  cooperatives and allocated by recorded hours that hold at two in the morning -
  and everything this culture is comes from that: a community that cannot survive
  without cooperation and writes down every hour of it. Its bilingualism starts as
  a conquest in 1475 and becomes, after 1815, a scrupulous alternation. It sold
  eighty years of its meltwater for a royalty. In May 2025 the Birch glacier
  collapsed onto Blatten, nine days after the village was evacuated, and the
  measuring and the obeying held even though the mountain did not.

  Each records what it deliberately did not do. Rumantsch Grischun is a **piece**
  and not a tongue file, because a language position says what a tongue gives
  whoever holds it and nobody holds this one first - it was built for
  administration and works there. The Ticinese dialect and Walliserdeutsch get no
  file either, and the reason is stated rather than hidden: this house does not
  ship a variety until someone can name its rule, give the minimal pair on both
  sides, and say whether it survives in writing. Walliserdeutsch is the strongest
  outstanding candidate in the house.

  Three cultures, so a `minor`: 294 to 297, and the umbrella lands on `0.297.0`.
  The three new packages declare no bump of their own; none has been published.

- 048b903: Basel-Stadt joins the house: a city that never drew its importance from its size,
  and behaves once a year at four in the morning as though it still could.

  The culture ships as its own package, which declares no bump of its own - a first
  release IS its manifest version. Only the umbrella carries one.

- 32eefbe: The other two Waldstätte. Uri's `plot_02` stages a pact between three valleys of
  which only one existed in this house; Schwyz, Obwalden and Nidwalden are now
  written, and all three are born as production packages.

  **Schwyz** is the canton that gave the country its name, its field sign and the
  charter it keeps in a box, and got the say over none of them. Its `plot_00` is
  deliberately not 1291: the origin is the Marches quarrel, four hundred years of
  free herdsmen refusing to give up an alp to the abbey of Einsiedeln, ending in
  the raid of 1314 that brought a duke down on them and produced Morgarten. That is
  the less flattering origin and the documented one, and everything after it -
  the stubbornness, the certainty of being in the right without a charter - reads
  from there. Its second position is `der Name`, the office of having supplied the
  word a country goes by, which it lost the interpretation of at the Sonderbund in
  1847 and has been touchy about ever since. Today it is two landscapes that do not
  know each other: the Talkessel behind the mountain, and the Höfe on the other
  lake, where people move for the arithmetic.

  **Obwalden** comes from a compass direction rather than a founding: the half
  above a wood, which sealed in 1291 under a name it does not use internally and
  kept the double bookkeeping for five hundred years. It gave the Confederation its
  entire founding story - the White Book of Sarnen, written around 1470 by a clerk
  between two certified copies - and kept nothing but the file copy; the monument
  and the play are in the neighbouring canton. Brother Klaus is staged and not
  cast: what he did was sit still three hundred metres from his farm and let half
  of Europe come down the steps, and the counsel that held the Confederation
  together in 1481 was never written down. In 2006 the poorest canton made its one
  untouchable competence into a business and became the cheapest.

  **Nidwalden** is the office of refusal. It said no to the oath on the Helvetic
  constitution in 1798 and paid for it in one day with four hundred dead and a
  burnt capital; three months later a failed Zürcher took in the orphans and found
  modern pedagogy in five months, so the most important thing that ever left this
  place is not from it and would not exist without the worst thing that happened
  there. It said no twice more, in 1995 and 2002, to the nation's nuclear
  repository. It owns the one man in the national story who dies so the others get
  through and cannot prove he existed. Today it builds aircraft whose buyers are
  argued over in Bern, and lent its mountain to a peace conference in 2024.

  Each answers the defining question in its own `REFERENCES.md`, and each records
  what it deliberately did **not** stage. Nidwalden's is the sharpest: there is no
  museum of 9 September in Stans and no festival play, and not narrating is the
  form in which that landscape holds it - staging a commemoration it does not hold
  would have been an invention.

  Three cultures, so a `minor`: the count goes 291 to 294 and the umbrella lands on
  `0.294.0`. The three new packages declare no bump of their own; none has been
  published. The umbrella declares all three as dependencies, because it keeps the
  count and so must keep the reference.

### Patch Changes

- d4c6697: The order lands on the four cultures it settles.

  **Three waivers retired.** Germany's Jonas, Czechia's Tomáš and Melilla's Alba
  are now cast by consequence, each in the Tension of the plot that made the world
  they live in, with the mechanism named rather than the atmosphere:

  - **Jonas** — the Mauerfall Tension already ended on the question `Elke` and the
    next generation put to each other. He is that generation, and what he shows is
    the specific thing the plot leaves open: the united country is self-evident to
    him, so whether the shared memory came with it is visible in him or nowhere.
  - **Tomáš** — the Velvet Revolution Tension asks whether a sceptical nation can
    fill freedom once the enemy is gone. He works for a firm abroad without having
    to leave, which before November was impossible twice over, and trusts neither
    politicians nor church: the scepticism outlived the enemy it was aimed at.
  - **Alba** — the 1986 Tension is that the city got the documents and not the
    conversation. She runs crews in which half are the neighbours those papers
    recognised, and on the scaffold that is the one thing nobody discusses.

  **Switzerland's placement corrected.** Gian and Marco were cast in the `Action`
  and the `Stage` of `Sprachenartikel 1938` with `obwohl beide diesen Tag selbst
nicht erlebt haben` undoing it. Honest prose, wrong chapter: a Stage line still
  listed them as cast in a 1938 scene. They move to the Tension, where the plot's
  own open question — whether overwhelming agreement saves a language or only
  slows its decline — turns out to have one of them on each side. Gian can invoke
  1938 but has to invoke it, because recognition did not stop the shrinking; Marco
  has nothing to invoke, because the same day settled Ticino's belonging so
  completely that nobody notices it.

  All four come out at zero dead Company entries with no waiver file left between
  them. The `--consequences` queue goes from three to eight, which is the point:
  the castings are now visible to whoever reads it next instead of being spread
  across five waiver files.

- abebdac: Austria gets the two things its Arc names and never staged.

  Ten plots opening in 1683, every counter clean — and the words the play uses
  about itself told a different story. `barock` appeared in the Arc, the pitch, the
  culture-position, Salzburg and the Belvedere, and **in no plot**. The play had a
  place whose name means _salt fortress_ and no salt, no Hallstatt, no Noricum.

  **Hallstatt und Noricum** opens the culture two and a half millennia earlier than
  1683, and it is not a state-founding: it is a mineral and a route. Salt out of the
  mountain from the Bronze Age, an Iron Age so characteristic that European
  archaeology names the whole epoch after this one Austrian village, amber from the
  Baltic and Italian bronzes in its graves. Then the Celtic kingdom of Noricum,
  whose iron Rome bought as _ferrum Noricum_ for its blades, and which Rome took
  around 15 BC **without a war** — trading partner to province, royal seat to Roman
  town. Its Tension is the habit that starts there: a country that grows by
  connecting rather than by conquering, which is the same country whose Arc says its
  pride comes `nicht aus der Macht, sondern aus der Form` — and the same habit that
  gave a later century a word this play stages in `plot_10`.

  **Der Barock** stages the word. Its Cue is the Counter-Reformation, because the
  Baroque is what re-Catholicisation looks like once it is built: Ferdinand II and
  the Reformationskommissionen, convert or sell and leave, the Jesuits given the
  schools, and a German-speaking world that comes out of thirty years of war split
  so that _dem Norden bleibt das Wort, dem Süden das Bild_. Its Action is what
  followed 1683, when the danger lifted and the money arrived: Fischer von Erlach
  and Hildebrandt, Melk over the Danube, the Karlskirche, and Prinz Eugen — the
  soldier of `plot_02` — building the Belvedere and living in it as a man with
  nothing left to prove. The Belvedere stops being a palace cast in a 1955 treaty
  plot because that is where the treaty was signed.

  That plot is also where the Arc's central claim is decided rather than asserted:
  this is the fork at which Austria separates from the Protestant north, and both
  halves of what follows come out of it — the music, the theatre, politeness as an
  art form, the Kaffeehaus as a stage; and the practice of taking the effect more
  seriously than what stands behind it, which two hundred and fifty years later a
  whole country used as an excuse.

  Ten plots become twelve, renumbered chronologically. One new piece: `das Salz`,
  which finally gives Salzburg its name back.

- bfaba44: Austria's plot line now carries its whole arc, not just four of its ten stops.

  The Arc made four claims the plots never staged: the empire was won (1683 was
  absent), it became a small country "over Nacht" (1918 never appeared at all,
  though the Arc is built on it), it is "mit allem Nachdruck nicht deutsch" (1866
  was absent, and 1938 lived only as a clause in the Staatsvertrag plot's Cue),
  and its pride is drawn "aus Musik" first (no music plot existed at all).

  Six new plots close those gaps, renumbered chronologically alongside the four
  that already existed: `1683 Türkenbelagerung`, `1740 Maria Theresia`, `Wien wird
zur Hauptstadt der Musik` (Haydn, Mozart, Beethoven), `1815 Wiener Kongress`,
  `1866 Königgrätz`, `1900 Fin de Siècle`, `1918 Zerfall`, `1938 Anschluss`, `1955
Staatsvertrag`, `1986 Waldheim-Affäre`. The Anschluss plot is staged on the
  standard this house set for itself in Germany's Zivilisationsbruch plot: the
  Heldenplatz crowd, the immediate persecution, and the Republic's own founder
  recommending a "yes", not a country acted upon alone.

  Five new personas (Prinz Eugen, Mozart, Franz Joseph, Karl Renner, Waldheim) and
  two new pieces (das Belvedere, die Wiener Klassik) carry the new plots and stay
  linked back into the ones that already existed. Lukas's coverage waiver, open
  since the culture shipped because no plot existed after 1955, is retired: the
  Waldheim plot gives his generation the scene his own Shadow chapter already
  implied, and casts him without inventing one.

  Coverage, conformance and persona wiring all come out clean for Austria.

- 182c41b: Austria spans origin to present.

  Hallstatt und Noricum was already the origin and only carried the wrong number;
  it becomes `plot_00` and nothing else moves.

  **`plot_99` Das Video und der Berg, seit 2015.** A record and not a forecast, and
  it says so. The Balkan route through Nickelsdorf and its closure a year later. In
  May 2019 a seven-hour video from a finca on Ibiza, two years old, in which the
  vice-chancellor offers public contracts to a supposed oligarch's niece in exchange
  for campaign help and the takeover of a newspaper; the government is gone within
  days. In March 2020 Ischgl becomes the country's best-known address for the wrong
  reason, as half of Europe is infected in the après-ski bars while the authorities
  hesitate because the season is still running, and departing guests carry it into a
  dozen countries. A chancellor resigns under investigation in 2021, and in 2024 a
  party that stood at the margin in 1986 finishes first.

  Its Tension finds the pattern rather than predicting from it, and the pattern is
  `plot_12`'s: **the Schmäh holds as long as it is only talk.** It does not hold
  against a video that runs for seven hours and forgets nothing, and it does not
  hold against a virus indifferent to the season. Twice in five years the
  uncomfortable thing was one that could not be talked around, and both times the
  country tried anyway. Whether a culture that draws its worth
  [from form](plot_03_der_barock.md) can separate the talking-around from the form
  without losing both is what these years leave open.

  One new place: `Ischgl` — a village of sixteen hundred with beds for many times
  that, which can live a year on one winter, and that explains nearly everything
  decided there.

- e689370: Baden-Württemberg spans origin to present.

  The play opened at 1806 and 1951, two constitutional facts about a state built
  by decree and by referendum, and never asked where the culture predates either.
  `plot_00` fixes that: **Die Alamannen und die Sprachgrenze**, the tribal
  settlement whose dialect boundary between Alemannic and Swabian still runs
  through the Land today, older than any of the borders drawn across it.

  Two plots fill the gap the tell found in the Arc and Stakes: `Dialekt` and
  `Häusle` were claimed and never staged. **Vom Hohenstaufen zum Kaiserthron
  1079 bis 1268** stages the one stretch of the Land's history spent ruling
  rather than being ruled, and the coat of arms it left behind. **Die Tübinger
  Stiftler 1788** names the Pietist root of the pitch's own `stille Klugheit`.
  **Wüstenrot und der Bausparvertrag 1921** stages `Häusle` as an institution,
  the Bausparkasse, not only a word in the Arc. The 1886 automobile plot's
  Tension was anachronistic (a fear of leaving the combustion engine, staged in
  1886); it now carries Bertha Benz's own 1888 proof drive instead, and the
  combustion-engine anxiety moves to where it actually belongs.

  **`plot_99` Der lange Abschied vom Verbrenner.** A record, not a forecast.
  Stuttgart's diesel bans since 2019, a Green minister-president governing a
  combustion-engine economy since 2011, Bosch and Daimler Truck cutting tens of
  thousands of jobs while investing in batteries and software, and Stuttgart 21
  still unfinished under the same city, its cost more than doubled since
  groundbreaking. Whether the new jobs arrive before the old ones are gone is
  left open, as the Stakes already ask.

  Three new places (`der Hohenstaufen`, `das Tübinger Stift`, `Wüstenrot`), two
  new pieces (`das Landeswappen`, `der Bausparvertrag`) and one new position
  (`die stille Klugheit`, held by Karl alongside `das Tüfteln`). Zero dead
  Company entries; the 1806 and 1951 plots are renumbered, not rewritten.

  ***

  _One repair beyond the brief._ The 1886 automobile plot carried a Tension about
  the electric transition - an anxiety of the 2020s attached to an event of 1886.
  It now ends on Bertha Benz's drive from Mannheim to Pforzheim in August 1888,
  which is what actually followed, and the transition anxiety moved to `plot_99`
  where it has a decade to belong to.

  _On sourcing._ Outbound browsing is blocked in this environment, so nothing here
  rests on a source opened during the work; search summaries and model knowledge are
  the ceiling. Two claims were hedged rather than asserted for that reason: the
  Stauferstelen are `mehr als hundert` with `der überwiegende Teil` in this Land
  rather than a counted total, and Schwäbisch Hall is described as offering its
  contracts from the town since the 1930s rather than being founded there, because
  the company was in fact registered in Cologne in 1931.

- ca925d7: Bavaria spans origin to present, and DACH is complete.

  Die Bajuwaren und die Klöster was already the origin; it becomes `plot_00` and
  nothing else moves.

  **`plot_99` Die bestellte Heimat, seit 2015.** A record and not a forecast. The
  years after 2015 turn what was taken for granted into a programme. In 2018 the
  state government orders a cross hung in the entrance of every state authority,
  expressly as an avowal of historical and cultural character — and the churches
  object first, because a cross the state orders stops being the thing they take it
  for. In the same year the governing party loses the absolute majority it had held,
  with one exception, since 1962. In 2019 the most successful Volksbegehren in the
  state's history tells farming how to farm, and Gustl and Sepp take their
  conditions from a majority that lives in the city. Munich becomes the most
  expensive place in the country to live in. And the glaciers go: the remnants of
  the Nördlicher Schneeferner are officially not a glacier any more from 2022.

  Its Tension names the movement rather than predicting from it: **what was
  self-evident is now decreed.** A land that
  [placed itself under a patroness in 1638](plot_03_patrona_bavariae_1638.md) hangs
  crosses by decree in 2018 and has to be told by the churches that these are not
  the same thing. The party that for fifty-eight years appeared to _be_ the state is
  one among several. The Tracht, the Fest and the mountains have become an offer,
  well sold and well attended, and the mountain itself is getting warmer.

  No new cast: Gustl, Sepp, die Alpen, München and the identity plan were all
  already in the Company.

  Two of my own errors, caught before merge and worth recording because no gate
  holds either: the plot first linked `../germany/place_berlin.md`, which breaks the
  containment rule this house measured at 712 cross-culture links all pointing at
  positions and none at a place; and a soft hyphen had crept into one word. Both
  fixed, and both invisible to every check in the repository.

- 14b50c8: Bavaria opened in 1806 and had a century missing in the middle.

  Its four plots ran 1806, 1806, 1864 to 1886, and then the present day: a kingdom,
  three tribes, a fairy-tale king, and laptops. **Nothing between 1886 and the late
  twentieth century** — no 1918, no 1919, no 1933 to 1945 — in the state where the
  party began. That is Germany's own original fault reproduced in its largest child,
  and it was invisible to every counter because the play was complete.

  **Freistaat und Ordnungszelle 1918 bis 1923** stages it. The Arc and the Stakes
  both rest on the word `Freistaat`, and the word is Kurt Eisner's: a theatre critic
  from Berlin, a Jew, a socialist and in Munich an incomer, who proclaimed it in
  November 1918 and was shot on his way to the Landtag three months later. Then the
  Räterepublik, the hostage shootings, and the Freikorps ending it in May with
  several hundred dead. Then the Ordnungszelle: a Bavaria where the right was safe
  and the courts lenient, in whose beer halls a movement grew until it tried the
  coup in the Bürgerbräukeller in November 1923 and got five years' Festungshaft, of
  which its leader served nine months and wrote a book.

  Its Tension is the uncomfortable one this culture owes itself: the pride in being
  different from those in the north **took its name from a man this country shot
  four months later and then largely forgot**, and the self-reliance the Freistaat
  invokes is precisely what made it the Ordnungszelle — a justice of its own that
  was mild where it should have been severe, and a government that fended off the
  Reich while letting something grow that then took everything from the Reich.
  Munich is officially Hauptstadt der Bewegung from 1935, and the regime's first
  camp stands at Dachau from March 1933, twenty kilometres out.

  **Das Reinheitsgebot 1516** answers the other half of the Arc, which names `das
Bier, die Tracht, das Fest` and staged the beer nowhere: `bier` appeared in no
  plot, and `piece_reinheitsgebot` was cast only in the modern laptops-and-Lederhosen
  plot. Now it has its 1516 — barley, hops and water, no yeast because nobody knew
  of it — the price controls, the grain protected from the brew kettle, and the 1812
  beer-garden permit with the condition that says everything: pour, yes; sell food,
  no; bring your own Brotzeit, allowed. Its Tension makes the bench that is open to
  everyone the same hall the later plot needs.

  Four plots become six, renumbered chronologically — which also fixes an existing
  disorder, since `drei_staemme_1806` sat after Ludwig II. No new cast: the
  Reinheitsgebot, the Freistaat and München were all already in the Company and only
  ever cast in the wrong century.

  Still open and noted rather than fixed here: `Tracht` as an invented tradition —
  the Trachtenvereine of the nineteenth century — remains unstaged. `piece_lederhose`
  is cast in the plot named for it, which is fair.

  ***

  **And then a second look said the opening was still a state date.** Four plots
  became six and the earliest was a beer law of 1516, with the play proper still
  starting when Napoleon made a kingdom. That is the same substitution the order
  warns about, made one pull request after writing it down, so it is fixed here
  rather than merged wrong.

  **Die Bajuwaren und die Klöster** opens the culture in the sixth century. Rome
  leaves; Regensburg was Castra Regina since 179 and goes quiet. Then a name appears
  in the sources that did not exist before, Baiuvarii, and the people it names are
  not an immigration but a coalescence: Romans who stayed, Alemanni from the west,
  Goths and Lombards passing through, newcomers from Bohemia. Bonifatius orders the
  church in 739 into four bishoprics whose shape the land keeps for a thousand
  years, longer than any duchy, and in their shadow the monasteries clear, copy and
  brew — which is where the beer of the next plot actually comes from. In 788
  Charlemagne deposes the last Agilolfing.

  Its Tension: the people proudest of being from here and nowhere else is itself a
  mixture that agreed on a name, and the independence this land calls its core was
  taken from it for the first time in **788**, a thousand years before Napoleon.

  **Patrona Bavariae 1638** answers `der Stolz, anders zu sein als die im Norden`,
  which the play had only ever demonstrated politically. The dukes choose against
  Wittenberg, the Jesuits get Ingolstadt, Maximilian I leads the Catholic League,
  and in 1638 he puts up the Marian column and formally places his land under a
  patroness. The square is called Marienplatz ever since, and the white and blue are
  the Wittelsbach lozenges and the colour of a cloak at the same time. The Tension
  names both halves: the feast, the church music and the calendar on one side; a
  league that spent thirty years in the field against other Germans, and the habit
  of defining oneself by what one stands against, on the other.

  This is the same argument made for Austria in the Baroque plot, and it should
  have been made here first: two Catholic Baroque neighbours whose Arcs both claim
  to be emphatically not-northern, for a reason that is confessional before it is
  constitutional.

  Four plots become **eight**. Two new pieces of cast, both cast where they belong:
  `place_regensburg` and `piece_mariensaeule`.

- e764e31: Berlin gets an origin and a present, and the three centuries between founding
  and Wall stop being empty.

  The plot line opened in 1961, at the Wall: the single worst example the
  plot-zero order named by name, for a city founded around 1237, capital of
  Prussia, of the Kaiserreich and of Weimar. Fixed as a research pass, not a
  sweep, and only within `de_berlin`.

  **`plot_00` Das Edikt von Potsdam 1685.** After the Thirty Years' War halves
  Berlin and Cölln, the Great Elector's edict invites Huguenot refugees into the
  empty city; within a generation roughly a fifth of Berliners speak French. Not
  the founding of the settlement and not a state date - the point at which
  something still true of Berlin (a belonging built on people arriving, not on
  descent) first gets made rather than merely stated.

  **`plot_01` Berlin wird Weltstadt, 1920 bis 1933.** The Greater Berlin Act
  quadruples the city to a world capital of nearly four million; the Institut fur
  Sexualwissenschaft and the club scene around it live a freedom of the night and
  of research that the play's own Arc otherwise dates to 1990. NS students raid
  and burn it in May 1933. Answers the "cultural moment, not constitutional one"
  test directly: filling this gap with "capital of Prussia" or "capital of the
  Kaiserreich" would have been easy, true, and beside the point.

  **`plot_05` Arm, aber sexy: die Startup-Hauptstadt, 2003 bis 2015.** Wowereit's
  2003 line and the startup wave it named, cast against the same cheap rent it
  consumed.

  **`plot_99` Das teure Jahrzehnt, seit 2020.** A record: BER opening nine years
  late, the Mietendeckel voided by Karlsruhe in 2021, the "Deutsche Wohnen & Co
  enteignen" referendum passing without legal force, the 2023 full election
  rerun. Berlin's own decade, not Germany's.

  Three new places (`der Franzoesische Dom`, `das Institut fur
Sexualwissenschaft`, `der Flughafen BER`), one new persona (`Hirschfeld`,
  `type: real`) and two new pieces (`die Club-Mate`, `der Mietendeckel`). The
  three existing plots (division, fall of the Wall, techno subculture) were
  renumbered to `plot_02` through `plot_04` with every cross-reference in the
  culture repointed; their own text is unchanged. The play's Arc, Name and
  Stakes were left untouched.

  ***

  _Review notes._ Two corrections were made in review. The Edict of Potsdam is dated
  29 October 1685 in Brandenburg and the Revocation 18 October 1685 in France, but
  Brandenburg was still on the Julian calendar and France on the Gregorian, so
  subtracting the two gives eleven days where the real gap is about three weeks. The
  plot now says `wenige Wochen`, which is what can be said without a calendar
  conversion in the sentence. And Hirschfeld had not stayed away "since 1932": he
  left on a world tour in 1930 and never came back, which is the sadder and more
  accurate version.

  _On sourcing._ Outbound browsing is blocked in this environment - verified by
  `curl` to arbitrary domains, not only inferred from a failed fetch - so no claim
  in this culture rests on a source opened during the work. Search summaries and
  model knowledge are the ceiling, and the plots were written to survive that:
  figures are kept only where they are uncontroversial and load-bearing.

- 31991ad: Corrections from an external review of the DACH restagings.

  Germany's origin plot and the Straßburger Eide piece both claimed the Oaths were
  the oldest surviving text in Old High German. They are not: the Abrogans and the
  Hildebrandslied precede them, and it is the Romance half of the Oaths that holds
  that distinction. Both now say what is actually new in 842 — the vernacular
  standing beside Latin and Romance as an equal, in an act of state.

  Austria's present plot said the FPÖ stood at the margin in 1986; it had been in
  federal government until that year. The scene now stages what 1986 was: Haider's
  Innsbruck takeover, in the same year as Waldheim. The Dürrnberg saltworks is
  above Hallein, not Salzburg, in the origin plot and in the salt piece.

  Hamburg's present plot is retitled "Der halbe Hafen", so that Berlin's "Das teure
  Jahrzehnt" is one culture's title rather than two.

  Austria's REFERENCES now records why the word Anschluss echoes from Noricum to
  1938 in the origin plot's Tension, what the framing is bounded to, and what would
  be done if it ever carried more than a question can.

- 937abb7: American English is read against the mnemonic, and the second half of the
  `en_gb` sweep finally runs.

  The move was a plain rename, byte for byte, so the reading is its own act. The
  file arrived carrying rhoticity, which is sound and cannot go in a text file,
  and the productive verbing of nouns, which `en_gb` does too - neither of which
  separated it from its own sibling on the page. It now carries what survives in
  writing: the spelling system that was regularised on purpose; `gotten` alive as
  a distinction the other form has lost, _has got_ being possession and _has
  gotten_ acquisition; the noun/verb spelling pairs collapsed to one, so the two
  files now agree about the same fact from opposite sides; the obligatory article
  on the institution; and the singular verb on a collective. Sources are in the
  provenance entry. Its General American material stopped explaining the pressure
  toward the standard by broadcasting and national schooling, which are a
  country's institutions and not a tongue's business.

  Then the sweep. Retiring `en_gb` moved 165 of its 167 links to the `en` anchor,
  because the house used to say "English" by picking a country and most of those
  cultures meant English as such. Nothing had ever swept `en_us`, so the same
  fault sat in it untouched. Eight holders say in their own words that they mean
  the anchor - Bob Marley's "the world's standard English", Can's "the world's and
  the job's English", Wangari's "the English of her science" in a British colony,
  Ljubica's "the English of the sanctions", which was NATO's, Stefan's "the
  English of the emigration" to Austria, Germany or America, Man Naghol's "the
  tourists' English", where the tourists are Australian, Fukuzawa's 英学 as the
  successor to 蘭学, and Saxony's Peggy, wearing English for international chip
  designers - and all eight now hold it.

  Peggy is the one worth naming. Across all of DACH the count was 39 links to the
  anchor and one to `en_us`, and hers was not a judgement anyone made: it survived
  the `en_gb` sweep only by pointing at the other country's file, and it was
  Saxony's last migration blocker. She would also be the wrong German to hold it
  on any account of how English reaches Germany, Saxony having been the zone where
  Russian was the compulsory first foreign language and English the second, taught
  on British norms.

  The 34 files that keep it each meet the American one specifically: the United
  States' own cast, Latin America's English of the north and of the company, the
  Pacific the United States administered, the Philippines, and the individuals
  made in America - Bruce Lee, Ilves, Gibran, Morris Chang, and de Gaulle, who
  calls it `l'anglais américain` and means Roosevelt's.

- 7a27c1b: France answers the defining question.

  The tell failed on the two words the Arc leans on hardest. **Laïcité** is named
  in the Arc and again in the Stakes and stood in no plot; **la langue française**,
  called a bien commun, was equally unstaged. Two more followed: the taste for
  descending into the street, with `process_la_manif` dead, and the art of living,
  with the meal and the baguette dead beside it.

  `plot_00` answers the origin with a defeat this country chose rather than a
  victory it won: the Gauls are the ancestors the Third Republic selected and
  taught identically in the Cantal and in Dakar. `plot_01` stages the language as
  two acts of state, 1539 and 1635. `plot_05` gives laïcité its law. `plot_07`
  stages May 68, after which no government governs on the ballot alone. `plot_99`
  records the decade since 2015.

  A prerequisite: retiring `position_language_fr_fr` authors France, so France has
  to come out at zero first.

- 52b5d02: Germany becomes the first culture to span origin to present.

  It is the culture the defining question was written about and the one whose gaps
  justified `order_plot_zero.md`, so it should be the first to satisfy it. It did
  not: it opened on the Reformation and stopped at the Mauerfall.

  **`plot_00` Theodiscus und die Straßburger Eide.** The Reformation is a language
  _standard_, not a beginning. This culture is named after its own speech: in 786 a
  report to the Pope records decrees read `tam latine quam theodisce` — in Latin and
  in _theodiscus_, which means nothing grander than _the language of the people_.
  On 14 February 842 two grandsons of Charlemagne swear alliance at Strasbourg, each
  in the other side's tongue so the opposing troops can hear what is promised, and
  the chronicler Nithard writes both down. That text is the oldest surviving German.
  A year later Verdun divides the empire roughly along the line the languages had
  already drawn.

  Its Tension is the question the name creates and the country never escapes: a
  people called after its speech has no borders except where it is understood, so
  **who belongs, and who decides that?** The plot ends by pointing at
  `plot_07`, twelve hundred years later, when people arrive who do not speak it yet.

  **`plot_99` Das offene Jahrzehnt, seit 2015.** A record, not a forecast, and it
  says so in its own Tension. More than a million protection-seekers in a few
  months; a party to the right of the Union entering the Bundestag in 2017 for the
  first time since the fifties and becoming the strongest force in several eastern
  states — where Elke lived through the second rupture of her life; Prosper-Haniel,
  the last hard-coal mine, closing in December 2018, so the Ruhr where Mehmet stood
  at the line mines nothing; sixteen years of a chancellorship ending in 2021; the
  last reactors off in 2023; and behind all of it a number that owes nothing to
  politics, as the largest cohorts retire and too few follow.

  Its Tension gathers two old questions rather than predicting anything. The first
  is `plot_00`'s: the country took thirty years to call itself an immigration
  country and does not have thirty for the next round. The second is `Erinnern`'s:
  it held while there were witnesses, and the last are dying now.

  **Nothing was renumbered.** Nine plots stayed exactly where they were, which is
  what the two reserved numbers are for — four restagings this week each paid the
  renumbering cost that this convention removes.

  One new piece: `die Straßburger Eide`.

- 9b59e37: Germany stages the culture and not only the state.

  It is the culture the defining question was written about, and it had drifted
  back into the same shape. Six plots, all of them constitutional or catastrophic:
  a Reformation, a founding, a rupture, a Basic Law, an oil shock, a wall. Every
  counter clean. And read against the rule the order now carries — the words a play
  uses about itself, checked against its plots — three things it says about itself
  were staged nowhere.

  **There was no poet.** The cast was Luther, Bismarck, Adenauer, Kohl and two
  contemporaries: two churchmen and statesmen, two chancellors. Goethe and Weimar
  appeared in `REFERENCES.md` and in the file for the motorway. A culture whose Arc
  rests on `Können statt Rang` had staged every chancellor and no craft, and its
  Arc opens on a country that _grew together out of many parts_ while the play left
  354 years between 1517 and 1871 entirely empty — after a Tension that promises
  "die Spaltung, die daraus folgt" and then stages nothing that the split did.
  **Weimar und die Kulturnation** fills it: a duchy of a hundred thousand, a town of
  six thousand, and the claim that the nation exists as culture because it does not
  exist as a state. The Kleinstaaterei stops being a defect to be overcome in 1871
  and becomes the reason there is an opera house in every mid-sized German city.

  **There was no Gastarbeiter.** Zero occurrences, house-wide: no Anwerbeabkommen,
  no Turkey, no immigration, in the culture of the country that has them.
  **Wir riefen Arbeitskräfte** stages 1955 to 1973 and Mehmet, who came for a few
  years and stayed a life. Its Tension is the one a rule-keeping culture owes:
  thirty years calling immigrants guests and building the law around their leaving,
  until the 2000 citizenship reform tied belonging to birthplace and not only to
  descent.

  **And the origin was borrowed.** Germany tells its beginning as resistance to
  Rome, but the sources put the formation of anything German in the early Middle
  Ages, not in the year 9. So the plot is not the battle. **Hermann und die
  erfundene Vorzeit 1875** stages the deed that actually happened: a state four
  years old completing a fifty-three-metre monument to a Cheruscan it had to rename
  to recognise. The long `Erinnern` this country is known for begins here as its own
  opposite — a memory built because none was there — and the plot says so.

  Six plots become nine, renumbered chronologically. New cast: Goethe, who is
  Geheimrat as seriously as he is a poet; Mehmet; Weimar; the Hermannsdenkmal.
  Nothing was rehomed: reading the scenes rather than the casting map, `der Meister`
  is properly staged in Reichsgründung on the 1897 Meisterbrief law, and
  `das Ruhrgebiet` is properly staged in the Grundgesetz plot, which already carries
  the Wirtschaftswunder.

  Zero dead entries, zero wiring findings, zero conformance findings.

- 329f41b: Hamburg gains an origin, a present, and the plots the defining question found missing between them.

  **`plot_00` Die Hammaburg und Ansgars Norden.** Not the 1189 Freibrief the culture
  already celebrated, which is a privilege granted to an existing city, not the
  city's beginning. The Hammaburg, fortified around 808 at the Alster/Elbe
  confluence, gives the city its name. In 834 it becomes an archbishopric under
  Ansgar, aimed at Scandinavia, and in 845 a Danish fleet burns it down; the
  archbishopric moves to Bremen and the name stays behind on a place that no
  longer holds it. The plot stages the myth as a myth: what survives is mostly
  Rimbert's hagiography of his own predecessor, which modern scholarship reads
  with real caution.

  **Two words in the play's own Name and Arc that no plot carried.** "Hansestadt"
  and "Kaufmannsrepublik" were both asserted and never staged: the culture had a
  position for Hanseatic identity and no plot showing where it came from. `plot_02`
  Das Bündnis mit Lübeck 1241 stages the mutual-protection treaty commonly cited
  as the Hanseatic League's founding moment, a city-to-city alliance with no
  emperor or prince behind it, unlike the 1189 charter it now sits beside.

  **Two catastrophes the culture staged nothing between 1888 and the present
  tense of its gentrification plot.** `plot_04` Der Feuersturm 1943 stages the
  Hamburg firestorm and the district, Hammerbrook, that was never rebuilt as
  housing. `plot_05` Die Sturmflut 1962 stages the North Sea flood that drowned
  Wilhelmsburg while the Kontore on the Alster stayed dry, the same class line
  `das Hanseatentum` already named.

  **`plot_99` Das teure Jahrzehnt.** A record of 2017 to 2024: the Elbphilharmonie
  opening at roughly ten times its early budget, the G20 riots at the Rote Flora,
  and the port operator HHLA selling nearly half of itself to MSC while Antwerp
  and Rotterdam gain on Hamburg's own trade. Its Tension leaves open whether a
  port city that sells into its own harbor is still the merchant republic of 1241
  or something that has only kept the name, a question for the Stakes to hold, not
  a plot to answer.

  **Renumbered:** the 1888 Speicherstadt plot moves from `plot_02` to `plot_03`;
  the St. Pauli plot moves from `plot_03` to `plot_06`. Every cross-reference is
  repointed. Three new places (die Hammaburg, Hammerbrook, Wilhelmsburg) and two
  new pieces (das Mahnmal St. Nikolai, die Rote Flora) join the Company, each
  cast in the plot that introduces it.

  ***

  _On sourcing._ Outbound browsing is blocked in this environment - confirmed by
  `curl` to arbitrary domains, not merely inferred from a failed fetch - so nothing
  here rests on a source opened during the work. Search summaries and model
  knowledge are the ceiling. The plots were written to survive that: the 1943 death
  toll is given as `mehr als 34.000` rather than a precise figure the sources
  disagree about, and the 1241 alliance is staged as a founding moment of the Hanse
  while noting the formal league came only in 1356.

- 6ee7a14: Hesse now spans from its origin to its present, and the present is the one that
  actually happened.

  The culture had three plots, all sound, all Hessen-specific: the Paulskirche of
  1848, the founding of the state in 1945, and the rise of the Frankfurt finance
  hub. But its plot line began at 1848 and stopped at the postwar decades.

  `plot_00_donar_eiche_geismar_723.md` closes the floor: Bonifatius felling the
  oak sacred to Donar at Geismar bei Fritzlar in 723, in the land of the Hessi
  whose name becomes Hessen, staged explicitly as the telling Willibald's later
  hagiography gives and not as a neutral record (its Tension is exactly that
  gap). New Company: `place_geismar.md`, `piece_donar_eiche.md`.

  The first pass at the present staged Rhein-Main rent pressure. QA rejected it:
  real, but not what this decade did to Hessen, and the comfortable thing to
  write next to the harder one. Between June 2019 and February 2020 this Land
  was the site of three linked events the play omitted entirely. Kassel's
  Regierungspräsident, Walter Lübcke, was shot dead for publicly defending the reception of
  refugees, the first murder of a politician by the far right in the history of
  the Federal Republic. A racist attack in Hanau killed nine people, Gökhan
  Gültekin, Sedat Gürbüz, Said Nesar Hashemi, Mercedes Kierpacz, Hamza Kurtović,
  Vili Viorel Păun, Fatih Saraçoğlu, Ferhat Unvar, and Kaloyan Velkov, in and
  around two shisha bars. And the "NSU 2.0" threat letters, whose first target's
  personal data had been pulled from a Frankfurt police station's own computer,
  ran for years and cost Hesse's Landespolizeipräsident his post. Three events,
  one Land, one thread: the far right, and the state's own apparatus entangled
  with it.

  `plot_99_rechter_terror_2019_2020.md` stages that, handled at the register
  Germany's own Zivilisationsbruch plot sets: named victims, no euphemism, no
  passive voice standing in for who did what. It casts the murder against `die
Demokratie`, the position built on 1848, at the exact point Lübcke was
  exercising it, and the Hanau attack against `die Gemütlichkeit`, the position
  built on "alle gleich am Tisch," at the exact places that promise is supposed
  to hold. Both positions' `Loses` and `Drives` chapters are updated to carry
  that weight rather than leaving it to the plot alone. The police-data thread
  links `../germany/position_beamte.md`, the only kind of cross-culture link this
  house allows, because the same administrative thoroughness Germany's own plot
  named is what turned against the people it was supposed to protect. New
  Company: `place_kassel.md`, `place_hanau.md`. The Rhein-Main housing plot and
  `place_europaviertel.md` are dropped rather than kept as a lesser numbered
  plot; the play's Stakes chapter is rewritten to ask what the new plot_99
  actually tests, not what the old one did.

  Coverage, sub-national conformance and persona wiring all come out clean for
  de_hesse; `node tests/plot_zero.mjs --report` no longer lists it.

  ***

  _Review note._ The first draft of `plot_99` staged rents in Rhein-Main and did not
  mention Lübcke, Hanau or NSU 2.0. That was rejected in review: this house exists
  because Germany once staged its whole memory apparatus and no plot between 1871
  and 1949, and a Hessen that stages the Mietpreisbremse while omitting Hanau is
  that failure in miniature.

  The Stakes chapter was also rewritten to match the new plot and has been put back
  to a question. **The tell is defeated if the self-description is edited to match
  the plots:** the defining question works by comparing what a play claims about
  itself against what it stages, so a Stakes rewritten to narrate `plot_99`
  guarantees a match and tests nothing. It now carries both open questions - whether
  the openness claimed at the Bembel table survives being attacked, and whether the
  social balance holds against the pressure on housing - and it narrates neither.

- c94db70: Italy answers the defining question.

  Its arc was already a civilisation arc rather than a constitutional one, so the
  tell found holes rather than a wrong subject - and all four were words the Arc
  used about itself: campanile, famiglia, la televisione, Nord e Sud, none of them
  in a plot, and all eight dead Company entries sitting in those holes.

  `plot_00` answers the origin with a name rather than an empire: the Italic allies
  fight Rome in 91 BC in order to join it, and Italia exists as a word for nineteen
  centuries before it exists as a government. `plot_02` stages the communes, where
  campanilismo actually comes from. `plot_06` stages the television that finished
  what Manzoni started. `plot_99` records the first peacetime population decline
  since unification.

- 4c5227a: Fourteen of the sixteen German Länder become production packages, each declaring
  `@chbrain/khai-cultures-germany` as the parent its culture-position names.

  No content changed and no link was rewritten: every one of the fourteen was
  already at zero, already conforming, and already pointing at Germany by package
  specifier, because Germany's own migration rewrote those links when it moved. One
  command each.

  Schleswig-Holstein waits on `da` and Saxony on `en_us` and a REFERENCES link that
  escapes the package into `management/orders`. The new packages declare no bump of
  their own: none has been published.

- c78bc90: Liechtenstein answers the defining question, and becomes a package.

  Its three plots were a land purchase, an imperial elevation and a tax regime -
  the clearest case the house has found of a play staging a state and calling it a
  culture. `plot_00` answers the origin with the two settlements rather than the
  purchase: the Alemanni take the valley floor after Rome, the Walser come over the
  passes around 1300 and take the terrace above, and seven hundred years later the
  two are still audible in one sentence. `plot_03` gives the loyalty to the
  princely house a moment it can actually begin at - 1938, when the prince moved
  in, two hundred and thirty-nine years after the purchase. `plot_99` records the
  decade of the compliant financial centre and the commuted-in workforce.

  `@chbrain/khai-cultures-liechtenstein` is the second production package. It
  declares no bump of its own: never published, so its manifest version IS its
  initial version.

- 5593d15: The United Kingdom becomes the first production package,
  `@chbrain/khai-cultures-united-kingdom`.

  The umbrella keeps the count and gains the dependency it no longer keeps the
  files for; the registry lists all 290 and this entry names the package that ships
  it. Nine links elsewhere in the house - two personas and seven group files - are
  now package specifiers rather than relative paths, which is the whole point: a
  relative path resolves in this working tree and ships broken.

  Two links whose prose already named British English are corrected to point at the
  variety rather than the anchor; both were missed when `en_gb` moved.

  The new package declares no bump of its own: it has never been published, so its
  manifest version IS its initial version.

- a229c33: Saxony-Anhalt gets an origin, a present, and a Reformation plot staged from its
  own side instead of Germany's.

  The culture already existed but opened on Luther's theology (a plot Germany's
  own play already carries) and closed on a generic 1990 reunification, with
  no `plot_00` and no `plot_99`.

  **`plot_00` Die ottonische Gründung.** Heinrich I dies at Memleben in 936 and is
  buried at the Quedlinburg abbey his widow Mathilde founds; his son Otto makes
  Magdeburg his own seat and secures its archbishopric in 968, the first east of
  the Elbe, and is buried there in 973 beside Eadgyth of England. For a few
  decades the centre of an empire that did not exist before sits on this ground;
  then the crown moves on and this territory spends the next nine centuries as
  someone else's province, a tension the 1990s state and the 1999 disc both
  inherit unresolved.

  **`plot_01`, restaged.** Wittenberg's Reformation is now staged as what it meant
  to this place rather than the theology: Lucas Cranach's print shop turns
  Luther's translation into Europe's first mass-produced, branded religious
  media, printing the 1522 September Testament and the 1534 complete Bible and
  painting Luther's portrait into a trademark.

  **`plot_03`, restaged.** The 1990 reunification plot is replaced with the full
  administrative history: the 1945 merger of two Prussian provinces and the
  Free State of Anhalt, the 1947 constitution, the 1952 dissolution into
  Bezirke, and the 1990 Ländereinführungsgesetz reassembly, none of which ever
  shared a political history before the occupying power's own filing cabinet.

  **`plot_04`, new.** The chemical triangle (Leuna 1916, Buna-Werke Schkopau's
  1936 forced-labour synthetic rubber, Bitterfeld-Wolfen's post-1990 reputation
  as Europe's most polluted industrial area, and the roughly seventeen-billion
  euro remediation that followed) gets its own plot instead of a clause in the
  old reunification plot's Tension.

  **`plot_05`, new.** The Nebra sky disc: looted by metal detectorists in 1999,
  recovered in a 2002 sting, and made within a decade into the young Land's own
  borrowed founding icon, a tension deliberately mirrored against `plot_00`.

  **`plot_99` Das Jahrzehnt der Abrechnung, seit 2019.** A record, not a
  forecast: the 9 October 2019 Halle synagogue attack, whose locked door held
  and whose victims, Jana L. and Kevin S., are named; the Magdeburg chip fab,
  announced in 2022 as the largest single foreign investment in German
  industrial history and abandoned by Intel in July 2025 before any
  groundbreaking; a population down roughly a quarter since the 1950s; and a
  Landtag election on 6 September 2026 whose outcome this record cannot know.

  Five new personas (Otto, Cranach, Ingrid, Frank, Sophie), four new positions,
  five new pieces and places between them, two new processes and a second plan
  carry the new plots. Two self-descriptions in the existing Arc, one calling the
  Börde's famously fertile soil "karge Erde" and one naming only Halle and
  Magdeburg while dropping Anhalt from its own account of 1990, were left
  untouched and written up as disagreements in `REFERENCES.md` instead.

  Coverage, sub-national conformance and persona wiring all come out clean for
  Saxony-Anhalt.

  ***

  _Review note on scope._ This pass replaced two existing plots rather than only
  adding. Both replacements were checked and both stand.

  `plot_01` was Luther and the theses staged as theology, which is what the parent
  culture already does - so the child was restating its parent instead of saying
  what the Reformation was **here**. It is now Cranach's workshop: a court painter
  running a press from 1522, the woodcuts for the September Testament, Luther
  painted in series until the same face is itself the message, and out of a
  theological quarrel Europe's first media industry in one small town. The Arc's
  monk is still in the Cue; what changed is that the plot now explains why a
  university dispute in a town of a few thousand did not stay one.

  `plot_03` was an unexplained 1990 reunification. It is now the assembly,
  dissolution and reassembly from 1945 to 1990 - still an administrative fact, but
  an honest one rather than one dressed as an origin.

  _Two disagreements with the play's own self-description_, written into
  `REFERENCES.md` and deliberately not acted on, because editing the claim to match
  the staging defeats the defining question. The Arc calls this Land's earth `karg`
  while the Magdeburger Börde is some of the most fertile black earth in Germany;
  and the Arc says the Land was refitted in 1990 `aus Halle und Magdeburg`, which
  drops Anhalt, half of the Land's own name.

  _On sourcing._ Outbound browsing is blocked here, so nothing rests on a source
  opened during the work. The Nebra disc's dating is hedged rather than asserted,
  because specialists dispute it.

- 7d0a586: North Rhine-Westphalia gets the half of its own name it never staged.

  Three plots, every counter clean, and the play's own Name and Arc named a state
  that is "bevölkerungsreichste Land... zwischen Rhein und Ruhr" and a temperament
  split "rheinaufwärts... woll?" against "westfälisch weiter oben herrscht
  Schweigen" - but the plot line opened in 1850, after both halves already
  existed, and Westfalen appeared nowhere except as the silent, administratively
  joined other half of a 1946 marriage. Rheinland got a cathedral, a carnival, and
  a position of its own; Westfalen got an adjective in one Tension chapter.

  **`plot_00` (Zwei Ursprünge: Colonia und Westfalen)** opens the culture where the
  split actually starts, six to eleven centuries before any Land: Rome makes
  Cologne a colonia in 50 AD and its bishopric is attested by 313/314, while the
  Saxon lands to the east have neither city nor script until Charlemagne's Saxon
  Wars (772-804) - the name "Westfalen" itself is first recorded in 775, in the
  Frankish annals of the war that conquered it. Corvey's monks give the conquered
  Saxons their first written self-account in the late 10th century. Then, in 1180,
  the Archbishop of Cologne becomes Duke of Westphalia and rules both banks in
  person for six hundred years without producing one people - the exact gap
  "Operation Marriage" tried to close a second time in 1946, this time by
  administrative decree instead of by inheritance.

  **`plot_01` (Der Westfälische Friede 1648)** was first drafted as a paragraph
  inside the 1946 plot and corrected on review: an event this consequential,
  named after this place, signed in a room whose 1577 panelling is still on the
  wall, is not a paragraph inside another plot. It now stands on its own between
  `plot_00` and the Ruhr, staging Münster's Friedenssaal, the Thirty Years' War's
  end on 24 October 1648, and the irony underneath the word "westfälisch"
  international law still uses for state sovereignty: the Falen who gave the name
  its weight were the host and the backdrop, never a party at the table, a pattern
  1946 repeats. The existing plot line renumbers as a result (`plot_01` Ruhr
  Industrialization becomes `plot_02`, `plot_02` Operation Marriage becomes
  `plot_03`, `plot_03` Coal Phase-out becomes `plot_04`); `plot_00` and `plot_99`
  are untouched. `plot_03` keeps the 1648 material out and its own Tension about
  the two temperaments stands on the 1180-to-1803 rule this order already
  provided, not on the treaty.

  A new position, `die westfälische Wortkargheit`, fields the terseness the Arc
  names opposite Rhenish geniality, cast in `plot_00`, `plot_01`, and `plot_03`.
  A new persona, `Anton`, a Münsterland Mittelstand archetype, holds it, since a
  position file needs a persona's Taxonomy to claim it.

  **`plot_99` (Das Hochwasser 2021 und die Braunkohle)** now carries two beats from
  the same still-resolving decade: the July 2021 flood (storm "Bernd", the
  Erftstadt-Blessem gravel-pit collapse, at least 49 dead in the Land), and the
  accelerated lignite phase-out agreed 4 October 2022, which brought the Rhenish
  coal exit forward to 2030 and cost the village of Lützerath, cleared for the
  Garzweiler mine from 11 January 2023. Water arriving and coal still being dug in
  the same Land in the same decade is one story, and more specifically NRW's than
  either half alone; the parent culture stages the Ruhr hard-coal closure but says
  nothing about lignite.

  Three plots become six (plus the two reserved outside the numbered sequence).
  Two new places (`Kloster Corvey`, `das Rathaus Münster`), one new position
  (`die westfälische Wortkargheit`), and one new persona (`Anton`), all cast.

- d9fe718: Saxony's plot line had a floor and a ceiling missing, and both were invisible.

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

- 0049a72: Switzerland stages where its four languages came from, and the pass it exists
  because of.

  Its **Name** chapter says `Confoederatio Helvetica`, and the Helvetii appeared in
  no other file in the culture. `alemann`, `burgund` and `römer`: zero each.
  `gotthard`: one passing mention, `säumer` and `transit`: none, and no mountain
  anywhere in a Company whose Arc rests on `Berg und Stadt`.

  **Die Helvetier und die vier Zonen** takes the culture's defining fact away from
  politics. Caesar stops the Helvetii at Bibracte in 58 BC and writes down the name
  that is on the coins today. Rome takes the Mittelland, and four hundred years
  later leaves. The Alemanni arrive in numbers and the Latin disappears with them;
  the Burgundians take the west as a thin ruling layer and adopt the speech they
  find, so the Latin survives there and becomes French; the high eastern valleys are
  too remote for either and keep a Latin of their own; and south of the Alps Rome
  never left. Four zones, drawn between the fifth and the seventh century, still
  roughly where they came to lie — staged with the four places the culture already
  had, one per zone.

  Its Tension is the correction: four languages are **not a decision, a merit or a
  compromise**. They are what an empire's reach and the direction of its collapse
  left behind, fourteen hundred years before anyone made a Bund of it, and what
  `plot_08` confirms at the ballot box in 1938 is the late recognition of a
  situation that predates the Confederation.

  **Die Öffnung des Gotthards** supplies the mountain, and it is a trade and not a
  legend. Around 1220 the Schöllenen gorge is bridged and the shortest line to Italy
  opens. `der Säumer` drives the mule trains, salt and cloth up, rice and wine down;
  the valley men run the transport themselves in cooperatives, maintain the road
  nobody maintains for them, and grow rich. The emperor, who wants the road open,
  gives Uri its Reichsfreiheit in 1231 and Schwyz in 1240.

  Its Tension says the awkward part out loud: **this freedom was given, not won.**
  The emperor needed the pass and paid for it with self-government, which sits at an
  angle to the story the country tells about itself on the Rütli. What does begin
  here and holds: a polity whose worth is that everyone has to pass through it, that
  administers the route rather than being administered, and that is well advised to
  take nobody's side because it wants to be needed by all. The neutrality this
  country later raises to a principle is here first a business model.

  Nine plots become eleven. New: `place_gotthard` and `persona_saeumer`.

  **Nothing was rehomed.** `piece_fondue` and `process_jassen` are cast only in the
  1971 suffrage plot, which looked like parking and is not: the Jass table is where
  the motion is argued out before it reaches the urn, and the fondue is the common
  pot the country declared its own dish in those same years. Read the scene, not the
  casting map.

- dd979ae: Switzerland stages the arc its own Arc already claimed. Five new plots fill the gaps between the four that existed: die Reformation und die Kappelerkriege 1523-1531 (Zwingli in Zurich, Calvin's call to a not-yet-Swiss Geneva, and der Konfessionsfrieden that lets two confessions share one Bund), der Wohlstand 1934 (Huguenot refugees founding the Jura watch industry, and das Bankgeheimnis cut into law), der Sprachenartikel 1938 (Bundesrat Etter's "geistige Landesverteidigung" against fascist claims on Romansh and Ticino, which finally casts Gian and Marco honestly and retires both their coverage waivers), die Kriegsjahre 1939 bis 1945 (General Guisan's Rutli address and the Reduit, told beside the J-stamp and the refugee policy that turned thousands back at the border, some to their deaths, in the register the Zivilisationsbruch plot in Germany's own culture sets as the standard of honesty), and das Nein zum EWR 1992 (the Arc's closing question, whether the will to unity holds when the languages pull apart, answered on a map split almost exactly along the Rostigraben). The four existing plots renumber to their chronological places (02 to 08, with the new plot_02 and plot_05 through plot_09 taking the gaps) and every cross-reference is repointed. New cast: personas Zwingli, Calvin, Etter, Guisan, and the banker Urs; places Zurich, die Surselva, das Tessin, and das Reduit; the piece die Uhr; and the positions der Konfessionsfrieden and das Bankgeheimnis. Switzerland comes out at zero dead Company entries and zero persona-wiring findings, with coverage-waivers.json removed. Existing content, no new culture: a patch.
- a695721: Switzerland spans origin to present.

  Die Helvetier und die vier Zonen was already the origin; it becomes `plot_00` and
  nothing else moves.

  **`plot_99` Was halten sollte, seit 2014.** A record and not a forecast. On 9
  February 2014 the people accept an immigration initiative by 50.3 per cent that
  does not fit the free movement in the bilateral treaties, and the country spends
  years implementing a vote without losing the treaties. It formally withdraws its
  1992 membership application in 2016 and breaks off seven years of framework talks
  in 2021. Meanwhile two things that were supposed to be permanent end: from 2017
  account data is exchanged automatically, so `das Bankgeheimnis` — written into law
  in 1934 — no longer holds against foreign states; and in March 2023 Credit Suisse
  falls over a weekend after a hundred and sixty-seven years, absorbed by UBS under
  federal supervision, leaving one big bank on the Paradeplatz where Urs learned the
  trade. In between, in 2016, the Gotthard base tunnel opens: fifty-seven
  kilometres, within budget and ahead of schedule.

  Its Tension reads the distribution rather than predicting from it:

  > Was dieses Land selbst gebaut und selbst verwaltet hat, hält, wie seit
  > achthundert Jahren am Berg; was seinen Wert daraus zog, dass andere es brauchten
  > und niemand hineinsah, hält nicht mehr, weil die anderen es nicht mehr
  > hinnehmen.

  That closes a circuit with `plot_02`, which established that the neutrality was
  first a business model — and a business model ends when the customers change the
  terms. The question left open is the one the country has deferred since 1992:
  whether a Sonderfall can stay one when it is enclosed on all sides by a single
  market it already shares most things with.

  No new cast. Urs, the Bankgeheimnis, Zürich and the Gotthard were all already in
  the Company.

- 5ef8b9d: The groups were never in the tarball.

  `files` listed `cultures/**` and not `groups/**`, so `npm pack` produced 7,038
  files and **not one of the 19 groups** — the Anglosphere, ASEAN, the Baltics,
  DACH, the EU, the Visegrád four and thirteen more, 114 files in all. They are
  the second half of what CLAUDE.md says this package is: _the cultures, the
  groups, the registry._

  It is the tongues bug again, one package over and caught before the release
  instead of after. There, `files: ["*.md"]` packed 5 of 65 because every variety
  lives in a subdirectory. Here the pattern was right and the directory was
  missing, and the effect is identical: **`registry.json` ships describing all 19
  groups, and every path it names 404s** for anyone who installs the house rather
  than checking it out.

  Nothing else had to change. The linkage runs one way — 873 links from the groups
  into the cultures, none the other way — so the cultures were always
  self-sufficient and the groups were the only casualty. With them packed, all
  1,043 relative links inside `groups/**` resolve within the tarball, checked by
  resolving each one against the packed tree.

  7,038 files becomes 7,152.

- d52e85f: **The registry says where every culture lives, and five groups get their members
  back.**

  A consumer reading this house resolved a culture one way: the umbrella's
  collection directory, one subdirectory per unit. The ratchet made that false for
  a growing share of the entries, and the registry said so for the migrated ones
  only — `package` on those, nothing on the rest. Absence was left to mean "under
  the umbrella", and a reader cannot tell an entry it understood from one it
  merely defaulted.

  Every entry now carries the kit's `source`: the npm package that ships the
  culture and the path below its root. `cultures/<id>` under the umbrella, `""`
  for a culture that has become its own package — there the package root IS the
  unit. `package` stays for one minor as a deprecated mirror of `source.package`.

  The groups are the part that was already wrong in public. `references` is
  derived from a group play's casts, and a cast that became a package specifier
  stopped being read — so the derivation returned fewer members, or none, and said
  nothing. Five of nineteen groups were short: `anglosphere` missing
  `united_kingdom`, `eu` missing `austria` and `germany`, `francophonie` missing
  `switzerland`, `nato` missing `germany` and `united_kingdom`, and `dach` missing
  all three of its members. Nine memberships. Only `dach` was noticed, because
  only `dach` went to zero.

  The kit reads both link shapes now, and this house hands it the one thing it
  cannot know: `packageIds`, the npm name of every production mapped to the
  culture it ships, derived from the productions present rather than kept as a
  list. Every group derives its full membership again, and a group that derives
  none is a build failure rather than a quietly empty field.

- c6f2f26: German Standard German becomes a variety, and stops being the language wearing a
  variety's name.

  What germany held as `position_language_de_de.md` was the anchor's material word
  for word — the compound noun, the Satzklammer, three genders and four cases,
  Sie/du — under a variety's title. It is retired rather than moved, and a real
  `de/position_language_de_de.md` is written in the tongues package: the sharp s
  and the distinctions it can write, the unmarked lexicon, `Januar` against
  `Jänner`, `habe gesessen` against `bin gesessen`, the compound without the
  Fugen-s, and the one fact that carries both its Has and its Loses — it is the
  variety the dictionaries of the whole area leave unmarked.

  The twenty-two cultures that linked the old file are relinked, and not all to the
  same place: germany's modern cast, its culture-position and its play hold the
  variety; Luther, Goethe and the 842 origin plot hold the anchor, as does every
  culture that held a foreign, inherited or historical German.

  The tongues package declares no bump: it has never been published, so its manifest version IS its initial version and a bump here would skip it.

- 7924b4d: British English becomes a variety, and stops being the language wearing a
  variety's name.

  What united_kingdom held as `position_language_en_gb.md` was the `en` anchor's
  material - the doubled vocabulary, the phrasal verbs, the strict word order, the
  flat `you` - and nothing in it distinguished this variety from any other English.
  It is retired, and a real `en/position_language_en_gb.md` is written: the
  noun/verb spelling pairs the other large form collapsed, the bare institution,
  agreement by sense with a collective, the unlearnable spelling list, and the
  absence of `gotten` as a lost distinction rather than a lost irregular.

  Of the 167 links to the old file only two were mother-tongue processes, so the
  relink follows the holding: united_kingdom's own cast and one Briton abroad hold
  the variety, and the other ninety-three cultures - who carried English as a tool
  or wore it as an imposition - hold the anchor.

  The tongues package declares no bump: it has never been published, so its
  manifest version IS its initial version.

- f67dcfb: French Standard French becomes a variety.

  The fourth file in a row that was the language wearing a variety's name, and the
  fourth time the anchor stated the shared material better. The real one earns its
  file on the numerals (`soixante-dix` against `septante`), the meals - the same
  three words for three other moments of the day a few hours away - the unmarked
  lexicon, and the feminisation of job titles that other standards settled in the
  eighties and this one admitted in 2019, which is the clearest case of a norm that
  is decided rather than observed.

  The relink was read culture by culture rather than counted, because unlike the
  previous three this tongue has many foreign mother-tongue holders. Every one
  resolved to the anchor: Prince Eugene was born in 1663, Haiti's own prose calls
  it `lang lakoloni an`, and Mauritius's Chazal holds Mauritian French.

- e5a0844: Italian Standard Italian becomes a variety, and Switzerland becomes the third
  production package.

  What italy held as `position_language_it_it.md` was the `it` anchor's material -
  pro-drop, the congiuntivo, gender agreement, the geminates - and the anchor
  states the geminates better, as a capacity rather than a loss. It is retired, and
  a real one is written: the unmarked lexicon against the CH-marked one, the
  passato remoto the written norm requires of speakers half of whom no longer say
  it, a standard modelled on a library rather than an administration, and the
  second system almost every holder has beside it.

  Of the links to the old file, not one outside italy was a mother-tongue process,
  so italy's own cast holds the variety and the other sixteen cultures hold the
  anchor. `it_it` was switzerland's last blocker.

- 0fa5a28: Turkish moves as the anchor it always was, and Germany becomes a package.

  The four tongues before this one were each the language wearing a variety's name
  and were retired, because the package already held an anchor that said the same
  material better. This one is the same kind of file and the opposite case: it IS
  the Turkish language, correctly written, and the package held no `tr` anchor at
  all - its own frontmatter said `The Turkish Language`. So it moves rather than
  retires, and no `tr_tr` variety is invented, because there is no sibling to
  distinguish it from.

  `tr` was germany's last blocker. `@chbrain/khai-cultures-germany` is the fifth
  production package, and it unblocks fourteen of the sixteen Länder at once.

  The declared range on the tongues package moves from `^0.20.0` to `^0.21.0` in
  every manifest that carries it: the tongues minor is its language count, so a new
  language invalidates every range that pinned the old one.

- b6e1c18: Danish and American English leave the cultures that were holding them, and the
  last two German Länder become packages. Sixteen of sixteen.

  `da` moves as an anchor, the fifth tongue to do so after `tr`, `hu`, `la` and
  `cs`: what `denmark` held was the Danish language and not a variety of it - its
  own frontmatter said `det danske sprog` - and the package had no `da` anchor. No
  `da_dk` is invented, because there is no sibling here to distinguish it from.
  Seven cultures held it and all seven now hold the anchor.

  `en_us` is the first tongue that needed neither retiring nor inventing: already
  a variety, already correctly named, only ever in the wrong package. So it is a
  plain rename into the `en` anchor that was already there, byte for byte, and
  the reading against the mnemonic is deliberately kept out of the move. It still
  owes the entry price - what it carries is rhoticity, which is sound and cannot
  go in a text file, and verbing nouns, which `en_gb` does too - and its
  provenance entry now says so, along with what it should carry instead and what
  its General American material wants trimming for. That reading is the next pull
  request, and it charges nobody, because by then the file lives here.

  With their blockers gone, `de_schleswig_holstein` and `de_saxony` migrate. Saxony
  also loses two `REFERENCES.md` links that escaped four levels up into
  `management/orders`; the order is now cited the way every other migrated package
  cites it, by path in backticks.

  The tongues package's minor IS its language count, and Danish is the
  twenty-fifth, so its build moved it `0.24.0 -> 0.25.0` and its own `syncRanges`
  carried that into all twenty-one dependants - which is exactly the failure that
  function was written for. It declares no bump of its own; it has never been
  published. Neither do the two new Länder packages.

- 31f2718: Hungarian, Latin and Czech move as the anchors they always were, and Austria
  becomes a package - so all four DACH countries are now productions.

  None of the three was a variety wearing a language's name or the reverse: each
  was the language itself, correctly written, with no anchor for it in the package.
  So all three move and nothing is invented. Latin is the notable one: thirty-seven
  cultures hold it, every single one as a carried, read or deciphered tongue and
  none as a mother tongue, and it is the clearest case for the package's own rule -
  a tongue is held by the speech community that speaks it, and Latin has none at
  all.

  Austria needed exactly these three. It is the twentieth production package.

- 94511d6: The tongues package publishes, and the house pulls it.

  Four things were between it and a working release, and the first would have made
  the release a no-op.

  **It packed 5 files of 65.** `files: ["*.md"]` reaches only the package root and
  all sixty tongues live in subdirectories, so a publish would have shipped a
  README, a REFERENCES and the root position while every one of the 236 links in
  `cultures/**` still 404ed. `**/*.md` packs 65.

  **Changesets could not see it.** No `workspaces` field, so the release managed one
  package. Added in the window the last Version Packages opened: #373 showed that
  adding it invalidates pending changesets, and there were none.

  **Its version rule had no seat in the release.** `build.mjs --write` now runs
  inside the `version` script, where the registry build already sits for the root,
  so a changeset bump cannot drift the package off its language count.

  **And it was private, and a devDependency.** `private` is gone and it carries the
  same `publishConfig` the root already uses — GitHub Packages, public access — so
  nothing global changed. It moved to `dependencies` at `^0.20.0`, because a package
  must pull what its content links: installing the house now installs the tongues.

  After this release the 236 links resolve for the first time for anyone who
  installs the house rather than checking it out.

- 9c241d9: Russian and Church Slavonic leave `russia`, which was holding both of them for
  everybody else.

  `ru` moves as an anchor, the sixth after `tr`, `hu`, `la`, `cs` and `da`. What
  `russia` held was the Russian language and not a variety of it - its own
  frontmatter said `русский язык` - and the package had no `ru` anchor. No `ru_ru`
  is invented; there is no sibling here to distinguish it from. It is **the widest
  move this package has taken in: 57 files**, more than any tongue before it,
  reaching well past the Slavic world, because Russian is the tongue an empire and
  then a union taught to everyone inside it.

  `cu` moves with it, and for the reason `la` did: **this is the Latin case in
  Cyrillic.** A liturgical tongue is not a country's property, it has no speech
  community at all, and of the thirteen files holding it nine are outside `russia`

  - belarus, bulgaria, lithuania, moldova, montenegro, romania, serbia and ukraine
    twice - each reaching into another culture's directory for the language of its
    own altar. It belonged under `russia` even less than the others belonged under
    theirs. It is written in itself, in the pre-reform orthography, and its own best
    sentence is its `Loses`: the dual number and the aorist have no place left in
    living speech, because the Russian born from it collapsed the past tenses into
    one and kept the dual only in traces, `очи`, `плечи`.

  Both were read against the mnemonic on the way through and nothing was cut.

  Two findings are recorded in `cu`'s provenance and deliberately not acted on
  here, because a move is a move. The file says in its own `Drives` that a book
  language can stay alive in the altar having never been alive in the mouth, which
  is exactly the criterion `mother_tongue: false` exists for - and it is not
  flagged, because `la` is not flagged either, and Latin is the clearest
  never-acquired-first tongue in the house at 37 cultures. Flagging one means
  deciding the other. What such a flag would catch is the second finding: eleven of
  the twelve personas holding this tongue read it at `process_reading_followed`,
  and montenegro's Njegoš alone reads it at `process_reading_mother_tongue`, in a
  sentence that calls it the tongue `свога владичанског чина и службе` in the same
  breath. He is the outlier against the house's own practice. Fixing him is not
  cheap: montenegro carries five dead Company entries, so authoring him owes a
  Montenegro content pass.

  The move unblocks four cultures at once - czechia, france, holy_see and usa are
  now ready to migrate - and leaves `russia` itself blocked on one link only,
  Pyotr's Dutch.

- aaa94e3: Turkey answers the defining question.

  Its Arc was already cultural, and the tell still found three holes, all of them
  things the Arc says about itself. The steppe: the play opened at Manzikert, four
  hundred years after the people set out, so `plot_00` goes to the Orkhon stones of
  732, where this people writes about itself for the first time and carves the word
  Türk - an origin that is an act of writing, in the first of the three alphabets
  its name has been written in. The two continents: `plot_04` stages the exchange
  of 1923, which settled who lived on them by a list and a criterion. And the
  everyday: five dead entries were the whole material culture, so `plot_05` stages
  the quietest revolution in the play - the state planted tea in Rize in 1924 and
  within a generation the country drank something else, and nobody counted it a
  loss.

  A prerequisite: retiring `position_language_tr_tr` authors Turkey, and Turkey is
  the last tongue between Germany and its package.

- 26cacea: The United Kingdom answers the defining question.

  The play's own words named a global power, the world it once ruled, the common
  tongue and the orderly queue, and not one of them appeared in a plot: four plots
  stood here and all four were moments of the constitution. Three answer it. 1066,
  because the play had no origin and the Conquest is where the island stops being
  conquered and starts being layered, leaving the doubled tongue and the order of
  rank carried in the choice between its halves. 1897, because an empire of a
  quarter of the world cannot be a thing the Stakes allude to and no scene admits.
  1948 to 1971, because the empire came home and that is what made the Britain the
  modern cast lives in. `plot_99` records the decade of leaving.

  Coverage goes to zero with no waivers: ten dead Company entries, every one of
  them a fact the play already asserted about itself with nowhere to stand.

- 14244d0: Vreni writes Standard German as the second language it is.

  The link on `schreibt` was `process_writing_mother_tongue`, in the same sentence
  that says _"eine Sprache, die sie so gar nicht spricht"_. The prose was right and
  the wiring contradicted it: her mother tongue is Schwiizerdütsch, which she never
  writes, and the German she writes she has never spoken.

  It is `process_writing_polished` now — _"the turn that sounds native"_, which is
  exactly the width. She writes it well enough to pass, and it is still not hers.

  Found by the persona-wiring gate on its first run, in a file I had read closely
  and called the best statement of the diglossia in the house. I read the sentences
  and never checked the link.

- dbc6886: Five personas named their tongue in prose and never linked it.

  The persona-wiring gate's first rule is that a grip needs a tongue: a Projection
  that says how well someone speaks and never says _what_ has named a width with
  nothing under it. Nine personas stood in that debt. Five of them were only ever
  a missing link — Mahfouz and Umm Kulthum open on `العربية`, Munshi, Ramlee and
  Usman on `Bahasa Melayu`, and both `position_language_ar_eg.md` and
  `position_language_ms_my.md` were already written and sitting in the culture
  beside them. The word is now the link. No prose changed.

  **Four are left, and they are a different thing.** Nauru's catcher and miner
  hold Nauruan as their mother tongue; Equatorial Guinea's Ndongo and Nsue hear
  Fang at home and write Spanish. Nauru ships only `position_language_en_nr.md`
  and Equatorial Guinea only `position_language_es_gq.md`, so those grips have no
  tongue to link because **the tongue does not exist yet** — not because nobody
  linked it.

  Linking the English and Spanish positions would have cleared all four findings,
  because the rule is read per persona rather than per grip. That would have been
  green by the letter and false by the sentence: it would have put Nauruan
  speech under an English position. The four findings stay reported instead, which
  is what the debt actually looks like. Writing the two missing positions means
  writing Has / Orders / Loses / Drives _in_ Nauruan and _in_ Fang, and that is
  its own piece of work, not a link.

  **And touching two cultures brought their coverage debt with it**, which is what
  the ratchet is for. Egypt was carrying four dead Company entries and Malaysia
  six — all of them things the plots were already about and never linked. The
  obelisk and the papyrus go into the Pharaonic plot, where the Action already has
  the scribe cutting script into stone and papyrus and the Tension already has the
  king's name outlasting the man who raised the block; the flood joins it as the
  rhythm the state and the field were both built on. The oud goes under Umm
  Kulthum's voice in the Nahda, and the ahwa gives Mahfouz the seat he watched his
  alley from. Melaka's plot gains Islam taking root in the port before it spread
  through the archipelago, and the songket that marked rank in its hall. The
  Federation plot gains the everyday the nation was actually assembled out of —
  the mamak table that seats every community past midnight, the yearly balik
  kampung, Pak Tua keeping the adat that is returned to, and the wau still going
  up over the village.

  No scene was invented to satisfy the counter: every one of the ten was cast
  where the plot was already standing.

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
