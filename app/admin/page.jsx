export default function Home() {
  return (
    <main>

      {/* HERO */}
      <section style={hero}>
        <div style={heroContent}>
          <h1 style={heroTitle}>Træklatring i højden</h1>
          <p style={heroText}>
            Kurser, oplevelser og faglighed i træernes verden
          </p>

          <a href="/booking" style={cta}>
            Tilmeld kursus
          </a>
        </div>
      </section>

      {/* INTRO */}
      <section style={section}>
        <h2>Velkommen til Træklatreskolen</h2>
        <p style={intro}>
          Vi arbejder med sikker, professionel og eventyrlig træklatring.
          Her mødes natur, fællesskab og høj faglighed.
        </p>
      </section>

      {/* KURSER */}
      <section style={section}>
        <h2>Kurser</h2>

        <div style={grid}>
          <Card title="Begynderkursus" text="Kom i gang med træklatring" />
          <Card title="Instruktørkursus" text="Bliv certificeret instruktør" />
          <Card title="Avanceret klatring" text="Udvid dine kompetencer" />
        </div>
      </section>

      {/* OPLEVELSER */}
      <section style={section}>
        <h2>Oplevelser</h2>

        <div style={grid}>
          <Card title="Trætur" text="Oplev skoven fra oven" />
          <Card title="Overnatning" text="Sov i trækronerne" />
          <Card title="Den vilde tur" text="For de modige" />
        </div>
      </section>

      {/* CTA */}
      <section style={ctaSection}>
        <h2>Klar til at komme op i træerne?</h2>
        <a href="/booking" style={cta}>
          Se kurser og tilmeld
        </a>
      </section>

    </main>
  );
}

function Card({ title, text }) {
  return (
    <div style={card}>
      <div style={cardImage}></div>
      <h3>{title}</h3>
      <p>{text}</p>
      <a href="/booking" style={cardButton}>Læs mere</a>
    </div>
  );
}

/* STYLES */

const hero = {
  height: "70vh",
  backgroundImage: "url('https://images.unsplash.com/photo-1502082553048-f009c37129b9')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const heroContent = {
  background: "rgba(0,0,0,0.5)",
  padding: 40,
  borderRadius: 16,
  color: "white",
  textAlign: "center"
};

const heroTitle = {
  fontSize: 48,
  marginBottom: 10
};

const heroText = {
  fontSize: 18,
  marginBottom: 20
};

const section = {
  padding: "60px 24px",
  maxWidth: 1100,
  margin: "0 auto"
};

const intro = {
  maxWidth: 600
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gap: 20,
  marginTop: 20
};

const card = {
  background: "white",
  padding: 20,
  borderRadius: 16,
  boxShadow: "0 6px 20px rgba(0,0,0,0.08)"
};

const cardImage = {
  height: 140,
  background: "#cfe3d6",
  borderRadius: 12,
  marginBottom: 12
};

const cardButton = {
  display: "inline-block",
  marginTop: 10,
  color: "#d8782f",
  fontWeight: 700,
  textDecoration: "none"
};

const ctaSection = {
  background: "#1f3a2b",
  color: "white",
  padding: 60,
  textAlign: "center"
};

const cta = {
  display: "inline-block",
  marginTop: 20,
  padding: "14px 22px",
  background: "#d8782f",
  color: "white",
  borderRadius: 10,
  textDecoration: "none",
  fontWeight: 700
};