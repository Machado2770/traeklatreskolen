import Image from "next/image";
import { getCourses } from "@/lib/getCourses";
import VideoSection from "@/app/components/VideoSection";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Kurser i træklatring",
  description:
    "Se alle kurser hos Træklatreskolen — begynderkursus, brush-up, træklatreinstruktør, avanceret træklatring og eksamen. Kurser efter Dansk Træklatreforenings normer.",
  openGraph: {
    title: "Kurser i træklatring | Træklatreskolen",
    description: "Professionelle træklatrekurser for alle niveauer i hele Danmark.",
    url: "/kurser",
  },
};

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
