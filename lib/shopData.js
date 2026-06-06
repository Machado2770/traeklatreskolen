// Fallback-/seed-produkter til webshoppen.
// Supabase-tabellen `shop_products` er kilden til sandhed nÃ¥r den har data
// (se lib/getProducts.js). Disse bruges som nÃ¸dbackup og til at seede.
//
// Kataloget er opbygget ud fra TrÃ¦klatreskolens eget udstyrsarkiv (Shop.zip)
// og kategorinoterne i "Indhold klatrepakker.doc".
//
// VIGTIGT: Priserne er ESTIMEREDE vejledende priser (2026) og skal
// gennemgÃ¥s og justeres, fÃ¸r shoppen gÃ¥r live. Pakkepriserne er opdateret
// skÃ¸n ud fra de oprindelige pakkepriser (7.634 kr. / 15.706 kr., ca. 2010).
//
// Priser er i hele kroner (DKK). Checkout omregner til Ã¸re server-side.

export const SHIPPING = {
  // Fast fragt og fri fragt over et belÃ¸b (begge i kr).
  flatRate: 49,
  freeOver: 750,
};

// KategorirÃ¦kkefÃ¸lge pÃ¥ shop-siden. Klatrepakkerne stÃ¥r Ã¸verst, fordi de er
// shoppens kerne: komplette, gennemprÃ¸vede sÃ¦t med vejledning i kÃ¸bet.
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
  "Telte & lavvuer",
  "BÃ¥l & lejrliv",
  "T-shirts climbers collection",
];

