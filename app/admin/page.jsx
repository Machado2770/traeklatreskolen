"use client";

import { useEffect, useMemo, useState } from "react";

function statusColors(s) {
  if (s === "paid")      return { background: "#dff3e5", color: "#165c2c" };
  if (s === "cancelled") return { background: "#fbe4e2", color: "#9a2f27" };
  return                        { background: "#f7eddc", color: "#7a4d08" };
}
function statusLabel(s) {
  return s === "paid" ? "Betalt" : s === "cancelled" ? "Annulleret" : "Afventer";
}

const DANISH_MONTHS = { januar:0,februar:1,marts:2,april:3,maj:4,juni:5,juli:6,august:7,september:8,oktober:9,november:10,december:11 };
function parseDanishDate(str) {
  const m = (str||"").match(/(\d+)\.\s+(\w+)\s+(\d{4})/);
  if (!m) return null;
  const mo = DANISH_MONTHS[m[2].toLowerCase()];
  return mo !== undefined ? new Date(+m[3], mo, +m[1]) : null;
}

export default function TilmeldingPage() {
  const [items, setItems]       = useState([]);
  const [loading, setLoading]   = useState(true);
  const [viewMode, setViewMode] = useState("kurser");
  const [filters, setFilters]   = useState({ q: "", course: "", payment_status: "" });

  async function load() {
    setLoading(true);
    try {
      const p = new URLSearchParams();
      if (filters.q)              p.set("q", filters.q);
      if (filters.course)         p.set("course", filters.course);
      if (filters.payment_status) p.set("payment_status", filters.payment_status);
      const res = await fetch(`/api/booking?${p}`, { cache: "no-store" });
      const d = await res.json();
      setItems(Array.isArray(d) ? d : Array.isArray(d.data) ? d.data : []);
    } catch { setItems([]); }
    finally  { setLoading(false); }
  }

  useEffect(() => { load(); }, [filters.q, filters.course, filters.payment_status]);

  const courseOptions = useMemo(() => Array.from(new Set(items.map(i => i.course).filter(Boolean))).sort(), [items]);

  const grouped = useMemo(() => {
    const map = {};
    items.forEach(i => { const k = i.course||"Ukendt"; (map[k]||=[]).push(i); });
    return Object.entries(map).map(([key, ps]) => {
      const parts = key.split(" – ");
      return { key, name: parts[0], date: parts[1]||"", place: parts[2]||"",
        dateObj: parseDanishDate(parts[1]||""), ps,
        paid: ps.filter(p=>p.payment_status==="paid").length,
        pending: ps.filter(p=>p.payment_status==="pending").length,
        cancelled: ps.filter(p=>p.payment_status==="cancelled").length,
      };
    }).sort((a,b) => a.dateObj&&b.dateObj ? a.dateObj-b.dateObj : a.dateObj?-1:b.dateObj?1:0);
  }, [items]);

  async function updateStatus(id, status) {
    await fetch(`/api/participants/${id}/status`, {
      method: "PATCH", headers:{"Content-Type":"application/json"},
      body: JSON.stringify({ payment_status: status }),
    });
    setItems(prev => prev.map(i => i.id===id ? {...i, payment_status: status} : i));
  }

  const exportUrl = filters.course
    ? `/api/participants/export?course=${encodeURIComponent(filters.course)}`
    : "/api/participants/export";

  return (
    <>
      <div style={{ marginBottom: 24 }}>
        <h1 style={h1}>Tilmeldinger</h1>
        <p style={sub}>Overblik, betalingsstatus og eksport af deltagerlister.</p>
      </div>

      {/* Filter */}
      <div style={{ ...card, display:"flex", flexWrap:"wrap", gap:10, marginBottom:16 }}>
        <input placeholder="Søg navn eller email…" value={filters.q}
          onChange={e=>setFilters(p=>({...p,q:e.target.value}))} style={{...inp, flex:"2 1 180px"}} />
        <select value={filters.course} onChange={e=>setFilters(p=>({...p,course:e.target.value}))} style={{...inp, flex:"2 1 200px"}}>
          <option value="">Alle kurser</option>
          {courseOptions.map(c=><option key={c} value={c}>{c}</option>)}
        </select>
        <select value={filters.payment_status} onChange={e=>setFilters(p=>({...p,payment_status:e.target.value}))} style={{...inp, flex:"1 1 150px"}}>
          <option value="">Alle status</option>
          <option value="pending">Afventer</option>
          <option value="paid">Betalt</option>
          <option value="cancelled">Annulleret</option>
        </select>
        <button onClick={load} style={btn("#3d7a57")}>Opdater</button>
        <a href={exportUrl} style={btn("#d8782f")}>
          {filters.course ? "Eksportér filtreret" : "Eksportér alle"}
        </a>
      </div>

      {!loading && items.length > 0 && (
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
          <span style={{ color:"#4b6355", fontSize:14 }}>{items.length} tilmeldinger</span>
          <div style={{ display:"flex", gap:4 }}>
            {["kurser","liste"].map(v=>(
              <button key={v} onClick={()=>setViewMode(v)} style={{
                padding:"6px 14px", borderRadius:8, border:"none", cursor:"pointer", fontSize:13, fontWeight:600,
                background: viewMode===v ? "#1f3a2b" : "#eef3ef",
                color:      viewMode===v ? "white"   : "#4b6355",
              }}>{v==="kurser"?"Kursoversigt":"Liste"}</button>
            ))}
          </div>
        </div>
      )}

      {loading && <p style={{color:"#4b6355"}}>Henter…</p>}
      {!loading && items.length===0 && <div style={card}>Ingen tilmeldinger fundet.</div>}

      {/* Kursoversigt */}
      {!loading && viewMode==="kurser" && grouped.map(g=>(
        <div key={g.key} style={{...card, marginBottom:16}}>
          <div style={{ display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:12, marginBottom:12 }}>
            <div>
              <div style={{ fontWeight:700, fontSize:17, color:"#1f3a2b" }}>{g.name}</div>
              <div style={{ display:"flex", gap:6, marginTop:6, flexWrap:"wrap" }}>
                {g.date  && <span style={chip("#f5e5d8","#a3521d")}>{g.date}</span>}
                {g.place && <span style={chip("#e7efe9","#2d5c3e")}>{g.place}</span>}
                <span style={chip("#e9f0ff","#2a3f8a")}>{g.ps.length} deltager{g.ps.length!==1?"e":""}</span>
              </div>
              <div style={{ display:"flex", gap:8, marginTop:8, flexWrap:"wrap" }}>
                {g.paid>0      && <span style={chip("#dff3e5","#165c2c")}>✓ {g.paid} betalt</span>}
                {g.pending>0   && <span style={chip("#f7eddc","#7a4d08")}>⏳ {g.pending} afventer</span>}
                {g.cancelled>0 && <span style={chip("#fbe4e2","#9a2f27")}>✕ {g.cancelled} annulleret</span>}
              </div>
            </div>
            <a href={`/api/participants/export?course=${encodeURIComponent(g.key)}`} style={btn("#d8782f")}>Eksportér</a>
          </div>
          <ParticipantTable rows={g.ps} onStatus={updateStatus} showCourse={false} />
        </div>
      ))}

      {/* Liste */}
      {!loading && viewMode==="liste" && items.length>0 && (
        <div style={card}>
          <ParticipantTable rows={items} onStatus={updateStatus} showCourse={true} />
        </div>
      )}
    </>
  );
}

