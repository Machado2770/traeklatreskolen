export const courses = [
  {
    slug: "begynder",
    title: "Begynder i træklatring",
    short: "Kom trygt i gang med træklatring",
    price: "1.900 kr.",
    level: "Begynder",
    bookingHref: "/booking?course=Begynder%20i%20tr%C3%A6klatring",
    image:
      "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=1400&q=80",
    description:
      "Et grundigt introduktionskursus for dig, der vil lære træklatring fra bunden med fokus på sikkerhed, teknik og naturoplevelse.",
    bullets: [
      "Introduktion til udstyr og sikkerhed",
      "Grundlæggende klatreteknik",
      "Knob, reb og kommunikation",
      "Tryg progression i levende træer",
    ],
  },
  {
    slug: "instruktor",
    title: "Træklatreinstruktør",
    short: "Bliv stærkere i ansvar, formidling og sikkerhed",
    price: "4.000 kr.",
    level: "Videregående",
    bookingHref: "/booking?course=Tr%C3%A6klatreinstrukt%C3%B8r",
    image:
      "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1400&q=80",
    description:
      "For dig der vil tage ansvar for andres læring og sikkerhed i træet. Fokus på formidling, systemforståelse og instruktørrollen.",
    bullets: [
      "Didaktik og formidling",
      "Sikkerhed og nødprocedurer",
      "Ansvar og risikovurdering",
      "Undervisning i praksis",
    ],
  },
  {
    slug: "avanceret",
    title: "Avanceret træklatring",
    short: "Fordybelse, redning og mere komplekse opbygninger",
    price: "2.900 kr.",
    level: "Avanceret",
    bookingHref: "/booking?course=Avanceret%20tr%C3%A6klatring",
    image:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1400&q=80",
    description:
      "For erfarne deltagere, der vil arbejde videre med avancerede teknikker, redning, opbygninger og faglig fordybelse.",
    bullets: [
      "Avancerede systemer",
      "Redning og problemløsning",
      "Opbygning af aktiviteter",
      "Faglig refleksion",
    ],
  },
];

export const experiences = [
  {
    slug: "traetur",
    title: "Oplevelsestur i trækronerne",
    short: "Oplev skoven fra oven",
    price: "Fra 500 kr.",
    bookingHref: "/booking?course=Oplevelsestur%20i%20tr%C3%A6kronerne",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80",
    description:
      "En sanselig og tryg tur op i trækronerne, hvor udsigt, ro og naturfornemmelse er i centrum.",
    bullets: [
      "Rolig introduktion",
      "Smukke skovoplevelser",
      "For grupper og enkeltpersoner",
    ],
  },
  {
    slug: "overnatning",
    title: "Overnatning i trækronerne",
    short: "Sov i højden og mærk skoven om natten",
    price: "1.350 kr.",
    bookingHref: "/booking?course=Overnatning%20i%20tr%C3%A6kronerne",
    image:
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1400&q=80",
    description:
      "En særlig naturoplevelse med hængekøje, lejrstemning og overnatning tæt på bladene og mørket.",
    bullets: [
      "Lejr og bål",
      "Overnatning i højden",
      "For dig der vil have en anderledes naturtur",
    ],
  },
  {
    slug: "vild",
    title: "Den vilde klatretur",
    short: "En mere intens oplevelse for modige deltagere",
    price: "650 kr.",
    bookingHref: "/booking?course=Den%20vilde%20klatretur",
    image:
      "https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&w=1400&q=80",
    description:
      "En mere intens oplevelse med højder, udfordringer og stærke fælles oplevelser i træerne.",
    bullets: [
      "Mere fart og udfordring",
      "Fokus på mod og samarbejde",
      "Velegnet til grupper",
    ],
  },
];

export const calendarItems = [
  {
    id: 1,
    date: "12. maj 2026",
    title: "Begynder i træklatring",
    place: "Sjælland",
    status: "6 pladser ledige",
    type: "Kursus",
    href: "/kurser/begynder",
    bookingHref: "/booking?course=Begynder%20i%20tr%C3%A6klatring",
  },
  {
    id: 2,
    date: "23. maj 2026",
    title: "Oplevelsestur i trækronerne",
    place: "Fyn",
    status: "Åben for booking",
    type: "Oplevelse",
    href: "/oplevelser/traetur",
    bookingHref: "/booking?course=Oplevelsestur%20i%20tr%C3%A6kronerne",
  },
  {
    id: 3,
    date: "6. juni 2026",
    title: "Brush-up",
    place: "Nordsjælland",
    status: "4 pladser ledige",
    type: "Kursus",
    href: "/booking",
    bookingHref: "/booking",
  },
  {
    id: 4,
    date: "20. juni 2026",
    title: "Træklatreinstruktør",
    place: "Sjælland",
    status: "Tilmelding åben",
    type: "Kursus",
    href: "/kurser/instruktor",
    bookingHref: "/booking?course=Tr%C3%A6klatreinstrukt%C3%B8r",
  },
  {
    id: 5,
    date: "28. juni 2026",
    title: "Overnatning i trækronerne",
    place: "Midtjylland",
    status: "Få pladser tilbage",
    type: "Oplevelse",
    href: "/oplevelser/overnatning",
    bookingHref: "/booking?course=Overnatning%20i%20tr%C3%A6kronerne",
  },
];