export const products = [
  // â”€â”€ Klatrepakker â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    slug: "klatrepakke-2-personer",
    name: "Klatrepakke til 2 personer",
    short: "Komplet, gennemprÃ¸vet udstyrssÃ¦t til to klatrere â€” sammensat af vores instruktÃ¸rer.",
    price: 9495,
    category: "Klatrepakker",
    image: "/images/shop/klatrepakke-2-personer.jpg",
    description:
      "Alt hvad to personer skal bruge for at klatre sikkert i trÃ¦er â€” sammensat af de samme instruktÃ¸rer, der underviser pÃ¥ vores kurser, og med prÃ¦cis det udstyr vi selv bruger i undervisningen. Pakken indeholder bl.a. 2 dynamiske reb (Millet Diamond Triaxiale 60 m), prusiksnore, seler, rebbremser, karabiner, slynger og en vandtÃ¦t pakpose til det hele. Ved kÃ¸b af en klatrepakke fÃ¸lger en grundig introduktion til udstyret â€” og vi anbefaler altid at kombinere pakken med et kursus, sÃ¥ I bliver fortrolige med teknikkerne.",
    bullets: [
      "2 Ã— dynamisk reb â€” Millet Diamond Triaxiale 60 m",
      "10 Ã— Kernmantel prusiksnor 5 mm",
      "Seler, hjelm-/sikringsudstyr og 2 Ã— Black Diamond ATC",
      "25 Ã— karabiner (HMS og Petit Dru) og 20 Ã— slynger",
      "Ortlieb X-Tremer XL 109 L til opbevaring",
      "Introduktion til udstyret fÃ¸lger med kÃ¸bet",
    ],
  },
  {
    slug: "klatrepakke-klub",
    name: "Klatrepakke til klubber, instruktÃ¸rer & foreninger",
    short: "Stor klatresÃ¦k til hold â€” udstyr til gruppeklatring med flere systemer i gang ad gangen.",
    price: 18995,
    category: "Klatrepakker",
    image: "/images/shop/klatrepakke-klub.jpg",
    description:
      "Vores store pakke til klubber, foreninger, skoler og instruktÃ¸rer, der vil have flere klatresystemer kÃ¸rende samtidig. Indholdet svarer til det grej, vi selv stiller op med, nÃ¥r vi underviser hold: 4 statiske og dynamiske reb, hjelme, jumar og grigri til opstigning og nedfiring, masser af karabiner og slynger â€” alt sammen pakket i en vandtÃ¦t Ortlieb-sÃ¦k. Ved kÃ¸b fÃ¸lger en introduktion til udstyret, og vi tilbyder instruktÃ¸ruddannelse, sÃ¥ jeres egne folk bliver kvalificerede til at bruge det.",
    bullets: [
      "2 Ã— Millet Diamond Triaxiale 60 m + 2 Ã— Millet Spelunca 60 m",
      "10 Ã— Kernmantel prusiksnor 5 mm",
      "2 Ã— Petzl Elios hjelme, 2 Ã— Ascension, 2 Ã— Grigri",
      "42 Ã— karabiner og 30 Ã— slynger",
      "2 Ã— Black Diamond ATC og 4 Ã— seler",
      "Introduktion til udstyret fÃ¸lger med kÃ¸bet",
    ],
  },

  // â”€â”€ Reb & liner â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    slug: "millet-diamond-triaxiale-60m",
    name: "Millet Diamond Triaxiale â€” 60 m",
    short: "Dynamisk klatrereb â€” det reb vi selv klatrer pÃ¥ til undervisning.",
    price: 1795,
    category: "Reb & liner",
    image: "/images/shop/millet-diamond-triaxiale.jpg",
    description:
      "Et slidstÃ¦rkt dynamisk reb med god hÃ¥ndtering â€” rygraden i vores egne klatresystemer. 60 meter rÃ¦kker til selv hÃ¸je danske skovtrÃ¦er, og den dynamiske kerne absorberer energien ved belastning. Vi underviser i rebhÃ¥ndtering, knob og opsÃ¦tning pÃ¥ alle vores kurser.",
    bullets: [
      "60 meter lÃ¦ngde",
      "Dynamisk â€” absorberer fald",
      "God hÃ¥ndtering, ogsÃ¥ med handsker",
      "Det reb vi selv bruger i undervisningen",
    ],
  },
  {
    slug: "millet-spelunca-60m",
    name: "Millet Spelunca statisk reb â€” 60 m",
    short: "Statisk reb til faste installationer, nedfiring og rebbaner.",
    price: 1595,
    category: "Reb & liner",
    image: "/images/shop/proeve/millet-spelunca-60m.png",
    description:
      "Statisk reb med minimal strÃ¦kning â€” det rigtige valg til faste systemer, opstigning pÃ¥ reb, nedfiring og rebbaner. IndgÃ¥r i vores store klatrepakke til klubber og foreninger. Husk: statiske og dynamiske reb bruges til forskellige ting â€” er du i tvivl, sÃ¥ spÃ¸rg os, eller lÃ¦r forskellen pÃ¥ et af vores kurser.",
    bullets: [
      "60 meter lÃ¦ngde",
      "Statisk â€” minimal strÃ¦kning",
      "Til opstigning, nedfiring og faste systemer",
      "SlidstÃ¦rk kappe",
    ],
  },
  {
    slug: "kernmantel-prusiksnor-5mm",
    name: "Kernmantel prusiksnor 5 mm â€” pr. meter",
    short: "Prusiksnor til friktionsknob â€” selve hjertet i klatresystemet.",
    price: 14,
    category: "Reb & liner",
    image: "/images/shop/kernmantel-prusik.jpg",
    description:
      "Kernmantel-snor pÃ¥ 5 mm til prusikknob og andre friktionsknob â€” den lille snor, der holder dig fast pÃ¥ rebet, nÃ¥r du klatrer. Prisen er pr. meter; bestil det antal meter du skal bruge (vi anbefaler ca. 1,5 m pr. prusik). PÃ¥ vores kurser lÃ¦rer du at binde og bruge prusikken korrekt.",
    bullets: [
      "5 mm kernmantel-konstruktion",
      "Prisen er pr. meter â€” vÃ¦lg antal meter i kurven",
      "Til prusik- og friktionsknob",
      "Vi lÃ¦rer dig at bruge den pÃ¥ vores kurser",
    ],
  },

  // â”€â”€ Kasteposer & kasteliner â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    slug: "kastepose-250g",
    name: "Kastepose 250 g",
    short: "Arborist-kastepose til at fÃ¥ linen op over den fÃ¸rste gren.",
    price: 179,
    category: "Kasteposer & kasteliner",
    image: "/images/shop/kastepose-250g.jpg",
    description:
      "En klassisk arborist-kastepose pÃ¥ 250 gram. Med kastepose og kasteline fÃ¥r du dit klatresystem op over selv hÃ¸je grene â€” det fÃ¸rste, vi lÃ¦rer fra os pÃ¥ alle trÃ¦klatrekurser. SlidstÃ¦rkt yderstof og solid fastgÃ¸relsesring.",
    bullets: [
      "250 gram â€” god allround-vÃ¦gt",
      "SlidstÃ¦rkt yderstof",
      "Solid ring til kastelinen",
      "Kasteteknik indgÃ¥r i alle vores kurser",
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
      "Kasteline fra Edelrid i kraftig signalfarve, sÃ¥ du altid kan fÃ¸lge linen i kronen. Glat overflade giver lav friktion hen over grenen, nÃ¥r rebet skal trÃ¦kkes op. Bruges sammen med en kastepose.",
    bullets: [
      "Tydelig signalfarve",
      "Glat â€” lav friktion over grenen",
      "Let og stÃ¦rk",
      "Bruges sammen med kastepose",
    ],
  },
  {
    slug: "edelrid-spring-bag",
    name: "Edelrid Spring Bag",
    short: "Foldbar kube til kasteline â€” linen ligger altid klar uden kludder.",
    price: 429,
    category: "Kasteposer & kasteliner",
    image: "/images/shop/edelrid-spring-bag.jpg",
    description:
      "Sammenklappelig line-kube fra Edelrid. Kastelinen lÃ¦gges lÃ¸st i kuben og lÃ¸ber kludderfrit ud ved kast â€” og det hele kan foldes fladt sammen og pakkes i klatresÃ¦kken. En lille ting, der sparer meget tid i skoven.",
    bullets: [
      "Holder kastelinen kludderfri",
      "Foldes fladt sammen efter brug",
      "Hurtigere opsÃ¦tning af systemet",
      "Plads til line og kastepose",
    ],
  },

  // â”€â”€ Rebbremser & sikring â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    slug: "black-diamond-atc",
    name: "Black Diamond ATC",
    short: "Klassisk rebbremse til sikring og nedfiring â€” enkel og driftsikker.",
    price: 139,
    category: "Rebbremser & sikring",
    image: "/images/shop/black-diamond-atc.jpg",
    description:
      "Den klassiske tube-rebbremse fra Black Diamond. Enkel, let og driftsikker â€” derfor er det ogsÃ¥ den bremse, vi bruger, nÃ¥r vi lÃ¦rer nye klatrere at sikre hinanden. Fungerer til bÃ¥de sikring og nedfiring.",
    bullets: [
      "Enkel og driftsikker tube-bremse",
      "Til sikring og nedfiring",
      "LetvÃ¦gt",
      "Den bremse vi underviser med",
    ],
  },
  {
    slug: "black-diamond-atc-xp",
    name: "Black Diamond ATC-XP",
    short: "ATC med ekstra bremsekraft via friktionsriller â€” god til tynde reb.",
    price: 189,
    category: "Rebbremser & sikring",
    image: "/images/shop/proeve/black-diamond-atc-xp.png",
    description:
      "ATC-XP har friktionsriller, der giver markant mere bremsekraft end den klassiske ATC â€” en fordel ved tynde reb, tunge klatrere eller lange nedfiringer. Samme enkle betjening, mere kontrol.",
    bullets: [
      "Friktionsriller â€” ekstra bremsekraft",
      "To friktionsindstillinger",
      "God til tynde reb og lange nedfiringer",
      "LetvÃ¦gt",
    ],
  },
  {
    slug: "petzl-grigri",
    name: "Petzl Grigri",
    short: "Rebbremse med bremseassistance â€” standarden til sikring af mange klatrere.",
    price: 949,
    category: "Rebbremser & sikring",
    image: "/images/shop/petzl-grigri.jpg",
    description:
      "Petzl Grigri er rebbremsen med mekanisk bremseassistance: kammen klemmer rebet fast ved pludselig belastning. Det giver en ekstra sikkerhedsmargin, nÃ¥r mange skal klatre â€” derfor indgÃ¥r den i vores klubpakke, og derfor sikrer vi selv med den pÃ¥ events. KrÃ¦ver korrekt betjening: Grigri-hÃ¥ndtering indgÃ¥r i vores instruktÃ¸ruddannelse.",
    bullets: [
      "Mekanisk bremseassistance",
      "Velegnet til topreb og mange klatringer",
      "Kontrolleret nedfiring med hÃ¥ndtag",
      "Korrekt brug indgÃ¥r i vores instruktÃ¸rkurser",
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
      "Petzl Reverso er en let og alsidig tube-bremse med guide-funktion, sÃ¥ du kan sikre en eller to klatrere direkte fra ankeret oppefra â€” praktisk nÃ¥r instruktÃ¸ren sidder i trÃ¦et. Fungerer naturligvis ogsÃ¥ som almindelig bremse til sikring og nedfiring.",
    bullets: [
      "Guide-funktion â€” sikring oppefra",
      "Til Ã©t eller to reb",
      "LetvÃ¦gt",
      "Alsidig: sikring og nedfiring",
    ],
  },
  {
    slug: "petzl-shunt",
    name: "Petzl Shunt",
    short: "Mekanisk bagstopper pÃ¥ rebet â€” backup ved nedfiring og rebarbejde.",
    price: 599,
    category: "Rebbremser & sikring",
    image: "/images/shop/petzl-shunt.jpg",
    description:
      "Petzl Shunt fungerer som mekanisk 'prusik': den lÃ¸ber med pÃ¥ rebet og lÃ¥ser ved pludselig belastning. Bruges som backup ved nedfiring og rebarbejde. Som alt sikkerhedsudstyr krÃ¦ver den korrekt montering â€” det viser vi dig gerne.",
    bullets: [
      "Mekanisk backup pÃ¥ rebet",
      "LÃ¥ser ved pludselig belastning",
      "Til enkelt- og dobbeltreb",
      "Korrekt montering er afgÃ¸rende â€” spÃ¸rg os",
    ],
  },
  {
    slug: "petzl-tibloc",
    name: "Petzl Tibloc",
    short: "Ultrakompakt nÃ¸d-rebklemme â€” vejer nÃ¦sten ingenting.",
    price: 349,
    category: "Rebbremser & sikring",
    image: "/images/shop/petzl-tibloc.jpg",
    description:
      "Verdens mindste rebklemme. Tibloc bruges sammen med en karabin som nÃ¸d-jumar eller i trÃ¦kkesystemer. Den vejer sÃ¥ lidt, at den altid kan hÃ¦nge pÃ¥ selen â€” og en dag er du glad for, at den gÃ¸r.",
    bullets: [
      "Ultralet og kompakt",
      "NÃ¸d-opstigning og trÃ¦kkesystemer",
      "Bruges med rundprofil-karabin",
      "HÃ¸rer hjemme pÃ¥ enhver sele",
    ],
  },
  {
    slug: "petzl-ascension",
    name: "Petzl Ascension hÃ¥ndjumar",
    short: "HÃ¥ndjumar til opstigning pÃ¥ reb â€” ergonomisk greb og sikker fortanding.",
    price: 629,
    category: "Rebbremser & sikring",
    image: "/images/shop/petzl-ascension.jpg",
    description:
      "Petzl Ascension er den klassiske hÃ¥ndjumar til opstigning pÃ¥ statisk reb. Stort ergonomisk greb â€” ogsÃ¥ til handsker â€” og en pÃ¥lidelig lÃ¥sekam. IndgÃ¥r i vores klubpakke og bruges pÃ¥ vores kurser i rebklatreteknik (SRT/DRT).",
    bullets: [
      "Ergonomisk greb â€” ogsÃ¥ med handsker",
      "PÃ¥lidelig lÃ¥sekam",
      "Til opstigning pÃ¥ statisk reb",
      "Vi underviser i jumar-teknik",
    ],
  },
  {
    slug: "petzl-tandem-speed",
    name: "Petzl Tandem Speed",
    short: "Dobbeltrulle med kuglelejer â€” til svÃ¦vebaner og rebbaner.",
    price: 829,
    category: "Rebbremser & sikring",
    image: "/images/shop/petzl-tandem-speed.jpg",
    description:
      "Petzl Tandem Speed er en dobbeltrulle med kuglelejer, bygget til svÃ¦vebaner og skrÃ¥ rebbaner. HÃ¸j effektivitet og lang levetid â€” det er den rulle, vi selv hÃ¦nger i, nÃ¥r vi bygger svÃ¦vebaner til events og lejre.",
    bullets: [
      "Dobbeltrulle med kuglelejer",
      "Til svÃ¦vebaner og rebbaner",
      "HÃ¸j hastighed og holdbarhed",
      "Bruges pÃ¥ vores egne baner",
    ],
  },
  {
    slug: "petzl-fixe",
    name: "Petzl Fixe rulle",
    short: "Kompakt rebrulle til omdirigering og trÃ¦kkesystemer.",
    price: 379,
    category: "Rebbremser & sikring",
    image: "/images/shop/petzl-fixe.jpg",
    description:
      "Kompakt rulle med faste sideplader. Bruges til at omdirigere reb, bygge taljer og trÃ¦kkesystemer â€” fx nÃ¥r udstyr eller materialer skal op i trÃ¦et. En lille klassiker i rebarbejde.",
    bullets: [
      "Kompakt og robust",
      "Faste sideplader",
      "Til taljer og omdirigering",
      "Klassiker i rebarbejde",
    ],
  },
  {
    slug: "ottetal",
    name: "Ottetal â€” nedfiringsbremse",
    short: "Den klassiske ottetalsbremse til nedfiring.",
    price: 149,
    category: "Rebbremser & sikring",
    image: "/images/shop/ottetal.jpg",
    description:
      "Det klassiske ottetal til nedfiring. Enkel, robust og nem at lÃ¦re â€” derfor bruger vi den stadig i undervisningen, nÃ¥r nedfiringsteknik skal sidde i hÃ¦nderne, fÃ¸r der bygges videre med moderne bremser.",
    bullets: [
      "Klassisk nedfiringsbremse",
      "Enkel og robust",
      "God til indlÃ¦ring af nedfiringsteknik",
      "Glat, kontrolleret rebfÃ¸ring",
    ],
  },

  // â”€â”€ Karabiner â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    slug: "faders-hms-skruekarabin",
    name: "Faders HMS skruekarabin",
    short: "Stor HMS-karabin med skruelÃ¥s â€” arbejdshesten i ethvert system.",
    price: 95,
    category: "Karabiner",
    image: "/images/shop/proeve/faders-hms-skruekarabin.png",
    description:
      "Stor, pÃ¦reformet HMS-karabin med skruelÃ¥s. HMS-formen giver plads til HMS-knob, rebbremser og flere slynger â€” det er den karabin, der gÃ¥r igen overalt i vores systemer. IndgÃ¥r med 15-25 stk. i vores klatrepakker.",
    bullets: [
      "HMS-form â€” plads til knob og bremser",
      "SkruelÃ¥s",
      "CE-godkendt",
      "Arbejdshesten i vores klatrepakker",
    ],
  },
  {
    slug: "faders-hms-twistlock",
    name: "Faders HMS twistlock",
    short: "HMS-karabin med automatisk twistlock â€” lÃ¥ser selv.",
    price: 129,
    category: "Karabiner",
    image: "/images/shop/faders-hms-twistlock.jpg",
    description:
      "HMS-karabin med automatisk twistlock-lukke: den lÃ¥ser selv, i samme Ã¸jeblik du slipper den. Et godt valg til de kritiske punkter i systemet, hvor en glemt skruelÃ¥s ikke mÃ¥ kunne ske.",
    bullets: [
      "Automatisk twistlock â€” lÃ¥ser selv",
      "HMS-form",
      "Til kritiske punkter i systemet",
      "CE-godkendt",
    ],
  },
  {
    slug: "faders-petit-dru",
    name: "Faders Petit Dru skruekarabin",
    short: "Let D-karabin med skruelÃ¥s til generel brug i systemet.",
    price: 79,
    category: "Karabiner",
    image: "/images/shop/proeve/faders-petit-dru.png",
    description:
      "Let og stÃ¦rk D-formet karabin med skruelÃ¥s. D-formen lÃ¦gger belastningen ind langs karabinens stÃ¦rke ryg. Til slynger, materiel og alle de steder i systemet, hvor der skal en lÃ¥sbar karabin pÃ¥.",
    bullets: [
      "D-form â€” stÃ¦rk og let",
      "SkruelÃ¥s",
      "CE-godkendt",
      "10-15 stk. indgÃ¥r i vores pakker",
    ],
  },
  {
    slug: "faders-walker-d",
    name: "Faders Walker D-skruekarabin",
    short: "Robust D-skruekarabin i fuld stÃ¸rrelse.",
    price: 89,
    category: "Karabiner",
    image: "/images/shop/faders-walker-d.jpg",
    description:
      "Robust D-karabin i fuld stÃ¸rrelse med skruelÃ¥s. God Ã¥bning og solid konstruktion â€” til ankre, seler og tungere opgaver i systemet.",
    bullets: [
      "Fuld stÃ¸rrelse â€” god Ã¥bning",
      "SkruelÃ¥s",
      "D-form lÃ¦gger lasten rigtigt",
      "CE-godkendt",
    ],
  },
  {
    slug: "faders-oval-440",
    name: "Faders Oval 440",
    short: "Oval karabin â€” det rigtige valg til ruller og rebklemmer.",
    price: 79,
    category: "Karabiner",
    image: "/images/shop/proeve/faders-oval-440.png",
    description:
      "Oval karabin, der centrerer belastningen â€” derfor er den det rigtige valg til ruller, rebklemmer og andet udstyr, der skal sidde stabilt uden at vippe. En undervurderet specialist.",
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
    short: "LetvÃ¦gts-HMS med skruelÃ¥s og glat rebfÃ¸ring.",
    price: 139,
    category: "Karabiner",
    image: "/images/shop/proeve/wild-country-synergy-hms.png",
    description:
      "HMS-karabin fra Wild Country med skruelÃ¥s. LetvÃ¦gtskonstruktion med glat, afrundet rebfÃ¸ring â€” behagelig at sikre med, bÃ¥de med HMS-knob og rebbremse.",
    bullets: [
      "LetvÃ¦gts-HMS",
      "Glat, afrundet rebfÃ¸ring",
      "SkruelÃ¥s",
      "CE-godkendt",
    ],
  },

  // â”€â”€ Slynger & stiger â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    slug: "baandslynge-60",
    name: "BÃ¥ndslynge â€” 60 cm",
    short: "Syet bÃ¥ndslynge til forankringer og forlÃ¦ngelser.",
    price: 49,
    category: "Slynger & stiger",
    image: "/images/shop/baandslynger.jpg",
    description:
      "Syet bÃ¥ndslynge pÃ¥ 60 cm â€” den korte allrounder til forlÃ¦ngelser, materiel og smÃ¥ forankringer. Slynger er klatresystemets byggeklodser, og du kan aldrig have for mange. FÃ¥s ogsÃ¥ i 120, 180 og 240 cm.",
    bullets: [
      "60 cm syet bÃ¥ndslynge",
      "CE-godkendt",
      "Til forankringer og forlÃ¦ngelser",
      "IndgÃ¥r i alle vores klatrepakker",
    ],
  },
  {
    slug: "baandslynge-120",
    name: "BÃ¥ndslynge â€” 120 cm",
    short: "Den mest brugte slyngelÃ¦ngde â€” til ankre rundt om stammen.",
    price: 69,
    category: "Slynger & stiger",
    image: "/images/shop/baandslynger.jpg",
    description:
      "120 cm er den lÃ¦ngde, vi bruger flest af: lang nok til ankre omkring mindre stammer og grene, kort nok til at holde systemet stramt. IndgÃ¥r med 10-15 stk. i vores klatrepakker.",
    bullets: [
      "120 cm syet bÃ¥ndslynge",
      "CE-godkendt",
      "Den mest alsidige lÃ¦ngde",
      "Til ankre om stamme og gren",
    ],
  },
  {
    slug: "baandslynge-180",
    name: "BÃ¥ndslynge â€” 180 cm",
    short: "Lang slynge til stÃ¸rre stammer og brede forankringer.",
    price: 95,
    category: "Slynger & stiger",
    image: "/images/shop/baandslynger.jpg",
    description:
      "180 cm bÃ¥ndslynge til de stÃ¸rre stammer og brede forankringer, hvor 120 cm ikke rÃ¦kker. God at have med, nÃ¥r du ikke kender trÃ¦et pÃ¥ forhÃ¥nd.",
    bullets: [
      "180 cm syet bÃ¥ndslynge",
      "CE-godkendt",
      "Til stÃ¸rre stammer",
      "Fleksibel forankring",
    ],
  },
  {
    slug: "baandslynge-240",
    name: "BÃ¥ndslynge â€” 240 cm",
    short: "Den lange slynge â€” store stammer og dobbelte ankre.",
    price: 119,
    category: "Slynger & stiger",
    image: "/images/shop/baandslynger.jpg",
    description:
      "240 cm bÃ¥ndslynge til de helt store stammer, dobbelte forankringer og udligning mellem flere punkter. Den lÃ¦ngde man altid Ã¸nsker sig, nÃ¥r den mangler.",
    bullets: [
      "240 cm syet bÃ¥ndslynge",
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
    image: "/images/shop/proeve/faders-seven-step-etrier.png",
    description:
      "Etrier (rebstige) med syv trin. Bruges sammen med jumar ved opstigning pÃ¥ reb og som fodstÃ¸tte ved arbejde i kronen. LetvÃ¦gt, pakker smÃ¥t og gÃ¸r lange rebopstigninger markant mindre trÃ¦ttende.",
    bullets: [
      "7 trin",
      "Bruges med hÃ¥ndjumar",
      "LetvÃ¦gt â€” pakker smÃ¥t",
      "Aflaster ved lange opstigninger",
    ],
  },

  // â”€â”€ Seler â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    slug: "rock-empire-skill-belt",
    name: "Rock Empire Skill Belt",
    short: "Polstret allround-klatresele med god stÃ¸tte â€” vores standardvalg til voksne.",
    price: 749,
    category: "Seler",
    image: "/images/shop/rock-empire-skill-belt.jpg",
    description:
      "Polstret klatresele fra Rock Empire med god stÃ¸tte i ryg og ben â€” komfortabel, ogsÃ¥ nÃ¥r man hÃ¦nger lÃ¦nge i den, som man gÃ¸r i et trÃ¦. Justerbare benlÃ¸kker gÃ¸r den nem at dele pÃ¥ hold. Det er en sele i samme familie som dem, vi spÃ¦nder pÃ¥ kursister hver uge.",
    bullets: [
      "Polstret hofte og ben",
      "Justerbare benlÃ¸kker â€” nem at dele",
      "MaterialelÃ¸kker til grej",
      "CE-godkendt",
    ],
  },
  {
    slug: "rock-empire-speedy",
    name: "Rock Empire Speedy",
    short: "Hurtigt justerbar sele â€” ideel til hold og events.",
    price: 679,
    category: "Seler",
    image: "/images/shop/rock-empire-speedy.jpg",
    description:
      "Speedy er bygget til at skifte bruger ofte: hurtigspÃ¦nder pÃ¥ hofte og ben gÃ¸r den lynhurtig at tage pÃ¥ og justere. Derfor er den oplagt til klubber, skoler og events, hvor mange forskellige mennesker skal i selen pÃ¥ en dag.",
    bullets: [
      "HurtigspÃ¦nder â€” hurtig at justere",
      "Ideel til hold og events",
      "Robust konstruktion",
      "CE-godkendt",
    ],
  },
  {
    slug: "rock-empire-kosman-3d",
    name: "Rock Empire Kosman 3D QB",
    short: "Fuldkropssele til arbejde og lÃ¦ngere ophold i hÃ¸jden.",
    price: 1149,
    category: "Seler",
    image: "/images/shop/rock-empire-kosman.jpg",
    description:
      "Kosman 3D er en fuldkropssele med fastgÃ¸relsespunkter til bÃ¥de klatring, arbejdspositionering og fald â€” til dem, der arbejder eller opholder sig lÃ¦nge i hÃ¸jden. IndgÃ¥r i vores klatrepakker som instruktÃ¸r-/arbejdssele.",
    bullets: [
      "Fuldkropssele",
      "Flere fastgÃ¸relsespunkter",
      "Til arbejde og lange ophold i hÃ¸jden",
      "CE-godkendt",
    ],
  },
  {
    slug: "black-diamond-momentum-ds",
    name: "Black Diamond Momentum DS",
    short: "Komfortabel allround-sele med dobbelte justeringsspÃ¦nder.",
    price: 649,
    category: "Seler",
    image: "/images/shop/proeve/black-diamond-momentum-ds.png",
    description:
      "Black Diamonds populÃ¦re allround-sele med dobbelte spÃ¦nder (DS), sÃ¥ hoftebÃ¦ltet kan centreres prÃ¦cist. God polstring og fire materialelÃ¸kker â€” en sele, der passer til bÃ¥de trÃ¦klatring og klatrevÃ¦g.",
    bullets: [
      "Dobbelte hoftespÃ¦nder â€” prÃ¦cis pasform",
      "God polstring",
      "4 materialelÃ¸kker",
      "CE-godkendt",
    ],
  },
  {
    slug: "black-diamond-wiz-kid",
    name: "Black Diamond Wiz Kid â€” bÃ¸rnesele",
    short: "Fuldkropssele til de mindste klatrere.",
    price: 479,
    category: "Seler",
    image: "/images/shop/black-diamond-wiz-kid.jpg",
    description:
      "Fuldkropssele til bÃ¸rn. Hos bÃ¸rn sidder tyngdepunktet hÃ¸jt, sÃ¥ de skal klatre i fuldkropssele med fastgÃ¸relse pÃ¥ brystet â€” det sikrer, at de altid hÃ¦nger oprejst. Wiz Kid er nem at tage pÃ¥ og umulig at vokse ud af pÃ¥ en enkelt sÃ¦son.",
    bullets: [
      "Fuldkropssele â€” sikker til bÃ¸rn",
      "HÃ¸jt fastgÃ¸relsespunkt holder barnet oprejst",
      "Nem at tage pÃ¥",
      "CE-godkendt",
    ],
  },
  {
    slug: "wild-country-vision-kids",
    name: "Wild Country Vision Kids",
    short: "LetvÃ¦gts fuldkropssele til bÃ¸rn â€” god til hold.",
    price: 429,
    category: "Seler",
    image: "/images/shop/proeve/wild-country-vision-kids.png",
    description:
      "LetvÃ¦gts fuldkropssele til bÃ¸rn fra Wild Country. Enkel at justere og hurtig at skifte mellem bÃ¸rn â€” derfor en klassiker til skoler, institutioner og fÃ¸dselsdage i trÃ¦kronerne.",
    bullets: [
      "Fuldkropssele til bÃ¸rn",
      "LetvÃ¦gt og enkel justering",
      "Hurtig at skifte mellem bÃ¸rn",
      "CE-godkendt",
    ],
  },
  {
    slug: "wild-country-titan-ii",
    name: "Wild Country Titan II",
    short: "Robust og rummelig sele til stÃ¸rre brugere og lang tids brug.",
    price: 795,
    category: "Seler",
    image: "/images/shop/wild-country-titan-ii.jpg",
    description:
      "Titan II er en robust sele med stort justeringsomrÃ¥de â€” den dÃ¦kker mange kropsstÃ¸rrelser og tÃ¥ler hÃ¥rd brug. Et godt valg som 'fÃ¦llessele' i klubber og foreninger.",
    bullets: [
      "Stort justeringsomrÃ¥de",
      "Robust â€” tÃ¥ler hÃ¥rd brug",
      "God som fÃ¦llessele i klubber",
      "CE-godkendt",
    ],
  },
  {
    slug: "camp-classic-y",
    name: "CAMP Classic Y â€” fuldkropssele",
    short: "Enkel Y-fuldkropssele til grupper, rebbaner og redning.",
    price: 549,
    category: "Seler",
    image: "/images/shop/proeve/camp-classic-y.png",
    description:
      "Enkel og robust fuldkropssele i Y-konstruktion. Bruges hvor fuldkropsfastgÃ¸relse er pÃ¥krÃ¦vet â€” til grupper, rebbaner, svÃ¦vebaner og redningsopgaver. FÃ¥ justeringspunkter gÃ¸r den hurtig at lÃ¦gge pÃ¥.",
    bullets: [
      "Y-konstruktion â€” fuldkrop",
      "Hurtig at tage pÃ¥",
      "Til rebbaner og grupper",
      "CE-godkendt",
    ],
  },

  // â”€â”€ Hjelme â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    slug: "petzl-elios",
    name: "Petzl Elios",
    short: "Robust klatrehjelm med justÃ©rbar pasform â€” vores undervisningshjelm.",
    price: 479,
    category: "Hjelme",
    image: "/images/shop/petzl-elios.jpg",
    description:
      "Petzl Elios er en robust skalhjelm, der tÃ¥ler at blive brugt af mange forskellige hoveder â€” derfor er det den hjelm, der indgÃ¥r i vores klubpakke, og den type vi selv sÃ¦tter pÃ¥ kursister. JustÃ©rbar pasform, god ventilation og klips til pandelampe.",
    bullets: [
      "Robust skalkonstruktion",
      "JustÃ©rbar pasform â€” god til hold",
      "Klips til pandelampe",
      "CE-godkendt",
    ],
  },
  {
    slug: "camp-rock-star",
    name: "CAMP Rock Star",
    short: "Klassisk skalhjelm â€” slidstÃ¦rk og nem at justere.",
    price: 379,
    category: "Hjelme",
    image: "/images/shop/proeve/camp-rock-star.png",
    description:
      "Klassisk skalhjelm fra CAMP. SlidstÃ¦rk og nem at justere mellem brugere â€” indgÃ¥r i vores 2-personers klatrepakke. Beskytter mod nedfaldende grene og slag mod stammen.",
    bullets: [
      "SlidstÃ¦rk skalhjelm",
      "Nem justering mellem brugere",
      "IndgÃ¥r i vores klatrepakke",
      "CE-godkendt",
    ],
  },
  {
    slug: "camp-armour",
    name: "CAMP Armour",
    short: "Allround-hjelm med god ventilation og lav vÃ¦gt.",
    price: 429,
    category: "Hjelme",
    image: "/images/shop/proeve/camp-armour.png",
    description:
      "CAMP Armour kombinerer skalhjelmens robusthed med lavere vÃ¦gt og bedre ventilation â€” behagelig hele dagen, ogsÃ¥ om sommeren. Klips til pandelampe.",
    bullets: [
      "God ventilation",
      "Lav vÃ¦gt",
      "Klips til pandelampe",
      "CE-godkendt",
    ],
  },

  // â”€â”€ Tasker & opbevaring â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    slug: "ortlieb-x-tremer-xl",
    name: "Ortlieb X-Tremer XL â€” 109 L",
    short: "VandtÃ¦t kÃ¦mpesÃ¦k â€” hele klatrepakken i Ã©n sÃ¦k.",
    price: 1099,
    category: "Tasker & opbevaring",
    image: "/images/shop/ortlieb-x-tremer.jpg",
    description:
      "Ortliebs vandtÃ¦tte X-Tremer i XL: 109 liter med rulleluk og bÃ¦reremme. Det er sÃ¦kken, vores klatrepakker leveres i â€” reb, seler og jern til et helt hold i Ã©n vandtÃ¦t sÃ¦k, der kan stÃ¥ pÃ¥ en vÃ¥d skovbund uden problemer.",
    bullets: [
      "109 liter â€” plads til en hel klatrepakke",
      "VandtÃ¦t med rulleluk",
      "BÃ¦reremme â€” fungerer som rygsÃ¦k",
      "TÃ¥ler vÃ¥d skovbund",
    ],
  },
  {
    slug: "ortlieb-rack-pack-89",
    name: "Ortlieb Rack-Pack â€” 89 L",
    short: "VandtÃ¦t grejtaske med stor Ã¥bning.",
    price: 849,
    category: "Tasker & opbevaring",
    image: "/images/shop/ortlieb-rack-pack.jpg",
    description:
      "VandtÃ¦t taske fra Ortlieb med 89 liter og bred Ã¥bning, sÃ¥ grejet er nemt at finde frem. God som hold-taske til seler, hjelme og jern â€” eller som vandtÃ¦t weekendtaske til lejren.",
    bullets: [
      "89 liter",
      "VandtÃ¦t",
      "Bred Ã¥bning â€” nemt at finde grej",
      "Skulderrem medfÃ¸lger",
    ],
  },
  {
    slug: "millet-rebpose",
    name: "Millet rebpose",
    short: "Rebpose med indbygget underlag â€” holder rebet rent.",
    price: 379,
    category: "Tasker & opbevaring",
    image: "/images/shop/millet-rebpose.jpg",
    description:
      "Rebpose fra Millet med indbygget underlag: fold ud, lÃ¦g rebet pÃ¥, rul sammen. Skidt og sand i rebet slider pÃ¥ bÃ¥de reb og bremser â€” en rebpose er den billigste livsforlÃ¦nger til dit dyreste stykke udstyr.",
    bullets: [
      "Indbygget underlag",
      "Holder rebet rent â€” forlÃ¦nger levetiden",
      "Hurtig pakning",
      "BÃ¦reremme",
    ],
  },
  {
    slug: "klatresaek-lille",
    name: "KlatresÃ¦k â€” lille",
    short: "SlidstÃ¦rk sÃ¦k til det personlige klatregrej.",
    price: 449,
    category: "Tasker & opbevaring",
    image: "/images/shop/proeve/klatresaek-lille.png",
    description:
      "SlidstÃ¦rk klatresÃ¦k i lille stÃ¸rrelse â€” til sele, hjelm, bremse og karabiner. Den personlige sÃ¦k, der gÃ¸r, at dit grej altid er samlet og klar.",
    bullets: [
      "Til det personlige grej",
      "SlidstÃ¦rkt materiale",
      "BÃ¦reremme",
      "Holder grejet samlet",
    ],
  },
  {
    slug: "klatresaek-stor",
    name: "KlatresÃ¦k â€” stor",
    short: "Stor klatresÃ¦k til reb og fÃ¦lles grej.",
    price: 549,
    category: "Tasker & opbevaring",
    image: "/images/shop/proeve/klatresaek-stor.png",
    description:
      "Stor udgave af klatresÃ¦kken â€” plads til reb, slynger og fÃ¦lles grej til en hel dag i skoven. Robust bund og brede remme.",
    bullets: [
      "Plads til reb og fÃ¦lles grej",
      "Robust bund",
      "Brede bÃ¦reremme",
      "TÃ¥ler hÃ¥rd brug",
    ],
  },

  // â”€â”€ Telte & lavvuer â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    slug: "tentipi-safir-7",
    name: "Tentipi Safir 7 cp",
    short: "Tentipis topmodel i bomuld/polyester â€” lavvu til ca. 8 personer.",
    price: 15995,
    category: "Telte & lavvuer",
    image: "/images/shop/tentipi-safir-7.jpg",
    description:
      "Safir er Tentipis topmodel: lavvu i Ã¥ndbart bomuld/polyester-blend med gennemtÃ¦nkt ventilation, sÃ¥ du kan have bÃ¥l eller ovn inde i teltet. StÃ¸rrelse 7 sover ca. 8 personer. Vi bruger selv Tentipi-lavvuer som base pÃ¥ vores lejre og overnatningsture â€” spÃ¸rg os om stÃ¸rrelse og tilbehÃ¸r. FÃ¥s i flere stÃ¸rrelser (5/7/9) â€” kontakt os for andre stÃ¸rrelser og let-udgaver.",
    bullets: [
      "Bomuld/polyester â€” Ã¥ndbar og bÃ¥lvenlig",
      "Ca. 8 sovepladser (str. 7)",
      "Justerbar topventilation",
      "Vi bruger selv Tentipi pÃ¥ vores lejre",
    ],
  },
  {
    slug: "tentipi-zirkon-7",
    name: "Tentipi Zirkon 7",
    short: "Lavvu i let polyester â€” hurtig at rejse, stÃ¦rk i blÃ¦st.",
    price: 11495,
    category: "Telte & lavvuer",
    image: "/images/shop/tentipi-zirkon-7.jpg",
    description:
      "Zirkon er Tentipis alsidige polyester-lavvu: lettere end Safir, hurtig at rejse og meget stabil i blÃ¦st. StÃ¸rrelse 7 sover ca. 8 personer. Et stÃ¦rkt valg til spejdergrupper, skoler og familier, der vil have lejrbasen med ud hele Ã¥ret. FÃ¥s i flere stÃ¸rrelser â€” kontakt os.",
    bullets: [
      "Let og stÃ¦rk polyester",
      "Ca. 8 sovepladser (str. 7)",
      "Hurtig at rejse â€” Ã©n stang",
      "Stabil i blÃ¦st",
    ],
  },
  {
    slug: "tentipi-onyx-7",
    name: "Tentipi Onyx 7",
    short: "Tentipis prisvenlige lavvu â€” samme form, enklere udstyret.",
    price: 8495,
    category: "Telte & lavvuer",
    image: "/images/shop/tentipi-onyx-7.jpg",
    description:
      "Onyx er den prisvenlige indgang til Tentipi: samme gennemprÃ¸vede lavvu-form, enklere udstyret. StÃ¸rrelse 7 sover ca. 8 personer. Perfekt som fÃ¸rste fÃ¦llestelt til klubben eller familien. FÃ¥s i flere stÃ¸rrelser â€” kontakt os.",
    bullets: [
      "Prisvenlig indgang til Tentipi",
      "Ca. 8 sovepladser (str. 7)",
      "Ã‰n stang â€” hurtig opsÃ¦tning",
      "FÃ¥s i flere stÃ¸rrelser",
    ],
  },
  {
    slug: "tentipi-indertelt",
    name: "Tentipi indertelt Comfort",
    short: "Indertelt med bund og myggenet til Tentipi-lavvu.",
    price: 3295,
    category: "Telte & lavvuer",
    image: "/images/shop/tentipi-indertelt.jpg",
    description:
      "Indertelt med bund og myggenet til Tentipi-lavvuer. Skaber et tÃ¸rt, myggefrit soverum i halvdelen af teltet, mens resten kan bruges som opholdsrum med ovn. Oplys din teltmodel og stÃ¸rrelse ved bestilling.",
    bullets: [
      "Bund og myggenet",
      "TÃ¸rt, myggefrit soverum",
      "Passer til Tentipi-lavvuer",
      "Oplys teltstÃ¸rrelse ved bestilling",
    ],
  },
  {
    slug: "tentipi-ovn-eldfjell",
    name: "Tentipi brÃ¦ndeovn Eldfjell",
    short: "BrÃ¦ndeovn til lavvu â€” varme og hygge hele vinteren.",
    price: 5495,
    category: "Telte & lavvuer",
    image: "/images/shop/tentipi-ovn-eldfjell.jpg",
    description:
      "Eldfjell er Tentipis brÃ¦ndeovn til lavvuen: hurtig varme, kogeplads til gryden og gnistfang i skorstenen. Med ovn i teltet bliver lavvuen en helÃ¥rsbase â€” vi fyrer selv op i den pÃ¥ vinterlejre. KrÃ¦ver korrekt opstilling og ventilation; vejledning fÃ¸lger med kÃ¸bet.",
    bullets: [
      "Hurtig varme i lavvuen",
      "Kogeplads til gryde og kedel",
      "Gnistfang i skorstenen",
      "Vejledning i sikker brug fÃ¸lger med",
    ],
  },
  {
    slug: "tentipi-teltbund",
    name: "Tentipi teltbund",
    short: "Aftagelig bund til Tentipi-lavvu â€” hel eller med bÃ¥ludskÃ¦ring.",
    price: 2195,
    category: "Telte & lavvuer",
    image: "/images/shop/tentipi-teltbund.png",
    description:
      "Aftagelig teltbund til Tentipi-lavvuer. Kan lukkes helt eller Ã¥bnes i midten, sÃ¥ der er plads til bÃ¥lstedet. Holder fugt og snavs ude og gÃ¸r lavvuen behagelig, ogsÃ¥ i regnvejr. Oplys din teltmodel og stÃ¸rrelse ved bestilling.",
    bullets: [
      "Aftagelig â€” hel eller med bÃ¥ludskÃ¦ring",
      "Holder fugt og snavs ude",
      "Passer til Tentipi-lavvuer",
      "Oplys teltstÃ¸rrelse ved bestilling",
    ],
  },

  // â”€â”€ BÃ¥l & lejrliv â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  {
    slug: "baalpande",
    name: "BÃ¥lpande",
    short: "Stor stegepande til bÃ¥let â€” lejrens samlingspunkt ved madlavning.",
    price: 899,
    category: "BÃ¥l & lejrliv",
    image: "/images/shop/proeve/baalpande.png",
    description:
      "En solid bÃ¥lpande i kraftig stÃ¥lplade â€” stor nok til, at et helt hold kan lave mad sammen over bÃ¥let. BÃ¥lmad er en fast del af vores lejre og naturdannelsesforlÃ¸b, og pandeformen gÃ¸r den nem at lave alt fra pandekager til snobrÃ¸dsdej-fyld pÃ¥. TÃ¥ler Ã¥ben ild og kan stÃ¥ direkte i glÃ¸derne.",
    bullets: [
      "Kraftig stÃ¥lplade â€” tÃ¥ler Ã¥ben ild",
      "Plads til madlavning for et helt hold",
      "Nem at rengÃ¸re og vedligeholde",
      "Fast del af vores egne lejre",
    ],
  },
  {
    slug: "baalgryde-stoebejern",
    name: "BÃ¥lgryde â€” stÃ¸bejern",
    short: "StÃ¸bejernsgryde med lÃ¥g til bÃ¥l og glÃ¸demad.",
    price: 749,
    category: "BÃ¥l & lejrliv",
    image: "/images/shop/proeve/baalgryde-stoebejern.png",
    description:
      "Klassisk stÃ¸bejernsgryde med lÃ¥g og hank til ophÃ¦ng over bÃ¥let. StÃ¸bejernet fordeler varmen jÃ¦vnt, og lÃ¥get kan bruges som pande eller dÃ¦kkes med glÃ¸der, sÃ¥ gryden fungerer som ovn. Den type gryde, der hÃ¦nger over bÃ¥let pÃ¥ vores lejre, nÃ¥r der laves fÃ¦llesmad.",
    bullets: [
      "StÃ¸bejern â€” jÃ¦vn varmefordeling",
      "LÃ¥g kan bruges som pande",
      "Hank til ophÃ¦ng over bÃ¥let",
      "Holder generationer",
    ],
  },
  {
    slug: "lejroekse",
    name: "LejrÃ¸kse",
    short: "Solid Ã¸kse til brÃ¦nde og lejrarbejde â€” med vejledning i sikker brug.",
    price: 499,
    category: "BÃ¥l & lejrliv",
    image: "/images/shop/proeve/lejroekse.png",
    description:
      "En solid Ã¸kse i god kvalitet til klÃ¸vning af brÃ¦nde og almindeligt lejrarbejde. Ã˜kser er vÃ¦rktÃ¸j, ikke legetÃ¸j â€” derfor fÃ¸lger der vejledning i sikker brug med, og Ã¸kselÃ¦re indgÃ¥r i vores naturdannelsesforlÃ¸b, hvor bÃ¸rn og voksne lÃ¦rer at bruge skarpt vÃ¦rktÃ¸j med respekt.",
    bullets: [
      "Solid kvalitet til brÃ¦nde og lejrarbejde",
      "SkÃ¦ftet i godt trÃ¦",
      "Vejledning i sikker brug fÃ¸lger med",
      "Ã˜kselÃ¦re indgÃ¥r i vores forlÃ¸b",
    ],
  },
  {
    slug: "vanddunk-med-hane",
    name: "Vanddunk med hane",
    short: "Robust vandbeholder til lejren â€” rent vand til mad og hÃ¦nder.",
    price: 249,
    category: "BÃ¥l & lejrliv",
    image: "/images/shop/proeve/vanddunk-med-hane.png",
    description:
      "Robust vanddunk med tappehane til lejrlivet. Rent vand til madlavning, drikkevand og hÃ¥ndvask er fundamentet i enhver lejr â€” dunken her er nem at fylde, nem at bÃ¦re og kan stÃ¥ stabilt pÃ¥ bord eller stub med hanen fri.",
    bullets: [
      "Tappehane â€” nem hÃ¥ndvask og madlavning",
      "FÃ¸devaregodkendt plast",
      "Stabil â€” stÃ¥r sikkert pÃ¥ bord eller stub",
      "Nem at bÃ¦re og rengÃ¸re",
    ],
  },
  {
    slug: "kyllingeovn",
    name: "Kyllingeovn",
    short: "Cylinderovn i rustfrit stÃ¥l â€” steger kylling og bager brÃ¸d over bÃ¥l.",
    price: 1295,
    category: "BÃ¥l & lejrliv",
    image: "/images/shop/proeve/kyllingeovn.png",
    description:
      "Cylinderformet ovn i rustfrit stÃ¥l med skorsten â€” en klassiker pÃ¥ lejren. Fyr op i bunden, hÃ¦ng kyllingen ind, og ovnen steger den langsomt og saftigt, mens duften samler hele lejren. Kan ogsÃ¥ bruges til brÃ¸d og stege. En af de ting, deltagerne husker bedst fra vores lejre.",
    bullets: [
      "Rustfrit stÃ¥l med skorsten",
      "Steger kylling â€” bager brÃ¸d",
      "Fyres med smÃ¥brÃ¦nde i bunden",
      "Et hÃ¸jdepunkt pÃ¥ enhver lejr",
    ],
  },
  {
    slug: "rundbraender",
    name: "RundbrÃ¦nder til lavvu",
    short: "Perforeret bÃ¥lcylinder til sikkert bÃ¥l inde i lavvuen.",
    price: 549,
    category: "BÃ¥l & lejrliv",
    image: "/images/shop/proeve/rundbraender.png",
    description:
      "Perforeret bÃ¥lcylinder, der samler ilden og giver god forbrÃ¦nding med minimal gnistflugt â€” lavet til bÃ¥l inde i lavvuen omkring midterstangen. Med en rundbrÃ¦nder fÃ¥r I bÃ¥lhygge og varme i teltet pÃ¥ en kontrolleret mÃ¥de. KrÃ¦ver lavvu med tilstrÃ¦kkelig ventilation; vejledning i sikker brug fÃ¸lger med.",
    bullets: [
      "Kontrolleret bÃ¥l inde i lavvuen",
      "Perforeret â€” god forbrÃ¦nding, fÃ¥ gnister",
      "Passer omkring midterstangen",
      "Vejledning i sikker brug fÃ¸lger med",
    ],
  },
  {
    slug: "frisport-kaffekrog",
    name: "Frisport kaffekrog",
    short: "Kaffekrog til lavvuens midterstang â€” kedlen hÃ¦nger over ilden.",
    price: 199,
    category: "BÃ¥l & lejrliv",
    image: "/images/shop/proeve/frisport-kaffekrog.png",
    description:
      "Kaffekrog fra Frisport, der monteres pÃ¥ lavvuens midterstang, sÃ¥ kedel eller gryde hÃ¦nger i den rigtige hÃ¸jde over ilden. Lille detalje, stor forskel: kaffen brygges, mens hÃ¦nderne er fri. HÃ¸rer til pÃ¥ enhver lavvu-lejr.",
    bullets: [
      "Monteres pÃ¥ lavvuens midterstang",
      "Justerbar hÃ¸jde over ilden",
      "Til kedel og gryde",
      "Frisport-kvalitet",
    ],
  },
  {
    slug: "frisport-toerrestativ",
    name: "Frisport tÃ¸rrestativ",
    short: "TÃ¸rrestativ til lavvuen â€” vÃ¥dt tÃ¸j tÃ¸rrer i varmen fra ilden.",
    price: 349,
    category: "BÃ¥l & lejrliv",
    image: "/images/shop/proeve/frisport-toerrestativ.png",
    description:
      "TÃ¸rrestativ fra Frisport til montering i lavvuen. VÃ¥dt tÃ¸j, sokker og handsker tÃ¸rrer i varmen fra ilden i lÃ¸bet af aftenen â€” en uvurderlig detalje pÃ¥ flerdagslejre i dansk vejr. Foldes sammen og fylder nÃ¦sten ingenting i bagagen.",
    bullets: [
      "TÃ¸rrer tÃ¸j i varmen fra ilden",
      "Monteres i lavvuen",
      "Foldes sammen â€” fylder minimalt",
      "UundvÃ¦rlig pÃ¥ flerdagslejre",
    ],
  },

  // (Softshell, skaljakke og vest med logo er internt medarbejdertÃ¸j â€”
  //  se /admin/arbejdstoej. De sÃ¦lges ikke i shoppen.)

  // â”€â”€ T-shirts â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  // Tekst-t-shirts med glimt i Ã¸jet. StÃ¸rrelse vÃ¦lges via sizes-feltet.
  {
    slug: "tshirt-find-me-in-the-woods",
    name: "T-shirt â€” Find me in the woods",
    short: "SkovgrÃ¸n t-shirt til dem, der altid er pÃ¥ vej ud mellem trÃ¦erne.",
    price: 249,
    category: "T-shirts climbers collection",
    sizes: ["S", "M", "L", "XL", "XXL"],
    image: "/images/shop/tshirt-find-me-in-the-woods.jpg",
    description:
      "Til dig, der hellere vil findes i skoven end pÃ¥ kontoret. SkovgrÃ¸n t-shirt i kraftig bomuldskvalitet med trykket \"Find me in the woods\" pÃ¥ brystet. FÃ¥s i stÃ¸rrelse Sâ€“XXL â€” vÃ¦lg stÃ¸rrelse, nÃ¥r du lÃ¦gger den i kurven.",
    bullets: [
      "Kraftig bomuldskvalitet",
      "SkovgrÃ¸nt tryk-design",
      "Unisex pasform",
      "FÃ¥s i Sâ€“XXL â€” vÃ¦lg stÃ¸rrelse ved kÃ¸b",
    ],
  },
  {
    slug: "tshirt-op-i-traeet",
    name: "T-shirt â€” Op i trÃ¦et!",
    short: "Den danske klassiker med dobbeltbetydning â€” naturfarvet med grÃ¸nt tryk.",
    price: 249,
    category: "T-shirts climbers collection",
    sizes: ["S", "M", "L", "XL", "XXL"],
    image: "/images/shop/tshirt-op-i-traeet.jpg",
    description:
      "\"Op i trÃ¦et!\" â€” bÃ¥de en venlig opfordring og vores livsfilosofi. Naturfarvet t-shirt i kraftig bomuldskvalitet med skovgrÃ¸nt tryk. FÃ¥s i stÃ¸rrelse Sâ€“XXL â€” vÃ¦lg stÃ¸rrelse, nÃ¥r du lÃ¦gger den i kurven.",
    bullets: [
      "Kraftig bomuldskvalitet",
      "Dansk tekst med glimt i Ã¸jet",
      "Unisex pasform",
      "FÃ¥s i Sâ€“XXL â€” vÃ¦lg stÃ¸rrelse ved kÃ¸b",
    ],
  },
  {
    slug: "tshirt-jeg-haenger-bare-ud",
    name: "T-shirt â€” Jeg hÃ¦nger bare ud",
    short: "Klatrehumor i signalorange â€” for dem, der bogstaveligt talt hÃ¦nger ud.",
    price: 249,
    category: "T-shirts climbers collection",
    sizes: ["S", "M", "L", "XL", "XXL"],
    image: "/images/shop/tshirt-jeg-haenger-bare-ud.jpg",
    description:
      "NÃ¥r nogen spÃ¸rger, hvad du laver i weekenden: \"Jeg hÃ¦nger bare ud.\" I en sele. Ti meter oppe. Orange t-shirt i kraftig bomuldskvalitet med hvidt tryk. FÃ¥s i stÃ¸rrelse Sâ€“XXL â€” vÃ¦lg stÃ¸rrelse, nÃ¥r du lÃ¦gger den i kurven.",
    bullets: [
      "Kraftig bomuldskvalitet",
      "Klatrehumor med dobbeltbetydning",
      "Unisex pasform",
      "FÃ¥s i Sâ€“XXL â€” vÃ¦lg stÃ¸rrelse ved kÃ¸b",
    ],
  },
  {
    slug: "tshirt-the-tree-is-calling",
    name: "T-shirt â€” The tree is calling and I must go",
    short: "Parodien pÃ¥ bjergklassikeren â€” for os er det trÃ¦kronerne, der kalder.",
    price: 249,
    category: "T-shirts climbers collection",
    sizes: ["S", "M", "L", "XL", "XXL"],
    image: "/images/shop/tshirt-the-tree-is-calling.jpg",
    description:
      "Bjergfolket har deres citat â€” vi har vores: \"The tree is calling and I must go.\" SkovgrÃ¸n t-shirt i kraftig bomuldskvalitet med varmt orange tryk. FÃ¥s i stÃ¸rrelse Sâ€“XXL â€” vÃ¦lg stÃ¸rrelse, nÃ¥r du lÃ¦gger den i kurven.",
    bullets: [
      "Kraftig bomuldskvalitet",
      "Parodi pÃ¥ den klassiske bjerg-quote",
      "Unisex pasform",
      "FÃ¥s i Sâ€“XXL â€” vÃ¦lg stÃ¸rrelse ved kÃ¸b",
    ],
  },
  {
    slug: "tshirt-gone-climbing",
    name: "T-shirt â€” Gone climbing",
    short: "Det eneste fravÃ¦rssvar, du behÃ¸ver â€” naturfarvet med terracotta-tryk.",
    price: 249,
    category: "T-shirts climbers collection",
    sizes: ["S", "M", "L", "XL", "XXL"],
    image: "/images/shop/tshirt-gone-climbing.jpg",
    description:
      "Autosvar, dÃ¸rskilt og statusopdatering i Ã©t: \"Gone climbing.\" Naturfarvet t-shirt i kraftig bomuldskvalitet med terracotta-tryk. FÃ¥s i stÃ¸rrelse Sâ€“XXL â€” vÃ¦lg stÃ¸rrelse, nÃ¥r du lÃ¦gger den i kurven.",
    bullets: [
      "Kraftig bomuldskvalitet",
      "Kort og kontant klatrehumor",
      "Unisex pasform",
      "FÃ¥s i Sâ€“XXL â€” vÃ¦lg stÃ¸rrelse ved kÃ¸b",
    ],
  },
  {
    slug: "tshirt-find-mig-i-skoven",
    name: "T-shirt â€” Find mig i skoven (kig op)",
    short: "Den danske udgave med punchline: kig op, for vi er sjÃ¦ldent pÃ¥ jorden.",
    price: 249,
    category: "T-shirts climbers collection",
    sizes: ["S", "M", "L", "XL", "XXL"],
    image: "/images/shop/tshirt-find-mig-i-skoven.jpg",
    description:
      "\"Find mig i skoven â€” kig op.\" For hvis du leder efter os i Ã¸jenhÃ¸jde, leder du det forkerte sted. GrÃ¥grÃ¸n t-shirt i kraftig bomuldskvalitet med lyst tryk. FÃ¥s i stÃ¸rrelse Sâ€“XXL â€” vÃ¦lg stÃ¸rrelse, nÃ¥r du lÃ¦gger den i kurven.",
    bullets: [
      "Kraftig bomuldskvalitet",
      "Dansk tekst med punchline",
      "Unisex pasform",
      "FÃ¥s i Sâ€“XXL â€” vÃ¦lg stÃ¸rrelse ved kÃ¸b",
    ],
  },
];

export function findProduct(slug) {
  return products.find((p) => p.slug === slug) ?? null;
}
