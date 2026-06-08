import { graph, breadcrumbLd, jsonLdScript } from "@/lib/jsonld";
import * as s from "./guideStyles";

export const metadata = {
  title: "Guides til træklatring",
  description:
    "Guides og gode råd om træklatring fra Træklatreskolen — kom i gang som begynder, og find det rette klatreudstyr.",
  alternates: { canonical: "/guides" },
  openGraph: {
    title: "Guides til træklatring | Træklatreskolen",
    description:
      "Kom i gang med træklatring, og vælg det rette udstyr. Guides fra Træklatreskolen.",
    url: "/guides",
    images: [{ url: "/og/forside.png", width: 1200, height: 630, alt: "Guides til træklatring — Træklatreskolen" }],
  },
};

const guides = [
  {
    title: "Kom i gang med træklatring",
    text: "Hvad det er, om det er sikkert, og hvordan du tager de første skridt op i trækronerne — trin for trin.",
    href: "/guides/kom-i-gang-med-traeklatring",
  },
  {
    title: "Klatreudstyr til træklatring",
    text: "Reb, sele, hjelm, karabiner og rebbremse — hvad det bruges til, og hvad du med fordel starter med.",
    href: "/guides/klatreudstyr-til-traeklatring",
  },
];

const jsonLd = graph(
  breadcrumbLd([
    { name: "Forside", path: "/" },
    { name: "Guides", path: "/guides" },
  ])
);

export default function GuidesIndex() {
  return (
    <>
      <script {...jsonLdScript(jsonLd)} />
      <main>
        <section className="page-hero" style={{ backgroundImage: "url('/images/hero-forest.jpg')" }}>
          <div className="page-hero-overlay">
            <div className="page-hero-inner">
              <p className="page-hero-eyebrow">Guides</p>
              <h1 className="page-hero-title">Guides til træklatring</h1>
              <p className="page-hero-text" style={{ maxWidth: 680 }}>
                Gode råd og overblik — uanset om du er helt ny eller skal vælge udstyr.
              </p>
            </div>
          </div>
        </section>

        <section style={s.sectionWhite}>
          <div style={s.wide}>
            <div style={s.cardGrid}>
              {guides.map((g) => (
                <a key={g.href} href={g.href} style={{ ...s.infoCard, textDecoration: "none", display: "block" }}>
                  <div style={s.cardAccent} />
                  <h2 style={s.cardTitle}>{g.title}</h2>
                  <p style={s.cardText}>{g.text}</p>
                  <p style={{ margin: "14px 0 0" }}>
                    <span style={s.cardLink}>Læs guiden →</span>
                  </p>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section style={s.ctaSection}>
          <div style={s.ctaInner}>
            <h2 style={s.ctaTitle}>Klar til at komme op i trækronerne?</h2>
            <p style={s.ctaText}>
              Meld dig til et kursus, book en oplevelse, eller find dit udstyr i shoppen.
            </p>
            <div style={s.ctaButtons}>
              <a href="/kurser" style={s.ctaPrimary}>Se kurser</a>
              <a href="/shop" style={s.ctaSecondary}>Gå til shoppen</a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
