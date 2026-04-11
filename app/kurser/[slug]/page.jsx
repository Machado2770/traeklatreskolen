import { courses } from "@/lib/siteData";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return courses.map((course) => ({
    slug: course.slug,
  }));
}

export default function KursusDetaljePage({ params }) {
  const item = courses.find((course) => course.slug === params.slug);

  if (!item) {
    notFound();
  }

  return (
    <main style={page}>
      <div style={grid}>
        <div>
          <div style={tagRow}>
            <span style={price}>{item.price}</span>
            <span style={level}>{item.level}</span>
          </div>

          <h1 style={h1}>{item.title}</h1>
          <p style={lead}>{item.description}</p>

          <ul style={list}>
            {item.bullets.map((bullet) => (
              <li key={bullet} style={listItem}>
                {bullet}
              </li>
            ))}
          </ul>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 24 }}>
            <a href={item.bookingHref} style={ctaPrimary}>
              Tilmeld kursus
            </a>
            <a href="/kurser" style={ctaSecondary}>
              Tilbage til kurser
            </a>
          </div>
        </div>

        <div
          style={{
            ...image,
            backgroundImage: `url('${item.image}')`,
          }}
        />
      </div>
    </main>
  );
}

const page = {
  maxWidth: 1180,
  margin: "0 auto",
  padding: "48px 24px 72px",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "1.1fr 0.9fr",
  gap: 28,
  alignItems: "start",
};

const tagRow = {
  display: "flex",
  gap: 8,
  flexWrap: "wrap",
};

const price = {
  display: "inline-block",
  background: "#f5e5d8",
  color: "#a3521d",
  padding: "6px 10px",
  borderRadius: 999,
  fontSize: 12,
  fontWeight: 700,
};

const level = {
  display: "inline-block",
  background: "#e7efe9",
  color: "#1f3a2b",
  padding: "6px 10px",
  borderRadius: 999,
  fontSize: 12,
  fontWeight: 700,
};

const h1 = {
  color: "#1f3a2b",
  fontSize: 42,
  margin: "14px 0 12px",
};

const lead = {
  color: "#4b6355",
  fontSize: 18,
  lineHeight: 1.7,
};

const list = {
  marginTop: 24,
  paddingLeft: 18,
  color: "#2d4034",
  lineHeight: 1.8,
};

const listItem = {
  marginBottom: 8,
};

const image = {
  minHeight: 420,
  borderRadius: 22,
  backgroundSize: "cover",
  backgroundPosition: "center",
};

const ctaPrimary = {
  display: "inline-block",
  padding: "14px 22px",
  background: "#d8782f",
  color: "white",
  borderRadius: 10,
  textDecoration: "none",
  fontWeight: 700,
};

const ctaSecondary = {
  display: "inline-block",
  padding: "14px 22px",
  background: "#e7efe9",
  color: "#1f3a2b",
  borderRadius: 10,
  textDecoration: "none",
  fontWeight: 700,
};