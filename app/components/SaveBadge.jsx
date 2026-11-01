// Mærke der fremhæver besparelsen ved at tage det samlede instruktørforløb.
// Vises kun ved kursus-slug'et "instruktorforlob" (eller hvis show=true).
export const SAVE_TEXT = "Spar 1.000,- kr. ved samlet forløb";

export default function SaveBadge({ slug, show = false, style }) {
  if (!show && slug !== "instruktorforlob") return null;
  return (
    <span style={{ ...badge, ...style }}>
      {SAVE_TEXT}
    </span>
  );
}

const badge = {
  display: "inline-block",
  background: "#d8782f",
  color: "#ffffff",
  padding: "6px 12px",
  borderRadius: 999,
  fontSize: 12,
  fontWeight: 800,
  letterSpacing: 0.2,
  whiteSpace: "nowrap",
};
