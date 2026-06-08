export const metadata = {
  title: "Naturdannelse",
  description:
    "Naturdannelse hos Træklatreskolen — når naturen bliver et sted, vi lærer, mærker og udvikler os. Træklatring som læringsrum for skoler, institutioner, foreninger og organisationer.",
  alternates: { canonical: "/naturdannelse" },
  openGraph: {
    title: "Naturdannelse | Træklatreskolen",
    description:
      "Træklatring som læringsrum — oplevelse, faglighed og refleksion. Naturdannelse for børn, unge, voksne, fagpersoner og organisationer.",
    url: "/naturdannelse",
    images: [{ url: "/og/naturdannelse.png", width: 1200, height: 630, alt: "Naturdannelse — Træklatreskolen" }],
  },
};

const learningOutcomes = [
  "Mod og handlekraft",
  "Respekt for naturen",
  "Tillid til sig selv og andre",
  "Forståelse for sikkerhed og ansvar",
  "Fællesskab og samarbejde",
  "Personlig dømmekraft",
  "Nærvær og naturglæde",
];

const audiences = [
  {
    title: "Børn og unge",
    text: "En stærk måde at opleve naturen på gennem krop, sanser og fællesskab.",
  },
  {
    title: "Voksne grupper",
    text: "Nye erfaringer med mod, tillid og samarbejde.",
  },
  {
    title: "Fagpersoner og undervisere",
    text: "Inspiration til, hvordan naturen kan bruges som et aktivt læringsrum — for pædagoger, naturvejledere og undervisere.",
  },
  {
    title: "Organisationer og teams",
    text: "Konkrete samtaler om ansvar, kommunikation, grænser, samarbejde og dømmekraft.",
  },
];

const approach = [
  {
    title: "Oplevelse",
    text: "Deltagerne skal mærke naturen og opleve glæden ved at komme op i trækronerne.",
  },
  {
    title: "Faglighed",
    text: "Aktiviteterne skal være trygge, gennemtænkte og baseret på solid viden om træklatring, sikkerhed og friluftsliv.",
  },
  {
    title: "Refleksion",
    text: "Oplevelsen skal give anledning til eftertanke. Hvad skete der? Hvad lærte vi? Hvad tager vi med os videre?",
  },
];

