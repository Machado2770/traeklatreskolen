import { courses, experiences } from "@/lib/siteData";

export default function Home() {
  return (
    <main>
      <section style={hero}>
        <div style={heroOverlay}>
          <div style={heroContent}>
            <p style={eyebrow}>Træklatring · Friluftsliv · Oplevelser</p>
            <h1 style={heroTitle}>Træklatring i højden</h1>
            <p style={heroText}>
              Kurser, oplevelser og faglighed i træernes verden. For begyndere,
              instruktører og grupper, der vil opleve skoven fra en ny vinkel.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
              <a href="/kurser" style={ctaPrimary}>Se kurser</a>
              <a href="/oplevelser" style={ctaSecondary}>Se oplevelser</a>
            </div>
          </div>
        </div>
      </section>

      <section style={section}>
        <h2 style={h2}>Velkommen til Træklatreskolen</h2>
        <p style={lead}>
          Vi forener sikkerhed, faglighed og eventyr i levende træer. Her er der
          plads til både læring, naturforbindelse og stærke oplevelser.
        </p>
      </section>

      <section style={section}>
        <div style={sectionHeader}>
          <h2 style={h2}>Kurser</h2>
          <a href="/kurser" style={sectionLink}>Se alle kurser</a>
        </div>
        <div style={grid}>
          {courses.map((item) => (
            <Card
              key={item.slug}
              href={`/kurser/${item.slug}`}
              title={item.title}
              text={item.short}
              image={item.image}
              price={item.price}
            />
          ))}
        </div>
      </section>

      <section style={section}>
        <div style={sectionHeader}>
          <h2 style={h2}>Oplevelser</h2>
          <a href="/oplevelser" style={sectionLink}>Se alle oplevelser</a>
        </div>
        <div style={grid}>
          {experiences.map((item) => (
            <Card
              key={item.slug}
              href={`/oplevelser/${item.slug}`}
              title={item.title}
              text={item.short}
              image={item.image}
              price={item.price}
            />
          ))}
        </div>
      </section>

      <section style={ctaBand}>
        <h2 style={{ marginTop: 0 }}>Klar til at komme op i træerne?</h2>
        <p style={{ maxWidth: 700, margin: "0 auto 18px" }}>
          Uanset om du vil lære træklatring, udvikle dig fagligt eller give en gruppe
          en særlig oplevelse, så er næste skridt her.
        </p>
        <a href="/booking" style={ctaPrimary}>Tilmeld kursus</a>
      </section>
    </main>
  );
}

function Card({ href, title, text, image, price }) {
  return (
    <a href={href} style={card}>
      <div
        style={{
          ...cardImage,
          backgroundImage: `url('${image}')`,
        }}
      />
      <div style={{ padding: 20 }}>
        <div style={priceTag}>{price}</div>
        <h3 style={{ margin: "10px 0 8px", color: "#1f3a2b" }}>{title}</h3>
        <p style={{ margin: 0, color: "#4b6355" }}>{text}</p>
      </div>
    </a>
  );
}

const hero = {
  minHeight: "72vh",
  backgroundImage:
    "url('https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=1800&q=80')",
  backgroundSize: "cover",
  backgroundPosition: "center",
};

const heroOverlay = {
  minHeight: "72vh",
  background: "linear-gradient(rgba(20,35,28,0.55), rgba(20,35,28,0.55))",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 24,
};

const heroContent = {
  maxWidth: 860,
  textAlign: "center",
  color: "white",
};

const eyebrow = {
  textTransform: "uppercase",
  letterSpacing: 2,
  fontSize: 13,
  opacity: 0.9,
  marginBottom: 10,
};

const heroTitle = {
  fontSize: "clamp(38px, 7vw, 68px)",
  margin: "0 0 12px",
};

const heroText = {
  fontSize: 18,
  lineHeight: 1.6,
  maxWidth: 760,
  margin: "0 auto 24px",
};

const section = {
  maxWidth: 1180,
  margin: "0 auto",
  padding: "64px 24px",
};

const h2 = {
  color: "#1f3a2b",
  fontSize: 34,
  marginTop: 0,
};

const lead = {
  maxWidth: 760,
  color: "#4b6355",
  fontSize: 18,
  lineHeight: 1.7,
};

const sectionHeader = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "end",
  gap: 16,
  flexWrap: "wrap",
  marginBottom: 20,
};

const sectionLink = {
  color: "#d8782f",
  fontWeight: 700,
  textDecoration: "none",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: 22,
};

const card = {
  display: "block",
  background: "white",
  borderRadius: 18,
  overflow: "hidden",
  textDecoration: "none",
  boxShadow: "0 8px 28px rgba(0,0,0,0.08)",
};

const cardImage = {
  height: 220,
  backgroundSize: "cover",
  backgroundPosition: "center",
};

const priceTag = {
  display: "inline-block",
  background: "#f5e5d8",
  color: "#a3521d",
  padding: "6px 10px",
  borderRadius: 999,
  fontSize: 12,
  fontWeight: 700,
};

const ctaBand = {
  background: "#1f3a2b",
  color: "white",
  textAlign: "center",
  padding: "70px 24px",
  marginTop: 20,
};

const ctaPrimary = {
  display: "inline-block",
  padding: "14px 22px",
  background: "#d8782f",
  color: "white",
  borderRadius: 10,
  textDecoration: "none",
  fontWeight: 700,
};

const ctaSecondary = {
  display: "inline-block",
  padding: "14px 22px",
  background: "rgba(255,255,255,0.12)",
  color: "white",
  borderRadius: 10,
  textDecoration: "none",
  fontWeight: 700,
  border: "1px solid rgba(255,255,255,0.25)",
};