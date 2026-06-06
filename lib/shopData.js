// Fallback-/seed-produkter til webshoppen.
// Supabase-tabellen `shop_products` er kilden til sandhed når den har data
// (se lib/getProducts.js). Disse bruges som nødbackup og til at seede.
//
// Priser er i hele kroner (DKK). Checkout omregner til øre server-side.

export const SHIPPING = {
  // Fast fragt og fri fragt over et beløb (begge i kr).
  flatRate: 49,
  freeOver: 750,
};

export const products = [
  {
    slug: "klatresele-standard",
    name: "Klatresele — Standard",
    short: "Komfortabel allround-klatresele til træklatring og friluftsbrug.",
    price: 749,
    category: "Seler",
    stock: 12,
    image: "/images/rebklatring.jpg",
    description:
      "En robust og komfortabel klatresele, der passer til både begyndere og erfarne. Justerbare benløkker og hoftebælte giver god pasform, og det polstrede design sikrer komfort under lange seancer i trækronerne.",
    bullets: [
      "Justerbare ben- og hofteløkker",
      "Polstret for komfort",
      "CE-godkendt",
      "Egnet til træklatring og friluftsliv",
    ],
  },
  {
    slug: "dynamisk-reb-40m",
    name: "Dynamisk klatrereb — 40 m",
    short: "Slidstærkt dynamisk reb til sikker klatring og rebarbejde.",
    price: 1295,
    category: "Reb",
    stock: 8,
    image: "/images/rebklatring.jpg",
    description:
      "Et alsidigt dynamisk klatrereb på 40 meter med god håndtering og høj slidstyrke. Velegnet til både undervisning og avanceret rebarbejde i trækronerne.",
    bullets: [
      "40 meter længde",
      "Dynamisk — absorberer fald",
      "Slidstærk kappe",
      "Tydelig midtmarkering",
    ],
  },
  {
    slug: "hjelm-ventileret",
    name: "Klatrehjelm — ventileret",
    short: "Letvægtshjelm med god ventilation og justerbar pasform.",
    price: 449,
    category: "Hjelme",
    stock: 20,
    image: "/images/gallery-side-2.jpg",
    description:
      "En let og velventileret klatrehjelm, der beskytter mod fald og nedfaldende grene. Justerbar i størrelsen og med plads til pandelampe.",
    bullets: [
      "Letvægt og god ventilation",
      "Justerbar pasform",
      "Holdere til pandelampe",
      "CE-godkendt",
    ],
  },
  {
    slug: "karabin-skruelaas-3pak",
    name: "Skruekarabiner — 3-pak",
    short: "Sikre HMS-karabiner med skruelås til klatresystemer.",
    price: 299,
    category: "Karabiner",
    stock: 30,
    image: "/images/gallery-side-1.jpg",
    description:
      "Tre stærke HMS-karabiner med skruelås — et must i ethvert klatresystem. Stor åbning og glat funktion for nem håndtering med handsker.",
    bullets: [
      "3 stk. HMS-karabiner",
      "Skruelås for ekstra sikkerhed",
      "Stor åbning",
      "CE-godkendt",
    ],
  },
  {
    slug: "friluftsrygsaek-30l",
    name: "Friluftsrygsæk — 30 L",
    short: "Robust dagsrygsæk til ture i skov og natur.",
    price: 599,
    category: "Friluft",
    stock: 15,
    image: "/images/overnatning-koeje.jpg",
    description:
      "En slidstærk 30-liters rygsæk med god rygkomfort og masser af lommer til udstyr. Perfekt til friluftsture, kurser og en dag i trækronerne.",
    bullets: [
      "30 liters volumen",
      "Polstret ryg og remme",
      "Vandafvisende materiale",
      "Flere rum og lommer",
    ],
  },
  {
    slug: "klatrehandsker",
    name: "Klatrehandsker",
    short: "Slidstærke handsker med godt greb til rebarbejde.",
    price: 199,
    category: "Tilbehør",
    stock: 25,
    image: "/images/gallery-main.jpg",
    description:
      "Beskyt hænderne under rebarbejde og klatring. Slidstærkt materiale i håndfladen og åndbart på oversiden for komfort hele dagen.",
    bullets: [
      "Forstærket håndflade",
      "Godt greb om rebet",
      "Åndbart materiale",
      "Fås i flere størrelser",
    ],
  },
];

export function findProduct(slug) {
  return products.find((p) => p.slug === slug) ?? null;
}