function ParticipantTable({ rows, onStatus, showCourse }) {
  return (
    <div style={{ overflowX:"auto" }}>
      <table style={{ width:"100%", borderCollapse:"collapse" }}>
        <thead>
          <tr style={{ background:"#eef3ef" }}>
            {["Navn","Email","Telefon", ...(showCourse?["Kursus"]:[]), "Status","Oprettet","Handling"].map(l=>(
              <th key={l} style={th}>{l}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(r=>(
            <tr key={r.id} style={{ borderBottom:"1px solid #eef3ef" }}>
              <td style={td}>{r.name}</td>
              <td style={td}>{r.email}</td>
              <td style={td}>{r.phone||"—"}</td>
              {showCourse && <td style={td}>{r.course}</td>}
              <td style={td}><span style={{...pill,...statusColors(r.payment_status)}}>{statusLabel(r.payment_status)}</span></td>
              <td style={td}>{r.created_at ? new Date(r.created_at).toLocaleString("da-DK") : "—"}</td>
              <td style={td}>
                <div style={{ display:"flex", gap:5, flexWrap:"wrap" }}>
                  <button onClick={()=>onStatus(r.id,"paid")}      style={mini("#2a7a48")}>Betalt</button>
                  <button onClick={()=>onStatus(r.id,"pending")}   style={mini("#d8782f")}>Afventer</button>
                  <button onClick={()=>onStatus(r.id,"cancelled")} style={mini("#8f2d20")}>Annullér</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const h1  = { color:"#1f3a2b", fontSize:24, margin:0, fontWeight:800 };
const sub = { color:"#4b6355", fontSize:14, margin:"6px 0 0" };
const card = { background:"white", borderRadius:14, padding:20, boxShadow:"0 4px 18px rgba(0,0,0,0.06)" };
const inp  = { padding:"10px 12px", borderRadius:10, border:"1px solid #cfd8d3", font:"inherit", fontSize:14 };
const th   = { textAlign:"left", padding:"10px 12px", fontSize:13, fontWeight:700, color:"#3d5c47" };
const td   = { padding:"11px 12px", fontSize:14, color:"#2d4034", verticalAlign:"middle" };
const pill = { display:"inline-block", padding:"4px 10px", borderRadius:999, fontSize:12, fontWeight:700 };

function chip(bg,color){ return { display:"inline-block", background:bg, color, padding:"3px 9px", borderRadius:999, fontSize:12, fontWeight:600 }; }
function btn(bg){ return { display:"inline-block", padding:"10px 16px", borderRadius:10, background:bg, color:"white", border:0, textDecoration:"none", fontWeight:700, cursor:"pointer", fontSize:14, whiteSpace:"nowrap" }; }
function mini(bg){ return { padding:"5px 9px", borderRadius:7, background:bg, color:"white", border:0, fontWeight:600, cursor:"pointer", fontSize:12 }; }
