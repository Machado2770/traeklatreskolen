export default function KontaktPage() {
  return (
    <main style={page}>
      <section style={hero}>
        <div style={heroTextWrap}>
          <p style={eyebrow}>Kontakt</p>
          <h1 style={h1}>Kontakt Træklatreskolen</h1>
          <p style={lead}>
            Har du spørgsmål om kurser, oplevelser, booking eller niveauvalg,
            så tag kontakt. Vi hjælper gerne med at finde det rigtige forløb.
          </p>
        </div>
      </section>

      <section style={grid}>
        <div style={card}>
          <h2 style={h2}>Kontaktinformation</h2>
          <p style={text}>
            Træklatreskolen tilbyder både åbne kurser og særlige forløb for
            grupper, institutioner og virksomheder.
          </p>

          <div style={infoBlock}>
            <div style={label}>E-mail</div>
            <div style={value}>info@traeklatreskolen.dk</div>
          </div>

          <div style={infoBlock}>
            <div style={label}>Område</div>
            <div style={value}>Kurser og oplevelser flere steder i Danmark</div>
          </div>

          <div style={infoBlock}>
            <div style={label}>Svar</div>
            <div style={value}>Vi bestræber os på at svare hurtigst muligt</div>
          </div>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 24 }}>
            <a href="/booking" style={primaryBtn}>Gå til tilmelding</a>
            <a href="/kursuskalender" style={secondaryBtn}>Se kursuskalender</a>
          </div>
        </div>

        <div style={card}>
          <h2 style={h2}>Hvad kan du skrive om?</h2>
          <ul style={list}>
            <li style={listItem}>Hvilket kursus passer til dit niveau?</li>
            <li style={listItem}>Booking af oplevelser for grupper</li>
            <li style={listItem}>Spørgsmål om priser og indhold</li>
            <li style={listItem}>Praktiske spørgsmål om udstyr og deltagelse</li>
            <li style={listItem}>Skræddersyede forløb for skoler, institutioner og virksomheder</li>
          </ul>

          <div style={noteBox}>
            <strong>Tip:</strong> Hvis du allerede ved, hvad du vil deltage i,
            så er det hurtigste ofte at gå direkte til booking eller kursuskalender.
          </div>
        </div>
      </section>

      <section style={ctaBand}>
        <h2 style={{ marginTop: 0, marginBottom: 14 }}>Klar til næste skridt?</h2>
        <p style={{ maxWidth: 720, margin: "0 auto 20px", lineHeight: 1.7 }}>
          Uanset om du er ny i træklatring eller søger et mere avanceret forløb,
          kan du gå videre herfra.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <a href="/kurser" style={primaryBtn}>Se kurser</a>
          <a href="/oplevelser" style={secondaryDarkBtn}>Se oplevelser</a>
        </div>
      </section>
    </main>
  );
}

const page = {
  maxWidth: 1180,
  margin: "0 auto",
  padding: "48px 24px 72px",
};

const hero = {
  background:
    "linear-gradient(rgba(31,58,43,0.78), rgba(31,58,43,0.68)), url('https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=1800&q=80') center/cover",
  minHeight: 320,
  borderRadius: 24,
  display: "flex",
  alignItems: "center",
  padding: "36px 32px",
  color: "white",
};

const heroTextWrap = {
  maxWidth: 760,
};

const eyebrow = {
  textTransform: "uppercase",
  letterSpacing: 1.5,
  fontSize: 13,
  opacity: 0.9,
  marginBottom: 10,
};

const h1 = {
  fontSize: "clamp(34px, 6vw, 58px)",
  margin: "0 0 14px",
};

const lead = {
  fontSize: 18,
  lineHeight: 1.7,
  margin: 0,
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
  gap: 24,
  marginTop: 30,
};

const card = {
  background: "white",
  borderRadius: 20,
  padding: 28,
  boxShadow: "0 8px 28px rgba(0,0,0,0.08)",
};

const h2 = {
  marginTop: 0,
  color: "#1f3a2b",
  fontSize: 28,
};

const text = {
  color: "#4b6355",
  lineHeight: 1.7,
};

const infoBlock = {
  marginTop: 18,
  paddingTop: 14,
  borderTop: "1px solid #edf2ee",
};

const label = {
  fontSize: 13,
  textTransform: "uppercase",
  letterSpacing: 0.4,
  color: "#6c7f73",
  marginBottom: 6,
  fontWeight: 700,
};

const value = {
  color: "#1f2f25",
  fontWeight: 600,
};

const list = {
  paddingLeft: 18,
  margin: "10px 0 0",
  color: "#33463a",
  lineHeight: 1.9,
};

const listItem = {
  marginBottom: 6,
};

const noteBox = {
  marginTop: 24,
  background: "#eef4ef",
  borderRadius: 14,
  padding: 16,
  color: "#2f4337",
  lineHeight: 1.7,
};

const ctaBand = {
  marginTop: 36,
  background: "#1f3a2b",
  color: "white",
  textAlign: "center",
  padding: "64px 24px",
  borderRadius: 24,
};

const primaryBtn = {
  display: "inline-block",
  padding: "14px 22px",
  background: "#d8782f",
  color: "white",
  borderRadius: 10,
  textDecoration: "none",
  fontWeight: 700,
};

const secondaryBtn = {
  display: "inline-block",
  padding: "14px 22px",
  background: "#e7efe9",
  color: "#1f3a2b",
  borderRadius: 10,
  textDecoration: "none",
  fontWeight: 700,
};

const secondaryDarkBtn = {
  display: "inline-block",
  padding: "14px 22px",
  background: "rgba(255,255,255,0.12)",
  color: "white",
  borderRadius: 10,
  textDecoration: "none",
  fontWeight: 700,
  border: "1px solid rgba(255,255,255,0.22)",
};