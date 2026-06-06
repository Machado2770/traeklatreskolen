import Image from "next/image";
import { getCourses } from "@/lib/getCourses";
import VideoSection from "@/app/components/VideoSection";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Kurser i træklatring",
  description:
    "Se alle kurser hos Træklatreskolen — begynderkursus, brush-up, træklatreinstruktør, avanceret træklatring og eksamen. Kurser efter Dansk Træklatreforenings normer.",
  alternates: { canonical: "/kurser" },
  openGraph: {
    title: "Kurser i træklatring | Træklatreskolen",
    description: "Professionelle træklatrekurser for alle niveauer i hele Danmark.",
    url: "/kurser",
    images: [{ url: "/og/kurser.png", width: 1200, height: 630, alt: "Kurser i træklatring — Træklatreskolen" }],
  },
};

const aarskursusPoints = [
  "100 lektioner med regelmæssig selvtræning",
  "Teoretisk højt grundlag med inddragelse af relevant friluftsteori",
  "Mange forskellige klatreteknikker",
  "Træklatreinstruktør-uddannelse undervejs i forløbet — eksamination efter Dansk Træklatreforenings norm",
  "Avanceret niveau: avancerede rebbaner, kæmpegynger, traverser, sikker opsætning og risikovurdering",
  "Pædagogik, metodik og undervisningsdidaktik",
  "Skoven som biotop — naturen som læringsrum",
  "2 × friluftsture med friluftsliv som en stor del af forløbet",
  "Løbende inddragelse af ny viden — teknikker, undervisningsmetodik og natursyn",
  "Overnatning i trækronerne",
  "8 timers førstehjælp inkluderet",
  "Naturdannelse i centrum gennem hele året",
  "Personlig vejledning og løbende feedback på din udvikling",
  "Sikkerhed og ansvar som en gennemgående del af forløbet",
];

export default async function KurserPage() {
  const courses = await getCourses();
  return (
    <main>
      <section
        className="page-hero"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=1800&q=80')" }}
      >
        <div className="page-hero-overlay">
          <div className="page-hero-inner">
            <p className="page-hero-eyebrow">Kurser</p>
            <h1 className="page-hero-title">Kurser i træklatring</h1>
            <p className="page-hero-text">
              Fra begynderniveau til brush-up, instruktørforløb, avanceret træklatring og eksamen.
            </p>
          </div>
        </div>
      </section>

      <section style={section}>
        <div style={container}>
          <div style={grid}>
            {courses.map((item) => (
              <CourseCard key={item.slug} item={item} />
            ))}
          </div>

          {/* SPOTKURSUS — Årskursus */}
          <div style={spotWrap}>
            <div style={spotHeaderRow}>
              <span style={spotKicker}>Årskursus</span>
              <h2 style={spotHeading}>Årskursus — fordybelse i træklatring</h2>
              <p style={spotSubheading}>
                Et helt års fordybelse for dig, der vil hele vejen rundt om
                træklatring — fagligt, praktisk og personligt. Kører én gang
                årligt med opstart i maj.
              </p>
            </div>

            <div style={spotCard} className="spot-card">
              <div style={{ position: "relative" }} className="spot-image">
                <Image
                  src="/images/rebklatring.jpg"
                  alt="Årskursus i træklatring — fordybelse over et helt år"
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 900px) 100vw, 45vw"
                />
                <span style={spotBadge}>Start i foråret hvert år</span>
              </div>

              <div style={spotBody}>
                <div style={tagRow}>
                  <span style={priceTag}>16.995 kr.</span>
                  <span style={levelTag}>Avanceret niveau</span>
                  <span style={durationTag}>⏱ 100 lektioner</span>
                  <span style={seasonTag}>📅 1 gang årligt · start maj</span>
                </div>

                <p style={spotLead}>
                  Forestil dig et helt år i trækronerne — fra forårets lysegrønne
                  spring til vinterklatring i klar frostluft. Årskurset er vores
                  mest ambitiøse forløb: 100 lektioner med fordybelse i teknik,
                  sikkerhed, undervisning og friluftsliv — og et fællesskab, der
                  deler din passion for skoven.
                </p>
                <p style={spotLead}>
                  Undervejs uddannes og eksamineres du som træklatreinstruktør
                  efter Dansk Træklatreforenings norm — og resten af året omsætter
                  du rollen til praksis, så du slutter med både bevis, rutine og
                  sikker hånd.
                </p>

                <ul style={spotList}>
                  {aarskursusPoints.map((p) => (
                    <li key={p} style={spotItem}>
                      <span style={spotCheck}>✓</span>{p}
                    </li>
                  ))}
                </ul>

                <div style={spotActions}>
                  <a href="/kontakt" style={primaryButton}>Skriv til os om årskurset</a>
                  <a href="/kursuskalender" style={secondaryButton}>Se kursuskalender</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <VideoSection />
    </main>
  );
}

