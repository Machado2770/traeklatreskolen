"use client";

import { useEffect, useState } from "react";

export default function StatistikPage() {
  const [data, setData]       = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);
  const [ga, setGa]           = useState(null); // null = henter, ellers svar fra ga-stats

  useEffect(() => {
    fetch("/api/admin/stats", { cache: "no-store" })
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false); })
      .catch(() => { setError("Kunne ikke hente statistik."); setLoading(false); });
  }, []);

  useEffect(() => {
    fetch("/api/admin/ga-stats", { cache: "no-store" })
      .then(r => r.json())
      .then(setGa)
      .catch(() => setGa({ configured: true, error: "Kunne ikke hente besøgstal." }));
  }, []);

  if (loading) return <p style={{ color: "#4b6355" }}>Henter statistik…</p>;
  if (error)   return <p style={{ color: "#9a2f27" }}>{error}</p>;

  const maxMonthly     = Math.max(...(data.monthly     || []).map(m => m.count), 1);
  const maxTopCourse   = Math.max(...(data.topCourses  || []).map(c => c.count), 1);
  const maxPayment     = Math.max(...(data.paymentTrend|| []).map(m => m.paid + m.pending), 1);

  return (
    <>
      <div style={{ marginBottom: 28 }}>
        <h1 style={h1}>Statistik</h1>
        <p style={sub}>Overblik over tilmeldinger og aktivitet på Træklatreskolen.</p>
      </div>

      {/* ── BESØGENDE (GA4) ── */}
      <section style={{ ...card, borderLeft: "4px solid #2a7a48", marginBottom: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
          <div>
            <h2 style={h2}>Besøgende på hjemmesiden</h2>
            <p style={{ fontSize: 14, color: "#4b6355", margin: "6px 0 0", lineHeight: 1.6 }}>
              {ga?.configured && !ga?.error
                ? <>Live tal fra Google Analytics — besøgende, sidevisninger og kilder.<br /></>
                : <>Trafikdata, sidevisninger og besøgskilder vises i Google Analytics.<br /></>}
              <span style={{ color: "#7a9183", fontSize: 13 }}>Målingsid: G-VWEV05S1BB{ga?.activeNow != null && ` · ${ga.activeNow} aktive lige nu`}</span>
            </p>
          </div>
          <a
            href="https://analytics.google.com/analytics/web/"
            target="_blank"
            rel="noopener noreferrer"
            style={ga4Btn}
          >
            Åbn Google Analytics →
          </a>
        </div>

        <GaBody ga={ga} />
      </section>

      {/* ── KPI-KORT ── */}
      <div style={kpiGrid}>
        <KpiCard label="Tilmeldinger i alt"  value={data.total}      color="#1f3a2b" bg="#eef3ef" />
        <KpiCard label="Denne måned"         value={data.thisMonth}  color="#1f3a2b" bg="#e6f0ea" />
        <KpiCard label="Betalte"             value={data.paid}       color="#165c2c" bg="#dff3e5" />
        <KpiCard label="Afventer betaling"   value={data.pending}    color="#7a4d08" bg="#f7eddc" />
        <KpiCard label="Annullerede"         value={data.cancelled}  color="#9a2f27" bg="#fbe4e2" />
      </div>

      {/* ── TILMELDINGER PR. MÅNED ── */}
      <section style={card}>
        <h2 style={h2}>Tilmeldinger pr. måned <span style={badge}>seneste 12 mdr.</span></h2>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 140, marginTop: 16 }}>
          {data.monthly.map((m, i) => (
            <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
              <span style={{ fontSize: 11, color: "#4b6355", fontWeight: 700 }}>{m.count > 0 ? m.count : ""}</span>
              <div
                title={`${m.label}: ${m.count}`}
                style={{
                  width: "100%",
                  height: Math.max((m.count / maxMonthly) * 110, m.count > 0 ? 6 : 2),
                  background: m.count > 0 ? "#2a7a48" : "#e8eeeb",
                  borderRadius: "4px 4px 0 0",
                  transition: "height 0.3s",
                }}
              />
              <span style={{ fontSize: 10, color: "#7a9183", textAlign: "center", lineHeight: 1.2 }}>{m.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── 2-KOLONNE SEKTION ── */}
      <div style={twoCol}>

        {/* Mest populære kurser */}
        <section style={card}>
          <h2 style={h2}>Mest populære kurser</h2>
          <p style={cardSub}>Aktive tilmeldinger (ekskl. annullerede)</p>
          {data.topCourses.length === 0
            ? <p style={{ color: "#aaa", fontSize: 14 }}>Ingen data endnu.</p>
            : data.topCourses.map((c, i) => (
              <div key={i} style={{ marginBottom: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ fontSize: 13, color: "#1f3a2b", fontWeight: 600 }}>{c.name}</span>
                  <span style={{ fontSize: 13, color: "#4b6355", fontWeight: 700 }}>{c.count}</span>
                </div>
                <div style={{ height: 8, background: "#eef3ef", borderRadius: 4, overflow: "hidden" }}>
                  <div style={{
                    height: "100%",
                    width: `${(c.count / maxTopCourse) * 100}%`,
                    background: "#2a7a48",
                    borderRadius: 4,
                    transition: "width 0.3s",
                  }} />
                </div>
              </div>
            ))
          }
        </section>

        {/* Betalingsstatus fordeling */}
        <section style={card}>
          <h2 style={h2}>Betalingsstatus</h2>
          <p style={cardSub}>Alle tilmeldinger samlet</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 8 }}>
            <StatusBar label="Betalt"           count={data.paid}      total={data.total} bg="#2a7a48" light="#dff3e5" />
            <StatusBar label="Afventer"         count={data.pending}   total={data.total} bg="#d8782f" light="#f7eddc" />
            <StatusBar label="Annulleret"       count={data.cancelled} total={data.total} bg="#8f2d20" light="#fbe4e2" />
          </div>

          <h2 style={{ ...h2, marginTop: 28 }}>Betalt vs. afventer <span style={badge}>6 mdr.</span></h2>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 100, marginTop: 14 }}>
            {data.paymentTrend.map((m, i) => {
              const total = m.paid + m.pending;
              return (
                <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                  <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <div style={{
                      width: "100%",
                      height: Math.max((m.pending / maxPayment) * 80, m.pending > 0 ? 4 : 0),
                      background: "#d8782f",
                      borderRadius: "4px 4px 0 0",
                    }} title={`Afventer: ${m.pending}`} />
                    <div style={{
                      width: "100%",
                      height: Math.max((m.paid / maxPayment) * 80, m.paid > 0 ? 4 : 0),
                      background: "#2a7a48",
                    }} title={`Betalt: ${m.paid}`} />
                  </div>
                  <span style={{ fontSize: 10, color: "#7a9183" }}>{m.label}</span>
                </div>
              );
            })}
          </div>
          <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
            <span style={{ fontSize: 11, color: "#2a7a48", fontWeight: 700 }}>■ Betalt</span>
            <span style={{ fontSize: 11, color: "#d8782f", fontWeight: 700 }}>■ Afventer</span>
          </div>
        </section>

      </div>

      {/* ── ANNONCERING PLACEHOLDER ── */}
      <section style={{ ...card, borderLeft: "4px solid #cfd8d3", opacity: 0.7 }}>
        <h2 style={{ ...h2, color: "#7a9183" }}>Annoncering — kommer snart</h2>
        <p style={{ fontSize: 14, color: "#7a9183", margin: 0 }}>
          Her vil du få overblik over Facebook- og Instagram-annoncer koblet til trafikkilder og bookingkonverteringer.
        </p>
      </section>
    </>
  );
}

