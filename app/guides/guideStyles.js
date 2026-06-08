// Delte stilarter for guide-/FAQ-siderne. Følger sidens grøn/orange-palet og
// genbruger mønstret fra naturdannelse- og forside-FAQ'en.

export const sectionWhite = { background: "#ffffff", padding: "64px 24px" };
export const sectionGreen = { background: "#eef3ef", padding: "64px 24px" };
export const narrow = { maxWidth: 820, margin: "0 auto" };
export const wide = { maxWidth: 1080, margin: "0 auto" };

export const intro = { fontSize: 18, lineHeight: 1.8, color: "#4b6355", margin: 0 };

export const h2 = {
  fontSize: "clamp(23px, 3.2vw, 32px)",
  fontWeight: 800,
  color: "#1f3a2b",
  margin: "0 0 14px",
};
export const accent = { width: 52, height: 4, background: "#d8782f", borderRadius: 4, margin: "0 0 22px" };
export const bodyText = { fontSize: 17, lineHeight: 1.8, color: "#4b6355", margin: 0 };
export const bodySpace = { ...bodyText, marginTop: 16 };

export const checkList = {
  listStyle: "none",
  padding: 0,
  margin: "22px 0 0",
  display: "flex",
  flexDirection: "column",
  gap: 12,
};
export const checkItem = {
  display: "flex",
  alignItems: "flex-start",
  gap: 12,
  fontSize: 16.5,
  lineHeight: 1.6,
  color: "#33463a",
  fontWeight: 500,
};
export const check = { flexShrink: 0, color: "#d8782f", fontWeight: 800, fontSize: 18, lineHeight: 1.5 };

export const cardGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
  gap: 22,
};
export const infoCard = {
  background: "white",
  borderRadius: 18,
  padding: "24px 22px",
  boxShadow: "0 8px 28px rgba(0,0,0,0.07)",
};
export const cardAccent = { width: 32, height: 3, background: "#d8782f", borderRadius: 4, marginBottom: 14 };
export const cardTitle = { fontSize: 18, fontWeight: 700, color: "#1f3a2b", margin: "0 0 10px" };
export const cardText = { fontSize: 14.5, lineHeight: 1.7, color: "#4b6355", margin: 0 };
export const cardLink = { color: "#c2611d", fontWeight: 700, textDecoration: "none" };

// FAQ (matcher forsidens look)
export const faqSection = { background: "#f5f7f6", padding: "64px 24px" };
export const faqInner = { maxWidth: 820, margin: "0 auto" };
export const faqHeading = {
  fontSize: "clamp(23px, 4vw, 34px)",
  fontWeight: 800,
  color: "#1f3a2b",
  textAlign: "center",
  margin: "0 0 30px",
};
export const faqGrid = { display: "flex", flexDirection: "column", gap: 12 };
export const faqCard = {
  background: "white",
  borderRadius: 12,
  padding: "18px 22px",
  boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
};
export const faqQuestion = {
  fontWeight: 700,
  fontSize: 17,
  color: "#1f3a2b",
  cursor: "pointer",
  listStyle: "none",
};
export const faqAnswer = { margin: "12px 0 0", lineHeight: 1.65, color: "#3a4a40" };

// CTA (orange)
export const ctaSection = { background: "#d8782f", padding: "64px 24px" };
export const ctaInner = { maxWidth: 680, margin: "0 auto", textAlign: "center", color: "white" };
export const ctaTitle = { fontSize: "clamp(23px, 4vw, 36px)", fontWeight: 800, margin: "0 0 14px", lineHeight: 1.15 };
export const ctaText = { fontSize: 17.5, lineHeight: 1.7, opacity: 0.92, margin: "0 0 28px" };
export const ctaButtons = { display: "flex", justifyContent: "center", gap: 14, flexWrap: "wrap" };
export const ctaPrimary = {
  background: "white",
  color: "#c2611d",
  textDecoration: "none",
  padding: "14px 28px",
  borderRadius: 12,
  fontWeight: 700,
  fontSize: 16,
};
export const ctaSecondary = {
  background: "transparent",
  color: "white",
  textDecoration: "none",
  padding: "14px 28px",
  borderRadius: 12,
  fontWeight: 700,
  fontSize: 16,
  border: "2px solid rgba(255,255,255,0.6)",
};

// Inline-link i brødtekst
export const inlineLink = { color: "#c2611d", fontWeight: 700, textDecoration: "none" };
