import { unstable_noStore as noStore } from "next/cache";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { graph, eventLd, jsonLdScript } from "@/lib/jsonld";
import { isUpcoming } from "@/lib/calendarDates";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Kursuskalender — kommende træklatrekurser og oplevelser",
  description:
    "Se kommende datoer for træklatrekurser og naturoplevelser i hele Danmark. Tilmeld dig direkte og få en bekræftelse med faktura.",
  alternates: { canonical: "/kursuskalender" },
  openGraph: {
    title: "Kursuskalender | Træklatreskolen",
    description: "Kommende kurser og oplevelser i trækronerne — find en dato nær dig.",
    url: "/kursuskalender",
    images: [{ url: "/og/kursuskalender.png", width: 1200, height: 630, alt: "Kursuskalender — Træklatreskolen" }],
  },
};

const MONTHS = {
  januar: 0, februar: 1, marts: 2, april: 3, maj: 4, juni: 5,
  juli: 6, august: 7, september: 8, oktober: 9, november: 10, december: 11,
};

const MONTH_NAMES = [
  "Januar", "Februar", "Marts", "April", "Maj", "Juni",
  "Juli", "August", "September", "Oktober", "November", "December",
];

function parseFirstDate(str) {
  if (!str) return Number.POSITIVE_INFINITY;
  const lower = str.toLowerCase();
  const day = lower.match(/(\d+)\./);
  const month = lower.match(/januar|februar|marts|april|maj|juni|juli|august|september|oktober|november|december/);
  const years = lower.match(/\d{4}/g);
  if (!day || !month || !years) return Number.POSITIVE_INFINITY;
  return new Date(+years[years.length - 1], MONTHS[month[0]], +day[1]).getTime();
}

// "12. maj 2026" -> "2026-05-12" (uden tidszone-forskydning)
function isoDate(str) {
  const ts = parseFirstDate(str);
  if (!isFinite(ts)) return null;
  const d = new Date(ts);
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
}

// Årstal + måned for gruppering. Ikke-parsbare datoer havner i en "Uden dato"-gruppe.
function groupKeyParts(str) {
  const ts = parseFirstDate(str);
  if (!isFinite(ts)) return { year: "Uden dato", monthIdx: -1 };
  const d = new Date(ts);
  return { year: String(d.getFullYear()), monthIdx: d.getMonth() };
}

function normalize(item) {
  return {
    id:              item.id,
    date:            item.date,
    title:           item.title,
    place:           item.place,
    type:            item.type,
    price:           item.price || "",
    href:            item.href || "",
    bookingHref:     item.booking_href || `/booking?course=${encodeURIComponent(item.title)}&date=${encodeURIComponent(item.date)}&place=${encodeURIComponent(item.place)}`,
    maxParticipants: item.max_participants,
  };
}

async function getCalendarItems() {
  noStore();
  try {
    const supabase = getSupabaseAdmin();
    const [calRes, cmsRes] = await Promise.all([
      supabase
        .from("calendar_items")
        .select("*")
        .eq("is_published", true),
      supabase
        .from("courses_cms")
        .select("title, price"),
    ]);

    if (calRes.error) {
      console.error("[kursuskalender] Supabase error:", calRes.error.message);
      return [];
    }

    // Brug pris fra calendar_items, ellers hent fra courses_cms
    const priceMap = {};
    for (const c of cmsRes.data || []) {
      if (c.price) priceMap[c.title] = c.price;
    }

    return (calRes.data || [])
      // Afholdte arrangementer skjules automatisk (synlige til og med sidste dag).
      // De slettes ikke — i admin-arkivet ligger deltagerlisterne fortsat.
      .filter((item) => isUpcoming(item.date))
      .map(item => normalize({
        ...item,
        price: item.price || priceMap[item.title] || "",
      }))
      .sort((a, b) => parseFirstDate(a.date) - parseFirstDate(b.date));
  } catch (e) {
    console.error("[kursuskalender] Fetch exception:", e?.message ?? e);
    return [];
  }
}