function CourseCard({ item }) {
  return (
    <div style={card} className="feature-card">
      <a href={`/kurser/${item.slug}`} style={imageLink}>
        <div style={imageWrap}>
          <Image
            src={item.image}
            alt={item.title}
            fill
            style={{ objectFit: "cover", filter: item.imageFilter }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </a>

      <div style={cardBody}>
        <div style={tagRow}>
          <span style={priceTag}>{item.price}</span>
          {item.level && <span style={levelTag}>{item.level}</span>}
          {item.duration && <span style={durationTag}>⏱ {item.duration}</span>}
        </div>

        <h3 style={cardTitle}>{item.title}</h3>
        <p style={cardText}>{item.short}</p>

        <div style={actionRow}>
          <a href={`/kurser/${item.slug}`} style={secondaryButton}>
            Læs mere
          </a>
          <a href="/kursuskalender" style={primaryButton}>
            Kursuskalender
          </a>
        </div>
      </div>
    </div>
  );
}

const section = {
  background: "#eef3ef",
  padding: "72px 24px 88px",
};

const container = {
  maxWidth: 1180,
  margin: "0 auto",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  gap: 28,
};

const card = {
  background: "white",
  borderRadius: 18,
  overflow: "hidden",
  boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
  display: "flex",
  flexDirection: "column",
};

const imageLink = {
  display: "block",
  flexShrink: 0,
};

const imageWrap = {
  position: "relative",
  height: 230,
  overflow: "hidden",
};

const cardBody = {
  padding: "20px 22px 24px",
  display: "flex",
  flexDirection: "column",
  flex: 1,
};

const tagRow = {
  display: "flex",
  gap: 8,
  flexWrap: "wrap",
  marginBottom: 12,
};

const priceTag = {
  display: "inline-block",
  padding: "5px 10px",
  borderRadius: 999,
  background: "#f5e5d8",
  color: "#a3521d",
  fontWeight: 700,
  fontSize: 12,
};

const levelTag = {
  display: "inline-block",
  padding: "5px 10px",
  borderRadius: 999,
  background: "#e7efe9",
  color: "#1f3a2b",
  fontWeight: 700,
  fontSize: 12,
};

const durationTag = {
  display: "inline-block",
  padding: "5px 10px",
  borderRadius: 999,
  background: "#eae8f5",
  color: "#3d3580",
  fontWeight: 700,
  fontSize: 12,
};

const cardTitle = {
  margin: "0 0 8px",
  color: "#1f3a2b",
  fontSize: 21,
  fontWeight: 700,
};

const cardText = {
  margin: "0 0 auto",
  color: "#4b6355",
  lineHeight: 1.7,
  fontSize: 15,
  paddingBottom: 20,
};

const actionRow = {
  display: "flex",
  gap: 10,
  marginTop: "auto",
};

const primaryButton = {
  flex: 1,
  display: "inline-block",
  padding: "12px 10px",
  background: "#d8782f",
  color: "white",
  borderRadius: 10,
  textDecoration: "none",
  fontWeight: 700,
  fontSize: 14,
  textAlign: "center",
};

const secondaryButton = {
  flex: 1,
  display: "inline-block",
  padding: "12px 10px",
  background: "#e7efe9",
  color: "#1f3a2b",
  borderRadius: 10,
  textDecoration: "none",
  fontWeight: 700,
  fontSize: 14,
  textAlign: "center",
};

/* ── SPOTKURSUS — Årskursus ── */
const spotWrap = {
  marginTop: 56,
};

const spotHeaderRow = {
  textAlign: "center",
  maxWidth: 760,
  margin: "0 auto 28px",
};

const spotKicker = {
  display: "inline-block",
  background: "#d8782f",
  color: "white",
  fontSize: 12,
  fontWeight: 800,
  letterSpacing: 1.5,
  textTransform: "uppercase",
  padding: "5px 12px",
  borderRadius: 999,
  marginBottom: 14,
};

const spotHeading = {
  fontSize: "clamp(26px, 3.5vw, 38px)",
  fontWeight: 800,
  color: "#1f3a2b",
  margin: "0 0 12px",
  lineHeight: 1.2,
};

const spotSubheading = {
  fontSize: 17,
  lineHeight: 1.7,
  color: "#4b6355",
  margin: 0,
};

const spotCard = {
  background: "white",
  borderRadius: 22,
  overflow: "hidden",
  boxShadow: "0 16px 48px rgba(0,0,0,0.12)",
  border: "2px solid #f0d9c4",
};

const spotBody = {
  padding: "34px 36px 36px",
};

const spotLead = {
  fontSize: 17,
  lineHeight: 1.75,
  color: "#3a4a40",
  margin: "0 0 24px",
};

// Kolonne-layout i stedet for grid: punkterne flyder ned i kolonnerne med
// fast, ens afstand — også når et punkt fylder to linjer.
const spotList = {
  listStyle: "none",
  padding: 0,
  margin: 0,
  columns: "260px 2",
  columnGap: 28,
};

const spotItem = {
  display: "flex",
  alignItems: "flex-start",
  gap: 10,
  fontSize: 15,
  lineHeight: 1.5,
  color: "#33463a",
  fontWeight: 500,
  breakInside: "avoid",
  marginBottom: 8,
};

const spotCheck = {
  flexShrink: 0,
  color: "#d8782f",
  fontWeight: 800,
  fontSize: 16,
};

const spotActions = {
  display: "flex",
  gap: 12,
  flexWrap: "wrap",
  marginTop: 30,
  maxWidth: 560,
};

const spotBadge = {
  position: "absolute",
  top: 16,
  left: 16,
  background: "rgba(31,58,43,0.92)",
  color: "white",
  fontSize: 13,
  fontWeight: 800,
  letterSpacing: 0.5,
  padding: "7px 14px",
  borderRadius: 999,
  zIndex: 1,
};

const seasonTag = {
  display: "inline-block",
  padding: "5px 10px",
  borderRadius: 999,
  background: "#e3efe6",
  color: "#216344",
  fontWeight: 700,
  fontSize: 12,
};
