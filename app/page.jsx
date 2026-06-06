import Image from "next/image";
import { courses, experiences } from "@/lib/siteData";
import {
  graph,
  organizationLd,
  websiteLd,
  localBusinessLd,
  faqLd,
  jsonLdScript,
} from "@/lib/jsonld";

export const metadata = {
  title: "Træklatreskolen – Kurser og oplevelser i træklatring",
  description:
    "Oplev skoven fra nye højder. Træklatreskolen tilbyder begynderkurser, instruktøruddannelse og naturoplevelser i trækronerne for private, skoler og institutioner i hele Danmark.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Træklatreskolen – Kurser og oplevelser i træklatring",
    description:
      "Professionelle kurser og eventyrlige oplevelser i trækronerne. Naturdannelse, sikkerhed og faglighed i centrum.",
    url: "/",
  },
};

// Ofte stillede spørgsmål — vises på siden OG som FAQPage-schema, så Google
// og AI-tjenester (ChatGPT, Perplexity m.fl.) kan citere svarene direkte.
const faqs = [
  {
    q: "Hvad koster et træklatrekursus?",
    a: "Begynderkursus og brush-up koster 1.900 kr., avanceret træklatring 2.900 kr. og træklatreinstruktøruddannelsen 4.400 kr. Oplevelsesture starter ved 650 kr. pr. person.",
  },
  {
    q: "Skal jeg have erfaring for at deltage?",
    a: "Nej. Begynderkurset kræver ingen forudsætninger og starter helt fra bunden med udstyr, sikkerhed og grundteknik. Brush-up, avanceret og instruktør forudsætter erfaring.",
  },
  {
    q: "Hvor afholdes kurserne?",
    a: "Træklatreskolen afholder kurser og oplevelser i hele Danmark — på Sjælland, Fyn og i Jylland. Se aktuelle datoer og steder i kursuskalenderen.",
  },
  {
    q: "Er træklatring sikkert?",
    a: "Ja. Al klatring foregår med professionelt sikkerhedsudstyr og efter Dansk Træklatreforenings normer, og aktiviteterne er erhvervsforsikrede. Sikkerhed gennemgås altid grundigt inden klatring.",
  },
  {
    q: "Hvor lang tid varer et kursus?",
    a: "Et begynder- eller brush-up-kursus varer 2 dage, avanceret 3 dage og instruktøruddannelsen 4 dage. Oplevelsesture varer typisk omkring 3 timer.",
  },
  {
    q: "Kan I lave forløb for skoler, institutioner og firmaer?",
    a: "Ja. Vi tilbyder oplevelsesture og teamdage for grupper, skoler og institutioner. Kontakt os på info@traeklatreskolen.dk for et tilbud.",
  },
];

const jsonLd = graph(
  organizationLd(),
  websiteLd(),
  localBusinessLd(),
  faqLd(faqs)
);

