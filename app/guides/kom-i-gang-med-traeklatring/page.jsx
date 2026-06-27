import { graph, articleLd, faqLd, breadcrumbLd, jsonLdScript } from "@/lib/jsonld";
import * as s from "../guideStyles";

const PATH = "/guides/kom-i-gang-med-traeklatring";
const TITLE = "Kom i gang med træklatring — guide for begyndere";

export const metadata = {
  title: TITLE,
  description:
    "Sådan kommer du i gang med træklatring: hvad det er, hvilket udstyr du skal bruge, om det er sikkert, og hvordan du tager de første skridt op i trækronerne — trin for trin.",
  alternates: { canonical: PATH },
  openGraph: {
    title: `${TITLE} | Træklatreskolen`,
    description:
      "Hvad er træklatring, er det sikkert, og hvordan starter man? En begyndervenlig guide fra Træklatreskolen.",
    url: PATH,
    images: [{ url: "/og/forside.png", width: 1200, height: 630, alt: "Kom i gang med træklatring — Træklatreskolen" }],
  },
};

const steps = [
  {
    title: "1. Tag et begynderkursus",
    text: "Den trygge vej ind er et begynderkursus, hvor du lærer udstyr, sikkerhed og grundteknik fra bunden — sammen med en uddannet instruktør.",
  },
  {
    title: "2. Lær systemet at kende",
    text: "Du lærer at lægge klatresystemet op, tjekke udstyret, binde de vigtigste knob og kommunikere tydeligt med din makker.",
  },
  {
    title: "3. Få din egen rutine",
    text: "Når teknikken sidder, kan du klatre mere selvstændigt. Mange tager et brush-up-kursus eller investerer i eget udstyr.",
  },
  {
    title: "4. Kom højere op",
    text: "Vil du videre, findes der avancerede kurser og en egentlig instruktøruddannelse efter Dansk Træklatreforenings normer.",
  },
];

const faqs = [
  {
    q: "Skal jeg have erfaring for at starte med træklatring?",
    a: "Nej. Et begynderkursus kræver ingen forudsætninger og starter helt fra bunden med udstyr, sikkerhed og grundteknik. Du behøver hverken klatreerfaring eller særlig styrke — teknik er vigtigere end kræfter.",
  },
  {
    q: "Er træklatring sikkert?",
    a: "Ja. Al klatring foregår med professionelt sikkerhedsudstyr og efter Dansk Træklatreforenings normer, og aktiviteterne er erhvervsforsikrede. Sikkerhed gennemgås altid grundigt, inden du kommer op i træet.",
  },
  {
    q: "Hvilket udstyr skal jeg bruge som begynder?",
    a: "På et kursus stiller vi alt udstyret til rådighed: reb, sele, hjelm, karabiner og rebbremse. Vil du købe dit eget, kan du starte med en sele, hjelm og en rebbremse — og senere et reb. Se vores udstyrsguide for en gennemgang.",
  },
  {
    q: "Hvad koster det at komme i gang?",
    a: "Et begynderkursus over 2 dage koster 2.400 kr. og inkluderer udstyr og vejledning. Det er den billigste og tryggeste måde at finde ud af, om træklatring er noget for dig.",
  },
  {
    q: "Hvor gammel skal man være?",
    a: "Træklatring kan tilpasses både børn, unge og voksne. Kontakt os, hvis du planlægger et forløb for en bestemt aldersgruppe, så finder vi det rette niveau.",
  },
  {
    q: "Hvor foregår det?",
    a: "Træklatreskolen afholder kurser og oplevelser i hele Danmark — på Sjælland, Fyn og i Jylland. Se aktuelle datoer og steder i kursuskalenderen.",
  },
];

const jsonLd = graph(
  articleLd({
    title: TITLE,
    description: metadata.description,
    path: PATH,
    image: "/images/hero-forest.jpg",
    datePublished: "2026-06-08",
    dateModified: "2026-06-08",
  }),
  faqLd(faqs),
  breadcrumbLd([
    { name: "Forside", path: "/" },
    { name: "Guides", path: "/guides" },
    { name: "Kom i gang med træklatring", path: PATH },
  ])
);

