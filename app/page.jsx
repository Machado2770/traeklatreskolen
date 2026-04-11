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
              Fra første møde med træklatring til instruktørniveau, brush-up og
              afsluttende eksamen. Her finder du forløb med tryg progression,
              tydelig faglighed og stærke naturoplevelser.
            </p>
          </div>
        </div>
      </section>

      <section style={introSection}>
        <div style={introGrid}>
          <div>
            <p style={sectionEyebrow}>Overblik</p>
            <h2 style={h2}>Et kursusforløb med plads til både begyndere og erfarne</h2>
            <p style={bodyText}>
              Træklatreskolens kurser er bygget op med fokus på sikkerhed,
              læring, naturforståelse og praktisk træning i levende træer.
            </p>
            <p style={bodyText}>
              Du kan begynde fra bunden, genopfriske tidligere erfaring,
              arbejde videre mod instruktørniveau eller afslutte dit forløb med eksamen.
            </p>
          </div>

          <div style={infoPanel}>
            <div style={infoItem}>
              <strong>Fokus:</strong> sikkerhed, teknik og formidling
            </div>
            <div style={infoItem}>
              <strong>Målgruppe:</strong> både begyndere og erfarne deltagere
            </div>
            <div style={infoItem}>
              <strong>Format:</strong> praktisk læring i og omkring træet
            </div>
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
        <div
          style={{
            ...image,
            backgroundImage: `url('${item.image}')`,
          }}
        />
      </a>

      <div style={cardBody}>
        <div style={tagRow}>
          <span style={priceTag}>{item.price}</span>
          <span style={levelTag}>{item.level}</span>
        </div>

        <h3 style={cardTitle}>{item.title}</h3>
        <p style={cardText}>{item.short}</p>

        <div style={actionRow}>
          <a href={`/kurser/${item.slug}`} style={secondaryButton}>
            Læs mere
          </a>
          <a href={item.bookingHref} style={primaryButton}>
            Tilmeld
          </a>
        </div>
      </div>
    </div>
  );
}

const hero = {
  minHeight: 360,
  backgroundImage:
    "url('https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=1800&q=80')",
  backgroundSize: "cover",
  backgroundPosition: "center",
};

const heroOverlay = {
  minHeight: 360,
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
  opacity: 0.9,
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

const introSection = {
  maxWidth: 1180,
  margin: "0 auto",
  padding: "56px 24px 24px",
};

const introGrid = {
  display: "grid",
  gridTemplateColumns: "1.15fr 0.85fr",
  gap: 28,
  alignItems: "start",
};

const sectionEyebrow = {
  textTransform: "uppercase",
  fontSize: 12,
  letterSpacing: 1.8,
  color: "#a3521d",
  marginBottom: 10,
  fontWeight: 700,
};

const h2 = {
  color: "#1f3a2b",
  fontSize: 36,
  marginTop: 0,
};

const bodyText = {
  color: "#4b6355",
  lineHeight: 1.8,
  fontSize: 17,
  marginBottom: 14,
};

const infoPanel = {
  background: "white",
  borderRadius: 20,
  padding: 24,
  boxShadow: "0 8px 24px rgba(0,0,0,0.07)",
};

const infoItem = {
  padding: "12px 0",
  borderBottom: "1px solid #edf2ee",
  color: "#33463a",
  lineHeight: 1.7,
};

const section = {
  maxWidth: 1180,
  margin: "0 auto",
  padding: "12px 24px 72px",
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