export default function Home() {
  const featuredCourses = courses.slice(0, 3);
  const featuredExperiences = experiences.slice(0, 3);

  return (
    <>
      <script {...jsonLdScript(jsonLd)} />
    <main>

      {/* HERO */}
      <section className="page-hero home-hero" style={{ position: "relative" }}>
        <Image
          src="/images/hero-forest.jpg"
          alt="Solbeskinnet skov set nedefra mod trækronerne — Træklatreskolen"
          fill
          priority
          style={{ objectFit: "cover", objectPosition: "center" }}
          sizes="100vw"
        />
        <div className="page-hero-overlay" style={{ position: "relative", zIndex: 1 }}>
          <div className="page-hero-inner">
            <p className="page-hero-eyebrow">Træklatring · Naturdannelse · Faglighed</p>
            <h1 className="page-hero-title">Træklatreskolen</h1>
            <p className="page-hero-text" style={{ maxWidth: 640 }}>
              Kurser og oplevelser i trækronerne for dig, der vil lære,
              udfordre dig selv og opdage skoven fra nye højder.
            </p>
            <div style={heroButtons}>
              <a href="/kurser" style={primaryBtn}>Se kurser</a>
              <a href="/oplevelser" style={secondaryBtn}>Se oplevelser</a>
            </div>
          </div>
        </div>
      </section>

      {/* FRILUFT-BÅND */}
      <section style={pillarBand}>
        <div style={pillarInner}>
          {[
            {
              icon: (
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                  <path d="M18 4C18 4 8 13 8 21a10 10 0 0020 0C28 13 18 4 18 4z" fill="#d8782f" opacity="0.18"/>
                  <path d="M18 4C18 4 8 13 8 21a10 10 0 0020 0C28 13 18 4 18 4z" stroke="#d8782f" strokeWidth="1.8" fill="none"/>
                  <line x1="18" y1="22" x2="18" y2="33" stroke="#d8782f" strokeWidth="1.8" strokeLinecap="round"/>
                  <path d="M13 17c2-2 4-2 5 0" stroke="#d8782f" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
                  <path d="M18 14c1.5-1.5 3.5-1.5 4.5 0" stroke="#d8782f" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
                </svg>
              ),
              title: "Op i trækronerne",
              text: "Opdag skoven fra nye højder — en oplevelse ud over det sædvanlige",
              href: "/oplevelser",
              linkLabel: "Se oplevelser →",
            },
            {
              icon: (
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                  <circle cx="18" cy="13" r="5.5" stroke="#d8782f" strokeWidth="1.8" fill="#d8782f" fillOpacity="0.12"/>
                  <path d="M12 13c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="#d8782f" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
                  <path d="M10 28c0-4.4 3.6-8 8-8s8 3.6 8 8" stroke="#d8782f" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
                  <path d="M6 22c1-1.5 2.5-2.5 4-2.5" stroke="#d8782f" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
                  <path d="M30 22c-1-1.5-2.5-2.5-4-2.5" stroke="#d8782f" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
                </svg>
              ),
              title: "For grupper og enkeltpersoner",
              text: "Voksne og grupper (firmaer) — vi tilpasser aktiviteten til din gruppe",
              href: "/organisationer",
              linkLabel: "For organisationer →",
            },
            {
              icon: (
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                  <path d="M18 4l2.5 7.5H28l-6.5 4.7 2.5 7.5L18 19l-6 4.7 2.5-7.5L8 11.5h7.5L18 4z" fill="#d8782f" fillOpacity="0.15" stroke="#d8782f" strokeWidth="1.8" strokeLinejoin="round"/>
                  <path d="M18 28v4" stroke="#d8782f" strokeWidth="1.8" strokeLinecap="round"/>
                  <path d="M13 30h10" stroke="#d8782f" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
              ),
              title: "Naturen som læringsrum",
              text: "Naturdannelse og refleksion i de bedste omgivelser — skoven",
              href: "/naturdannelse",
              linkLabel: "Læs om naturdannelse →",
            },
            {
              icon: (
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                  <path d="M18 5l1.5 4.5 4.5.5-3.3 3 1.2 4.5L18 15l-3.9 2.5 1.2-4.5-3.3-3 4.5-.5L18 5z" fill="#d8782f" fillOpacity="0.15"/>
                  <path d="M18 5C11 10 8 15 8 21c0 7 10 11 10 11s10-4 10-11c0-6-3-11-10-16z" stroke="#d8782f" strokeWidth="1.8" fill="none" strokeLinejoin="round"/>
                  <path d="M13 21l3.5 3.5L23 17" stroke="#d8782f" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ),
              title: "Sikkerhed i centrum",
              text: "Erhvervsforsikring og Dansk Træklatreforenings normer — altid og uden undtagelse",
              href: "/#sikkerhed",
              linkLabel: "Læs om sikkerhed →",
            },
          ].map((p) => {
            const inner = (
              <>
                <div style={pillarIcon}>{p.icon}</div>
                <div style={pillarText}>
                  <strong style={pillarTitle}>{p.title}</strong>
                  <span style={pillarSub}>{p.text}</span>
                  {p.href && <span style={pillarLink}>{p.linkLabel}</span>}
                </div>
              </>
            );
            return p.href ? (
              <a key={p.title} href={p.href} style={{ ...pillarItem, textDecoration: "none" }} className="pillar-link">
                {inner}
              </a>
            ) : (
              <div key={p.title} style={pillarItem}>{inner}</div>
            );
          })}
        </div>
      </section>

      {/* INTRO — hvid */}
      <section style={introSection}>
        <div style={introBox}>
          <h2 style={introTitle}>Velkommen op i trækronerne</h2>
          <div style={introAccent} />
          <p style={introText}>
            Træklatreskolen er en virksomhed, der ønsker at sikre gode oplevelser
            og aktiv læring gennem kvalificeret undervisning og vejledning. Vi
            arbejder med udeliv, fordi vi er overbevist om at naturen som
            arbejdsrum fremkalder nogle af de bedste rammer for naturdannelse,
            udvikling og refleksion hos den enkelte.
          </p>
          <p style={{ ...introText, marginTop: 18 }}>
            Vi tilbyder træklatring hele året rundt med aktiviteter tilpasset
            årstiden — fra begynderkurser og instruktøruddannelse til
            eventyrlige oplevelsesture i trækronerne for grupper, skoler og
            institutioner.
          </p>
        </div>
      </section>

      {/* KURSER — lys grøn */}
      <section style={sectionGreen} className="page-section">
        <div style={container}>
          <h2 style={sectionTitle}>Udvalgte kurser</h2>
          <div style={grid}>
            {featuredCourses.map((item) => (
              <a key={item.slug} href={`/kurser/${item.slug}`} style={card} className="feature-card">
                <div style={cardImageWrap}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    style={{ objectFit: "cover", filter: item.imageFilter }}
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div style={cardBody}>
                  <h3 style={cardTitle}>{item.title}</h3>
                  <p style={cardText}>{item.short}</p>
                  <p style={cardPrice}>{item.price}</p>
                </div>
              </a>
            ))}
          </div>
          <div style={seeAllWrap}>
            <a href="/kurser" style={seeAllBtn}>Se alle kurser →</a>
          </div>
        </div>
      </section>

      {/* OPLEVELSER — hvid */}
      <section style={sectionWhite} className="page-section">
        <div style={container}>
          <h2 style={sectionTitle}>Udvalgte oplevelser</h2>
          <div style={grid}>
            {featuredExperiences.map((item) => (
              <a key={item.slug} href={`/oplevelser/${item.slug}`} style={card} className="feature-card">
                <div style={cardImageWrap}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div style={cardBody}>
                  <h3 style={cardTitle}>{item.title}</h3>
                  <p style={cardText}>{item.short}</p>
                  <p style={cardPrice}>{item.price}</p>
                </div>
              </a>
            ))}
          </div>
          <div style={seeAllWrap}>
            <a href="/oplevelser" style={seeAllBtn}>Se alle oplevelser →</a>
          </div>
        </div>
      </section>

      {/* NATURDANNELSE — lys grøn split */}
      <section style={learnSection}>
        <div className="safety-grid">
          <div style={{ position: "relative" }} className="safety-image">
            <Image
              src="/images/rebklatring.jpg"
              alt="Klatrer på vej ned fra trækronerne i efterårsskov — naturen som læringsrum"
              fill
              style={{ objectFit: "cover" }}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div style={learnContent} className="safety-content">
            <p style={learnEyebrow}>Naturdannelse · Oplevelse · Refleksion</p>
            <h2 style={learnTitle}>Naturen som læringsrum</h2>
            <p style={learnText}>
              Træklatring handler ikke kun om at komme op i et træ. Når vi bevæger
              os op i trækronerne, ændrer perspektivet sig — skoven bliver ikke
              længere bare noget, vi går igennem, men et rum, vi er en del af.
            </p>
            <p style={{ ...learnText, marginTop: 16 }}>
              Naturdannelse handler om at udvikle en dybere forståelse for naturen
              — ikke kun gennem viden, men gennem erfaring. Det er i samspillet
              mellem oplevelse, faglighed og refleksion, at læringen opstår.
            </p>
            <ul style={learnList}>
              <li style={learnItem}>✓ Mod, ansvar og personlig dømmekraft</li>
              <li style={learnItem}>✓ Tillid til sig selv og hinanden</li>
              <li style={learnItem}>✓ Respekt for træerne og skoven som biotop</li>
              <li style={learnItem}>✓ Fællesskab, nærvær og naturglæde</li>
            </ul>
            <div style={{ marginTop: 28 }}>
              <a href="/naturdannelse" style={learnBtn}>Læs om naturdannelse →</a>
            </div>
          </div>
        </div>
      </section>

      {/* SIKKERHED — mørk grøn split */}
      <section id="sikkerhed" style={{ ...safetySection, scrollMarginTop: 80 }}>
        <div style={safetyGrid} className="safety-grid">
          <div style={safetyContent} className="safety-content">
            <p style={safetyEyebrow}>Sikkerhed · Forsikring · Normer</p>
            <h2 style={safetyTitle}>Sikkerhed er ikke et tilvalg</h2>
            <p style={safetyText}>
              Der er stor fokus på sikkerheden, når der udføres undervisning og
              oplevelser med Træklatreskolen. Vi arbejder ud fra faste principper
              og Dansk Træklatreforenings normer — sikkerhed er et fast element ved ethvert
              arrangement.
            </p>
            <p style={{ ...safetyText, marginTop: 16 }}>
              Træklatreskolen har tegnet en erhvervsforsikring, der dækker
              alle deltagere. Vi tilpasser altid aktiviteten til gruppens niveau,
              årstid og vejrforhold.
            </p>
            <ul style={safetyList}>
              <li style={safetyItem}>✓ Erhvervsforsikring dækker alle deltagere</li>
              <li style={safetyItem}>✓ Dansk Træklatreforenings normer følges til punkt og prikke</li>
              <li style={safetyItem}>✓ Faste sikkerhedsprincipper ved hvert arrangement</li>
              <li style={safetyItem}>✓ Aktiviteter tilpasset årstid og vejr</li>
            </ul>
          </div>
          <div style={{ position: "relative" }} className="safety-image">
            <Image
              src="/images/gallery-main.jpg"
              alt="Træklatring i skoven"
              fill
              style={{ objectFit: "cover" }}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* FAQ — ofte stillede spørgsmål (matcher FAQPage-schema) */}
      <section style={faqSection}>
        <div style={faqInner}>
          <h2 style={faqHeading}>Ofte stillede spørgsmål</h2>
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

      {/* CTA — orange */}
      <section style={ctaSection}>
        <div style={ctaInner}>
          <h2 style={ctaTitle}>Klar til at komme op i trækronerne?</h2>
          <p style={ctaText}>
            Meld dig til et kursus eller book en oplevelse for dig eller din gruppe.
            Vi glæder os til at tage dig med op i trækronerne.
          </p>
          <div style={ctaButtons}>
            <a href="/booking" style={ctaPrimary}>Book nu</a>
            <a href="/kontakt" style={ctaSecondary}>Kontakt os</a>
          </div>
        </div>
      </section>

    </main>
    </>
  );
}

