import Image from "next/image";
import { getProducts } from "@/lib/getProducts";
import { CATEGORIES } from "@/lib/shopData";
import { formatPrice } from "@/lib/format";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Shop — klatre- og friluftsudstyr",
  description:
    "Køb kvalificeret klatre- og friluftsudstyr hos Træklatreskolen — reb, seler, hjelme, karabiner, klatrepakker og lavvuer. Vi bruger selv udstyret i undervisningen, og vejledning følger med.",
  alternates: { canonical: "/shop" },
  openGraph: {
    title: "Shop — klatre- og friluftsudstyr | Træklatreskolen",
    description:
      "Udstyr vi selv underviser med — kvalificeret udstyr og vejledning, ikke bare en webshop.",
    url: "/shop",
    images: [{ url: "/og/forside.png", width: 1200, height: 630, alt: "Shop — Træklatreskolen" }],
  },
};

// Pladsholder-ikon for varer uden billede, valgt efter kategori.
function placeholderIcon(category) {
  if (category?.startsWith("Bål")) return "🔥";
  if (category?.startsWith("Telte")) return "⛺";
  return "🧗";
}

// Anker-id ud fra kategorinavn ("Reb & liner" -> "reb-liner").
function catId(category) {
  return category
    .toLowerCase()
    .replace(/æ/g, "ae").replace(/ø/g, "oe").replace(/å/g, "aa")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export default async function ShopPage() {
  const products = await getProducts();

  // Gruppér efter kategori i fast rækkefølge; ukendte kategorier til sidst.
  const known = CATEGORIES.filter((c) => products.some((p) => p.category === c));
  const extra = [...new Set(products.map((p) => p.category).filter(Boolean))].filter(
    (c) => !CATEGORIES.includes(c)
  );
  const uncategorized = products.filter((p) => !p.category);
  const groups = [...known, ...extra].map((c) => ({
    category: c,
    items: products.filter((p) => p.category === c),
  }));
  if (uncategorized.length) groups.push({ category: "Øvrigt", items: uncategorized });

  return (
    <main>
      <section className="page-hero" style={{ backgroundImage: "url('/images/hero-forest.jpg')" }}>
        <div className="page-hero-overlay">
          <div className="page-hero-inner">
            <p className="page-hero-eyebrow">Shop</p>
            <h1 className="page-hero-title">Udstyr vi selv underviser med</h1>
            <p className="page-hero-text">
              Kvalificeret udstyr og kvalificeret vejledning — ikke bare en webshop.
            </p>
          </div>
        </div>
      </section>

      {/* Koncept: shoppen udspringer af undervisningen */}
      <section style={conceptSection}>
        <div style={conceptInner}>
          <h2 style={conceptTitle}>Ikke en almindelig webshop</h2>
          <p style={conceptText}>
            Alt udstyr i shoppen er udstyr, vi selv bruger i undervisningen. Det betyder, at hver
            eneste vare er valgt, fordi den har bevist sit værd i trækronerne — uge efter uge, hold
            efter hold. Og det betyder, at du ikke handler alene: med købet følger kvalificeret
            vejledning, og vi uddanner dig gerne i brugen af udstyret. Organisationer, skoler og
            foreninger kan betale på fremsendt faktura — også elektronisk (EAN).
          </p>
          <div style={conceptPoints}>
            <div style={point}>
              <span style={pointIcon}>🧗</span>
              <strong style={pointTitle}>Gennemprøvet i undervisningen</strong>
              <span style={pointText}>Vi sælger kun udstyr, vi selv klatrer og underviser med.</span>
            </div>
            <div style={point}>
              <span style={pointIcon}>🎓</span>
              <strong style={pointTitle}>Uddannelse i brugen</strong>
              <span style={pointText}>
                Kombiner dit køb med et <a href="/kurser" style={pointLink}>kursus</a> — så sidder
                teknikken, før grejet skal bære dig.
              </span>
            </div>
            <div style={point}>
              <span style={pointIcon}>💬</span>
              <strong style={pointTitle}>Vejledning med i købet</strong>
              <span style={pointText}>
                I tvivl om størrelse, reb eller sammensætning?{" "}
                <a href="/kontakt" style={pointLink}>Skriv til os</a> — vi svarer som undervisere,
                ikke som sælgere.
              </span>
            </div>
          </div>
        </div>
      </section>

      <section style={section}>
        <div style={container}>
          {groups.length === 0 ? (
            <p style={{ textAlign: "center", color: "#4b6355" }}>Der er ingen varer i shoppen lige nu.</p>
          ) : (
            <>
              {/* Kategori-navigation */}
              <nav style={catNav} aria-label="Kategorier">
                {groups.map((g) => (
                  <a key={g.category} href={`#${catId(g.category)}`} style={catChip}>
                    {g.category}
                  </a>
                ))}
              </nav>

              {groups.map((g) => (
                <div key={g.category} id={catId(g.category)} style={catSection}>
                  <h2 style={catTitle}>{g.category}</h2>
                  <div style={grid}>
                    {g.items.map((p) => (
                      <a key={p.slug} href={`/shop/${p.slug}`} style={card} className="feature-card">
                        <div style={imageWrap}>
                          {p.image ? (
                            <Image src={p.image} alt={p.name} fill style={{ objectFit: "contain" }}
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
                          ) : (
                            <div style={imgPlaceholder}>{placeholderIcon(p.category)}</div>
                          )}
                        </div>
                        <div style={body}>
                          <h3 style={name}>{p.name}</h3>
                          <p style={short}>{p.short}</p>
                          <div style={priceRow}>
                            <span style={price}>{formatPrice(p.price)}</span>
                            <span style={cta}>Se vare →</span>
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </section>
    </main>
  );
}

const conceptSection = { background: "white", padding: "64px 24px" };
const conceptInner = { maxWidth: 900, margin: "0 auto", textAlign: "center" };
const conceptTitle = { fontSize: "clamp(24px, 3.4vw, 32px)", fontWeight: 800, color: "#1f3a2b", margin: "0 0 16px" };
const conceptText = { fontSize: 17, lineHeight: 1.75, color: "#4b6355", margin: "0 auto 36px", maxWidth: 760 };
const conceptPoints = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: 24,
  textAlign: "left",
};
const point = { display: "flex", flexDirection: "column", gap: 6, background: "#eef3ef", borderRadius: 16, padding: "20px 22px" };
const pointIcon = { fontSize: 26 };
const pointTitle = { color: "#1f3a2b", fontSize: 16 };
const pointText = { color: "#4b6355", fontSize: 14.5, lineHeight: 1.6 };
const pointLink = { color: "#d8782f", fontWeight: 700 };

const section = { background: "#eef3ef", padding: "56px 24px 88px" };
const container = { maxWidth: 1180, margin: "0 auto" };

const catNav = {
  display: "flex",
  flexWrap: "wrap",
  gap: 10,
  justifyContent: "center",
  marginBottom: 24,
};
const catChip = {
  background: "white",
  color: "#1f3a2b",
  fontWeight: 700,
  fontSize: 14,
  padding: "9px 16px",
  borderRadius: 999,
  textDecoration: "none",
  boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
};
const catSection = { paddingTop: 36, scrollMarginTop: 90 };
const catTitle = {
  fontSize: "clamp(22px, 3vw, 28px)",
  fontWeight: 800,
  color: "#1f3a2b",
  margin: "0 0 20px",
  borderBottom: "3px solid #d8782f",
  display: "inline-block",
  paddingBottom: 6,
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
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
const imageWrap = { position: "relative", height: 210, background: "white", margin: "14px 14px 0", borderRadius: 12 };
const imgPlaceholder = {
  width: "100%", height: "100%", display: "flex", alignItems: "center",
  justifyContent: "center", fontSize: 48, background: "#dce8e0", borderRadius: 12,
};
const body = { padding: "18px 22px 22px", display: "flex", flexDirection: "column", flex: 1 };
const name = { margin: "0 0 8px", color: "#1f3a2b", fontSize: 18, fontWeight: 700 };
const short = { margin: "0 0 auto", color: "#4b6355", lineHeight: 1.55, fontSize: 14.5, paddingBottom: 16 };
const priceRow = { display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto" };
const price = { fontWeight: 800, color: "#1f3a2b", fontSize: 18 };
const cta = { color: "#d8782f", fontWeight: 700, fontSize: 13.5 };
