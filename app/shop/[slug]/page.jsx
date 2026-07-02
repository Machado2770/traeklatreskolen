import Image from "next/image";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/getProducts";
import { productBadge, BADGE_COLORS } from "@/lib/shopData";
import { graph, productLd, breadcrumbLd, jsonLdScript } from "@/lib/jsonld";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const p = await getProductBySlug(params.slug);
  if (!p) return { title: "Vare ikke fundet" };
  return {
    title: p.name,
    description: p.short || p.description?.slice(0, 150),
    alternates: { canonical: `/shop/${p.slug}` },
    openGraph: {
      title: `${p.name} | Træklatreskolen`,
      description: p.short || "",
      url: `/shop/${p.slug}`,
      images: p.image ? [{ url: p.image, width: 1200, height: 630, alt: p.name }] : undefined,
    },
  };
}

export default async function ProductPage({ params }) {
  const p = await getProductBySlug(params.slug);
  if (!p) notFound();

  const badge = productBadge(p);

  const path = `/shop/${p.slug}`;
  const jsonLd = graph(
    productLd(p, path),
    breadcrumbLd([
      { name: "Forside", path: "/" },
      { name: "Shop", path: "/shop" },
      ...(p.category ? [{ name: p.category, path: "/shop" }] : []),
      { name: p.name, path },
    ])
  );

  return (
    <main>
      <script {...jsonLdScript(jsonLd)} />
      <div style={constructionBanner}>
        Webshop under opbygning, forventes klar i efteråret 2026
      </div>
      <div style={pageInner}>
        <a href={`/shop#${p.slug}`} style={back}>← Tilbage til shoppen</a>

        <div style={grid} className="shop-detail-grid">
          <div style={imageWrap}>
            {badge && (
              <span style={{ ...detailBadge, background: BADGE_COLORS[badge] || "#d8782f" }}>
                {badge}
              </span>
            )}
            {p.image ? (
              <Image src={p.image} alt={p.name} fill style={{ objectFit: "contain", padding: 18 }}
                sizes="(max-width: 900px) 100vw, 50vw" priority />
            ) : (
              <div style={imgPlaceholder}>Foto på vej</div>
            )}
          </div>

          <div style={info}>
            {p.category && <span style={catTag}>{p.category}</span>}
            <h1 style={title}>{p.name}</h1>

            {p.description && <p style={desc}>{p.description}</p>}

            {p.bullets?.length > 0 && (
              <ul style={bullets}>
                {p.bullets.map((b) => (
                  <li key={b} style={bulletItem}><span style={check}>✓</span>{b}</li>
                ))}
              </ul>
            )}

            <div style={{ marginTop: 26 }}>
              <a href="/kontakt" style={notifyBtn}>Skriv til os om varen</a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

const pageInner = { maxWidth: 1080, margin: "0 auto", padding: "40px 24px 80px" };
const back = { display: "inline-block", marginBottom: 24, color: "#1f3a2b", textDecoration: "none", fontWeight: 700 };
const grid = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "start" };
const imageWrap = {
  position: "relative",
  aspectRatio: "1 / 1",
  borderRadius: 20,
  overflow: "hidden",
  background: "white",
  boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
};
const detailBadge = {
  position: "absolute", top: 18, left: 18, zIndex: 2, pointerEvents: "none",
  color: "white", fontWeight: 800, fontSize: 12, letterSpacing: 0.4,
  textTransform: "uppercase", padding: "6px 13px", borderRadius: 999,
  boxShadow: "0 2px 8px rgba(0,0,0,0.18)",
};
const imgPlaceholder = {
  width: "100%", height: "100%", display: "flex", alignItems: "center",
  justifyContent: "center", fontSize: 18, fontWeight: 700, color: "#8aa093",
  background: "#eef3ef",
};
const info = {};
const catTag = {
  display: "inline-block",
  background: "#e7efe9",
  color: "#1f3a2b",
  fontWeight: 700,
  fontSize: 12,
  padding: "5px 12px",
  borderRadius: 999,
  marginBottom: 14,
};
const title = { fontSize: "clamp(26px, 4vw, 38px)", fontWeight: 800, color: "#1f3a2b", margin: "0 0 12px", lineHeight: 1.15 };
const desc = { fontSize: 16, lineHeight: 1.75, color: "#4b6355", margin: "0 0 20px" };
const bullets = { listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 };
const bulletItem = { display: "flex", gap: 10, alignItems: "flex-start", fontSize: 15, color: "#33463a", fontWeight: 500 };
const check = { color: "#d8782f", fontWeight: 800, flexShrink: 0 };
const notifyBtn = {
  display: "inline-block", padding: "13px 24px", background: "#e7efe9", color: "#1f3a2b",
  borderRadius: 12, textDecoration: "none", fontWeight: 700,
};

const constructionBanner = {
  background: "#d8782f",
  color: "white",
  textAlign: "center",
  fontWeight: 700,
  fontSize: 15,
  padding: "12px 20px",
  letterSpacing: 0.2,
};
