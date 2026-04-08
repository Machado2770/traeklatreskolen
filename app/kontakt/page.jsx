import { courses, experiences } from "@/lib/siteData";

export default function Home() {
  return (
    <main>
      <section style={hero}>
        <div style={heroOverlay}>
          <div style={heroInner}>
            <p style={eyebrow}>Træklatring · Friluftsliv · Faglighed</p>
            <h1 style={heroTitle}>Træklatreskolen</h1>
            <p style={heroLead}>
              Kurser og oplevelser i levende træer for dig, der vil lære,
              udvikle dig eller opleve skoven fra en helt ny vinkel.
            </p>
            <p style={heroText}>
              Hos Træklatreskolen mødes sikkerhed, naturforståelse og eventyr.
              Vi arbejder med træklatring som læringsrum, naturoplevelse og
              fagligt håndværk — fra de første skridt op i træet til mere
              avancerede forløb og instruktørniveau.
            </p>

            <div style={heroButtons}>
              <a href="/kurser" style={primaryBtn}>
                Se kurser
              </a>
              <a href="/oplevelser" style={secondaryBtn}>
                Se oplevelser
              </a>
              <a href="/booking" style={ghostBtn}>
                Gå til tilmelding
              </a>
            </div>
          </div>
        </div>
      </section>

      <section style={introSection}>
        <div style={introGrid}>
          <div>
            <p style={sectionEyebrow}>Velkommen</p>
            <h2 style={h2}>Træklatring med høj faglighed og stærke oplevelser</h2>
            <p style={bodyText}>
              Træklatreskolen er for både nybegyndere, erfarne klatrere,
              undervisere, institutioner, virksomheder og grupper, der ønsker
              kvalificerede forløb i træernes verden.
            </p>
            <p style={bodyText}>
              Vi lægger vægt på trygge rammer, tydelig sikkerhed, god formidling
              og sanselige naturoplevelser. Her handler det ikke kun om at komme
              op i højden, men om at skabe nærvær, læring og kontakt til naturen.
            </p>
          </div>

          <div style={featureWrap}>
            <FeatureCard
              title="Sikkerhed først"
              text="Alle forløb bygger på klare procedurer, erfaring og ansvarlig praksis."
            />
            <FeatureCard
              title="Faglig undervisning"
              text="Kurser med progression, refleksion og solid indføring i teknik og metode."
            />
            <FeatureCard
              title="Store naturoplevelser"
              text="Skoven og trækronerne som rum for ro, udfordring og eventyr."
            />
            <FeatureCard
              title="For flere målgrupper"
              text="Både enkeltpersoner, grupper, institutioner og virksomheder."
            />
          </div>
        </div>
      </section>

      <section style={imageBandSection}>
        <div style={imageBandGrid}>
          <div style={imageTextBlock}>
            <p style={sectionEyebrow}>Hvad vi tilbyder</p>
            <h2 style={h2}>Fra første klatring til fordybelse og oplevelse</h2>
            <p style={bodyText}>
              Uanset om du vil lære træklatring fra bunden, udvikle dig fagligt
              eller give en gruppe en særlig oplevelse, finder du et forløb, der
              passer til dit niveau og dit formål.
            </p>
          </div>

          <div style={imageBandImages}>
            <div style={imageCardLarge(
              "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=1400&q=80"
            )} />
            <div style={imageCardSmall(
              "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1200&q=80"
            )} />
            <div style={imageCardSmall(
              "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=80"
            )} />
          </div>
        </div>
      </section>

      <section style={section}>
        <div style={sectionHeader}>
          <div>
            <p style={sectionEyebrow}>Kurser</p>
            <h2 style={h2}>Kurser med progression og tydeligt indhold</h2>
          </div>
          <a href="/kurser" style={sectionLink}>
            Se alle kurser
          </a>
        </div>

        <div style={cardGrid}>
          {courses.map((item) => (
            <InfoCard
              key={item.slug}
              href={`/kurser/${item.slug}`}
              title={item.title}
              text={item.description}
              price={item.price}
              image={item.image}
            />
          ))}
        </div>
      </section>

      <section style={section}>
        <div style={sectionHeader}>
          <div>
            <p style={sectionEyebrow}>Oplevelser</p>
            <h2 style={h2}>Eventyrlige oplevelser i skoven og trækronerne</h2>
          </div>
          <a href="/oplevelser" style={sectionLink}>
            Se alle oplevelser
          </a>
        </div>

        <div style={cardGrid}>
          {experiences.map((item) => (
            <InfoCard
              key={item.slug}
              href={`/oplevelser/${item.slug}`}
              title={item.title}
              text={item.description}
              price={item.price}
              image={item.image}
            />
          ))}
        </div>
      </section>

      <section style={highlightSection}>
        <div style={highlightInner}>
          <div>
            <p style={sectionEyebrowLight}>Hvorfor vælge os</p>
            <h2 style={h2Light}>En skole med naturforståelse, teknik og menneskelighed</h2>
            <p style={highlightText}>
              Vi tror på, at de bedste træklatreoplevelser opstår, når teknik,
              tryghed og naturmøde går hånd i hånd. Derfor er vores forløb både
              praktiske, nærværende og professionelt forankrede.
            </p>
          </div>

          <div style={highlightList}>
            <div style={highlightItem}>Trygge rammer for nye deltagere</div>
            <div style={highlightItem}>Instruktørfaglighed og progression</div>
            <div style={highlightItem}>Sanselige naturoplevelser i højden</div>
            <div style={highlightItem}>Forløb til både læring og fællesskab</div>
          </div>
        </div>
      </section>

      <section style={ctaSection}>
        <p style={sectionEyebrow}>Klar til næste skridt?</p>
        <h2 style={h2}>Find det rigtige forløb</h2>
        <p style={ctaText}>
          Gå videre til kurser, oplevelser eller direkte til tilmelding. Har du
          spørgsmål, kan du også kontakte Træklatreskolen og få hjælp til at
          vælge det rigtige niveau.
        </p>

        <div style={heroButtons}>
          <a href="/booking" style={primaryBtn}>
            Tilmeld kursus
          </a>
          <a href="/kursuskalender" style={secondaryOrangeBtn}>
            Se kursuskalender
          </a>
          <a href="/kontakt" style={secondaryDarkBtn}>
            Kontakt os
          </a>
        </div>
      </section>
    </main>
  );
}