function GaBody({ ga }) {
  // Henter endnu
  if (ga === null) {
    return <p style={{ fontSize: 13, color: "#7a9183", marginTop: 16 }}>Henter besøgstal…</p>;
  }

  // Nøgler ikke opsat, eller fejl → vis links ud til Google Analytics
  if (!ga.configured || ga.error) {
    const tiles = [
      { label: "Besøgende i dag",   hint: "Realtime → Oversigt" },
      { label: "Sider pr. besøg",    hint: "Engagement → Sider" },
      { label: "Trafikkilder",        hint: "Erhvervelse → Oversigt" },
      { label: "Mest besøgte sider",  hint: "Engagement → Sider og skærme" },
    ];
    return (
      <>
        {ga.error && (
          <p style={{ fontSize: 13, color: "#9a2f27", marginTop: 12 }}>{ga.error}</p>
        )}
        {!ga.configured && (
          <p style={{ fontSize: 13, color: "#7a9183", marginTop: 12 }}>
            Tip: opsæt Google Analytics-nøglerne i Vercel, så vises besøgstallene direkte her i stedet for links.
          </p>
        )}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12, marginTop: 14 }}>
          {tiles.map(({ label, hint }) => (
            <a key={label} href="https://analytics.google.com/analytics/web/" target="_blank" rel="noopener noreferrer" style={ga4Tile}>
              <span style={{ fontWeight: 700, fontSize: 13, color: "#1f3a2b" }}>{label}</span>
              <span style={{ fontSize: 11, color: "#7a9183", marginTop: 2 }}>{hint}</span>
            </a>
          ))}
        </div>
      </>
    );
  }

  // Rigtige tal
  const maxDaily = Math.max(...(ga.daily || []).map(d => d.users), 1);
  const maxPage  = Math.max(...(ga.topPages || []).map(p => p.views), 1);
  const maxSrc   = Math.max(...(ga.sources || []).map(s => s.sessions), 1);

  return (
    <>
      {/* KPI-tal */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 12, marginTop: 18 }}>
        <GaKpi label="Aktive lige nu"        value={ga.activeNow} accent />
        <GaKpi label="Besøgende i dag"       value={ga.today?.users} />
        <GaKpi label="Besøgende (30 dage)"   value={ga.last30?.users} />
        <GaKpi label="Sidevisninger (30 d.)" value={ga.last30?.views} />
        <GaKpi label="Sider pr. besøg"       value={ga.last30?.viewsPerSession} />
      </div>

      {/* Daglige besøgende — 30 dage */}
      {ga.daily?.length > 0 && (
        <div style={{ marginTop: 18 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#4b6355", marginBottom: 8 }}>Besøgende pr. dag <span style={badge}>30 dage</span></div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height: 70 }}>
            {ga.daily.map((d, i) => (
              <div key={i} title={`${d.label}: ${d.users}`} style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
                <div style={{ height: Math.max((d.users / maxDaily) * 64, d.users > 0 ? 3 : 1), background: d.users > 0 ? "#2a7a48" : "#e8eeeb", borderRadius: "3px 3px 0 0" }} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Mest besøgte sider + trafikkilder */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20, marginTop: 20 }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#1f3a2b", marginBottom: 10 }}>Mest besøgte sider <span style={badge}>30 dage</span></div>
          {(ga.topPages || []).length === 0
            ? <p style={{ color: "#aaa", fontSize: 13 }}>Ingen data endnu.</p>
            : ga.topPages.map((p, i) => (
              <GaBar key={i} label={p.title} count={p.views} max={maxPage} color="#2a7a48" />
            ))}
        </div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#1f3a2b", marginBottom: 10 }}>Trafikkilder <span style={badge}>30 dage</span></div>
          {(ga.sources || []).length === 0
            ? <p style={{ color: "#aaa", fontSize: 13 }}>Ingen data endnu.</p>
            : ga.sources.map((s, i) => (
              <GaBar key={i} label={s.channel} count={s.sessions} max={maxSrc} color="#d8782f" />
            ))}
        </div>
      </div>
    </>
  );
}

function GaKpi({ label, value, accent }) {
  return (
    <div style={{ background: accent ? "#dff3e5" : "#eef3ef", borderRadius: 12, padding: "14px 16px" }}>
      <div style={{ fontSize: 26, fontWeight: 800, color: accent ? "#165c2c" : "#1f3a2b", lineHeight: 1 }}>{value ?? "–"}</div>
      <div style={{ fontSize: 12, color: "#4b6355", marginTop: 6, fontWeight: 600 }}>{label}</div>
    </div>
  );
}

function GaBar({ label, count, max, color }) {
  return (
    <div style={{ marginBottom: 9 }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 10, marginBottom: 3 }}>
        <span style={{ fontSize: 12, color: "#1f3a2b", fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{label}</span>
        <span style={{ fontSize: 12, color: "#4b6355", fontWeight: 700, flexShrink: 0 }}>{count}</span>
      </div>
      <div style={{ height: 7, background: "#eef3ef", borderRadius: 4, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${(count / max) * 100}%`, background: color, borderRadius: 4 }} />
      </div>
    </div>
  );
}

function KpiCard({ label, value, color, bg }) {
  return (
    <div style={{ background: bg, borderRadius: 14, padding: "18px 20px", boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
      <div style={{ fontSize: 32, fontWeight: 800, color, lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: 13, color: "#4b6355", marginTop: 6, fontWeight: 600 }}>{label}</div>
    </div>
  );
}

function StatusBar({ label, count, total, bg, light }) {
  const pct = total > 0 ? Math.round((count / total) * 100) : 0;
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
        <span style={{ fontSize: 13, color: "#1f3a2b", fontWeight: 600 }}>{label}</span>
        <span style={{ fontSize: 13, color: "#4b6355" }}>{count} <span style={{ color: "#aaa" }}>({pct}%)</span></span>
      </div>
      <div style={{ height: 10, background: "#eef3ef", borderRadius: 5, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${pct}%`, background: bg, borderRadius: 5, transition: "width 0.3s" }} />
      </div>
    </div>
  );
}

const h1     = { color: "#1f3a2b", fontSize: 24, margin: 0, fontWeight: 800 };
const h2     = { color: "#1f3a2b", fontSize: 16, fontWeight: 700, margin: "0 0 4px" };
const sub    = { color: "#4b6355", fontSize: 14, margin: "6px 0 0" };
const cardSub = { color: "#7a9183", fontSize: 12, margin: "0 0 12px" };
const card   = { background: "white", borderRadius: 14, padding: 22, boxShadow: "0 4px 18px rgba(0,0,0,0.06)", marginBottom: 20 };
const kpiGrid = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 14, marginBottom: 20 };
const twoCol  = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 };
const badge  = { background: "#eef3ef", color: "#4b6355", fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 999, marginLeft: 6 };
const ga4Btn = { display: "inline-block", padding: "10px 18px", background: "#1f3a2b", color: "white", borderRadius: 10, textDecoration: "none", fontWeight: 700, fontSize: 14, whiteSpace: "nowrap" };
const ga4Tile = { display: "flex", flexDirection: "column", background: "#eef3ef", borderRadius: 10, padding: "12px 14px", textDecoration: "none", gap: 2, transition: "background 0.15s" };