/* ── STYLES ─────────────────────────────────────────── */

const heroButtons = {
  display: "flex",
  justifyContent: "center",
  gap: 16,
  flexWrap: "wrap",
  marginTop: 36,
};
const primaryBtn = {
  background: "#d8782f",
  color: "white",
  textDecoration: "none",
  padding: "16px 34px",
  borderRadius: 14,
  fontWeight: 700,
  fontSize: 17,
  boxShadow: "0 4px 20px rgba(216,120,47,0.45)",
  letterSpacing: "0.3px",
};
const secondaryBtn = {
  background: "rgba(255,255,255,0.12)",
  color: "white",
  textDecoration: "none",
  padding: "16px 34px",
  borderRadius: 14,
  fontWeight: 700,
  fontSize: 17,
  border: "1.5px solid rgba(255,255,255,0.45)",
  backdropFilter: "blur(6px)",
  letterSpacing: "0.3px",
};

/* Pillar band */
const pillarBand = {
  background: "#162c1e",
  borderTop: "1px solid rgba(255,255,255,0.06)",
  padding: "22px 24px",
};
const pillarInner = {
  maxWidth: 1100,
  margin: "0 auto",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "28px 32px",
};
const pillarItem = {
  display: "flex",
  alignItems: "flex-start",
  gap: 16,
};
const pillarIcon = {
  flexShrink: 0,
  width: 48,
  height: 48,
  background: "rgba(216,120,47,0.10)",
  borderRadius: 12,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "1px solid rgba(216,120,47,0.20)",
};
const pillarText = {
  display: "flex",
  flexDirection: "column",
  gap: 4,
  paddingTop: 2,
};
const pillarTitle = {
  fontSize: 15,
  fontWeight: 700,
  color: "rgba(255,255,255,0.95)",
  lineHeight: 1.3,
};
const pillarSub = {
  fontSize: 13,
  color: "rgba(255,255,255,0.52)",
  lineHeight: 1.55,
};
const pillarLink = {
  marginTop: 6,
  fontSize: 13,
  fontWeight: 700,
  color: "#e89456",
};

