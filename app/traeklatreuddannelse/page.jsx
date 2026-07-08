import { getCourses } from "@/lib/getCourses";
import {
  graph,
  breadcrumbLd,
  courseLd,
  faqLd,
  organizationLd,
  jsonLdScript,
} from "@/lib/jsonld";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Træklatreuddannelse — bliv træklatreinstruktør",
  description:
    "Træklatreuddannelse hos Træklatreskolen: bliv træklatreinstruktør trin for trin — fra begynderkursus over avanceret træklatring til instruktøruddannelse og eksamen efter Dansk Træklatreforenings norm. Uddannelse i træklatring i hele Danmark.",
  alternates: { canonical: "/traeklatreuddannelse" },
  openGraph: {
    title: "Træklatreuddannelse | Træklatreskolen",
    description:
      "Bliv træklatreinstruktør trin for trin — begynderkursus, avanceret træklatring, instruktøruddannelse og eksamen efter Dansk Træklatreforenings norm.",
    url: "/traeklatreuddannelse",
    images: [{ url: "/og/kurser.png", width: 1200, height: 630, alt: "Træklatreuddannelse — Træklatreskolen" }],
  },
};

// Trin på uddannelsesstigen — rækkefølge og korte forklaringer.
// Priserne hentes fra samme kilde som resten af sitet, så de altid stemmer.
const STEPS = [
  {
    slug: "begynder",
    step: "Trin 1",
    title: "Begynderkursus i træklatring",
    text: "Fundamentet. Du lærer udstyr, sikkerhed, knob og grundteknik fra bunden og bevæger dig trygt op i trækronerne for første gang. Ingen forudsætninger.",
  },
  {
    slug: "brush-up",
    step: "Trin 2",
    title: "Brush-up",
    text: "Har du klatret før, men trænger til at genopfriske teknik og sikkerhed? Brush-up gør dig skarp og tryg igen, inden du bygger videre på uddannelsen.",
  },
  {
    slug: "avanceret",
    step: "Trin 3",
    title: "Avanceret træklatring",
    text: "Videregående teknik: avancerede rebbaner, traverser, sikker opsætning og risikovurdering. Her løfter du dig fra sikker klatrer til rutineret træklatrer.",
  },
  {
    slug: "instruktor",
    step: "Trin 4",
    title: "Træklatreinstruktør-uddannelse",
    text: "Det afsluttende trin. På 5 undervisningsdage lærer du at planlægge og lede træklatring for grupper — og du eksamineres som træklatreinstruktør efter Dansk Træklatreforenings norm. Gyldigt førstehjælpsbevis kræves inden eksamen.",
  },
];

