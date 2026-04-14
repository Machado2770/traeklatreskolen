export const metadata = {
  title: "Om os | Træklatreskolen",
  description:
    "Mød underviserne bag Træklatreskolen — erfarne instruktører med passion for træklatring, naturdannelse og sikkerhed.",
  openGraph: {
    title: "Om os | Træklatreskolen",
    description: "Mød folkene bag Træklatreskolen.",
    url: "/om-os",
  },
};

export default function OmOsPage() {
  return (
    <main>
      <section
        className="page-hero"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=1800&q=80')" }}
      >
        <div className="page-hero-overlay">
          <div className="page-hero-inner">
            <p className="page-hero-eyebrow">Om os</p>
            <h1 className="page-hero-title">Folkene bag Træklatreskolen</h1>
            <p className="page-hero-text">
              Mød underviserne bag Træklatreskolen — erfarne instruktører med
              passion for træklatring, naturdannelse og sikkerhed.
            </p>
          </div>
        </div>
      </section>

      <section style={section}>
        <div style={container}>

          {/* Intro */}
          <div style={intro}>
            <div style={accent} />
            <p style={introText}>
              Træklatreskolen er bygget på faglig stolthed, respekt for naturen og
              et oprigtigt ønske om at give andre en god og tryg oplevelse i
              trækronerne. Indholdet på denne side er under opbygning.
            </p>
          </div>

          {/* Placeholder — erstattes med indhold */}
          <div style={placeholder}>
            <p style={placeholderText}>Indhold om underviserne kommer snart.</p>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section style={ctaSection}>
        <div style={ctaInner}>
          <h2 style={ctaTitle}>Vil du vide mere?</h2>
          <p style={ctaText}>
            Tag kontakt — vi svarer gerne på spørgsmål om kurser, oplevelser og hvem vi er.
          </p>
          <div style={ctaButtons}>
            <a href="/kontakt" style={ctaPrimary}>Kontakt os</a>
            <a href="/kurser" style={ctaSecondary}>Se kurser</a>
          </div>
        </div>
      </section>
    </main>
  );
}

const section = {
  background: "#ffffff",
  padding: "72px 24px 88px",
};

const container = {
  maxWidth: 860,
  margin: "0 auto",
};

const intro = {
  textAlign: "center",
  marginBottom: 56,
};

const accent = {
  width: 40,
  height: 3,
  background: "#d8782f",
  borderRadius: 4,
  margin: "0 auto 20px",
};

const introText = {
  fontSize: 18,
  lineHeight: 1.8,
  color: "#4b6355",
  margin: 0,
};

const placeholder = {
  background: "#eef3ef",
  borderRadius: 18,
  padding: "64px 32px",
  textAlign: "center",
};

const placeholderText = {
  color: "#4b6355",
  fontSize: 16,
  margin: 0,
};

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
  fontSize: "clamp(24px, 4vw, 38px)",
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