/* Intro */
const introSection = {
  padding: "88px 24px",
  background: "#ffffff",
};
const introBox = {
  maxWidth: 800,
  margin: "0 auto",
  textAlign: "center",
};
const introTitle = {
  fontSize: "clamp(30px, 4vw, 44px)",
  fontWeight: 800,
  color: "#1f3a2b",
  margin: "0 0 18px",
};
const introAccent = {
  width: 56,
  height: 4,
  background: "#d8782f",
  borderRadius: 4,
  margin: "0 auto 28px",
};
const introText = {
  fontSize: 18,
  lineHeight: 1.8,
  color: "#4b6355",
  margin: 0,
};

/* Sections */
const sectionGreen = {
  padding: "88px 24px",
  background: "#eef3ef",
};
const sectionWhite = {
  padding: "88px 24px",
  background: "#ffffff",
};
const container = {
  maxWidth: 1180,
  margin: "0 auto",
};
const sectionTitle = {
  fontSize: "clamp(26px, 3.5vw, 40px)",
  fontWeight: 800,
  color: "#1f3a2b",
  marginBottom: 36,
  textAlign: "center",
};

/* Cards */
const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  gap: 24,
};
const card = {
  display: "block",
  textDecoration: "none",
  background: "white",
  borderRadius: 18,
  overflow: "hidden",
  boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
};
const cardImageWrap = {
  position: "relative",
  height: 230,
  overflow: "hidden",
};
const cardBody = {
  padding: "20px 22px 22px",
};
const cardTitle = {
  margin: "0 0 8px",
  color: "#1f3a2b",
  fontSize: 21,
  fontWeight: 700,
};
const cardText = {
  margin: "0 0 14px",
  color: "#4b6355",
  lineHeight: 1.65,
  fontSize: 15,
};
const cardPrice = {
  margin: 0,
  fontWeight: 700,
  color: "#d8782f",
  fontSize: 15,
};

