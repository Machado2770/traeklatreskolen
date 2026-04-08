import { courses, experiences } from "@/lib/siteData";

export default function Home() {
  return (
    <main>
      <section style={hero}>
        <div style={overlay}>
          <div style={heroInner}>
            <p style={eyebrow}>Træklatring · Friluftsliv · Faglighed</p>
            <h1 style={title}>Træklatreskolen</h1>
            <p style={lead}>
              Kurser og oplevelser i levende træer for dig, der vil lære, udvikle
              dig og opleve naturen fra en ny vinkel.
            </p>
            <p style={heroText}>
              Hos Træklatreskolen mødes sikkerhed, naturforståelse og eventyr.
              Vi arbejder med træklatring som læringsrum, naturoplevelse og
              fagligt håndværk — fra første klatring til mere avancerede forløb.
            </p>

            <div style={btnWrap}>
              <a href="/kurser" style={btnPrimary}>Se kurser</a>
              <a href="/oplevelser" style={btnSecondary}>Se oplevelser</a>
              <a href="/booking" style={btnGhost}>Tilmeld</a>
            </div>
          </div>
        </div>
      </section>

      <section style={section}>
        <div style={introBlock}>
          <div>
            <p style={sectionEyebrow}>Velkommen</p>
            <h2 style={h2}>Træklatring med høj faglighed og stærke naturoplevelser</h2>
            <p style={text}>
              Vi tilbyder forløb for både begyndere, erfarne klatrere, grupper,
              institutioner og virksomheder. Her er der fokus på trygge rammer,
              god formidling og oplevelser, der sætter sig i kroppen.
            </p>
          </div>
          <div style={statGrid}>
            <StatCard title="Sikkerhed først" text="Alle forløb bygger på klare procedurer og ansvarlig praksis." />
            <StatCard title="Faglig progression" text="Kurser med tydeligt niveau, teknik og læringsmål." />
            <StatCard title="Store oplevelser" text="Skoven og trækronerne som rum for nærvær og eventyr." />
            <StatCard title="For flere målgrupper" text="Enkeltpersoner, grupper, skoler og virksomheder." />
          </div>
        </div>
      </section>

      <section style={section}>
        <div style={sectionHeader}>
          <div>
            <p style={sectionEyebrow}>Kurser</p>
            <h2 style={h2}>Lær, udvikl dig og bliv stærkere i træet</h2>
          </div>
          <a href="/kurser" style={sectionLink}>Se alle kurser</a>
        </div>

        <div style={grid}>
          {courses.map((item) => (
            <CourseCard
              key={item.slug}
              href={`/kurser/${item.slug}`}
              title={item.title}
              text={item.short}
              image={item.image}
              price={item.price}
              level={item.level}
              bookingHref={item.bookingHref}
            />
          ))}
        </div>
      </section>

      <section style={section}>
        <div style={sectionHeader}>
          <div>
            <p style={sectionEyebrow}>Oplevelser</p>
            <h2 style={h2}>Skoven oplevet fra en ny vinkel</h2>
          </div>
          <a href="/oplevelser" style={sectionLink}>Se alle oplevelser</a>
        </div>

        <div style={grid}>
          {experiences.map((item) => (
            <ExperienceCard
              key={item.slug}
              href={`/oplevelser/${item.slug}`}
              title={item.title}
              text={item.short}
              image={item.image}
              price={item.price}
              bookingHref={item.bookingHref}
            />
          ))}
        </div>
      </section>

      <section style={ctaSection}>
        <h2 style={{ marginTop: 0 }}>Klar til næste skridt?</h2>
        <p style={ctaText}>
          Gå direkte til booking, eller udforsk kurser og oplevelser først.
        </p>
        <div style={btnWrapCentered}>
          <a href="/booking" style={btnPrimary}>Tilmeld kursus</a>
          <a href="/kursuskalender" style={btnLight}>Se kursuskalender</a>
        </div>
      </section>
    </main>
  );
}

function StatCard({ title, text }) {
  return (
    <div style={statCard}>
      <h3 style={{ marginTop: 0, marginBottom: 8, color: "#1f3a2b" }}>{title}</h3>
      <p style={{ margin: 0, color: "#4b6355", lineHeight: 1.7 }}>{text}</p>
    </div>
  );
}

function CourseCard({ href, title, text, image, price, level, bookingHref }) {
  return (
    <div style={card}>
      <a href={href} style={{ textDecoration: "none", color: "inherit" }}>
        <div style={{ ...img, backgroundImage: `url('${image}')` }} />
      </a>
      <div style={{ padding: 18 }}>
        <div style={tagRow}>
          <span style={priceTag}>{price}</span>
          <span style={levelTag}>{level}</span>
        </div>
        <h3 style={cardTitle}>{title}</h3>
        <p style={cardText}>{text}</p>
        <div style={actionRow}>
          <a href={href} style={cardLink}>Læs mere</a>
          <a href={bookingHref} style={smallBtn}>Tilmeld</a>
        </div>
      </div>
    </div>
  );
}