// Grupperer sorterede items i år -> [ {monthIdx, item} ].
// Rækkefølgen bevares (items er allerede sorteret kronologisk).
function groupByYear(items) {
  const map = new Map();
  for (const item of items) {
    const { year, monthIdx } = groupKeyParts(item.date);
    if (!map.has(year)) map.set(year, []);
    map.get(year).push({ ...item, monthIdx });
  }
  return [...map.entries()].map(([year, rows]) => ({ year, rows }));
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

  const years = groupByYear(items);

  const eventsLd = items.length
    ? graph(
        items.map((item) =>
          eventLd({
            title: item.title,
            startDate: isoDate(item.date),
            place: item.place,
            href: item.href,
          })
        )
      )
    : null;

  return (
    <main>
      {eventsLd && <script {...jsonLdScript(eventsLd)} />}
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
            <p className="page-hero-text" style={{ marginTop: "14px", fontSize: "15px", opacity: 0.88 }}>
              Finder du ikke dit kursus eller oplevelse i kursuskalenderen, så kontakt Træklatreskolen på{" "}
              <a href="mailto:info@traeklatreskolen.dk" style={{ color: "inherit", textDecoration: "underline" }}>info@traeklatreskolen.dk</a>{" "}
              med din forespørgsel.
            </p>
          </div>
        </div>
      </section>

      {/* Tidslinje */}
      <section style={timelineSection}>
        <div style={wrap}>
          {items.length === 0 && (
            <div style={emptyBox}>Ingen kommende kurser er planlagt endnu.</div>
          )}

          {years.map(({ year, rows }) => (
            <section key={year} style={{ marginBottom: 8 }}>
              {/* Klæbende år-bånd */}
              <div style={yearBand}>
                <span style={yearNum}>{year}</span>
                <span style={yearMeta}>
                  {rows.length} {rows.length === 1 ? "dato" : "datoer"}
                </span>
                <span style={yearRule} />
              </div>

              {/* Tidslinje-spor */}
              <div style={track}>
                <span style={trackLine} aria-hidden />
                {rows.map((item, i) => {
                  const showMonth = i === 0 || item.monthIdx !== rows[i - 1].monthIdx;
                  const monthLabel = item.monthIdx >= 0 ? MONTH_NAMES[item.monthIdx] : "Uden fast dato";
                  return (
                    <div key={item.id ?? `${item.title}-${item.date}`}>
                      {showMonth && (
                        <div style={monthRow}>
                          <span style={monthLabelStyle}>{monthLabel}</span>
                        </div>
                      )}
                      <TimelineRow item={item} countMap={countMap} />
                    </div>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </section>

      {/* Betingelser */}
      <div style={termsWrap}>
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

function TimelineRow({ item, countMap }) {
  const courseKey = `${item.title} – ${item.date} – ${item.place}`;
  const taken     = countMap[courseKey] ?? 0;
  const max       = item.maxParticipants ?? null;
  const isFull    = max !== null && taken >= max;
  const available = max !== null ? max - taken : null;
  const isKursus  = item.type === "Kursus";

  return (
    <div style={row}>
      <span style={{ ...dot, borderColor: isKursus ? "#d8782f" : "#3d7a57" }} aria-hidden />
      <div style={card} className="cal-tl-card">
        <div style={cardHead}>
          <div>
            <div style={dateText}>{item.date}</div>
            <div style={titleText}>{item.title}</div>
          </div>
          <span style={{ ...typePill, background: isKursus ? "#e7efe9" : "#f5e5d8", color: isKursus ? "#1f3a2b" : "#a3521d" }}>
            {item.type}
          </span>
        </div>

        <div style={metaRow}>
          <span style={metaChip}>📍 {item.place}</span>
          {item.price && <span style={priceChip}>{item.price}</span>}
          {max !== null && (
            <span style={spotsStyle(isFull, available, max)}>
              {isFull ? "Fuldt booket" : `${available}/${max} pladser`}
            </span>
          )}
        </div>

        <div style={actions}>
          {item.href && <a href={item.href} style={secondaryButton}>Læs mere</a>}
          {isFull
            ? <span style={fullButton}>Fuldt booket</span>
            : <a href={item.bookingHref} style={primaryButton}>Tilmeld</a>}
        </div>
      </div>
    </div>
  );
}

function spotsStyle(isFull, available, max) {
  let bg = "#e7efe9", color = "#1f3a2b";
  if (isFull) { bg = "#fbe4e2"; color = "#9a2f27"; }
  else if (available <= Math.ceil(max * 0.25)) { bg = "#f5e5d8"; color = "#a3521d"; }
  return { display: "inline-block", padding: "6px 12px", borderRadius: 999, fontSize: 13, fontWeight: 700, background: bg, color };
}

/* ── Layout ── */
const timelineSection = { background: "#eef3ef", padding: "8px 0 64px" };
const wrap            = { maxWidth: 940, margin: "0 auto", padding: "0 20px" };
const emptyBox        = { padding: "48px 18px", color: "#4b6355", textAlign: "center", background: "white", borderRadius: 16, marginTop: 32 };

/* Klæbende år-bånd — sidder lige under den sticky header (~82px) */
const yearBand = {
  position: "sticky",
  top: 70,
  zIndex: 8,
  display: "flex",
  alignItems: "baseline",
  gap: 14,
  background: "#eef3ef",
  padding: "20px 0 12px",
};
const yearNum  = { fontSize: "clamp(34px, 7vw, 56px)", fontWeight: 900, letterSpacing: "-1.5px", color: "#1f3a2b", lineHeight: 1 };
const yearMeta = { fontSize: 14, fontWeight: 700, color: "#7a9585", whiteSpace: "nowrap" };
const yearRule = { flex: 1, height: 4, borderRadius: 4, background: "linear-gradient(90deg, #d8782f, rgba(216,120,47,0))", alignSelf: "center", marginLeft: 6 };

/* Spor med lodret linje */
const track     = { position: "relative", paddingTop: 6 };
const trackLine = { position: "absolute", left: 27, top: 10, bottom: 10, width: 3, borderRadius: 3, background: "#d3ded6" };

/* Måneds-inddeling */
const monthRow        = { paddingLeft: 60, margin: "14px 0 10px" };
const monthLabelStyle = { display: "inline-block", background: "#1f3a2b", color: "white", fontSize: 12, fontWeight: 800, letterSpacing: 1.2, textTransform: "uppercase", padding: "6px 14px", borderRadius: 999 };

/* Række = node + kort */
const row = { position: "relative", paddingLeft: 60, marginBottom: 16 };
const dot = {
  position: "absolute",
  left: 20,
  top: 22,
  width: 18,
  height: 18,
  borderRadius: 999,
  background: "white",
  border: "4px solid #d8782f",
  boxShadow: "0 0 0 4px #eef3ef",
  zIndex: 2,
};

const card     = { background: "white", borderRadius: 16, padding: "18px 20px", boxShadow: "0 6px 20px rgba(0,0,0,0.07)", border: "1px solid #ece6de" };
const cardHead = { display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 };
const dateText = { color: "#a3521d", fontWeight: 800, fontSize: 13.5, letterSpacing: 0.2, marginBottom: 4 };
const titleText= { color: "#1f3a2b", fontWeight: 800, fontSize: 19, lineHeight: 1.25 };
const typePill = { display: "inline-block", padding: "5px 11px", borderRadius: 999, fontSize: 12, fontWeight: 700, flexShrink: 0 };

const metaRow  = { display: "flex", gap: 8, flexWrap: "wrap", margin: "13px 0 15px" };
const metaChip = { display: "inline-block", background: "#eef3ef", color: "#2d5c3e", padding: "6px 11px", borderRadius: 999, fontSize: 13, fontWeight: 600 };
const priceChip= { display: "inline-block", background: "#fff3e8", color: "#a3521d", padding: "6px 11px", borderRadius: 999, fontSize: 13, fontWeight: 800 };

const actions        = { display: "flex", gap: 8, flexWrap: "wrap" };
const primaryButton  = { display: "inline-block", padding: "11px 18px", background: "#d8782f", color: "white", borderRadius: 10, textDecoration: "none", fontWeight: 700, fontSize: 14 };
const secondaryButton= { display: "inline-block", padding: "11px 18px", background: "#e7efe9", color: "#1f3a2b", borderRadius: 10, textDecoration: "none", fontWeight: 700, fontSize: 14 };
const fullButton     = { display: "inline-block", padding: "11px 18px", background: "#f0f0f0", color: "#999", borderRadius: 10, fontWeight: 700, fontSize: 14, cursor: "not-allowed" };

/* Betingelser */
const termsWrap    = { maxWidth: 1180, margin: "0 auto", padding: "40px 24px 72px" };
const termsSection = { background: "white", borderRadius: 18, padding: "36px 32px", boxShadow: "0 4px 18px rgba(0,0,0,0.06)" };
const termsTitle   = { color: "#1f3a2b", fontSize: 26, fontWeight: 800, margin: "0 0 24px" };
const termsGrid    = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 24 };
const termsBlock   = { borderLeft: "3px solid #d8782f", paddingLeft: 16 };
const termsHeading = { fontWeight: 700, color: "#1f3a2b", fontSize: 15, marginBottom: 8 };
const termsText    = { color: "#4b6355", fontSize: 14, lineHeight: 1.7, margin: 0 };
