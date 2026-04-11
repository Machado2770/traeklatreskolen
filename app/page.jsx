import { courses } from "@/lib/siteData";

export default function KurserPage() {
  return (
    <main>
      <section style={hero}>
        <div style={heroOverlay}>
          <div style={heroInner}>
            <p style={eyebrow}>Kurser</p>
            <h1 style={heroTitle}>Kurser i træklatring</h1>
            <p style={heroText}>
              Her finder du alle kurser i Træklatreskolen — fra begynderniveau
              til brush-up, instruktørforløb, avanceret træklatring og eksamen.
            </p>
          </div>
        </div>
      </section>

      <section style={section}>
        <div style={grid}>
          {courses.map((item) => (
            <CourseCard key={item.slug} item={item} />
          ))}
        </div>
      </section>
    </main>
  );
}

function CourseCard({ item }) {
  return (
    <div style={card}>
      <a href={`/kurser/${item.slug}`} style={{ textDecoration: "none", color: "inherit" }}>
        <div style={{ ...image, backgroundImage: `url('${item.image}')` }} />
      </a>

      <div style={cardBody}>
        <div style={tagRow}>
          <span style={priceTag}>{item.price}</span>
          <span style={levelTag}>{item.level}</span>
        </div>

        <h3 style={cardTitle}>{item.title}</h3>
        <p style={cardText}>{item.short}</p>

        <div style={actionRow}>
          <a href={`/kurser/${item.slug}`} style={secondaryButton}>Læs mere</a>
          <a href={item.bookingHref} style={primaryButton}>Tilmeld</a>
        </div>
      </div>
    </div>
  );
}

const hero = {
  minHeight: 320,
  backgroundImage: "url('https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=1800&q=80')",
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
  borderRadius: 20,
  overflow: "hidden",
  boxShadow: "0 10px 28px rgba(0,0,0,0.08)",
};

const image = {
  height: 240,
  backgroundSize: "cover",
  backgroundPosition: "center",
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

const levelTag = {
  display: "inline-block",
  padding: "6px 10px",
  borderRadius: 999,
  background: "#e7efe9",
  color: "#1f3a2b",
  fontWeight: 700,
  fontSize: 12,
};

const cardTitle = {
  margin: "0 0 8px",
  color: "#1f3a2b",
  fontSize: 24,
};

const cardText = {
  margin: 0,
  color: "#4b6355",
  lineHeight: 1.7,
  minHeight: 48,
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