import Image from "next/image";
import { getProducts } from "@/lib/getProducts";
import { formatPrice } from "@/app/components/AddToCart";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Shop — klatre- og friluftsudstyr",
  description:
    "Køb klatre- og friluftsudstyr hos Træklatreskolen — seler, reb, hjelme, karabiner og tilbehør til træklatring og friluftsliv.",
  alternates: { canonical: "/shop" },
  openGraph: {
    title: "Shop — klatre- og friluftsudstyr | Træklatreskolen",
    description: "Udstyr til træklatring og friluftsliv — udvalgt af instruktørerne bag Træklatreskolen.",
    url: "/shop",
    images: [{ url: "/og/forside.png", width: 1200, height: 630, alt: "Shop — Træklatreskolen" }],
  },
};

export default async function ShopPage() {
  const products = await getProducts();

  return (
    <main>
      <section className="page-hero" style={{ backgroundImage: "url('/images/hero-forest.jpg')" }}>
        <div className="page-hero-overlay">
          <div className="page-hero-inner">
            <p className="page-hero-eyebrow">Shop</p>
            <h1 className="page-hero-title">Klatre- og friluftsudstyr</h1>
            <p className="page-hero-text">
              Udstyr til træklatring og friluftsliv — udvalgt af instruktørerne bag Træklatreskolen.
            </p>
          </div>
        </div>
      </section>

      <section style={section}>
        <div style={container}>
          {products.length === 0 ? (
            <p style={{ textAlign: "center", color: "#4b6355" }}>Der er ingen varer i shoppen lige nu.</p>
          ) : (
            <div style={grid}>
              {products.map((p) => (
                <a key={p.slug} href={`/shop/${p.slug}`} style={card} className="feature-card">
                  <div style={imageWrap}>
                    {p.image ? (
                      <Image src={p.image} alt={p.name} fill style={{ objectFit: "cover" }}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
                    ) : (
                      <div style={imgPlaceholder}>🧗</div>
                    )}
                  </div>
                  <div style={body}>
                    {p.category && <span style={catTag}>{p.category}</span>}
                    <h2 style={name}>{p.name}</h2>
                    <p style={short}>{p.short}</p>
                    <div style={priceRow}>
                      <span style={price}>{formatPrice(p.price)}</span>
                      <span style={cta}>Se vare →</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

const section = { background: "#eef3ef", padding: "72px 24px 88px" };
const container = { maxWidth: 1180, margin: "0 auto" };
const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  gap: 28,
};
const card = {
  display: "flex",
  flexDirection: "column",
  background: "white",
  borderRadius: 18,
  overflow: "hidden",
  boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
  textDecoration: "none",
};
const imageWrap = { position: "relative", height: 230, background: "#dce8e0" };
const imgPlaceholder = {
  width: "100%", height: "100%", display: "flex", alignItems: "center",
  justifyContent: "center", fontSize: 48,
};
const body = { padding: "20px 22px 22px", display: "flex", flexDirection: "column", flex: 1 };
const catTag = {
  alignSelf: "flex-start",
  background: "#e7efe9",
  color: "#1f3a2b",
  fontWeight: 700,
  fontSize: 12,
  padding: "4px 10px",
  borderRadius: 999,
  marginBottom: 10,
};
const name = { margin: "0 0 8px", color: "#1f3a2b", fontSize: 20, fontWeight: 700 };
const short = { margin: "0 0 auto", color: "#4b6355", lineHeight: 1.6, fontSize: 15, paddingBottom: 16 };
const priceRow = { display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto" };
const price = { fontWeight: 800, color: "#1f3a2b", fontSize: 19 };
const cta = { color: "#d8782f", fontWeight: 700, fontSize: 14 };
