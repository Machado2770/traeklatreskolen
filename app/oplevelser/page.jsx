import Image from "next/image";
import { getExperiences } from "@/lib/getCourses";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Oplevelser i trækronerne",
  description:
    "Book en naturoplevelse med Træklatreskolen — oplevelsestur i trækronerne, overnatning i hængekøje og den vilde klatretur. For grupper, familier og institutioner.",
  openGraph: {
    title: "Oplevelser i trækronerne | Træklatreskolen",
    description: "Uforglemmelige naturoplevelser i trækronerne for alle aldre og grupper.",
    url: "/oplevelser",
  },
};

export default async function OplevelserPage() {
  const experiences = await getExperiences();
  return (
    <main>
      <section className="page-hero" style={{ backgroundImage: "url('/images/rebklatring.jpg')", backgroundPosition: "center 30%" }}>
        <div className="page-hero-overlay" style={{ background: "linear-gradient(135deg, rgba(18,42,28,0.78) 0%, rgba(31,58,43,0.55) 100%)" }}>
          <div className="page-hero-inner">
            <p className="page-hero-eyebrow">Oplevelser i naturen</p>
            <h1 className="page-hero-title">Oplev trækronerne</h1>
            <p className="page-hero-text">
              Kom op i trækronerne — rolige oplevelsesture, overnatning under åben himmel
              og vilde klatreture for dem der vil mærke det helt igennem.
            </p>
          </div>
        </div>
      </section>

      {/* Info-boks om booking */}
      <div style={infoBannerWrap}>
        <div style={infoBanner}>
          <span style={infoIcon}>ℹ️</span>
          <div>
            <strong>Sådan booker du en oplevelse:</strong> Oplevelserne slås op i{" "}
            <a href="/kursuskalender" style={infoLink}>kursuskalenderen</a>, hvor du tilmelder dig enkeltvis.
            Aktiviteterne gennemføres, når minimumantallet er nået — for oplevelsestur og overnatning er det min. 6 personer, for Den vilde klatretur min. 10 personer.
          </div>
        </div>
      </div>

      <section style={section}>
        <div style={grid}>
          {experiences.map((item) => (
            <ExperienceCard key={item.slug} item={item} />
          ))}
        </div>
      </section>
    </main>
  );
}

function ExperienceCard({ item }) {
  return (
    <div style={card}>
      <div style={imageWrap}>
        <Image
          src={item.image}
          alt={item.title}
          fill
          style={{ objectFit: "cover" }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

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
          <a href={item.bookingHref} style={primaryButton}>
            Book / tilmeld
          </a>
        </div>
      </div>
    </div>
  );
}

const hero = {
  minHeight: 320,
  backgroundImage:
    "url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=80')",
  backgroundSize: "cover",
  backgroundPosition: "center",
};

const heroOverlay = {
  minHeight: 320,
  background: "linear-gradient(rgba(18,33,26,0.62), rgba(18,33,26,0.62))",
  display: "flex",
  alignItems: "center",
};

const heroInner = {
  maxWidth: 1180,
  margin: "0 auto",
  padding: "56px 24px",
  color: "white",
};

const eyebrow = {
  textTransform: "uppercase",
  letterSpacing: 1.8,
  fontSize: 13,
  marginBottom: 12,
};

const heroTitle = {
  fontSize: "clamp(38px, 6vw, 64px)",
  margin: "0 0 14px",
};

const heroText = {
  maxWidth: 760,
  fontSize: 18,
  lineHeight: 1.8,
  margin: 0,
};

const infoBannerWrap = {
  maxWidth: 1180,
  margin: "0 auto",
  padding: "24px 24px 0",
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

const section = {
  maxWidth: 1180,
  margin: "0 auto",
  padding: "48px 24px 72px",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  gap: 24,
};

const card = {
  background: "white",
  borderRadius: 18,
  overflow: "hidden",
  boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
};

const imageWrap = {
  position: "relative",
  height: 240,
  overflow: "hidden",
};

const cardBody = {
  padding: 20,
};

const tagRow = {
  display: "flex",
  gap: 8,
  flexWrap: "wrap",
  marginBottom: 10,
};

const priceTag = {
  display: "inline-block",
  padding: "6px 10px",
  borderRadius: 999,
  background: "#f5e5d8",
  color: "#a3521d",
  fontWeight: 700,
  fontSize: 12,
};

const durationTag = {
  display: "inline-block",
  padding: "6px 10px",
  borderRadius: 999,
  background: "#eae8f5",
  color: "#3d3580",
  fontWeight: 700,
  fontSize: 12,
};

const cardTitle = {
  margin: "0 0 8px",
  color: "#1f3a2b",
  fontSize: 22,
  fontWeight: 700,
};

const cardText = {
  margin: 0,
  color: "#4b6355",
  lineHeight: 1.7,
  minHeight: 48,
  fontSize: 15,
};

const actionRow = {
  display: "flex",
  gap: 10,
  flexWrap: "wrap",
  marginTop: 18,
};

const primaryButton = {
  display: "inline-block",
  padding: "12px 16px",
  background: "#d8782f",
  color: "white",
  borderRadius: 10,
  textDecoration: "none",
  fontWeight: 700,
};

const secondaryButton = {
  display: "inline-block",
  padding: "12px 16px",
  background: "#e7efe9",
  color: "#1f3a2b",
  borderRadius: 10,
  textDecoration: "none",
  fontWeight: 700,
};
