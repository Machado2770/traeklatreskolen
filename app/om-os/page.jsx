import Image from "next/image";

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

const instructors = [
  {
    name: "Martin Machado",
    role: "Træklatreinstruktør & stifter",
    image: "https://ighjiiafidndwvaowmdc.supabase.co/storage/v1/object/public/site-images/1776198006583-Martin.jpg",
    imagePosition: "top",
    bio: [
      "Martin er natur- og friluftsvejleder med en passion for at bringe mennesker tættere på naturen, styrke fællesskaber og udvikle den enkeltes evner og selvtillid under kyndig vejledning. Med en master i friluftsliv og over 20 års erfaring spænder hans virke bredt — fra træklatring som vejleder og censor i Dansk Træklatreforening til uddannelse som Havkajakinstruktør II og Kanoinstruktør II.",
      "For Martin handler friluftsvejledning om mere end bare tekniske færdigheder — det er en rejse ind i naturen, hvor fællesskab og personlig udvikling får plads til at blomstre.",
    ],
  },
  {
    name: "Lykke Theill-Larsen",
    role: "Træklatreinstruktør",
    image: "https://ighjiiafidndwvaowmdc.supabase.co/storage/v1/object/public/site-images/1777183039684-Lykke.jpeg",
    imagePosition: "center",
    imageFit: "contain",
    bio: [
      "Lykke er uddannet træklatreinstruktør og en vigtig del af holdet bag Træklatreskolen. Hun har en særlig evne til at skabe trygge rammer for deltagerne — særligt for dem der møder træklatring for første gang.",
      "Lykkes tilgang kombinerer faglig sikkerhed med omsorg for den enkelte deltager, og hun bidrager til at Træklatreskolen kan tilbyde oplevelser og kurser af høj kvalitet for både grupper og enkeltpersoner.",
    ],
  },
];

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
              Erfarne instruktører med passion for træklatring, naturdannelse og sikkerhed.
            </p>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section style={introSection}>
        <div style={introContainer}>
          <div style={accent} />
          <p style={introText}>
            Træklatreskolen er bygget på faglig stolthed, respekt for naturen og et oprigtigt
            ønske om at give andre en god og tryg oplevelse i trækronerne. Vi arbejder med
            udeliv, fordi vi er overbevist om at naturen som arbejdsrum fremkalder nogle af
            de bedste rammer for naturdannelse, udvikling og refleksion.
          </p>
        </div>
      </section>

      {/* Instruktører */}
      <section style={teamSection}>
        <div style={container}>
          <div style={teamGrid}>
            {instructors.map((person) => (
              <div key={person.name} style={card}>
                <div style={{
                  ...imageWrap,
                  backgroundImage: person.imageFit === "contain"
                    ? "url('https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80')"
                    : undefined,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}>
                  {person.image ? (
                    <Image
                      src={person.image}
                      alt={person.name}
                      fill
                      style={{
                        objectFit: person.imageFit || "cover",
                        objectPosition: person.imagePosition || "center",
                        filter: "brightness(0.92) contrast(1.08) saturate(0.82)",
                      }}
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  ) : (
                    <div style={imagePlaceholder}>
                      <span style={placeholderIcon}>🌲</span>
                      <span style={placeholderLabel}>Billede kommer snart</span>
                    </div>
                  )}
                </div>
                <div style={cardBody}>
                  <div style={roleTag}>{person.role}</div>
                  <h2 style={personName}>{person.name}</h2>
                  {person.bio.map((para, i) => (
                    <p key={i} style={{ ...bioText, marginTop: i === 0 ? 0 : 14 }}>{para}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Værdier */}
      <section style={valuesSection}>
        <div style={valuesContainer}>
          <h2 style={valuesTitle}>Vores tilgang</h2>
          <div style={valuesGrid}>
            {[
              {
                title: "Sikkerhed først",
                text: "Alle aktiviteter gennemføres efter Dansk Træklatreforenings normer. Vi har erhvervsforsikring der dækker alle deltagere.",
              },
              {
                title: "Faglighed i praksis",
                text: "Vi underviser med afsæt i mange års erfaring og løbende efteruddannelse — teori og praksis går hånd i hånd.",
              },
              {
                title: "Naturen som ramme",
                text: "Vi er overbevist om at skoven er et af de bedste læringsrum der findes. Naturen skaber nærvær og refleksion.",
              },
            ].map((v) => (
              <div key={v.title} style={valueCard}>
                <div style={valueAccent} />
                <h3 style={valueTitle}>{v.title}</h3>
                <p style={valueText}>{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={ctaSection}>
        <div style={ctaInner}>
          <h2 style={ctaTitle}>Klar til at komme op i trækronerne?</h2>
          <p style={ctaText}>
            Tag kontakt eller find dit næste kursus eller oplevelse i kursuskalenderen.
          </p>
          <div style={ctaButtons}>
            <a href="/kontakt" style={ctaPrimary}>Kontakt os</a>
            <a href="/kursuskalender" style={ctaSecondary}>Se kursuskalender</a>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ── STYLES ── */

const introSection = {
  background: "#ffffff",
  padding: "72px 24px 56px",
};

const introContainer = {
  maxWidth: 760,
  margin: "0 auto",
  textAlign: "center",
};

const accent = {
  width: 40,
  height: 3,
  background: "#d8782f",
  borderRadius: 4,
  margin: "0 auto 22px",
};

const introText = {
  fontSize: 18,
  lineHeight: 1.8,
  color: "#4b6355",
  margin: 0,
};

const teamSection = {
  background: "#eef3ef",
  padding: "56px 24px 88px",
};

const container = {
  maxWidth: 1080,
  margin: "0 auto",
};

const teamGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
  gap: 32,
};

const card = {
  background: "white",
  borderRadius: 20,
  overflow: "hidden",
  boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
};

const imageWrap = {
  position: "relative",
  height: 340,
  overflow: "hidden",
};

const imagePlaceholder = {
  width: "100%",
  height: "100%",
  background: "#dce8e0",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: 10,
};

const placeholderIcon = {
  fontSize: 48,
};

const placeholderLabel = {
  fontSize: 14,
  color: "#4b6355",
  fontWeight: 600,
};

const cardBody = {
  padding: "24px 28px 32px",
};

const roleTag = {
  display: "inline-block",
  background: "#f5e5d8",
  color: "#a3521d",
  fontSize: 12,
  fontWeight: 700,
  padding: "5px 10px",
  borderRadius: 999,
  marginBottom: 12,
};

const personName = {
  fontSize: 26,
  fontWeight: 800,
  color: "#1f3a2b",
  margin: "0 0 16px",
};

const bioText = {
  fontSize: 15,
  lineHeight: 1.75,
  color: "#4b6355",
  margin: 0,
};

const valuesSection = {
  background: "#ffffff",
  padding: "72px 24px 88px",
};

const valuesContainer = {
  maxWidth: 1080,
  margin: "0 auto",
};

const valuesTitle = {
  fontSize: "clamp(24px, 3.5vw, 36px)",
  fontWeight: 800,
  color: "#1f3a2b",
  textAlign: "center",
  margin: "0 0 40px",
};

const valuesGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: 28,
};

const valueCard = {
  padding: "28px 24px",
  background: "#f7faf8",
  borderRadius: 16,
};

const valueAccent = {
  width: 32,
  height: 3,
  background: "#d8782f",
  borderRadius: 4,
  marginBottom: 16,
};

const valueTitle = {
  fontSize: 18,
  fontWeight: 700,
  color: "#1f3a2b",
  margin: "0 0 10px",
};

const valueText = {
  fontSize: 15,
  lineHeight: 1.7,
  color: "#4b6355",
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