function FeatureCard({ title, text }) {
  return (
    <div style={featureCard}>
      <h3 style={featureTitle}>{title}</h3>
      <p style={featureText}>{text}</p>
    </div>
  );
}

function InfoCard({ href, title, text, price, image }) {
  return (
    <a href={href} style={infoCard}>
      <div
        style={{
          ...infoCardImage,
          backgroundImage: `url('${image}')`,
        }}
      />
      <div style={{ padding: 20 }}>
        <div style={priceTag}>{price}</div>
        <h3 style={infoCardTitle}>{title}</h3>
        <p style={infoCardText}>{text}</p>
        <span style={cardLink}>Læs mere</span>
      </div>
    </a>
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
  background: "linear-gradient(rgba(18,33,26,0.62), rgba(18,33,26,0.62))",
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
  letterSpacing: 1.8,
  fontSize: 13,
  opacity: 0.92,
  marginBottom: 12,
};

const heroTitle = {
  fontSize: "clamp(42px, 7vw, 76px)",
  margin: "0 0 16px",
};

const heroLead = {
  fontSize: 24,
  lineHeight: 1.5,
  maxWidth: 760,
  margin: "0 0 14px",
  fontWeight: 600,
};

const heroText = {
  fontSize: 18,
  lineHeight: 1.8,
  maxWidth: 760,
  margin: 0,
  opacity: 0.96,
};

const heroButtons = {
  display: "flex",
  gap: 12,
  flexWrap: "wrap",
  marginTop: 28,
};

const introSection = {
  maxWidth: 1180,
  margin: "0 auto",
  padding: "70px 24px 36px",
};

const introGrid = {
  display: "grid",
  gridTemplateColumns: "1.1fr 0.9fr",
  gap: 28,
  alignItems: "start",
};

const section = {
  maxWidth: 1180,
  margin: "0 auto",
  padding: "36px 24px 42px",
};

const imageBandSection = {
  maxWidth: 1180,
  margin: "0 auto",
  padding: "20px 24px 42px",
};

const imageBandGrid = {
  display: "grid",
  gridTemplateColumns: "0.95fr 1.05fr",
  gap: 28,
  alignItems: "center",
};

const imageTextBlock = {
  paddingRight: 10,
};

const imageBandImages = {
  display: "grid",
  gridTemplateColumns: "1.2fr 0.8fr",
  gap: 16,
};

const imageCardLarge = (url) => ({
  minHeight: 420,
  borderRadius: 24,
  backgroundImage: `url('${url}')`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  boxShadow: "0 10px 28px rgba(0,0,0,0.10)",
});

const imageCardSmall = (url) => ({
  minHeight: 202,
  borderRadius: 24,
  backgroundImage: `url('${url}')`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  boxShadow: "0 10px 28px rgba(0,0,0,0.10)",
});

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

const sectionEyebrow = {
  textTransform: "uppercase",
  letterSpacing: 1.6,
  fontSize: 13,
  color: "#8a4a20",
  marginBottom: 10,
  fontWeight: 700,
};

const sectionEyebrowLight = {
  textTransform: "uppercase",
  letterSpacing: 1.6,
  fontSize: 13,
  color: "#ffd0af",
  marginBottom: 10,
  fontWeight: 700,
};

const bodyText = {
  color: "#4b6355",
  lineHeight: 1.8,
  fontSize: 17,
  marginBottom: 14,
};

const featureWrap = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 16,
};

