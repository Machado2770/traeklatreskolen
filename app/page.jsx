import { courses, experiences } from "@/lib/siteData";

export default function Home() {
  const featuredCourses = courses.slice(0, 3);
  const featuredExperiences = experiences.slice(0, 3);

  return (
    <main>
      {/* HERO */}
      <section style={hero}>
        <div style={heroOverlay}>
          <div style={heroInner}>
            <p style={eyebrow}>Dansk skov · Træklatring · Faglighed</p>
            <h1 style={heroTitle}>Træklatreskolen</h1>
            <p style={heroLead}>
              Kurser og oplevelser i levende træer for dig, der vil lære,
              udfordre dig selv og opleve skoven fra nye højder.
            </p>

            <div style={heroButtons}>
              <a href="/kurser" style={primaryBtn}>Se kurser</a>
              <a href="/oplevelser" style={secondaryBtn}>Se oplevelser</a>
            </div>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section style={section}>
        <div style={introBox}>
          <h2 style={sectionTitle}>Velkommen op i træerne</h2>
          <p style={sectionText}>
            Træklatreskolen tilbyder professionelle kurser, certificeringer og
            naturoplevelser i træernes verden. Vi arbejder med sikkerhed,
            fællesskab og læring i centrum.
          </p>
        </div>
      </section>

      {/* FEATURED COURSES */}
      <section style={sectionAlt}>
        <div style={container}>
          <h2 style={sectionTitle}>Udvalgte kurser</h2>
          <div style={grid}>
            {featuredCourses.map((item) => (
              <a key={item.slug} href={`/kurser/${item.slug}`} style={card}>
                <div
                  style={{
                    ...cardImage,
                    backgroundImage: `url('${item.image}')`,
                  }}
                />
                <div style={cardBody}>
                  <h3 style={cardTitle}>{item.title}</h3>
                  <p style={cardText}>{item.short}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED EXPERIENCES */}
      <section style={sectionAlt}>
        <div style={container}>
          <h2 style={sectionTitle}>Udvalgte oplevelser</h2>
          <div style={grid}>
            {featuredExperiences.map((item) => (
              <a key={item.slug} href={`/oplevelser/${item.slug}`} style={card}>
                <div
                  style={{
                    ...cardImage,
                    backgroundImage: `url('${item.image}')`,
                  }}
                />
                <div style={cardBody}>
                  <h3 style={cardTitle}>{item.title}</h3>
                  <p style={cardText}>{item.short}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

/* STYLES */

const hero = {
  minHeight: "88vh",
  backgroundImage: "url('/images/hero-forest.jpg')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  position: "relative",
};

const heroOverlay = {
  minHeight: "88vh",
  background: "rgba(16,32,24,0.52)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "40px 24px",
};

const heroInner = {
  maxWidth: 900,
  textAlign: "center",
  color: "white",
};

const eyebrow = {
  fontSize: 14,
  letterSpacing: 2,
  textTransform: "uppercase",
  marginBottom: 18,
  opacity: 0.9,
};

const heroTitle = {
  fontSize: "clamp(48px, 8vw, 88px)",
  fontWeight: 800,
  margin: "0 0 24px",
};

const heroLead = {
  fontSize: 22,
  lineHeight: 1.7,
  maxWidth: 760,
  margin: "0 auto 30px",
};

const heroButtons = {
  display: "flex",
  justifyContent: "center",
  gap: 16,
  flexWrap: "wrap",
};

const primaryBtn = {
  background: "#d8782f",
  color: "white",
  textDecoration: "none",
  padding: "14px 24px",
  borderRadius: 12,
  fontWeight: 700,
};

const secondaryBtn = {
  background: "rgba(255,255,255,0.15)",
  color: "white",
  textDecoration: "none",
  padding: "14px 24px",
  borderRadius: 12,
  fontWeight: 700,
  border: "1px solid rgba(255,255,255,0.25)",
};

const section = {
  padding: "80px 24px",
};

const sectionAlt = {
  padding: "80px 24px",
  background: "#eef3ef",
};

const container = {
  maxWidth: 1180,
  margin: "0 auto",
};

const introBox = {
  maxWidth: 850,
  margin: "0 auto",
  textAlign: "center",
};

const sectionTitle = {
  fontSize: 40,
  color: "#1f3a2b",
  marginBottom: 20,
  textAlign: "center",
};

const sectionText = {
  fontSize: 18,
  lineHeight: 1.8,
  color: "#4b6355",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  gap: 24,
};

const card = {
  display: "block",
  textDecoration: "none",
  background: "white",
  borderRadius: 20,
  overflow: "hidden",
  boxShadow: "0 10px 28px rgba(0,0,0,0.08)",
};

const cardImage = {
  height: 240,
  backgroundSize: "cover",
  backgroundPosition: "center",
};

const cardBody = {
  padding: 20,
};

const cardTitle = {
  margin: "0 0 10px",
  color: "#1f3a2b",
  fontSize: 24,
};

const cardText = {
  margin: 0,
  color: "#4b6355",
  lineHeight: 1.7,
};

