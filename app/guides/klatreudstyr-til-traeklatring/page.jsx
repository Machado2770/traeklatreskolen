import { graph, articleLd, faqLd, breadcrumbLd, jsonLdScript } from "@/lib/jsonld";
import * as s from "../guideStyles";

const PATH = "/guides/klatreudstyr-til-traeklatring";
const TITLE = "Klatreudstyr til træklatring — hvad skal du bruge?";

export const metadata = {
  title: TITLE,
  description:
    "Komplet guide til klatreudstyr til træklatring: reb, sele, hjelm, karabiner, rebbremse, slynger og kasteline. Hvad det bruges til, og hvad du skal starte med.",
  alternates: { canonical: PATH },
  openGraph: {
    title: `${TITLE} | Træklatreskolen`,
    description:
      "Reb, sele, hjelm, karabiner og rebbremse — sådan vælger du klatreudstyr til træklatring. Guide fra Træklatreskolen.",
    url: PATH,
    images: [{ url: "/og/shop.png", width: 1200, height: 630, alt: "Klatreudstyr til træklatring — Træklatreskolen" }],
  },
};

// Hvert punkt linker til den relevante kategori i shoppen (anker-id matcher catId).
const gear = [
  {
    title: "Reb",
    text: "Hjertet i systemet. Til træklatring bruges som regel et dynamisk eller semistatisk klatrereb i passende længde. Rebet bærer dig — så her går du ikke på kompromis med kvaliteten.",
    href: "/shop#reb-liner",
    link: "Se reb & liner",
  },
  {
    title: "Sele",
    text: "En siddesele med god polstring gør lange seancer i træet behagelige. Til børn og særlige opgaver bruges fuldkropsseler.",
    href: "/shop#seler",
    link: "Se seler",
  },
  {
    title: "Hjelm",
    text: "Beskytter mod nedfaldende grene og stød. En klatrehjelm er obligatorisk udstyr — også for dem på jorden.",
    href: "/shop#hjelme",
    link: "Se hjelme",
  },
  {
    title: "Karabiner",
    text: "Forbinder systemets dele. HMS-karabiner med skruelås er arbejdshesten; til kritiske punkter bruges automatiske twistlock-karabiner.",
    href: "/shop#karabiner",
    link: "Se karabiner",
  },
  {
    title: "Rebbremse & sikring",
    text: "Bruges til at klatre op, holde positionen og komme kontrolleret ned igen. ATC, GriGri og ottetaller er typiske valg.",
    href: "/shop#rebbremser-sikring",
    link: "Se rebbremser & sikring",
  },
  {
    title: "Slynger & prusik",
    text: "Båndslynger og prusiksnore bruges til ankre, fastgøring og friktionsknob i systemet — små dele med stor betydning.",
    href: "/shop#slynger-stiger",
    link: "Se slynger & stiger",
  },
  {
    title: "Kasteline & kastepose",
    text: "Sådan får du rebet op over den rigtige gren. En kastepose i enden af en tynd kasteline kastes op og trækker klatrerebet med.",
    href: "/shop#kasteposer-kasteliner",
    link: "Se kasteposer & kasteliner",
  },
  {
    title: "Taske & opbevaring",
    text: "En rebpose eller vandtæt pakpose holder grejet rent, tørt og klar. Den forlænger samtidig udstyrets levetid.",
    href: "/shop#tasker-opbevaring",
    link: "Se tasker & opbevaring",
  },
];

const faqs = [
  {
    q: "Hvad er det vigtigste udstyr at starte med?",
    a: "Hvis du vil købe dit eget, så start med en sele, en hjelm og en rebbremse — det er det personlige udstyr, der gør størst forskel. Derefter et reb og de karabiner og slynger, der hører til systemet.",
  },
  {
    q: "Skal jeg købe en klatrepakke?",
    a: "En klatrepakke er ofte den billigste og letteste vej, fordi alle dele er afstemt efter hinanden. Vores klatrepakker er sammensat af de instruktører, der underviser på kurserne, og dækker alt fra reb til opbevaring.",
  },
  {
    q: "Hvor godt skal udstyret være?",
    a: "Sikkerhedsudstyr skal være CE-godkendt og i god stand. Reb, seler, hjelme og bremser bærer eller beskytter dig, så her bør du vælge kvalitet frem for pris. Vi sælger kun udstyr, vi selv bruger i undervisningen.",
  },
  {
    q: "Kan jeg få vejledning til at vælge?",
    a: "Ja. Du handler direkte med instruktørerne bag Træklatreskolen, og kvalificeret vejledning følger altid med købet. Er du i tvivl om størrelse eller sammensætning, så skriv til os — du får svar fra en underviser, ikke en sælger.",
  },
  {
    q: "Hvor længe holder klatreudstyr?",
    a: "Det afhænger af brug, opbevaring og type. Tekstildele (reb, seler, slynger) har en begrænset levetid og skal kasseres efter slid, alder eller hårde belastninger. Metaldele holder længere, men skal også efterses. Opbevar altid grejet tørt og væk fra sol.",
  },
];

