// Fallback-/seed-produkter til webshoppen.
// Supabase-tabellen `shop_products` er kilden til sandhed når den har data
// (se lib/getProducts.js). Disse bruges som nødbackup og til at seede.
//
// Kataloget er opbygget ud fra Træklatreskolens eget udstyrsarkiv (Shop.zip)
// og kategorinoterne i "Indhold klatrepakker.doc".
//
// VIGTIGT: Priserne er ESTIMEREDE vejledende priser (2026) og skal
// gennemgås og justeres, før shoppen går live. Pakkepriserne er opdateret
// skøn ud fra de oprindelige pakkepriser (7.634 kr. / 15.706 kr., ca. 2010).
//
// Priser er i hele kroner (DKK). Checkout omregner til øre server-side.

export const SHIPPING = {
  // Fast fragt og fri fragt over et beløb (begge i kr).
  flatRate: 49,
  freeOver: 750,
};

// Kategorirækkefølge på shop-siden. Klatrepakkerne står øverst, fordi de er
// shoppens kerne: komplette, gennemprøvede sæt med vejledning i købet.
export const CATEGORIES = [
  "Klatrepakker",
  "Reb & liner",
  "Kasteposer & kasteliner",
  "Rebbremser & sikring",
  "Karabiner",
  "Slynger & stiger",
  "Seler",
  "Hjelme",
  "Tasker & opbevaring",
  "Lejr & lejrliv",
];

