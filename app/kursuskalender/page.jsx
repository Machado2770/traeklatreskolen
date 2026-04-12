import { calendarItems } from "@/lib/siteData";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

export const dynamic = "force-dynamic";

export default async function KursuskalenderPage() {
  // Hent antal tilmeldinger (ikke annullerede) fra Supabase
  const countMap = {};
  try {
    const supabase = getSupabaseAdmin();
    const { data: participants } = await supabase
      .from("participants")
      .select("course, payment_status")
      .neq("payment_status", "cancelled");

    for (const p of participants ?? []) {
      const key = p.course ?? "";
      countMap[key] = (countMap[key] ?? 0) + 1;
    }
  } catch {
    // Env-variabler mangler lokalt — vis bare tomme tæller-værdier
  }

  return (
    <main style={page}>
      <div style={hero}>
        <h1 style={h1}>Kursuskalender</h1>
        <p style={lead}>
          Her finder du kommende kurser og oplevelser. Tilmeld dig direkte —
          du modtager en bekræftelse med faktura.
        </p>
      </div>

      <section style={tableWrap}>
        <div style={tableHeaderRow}>
          <div style={th}>Dato</div>
          <div style={th}>Aktivitet</div>
          <div style={th}>Type</div>
          <div style={th}>Sted</div>
          <div style={th}>Pladser</div>
          <div style={th}>Handling</div>
        </div>

        {calendarItems.map((item) => {
          const courseKey = `${item.title} – ${item.date} – ${item.place}`;
          const taken = countMap[courseKey] ?? 0;
          const max = item.maxParticipants ?? null;
          const isFull = max !== null && taken >= max;
          const available = max !== null ? max - taken : null;

          return (
            <div key={item.id} style={row}>
              <div style={td}>{item.date}</div>
              <div style={{ ...td, fontWeight: 700, color: "#1f3a2b" }}>
                {item.title}
              </div>
              <div style={td}>
                <span style={{
                  ...pill,
                  background: item.type === "Kursus" ? "#e7efe9" : "#f5e5d8",
                  color: item.type === "Kursus" ? "#1f3a2b" : "#a3521d",
                }}>
                  {item.type}
                </span>
              </div>
              <div style={td}>{item.place}</div>
              <div style={td}>
                {max !== null ? (
                  <span style={spotsStyle(isFull, available, max)}>
                    {isFull ? "Fuldt" : `${available}/${max}`}
                  </span>
                ) : (
                  <span style={{ color: "#4b6355", fontSize: 14 }}>—</span>
                )}
              </div>
              <div style={td}>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <a href={item.href} style={secondaryButton}>Læs mere</a>
                  {isFull ? (
                    <span style={fullButton}>Fuldt booket</span>
                  ) : (
                    <a href={item.bookingHref} style={primaryButton}>Tilmeld</a>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* BETINGELSER */}
      <section style={termsSection}>
        <h2 style={termsTitle}>Betingelser</h2>
        <div style={termsGrid}>
          <div style={termsBlock}>
            <div style={termsHeading}>Tilmelding og betaling</div>
            <p style={termsText}>
              Ved tilmelding sendes en faktura som bekræftelse på din plads.
              Pladsen er reserveret, når betalingen er modtaget.
              Referencen på betalingen skal være dit navn og kursusnavn.
            </p>
          </div>
          <div style={termsBlock}>
            <div style={termsHeading}>Aflysning fra Træklatreskolen</div>
            <p style={termsText}>
              Træklatreskolen forbeholder sig retten til at aflyse et
              arrangement med kort varsel, hvis det vurderes at det ikke kan
              gennemføres tilfredsstillende — hensyn til sikkerhed og vejr.
              Indbetalte beløb refunderes fuldt ud ved aflysning fra vores side.
            </p>
          </div>
          <div style={termsBlock}>
            <div style={termsHeading}>Aflysning fra deltagere</div>
            <p style={termsText}>
              Afmelding <strong>senest 14 hverdage</strong> før arrangementet:
              det indbetalte beløb tilbagebetales fratrukket et
              reservationsgebyr på <strong>20 %</strong>.
              Afmelding <strong>efter 14 hverdage</strong>: ingen tilbagebetaling.
            </p>
          </div>
          <div style={termsBlock}>
            <div style={termsHeading}>Forbehold</div>
            <p style={termsText}>
              Træklatreskolen forbeholder sig retten til at afvise deltagere,
              der er under indflydelse af alkohol eller på anden måde udgør
              en sikkerhedsrisiko for sig selv eller andre.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

function spotsStyle(isFull, available, max) {
  let bg = "#e7efe9";
  let color = "#1f3a2b";

  if (isFull) {
    bg = "#fbe4e2";
    color = "#9a2f27";
  } else if (available <= Math.ceil(max * 0.25)) {
    // Under 25% pladser tilbage = orange advarsel
    bg = "#f5e5d8";
    color = "#a3521d";
  }

  return {
    display: "inline-block",
    padding: "6px 12px",
    borderRadius: 999,
    fontSize: 13,
    fontWeight: 700,
    background: bg,
    color,
  };
}

/* STYLES */
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
  gridTemplateColumns: "1fr 1.8fr 0.8fr 1fr 0.8fr 1.2fr",
  gap: 12,
  padding: "16px 18px",
  background: "#eef4ef",
};

const row = {
  display: "grid",
  gridTemplateColumns: "1fr 1.8fr 0.8fr 1fr 0.8fr 1.2fr",
  gap: 12,
  padding: "16px 18px",
  borderTop: "1px solid #edf2ee",
  alignItems: "center",
};

const th = {
  fontSize: 12,
  fontWeight: 700,
  color: "#486051",
  textTransform: "uppercase",
  letterSpacing: 0.8,
};

const td = {
  color: "#33463a",
  fontSize: 15,
};

const pill = {
  display: "inline-block",
  padding: "5px 10px",
  borderRadius: 999,
  fontSize: 12,
  fontWeight: 700,
};

const primaryButton = {
  display: "inline-block",
  padding: "9px 14px",
  background: "#d8782f",
  color: "white",
  borderRadius: 10,
  textDecoration: "none",
  fontWeight: 700,
  fontSize: 13,
};

const secondaryButton = {
  display: "inline-block",
  padding: "9px 14px",
  background: "#e7efe9",
  color: "#1f3a2b",
  borderRadius: 10,
  textDecoration: "none",
  fontWeight: 700,
  fontSize: 13,
};

const fullButton = {
  display: "inline-block",
  padding: "9px 14px",
  background: "#f0f0f0",
  color: "#999",
  borderRadius: 10,
  fontWeight: 700,
  fontSize: 13,
  cursor: "not-allowed",
};

/* Terms */
const termsSection = {
  marginTop: 56,
  background: "white",
  borderRadius: 18,
  padding: "36px 32px",
  boxShadow: "0 4px 18px rgba(0,0,0,0.06)",
};

const termsTitle = {
  color: "#1f3a2b",
  fontSize: 26,
  fontWeight: 800,
  margin: "0 0 24px",
};

const termsGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
  gap: 24,
};

const termsBlock = {
  borderLeft: "3px solid #d8782f",
  paddingLeft: 16,
};

const termsHeading = {
  fontWeight: 700,
  color: "#1f3a2b",
  fontSize: 15,
  marginBottom: 8,
};

const termsText = {
  color: "#4b6355",
  fontSize: 14,
  lineHeight: 1.7,
  margin: 0,
};
