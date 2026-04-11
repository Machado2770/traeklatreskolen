import { courses } from "@/lib/siteData";

export default function KurserPage() {
  return (
    <main style={page}>
      <h1 style={title}>Kurser i træklatring</h1>
      <p style={lead}>
        Her finder du alle kurser i Træklatreskolen — fra begynderniveau
        til brush-up, instruktørforløb, avanceret træklatring og eksamen.
      </p>

      <div style={grid}>
        {courses.map((item) => (
          <a key={item.slug} href={`/kurser/${item.slug}`} style={card}>
            <div
              style={{
                ...image,
                backgroundImage: `url('${item.image}')`,
              }}
            />
            <div style={{ padding: 18 }}>
              <div style={tagRow}>
                <span style={priceTag}>{item.price}</span>
                <span style={levelTag}>{item.level}</span>
              </div>
              <h3 style={cardTitle}>{item.title}</h3>
              <p style={cardText}>{item.short}</p>
            </div>
          </a>
        ))}
      </div>
    </main>
  );
}

const page = {
  maxWidth: 1180,
  margin: "0 auto",
  padding: "48px 24px 72px",
};

const title = {
  color: "#1f3a2b",
  fontSize: 42,
  marginBottom: 12,
};

const lead = {
  maxWidth: 760,
  color: "#4b6355",
  fontSize: 18,
  lineHeight: 1.7,
  marginBottom: 32,
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  gap: 24,
};

const card = {
  display: "block",
  background: "white",
  borderRadius: 20,
  overflow: "hidden",
  boxShadow: "0 10px 28px rgba(0,0,0,0.08)",
  textDecoration: "none",
};

const image = {
  height: 240,
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