export default function NaturdannelsePage() {
  return (
    <main>
      {/* HERO */}
      <section className="page-hero" style={{ backgroundImage: "url('/images/hero-forest.jpg')" }}>
        <div className="page-hero-overlay">
          <div className="page-hero-inner">
            <p className="page-hero-eyebrow">Naturdannelse</p>
            <h1 className="page-hero-title">Naturdannelse</h1>
            <p className="page-hero-text" style={{ maxWidth: 680 }}>
              Når naturen bliver et sted, vi lærer, mærker og udvikler os.
            </p>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section style={introSection}>
        <div style={introBox}>
          <div style={accentCenter} />
          <p style={introText}>
            Hos Træklatreskolen handler træklatring ikke kun om at komme op i et
            træ. Det handler også om at møde naturen på en ny måde — med kroppen,
            sanserne, modet og fællesskabet i spil.
          </p>
          <p style={{ ...introText, marginTop: 18 }}>
            Når vi bevæger os op i trækronerne, ændrer perspektivet sig. Skoven
            bliver ikke længere bare noget, vi går igennem. Den bliver et rum, vi
            er en del af. Vi mærker barken, højden, vinden, tyngden i rebet og
            tilliden til hinanden. Det er her, naturdannelse begynder.
          </p>
          <p style={{ ...introText, marginTop: 18 }}>
            Naturdannelse handler om at udvikle en dybere forståelse for naturen —
            ikke kun gennem viden, men gennem erfaring. Vi tror på, at mennesker
            får et stærkere forhold til naturen, når de oplever den direkte, bruger
            kroppen i den og får tid til at reflektere over det, de mærker.
          </p>
        </div>
      </section>

      {/* TRÆKLATRING SOM LÆRINGSRUM */}
      <section style={sectionGreen}>
        <div style={narrow}>
          <h2 style={h2}>Træklatring som læringsrum</h2>
          <div style={accent} />
          <p style={bodyText}>
            Træklatring skaber en særlig ramme for læring. Her bliver begreber som
            ansvar, tillid, grænser og dømmekraft meget konkrete.
          </p>
          <p style={{ ...bodyText, marginTop: 16 }}>
            Man mærker hurtigt, at sikkerhed ikke bare er regler på papir. Det er
            noget, vi gør for hinanden. Man lærer at tjekke udstyr, kommunikere
            tydeligt, tage ansvar og stole på både systemet, instruktøren og
            gruppen.
          </p>
          <p style={{ ...bodyText, marginTop: 16 }}>
            I træklatring bliver læring kropslig. Det er ikke kun noget, vi taler
            om — det er noget, vi gør.
          </p>
          <p style={{ ...bodyText, marginTop: 16 }}>
            Derfor arbejder Træklatreskolen med træklatring som et sted, hvor
            deltagerne kan udvikle:
          </p>
          <ul style={checkList}>
            {learningOutcomes.map((o) => (
              <li key={o} style={checkItem}><span style={check}>✓</span>{o}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* NATUREN SOM MERE END KULISSE */}
      <section style={sectionWhite}>
        <div style={narrow}>
          <h2 style={h2}>Naturen som mere end kulisse</h2>
          <div style={accent} />
          <p style={bodyText}>
            For os er naturen ikke bare en baggrund for aktiviteter. Naturen er
            selve rammen for oplevelsen og læringen.
          </p>
          <p style={{ ...bodyText, marginTop: 16 }}>
            Når vi klatrer i træer, arbejder vi med levende organismer. Træerne er
            ikke redskaber, men en del af et økosystem, som vi skal forstå og
            respektere. Derfor handler træklatring også om at lære at se træet,
            skoven og stedet med nye øjne.
          </p>
          <p style={{ ...bodyText, marginTop: 16 }}>
            Når vi arbejder med træklatring, er skoven som biotop en del af selve
            undervisningspensummet og læringen. Det giver deltagerne en konkret
            indsigt i træerne, naturen og friluftslivet i skoven — fra det enkelte
            træs bygning og levevilkår til samspillet i skovens økosystem.
          </p>
          <p style={{ ...bodyText, marginTop: 16 }}>
            Vi arbejder med respekt for træerne, skoven og de spor, vi efterlader.
            Det betyder, at vi både taler om teknik, sikkerhed og natursyn — og om
            hvordan vi kan færdes ansvarligt i naturen.
          </p>
        </div>
      </section>

      {/* FOR HVEM */}
      <section style={sectionGreen}>
        <div style={wide}>
          <h2 style={{ ...h2, textAlign: "center" }}>
            For skoler, institutioner, foreninger og organisationer
          </h2>
          <div style={{ ...accent, margin: "0 auto 28px" }} />
          <p style={{ ...bodyText, textAlign: "center", maxWidth: 640, margin: "0 auto 36px" }}>
            Naturdannelse er relevant for mange typer grupper.
          </p>
          <div style={cardGrid}>
            {audiences.map((a) => (
              <div key={a.title} style={infoCard}>
                <div style={valueAccent} />
                <h3 style={cardTitle}>{a.title}</h3>
                <p style={cardText}>{a.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VORES TILGANG */}
      <section style={sectionWhite}>
        <div style={wide}>
          <h2 style={{ ...h2, textAlign: "center" }}>Vores tilgang</h2>
          <div style={{ ...accent, margin: "0 auto 28px" }} />
          <p style={{ ...bodyText, textAlign: "center", maxWidth: 640, margin: "0 auto 36px" }}>
            Træklatreskolens tilgang bygger på tre grundelementer.
          </p>
          <div style={approachGrid}>
            {approach.map((a, i) => (
              <div key={a.title} style={approachCard}>
                <div style={approachNum}>{i + 1}</div>
                <h3 style={cardTitle}>{a.title}</h3>
                <p style={cardText}>{a.text}</p>
              </div>
            ))}
          </div>
          <p style={{ ...bodyText, textAlign: "center", maxWidth: 680, margin: "36px auto 0" }}>
            Det er i samspillet mellem oplevelse, faglighed og refleksion, at
            naturdannelse opstår.
          </p>
        </div>
      </section>

      {/* MERE END EN AKTIVITET */}
      <section style={closingSection}>
        <div style={closingInner}>
          <p style={closingEyebrow}>Mere end en aktivitet</p>
          <p style={closingText}>
            Træklatring kan være sjovt, vildt og udfordrende. Men det kan også
            noget mere.
          </p>
          <ul style={closingList}>
            <li style={closingItem}>Det kan åbne en ny relation til naturen.</li>
            <li style={closingItem}>Det kan styrke fællesskabet i en gruppe.</li>
            <li style={closingItem}>Det kan give deltagerne erfaringer med mod, ansvar og tillid.</li>
            <li style={closingItem}>Det kan gøre naturen nærværende på en måde, man husker.</li>
          </ul>
          <p style={{ ...closingText, marginTop: 24 }}>
            Derfor arbejder Træklatreskolen med naturdannelse som en central del af
            vores kurser, oplevelser og forløb.
          </p>
          <p style={closingPunch}>
            Vi klatrer ikke bare i træer.<br />
            Vi bruger trækronerne som et sted, hvor mennesker kan lære, mærke og
            udvikle sig.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section style={ctaSection}>
        <div style={ctaInner}>
          <h2 style={ctaTitle}>Vil I bruge naturen som læringsrum?</h2>
          <p style={ctaText}>
            Vi tilrettelægger kurser, oplevelser og forløb med naturdannelse i
            centrum — for grupper, skoler, institutioner og organisationer.
          </p>
          <div style={ctaButtons}>
            <a href="/kontakt" style={ctaPrimary}>Kontakt os</a>
            <a href="/organisationer" style={ctaSecondary}>For organisationer</a>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ── STYLES ── */

const introSection = { background: "#ffffff", padding: "80px 24px 64px" };
const introBox = { maxWidth: 800, margin: "0 auto", textAlign: "center" };
const accentCenter = { width: 52, height: 4, background: "#d8782f", borderRadius: 4, margin: "0 auto 28px" };
const introText = { fontSize: 18, lineHeight: 1.8, color: "#4b6355", margin: 0 };

const sectionGreen = { background: "#eef3ef", padding: "72px 24px" };
const sectionWhite = { background: "#ffffff", padding: "72px 24px" };
const narrow = { maxWidth: 800, margin: "0 auto" };
const wide = { maxWidth: 1080, margin: "0 auto" };

const h2 = {
  fontSize: "clamp(24px, 3.2vw, 34px)",
  fontWeight: 800,
  color: "#1f3a2b",
  margin: "0 0 14px",
};
const accent = { width: 52, height: 4, background: "#d8782f", borderRadius: 4, margin: "0 0 24px" };

const bodyText = { fontSize: 18, lineHeight: 1.8, color: "#4b6355", margin: 0 };

const checkList = {
  listStyle: "none",
  padding: 0,
  margin: "24px 0 0",
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
const check = { flexShrink: 0, color: "#d8782f", fontWeight: 800, fontSize: 18, lineHeight: 1.5 };

const cardGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
  gap: 24,
};
const infoCard = {
  background: "white",
  borderRadius: 18,
  padding: "26px 24px",
  boxShadow: "0 8px 28px rgba(0,0,0,0.07)",
};
const valueAccent = { width: 32, height: 3, background: "#d8782f", borderRadius: 4, marginBottom: 16 };
const cardTitle = { fontSize: 19, fontWeight: 700, color: "#1f3a2b", margin: "0 0 10px" };
const cardText = { fontSize: 15, lineHeight: 1.7, color: "#4b6355", margin: 0 };

const approachGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
  gap: 24,
};
const approachCard = {
  background: "#f7faf8",
  borderRadius: 18,
  padding: "30px 26px",
  textAlign: "center",
};
const approachNum = {
  width: 48,
  height: 48,
  margin: "0 auto 18px",
  borderRadius: "50%",
  background: "#d8782f",
  color: "white",
  fontSize: 22,
  fontWeight: 800,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const closingSection = { background: "#1f3a2b", padding: "80px 24px" };
const closingInner = { maxWidth: 760, margin: "0 auto", textAlign: "center" };
const closingEyebrow = {
  fontSize: 12,
  letterSpacing: 3,
  textTransform: "uppercase",
  color: "#d8782f",
  fontWeight: 700,
  margin: "0 0 18px",
};
const closingText = { fontSize: 18, lineHeight: 1.8, color: "rgba(255,255,255,0.85)", margin: 0 };
const closingList = {
  listStyle: "none",
  padding: 0,
  margin: "24px 0 0",
  display: "flex",
  flexDirection: "column",
  gap: 10,
};
const closingItem = { fontSize: 17, lineHeight: 1.6, color: "rgba(255,255,255,0.92)", fontWeight: 500 };
const closingPunch = {
  fontSize: 20,
  lineHeight: 1.7,
  color: "white",
  fontWeight: 700,
  margin: "32px 0 0",
};

const ctaSection = { background: "#d8782f", padding: "72px 24px" };
const ctaInner = { maxWidth: 680, margin: "0 auto", textAlign: "center", color: "white" };
const ctaTitle = { fontSize: "clamp(24px, 4vw, 40px)", fontWeight: 800, margin: "0 0 16px", lineHeight: 1.15 };
const ctaText = { fontSize: 18, lineHeight: 1.7, opacity: 0.92, margin: "0 0 32px" };
const ctaButtons = { display: "flex", justifyContent: "center", gap: 14, flexWrap: "wrap" };
const ctaPrimary = {
  background: "white",
  color: "#d8782f",
  textDecoration: "none",
  padding: "14px 28px",
  borderRadius: 12,
  fontWeight: 700,
  fontSize: 16,
};
const ctaSecondary = {
  background: "transparent",
  color: "white",
  textDecoration: "none",
  padding: "14px 28px",
  borderRadius: 12,
  fontWeight: 700,
  fontSize: 16,
  border: "2px solid rgba(255,255,255,0.6)",
};
