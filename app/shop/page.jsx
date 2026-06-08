import Image from "next/image";
import { getProducts } from "@/lib/getProducts";
import { CATEGORIES, productBadge, BADGE_COLORS } from "@/lib/shopData";
import { formatPrice } from "@/lib/format";
import QuickAdd from "@/app/components/QuickAdd";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Shop — klatre- og friluftsudstyr",
  description:
    "Køb kvalificeret klatre- og friluftsudstyr hos Træklatreskolen — reb, seler, hjelme, karabiner, klatrepakker og lavvuer. Vi bruger selv udstyret i undervisningen, og vejledning følger med.",
  alternates: { canonical: "/shop" },
  openGraph: {
    title: "Shop — klatre- og friluftsudstyr | Træklatreskolen",
    description:
      "Udstyr vi selv underviser med — kvalificeret udstyr og vejledning følger med købet.",
    url: "/shop",
    images: [{ url: "/og/forside.png", width: 1200, height: 630, alt: "Shop — Træklatreskolen" }],
  },
};

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
            <h1 className="page-hero-title">Udstyr vi selv klatrer med</h1>
            <p className="page-hero-text">
              Kvalificeret udstyr — og kvalificeret vejledning med i købet.
            </p>
          </div>
        </div>
      </section>

      {/* Intro: shoppen udspringer af undervisningen */}
      <section style={conceptSection}>
        <div style={conceptInner}>
          <h2 style={conceptTitle}>Velkommen i shoppen</h2>
          <p style={conceptText}>
            Her finder du det udstyr, vi selv bruger, når vi underviser i trækronerne — fra reb og
            seler til lavvuer og bålgrej. Du handler direkte med instruktørerne bag Træklatreskolen,
            og kvalificeret vejledning følger altid med købet. Betal med kort eller på fremsendt
            faktura — også elektronisk (EAN) for skoler, organisationer og foreninger.
          </p>
          <div style={conceptPoints}>
            <div style={point}>
              <strong style={pointTitle}>Gennemprøvet i undervisningen</strong>
              <span style={pointText}>
                Hver eneste vare har bevist sit værd i trækronerne — uge efter uge, hold efter hold.
              </span>
            </div>
            <div style={point}>
              <strong style={pointTitle}>Uddannelse i brugen</strong>
              <span style={pointText}>
                Kombinér dit køb med et <a href="/kurser" style={pointLink}>kursus</a>, så teknikken
                sidder, før grejet skal bære dig.
              </span>
            </div>
            <div style={point}>
              <strong style={pointTitle}>Personlig vejledning</strong>
              <span style={pointText}>
                I tvivl om størrelse eller sammensætning?{" "}
                <a href="/kontakt" style={pointLink}>Skriv til os</a> — du får svar fra en
                underviser, ikke en sælger.
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
                  <a key={g.category} href={`#${catId(g.category)}`} style={catChip} className="shop-chip">
                    {g.category}
                    <span style={catChipCount} className="shop-chip-count"> · {g.items.length}</span>
                  </a>
                ))}
              </nav>

              {groups.map((g) => (
                <div key={g.category} id={catId(g.category)} style={catSection}>
                  <h2 style={catTitle}>{g.category}</h2>
                  <div style={grid}>
                    {g.items.map((p) => {
                      const badge = productBadge(p);
                      return (
                      <div key={p.slug} id={p.slug} style={card} className="shop-card">
                        {/* Ét stort link over hele kortet — hurtig-køb ligger ovenpå (zIndex) */}
                        <a href={`/shop/${p.slug}`} style={stretchedLink} aria-label={p.name}></a>
                        {badge && (
                          <span style={{ ...badgeStyle, background: BADGE_COLORS[badge] || "#d8782f" }}>
                            {badge}
                          </span>
                        )}
                        <div style={imageWrap} className="shop-card-img">
                          {p.image ? (
                            <Image src={p.image} alt={p.name} fill style={{ objectFit: "contain" }}
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
                          ) : (
                            <div style={imgPlaceholder}>Foto på vej</div>
                          )}
                        </div>
                        <div style={body}>
                          <h3 style={name}>{p.name}</h3>
                          <p style={short}>{p.short}</p>
                          <div style={priceRow}>
                            <span style={price}>{formatPrice(p.price)}</span>
                            <span style={cta}>
                              Se vare <span className="shop-cta-arrow">→</span>
                            </span>
                          </div>
                          <QuickAdd product={{
                            slug: p.slug, name: p.name, price: p.price,
                            image: p.image, sizes: p.sizes ?? [],
                          }} />
                        </div>
                      </div>
                      );
                    })}
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

const conceptSection = {
  background: "linear-gradient(180deg, #ffffff 0%, #eef3ef 100%)",
  padding: "64px 24px",
};
const conceptInner = { maxWidth: 960, margin: "0 auto", textAlign: "center" };
const conceptTitle = { fontSize: "clamp(24px, 3.4vw, 32px)", fontWeight: 800, color: "#1f3a2b", margin: "0 0 16px" };
const conceptText = { fontSize: 17, lineHeight: 1.75, color: "#4b6355", margin: "0 auto 36px", maxWidth: 780 };
const conceptPoints = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
  gap: 22,
  textAlign: "left",
};
const point = {
  display: "flex",
  flexDirection: "column",
  gap: 8,
  background: "white",
  borderRadius: 16,
  padding: "22px 24px",
  borderTop: "4px solid #d8782f",
  boxShadow: "0 6px 22px rgba(0,0,0,0.08)",
};
const pointTitle = { color: "#1f3a2b", fontSize: 16.5 };
const pointText = { color: "#4b6355", fontSize: 14.5, lineHeight: 1.65 };
const pointLink = { color: "#c2611d", fontWeight: 700 };

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
  boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
};
const catChipCount = { color: "#c2611d", fontWeight: 700 };
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
  position: "relative",
  display: "flex",
  flexDirection: "column",
  background: "white",
  borderRadius: 18,
  overflow: "hidden",
  boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
  textDecoration: "none",
  scrollMarginTop: 100, // anker-landing fra "Tilbage til shoppen"
};
const stretchedLink = { position: "absolute", inset: 0, zIndex: 1 };
const badgeStyle = {
  position: "absolute",
  top: 22,
  left: 22,
  zIndex: 2,
  pointerEvents: "none",
  color: "white",
  fontWeight: 800,
  fontSize: 11,
  letterSpacing: 0.4,
  textTransform: "uppercase",
  padding: "5px 11px",
  borderRadius: 999,
  boxShadow: "0 2px 8px rgba(0,0,0,0.18)",
};
const imageWrap = {
  position: "relative",
  height: 210,
  background: "white",
  margin: "14px 14px 0",
  borderRadius: 12,
  overflow: "hidden",
};
const imgPlaceholder = {
  width: "100%", height: "100%", display: "flex", alignItems: "center",
  justifyContent: "center", fontSize: 15, fontWeight: 700, color: "#8aa093",
  background: "#eef3ef", borderRadius: 12,
};
const body = { padding: "18px 22px 22px", display: "flex", flexDirection: "column", flex: 1 };
const name = { margin: "0 0 8px", color: "#1f3a2b", fontSize: 18, fontWeight: 700 };
const short = { margin: "0 0 auto", color: "#4b6355", lineHeight: 1.55, fontSize: 14.5, paddingBottom: 16 };
const priceRow = { display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto" };
const price = { fontWeight: 800, color: "#c2611d", fontSize: 18 };
const cta = { color: "#d8782f", fontWeight: 700, fontSize: 13.5 };