/* See all */
const seeAllWrap = {
  marginTop: 40,
  textAlign: "center",
};
const seeAllBtn = {
  display: "inline-block",
  color: "#1f3a2b",
  textDecoration: "none",
  fontWeight: 700,
  fontSize: 16,
  border: "2px solid #1f3a2b",
  borderRadius: 10,
  padding: "10px 22px",
};

/* Naturdannelse split */
const learnSection = {
  background: "#eef3ef",
  padding: "0",
  overflow: "hidden",
};
const learnContent = {};
const learnEyebrow = {
  fontSize: 12,
  letterSpacing: 3,
  textTransform: "uppercase",
  color: "#d8782f",
  marginBottom: 16,
  fontWeight: 600,
};
const learnTitle = {
  fontSize: "clamp(26px, 3vw, 38px)",
  fontWeight: 800,
  color: "#1f3a2b",
  margin: "0 0 20px",
  lineHeight: 1.2,
};
const learnText = {
  fontSize: 17,
  lineHeight: 1.75,
  color: "#4b6355",
  margin: 0,
};
const learnList = {
  listStyle: "none",
  padding: 0,
  margin: "28px 0 0",
  display: "flex",
  flexDirection: "column",
  gap: 10,
};
const learnItem = {
  fontSize: 15,
  color: "#33463a",
  fontWeight: 600,
};
const learnBtn = {
  display: "inline-block",
  background: "#d8782f",
  color: "white",
  textDecoration: "none",
  padding: "13px 26px",
  borderRadius: 12,
  fontWeight: 700,
  fontSize: 16,
  boxShadow: "0 4px 18px rgba(216,120,47,0.35)",
};

