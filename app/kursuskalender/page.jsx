import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

export const dynamic = "force-dynamic";

async function getCalendarItems() {
  try {
    const supabase = getSupabaseAdmin();

    const { data, error } = await supabase
      .from("calendar_items")
      .select("*")
      .order("date", { ascending: true });

    if (error) {
      console.error("[kursuskalender] Supabase error:", error.message);
      return [];
    }

    return (data || []).map(item => ({
      id:              item.id,
      date:            item.date,
      title:           item.title,
      place:           item.place,
      type:            item.type,
      price:           item.price || "",
      href:            item.href || "",
      bookingHref:     item.booking_href || `/booking?course=${encodeURIComponent(item.title)}&date=${encodeURIComponent(item.date)}&place=${encodeURIComponent(item.place)}`,
      maxParticipants: item.max_participants,
    }));
  } catch (e) {
    console.error("[kursuskalender] Fetch exception:", e?.message ?? e);
    return [];
  }
}

export default async function KursuskalenderPage() {
  const items    = await getCalendarItems();
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
  } catch { /* tom countMap som fallback */ }

  return (
    <main>
      {/* Hero — fuld bredde */}
      <section className="page-hero" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1800&q=80')" }}>
        <div className="page-hero-overlay">
          <div className="page-hero-inner">
            <p className="page-hero-eyebrow">Kalender</p>
            <h1 className="page-hero-title">Kursuskalender</h1>
            <p className="page-hero-text">
              Her finder du kommende kurser og oplevelser. Tilmeld dig direkte —
              du modtager en bekræftelse med faktura.
            </p>
          </div>
        </div>
      </section>

      {/* Tabel — desktop */}
      <div style={wrap}>
        <div className="cal-table-wrap cal-desktop-table">
          <div className="cal-header-row">
          <div style={th}>Dato</div>
          <div style={th}>Aktivitet</div>
          <div style={th}>Type</div>
          <div style={th}>Sted</div>
          <div style={th}>Pladser</div>
          <div style={th}>Handling</div>
        </div>

        {items.length === 0 && (
          <div style={{ padding:"32px 18px", color:"#4b6355" }}>Ingen kommende kurser er planlagt endnu.</div>
        )}

        {items.map((item) => {
          const courseKey = `${item.title} – ${item.date} – ${item.place}`;
          const taken     = countMap[courseKey] ?? 0;
          const max       = item.maxParticipants ?? null;
          const isFull    = max !== null && taken >= max;
          const available = max !== null ? max - taken : null;

          return (
            <div key={item.id} className="cal-row">
              <div style={td} className="cal-cell-date">{item.date}</div>
              <div style={td} className="cal-cell-activity">
                <div style={{ fontWeight:700, color:"#1f3a2b" }}>{item.title}</div>
                {item.price && <div style={{ fontSize:13, color:"#a3521d", fontWeight:600, marginTop:3 }}>{item.price}</div>}
              </div>
              <div style={td} className="cal-cell-type">
                <span style={{ ...pill, background: item.type==="Kursus" ? "#e7efe9" : "#f5e5d8", color: item.type==="Kursus" ? "#1f3a2b" : "#a3521d" }}>
                  {item.type}
                </span>
              </div>
              <div style={td} className="cal-cell-place">{item.place}</div>
              <div style={td} className="cal-cell-spots">
                {max !== null ? (
                  <span style={spotsStyle(isFull, available, max)}>
                    {isFull ? "Fuldt" : `${available}/${max} pladser`}
                  </span>
                ) : (
                  <span style={{ color:"#4b6355", fontSize:14 }}>—</span>
                )}
              </div>
              <div style={td} className="cal-cell-actions">
                <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                  {item.href && <a href={item.href} style={secondaryButton}>Læs mere</a>}
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
        </div>

        {/* Kort-visning — mobil */}
        <div className="cal-mobile-cards">
          {items.length === 0 && (
            <p style={{ color:"#4b6355", padding:"16px 0" }}>Ingen kommende kurser er planlagt endnu.</p>
          )}
          {items.map((item) => {
            const courseKey = `${item.title} – ${item.date} – ${item.place}`;
            const taken     = countMap[courseKey] ?? 0;
            const max       = item.maxParticipants ?? null;
            const isFull    = max !== null && taken >= max;
            const available = max !== null ? max - taken : null;
            return (
              <div key={`m-${item.id}`} style={mobileCard}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:8, marginBottom:8 }}>
                  <div style={{ fontWeight:800, color:"#1f3a2b", fontSize:17, lineHeight:1.3 }}>{item.title}</div>
                  <span style={{ ...pill, background: item.type==="Kursus" ? "#e7efe9" : "#f5e5d8", color: item.type==="Kursus" ? "#1f3a2b" : "#a3521d", flexShrink:0 }}>{item.type}</span>
                </div>
                {item.price && <div style={{ color:"#a3521d", fontWeight:700, fontSize:14, marginBottom:8 }}>{item.price}</div>}
                <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginBottom:12 }}>
                  <span style={metaChip}>📅 {item.date}</span>
                  <span style={metaChip}>📍 {item.place}</span>
                  {max !== null && (
                    <span style={spotsStyle(isFull, available, max)}>
                      {isFull ? "Fuldt booket" : `${available}/${max} pladser`}
                    </span>
                  )}
                </div>
                <div style={{ display:"flex", gap:8 }}>
                  {item.href && <a href={item.href} style={{ ...secondaryButton, flex:1, textAlign:"center" }}>Læs mere</a>}
                  {isFull
                    ? <span style={{ ...fullButton, flex:1, textAlign:"center" }}>Fuldt booket</span>
                    : <a href={item.bookingHref} style={{ ...primaryButton, flex:1, textAlign:"center" }}>Tilmeld</a>
                  }
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Betingelser */}
      <div style={wrap}>
      <section style={termsSection}>
        <h2 style={termsTitle}>Betingelser</h2>
        <div style={termsGrid}>
          <div style={termsBlock}>
            <div style={termsHeading}>Tilmelding og betaling</div>
            <p style={termsText}>Ved tilmelding sendes en faktura som bekræftelse på din plads. Pladsen er reserveret, når betalingen er modtaget. Referencen på betalingen skal være dit navn og kursusnavn.</p>
          </div>
          <div style={termsBlock}>
            <div style={termsHeading}>Aflysning fra Træklatreskolen</div>
            <p style={termsText}>Træklatreskolen forbeholder sig retten til at aflyse et arrangement med kort varsel, hvis det vurderes at det ikke kan gennemføres tilfredsstillende — hensyn til sikkerhed og vejr. Indbetalte beløb refunderes fuldt ud.</p>
          </div>
          <div style={termsBlock}>
            <div style={termsHeading}>Aflysning fra deltagere</div>
            <p style={termsText}>Afmelding <strong>senest 14 hverdage</strong> før arrangementet: det indbetalte beløb tilbagebetales fratrukket et reservationsgebyr på <strong>20 %</strong>. Afmelding <strong>efter 14 hverdage</strong>: ingen tilbagebetaling.</p>
          </div>
          <div style={termsBlock}>
            <div style={termsHeading}>Forbehold</div>
            <p style={termsText}>Træklatreskolen forbeholder sig retten til at afvise deltagere, der er under indflydelse af alkohol eller på anden måde udgør en sikkerhedsrisiko for sig selv eller andre.</p>
          </div>
        </div>
      </section>
      </div>
    </main>
  );
}

function spotsStyle(isFull, available, max) {
  let bg = "#e7efe9", color = "#1f3a2b";
  if (isFull) { bg="#fbe4e2"; color="#9a2f27"; }
  else if (available <= Math.ceil(max*0.25)) { bg="#f5e5d8"; color="#a3521d"; }
  return { display:"inline-block", padding:"6px 12px", borderRadius:999, fontSize:13, fontWeight:700, background:bg, color };
}

const wrap           = { maxWidth:1180, margin:"0 auto", padding:"32px 24px 72px" };
const th             = { fontSize:12, fontWeight:700, color:"#486051", textTransform:"uppercase", letterSpacing:0.8 };
const td             = { color:"#33463a", fontSize:15 };
const pill           = { display:"inline-block", padding:"5px 10px", borderRadius:999, fontSize:12, fontWeight:700 };
const metaChip       = { display:"inline-block", background:"#eef3ef", color:"#2d5c3e", padding:"5px 10px", borderRadius:999, fontSize:13, fontWeight:600 };
const primaryButton  = { display:"inline-block", padding:"11px 14px", background:"#d8782f", color:"white", borderRadius:10, textDecoration:"none", fontWeight:700, fontSize:14 };
const secondaryButton= { display:"inline-block", padding:"11px 14px", background:"#e7efe9", color:"#1f3a2b", borderRadius:10, textDecoration:"none", fontWeight:700, fontSize:14 };
const fullButton     = { display:"inline-block", padding:"11px 14px", background:"#f0f0f0", color:"#999", borderRadius:10, fontWeight:700, fontSize:14, cursor:"not-allowed" };
const mobileCard     = { background:"white", borderRadius:16, padding:"20px 18px", boxShadow:"0 4px 14px rgba(0,0,0,0.07)", marginBottom:12 };
const termsSection   = { background:"white", borderRadius:18, padding:"36px 32px", boxShadow:"0 4px 18px rgba(0,0,0,0.06)" };
const termsTitle     = { color:"#1f3a2b", fontSize:26, fontWeight:800, margin:"0 0 24px" };
const termsGrid      = { display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(240px, 1fr))", gap:24 };
const termsBlock     = { borderLeft:"3px solid #d8782f", paddingLeft:16 };
const termsHeading   = { fontWeight:700, color:"#1f3a2b", fontSize:15, marginBottom:8 };
const termsText      = { color:"#4b6355", fontSize:14, lineHeight:1.7, margin:0 };
