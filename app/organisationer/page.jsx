import { CONTACT_EMAIL } from "@/lib/siteConfig";

export const metadata = {
  title: "Sikker Træklatring for Organisationer",
  description:
    "Organisationsforløb i sikker træklatring for skoler, institutioner, naturskoler, ungdomsskoler, højskoler og friluftsorganisationer. Instruktøruddannelse, SOP, risikovurdering og praktisk træning — opbyg egne kompetencer i træklatring.",
  alternates: { canonical: "/organisationer" },
  openGraph: {
    title: "Sikker Træklatring for Organisationer | Træklatreskolen",
    description:
      "Samlet organisationsforløb i træklatring — instruktøruddannelse, sikkerhedsprocedurer, risikovurdering og praktisk træning. Pilotforløb for op til 6 medarbejdere i 2026.",
    url: "/organisationer",
    images: [{ url: "/og/forside.png", width: 1200, height: 630, alt: "Sikker træklatring for organisationer — Træklatreskolen" }],
  },
};

const MEETING_LINK =
  `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Afklaringsmøde om organisationsforløb")}`;

const audience = [
  "Skoler og efterskoler",
  "Højskoler",
  "Naturskoler",
  "Kommunale naturcentre",
  "Ungdomsskoler",
  "Institutioner",
  "Friluftsorganisationer",
  "Spejdercentre og outdoor-aktører",
];

const included = [
  "Begynderforløb i træklatring",
  "Instruktøruddannelse",
  "Arbejde med sikkerhedsprocedurer/SOP",
  "Risikovurderingsskabelon",
  "Praktisk træning i instruktion og gennemførelse",
  "Eksamen/godkendelse",
  "60 minutters online opfølgning efter forløbet",
];

const results = [
  "Større tryghed omkring sikkerhed og ansvar",
  "Fælles procedurer for gennemførelse",
  "Medarbejdere med konkrete instruktørkompetencer",
  "Mulighed for at tilbyde flere egne friluftsaktiviteter",
  "Mindre afhængighed af eksterne instruktører",
];

const nextSteps = [
  "Om forløbet passer til jeres organisation",
  "Hvem der skal uddannes",
  "Hvilke aktiviteter I ønsker at kunne gennemføre",
  "Hvilket niveau medarbejderne har i dag",
  "Hvordan et konkret forløb kan tilrettelægges hos jer",
];

export default function OrganisationerPage() {
  return (
    <main>
      {/* HERO */}
      <section className="page-hero" style={{ backgroundImage: "url('/images/hero-forest.jpg')" }}>
        <div className="page-hero-overlay">
          <div className="page-hero-inner">
            <p className="page-hero-eyebrow">For organisationer</p>
            <h1 className="page-hero-title">Sikker Træklatring for Organisationer</h1>
            <p className="page-hero-text" style={{ maxWidth: 680 }}>
              Vil I kunne tilbyde træklatring med egne medarbejdere — sikkert,
              dokumenteret og fagligt stærkt?
            </p>
            <p className="page-hero-text" style={{ maxWidth: 680, marginTop: 14 }}>
              Træklatreskolen tilbyder et samlet organisationsforløb for skoler,
              institutioner, naturskoler, ungdomsskoler, højskoler og
              friluftsorganisationer, der vil opbygge egne kompetencer i
              træklatring.
            </p>
            <div style={{ marginTop: 32 }}>
              <a href={MEETING_LINK} style={heroBtn}>Book 20 minutters afklaringsmøde</a>
            </div>
          </div>
        </div>
      </section>

      <div style={pageInner}>

        {/* SEKTION 1 — Hvem er forløbet for? */}
        <section style={section}>
          <h2 style={h2}>Hvem er forløbet for?</h2>
          <div style={accent} />
          <p style={lead}>
            Forløbet er relevant for organisationer, der arbejder med børn, unge,
            voksne eller fællesskaber i naturen — og som ønsker at kunne bruge
            træklatring som en tryg og professionel aktivitet.
          </p>
          <p style={{ ...lead, marginTop: 14, marginBottom: 22 }}>Det kan fx være:</p>
          <ul style={pillList}>
            {audience.map((a) => (
              <li key={a} style={pill}>{a}</li>
            ))}
          </ul>
        </section>

        {/* SEKTION 2 — Det får I */}
        <section style={cardSection}>
          <h2 style={h2}>Det får I</h2>
          <div style={accent} />
          <p style={lead}>
            Forløbet samler uddannelse, sikkerhed og praktisk implementering i én
            samlet pakke. I får:
          </p>
          <ul style={checkList}>
            {included.map((i) => (
              <li key={i} style={checkItem}><span style={check}>✓</span>{i}</li>
            ))}
          </ul>
        </section>

        {/* SEKTION 3 — Resultatet */}
        <section style={section}>
          <h2 style={h2}>Resultatet</h2>
          <div style={accent} />
          <p style={lead}>
            Efter forløbet står I med medarbejdere, der har et fælles fagligt
            grundlag for at arbejde med træklatring. Målet er, at jeres
            organisation får:
          </p>
          <ul style={checkList}>
            {results.map((r) => (
              <li key={r} style={checkItem}><span style={check}>✓</span>{r}</li>
            ))}
          </ul>
        </section>

        {/* SEKTION 4 — Pilotforløb */}
        <section style={pilotBand}>
          <p style={pilotEyebrow}>Pilotforløb 2026</p>
          <h2 style={{ ...h2, color: "white", marginTop: 0 }}>Et begrænset antal pladser</h2>
          <p style={{ ...lead, color: "rgba(255,255,255,0.85)" }}>
            I 2026 åbner Træklatreskolen for et begrænset antal pilotforløb for
            organisationer.
          </p>
          <div style={pilotFacts}>
            <div style={pilotFact}>
              <div style={pilotFactLabel}>Deltagere</div>
              <div style={pilotFactValue}>Op til 6 medarbejdere</div>
            </div>
            <div style={pilotFact}>
              <div style={pilotFactLabel}>Pris</div>
              <div style={pilotFactValue}>49.500 kr. ekskl. moms</div>
            </div>
          </div>
          <p style={{ ...lead, color: "rgba(255,255,255,0.7)", fontSize: 15, marginTop: 22 }}>
            Efter pilotperioden forventes organisationsforløbet udbudt til
            normalpris.
          </p>
        </section>

        {/* SEKTION 5 — Næste skridt */}
        <section style={cardSection}>
          <h2 style={h2}>Næste skridt</h2>
          <div style={accent} />
          <p style={lead}>
            Book et kort afklaringsmøde på 20 minutter. Her finder vi ud af:
          </p>
          <ul style={checkList}>
            {nextSteps.map((s) => (
              <li key={s} style={checkItem}><span style={check}>✓</span>{s}</li>
            ))}
          </ul>
          <div style={{ marginTop: 28 }}>
            <a href={MEETING_LINK} style={primaryBtn}>Book 20 minutters afklaringsmøde</a>
          </div>
        </section>

      </div>
    </main>
  );
}