/* Safety */
const safetySection = {
  background: "#1f3a2b",
  padding: "0",
  overflow: "hidden",
};
const safetyGrid = {};
const safetyContent = {};
const safetyEyebrow = {
  fontSize: 12,
  letterSpacing: 3,
  textTransform: "uppercase",
  color: "#d8782f",
  marginBottom: 16,
  fontWeight: 600,
};
const safetyTitle = {
  fontSize: "clamp(26px, 3vw, 38px)",
  fontWeight: 800,
  color: "white",
  margin: "0 0 20px",
  lineHeight: 1.2,
};
const safetyText = {
  fontSize: 17,
  lineHeight: 1.75,
  color: "rgba(255,255,255,0.82)",
  margin: 0,
};
const safetyList = {
  listStyle: "none",
  padding: 0,
  margin: "28px 0 0",
  display: "flex",
  flexDirection: "column",
  gap: 10,
};
const safetyItem = {
  fontSize: 15,
  color: "rgba(255,255,255,0.9)",
  fontWeight: 600,
};

/* CTA */
const faqSection = {
  background: "#f5f7f6",
  padding: "72px 24px",
};
const faqInner = {
  maxWidth: 820,
  margin: "0 auto",
};
const faqHeading = {
  fontSize: "clamp(24px, 4vw, 38px)",
  fontWeight: 800,
  color: "#1f3a2b",
  textAlign: "center",
  margin: "0 0 32px",
};
const faqGrid = {
  display: "flex",
  flexDirection: "column",
  gap: 12,
};
const faqCard = {
  background: "white",
  borderRadius: 12,
  padding: "18px 22px",
  boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
};
const faqQuestion = {
  fontWeight: 700,
  fontSize: 17,
  color: "#1f3a2b",
  cursor: "pointer",
  listStyle: "none",
};
const faqAnswer = {
  margin: "12px 0 0",
  lineHeight: 1.65,
  color: "#3a4a40",
};

const ctaSection = {
  background: "#d8782f",
  padding: "80px 24px",
};
const ctaInner = {
  maxWidth: 680,
  margin: "0 auto",
  textAlign: "center",
  color: "white",
};
const ctaTitle = {
  fontSize: "clamp(26px, 4.5vw, 46px)",
  fontWeight: 800,
  margin: "0 0 18px",
  lineHeight: 1.15,
};
const ctaText = {
  fontSize: 18,
  lineHeight: 1.7,
  opacity: 0.92,
  margin: "0 0 36px",
};
const ctaButtons = {
  display: "flex",
  justifyContent: "center",
  gap: 14,
  flexWrap: "wrap",
};
const ctaPrimary = {
  background: "white",
  color: "#d8782f",
  textDecoration: "none",
  padding: "14px 28px",
  borderRadius: 12,
  fontWeight: 700,
  fontSize: 16,
};
const ctaSecondary = {
  background: "transparent",
  color: "white",
  textDecoration: "none",
  padding: "14px 28px",
  borderRadius: 12,
  fontWeight: 700,
  fontSize: 16,
  border: "2px solid rgba(255,255,255,0.6)",
};
