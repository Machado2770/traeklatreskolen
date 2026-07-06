// "Beviser"-stribe (variant C) — en slank credential-ribbon med sitets
// kvaliteter. Line-ikoner i samme stil som forsidens friluft-bånd.
// Genbrugelig: læg <ProofStrip /> på en lys baggrund, fx under et mørkt bånd.

const ICON = {
  stroke: "#d8782f",
  strokeWidth: 1.7,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  fill: "none",
};

function Ico({ children }) {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" {...ICON} aria-hidden="true" style={{ flexShrink: 0 }}>
      {children}
    </svg>
  );
}

const ITEMS = [
  { label: "5 dages instruktørmodul", icon: (<><path d="M12 3l4.6 7.4H14l3.4 5.6H6.6L10 10.4H7.4z" /><path d="M12 16v4.5" /></>) },
  { label: "Efter Dansk Træklatreforenings norm", icon: (<><circle cx="12" cy="12" r="8.5" /><path d="M8 12.4l2.6 2.6 5.2-5.6" /></>) },
  { label: "Små hold — max 12 deltagere", icon: (<><circle cx="9" cy="8" r="3" /><path d="M3.2 20c0-3.2 2.6-5.8 5.8-5.8s5.8 2.6 5.8 5.8" /><path d="M16 5.6a3 3 0 010 5.7" /><path d="M15.2 14.3c2.7.5 4.8 2.9 4.8 5.7" /></>) },
  { label: "Kurser i hele Danmark", icon: (<><path d="M12 21s6.8-5.4 6.8-10.8A6.8 6.8 0 105.2 10.2C5.2 15.6 12 21 12 21z" /><circle cx="12" cy="10" r="2.4" /></>) },
];

export default function ProofStrip() {
  return (
    <section style={strip} aria-label="Kvaliteter">
      <div style={inner}>
        {ITEMS.map((it, i) => (
          <span key={it.label} style={{ display: "contents" }}>
            {i > 0 && <span style={dot} aria-hidden="true" />}
            <span style={item}><Ico>{it.icon}</Ico>{it.label}</span>
          </span>
        ))}
      </div>
    </section>
  );
}

const strip = { background: "#ffffff", borderBottom: "1px solid #e7ece8" };
const inner = {
  maxWidth: 1100,
  margin: "0 auto",
  padding: "14px 24px",
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  justifyContent: "center",
  gap: "10px 18px",
};
const item = { display: "inline-flex", alignItems: "center", gap: 8, fontSize: 14, fontWeight: 600, color: "#1f3a2b" };
const dot  = { width: 5, height: 5, borderRadius: "50%", background: "#d8782f", opacity: 0.7 };