function ExperienceCard({ href, title, text, image, price, bookingHref }) {
  return (
    <div style={card}>
      <a href={href} style={{ textDecoration: "none", color: "inherit" }}>
        <div style={{ ...img, backgroundImage: `url('${image}')` }} />
      </a>
      <div style={{ padding: 18 }}>
        <div style={tagRow}>
          <span style={priceTag}>{price}</span>
        </div>
        <h3 style={cardTitle}>{title}</h3>
        <p style={cardText}>{text}</p>
        <div style={actionRow}>
          <a href={href} style={cardLink}>Læs mere</a>
          <a href={bookingHref} style={smallBtn}>Book</a>
        </div>
      </div>
    </div>
  );
}

const hero = {
  minHeight: "76vh",
  backgroundImage: "url('https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=1800&q=80')",
  backgroundSize: "cover",
  backgroundPosition: "center",
};

const overlay = {
  minHeight: "76vh",
  background: "linear-gradient(rgba(18,33,26,0.58), rgba(18,33,26,0.58))",
  display: "flex",
  alignItems: "center",
};

const heroInner = {
  maxWidth: 1180,
  margin: "0 auto",
  padding: "64px 24px",
  color: "white",
};

const eyebrow = {
  textTransform: "uppercase",
  fontSize: 12,
  letterSpacing: 2,
  marginBottom: 10,
};

const title = {
  fontSize: "clamp(44px, 7vw, 76px)",
  margin: "0 0 12px",
};

const lead = {
  fontSize: 24,
  maxWidth: 760,
  lineHeight: 1.5,
  margin: "0 0 12px",
  fontWeight: 600,
};

const heroText = {
  fontSize: 18,
  maxWidth: 760,
  lineHeight: 1.8,
  margin: 0,
};

const btnWrap = {
  marginTop: 24,
  display: "flex",
  gap: 10,
  flexWrap: "wrap",
};

const btnWrapCentered = {
  marginTop: 20,
  display: "flex",
  gap: 10,
  flexWrap: "wrap",
  justifyContent: "center",
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

const btnLight = {
  background: "rgba(255,255,255,0.16)",
  color: "white",
  padding: "12px 18px",
  borderRadius: 10,
  textDecoration: "none",
  border: "1px solid rgba(255,255,255,0.25)",
};

const section = {
  padding: "60px 24px",
  maxWidth: 1180,
  margin: "0 auto",
};

const introBlock = {
  display: "grid",
  gridTemplateColumns: "1.05fr 0.95fr",
  gap: 28,
  alignItems: "start",
};

const sectionEyebrow = {
  textTransform: "uppercase",
  fontSize: 12,
  letterSpacing: 1.8,
  color: "#a3521d",
  marginBottom: 10,
  fontWeight: 700,
};

const h2 = {
  color: "#1f3a2b",
  fontSize: 36,
  marginTop: 0,
};

const text = {
  maxWidth: 720,
  color: "#4b6355",
  lineHeight: 1.8,
  fontSize: 17,
};

const statGrid = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 16,
};

const statCard = {
  background: "white",
  padding: 18,
  borderRadius: 16,
  boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
};

const sectionHeader = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "end",
  gap: 16,
  flexWrap: "wrap",
  marginBottom: 18,
};

const sectionLink = {
  color: "#d8782f",
  fontWeight: 700,
  textDecoration: "none",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  gap: 22,
  marginTop: 20,
};

const card = {
  background: "white",
  borderRadius: 18,
  overflow: "hidden",
  boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
};

const img = {
  height: 220,
  backgroundSize: "cover",
  backgroundPosition: "center",
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
  background: "#e8f0ea",
  color: "#1f3a2b",
  fontWeight: 700,
  fontSize: 12,
};

const cardTitle = {
  margin: "0 0 8px",
  color: "#1f3a2b",
};

const cardText = {
  margin: 0,
  color: "#4b6355",
  lineHeight: 1.7,
};

const actionRow = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 12,
  marginTop: 16,
};

const cardLink = {
  color: "#d8782f",
  textDecoration: "none",
  fontWeight: 700,
};

const smallBtn = {
  background: "#1f3a2b",
  color: "white",
  padding: "10px 14px",
  borderRadius: 10,
  textDecoration: "none",
  fontWeight: 700,
  fontSize: 14,
};

const ctaSection = {
  background: "#1f3a2b",
  color: "white",
  textAlign: "center",
  padding: 60,
};

const ctaText = {
  maxWidth: 700,
  margin: "0 auto",
  lineHeight: 1.8,
  opacity: 0.94,
};