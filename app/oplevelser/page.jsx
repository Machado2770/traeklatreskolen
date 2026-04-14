import Image from "next/image";
import { getExperiences } from "@/lib/getCourses";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Oplevelser i trækronerne",
  description:
    "Book en naturoplevelse med Træklatreskolen — oplevelsestur i trækronerne, overnatning i hængekøje og den vilde klatretur. For grupper og enkeltpersoner.",
  openGraph: {
    title: "Oplevelser i trækronerne | Træklatreskolen",
    description: "Uforglemmelige naturoplevelser i trækronerne for voksne og grupper.",
    url: "/oplevelser",
  },
};

export default async function OplevelserPage() {
  const experiences = await getExperiences();
  return (
    <main>
      <section
        className="page-hero"
        style={{ backgroundImage: "url('/images/rebklatring.jpg')", backgroundPosition: "center 30%" }}
      >
        <div className="page-hero-overlay" style={{ background: "linear-gradient(135deg, rgba(18,42,28,0.78) 0%, rgba(31,58,43,0.55) 100%)" }}>
          <div className="page-hero-inner">
            <p className="page-hero-eyebrow">Oplevelser i naturen</p>
            <h1 className="page-hero-title">Oplev trækronerne</h1>
            <p className="page-hero-text">
              Rolige oplevelsesture, overnatning under åben himmel og vilde klatreture
              for dem der vil mærke det helt igennem.
            </p>
          </div>
        </div>
      </section>

      <section style={section}>
        <div style={container}>

          {/* Info-boks om booking */}
          <div style={infoBanner}>
            <span style={infoIcon}>ℹ️</span>
            <div>
              <strong>Sådan booker du en oplevelse:</strong> Oplevelserne slås op i{" "}
              <a href="/kursuskalender" style={infoLink}>kursuskalenderen</a>, hvor du tilmelder dig enkeltvis.
              Aktiviteterne gennemføres, når minimumantallet er nået — for oplevelsestur og overnatning
              er det min. 6 personer, for Den vilde klatretur min. 10 personer.
            </div>
          </div>

          <div style={grid}>
            {experiences.map((item) => (
              <ExperienceCard key={item.slug} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA-sektion */}
      <section style={ctaSection}>
        <div style={ctaInner}>
          <h2 style={ctaTitle}>Klar til at komme op i trækronerne?</h2>
          <p style={ctaText}>
            Find din næste oplevelse i kursuskalenderen, eller kontakt os hvis du
            ønsker at booke en aktivitet til din gruppe.
          </p>
          <div style={ctaButtons}>
            <a href="/kursuskalender" style={ctaPrimary}>Se kursuskalender</a>
            <a href="/kontakt" style={ctaSecondary}>Kontakt os</a>
          </div>
        </div>
      </section>
    </main>
  );
}

function ExperienceCard({ item }) {
  return (
    <div style={card} className="feature-card">
      <a href={`/oplevelser/${item.slug}`} style={imageLink}>
        <div style={imageWrap}>
          <Image
            src={item.image}
            alt={item.title}
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </a>

      <div style={cardBody}>
        <div style={tagRow}>
          <span style={priceTag}>{item.price}</span>
          {item.duration && <span style={durationTag}>⏱ {item.duration}</span>}
        </div>

        <h3 style={cardTitle}>{item.title}</h3>
        <p style={cardText}>{item.short}</p>

        <div style={actionRow}>
          <a href={`/oplevelser/${item.slug}`} style={secondaryButton}>
            Læs mere
          </a>
          <a href="/kursuskalender" style={primaryButton}>
            Kursuskalender
          </a>
        </div>
      </div>
    </div>
  );
}

const section = {
  background: "#ffffff",
  padding: "56px 24px 88px",
};

const container = {
  maxWidth: 1180,
  margin: "0 auto",
};

const infoBanner = {
  display: "flex",
  gap: 14,
  alignItems: "flex-start",
  background: "#f0f6f2",
  border: "1px solid #c6ddd0",
  borderRadius: 14,
  padding: "18px 22px",
  color: "#2d4034",
  fontSize: 15,
  lineHeight: 1.7,
  marginBottom: 40,
};

const infoIcon = {
  fontSize: 20,
  flexShrink: 0,
  marginTop: 1,
};

const infoLink = {
  color: "#1f6b40",
  fontWeight: 700,
  textDecoration: "underline",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  gap: 28,
};

const card = {
  background: "white",
  borderRadius: 18,
  overflow: "hidden",
  boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
  display: "flex",
  flexDirection: "column",
};

const imageLink = {
  display: "block",
  flexShrink: 0,
};

const imageWrap = {
  position: "relative",
  height: 230,
  overflow: "hidden",
};

const cardBody = {
  padding: "20px 22px 24px",
  display: "flex",
  flexDirection: "column",
  flex: 1,
};

const tagRow = {
  display: "flex",
  gap: 8,
  flexWrap: "wrap",
  marginBottom: 12,
};

const priceTag = {
  display: "inline-block",
  padding: "5px 10px",
  borderRadius: 999,
  background: "#f5e5d8",
  color: "#a3521d",
  fontWeight: 700,
  fontSize: 12,
};

const durationTag = {
  display: "inline-block",
  padding: "5px 10px",
  borderRadius: 999,
  background: "#eae8f5",
  color: "#3d3580",
  fontWeight: 700,
  fontSize: 12,
};

const cardTitle = {
  margin: "0 0 8px",
  color: "#1f3a2b",
  fontSize: 21,
  fontWeight: 700,
};

const cardText = {
  margin: "0 0 auto",
  color: "#4b6355",
  lineHeight: 1.7,
  fontSize: 15,
  paddingBottom: 20,
};

const actionRow = {
  display: "flex",
  gap: 10,
  marginTop: "auto",
};

const primaryButton = {
  flex: 1,
  display: "inline-block",
  padding: "12px 10px",
  background: "#d8782f",
  color: "white",
  borderRadius: 10,
  textDecoration: "none",
  fontWeight: 700,
  fontSize: 14,
  textAlign: "center",
};

const secondaryButton = {
  flex: 1,
  display: "inline-block",
  padding: "12px 10px",
  background: "#e7efe9",
  color: "#1f3a2b",
  borderRadius: 10,
  textDecoration: "none",
  fontWeight: 700,
  fontSize: 14,
  textAlign: "center",
};

/* CTA */
const ctaSection = {
  background: "#1f3a2b",
  padding: "80px 24px",
};

const ctaInner = {
  maxWidth: 680,
  margin: "0 auto",
  textAlign: "center",
  color: "white",
};

const ctaTitle = {
  fontSize: "clamp(24px, 4vw, 40px)",
  fontWeight: 800,
  margin: "0 0 16px",
  lineHeight: 1.2,
};

const ctaText = {
  fontSize: 17,
  lineHeight: 1.7,
  opacity: 0.85,
  margin: "0 0 32px",
};

const ctaButtons = {
  display: "flex",
  justifyContent: "center",
  gap: 14,
  flexWrap: "wrap",
};

const ctaPrimary = {
  background: "#d8782f",
  color: "white",
  textDecoration: "none",
  padding: "14px 28px",
  borderRadius: 12,
  fontWeight: 700,
  fontSize: 16,
  boxShadow: "0 4px 20px rgba(216,120,47,0.35)",
};

const ctaSecondary = {
  background: "transparent",
  color: "white",
  textDecoration: "none",
  padding: "14px 28px",
  borderRadius: 12,
  fontWeight: 700,
  fontSize: 16,
  border: "2px solid rgba(255,255,255,0.45)",
};