export const products = [
  // ── Klatrepakker ────────────────────────────────────────────────────────
  {
    slug: "klatrepakke-2-personer",
    name: "Klatrepakke til 2 personer",
    short: "Komplet, gennemprøvet udstyrssæt til to klatrere — sammensat af vores instruktører.",
    price: 9495,
    category: "Klatrepakker",
    image: "/images/shop/klatrepakke-2-personer.jpg",
    description:
      "Alt hvad to personer skal bruge for at klatre sikkert i træer — sammensat af de samme instruktører, der underviser på vores kurser, og med præcis det udstyr vi selv bruger i undervisningen. Pakken indeholder bl.a. 2 dynamiske reb (Millet Diamond Triaxiale 60 m), prusiksnore, seler, rebbremser, karabiner, slynger og en vandtæt pakpose til det hele. Ved køb af en klatrepakke følger en grundig introduktion til udstyret — og vi anbefaler altid at kombinere pakken med et kursus, så I bliver fortrolige med teknikkerne.",
    bullets: [
      "2 × dynamisk reb — Millet Diamond Triaxiale 60 m",
      "10 × Kernmantel prusiksnor 5 mm",
      "Seler, hjelm-/sikringsudstyr og 2 × Black Diamond ATC",
      "25 × karabiner (HMS og Petit Dru) og 20 × slynger",
      "Ortlieb X-Tremer XL 109 L til opbevaring",
      "Introduktion til udstyret følger med købet",
    ],
  },
  {
    slug: "klatrepakke-klub",
    name: "Klatrepakke til klubber, instruktører & foreninger",
    short: "Stor klatresæk til hold — udstyr til gruppeklatring med flere systemer i gang ad gangen.",
    price: 18995,
    category: "Klatrepakker",
    image: "/images/shop/klatrepakke-klub.jpg",
    description:
      "Vores store pakke til klubber, foreninger, skoler og instruktører, der vil have flere klatresystemer kørende samtidig. Indholdet svarer til det grej, vi selv stiller op med, når vi underviser hold: 4 statiske og dynamiske reb, hjelme, jumar og grigri til opstigning og nedfiring, masser af karabiner og slynger — alt sammen pakket i en vandtæt Ortlieb-sæk. Ved køb følger en introduktion til udstyret, og vi tilbyder instruktøruddannelse, så jeres egne folk bliver kvalificerede til at bruge det.",
    bullets: [
      "2 × Millet Diamond Triaxiale 60 m + 2 × Millet Spelunca 60 m",
      "10 × Kernmantel prusiksnor 5 mm",
      "2 × Petzl Elios hjelme, 2 × Ascension, 2 × Grigri",
      "42 × karabiner og 30 × slynger",
      "2 × Black Diamond ATC og 4 × seler",
      "Introduktion til udstyret følger med købet",
    ],
  },

  // ── Reb & liner ─────────────────────────────────────────────────────────
  {
    slug: "millet-diamond-triaxiale-60m",
    name: "Millet Diamond Triaxiale — 60 m",
    short: "Dynamisk klatrereb — det reb vi selv klatrer på til undervisning.",
    price: 1795,
    category: "Reb & liner",
    image: "/images/shop/millet-diamond-triaxiale.jpg",
    description:
      "Et slidstærkt dynamisk reb med god håndtering — rygraden i vores egne klatresystemer. 60 meter rækker til selv høje danske skovtræer, og den dynamiske kerne absorberer energien ved belastning. Vi underviser i rebhåndtering, knob og opsætning på alle vores kurser.",
    bullets: [
      "60 meter længde",
      "Dynamisk — absorberer fald",
      "God håndtering, også med handsker",
      "Det reb vi selv bruger i undervisningen",
    ],
  },
  {
    slug: "millet-spelunca-60m",
    name: "Millet Spelunca statisk reb — 60 m",
    short: "Statisk reb til faste installationer, nedfiring og rebbaner.",
    price: 1595,
    category: "Reb & liner",
    image: "/images/shop/millet-spelunca.jpg",
    description:
      "Statisk reb med minimal strækning — det rigtige valg til faste systemer, opstigning på reb, nedfiring og rebbaner. Indgår i vores store klatrepakke til klubber og foreninger. Husk: statiske og dynamiske reb bruges til forskellige ting — er du i tvivl, så spørg os, eller lær forskellen på et af vores kurser.",
    bullets: [
      "60 meter længde",
      "Statisk — minimal strækning",
      "Til opstigning, nedfiring og faste systemer",
      "Slidstærk kappe",
    ],
  },
  {
    slug: "kernmantel-prusiksnor-5mm",
    name: "Kernmantel prusiksnor 5 mm — pr. meter",
    short: "Prusiksnor til friktionsknob — selve hjertet i klatresystemet.",
    price: 14,
    category: "Reb & liner",
    image: "/images/shop/kernmantel-prusik.jpg",
    description:
      "Kernmantel-snor på 5 mm til prusikknob og andre friktionsknob — den lille snor, der holder dig fast på rebet, når du klatrer. Prisen er pr. meter; bestil det antal meter du skal bruge (vi anbefaler ca. 1,5 m pr. prusik). På vores kurser lærer du at binde og bruge prusikken korrekt.",
    bullets: [
      "5 mm kernmantel-konstruktion",
      "Prisen er pr. meter — vælg antal meter i kurven",
      "Til prusik- og friktionsknob",
      "Vi lærer dig at bruge den på vores kurser",
    ],
  },

  // ── Kasteposer & kasteliner ─────────────────────────────────────────────
  {
    slug: "kastepose-250g",
    name: "Kastepose 250 g",
    short: "Arborist-kastepose til at få linen op over den første gren.",
    price: 179,
    category: "Kasteposer & kasteliner",
    image: "/images/shop/kastepose-250g.jpg",
    description:
      "En klassisk arborist-kastepose på 250 gram. Med kastepose og kasteline får du dit klatresystem op over selv høje grene — det første, vi lærer fra os på alle træklatrekurser. Slidstærkt yderstof og solid fastgørelsesring.",
    bullets: [
      "250 gram — god allround-vægt",
      "Slidstærkt yderstof",
      "Solid ring til kastelinen",
      "Kasteteknik indgår i alle vores kurser",
    ],
  },
  {
    slug: "edelrid-kasteline",
    name: "Edelrid kasteline",
    short: "Glat, synlig kasteline med lav friktion over grenen.",
    price: 279,
    category: "Kasteposer & kasteliner",
    image: "/images/shop/edelrid-kasteline.jpg",
    description:
      "Kasteline fra Edelrid i kraftig signalfarve, så du altid kan følge linen i kronen. Glat overflade giver lav friktion hen over grenen, når rebet skal trækkes op. Bruges sammen med en kastepose.",
    bullets: [
      "Tydelig signalfarve",
      "Glat — lav friktion over grenen",
      "Let og stærk",
      "Bruges sammen med kastepose",
    ],
  },
  {
    slug: "edelrid-spring-bag",
    name: "Edelrid Spring Bag",
    short: "Foldbar kube til kasteline — linen ligger altid klar uden kludder.",
    price: 429,
    category: "Kasteposer & kasteliner",
    image: "/images/shop/edelrid-spring-bag.jpg",
    description:
      "Sammenklappelig line-kube fra Edelrid. Kastelinen lægges løst i kuben og løber kludderfrit ud ved kast — og det hele kan foldes fladt sammen og pakkes i klatresækken. En lille ting, der sparer meget tid i skoven.",
    bullets: [
      "Holder kastelinen kludderfri",
      "Foldes fladt sammen efter brug",
      "Hurtigere opsætning af systemet",
      "Plads til line og kastepose",
    ],
  },

  // ── Rebbremser & sikring ────────────────────────────────────────────────
  {
    slug: "black-diamond-atc",
    name: "Black Diamond ATC",
    short: "Klassisk rebbremse til sikring og nedfiring — enkel og driftsikker.",
    price: 139,
    category: "Rebbremser & sikring",
    image: "/images/shop/black-diamond-atc.jpg",
    description:
      "Den klassiske tube-rebbremse fra Black Diamond. Enkel, let og driftsikker — derfor er det også den bremse, vi bruger, når vi lærer nye klatrere at sikre hinanden. Fungerer til både sikring og nedfiring.",
    bullets: [
      "Enkel og driftsikker tube-bremse",
      "Til sikring og nedfiring",
      "Letvægt",
      "Den bremse vi underviser med",
    ],
  },
  {
    slug: "black-diamond-atc-xp",
    name: "Black Diamond ATC-XP",
    short: "ATC med ekstra bremsekraft via friktionsriller — god til tynde reb.",
    price: 189,
    category: "Rebbremser & sikring",
    image: "/images/shop/black-diamond-atc-xp.jpg",
    description:
      "ATC-XP har friktionsriller, der giver markant mere bremsekraft end den klassiske ATC — en fordel ved tynde reb, tunge klatrere eller lange nedfiringer. Samme enkle betjening, mere kontrol.",
    bullets: [
      "Friktionsriller — ekstra bremsekraft",
      "To friktionsindstillinger",
      "God til tynde reb og lange nedfiringer",
      "Letvægt",
    ],
  },
  {
    slug: "petzl-grigri",
    name: "Petzl Grigri",
    short: "Rebbremse med bremseassistance — standarden til sikring af mange klatrere.",
    price: 949,
    category: "Rebbremser & sikring",
    image: "/images/shop/petzl-grigri.jpg",
    description:
      "Petzl Grigri er rebbremsen med mekanisk bremseassistance: kammen klemmer rebet fast ved pludselig belastning. Det giver en ekstra sikkerhedsmargin, når mange skal klatre — derfor indgår den i vores klubpakke, og derfor sikrer vi selv med den på events. Kræver korrekt betjening: Grigri-håndtering indgår i vores instruktøruddannelse.",
    bullets: [
      "Mekanisk bremseassistance",
      "Velegnet til topreb og mange klatringer",
      "Kontrolleret nedfiring med håndtag",
      "Korrekt brug indgår i vores instruktørkurser",
    ],
  },
  {
    slug: "petzl-reverso",
    name: "Petzl Reverso",
    short: "Alsidig rebbremse med guide-funktion til sikring oppefra.",
    price: 319,
    category: "Rebbremser & sikring",
    image: "/images/shop/petzl-reverso.jpg",
    description:
      "Petzl Reverso er en let og alsidig tube-bremse med guide-funktion, så du kan sikre en eller to klatrere direkte fra ankeret oppefra — praktisk når instruktøren sidder i træet. Fungerer naturligvis også som almindelig bremse til sikring og nedfiring.",
    bullets: [
      "Guide-funktion — sikring oppefra",
      "Til ét eller to reb",
      "Letvægt",
      "Alsidig: sikring og nedfiring",
    ],
  },
  {
    slug: "petzl-shunt",
    name: "Petzl Shunt",
    short: "Mekanisk bagstopper på rebet — backup ved nedfiring og rebarbejde.",
    price: 599,
    category: "Rebbremser & sikring",
    image: "/images/shop/petzl-shunt.jpg",
    description:
      "Petzl Shunt fungerer som mekanisk 'prusik': den løber med på rebet og låser ved pludselig belastning. Bruges som backup ved nedfiring og rebarbejde. Som alt sikkerhedsudstyr kræver den korrekt montering — det viser vi dig gerne.",
    bullets: [
      "Mekanisk backup på rebet",
      "Låser ved pludselig belastning",
      "Til enkelt- og dobbeltreb",
      "Korrekt montering er afgørende — spørg os",
    ],
  },
  {
    slug: "petzl-tibloc",
    name: "Petzl Tibloc",
    short: "Ultrakompakt nød-rebklemme — vejer næsten ingenting.",
    price: 349,
    category: "Rebbremser & sikring",
    image: "/images/shop/petzl-tibloc.jpg",
    description:
      "Verdens mindste rebklemme. Tibloc bruges sammen med en karabin som nød-jumar eller i trækkesystemer. Den vejer så lidt, at den altid kan hænge på selen — og en dag er du glad for, at den gør.",
    bullets: [
      "Ultralet og kompakt",
      "Nød-opstigning og trækkesystemer",
      "Bruges med rundprofil-karabin",
      "Hører hjemme på enhver sele",
    ],
  },
  {
    slug: "petzl-ascension",
    name: "Petzl Ascension håndjumar",
    short: "Håndjumar til opstigning på reb — ergonomisk greb og sikker fortanding.",
    price: 629,
    category: "Rebbremser & sikring",
    image: "/images/shop/petzl-ascension.jpg",
    description:
      "Petzl Ascension er den klassiske håndjumar til opstigning på statisk reb. Stort ergonomisk greb — også til handsker — og en pålidelig låsekam. Indgår i vores klubpakke og bruges på vores kurser i rebklatreteknik (SRT/DRT).",
    bullets: [
      "Ergonomisk greb — også med handsker",
      "Pålidelig låsekam",
      "Til opstigning på statisk reb",
      "Vi underviser i jumar-teknik",
    ],
  },
  {
    slug: "petzl-tandem-speed",
    name: "Petzl Tandem Speed",
    short: "Dobbeltrulle med kuglelejer — til svævebaner og rebbaner.",
    price: 829,
    category: "Rebbremser & sikring",
    image: "/images/shop/petzl-tandem-speed.jpg",
    description:
      "Petzl Tandem Speed er en dobbeltrulle med kuglelejer, bygget til svævebaner og skrå rebbaner. Høj effektivitet og lang levetid — det er den rulle, vi selv hænger i, når vi bygger svævebaner til events og lejre.",
    bullets: [
      "Dobbeltrulle med kuglelejer",
      "Til svævebaner og rebbaner",
      "Høj hastighed og holdbarhed",
      "Bruges på vores egne baner",
    ],
  },
  {
    slug: "petzl-fixe",
    name: "Petzl Fixe rulle",
    short: "Kompakt rebrulle til omdirigering og trækkesystemer.",
    price: 379,
    category: "Rebbremser & sikring",
    image: "/images/shop/petzl-fixe.jpg",
    description:
      "Kompakt rulle med faste sideplader. Bruges til at omdirigere reb, bygge taljer og trækkesystemer — fx når udstyr eller materialer skal op i træet. En lille klassiker i rebarbejde.",
    bullets: [
      "Kompakt og robust",
      "Faste sideplader",
      "Til taljer og omdirigering",
      "Klassiker i rebarbejde",
    ],
  },
  {
    slug: "ottetal",
    name: "Ottetal — nedfiringsbremse",
    short: "Den klassiske ottetalsbremse til nedfiring.",
    price: 149,
    category: "Rebbremser & sikring",
    image: "/images/shop/ottetal.jpg",
    description:
      "Det klassiske ottetal til nedfiring. Enkel, robust og nem at lære — derfor bruger vi den stadig i undervisningen, når nedfiringsteknik skal sidde i hænderne, før der bygges videre med moderne bremser.",
    bullets: [
      "Klassisk nedfiringsbremse",
      "Enkel og robust",
      "God til indlæring af nedfiringsteknik",
      "Glat, kontrolleret rebføring",
    ],
  },

  // ── Karabiner ───────────────────────────────────────────────────────────
  {
    slug: "faders-hms-skruekarabin",
    name: "Faders HMS skruekarabin",
    short: "Stor HMS-karabin med skruelås — arbejdshesten i ethvert system.",
    price: 95,
    category: "Karabiner",
    image: "/images/shop/faders-hms.jpg",
    description:
      "Stor, pæreformet HMS-karabin med skruelås. HMS-formen giver plads til HMS-knob, rebbremser og flere slynger — det er den karabin, der går igen overalt i vores systemer. Indgår med 15-25 stk. i vores klatrepakker.",
    bullets: [
      "HMS-form — plads til knob og bremser",
      "Skruelås",
      "CE-godkendt",
      "Arbejdshesten i vores klatrepakker",
    ],
  },
  {
    slug: "faders-hms-twistlock",
    name: "Faders HMS twistlock",
    short: "HMS-karabin med automatisk twistlock — låser selv.",
    price: 129,
    category: "Karabiner",
    image: "/images/shop/faders-hms-twistlock.jpg",
    description:
      "HMS-karabin med automatisk twistlock-lukke: den låser selv, i samme øjeblik du slipper den. Et godt valg til de kritiske punkter i systemet, hvor en glemt skruelås ikke må kunne ske.",
    bullets: [
      "Automatisk twistlock — låser selv",
      "HMS-form",
      "Til kritiske punkter i systemet",
      "CE-godkendt",
    ],
  },
  {
    slug: "faders-petit-dru",
    name: "Faders Petit Dru skruekarabin",
    short: "Let D-karabin med skruelås til generel brug i systemet.",
    price: 79,
    category: "Karabiner",
    image: "/images/shop/faders-petit-dru.jpg",
    description:
      "Let og stærk D-formet karabin med skruelås. D-formen lægger belastningen ind langs karabinens stærke ryg. Til slynger, materiel og alle de steder i systemet, hvor der skal en låsbar karabin på.",
    bullets: [
      "D-form — stærk og let",
      "Skruelås",
      "CE-godkendt",
      "10-15 stk. indgår i vores pakker",
    ],
  },
  {
    slug: "faders-walker-d",
    name: "Faders Walker D-skruekarabin",
    short: "Robust D-skruekarabin i fuld størrelse.",
    price: 89,
    category: "Karabiner",
    image: "/images/shop/faders-walker-d.jpg",
    description:
      "Robust D-karabin i fuld størrelse med skruelås. God åbning og solid konstruktion — til ankre, seler og tungere opgaver i systemet.",
    bullets: [
      "Fuld størrelse — god åbning",
      "Skruelås",
      "D-form lægger lasten rigtigt",
      "CE-godkendt",
    ],
  },
  {
    slug: "faders-oval-440",
    name: "Faders Oval 440",
    short: "Oval karabin — det rigtige valg til ruller og rebklemmer.",
    price: 79,
    category: "Karabiner",
    image: "/images/shop/faders-oval-440.jpg",
    description:
      "Oval karabin, der centrerer belastningen — derfor er den det rigtige valg til ruller, rebklemmer og andet udstyr, der skal sidde stabilt uden at vippe. En undervurderet specialist.",
    bullets: [
      "Oval form centrerer lasten",
      "Ideel til ruller og rebklemmer",
      "Udstyret vipper ikke",
      "CE-godkendt",
    ],
  },
  {
    slug: "wild-country-synergy-hms",
    name: "Wild Country Synergy HMS",
    short: "Letvægts-HMS med skruelås og glat rebføring.",
    price: 139,
    category: "Karabiner",
    image: "/images/shop/wild-country-synergy-hms.jpg",
    description:
      "HMS-karabin fra Wild Country med skruelås. Letvægtskonstruktion med glat, afrundet rebføring — behagelig at sikre med, både med HMS-knob og rebbremse.",
    bullets: [
      "Letvægts-HMS",
      "Glat, afrundet rebføring",
      "Skruelås",
      "CE-godkendt",
    ],
  },

  // ── Slynger & stiger ────────────────────────────────────────────────────
  {
    slug: "baandslynge-60",
    name: "Båndslynge — 60 cm",
    short: "Syet båndslynge til forankringer og forlængelser.",
    price: 49,
    category: "Slynger & stiger",
    image: "/images/shop/baandslynger.jpg",
    description:
      "Syet båndslynge på 60 cm — den korte allrounder til forlængelser, materiel og små forankringer. Slynger er klatresystemets byggeklodser, og du kan aldrig have for mange. Fås også i 120, 180 og 240 cm.",
    bullets: [
      "60 cm syet båndslynge",
      "CE-godkendt",
      "Til forankringer og forlængelser",
      "Indgår i alle vores klatrepakker",
    ],
  },
  {
    slug: "baandslynge-120",
    name: "Båndslynge — 120 cm",
    short: "Den mest brugte slyngelængde — til ankre rundt om stammen.",
    price: 69,
    category: "Slynger & stiger",
    image: "/images/shop/baandslynger.jpg",
    description:
      "120 cm er den længde, vi bruger flest af: lang nok til ankre omkring mindre stammer og grene, kort nok til at holde systemet stramt. Indgår med 10-15 stk. i vores klatrepakker.",
    bullets: [
      "120 cm syet båndslynge",
      "CE-godkendt",
      "Den mest alsidige længde",
      "Til ankre om stamme og gren",
    ],
  },
  {
    slug: "baandslynge-180",
    name: "Båndslynge — 180 cm",
    short: "Lang slynge til større stammer og brede forankringer.",
    price: 95,
    category: "Slynger & stiger",
    image: "/images/shop/baandslynger.jpg",
    description:
      "180 cm båndslynge til de større stammer og brede forankringer, hvor 120 cm ikke rækker. God at have med, når du ikke kender træet på forhånd.",
    bullets: [
      "180 cm syet båndslynge",
      "CE-godkendt",
      "Til større stammer",
      "Fleksibel forankring",
    ],
  },
  {
    slug: "baandslynge-240",
    name: "Båndslynge — 240 cm",
    short: "Den lange slynge — store stammer og dobbelte ankre.",
    price: 119,
    category: "Slynger & stiger",
    image: "/images/shop/baandslynger.jpg",
    description:
      "240 cm båndslynge til de helt store stammer, dobbelte forankringer og udligning mellem flere punkter. Den længde man altid ønsker sig, når den mangler.",
    bullets: [
      "240 cm syet båndslynge",
      "CE-godkendt",
      "Store stammer og udligning",
      "Til dobbelte ankre",
    ],
  },
  {
    slug: "faders-seven-step-etrier",
    name: "Faders Seven Step etrier",
    short: "Syvtrins rebstige til opstigning og arbejdsstandpladser.",
    price: 379,
    category: "Slynger & stiger",
    image: "/images/shop/faders-etrier.jpg",
    description:
      "Etrier (rebstige) med syv trin. Bruges sammen med jumar ved opstigning på reb og som fodstøtte ved arbejde i kronen. Letvægt, pakker småt og gør lange rebopstigninger markant mindre trættende.",
    bullets: [
      "7 trin",
      "Bruges med håndjumar",
      "Letvægt — pakker småt",
      "Aflaster ved lange opstigninger",
    ],
  },

  // ── Seler ───────────────────────────────────────────────────────────────
  {
    slug: "rock-empire-skill-belt",
    name: "Rock Empire Skill Belt",
    short: "Polstret allround-klatresele med god støtte — vores standardvalg til voksne.",
    price: 749,
    category: "Seler",
    image: "/images/shop/rock-empire-skill-belt.jpg",
    description:
      "Polstret klatresele fra Rock Empire med god støtte i ryg og ben — komfortabel, også når man hænger længe i den, som man gør i et træ. Justerbare benløkker gør den nem at dele på hold. Det er en sele i samme familie som dem, vi spænder på kursister hver uge.",
    bullets: [
      "Polstret hofte og ben",
      "Justerbare benløkker — nem at dele",
      "Materialeløkker til grej",
      "CE-godkendt",
    ],
  },
  {
    slug: "rock-empire-speedy",
    name: "Rock Empire Speedy",
    short: "Hurtigt justerbar sele — ideel til hold og events.",
    price: 679,
    category: "Seler",
    image: "/images/shop/rock-empire-speedy.jpg",
    description:
      "Speedy er bygget til at skifte bruger ofte: hurtigspænder på hofte og ben gør den lynhurtig at tage på og justere. Derfor er den oplagt til klubber, skoler og events, hvor mange forskellige mennesker skal i selen på en dag.",
    bullets: [
      "Hurtigspænder — hurtig at justere",
      "Ideel til hold og events",
      "Robust konstruktion",
      "CE-godkendt",
    ],
  },
  {
    slug: "rock-empire-kosman-3d",
    name: "Rock Empire Kosman 3D QB",
    short: "Fuldkropssele til arbejde og længere ophold i højden.",
    price: 1149,
    category: "Seler",
    image: "/images/shop/rock-empire-kosman.jpg",
    description:
      "Kosman 3D er en fuldkropssele med fastgørelsespunkter til både klatring, arbejdspositionering og fald — til dem, der arbejder eller opholder sig længe i højden. Indgår i vores klatrepakker som instruktør-/arbejdssele.",
    bullets: [
      "Fuldkropssele",
      "Flere fastgørelsespunkter",
      "Til arbejde og lange ophold i højden",
      "CE-godkendt",
    ],
  },
  {
    slug: "black-diamond-momentum-ds",
    name: "Black Diamond Momentum DS",
    short: "Komfortabel allround-sele med dobbelte justeringsspænder.",
    price: 649,
    category: "Seler",
    image: "/images/shop/black-diamond-momentum-ds.jpg",
    description:
      "Black Diamonds populære allround-sele med dobbelte spænder (DS), så hoftebæltet kan centreres præcist. God polstring og fire materialeløkker — en sele, der passer til både træklatring og klatrevæg.",
    bullets: [
      "Dobbelte hoftespænder — præcis pasform",
      "God polstring",
      "4 materialeløkker",
      "CE-godkendt",
    ],
  },
  {
    slug: "black-diamond-wiz-kid",
    name: "Black Diamond Wiz Kid — børnesele",
    short: "Fuldkropssele til de mindste klatrere.",
    price: 479,
    category: "Seler",
    image: "/images/shop/black-diamond-wiz-kid.jpg",
    description:
      "Fuldkropssele til børn. Hos børn sidder tyngdepunktet højt, så de skal klatre i fuldkropssele med fastgørelse på brystet — det sikrer, at de altid hænger oprejst. Wiz Kid er nem at tage på og umulig at vokse ud af på en enkelt sæson.",
    bullets: [
      "Fuldkropssele — sikker til børn",
      "Højt fastgørelsespunkt holder barnet oprejst",
      "Nem at tage på",
      "CE-godkendt",
    ],
  },
  {
    slug: "wild-country-vision-kids",
    name: "Wild Country Vision Kids",
    short: "Letvægts fuldkropssele til børn — god til hold.",
    price: 429,
    category: "Seler",
    image: "/images/shop/wild-country-vision-kids.jpg",
    description:
      "Letvægts fuldkropssele til børn fra Wild Country. Enkel at justere og hurtig at skifte mellem børn — derfor en klassiker til skoler, institutioner og fødselsdage i trækronerne.",
    bullets: [
      "Fuldkropssele til børn",
      "Letvægt og enkel justering",
      "Hurtig at skifte mellem børn",
      "CE-godkendt",
    ],
  },
  {
    slug: "wild-country-titan-ii",
    name: "Wild Country Titan II",
    short: "Robust og rummelig sele til større brugere og lang tids brug.",
    price: 795,
    category: "Seler",
    image: "/images/shop/wild-country-titan-ii.jpg",
    description:
      "Titan II er en robust sele med stort justeringsområde — den dækker mange kropsstørrelser og tåler hård brug. Et godt valg som 'fællessele' i klubber og foreninger.",
    bullets: [
      "Stort justeringsområde",
      "Robust — tåler hård brug",
      "God som fællessele i klubber",
      "CE-godkendt",
    ],
  },
  {
    slug: "camp-classic-y",
    name: "CAMP Classic Y — fuldkropssele",
    short: "Enkel Y-fuldkropssele til grupper, rebbaner og redning.",
    price: 549,
    category: "Seler",
    image: "/images/shop/camp-classic-y.jpg",
    description:
      "Enkel og robust fuldkropssele i Y-konstruktion. Bruges hvor fuldkropsfastgørelse er påkrævet — til grupper, rebbaner, svævebaner og redningsopgaver. Få justeringspunkter gør den hurtig at lægge på.",
    bullets: [
      "Y-konstruktion — fuldkrop",
      "Hurtig at tage på",
      "Til rebbaner og grupper",
      "CE-godkendt",
    ],
  },

  // ── Hjelme ──────────────────────────────────────────────────────────────
  {
    slug: "petzl-elios",
    name: "Petzl Elios",
    short: "Robust klatrehjelm med justérbar pasform — vores undervisningshjelm.",
    price: 479,
    category: "Hjelme",
    image: "/images/shop/petzl-elios.jpg",
    description:
      "Petzl Elios er en robust skalhjelm, der tåler at blive brugt af mange forskellige hoveder — derfor er det den hjelm, der indgår i vores klubpakke, og den type vi selv sætter på kursister. Justérbar pasform, god ventilation og klips til pandelampe.",
    bullets: [
      "Robust skalkonstruktion",
      "Justérbar pasform — god til hold",
      "Klips til pandelampe",
      "CE-godkendt",
    ],
  },
  {
    slug: "camp-rock-star",
    name: "CAMP Rock Star",
    short: "Klassisk skalhjelm — slidstærk og nem at justere.",
    price: 379,
    category: "Hjelme",
    image: "/images/shop/camp-rock-star.jpg",
    description:
      "Klassisk skalhjelm fra CAMP. Slidstærk og nem at justere mellem brugere — indgår i vores 2-personers klatrepakke. Beskytter mod nedfaldende grene og slag mod stammen.",
    bullets: [
      "Slidstærk skalhjelm",
      "Nem justering mellem brugere",
      "Indgår i vores klatrepakke",
      "CE-godkendt",
    ],
  },
  {
    slug: "camp-armour",
    name: "CAMP Armour",
    short: "Allround-hjelm med god ventilation og lav vægt.",
    price: 429,
    category: "Hjelme",
    image: "/images/shop/camp-armour.jpg",
    description:
      "CAMP Armour kombinerer skalhjelmens robusthed med lavere vægt og bedre ventilation — behagelig hele dagen, også om sommeren. Klips til pandelampe.",
    bullets: [
      "God ventilation",
      "Lav vægt",
      "Klips til pandelampe",
      "CE-godkendt",
    ],
  },

  // ── Tasker & opbevaring ─────────────────────────────────────────────────
  {
    slug: "ortlieb-x-tremer-xl",
    name: "Ortlieb X-Tremer XL — 109 L",
    short: "Vandtæt kæmpesæk — hele klatrepakken i én sæk.",
    price: 1099,
    category: "Tasker & opbevaring",
    image: "/images/shop/ortlieb-x-tremer.jpg",
    description:
      "Ortliebs vandtætte X-Tremer i XL: 109 liter med rulleluk og bæreremme. Det er sækken, vores klatrepakker leveres i — reb, seler og jern til et helt hold i én vandtæt sæk, der kan stå på en våd skovbund uden problemer.",
    bullets: [
      "109 liter — plads til en hel klatrepakke",
      "Vandtæt med rulleluk",
      "Bæreremme — fungerer som rygsæk",
      "Tåler våd skovbund",
    ],
  },
  {
    slug: "ortlieb-rack-pack-89",
    name: "Ortlieb Rack-Pack — 89 L",
    short: "Vandtæt grejtaske med stor åbning.",
    price: 849,
    category: "Tasker & opbevaring",
    image: "/images/shop/ortlieb-rack-pack.jpg",
    description:
      "Vandtæt taske fra Ortlieb med 89 liter og bred åbning, så grejet er nemt at finde frem. God som hold-taske til seler, hjelme og jern — eller som vandtæt weekendtaske til lejren.",
    bullets: [
      "89 liter",
      "Vandtæt",
      "Bred åbning — nemt at finde grej",
      "Skulderrem medfølger",
    ],
  },
  {
    slug: "millet-rebpose",
    name: "Millet rebpose",
    short: "Rebpose med indbygget underlag — holder rebet rent.",
    price: 379,
    category: "Tasker & opbevaring",
    image: "/images/shop/millet-rebpose.jpg",
    description:
      "Rebpose fra Millet med indbygget underlag: fold ud, læg rebet på, rul sammen. Skidt og sand i rebet slider på både reb og bremser — en rebpose er den billigste livsforlænger til dit dyreste stykke udstyr.",
    bullets: [
      "Indbygget underlag",
      "Holder rebet rent — forlænger levetiden",
      "Hurtig pakning",
      "Bæreremme",
    ],
  },
  {
    slug: "klatresaek-lille",
    name: "Klatresæk — lille",
    short: "Slidstærk sæk til det personlige klatregrej.",
    price: 449,
    category: "Tasker & opbevaring",
    image: "/images/shop/klatresaek-lille.jpg",
    description:
      "Slidstærk klatresæk i lille størrelse — til sele, hjelm, bremse og karabiner. Den personlige sæk, der gør, at dit grej altid er samlet og klar.",
    bullets: [
      "Til det personlige grej",
      "Slidstærkt materiale",
      "Bæreremme",
      "Holder grejet samlet",
    ],
  },
  {
    slug: "klatresaek-stor",
    name: "Klatresæk — stor",
    short: "Stor klatresæk til reb og fælles grej.",
    price: 549,
    category: "Tasker & opbevaring",
    image: "/images/shop/klatresaek-stor.jpg",
    description:
      "Stor udgave af klatresækken — plads til reb, slynger og fælles grej til en hel dag i skoven. Robust bund og brede remme.",
    bullets: [
      "Plads til reb og fælles grej",
      "Robust bund",
      "Brede bæreremme",
      "Tåler hård brug",
    ],
  },

  // ── Lejr & lejrliv ──────────────────────────────────────────────────────
  {
    slug: "tentipi-safir-7",
    name: "Tentipi Safir 7 cp",
    short: "Tentipis topmodel i bomuld/polyester — lavvu til ca. 8 personer.",
    price: 15995,
    category: "Lejr & lejrliv",
    image: "/images/shop/tentipi-safir-7.jpg",
    description:
      "Safir er Tentipis topmodel: lavvu i åndbart bomuld/polyester-blend med gennemtænkt ventilation, så du kan have bål eller ovn inde i teltet. Størrelse 7 sover ca. 8 personer. Vi bruger selv Tentipi-lavvuer som base på vores lejre og overnatningsture — spørg os om størrelse og tilbehør. Fås i flere størrelser (5/7/9) — kontakt os for andre størrelser og let-udgaver.",
    bullets: [
      "Bomuld/polyester — åndbar og bålvenlig",
      "Ca. 8 sovepladser (str. 7)",
      "Justerbar topventilation",
      "Vi bruger selv Tentipi på vores lejre",
    ],
  },
  {
    slug: "tentipi-zirkon-7",
    name: "Tentipi Zirkon 7",
    short: "Lavvu i let polyester — hurtig at rejse, stærk i blæst.",
    price: 11495,
    category: "Lejr & lejrliv",
    image: "/images/shop/tentipi-zirkon-7.jpg",
    description:
      "Zirkon er Tentipis alsidige polyester-lavvu: lettere end Safir, hurtig at rejse og meget stabil i blæst. Størrelse 7 sover ca. 8 personer. Et stærkt valg til spejdergrupper, skoler og familier, der vil have lejrbasen med ud hele året. Fås i flere størrelser — kontakt os.",
    bullets: [
      "Let og stærk polyester",
      "Ca. 8 sovepladser (str. 7)",
      "Hurtig at rejse — én stang",
      "Stabil i blæst",
    ],
  },
  {
    slug: "tentipi-onyx-7",
    name: "Tentipi Onyx 7",
    short: "Tentipis prisvenlige lavvu — samme form, enklere udstyret.",
    price: 8495,
    category: "Lejr & lejrliv",
    image: "/images/shop/tentipi-onyx-7.jpg",
    description:
      "Onyx er den prisvenlige indgang til Tentipi: samme gennemprøvede lavvu-form, enklere udstyret. Størrelse 7 sover ca. 8 personer. Perfekt som første fællestelt til klubben eller familien. Fås i flere størrelser — kontakt os.",
    bullets: [
      "Prisvenlig indgang til Tentipi",
      "Ca. 8 sovepladser (str. 7)",
      "Én stang — hurtig opsætning",
      "Fås i flere størrelser",
    ],
  },
  {
    slug: "tentipi-indertelt",
    name: "Tentipi indertelt Comfort",
    short: "Indertelt med bund og myggenet til Tentipi-lavvu.",
    price: 3295,
    category: "Lejr & lejrliv",
    image: "/images/shop/tentipi-indertelt.jpg",
    description:
      "Indertelt med bund og myggenet til Tentipi-lavvuer. Skaber et tørt, myggefrit soverum i halvdelen af teltet, mens resten kan bruges som opholdsrum med ovn. Oplys din teltmodel og størrelse ved bestilling.",
    bullets: [
      "Bund og myggenet",
      "Tørt, myggefrit soverum",
      "Passer til Tentipi-lavvuer",
      "Oplys teltstørrelse ved bestilling",
    ],
  },
  {
    slug: "tentipi-ovn-eldfjell",
    name: "Tentipi brændeovn Eldfjell",
    short: "Brændeovn til lavvu — varme og hygge hele vinteren.",
    price: 5495,
    category: "Lejr & lejrliv",
    image: "/images/shop/tentipi-ovn-eldfjell.jpg",
    description:
      "Eldfjell er Tentipis brændeovn til lavvuen: hurtig varme, kogeplads til gryden og gnistfang i skorstenen. Med ovn i teltet bliver lavvuen en helårsbase — vi fyrer selv op i den på vinterlejre. Kræver korrekt opstilling og ventilation; vejledning følger med købet.",
    bullets: [
      "Hurtig varme i lavvuen",
      "Kogeplads til gryde og kedel",
      "Gnistfang i skorstenen",
      "Vejledning i sikker brug følger med",
    ],
  },
  {
    slug: "tentipi-teltbund",
    name: "Tentipi teltbund",
    short: "Aftagelig bund til Tentipi-lavvu — hel eller med båludskæring.",
    price: 2195,
    category: "Lejr & lejrliv",
    image: "/images/shop/tentipi-teltbund.png",
    description:
      "Aftagelig teltbund til Tentipi-lavvuer. Kan lukkes helt eller åbnes i midten, så der er plads til bålstedet. Holder fugt og snavs ude og gør lavvuen behagelig, også i regnvejr. Oplys din teltmodel og størrelse ved bestilling.",
    bullets: [
      "Aftagelig — hel eller med båludskæring",
      "Holder fugt og snavs ude",
      "Passer til Tentipi-lavvuer",
      "Oplys teltstørrelse ved bestilling",
    ],
  },
];

export function findProduct(slug) {
  return products.find((p) => p.slug === slug) ?? null;
}
