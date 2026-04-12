import Image from "next/image";
import { courses } from "@/lib/siteData";

export const metadata = {
  title: "Kurser i træklatring",
  description:
    "Se alle kurser hos Træklatreskolen — begynderkursus, brush-up, træklatreinstruktør, avanceret træklatring og eksamen. Kurser efter Klatresamrådets normer.",
  openGraph: {
    title: "Kurser i træklatring | Træklatreskolen",
    description: "Professionelle træklatrekurser for alle niveauer i hele Danmark.",
    url: "/kurser",
  },
};

export default function KurserPage() {
  return (
    <main>
      <section className="page-hero" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=1800&q=80')" }}>
        <div className="page-hero-overlay">
          <div className="page-hero-inner">
            <p className="page-hero-eyebrow">Kurser</p>
            <h1 className="page-hero-title">Kurser i træklatring</h1>
            <p className="page-hero-text">
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

      {/* ── VIDEOVEJLEDNING ── */}
      <section style={videoSection}>
        <div style={videoInner}>

          {/* Venstre: tekst */}
          <div style={videoText}>
            <p style={videoEyebrow}>📹 Videovejledning</p>
            <h2 style={videoTitle}>Træklatring i praksis</h2>
            <p style={videoLead}>
              Videoerne er produceret af undertegnede i regi af{" "}
              <strong style={{ color: "#d8782f" }}>DGI Storkøbenhavn</strong> og
              giver et visuelt indblik i teknikker og metoder inden for træklatring
              — fra knob og sikring til klatring og nedfiring.
            </p>

            <div style={disclaimerBox}>
              <div style={disclaimerHeading}>⚠ Vigtig vejledning</div>
              <p style={disclaimerText}>
                Vejledningen er kun ment som <strong>inspiration</strong> til
                træklatring, og viser forskellige teknikker. Videovejledningen
                viser kun ÉT alternativ og kan derfor ikke stå alene, og skal
                altid suppleres af undervisning.
              </p>
              <p style={{ ...disclaimerText, marginTop: 10 }}>
                📱 Brug videovejledningen på din smartphone når du er i skoven.
              </p>
            </div>

            <div style={dgiBox}>
              <div style={dgiLabel}>Produceret i samarbejde med</div>
              <div style={dgiName}>DGI Storkøbenhavn</div>
              <div style={dgiSub}>Dansk Gymnastik- og Idrætsforbund</div>
            </div>
          </div>

          {/* Højre: video */}
          <div style={videoEmbed}>
            <div style={videoWrapper}>
              <iframe
                src="https://www.youtube.com/embed/x6FnqkbzkU4?list=PLEgHi5tgtkfcciovbZqTTtlH3LwhToRf1&rel=0"
                title="Træklatring videovejledning — DGI Storkøbenhavn"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                style={{ position:"absolute", top:0, left:0, width:"100%", height:"100%", border:0, borderRadius:14 }}
              />
            </div>
            <p style={videoCaption}>
              Afspilningslisten indeholder alle vejledningsvideoer — naviger med pilene i afspilleren
            </p>
          </div>

        </div>
      </section>
    </main>
  );
}

function CourseCard({ item }) {
  return (
    <div style={card}>
      <div style={imageWrap}>
        <Image
          src={item.image}
          alt={item.title}
          fill
          style={{ objectFit: "cover" }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

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
  minHeight: 320,
  backgroundImage:
    "url('https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=1800&q=80')",
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
  borderRadius: 18,
  overflow: "hidden",
  boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
};

const imageWrap = {
  position: "relative",
  height: 240,
  overflow: "hidden",
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
  fontSize: 22,
  fontWeight: 700,
};

const cardText = {
  margin: 0,
  color: "#4b6355",
  lineHeight: 1.7,
  minHeight: 48,
  fontSize: 15,
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

/* ── VIDEO SECTION ── */
const videoSection = {
  background: "#1f3a2b",
  padding: "72px 24px",
};
const videoInner = {
  maxWidth: 1180,
  margin: "0 auto",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  gap: 48,
  alignItems: "start",
};
const videoText = {
  color: "white",
};
const videoEyebrow = {
  fontSize: 13,
  fontWeight: 700,
  textTransform: "uppercase",
  letterSpacing: 2,
  color: "#d8782f",
  margin: "0 0 12px",
};
const videoTitle = {
  fontSize: "clamp(26px, 3.5vw, 38px)",
  fontWeight: 800,
  color: "white",
  margin: "0 0 16px",
  lineHeight: 1.15,
};
const videoLead = {
  fontSize: 16,
  lineHeight: 1.75,
  color: "rgba(255,255,255,0.82)",
  margin: "0 0 28px",
};
const disclaimerBox = {
  background: "rgba(255,255,255,0.08)",
  border: "1px solid rgba(255,255,255,0.15)",
  borderLeft: "4px solid #d8782f",
  borderRadius: 12,
  padding: "18px 20px",
  marginBottom: 24,
};
const disclaimerHeading = {
  fontWeight: 700,
  color: "#d8782f",
  fontSize: 14,
  marginBottom: 10,
  letterSpacing: 0.5,
};
const disclaimerText = {
  fontSize: 14,
  lineHeight: 1.7,
  color: "rgba(255,255,255,0.8)",
  margin: 0,
};
const dgiBox = {
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.12)",
  borderRadius: 12,
  padding: "16px 20px",
};
const dgiLabel = {
  fontSize: 12,
  textTransform: "uppercase",
  letterSpacing: 1.5,
  color: "rgba(255,255,255,0.5)",
  marginBottom: 6,
  fontWeight: 600,
};
const dgiName = {
  fontSize: 18,
  fontWeight: 800,
  color: "white",
};
const dgiSub = {
  fontSize: 13,
  color: "rgba(255,255,255,0.55)",
  marginTop: 3,
};
const videoEmbed = {
  display: "flex",
  flexDirection: "column",
  gap: 12,
};
const videoWrapper = {
  position: "relative",
  paddingBottom: "56.25%",
  height: 0,
  overflow: "hidden",
  borderRadius: 14,
  boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
};
const videoCaption = {
  fontSize: 13,
  color: "rgba(255,255,255,0.45)",
  margin: 0,
  textAlign: "center",
  lineHeight: 1.5,
};