export default function KomIGangGuide() {
  return (
    <>
      <script {...jsonLdScript(jsonLd)} />
      <main>
        <section className="page-hero" style={{ backgroundImage: "url('/images/hero-forest.jpg')" }}>
          <div className="page-hero-overlay">
            <div className="page-hero-inner">
              <p className="page-hero-eyebrow">Guide</p>
              <h1 className="page-hero-title">Kom i gang med træklatring</h1>
              <p className="page-hero-text" style={{ maxWidth: 680 }}>
                Hvad det er, om det er sikkert, og hvordan du tager de første skridt op i trækronerne.
              </p>
            </div>
          </div>
        </section>

        <section style={s.sectionWhite}>
          <div style={s.narrow}>
            <p style={s.intro}>
              Træklatring er en rolig, teknisk og overraskende tilgængelig måde at opleve naturen på.
              Du behøver hverken stor styrke eller tidligere erfaring — kun lyst til at komme op i
              trækronerne. Denne guide gennemgår, hvad træklatring er, hvad du skal bruge, og hvordan
              du kommer trygt i gang.
            </p>
          </div>
        </section>

        <section style={s.sectionGreen}>
          <div style={s.narrow}>
            <h2 style={s.h2}>Hvad er træklatring?</h2>
            <div style={s.accent} />
            <p style={s.bodyText}>
              Træklatring (også kaldet rekreativ træklatring) handler om at klatre op i levende træer
              ved hjælp af reb og sikkerhedsudstyr — ikke ved at kravle på grenene. Du hænger i et reb,
              der er lagt op over en bærende gren, og bevæger dig op og ned med en rebbremse, præcis som
              i klatring på klipper, men med træet som ramme.
            </p>
            <p style={s.bodySpace}>
              Det er en aktivitet med plads til ro og fordybelse. Mange oplever, at perspektivet ændrer
              sig, når man kommer op i højden: skoven bliver et rum, man er en del af, frem for noget,
              man går igennem. Læs mere om den side af det under{" "}
              <a href="/naturdannelse" style={s.inlineLink}>naturdannelse</a>.
            </p>
          </div>
        </section>

        <section style={s.sectionWhite}>
          <div style={s.narrow}>
            <h2 style={s.h2}>Hvad skal du kunne for at starte?</h2>
            <div style={s.accent} />
            <p style={s.bodyText}>
              Stort set ingenting på forhånd. Det vigtigste er teknik, ikke kræfter — rebsystemet gør
              det meste af arbejdet. Som begynder skal du kunne:
            </p>
            <ul style={s.checkList}>
              <li style={s.checkItem}><span style={s.check}>✓</span>Bevæge dig nogenlunde frit (ingen særlig styrke kræves)</li>
              <li style={s.checkItem}><span style={s.check}>✓</span>Følge instruktioner om sikkerhed og udstyr</li>
              <li style={s.checkItem}><span style={s.check}>✓</span>Have lyst til at prøve noget nyt i højden</li>
            </ul>
            <p style={s.bodySpace}>
              Alt det tekniske — knob, makkertjek, rebbremse og kommunikation — lærer du på kurset.
            </p>
          </div>
        </section>

        <section style={s.sectionGreen}>
          <div style={s.wide}>
            <h2 style={{ ...s.h2, textAlign: "center" }}>Sådan kommer du i gang — trin for trin</h2>
            <div style={{ ...s.accent, margin: "0 auto 28px" }} />
            <div style={s.cardGrid}>
              {steps.map((step) => (
                <div key={step.title} style={s.infoCard}>
                  <div style={s.cardAccent} />
                  <h3 style={s.cardTitle}>{step.title}</h3>
                  <p style={s.cardText}>{step.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={s.sectionWhite}>
          <div style={s.narrow}>
            <h2 style={s.h2}>Hvilket udstyr skal du bruge?</h2>
            <div style={s.accent} />
            <p style={s.bodyText}>
              På et kursus stiller vi alt udstyret til rådighed, så du ikke behøver købe noget for at
              komme i gang. Vil du senere have dit eget grej, er en sele, en hjelm og en rebbremse et
              godt sted at starte — og derefter et reb.
            </p>
            <p style={s.bodySpace}>
              Vi har skrevet en grundig{" "}
              <a href="/guides/klatreudstyr-til-traeklatring" style={s.inlineLink}>guide til klatreudstyr</a>,
              og du kan se det udstyr, vi selv underviser med, i{" "}
              <a href="/shop" style={s.inlineLink}>shoppen</a>.
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
            <h2 style={s.ctaTitle}>Klar til at prøve?</h2>
            <p style={s.ctaText}>
              Et begynderkursus er den tryggeste vej op i trækronerne — udstyr og vejledning følger med.
            </p>
            <div style={s.ctaButtons}>
              <a href="/kurser/begynder" style={s.ctaPrimary}>Se begynderkursus</a>
              <a href="/kursuskalender" style={s.ctaSecondary}>Se datoer</a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
