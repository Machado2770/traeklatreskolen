import { courses } from "@/lib/siteData";

export default function KurserPage() {
  return (
    <main style={page}>
      <div style={hero}>
        <h1 style={h1}>Kurser</h1>
        <p style={lead}>
          Fra første møde med træklatring til instruktørniveau og videre
          faglig fordybelse.
        </p>
      </div>

      <div style={grid}>
        {courses.map((item) => (
          <a key={item.slug} href={`/kurser/${item.slug}`} style={card}>
            <div
              style={{
                ...image,
                backgroundImage: `url('${item.image}')`,
              }}
            />
            <div style={{ padding: 20 }}>
              <div style={price}>{item.price}</div>
              <h2 style={{ color: "#1f3a2b" }}>{item.title}</h2>
              <p style={{ color: "#4b6355" }}>{item.description}</p>
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

const hero = {
  marginBottom: 28,
};

const h1 = {
  color: "#1f3a2b",
  fontSize: 42,
  marginBottom: 12,
};

const lead = {
  maxWidth: 760,
  color: "#4b6355",
  fontSize: 18,
  lineHeight: 1.7,
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
  borderRadius: 18,
  overflow: "hidden",
  boxShadow: "0 8px 28px rgba(0,0,0,0.08)",
};

const image = {
  height: 240,
  backgroundSize: "cover",
  backgroundPosition: "center",
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