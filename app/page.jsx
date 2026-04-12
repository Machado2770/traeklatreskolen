import { courses, experiences } from "@/lib/siteData";

export default function Home() {
  const featuredCourses = courses.slice(0, 3);
  const featuredExperiences = experiences.slice(0, 3);

  return (
    <main>
      <section style={hero}>
        <div style={heroOverlay}>
          <div style={heroInner}>
            <p style={eyebrow}>Dansk skov · Træklatring · Faglighed</p>
            <h1 style={heroTitle}>Træklatreskolen</h1>
            <p style={heroLead}>
              Kurser og oplevelser i levende træer for dig, der vil lære,
              udfordre dig selv og opleve naturen fra en ny vinkel.
            </p>
            <p style={heroText}>
              Vi arbejder med træklatring som læringsrum, naturoplevelse og
              fagligt håndværk. Her mødes sikkerhed, naturforståelse og eventyr
              i højden.
            </p>

            <div style={heroButtons}>
              <a href="/kurser" style={primaryBtn}>Se kurser</a>
              <a href="/oplevelser" style={secondaryBtn}>Se oplevelser</a>
              <a href="/booking" style={ghostBtn}>Tilmeld</a>
            </div>
          </div>
        </div>
      </section>

      <section style={section}>
        <div style={introGrid}>
          <div>
            <p style={sectionEyebrow}>Velkommen</p>
            <h2 style={h2}>Træklatring med tryghed, eventyr og høj faglighed</h2>
            <p style={bodyText}>
              Træklatreskolen skaber forløb, hvor naturmøde, teknik og læring
              går hånd i hånd. Her er plads til både det første møde med
              træklatring og til videre udvikling for mere erfarne deltagere.
            </p>
            <p style={bodyText}>
              Vi tror på, at de stærkeste oplevelser opstår, når sikkerhed,
              progression og naturforbindelse hænger sammen.
            </p>
          </div>

          <div style={pillars}>
            <div style={pillarCard}>
              <h3 style={pillarTitle}>Sikkerhed først</h3>
              <p style={pillarText}>
                Klare procedurer, ansvarlig praksis og trygge rammer i alle forløb.
              </p>
            </div>
            <div style={pillarCard}>
              <h3 style={pillarTitle}>Faglig progression</h3>
              <p style={pillarText}>
                Kurser med udvikling, teknik og læring i centrum.
              </p>
            </div>
            <div style={pillarCard}>
              <h3 style={pillarTitle}>Store naturoplevelser</h3>
              <p style={pillarText}>
                Skoven og trækronerne som rum for nærvær, mod og eventyr.
              </p>
            </div>
            <div style={pillarCard}>
              <h3 style={pillarTitle}>For flere målgrupper</h3>
              <p style={pillarText}>
                Enkeltpersoner, grupper, institutioner og virksomheder.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section style={sectionSoft}>
        <div style={sectionHeader}>
          <div>
            <p style={sectionEyebrow}>Kurser</p>
            <h2 style={h2}>Udvalgte kurser</h2>
          </div>
          <a href="/kurser" style={sectionLink}>Se alle kurser</a>
        </div>

        <div style={cardGrid}>
          {featuredCourses.map((item) => (
            <div key={item.slug} style={card}>
              <div
                style={{
                  ...cardImage,
                  backgroundImage: `url('${item.image}')`,
                }}
              />
              <div style={cardBody}>
                <div style={tagRow}>
                  <span style={priceTag}>{item.price}</span>
                  <span style={levelTag}>{item.level}</span>
                </div>
                <h3 style={cardTitle}>{item.title}</h3>
                <p style={cardText}>{item.short}</p>
                <div style={actionRow}>
                  <a href={`/kurser/${item.slug}`} style={secondarySmallBtn}>Læs mere</a>
                  <a href={item.bookingHref} style={primarySmallBtn}>Tilmeld</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={section}>
        <div style={sectionHeader}>
          <div>
            <p style={sectionEyebrow}>Oplevelser</p>
            <h2 style={h2}>Oplev skoven fra oven</h2>
          </div>
          <a href="/oplevelser" style={sectionLink}>Se alle oplevelser</a>
        </div>

        <div style={cardGrid}>
          {featuredExperiences.map((item) => (
            <div key={item.slug} style={card}>
              <div
                style={{
                  ...cardImage,
                  backgroundImage: `url('${item.image}')`,
                }}
              />
              <div style={cardBody}>
                <div style={tagRow}>
                  <span style={priceTag}>{item.price}</span>
                </div>
                <h3 style={cardTitle}>{item.title}</h3>
                <p style={cardText}>{item.short}</p>
                <div style={actionRow}>
                  <a href={`/oplevelser/${item.slug}`} style={secondarySmallBtn}>Læs mere</a>
                  <a href={item.bookingHref} style={primarySmallBtn}>Book / tilmeld</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={band}>
        <div style={bandInner}>
          <div>
            <p style={sectionEyebrowLight}>Hvorfor vælge os</p>
            <h2 style={h2Light}>En skole med naturforståelse, teknik og menneskelighed</h2>
            <p style={bandText}>
              Træklatreskolen forener praktisk kunnen, faglig refleksion og
              stærke naturoplevelser. Vi tror på, at de bedste forløb opstår,
              når tryghed, progression og eventyr får lov at hænge sammen.
            </p>
          </div>

          <div style={bandList}>
            <div style={bandItem}>Begynderkurser med trygge rammer</div>
            <div style={bandItem}>Videregående forløb og instruktørspor</div>
            <div style={bandItem}>Oplevelser for grupper og enkeltpersoner</div>
            <div style={bandItem}>Dansk skov, højder og nærvær i samme rum</div>
          </div>
        </div>
      </section>

      <section style={ctaSection}>
        <p style={sectionEyebrow}>Klar til næste skridt?</p>
        <h2 style={h2}>Find det rigtige forløb</h2>
        <p style={ctaText}>
          Gå videre til kurser, oplevelser eller direkte til tilmelding.
        </p>

        <div style={heroButtonsCentered}>
          <a href="/kurser" style={primaryBtn}>Se kurser</a>
          <a href="/kursuskalender" style={secondaryLightBtn}>Se kursuskalender</a>
          <a href="/kontakt" style={secondaryDarkBtn}>Kontakt os</a>
        </div>
      </section>
    </main>
  );
}

const hero = {
  minHeight: "78vh",
  backgroundImage:
    "url('https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=1800&q=80')",
  backgroundSize: "cover",
  backgroundPosition: "center",
};

const heroOverlay = {
  minHeight: "78vh",
  background: "linear-gradient(rgba(16,30,24,0.62), rgba(16,30,24,0.62))",
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
  letterSpacing: 2,
  fontSize: 12,
  marginBottom: 12,
};

const heroTitle = {
  fontSize: "clamp(46px, 8vw, 82px)",
  margin: "0 0 14px",
};

const heroLead = {
  maxWidth: 760,
  fontSize: 24,
  lineHeight: 1.65,
  margin: "0 0 14px",
  fontWeight: 600,
};

const heroText = {
  maxWidth: 760,
  fontSize: 18,
  lineHeight: 1.85,
  margin: 0,
};

const heroButtons = {
  display: "flex",
  gap: 12,
  flexWrap: "wrap",
  marginTop: 28,
};

const heroButtonsCentered = {
  display: "flex",
  gap: 12,
  flexWrap: "wrap",
  justifyContent: "center",
  marginTop: 24,
};

const section = {
  maxWidth: 1180,
  margin: "0 auto",
  padding: "64px 24px",
};

const sectionSoft = {
  maxWidth: 1180,
  margin: "0 auto",
  padding: "64px 24px",
};

const introGrid = {
  display: "grid",
  gridTemplateColumns: "1.05fr 0.95fr",
  gap: 28,
  alignItems: "start",
};

const sectionEyebrow = {
  textTransform: "uppercase",
  letterSpacing: 1.8,
  fontSize: 12,
  color: "#a3521d",
  marginBottom: 10,
  fontWeight: 700,
};

const sectionEyebrowLight = {
  textTransform: "uppercase",
  letterSpacing: 1.8,
  fontSize: 12,
  color: "#ffd0af",
  marginBottom: 10,
  fontWeight: 700,
};

const h2 = {
  color: "#1f3a2b",
  fontSize: 36,
  marginTop: 0,
  marginBottom: 14,
};

const h2Light = {
  color: "white",
  fontSize: 36,
  marginTop: 0,
  marginBottom: 14,
};

const bodyText = {
  color: "#4b6355",
  lineHeight: 1.8,
  fontSize: 17,
  marginBottom: 14,
};

const pillars = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 16,
};

const pillarCard = {
  background: "white",
  borderRadius: 18,
  padding: 20,
  boxShadow: "0 8px 24px rgba(0,0,0,0.07)",
};

const pillarTitle = {
  marginTop: 0,
  marginBottom: 8,
  color: "#1f3a2b",
};

const pillarText = {
  margin: 0,
  color: "#4b6355",
  lineHeight: 1.7,
};

const sectionHeader = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 12,
  flexWrap: "wrap",
  marginBottom: 20,
};

const sectionLink = {
  color: "#d8782f",
  textDecoration: "none",
  fontWeight: 700,
};

const cardGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: 22,
};

const card = {
  display: "block",
  background: "white",
  borderRadius: 20,
  overflow: "hidden",
  boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
};

const cardImage = {
  height: 220,
  backgroundSize: "cover",
  backgroundPosition: "center",
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
  fontSize: 24,
};

const cardText = {
  margin: 0,
  color: "#4b6355",
  lineHeight: 1.7,
};

const actionRow = {
  display: "flex",
  gap: 10,
  flexWrap: "wrap",
  marginTop: 18,
};

const band = {
  background: "#1f3a2b",
};

const bandInner = {
  maxWidth: 1180,
  margin: "0 auto",
  padding: "70px 24px",
  color: "white",
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 28,
  alignItems: "start",
};

const bandText = {
  lineHeight: 1.8,
  fontSize: 17,
  opacity: 0.95,
};

const bandList = {
  display: "grid",
  gap: 14,
};

const bandItem = {
  padding: "16px 18px",
  background: "rgba(255,255,255,0.08)",
  borderRadius: 16,
  border: "1px solid rgba(255,255,255,0.08)",
  fontWeight: 600,
};

const ctaSection = {
  maxWidth: 1180,
  margin: "0 auto",
  padding: "70px 24px 72px",
  textAlign: "center",
};

const ctaText = {
  maxWidth: 760,
  margin: "0 auto",
  color: "#4b6355",
  lineHeight: 1.8,
  fontSize: 17,
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
  background: "#1f3a2b",
  color: "white",
  borderRadius: 10,
  textDecoration: "none",
  fontWeight: 700,
};

const ghostBtn = {
  display: "inline-block",
  padding: "14px 22px",
  background: "transparent",
  color: "white",
  borderRadius: 10,
  textDecoration: "none",
  fontWeight: 700,
  border: "1px solid rgba(255,255,255,0.35)",
};

const primarySmallBtn = {
  display: "inline-block",
  padding: "10px 14px",
  background: "#d8782f",
  color: "white",
  borderRadius: 10,
  textDecoration: "none",
  fontWeight: 700,
  fontSize: 14,
};

const secondarySmallBtn = {
  display: "inline-block",
  padding: "10px 14px",
  background: "#e7efe9",
  color: "#1f3a2b",
  borderRadius: 10,
  textDecoration: "none",
  fontWeight: 700,
  fontSize: 14,
};

const secondaryLightBtn = {
  display: "inline-block",
  padding: "14px 22px",
  background: "#f5e5d8",
  color: "#a3521d",
  borderRadius: 10,
  textDecoration: "none",
  fontWeight: 700,
};

const secondaryDarkBtn = {
  display: "inline-block",
  padding: "14px 22px",
  background: "#e7efe9",
  color: "#1f3a2b",
  borderRadius: 10,
  textDecoration: "none",
  fontWeight: 700,
};