import { calendarItems } from "@/lib/siteData";

export default function KursuskalenderPage() {
  return (
    <main style={page}>
      <div style={hero}>
        <h1 style={h1}>Kursuskalender</h1>
        <p style={lead}>
          Her finder du kommende kurser og oplevelser. Du kan både læse mere og
          gå direkte til booking.
        </p>
      </div>

      <section style={tableWrap}>
        <div style={tableHeaderRow}>
          <div style={th}>Dato</div>
          <div style={th}>Aktivitet</div>
          <div style={th}>Type</div>
          <div style={th}>Sted</div>
          <div style={th}>Status</div>
          <div style={th}>Handling</div>
        </div>

        {calendarItems.map((item) => (
          <div key={item.id} style={row}>
            <div style={td}>{item.date}</div>
            <div style={{ ...td, fontWeight: 700, color: "#1f3a2b" }}>{item.title}</div>
            <div style={td}>
              <span
                style={{
                  ...pill,
                  background: item.type === "Kursus" ? "#e7efe9" : "#f5e5d8",
                  color: item.type === "Kursus" ? "#1f3a2b" : "#a3521d",
                }}
              >
                {item.type}
              </span>
            </div>
            <div style={td}>{item.place}</div>
            <div style={td}>
              <span style={statusPill(item.status)}>{item.status}</span>
            </div>
            <div style={td}>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <a href={item.href} style={secondaryButton}>Læs mere</a>
                <a href={item.bookingHref} style={primaryButton}>Tilmeld</a>
              </div>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}

function statusPill(status) {
  let background = "#f7eddc";
  let color = "#7a4d08";

  if (status.toLowerCase().includes("få pladser")) {
    background = "#fbe4e2";
    color = "#9a2f27";
  }

  if (status.toLowerCase().includes("åben")) {
    background = "#dff3e5";
    color = "#165c2c";
  }

  if (status.toLowerCase().includes("ledige")) {
    background = "#e7efe9";
    color = "#1f3a2b";
  }

  return {
    display: "inline-block",
    padding: "6px 10px",
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 700,
    background,
    color,
  };
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

const tableWrap = {
  background: "white",
  borderRadius: 18,
  overflow: "hidden",
  boxShadow: "0 8px 28px rgba(0,0,0,0.08)",
};

const tableHeaderRow = {
  display: "grid",
  gridTemplateColumns: "1fr 1.5fr 0.8fr 1fr 1fr 1.2fr",
  gap: 12,
  padding: "16px 18px",
  background: "#eef4ef",
};

const row = {
  display: "grid",
  gridTemplateColumns: "1fr 1.5fr 0.8fr 1fr 1fr 1.2fr",
  gap: 12,
  padding: "16px 18px",
  borderTop: "1px solid #edf2ee",
  alignItems: "center",
};

const th = {
  fontSize: 13,
  fontWeight: 700,
  color: "#486051",
  textTransform: "uppercase",
};

const td = {
  color: "#33463a",
  fontSize: 15,
};

const pill = {
  display: "inline-block",
  padding: "6px 10px",
  borderRadius: 999,
  fontSize: 12,
  fontWeight: 700,
};

const primaryButton = {
  display: "inline-block",
  padding: "10px 14px",
  background: "#d8782f",
  color: "white",
  borderRadius: 10,
  textDecoration: "none",
  fontWeight: 700,
};

const secondaryButton = {
  display: "inline-block",
  padding: "10px 14px",
  background: "#e7efe9",
  color: "#1f3a2b",
  borderRadius: 10,
  textDecoration: "none",
  fontWeight: 700,
};