const pageInner = {
  maxWidth: 920,
  margin: "0 auto",
  padding: "56px 24px 72px",
  display: "flex",
  flexDirection: "column",
  gap: 28,
};

const section = {
  background: "transparent",
};

const cardSection = {
  background: "white",
  borderRadius: 20,
  padding: "36px 32px",
  boxShadow: "0 8px 28px rgba(0,0,0,0.08)",
};

const h2 = {
  fontSize: "clamp(24px, 3.2vw, 34px)",
  fontWeight: 800,
  color: "#1f3a2b",
  margin: "0 0 14px",
};

const accent = {
  width: 52,
  height: 4,
  background: "#d8782f",
  borderRadius: 4,
  margin: "0 0 22px",
};

const lead = {
  fontSize: 18,
  lineHeight: 1.75,
  color: "#4b6355",
  margin: 0,
};

const pillList = {
  listStyle: "none",
  padding: 0,
  margin: 0,
  display: "flex",
  flexWrap: "wrap",
  gap: 12,
};

const pill = {
  background: "white",
  border: "1px solid #e1ebe4",
  borderRadius: 999,
  padding: "10px 18px",
  color: "#1f3a2b",
  fontWeight: 600,
  fontSize: 15,
  boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
};

const checkList = {
  listStyle: "none",
  padding: 0,
  margin: "22px 0 0",
  display: "flex",
  flexDirection: "column",
  gap: 12,
};

const checkItem = {
  display: "flex",
  alignItems: "flex-start",
  gap: 12,
  fontSize: 17,
  lineHeight: 1.6,
  color: "#33463a",
  fontWeight: 500,
};

const check = {
  flexShrink: 0,
  color: "#d8782f",
  fontWeight: 800,
  fontSize: 18,
  lineHeight: 1.5,
};

const pilotBand = {
  background: "#1f3a2b",
  borderRadius: 24,
  padding: "44px 36px",
};

const pilotEyebrow = {
  fontSize: 12,
  letterSpacing: 3,
  textTransform: "uppercase",
  color: "#d8782f",
  fontWeight: 700,
  margin: "0 0 14px",
};

const pilotFacts = {
  display: "flex",
  flexWrap: "wrap",
  gap: 16,
  marginTop: 26,
};

const pilotFact = {
  flex: "1 1 200px",
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.12)",
  borderRadius: 16,
  padding: "20px 22px",
};

const pilotFactLabel = {
  fontSize: 13,
  textTransform: "uppercase",
  letterSpacing: 0.6,
  color: "rgba(255,255,255,0.6)",
  fontWeight: 700,
  marginBottom: 8,
};

const pilotFactValue = {
  fontSize: 20,
  fontWeight: 800,
  color: "white",
};

const heroBtn = {
  display: "inline-block",
  background: "#d8782f",
  color: "white",
  textDecoration: "none",
  padding: "16px 30px",
  borderRadius: 14,
  fontWeight: 700,
  fontSize: 17,
  boxShadow: "0 4px 20px rgba(216,120,47,0.45)",
};

const primaryBtn = {
  display: "inline-block",
  background: "#d8782f",
  color: "white",
  textDecoration: "none",
  padding: "14px 26px",
  borderRadius: 12,
  fontWeight: 700,
  fontSize: 16,
};