export default async function TraeklatreuddannelsePage() {
  const courses = await getCourses();
  const priceOf = (slug) => courses.find((c) => c.slug === slug)?.price ?? "";

  const steps = STEPS.map((s) => ({ ...s, price: priceOf(s.slug) }));

  const faqs = [
    {
      q: "Hvad er en træklatreuddannelse?",
      a: "En træklatreuddannelse er et samlet forløb, hvor du trin for trin opbygger teknik, sikkerhed og erfaring i træklatring og til sidst uddannes og eksamineres som træklatreinstruktør efter Dansk Træklatreforenings norm. Hos Træklatreskolen kan du følge stigen som enkeltkurser eller tage hele forløbet samlet på årskurset.",
    },
    {
      q: "Hvordan bliver man træklatreinstruktør?",
      a: `Du bliver træklatreinstruktør ved at gennemføre instruktøruddannelsen — 5 undervisningsdage (${priceOf("instruktor")}) med planlægning, ledelse, sikkerhed og risikovurdering, afsluttet med eksamen efter Dansk Træklatreforenings norm. Vi anbefaler, at du først har begynder- og gerne avanceret niveau. Gyldigt førstehjælpsbevis skal foreligge inden eksamen.`,
    },
    {
      q: "Hvor lang tid tager træklatreuddannelsen?",
      a: "Det afhænger af vejen. Tager du kurserne enkeltvis, varer begynder og brush-up 2 dage, avanceret 3 dage og instruktørmodulet 5 dage. Vil du hele vejen rundt på én gang, er årskurset et samlet forløb på 100 lektioner over et helt år med instruktøreksamen undervejs.",
    },
    {
      q: "Kræver træklatreuddannelsen forudsætninger?",
      a: "Nej — begynderkurset starter helt fra bunden uden forudsætninger. De videregående trin (avanceret og instruktør) forudsætter klatreerfaring, og instruktøreksamen kræver et gyldigt førstehjælpsbevis.",
    },
    {
      q: "Hvor foregår uddannelsen?",
      a: "Træklatreskolen afholder uddannelse og træklatrekurser i hele Danmark — på Sjælland, Fyn og i Jylland. Se aktuelle datoer i kursuskalenderen.",
    },
  ];

  const jsonLd = graph(
    organizationLd(),
    breadcrumbLd([
      { name: "Forside", path: "/" },
      { name: "Træklatreuddannelse", path: "/traeklatreuddannelse" },
    ]),
    steps
      .filter((s) => s.price)
      .map((s) =>
        courseLd(
          { title: s.title, short: s.text, price: s.price },
          `/kurser/${s.slug}`
        )
      ),
    faqLd(faqs)
  );

  return (
    <>
      <script {...jsonLdScript(jsonLd)} />
      <main>
        {/* HERO */}
        <section className="page-hero" style={{ backgroundImage: "url('/images/hero-forest.jpg')" }}>
          <div className="page-hero-overlay">
            <div className="page-hero-inner">
              <p className="page-hero-eyebrow">Uddannelse</p>
              <h1 className="page-hero-title">Træklatreuddannelse</h1>
              <p className="page-hero-text" style={{ maxWidth: 680 }}>
                Bliv træklatreinstruktør trin for trin — fra dine første tag i trækronerne
                til eksamen efter Dansk Træklatreforenings norm.
              </p>
              <div style={heroButtons}>
                <a href="/kursuskalender" style={primaryBtn}>Se datoer</a>
                <a href="/kontakt" style={secondaryBtn}>Skriv til os</a>
              </div>
            </div>
          </div>
        </section>

        {/* INTRO */}
        <section style={introSection}>
          <div style={introBox}>
            <div style={accentCenter} />
            <p style={introText}>
              En træklatreuddannelse hos Træklatreskolen er en vej, ikke et enkelt kursus.
              Du starter med det trygge fundament og bygger teknik, sikkerhed og erfaring op,
              indtil du kan tage andre med op i trækronerne — sikkert, fagligt og ansvarligt.
            </p>
            <p style={{ ...introText, marginTop: 18 }}>
              Uddannelsen følger Dansk Træklatreforenings normer hele vejen, og det afsluttende
              trin gør dig til eksamineret træklatreinstruktør. Du kan tage trinene enkeltvis i
              dit eget tempo — eller hele forløbet samlet på vores årskursus.
            </p>
          </div>
        </section>

        {/* UDDANNELSESSTIGEN */}
        <section style={sectionGreen}>
          <div style={wide}>
            <h2 style={{ ...h2, textAlign: "center" }}>Uddannelsesstigen — trin for trin</h2>
            <div style={{ ...accent, margin: "0 auto 28px" }} />
            <p style={{ ...bodyText, textAlign: "center", maxWidth: 640, margin: "0 auto 40px" }}>
              Sådan bliver du træklatreinstruktør hos Træklatreskolen.
            </p>
            <div style={stepList}>
              {steps.map((s) => (
                <a key={s.slug} href={`/kurser/${s.slug}`} style={stepCard} className="feature-card">
                  <div style={stepBadge}>{s.step}</div>
                  <div style={stepBody}>
                    <div style={stepHead}>
                      <h3 style={stepTitle}>{s.title}</h3>
                      {s.price && <span style={stepPrice}>{s.price}</span>}
                    </div>
                    <p style={stepText}>{s.text}</p>
                    <span style={stepLink}>Læs mere om kurset →</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ÅRSKURSUS — samlet forløb */}
        <section style={sectionWhite}>
          <div style={narrow}>
            <h2 style={h2}>Hele uddannelsen samlet — årskurset</h2>
            <div style={accent} />
            <p style={bodyText}>
              Vil du hele vejen rundt på én gang, er årskurset det samlede forløb. 100 lektioner
              over et helt år med fordybelse i teknik, sikkerhed, undervisning og friluftsliv —
              og med instruktøruddannelse og eksamen indbygget undervejs.
            </p>
            <p style={{ ...bodyText, marginTop: 16 }}>
              Du slutter året med både bevis, rutine og sikker hånd — og et fællesskab, der deler
              din passion for skoven.
            </p>
            <div style={{ marginTop: 28 }}>
              <a href="/kurser" style={inlineBtn}>Se årskurset og alle kurser →</a>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section style={faqSection}>
          <div style={faqInner}>
            <h2 style={{ ...h2, textAlign: "center" }}>Ofte stillede spørgsmål</h2>
            <div style={{ ...accent, margin: "0 auto 32px" }} />
            <div style={faqGrid}>
              {faqs.map((item) => (
                <details key={item.q} style={faqCard}>
                  <summary style={faqQuestion}>{item.q}</summary>
                  <p style={faqAnswer}>{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={ctaSection}>
          <div style={ctaInner}>
            <h2 style={ctaTitle}>Klar til at starte din træklatreuddannelse?</h2>
            <p style={ctaText}>
              Find en dato i kursuskalenderen, eller skriv til os, hvis du vil vide mere om vejen
              til at blive træklatreinstruktør.
            </p>
            <div style={ctaButtons}>
              <a href="/kursuskalender" style={ctaPrimary}>Se kursuskalender</a>
              <a href="/kontakt" style={ctaSecondary}>Kontakt os</a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

/* ── STYLES ── */

const heroButtons = { display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap", marginTop: 32 };
const primaryBtn = {
  background: "#d8782f", color: "white", textDecoration: "none", padding: "15px 32px",
  borderRadius: 14, fontWeight: 700, fontSize: 16, boxShadow: "0 4px 20px rgba(216,120,47,0.45)",
};
const secondaryBtn = {
  background: "rgba(255,255,255,0.12)", color: "white", textDecoration: "none", padding: "15px 32px",
  borderRadius: 14, fontWeight: 700, fontSize: 16, border: "1.5px solid rgba(255,255,255,0.45)",
};

const introSection = { background: "#ffffff", padding: "80px 24px 64px" };
const introBox = { maxWidth: 800, margin: "0 auto", textAlign: "center" };
const accentCenter = { width: 52, height: 4, background: "#d8782f", borderRadius: 4, margin: "0 auto 28px" };
const introText = { fontSize: 18, lineHeight: 1.8, color: "#4b6355", margin: 0 };

const sectionGreen = { background: "#eef3ef", padding: "72px 24px" };
const sectionWhite = { background: "#ffffff", padding: "72px 24px" };
const narrow = { maxWidth: 800, margin: "0 auto" };
const wide = { maxWidth: 1080, margin: "0 auto" };

const h2 = { fontSize: "clamp(24px, 3.2vw, 34px)", fontWeight: 800, color: "#1f3a2b", margin: "0 0 14px" };
const accent = { width: 52, height: 4, background: "#d8782f", borderRadius: 4, margin: "0 0 24px" };
const bodyText = { fontSize: 18, lineHeight: 1.8, color: "#4b6355", margin: 0 };

/* Uddannelsesstige */
const stepList = { display: "flex", flexDirection: "column", gap: 18 };
const stepCard = {
  display: "flex", gap: 20, alignItems: "stretch", textDecoration: "none",
  background: "white", borderRadius: 18, overflow: "hidden",
  boxShadow: "0 8px 28px rgba(0,0,0,0.07)", border: "1px solid #ece6de",
};
const stepBadge = {
  flexShrink: 0, width: 92, background: "#1f3a2b", color: "white",
  display: "flex", alignItems: "center", justifyContent: "center",
  fontWeight: 800, fontSize: 15, letterSpacing: 0.3, textAlign: "center", padding: "0 8px",
};
const stepBody = { padding: "22px 24px", flex: 1 };
const stepHead = { display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12, flexWrap: "wrap" };
const stepTitle = { fontSize: 20, fontWeight: 700, color: "#1f3a2b", margin: 0 };
const stepPrice = { fontSize: 14, fontWeight: 800, color: "#a3521d", background: "#f5e5d8", padding: "4px 10px", borderRadius: 999, whiteSpace: "nowrap" };
const stepText = { fontSize: 15, lineHeight: 1.7, color: "#4b6355", margin: "10px 0 12px" };
const stepLink = { fontSize: 14, fontWeight: 700, color: "#d8782f" };

const inlineBtn = {
  display: "inline-block", background: "#d8782f", color: "white", textDecoration: "none",
  padding: "13px 26px", borderRadius: 12, fontWeight: 700, fontSize: 16,
  boxShadow: "0 4px 18px rgba(216,120,47,0.35)",
};

/* FAQ */
const faqSection = { background: "#f5f7f6", padding: "72px 24px" };
const faqInner = { maxWidth: 820, margin: "0 auto" };
const faqGrid = { display: "flex", flexDirection: "column", gap: 12 };
const faqCard = { background: "white", borderRadius: 12, padding: "18px 22px", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" };
const faqQuestion = { fontWeight: 700, fontSize: 17, color: "#1f3a2b", cursor: "pointer", listStyle: "none" };
const faqAnswer = { margin: "12px 0 0", lineHeight: 1.65, color: "#3a4a40" };

/* CTA */
const ctaSection = { background: "#d8782f", padding: "72px 24px" };
const ctaInner = { maxWidth: 680, margin: "0 auto", textAlign: "center", color: "white" };
const ctaTitle = { fontSize: "clamp(24px, 4vw, 40px)", fontWeight: 800, margin: "0 0 16px", lineHeight: 1.15 };
const ctaText = { fontSize: 18, lineHeight: 1.7, opacity: 0.92, margin: "0 0 32px" };
const ctaButtons = { display: "flex", justifyContent: "center", gap: 14, flexWrap: "wrap" };
const ctaPrimary = { background: "white", color: "#d8782f", textDecoration: "none", padding: "14px 28px", borderRadius: 12, fontWeight: 700, fontSize: 16 };
const ctaSecondary = { background: "transparent", color: "white", textDecoration: "none", padding: "14px 28px", borderRadius: 12, fontWeight: 700, fontSize: 16, border: "2px solid rgba(255,255,255,0.6)" };
