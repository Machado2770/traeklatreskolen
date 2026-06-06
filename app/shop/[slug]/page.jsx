import Image from "next/image";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/getProducts";
import { SHIPPING } from "@/lib/shopData";
import { formatPrice } from "@/lib/format";
import AddToCart from "@/app/components/AddToCart";

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

  const inStock = p.stock == null || p.stock > 0;

  return (
    <main>
      <div style={pageInner}>
        <a href="/shop" style={back}>← Tilbage til shop</a>

        <div style={grid} className="shop-detail-grid">
          <div style={imageWrap}>
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
            <p style={price}>{formatPrice(p.price)}</p>

            <p style={stockLine(inStock)}>
              {inStock ? "✓ På lager" : "Udsolgt"}
            </p>

            {p.description && <p style={desc}>{p.description}</p>}

            {p.bullets?.length > 0 && (
              <ul style={bullets}>
                {p.bullets.map((b) => (
                  <li key={b} style={bulletItem}><span style={check}>✓</span>{b}</li>
                ))}
              </ul>
            )}

            <div style={{ marginTop: 26 }}>
              {inStock ? (
                <AddToCart product={p} withQty />
              ) : (
                <a href="/kontakt" style={notifyBtn}>Skriv til os om varen</a>
              )}
            </div>

            <p style={shippingNote}>
              Fragt {formatPrice(SHIPPING.flatRate)} — fri fragt over {formatPrice(SHIPPING.freeOver)}.
              Betaling sker sikkert med kort via Stripe — eller på fremsendt faktura
              (også elektronisk via EAN), som vælges i kurven.
            </p>
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
const imgPlaceholder = {
  width: "100%", height: "100%", display: "flex", alignItems: "center",
  justifyContent: "center", fontSize: 18, fontWeight: 700, color: "#b9a98c",
  background: "#faf3e8",
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
const price = { fontSize: 26, fontWeight: 800, color: "#d8782f", margin: "0 0 8px" };
const stockLine = (inStock) => ({
  margin: "0 0 20px",
  fontWeight: 700,
  color: inStock ? "#216344" : "#a3521d",
});
const desc = { fontSize: 16, lineHeight: 1.75, color: "#4b6355", margin: "0 0 20px" };
const bullets = { listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 };
const bulletItem = { display: "flex", gap: 10, alignItems: "flex-start", fontSize: 15, color: "#33463a", fontWeight: 500 };
const check = { color: "#d8782f", fontWeight: 800, flexShrink: 0 };
const notifyBtn = {
  display: "inline-block", padding: "13px 24px", background: "#e7efe9", color: "#1f3a2b",
  borderRadius: 12, textDecoration: "none", fontWeight: 700,
};
const shippingNote = { marginTop: 22, fontSize: 14, color: "#6c7f73", lineHeight: 1.6 };