const jsonLd = graph(
  articleLd({
    title: TITLE,
    description: metadata.description,
    path: PATH,
    image: "/og/shop.png",
    datePublished: "2026-06-08",
    dateModified: "2026-06-08",
  }),
  faqLd(faqs),
  breadcrumbLd([
    { name: "Forside", path: "/" },
    { name: "Guides", path: "/guides" },
    { name: "Klatreudstyr til træklatring", path: PATH },
  ])
);

export default function UdstyrGuide() {
  return (
    <>
      <script {...jsonLdScript(jsonLd)} />
      <main>
        <section className="page-hero" style={{ backgroundImage: "url('/images/hero-forest.jpg')" }}>
          <div className="page-hero-overlay">
            <div className="page-hero-inner">
              <p className="page-hero-eyebrow">Guide</p>
              <h1 className="page-hero-title">Klatreudstyr til træklatring</h1>
              <p className="page-hero-text" style={{ maxWidth: 680 }}>
                Hvad du skal bruge — og hvad du med fordel starter med.
              </p>
            </div>
          </div>
        </section>

        <section style={s.sectionWhite}>
          <div style={s.narrow}>
            <p style={s.intro}>
              Det rette udstyr gør træklatring både trygt og behageligt. Her gennemgår vi det
              grundlæggende grej, hvad hver del bruges til, og hvad du med fordel begynder med. Alt
              udstyret kan ses i{" "}
              <a href="/shop" style={s.inlineLink}>shoppen</a> — det samme, vi selv underviser med.
            </p>
          </div>
        </section>

        <section style={s.sectionGreen}>
          <div style={s.wide}>
            <h2 style={{ ...s.h2, textAlign: "center" }}>Det grundlæggende udstyr</h2>
            <div style={{ ...s.accent, margin: "0 auto 28px" }} />
            <div style={s.cardGrid}>
              {gear.map((g) => (
                <div key={g.title} style={s.infoCard}>
                  <div style={s.cardAccent} />
                  <h3 style={s.cardTitle}>{g.title}</h3>
                  <p style={s.cardText}>{g.text}</p>
                  <p style={{ margin: "12px 0 0" }}>
                    <a href={g.href} style={s.cardLink}>{g.link} →</a>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={s.sectionWhite}>
          <div style={s.narrow}>
            <h2 style={s.h2}>Skal jeg købe en klatrepakke?</h2>
            <div style={s.accent} />
            <p style={s.bodyText}>
              Hvis du skal bruge det meste alligevel, er en klatrepakke ofte både billigere og lettere.
              Delene er afstemt efter hinanden, så du ikke selv skal regne ud, hvad der passer sammen.
              Vores klatrepakker er sammensat af de samme instruktører, der underviser på kurserne — og
              en introduktion til udstyret følger med købet.
            </p>
            <p style={s.bodySpace}>
              <a href="/shop#klatrepakker" style={s.inlineLink}>Se klatrepakkerne i shoppen →</a>
            </p>
          </div>
        </section>

        <section style={s.sectionGreen}>
          <div style={s.narrow}>
            <h2 style={s.h2}>Køb teknikken med</h2>
            <div style={s.accent} />
            <p style={s.bodyText}>
              Det bedste udstyr gør først for alvor nytte, når teknikken sidder. Derfor anbefaler vi
              altid at kombinere et køb med et kursus — så grejet bærer dig sikkert, fordi du ved,
              hvordan det skal bruges. Er du helt ny, så start med vores{" "}
              <a href="/guides/kom-i-gang-med-traeklatring" style={s.inlineLink}>begynderguide</a>.
            </p>
          </div>
        </section>

        <section style={s.faqSection}>
          <div style={s.faqInner}>
            <h2 style={s.faqHeading}>Ofte stillede spørgsmål</h2>
            <div style={s.faqGrid}>
              {faqs.map((item) => (
                <details key={item.q} style={s.faqCard}>
                  <summary style={s.faqQuestion}>{item.q}</summary>
                  <p style={s.faqAnswer}>{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section style={s.ctaSection}>
          <div style={s.ctaInner}>
            <h2 style={s.ctaTitle}>Find dit udstyr</h2>
            <p style={s.ctaText}>
              Se det grej, vi selv klatrer med — kvalificeret vejledning følger med købet.
            </p>
            <div style={s.ctaButtons}>
              <a href="/shop" style={s.ctaPrimary}>Gå til shoppen</a>
              <a href="/kontakt" style={s.ctaSecondary}>Få vejledning</a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
