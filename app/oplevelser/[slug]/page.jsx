export const dynamic = "force-dynamic";

import Image from "next/image";
import { getExperienceBySlug } from "@/lib/getCourses";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const item = await getExperienceBySlug(params.slug);
  if (!item) return {};
  return {
    title: item.title,
    description: item.description,
    openGraph: {
      title: `${item.title} | Træklatreskolen`,
      description: item.description,
      url: `/oplevelser/${item.slug}`,
      images: [{ url: item.image }],
    },
  };
}

export default async function OplevelseDetaljePage({ params }) {
  const item = await getExperienceBySlug(params.slug);

  if (!item) return notFound();

  return (
    <main style={page}>
      {/* Use only className — CSS media query handles responsive layout */}
      <div className="detail-grid">
        <div>
          <div style={tagRow}>
            <span style={price}>{item.price}</span>
            {item.duration && <span style={durationTag}>⏱ {item.duration}</span>}
          </div>
          <h1 style={h1}>{item.title}</h1>
          <p style={lead}>{item.description}</p>

          <ul style={list}>
            {(item.bullets || []).map((bullet) => (
              <li key={bullet} style={listItem}>{bullet}</li>
            ))}
          </ul>

          {/* Booking-info specifik for oplevelsen */}
          {(item.slug === "traetur" || item.slug === "overnatning" || item.slug === "vild") && (
            <div style={bookingInfo}>
              <div style={bookingInfoTitle}>Booking og minimumantal</div>
              <p style={bookingInfoText}>
                {item.slug === "vild"
                  ? "Oplevelsen gennemføres ved minimum 10 personer."
                  : "Oplevelsen gennemføres ved minimum 6 personer."}
                {" "}Aktiviteten slås op i{" "}
                <a href="/kursuskalender" style={bookingInfoLink}>kursuskalenderen</a>,
                hvor du tilmelder dig enkeltvis — aktiviteten bliver til noget, når minimumantallet er nået.
              </p>
            </div>
          )}

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 24 }}>
            <a href="/kursuskalender" style={ctaPrimary}>Kursuskalender</a>
            <a href="/oplevelser" style={ctaSecondary}>Tilbage til oplevelser</a>
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
};

const tagRow = {
  display: "flex",
  gap: 8,
  flexWrap: "wrap",
  marginBottom: 4,
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

const bookingInfo = {
  marginTop: 28,
  background: "#f0f6f2",
  border: "1px solid #c6ddd0",
  borderRadius: 12,
  padding: "16px 20px",
};

const bookingInfoTitle = {
  fontWeight: 700,
  color: "#1f3a2b",
  fontSize: 15,
  marginBottom: 6,
};

const bookingInfoText = {
  color: "#2d4034",
  fontSize: 14,
  lineHeight: 1.7,
  margin: 0,
};

const bookingInfoLink = {
  color: "#1f6b40",
  fontWeight: 700,
  textDecoration: "underline",
};