const featureCard = {
  background: "white",
  borderRadius: 18,
  padding: 20,
  boxShadow: "0 8px 28px rgba(0,0,0,0.07)",
};

const featureTitle = {
  marginTop: 0,
  marginBottom: 8,
  color: "#1f3a2b",
};

const featureText = {
  margin: 0,
  color: "#4b6355",
  lineHeight: 1.7,
};

const sectionHeader = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "end",
  gap: 16,
  flexWrap: "wrap",
  marginBottom: 20,
};

const sectionLink = {
  color: "#d8782f",
  fontWeight: 700,
  textDecoration: "none",
};

const cardGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: 22,
};

const infoCard = {
  display: "block",
  background: "white",
  borderRadius: 18,
  overflow: "hidden",
  textDecoration: "none",
  boxShadow: "0 8px 28px rgba(0,0,0,0.08)",
};

const infoCardImage = {
  height: 230,
  backgroundSize: "cover",
  backgroundPosition: "center",
};

const priceTag = {
  display: "inline-block",
  background: "#f5e5d8",
  color: "#a3521d",
  padding: "6px 10px",
  borderRadius: 999,
  fontSize: 12,
  fontWeight: 700,
};

const infoCardTitle = {
  margin: "10px 0 8px",
  color: "#1f3a2b",
};

const infoCardText = {
  margin: 0,
  color: "#4b6355",
  lineHeight: 1.7,
};

const cardLink = {
  display: "inline-block",
  marginTop: 14,
  color: "#d8782f",
  fontWeight: 700,
};

const highlightSection = {
  background: "#1f3a2b",
  marginTop: 30,
};

const highlightInner = {
  maxWidth: 1180,
  margin: "0 auto",
  padding: "70px 24px",
  color: "white",
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 28,
  alignItems: "start",
};

const highlightText = {
  lineHeight: 1.8,
  fontSize: 17,
  opacity: 0.95,
};

const highlightList = {
  display: "grid",
  gap: 14,
};

const highlightItem = {
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
  background: "rgba(255,255,255,0.12)",
  color: "white",
  borderRadius: 10,
  textDecoration: "none",
  fontWeight: 700,
  border: "1px solid rgba(255,255,255,0.24)",
};

const ghostBtn = {
  display: "inline-block",
  padding: "14px 22px",
  background: "transparent",
  color: "white",
  borderRadius: 10,
  textDecoration: "none",
  fontWeight: 700,
  border: "1px solid rgba(255,255,255,0.34)",
};

const secondaryOrangeBtn = {
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