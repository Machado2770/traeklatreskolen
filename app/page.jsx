import Image from "next/image";
import { courses, experiences } from "@/lib/siteData";

export const metadata = {
  title: "Træklatreskolen – Kurser og oplevelser i træklatring",
  description:
    "Oplev skoven fra nye højder. Træklatreskolen tilbyder begynderkurser, instruktøruddannelse og naturoplevelser i trækronerne for private, skoler og institutioner i hele Danmark.",
  openGraph: {
    title: "Træklatreskolen – Kurser og oplevelser i træklatring",
    description:
      "Professionelle kurser og eventyrlige oplevelser i levende træer. Sikkerhed, faglighed og natur i centrum.",
    url: "/",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://traeklatreskolen.vercel.app/#org",
      name: "Træklatreskolen",
      url: "https://traeklatreskolen.vercel.app",
      logo: "https://traeklatreskolen.vercel.app/logo/logo-main.png",
      email: "info@traeklatreskolen.dk",
      description:
        "Træklatreskolen tilbyder professionelle kurser og naturoplevelser i træklatring i Danmark.",
      areaServed: "DK",
      sameAs: [],
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://traeklatreskolen.vercel.app/#business",
      name: "Træklatreskolen",
      description:
        "Kurser og oplevelser i træklatring — begyndere, instruktører og oplevelsesture i trækronerne.",
      email: "info@traeklatreskolen.dk",
      areaServed: [
        { "@type": "AdministrativeArea", name: "Sjælland" },
        { "@type": "AdministrativeArea", name: "Fyn" },
        { "@type": "AdministrativeArea", name: "Jylland" },
      ],
      priceRange: "500–4000 kr.",
    },
  ],
};

export default function Home() {
  const featuredCourses = courses.slice(0, 3);
  const featuredExperiences = experiences.slice(0, 3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    <main>

      {/* HERO */}
      <section style={{ position: "relative", minHeight: "90vh" }} className="hero-section">
        <Image
          src="/images/hero-forest.jpg"
          alt="Skov"
          fill
          priority
          style={{ objectFit: "cover", objectPosition: "center" }}
          sizes="100vw"
        />
        <div style={heroOverlay} className="hero-overlay">
          <div style={heroInner}>
            <p style={eyebrow}>Træklatring · Faglighed · Natur</p>
            <h1 style={heroTitle}>Træklatreskolen</h1>
            <p style={heroLead}>
              Kurser og oplevelser i levende træer for dig, der vil lære,
              udfordre dig selv og opleve skoven fra nye højder.
            </p>
            <div style={heroButtons}>
              <a href="/kurser" style={primaryBtn}>Se kurser</a>
              <a href="/oplevelser" style={secondaryBtn}>Se oplevelser</a>
            </div>
          </div>
        </div>
      </section>

      {/* INTRO — hvid */}
      <section style={introSection}>
        <div style={introBox}>
          <h2 style={introTitle}>Velkommen op i træerne</h2>
          <div style={introAccent} />
          <p style={introText}>
            Træklatreskolen er en virksomhed der ønsker at sikre gode oplevelser
            og aktiv læring gennem kvalificeret undervisning og vejledning. Vi
            arbejder med udeliv, fordi vi er overbevist om at naturen som
            arbejdsrum fremkalder nogle af de bedste rammer for oplevelse,
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
              <a key={item.slug} href={`/kurser/${item.slug}`} style={card}>
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
              <a key={item.slug} href={`/oplevelser/${item.slug}`} style={card}>
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

      {/* SIKKERHED — mørk grøn split */}
      <section style={safetySection}>
        <div style={safetyGrid} className="safety-grid">
          <div style={safetyContent} className="safety-content">
            <p style={safetyEyebrow}>Sikkerhed · Forsikring · Normer</p>
            <h2 style={safetyTitle}>Sikkerhed er ikke et tilvalg</h2>
            <p style={safetyText}>
              Der er stor fokus på sikkerheden, når der udføres undervisning og
              oplevelser med Træklatreskolen. Vi arbejder ud fra faste principper
              og Klatresamrådets normer — sikkerhed er et fast element ved ethvert
              arrangement.
            </p>
            <p style={{ ...safetyText, marginTop: 16 }}>
              Træklatreskolen har tegnet en erhvervsforsikring, der dækker
              alle deltagere. Vi tilpasser altid aktiviteten til gruppens niveau,
              årstid og vejrforhold.
            </p>
            <ul style={safetyList}>
              <li style={safetyItem}>✓ Erhvervsforsikring dækker alle deltagere</li>
              <li style={safetyItem}>✓ Klatresamrådets normer følges til punkt og prikke</li>
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

      {/* CTA — orange */}
      <section style={ctaSection}>
        <div style={ctaInner}>
          <h2 style={ctaTitle}>Klar til at komme op i træerne?</h2>
          <p style={ctaText}>
            Meld dig til et kursus eller book en oplevelse for din gruppe,
            skole eller institution. Vi glæder os til at tage dig med op.
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

const heroOverlay = {
  position: "absolute",
  inset: 0,
  background: "rgba(16,32,24,0.54)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "40px 24px",
  zIndex: 1,
};
const heroInner = {
  maxWidth: 880,
  textAlign: "center",
  color: "white",
};
const eyebrow = {
  fontSize: 13,
  letterSpacing: 3,
  textTransform: "uppercase",
  marginBottom: 20,
  opacity: 0.85,
};
const heroTitle = {
  fontSize: "clamp(48px, 8vw, 88px)",
  fontWeight: 800,
  margin: "0 0 24px",
  lineHeight: 1.05,
};
const heroLead = {
  fontSize: 21,
  lineHeight: 1.7,
  maxWidth: 720,
  margin: "0 auto 34px",
  opacity: 0.93,
};
const heroButtons = {
  display: "flex",
  justifyContent: "center",
  gap: 14,
  flexWrap: "wrap",
};
const primaryBtn = {
  background: "#d8782f",
  color: "white",
  textDecoration: "none",
  padding: "14px 26px",
  borderRadius: 12,
  fontWeight: 700,
  fontSize: 16,
};
const secondaryBtn = {
  background: "rgba(255,255,255,0.13)",
  color: "white",
  textDecoration: "none",
  padding: "14px 26px",
  borderRadius: 12,
  fontWeight: 700,
  fontSize: 16,
  border: "1px solid rgba(255,255,255,0.3)",
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
