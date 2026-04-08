import { courses, experiences } from "@/lib/siteData";

export default function Home() {
  return (
    <main>

      {/* HERO */}
      <section style={hero}>
        <div style={overlay}>
          <div style={heroInner}>
            <p style={eyebrow}>Træklatring · Friluftsliv · Faglighed</p>
            <h1 style={title}>Træklatreskolen</h1>
            <p style={lead}>
              Kurser og oplevelser i levende træer – for dig der vil lære,
              udvikle dig og opleve naturen fra en ny vinkel.
            </p>

            <div style={btnWrap}>
              <a href="/kurser" style={btnPrimary}>Se kurser</a>
              <a href="/oplevelser" style={btnSecondary}>Se oplevelser</a>
              <a href="/booking" style={btnGhost}>Tilmeld</a>
            </div>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section style={section}>
        <h2 style={h2}>Velkommen til Træklatreskolen</h2>
        <p style={text}>
          Vi arbejder med træklatring som læring, oplevelse og fagligt håndværk.
          Her mødes sikkerhed, natur og eventyr i højden.
        </p>
      </section>

      {/* KURSER */}
      <section style={section}>
        <h2 style={h2}>Kurser</h2>
        <div style={grid}>
          {courses.map((c) => (
            <Card key={c.slug} title={c.title} text={c.short} image={c.image} href={`/kurser/${c.slug}`} />
          ))}
        </div>
      </section>

      {/* OPLEVELSER */}
      <section style={section}>
        <h2 style={h2}>Oplevelser</h2>
        <div style={grid}>
          {experiences.map((c) => (
            <Card key={c.slug} title={c.title} text={c.short} image={c.image} href={`/oplevelser/${c.slug}`} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={ctaSection}>
        <h2>Klar til at komme op i træerne?</h2>
        <a href="/booking" style={btnPrimary}>Tilmeld kursus</a>
      </section>

    </main>
  );
}

function Card({ title, text, image, href }) {
  return (
    <a href={href} style={card}>
      <div style={{ ...img, backgroundImage: `url('${image}')` }} />
      <div style={{ padding: 16 }}>
        <h3 style={{ margin: "0 0 6px" }}>{title}</h3>
        <p style={{ margin: 0, color: "#4b6355" }}>{text}</p>
      </div>
    </a>
  );
}

/* STYLES */

const hero = {
  height: "75vh",
  backgroundImage: "url('https://images.unsplash.com/photo-1502082553048-f009c37129b9')",
  backgroundSize: "cover",
  backgroundPosition: "center",
};

const overlay = {
  height: "75vh",
  background: "rgba(0,0,0,0.55)",
  display: "flex",
  alignItems: "center",
};

const heroInner = {
  maxWidth: 1100,
  margin: "0 auto",
  padding: 24,
  color: "white",
};

const eyebrow = {
  textTransform: "uppercase",
  fontSize: 12,
  letterSpacing: 2,
  marginBottom: 10,
};

const title = {
  fontSize: 60,
  margin: "0 0 12px",
};

const lead = {
  fontSize: 20,
  maxWidth: 600,
};

const btnWrap = {
  marginTop: 20,
  display: "flex",
  gap: 10,
  flexWrap: "wrap",
};

const btnPrimary = {
  background: "#d8782f",
  color: "white",
  padding: "12px 18px",
  borderRadius: 10,
  textDecoration: "none",
  fontWeight: 700,
};

const btnSecondary = {
  background: "#1f3a2b",
  color: "white",
  padding: "12px 18px",
  borderRadius: 10,
  textDecoration: "none",
};

const btnGhost = {
  border: "1px solid white",
  color: "white",
  padding: "12px 18px",
  borderRadius: 10,
  textDecoration: "none",
};

const section = {
  padding: "60px 24px",
  maxWidth: 1100,
  margin: "0 auto",
};

const h2 = {
  color: "#1f3a2b",
};

const text = {
  maxWidth: 600,
  color: "#4b6355",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gap: 20,
  marginTop: 20,
};

const card = {
  display: "block",
  background: "white",
  borderRadius: 16,
  overflow: "hidden",
  textDecoration: "none",
  boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
};

const img = {
  height: 160,
  backgroundSize: "cover",
  backgroundPosition: "center",
};

const ctaSection = {
  background: "#1f3a2b",
  color: "white",
  textAlign: "center",
  padding: 60,
};