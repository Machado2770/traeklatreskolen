export const dynamic = "force-dynamic";

import Image from "next/image";
import { getCourseBySlug, getCourses } from "@/lib/getCourses";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const item = await getCourseBySlug(params.slug);
  if (!item) return {};
  return {
    title: item.title,
    description: item.description,
    openGraph: {
      title: `${item.title} | Træklatreskolen`,
      description: item.description,
      url: `/kurser/${item.slug}`,
      images: [{ url: item.image }],
    },
  };
}

export default async function KursusDetaljePage({ params }) {
  const item = await getCourseBySlug(params.slug);

  if (!item) {
    notFound();
  }

  return (
    <main style={page}>
      {/* Use only className — CSS media query handles responsive layout */}
      <div className="detail-grid">
        <div>
          <div style={tagRow}>
            <span style={priceTag}>{item.price}</span>
            <span style={levelTag}>{item.level}</span>
            {item.duration && <span style={durationTag}>⏱ {item.duration}</span>}
          </div>

          <h1 style={h1}>{item.title}</h1>
          {item.descriptionHtml ? (
            <p style={lead} dangerouslySetInnerHTML={{ __html: item.descriptionHtml }} />
          ) : (
            <p style={lead}>{item.description}</p>
          )}

          <ul style={list}>
            {(item.bullets || []).map((bullet) => (
              <li key={bullet} style={listItem}>
                {bullet}
              </li>
            ))}
          </ul>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 24 }}>
            <a href="/kursuskalender" style={ctaPrimary}>
              Kursuskalender
            </a>
            <a href="/kurser" style={ctaSecondary}>
              Tilbage til kurser
            </a>
          </div>
        </div>

        {/* Use only className — CSS handles min-height, border-radius, position:relative */}
        <div className="detail-image">
          <Image
            src={item.image}
            alt={item.title}
            fill
            priority
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>
    </main>
  );
}

const page = {
  maxWidth: 1180,
  margin: "0 auto",
  padding: "48px 24px 72px",
  overflowX: "hidden",
};

const tagRow = {
  display: "flex",
  gap: 8,
  flexWrap: "wrap",
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

const levelTag = {
  display: "inline-block",
  background: "#e7efe9",
  color: "#1f3a2b",
  padding: "6px 10px",
  borderRadius: 999,
  fontSize: 12,
  fontWeight: 700,
};

const durationTag = {
  display: "inline-block",
  background: "#eae8f5",
  color: "#3d3580",
  padding: "6px 10px",
  borderRadius: 999,
  fontSize: 12,
  fontWeight: 700,
};

const h1 = {
  color: "#1f3a2b",
  fontSize: "clamp(26px, 6vw, 42px)",
  margin: "14px 0 12px",
  overflowWrap: "break-word",
  wordBreak: "break-word",
  hyphens: "auto",
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
