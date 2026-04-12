"use client";

import { useEffect, useState } from "react";

const MONTHS = { januar:0,februar:1,marts:2,april:3,maj:4,juni:5,juli:6,august:7,september:8,oktober:9,november:10,december:11 };
function parseDanishDate(str) {
  const m = (str||"").match(/(\d+)\.\s+(\w+)\s+(\d{4})/);
  if (!m) return null;
  const mo = MONTHS[m[2].toLowerCase()];
  return mo !== undefined ? new Date(+m[3], mo, +m[1]) : null;
}
function statusColors(s) {
  if (s==="paid")      return { background:"#dff3e5", color:"#165c2c" };
  if (s==="cancelled") return { background:"#fbe4e2", color:"#9a2f27" };
  return                      { background:"#f7eddc", color:"#7a4d08" };
}

export default function ArkivPage() {
  const [groups, setGroups] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/booking?limit=1000", { cache:"no-store" });
        const d   = await res.json();
        const rows = Array.isArray(d) ? d : Array.isArray(d.data) ? d.data : [];
        const now  = new Date(); now.setHours(0,0,0,0);
        const map  = {};
        rows.forEach(r => { const k=r.course||"Ukendt"; (map[k]||=[]).push(r); });
        const past = Object.entries(map).map(([key,ps]) => {
          const parts = key.split(" – ");
          const date  = parseDanishDate(parts[1]||"");
          return { key, name:parts[0], dateStr:parts[1]||"", place:parts[2]||"", date, ps };
        }).filter(g=>g.date && g.date<now).sort((a,b)=>b.date-a.date);
        setGroups(past);
      } catch { setGroups([]); }
      finally { setLoading(false); }
    })();
  }, []);

  return (
    <>
      <div style={{ marginBottom:24 }}>
        <h1 style={h1}>Arkiv — afholdte kurser</h1>
        <p style={sub}>Kurser hvis dato er passeret. Eksportér deltagerlister per kursus.</p>
      </div>

      {loading && <p style={{color:"#4b6355"}}>Henter arkiv…</p>}

      {!loading && groups?.length===0 && (
        <div style={card}>Ingen afholdte kurser endnu. De vises automatisk når datoen passerer.</div>
      )}

      {groups?.map(g => (
        <div key={g.key} style={{...card, marginBottom:16}}>
          <div style={{ display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:12, marginBottom:14 }}>
            <div>
              <div style={{ fontWeight:700, fontSize:17, color:"#1f3a2b" }}>{g.name}</div>
              <div style={{ display:"flex", gap:6, marginTop:6, flexWrap:"wrap" }}>
                {g.dateStr && <span style={chip("#f5e5d8","#a3521d")}>{g.dateStr}</span>}
                {g.place   && <span style={chip("#e7efe9","#2d5c3e")}>{g.place}</span>}
                <span style={chip("#e9f0ff","#2a3f8a")}>{g.ps.length} deltager{g.ps.length!==1?"e":""}</span>
              </div>
            </div>
            <a href={`/api/participants/export?course=${encodeURIComponent(g.key)}`} style={btn("#d8782f")}>
              Eksportér deltagerliste
            </a>
          </div>
          <div style={{ overflowX:"auto" }}>
            <table style={{ width:"100%", borderCollapse:"collapse" }}>
              <thead>
                <tr style={{ background:"#eef3ef" }}>
                  {["Navn","Email","Telefon","Status","Oprettet"].map(l=>(
                    <th key={l} style={th}>{l}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {g.ps.map(r=>(
                  <tr key={r.id} style={{ borderBottom:"1px solid #eef3ef" }}>
                    <td style={td}>{r.name}</td>
                    <td style={td}>{r.email}</td>
                    <td style={td}>{r.phone||"—"}</td>
                    <td style={td}><span style={{...pill,...statusColors(r.payment_status)}}>
                      {r.payment_status==="paid"?"Betalt":r.payment_status==="cancelled"?"Annulleret":"Afventer"}
                    </span></td>
                    <td style={td}>{r.created_at ? new Date(r.created_at).toLocaleString("da-DK") : "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </>
  );
}

const h1   = { color:"#1f3a2b", fontSize:24, margin:0, fontWeight:800 };
const sub  = { color:"#4b6355", fontSize:14, margin:"6px 0 0" };
const card = { background:"white", borderRadius:14, padding:20, boxShadow:"0 4px 18px rgba(0,0,0,0.06)" };
const th   = { textAlign:"left", padding:"10px 12px", fontSize:13, fontWeight:700, color:"#3d5c47" };
const td   = { padding:"11px 12px", fontSize:14, color:"#2d4034", verticalAlign:"middle" };
const pill = { display:"inline-block", padding:"4px 10px", borderRadius:999, fontSize:12, fontWeight:700 };
function chip(bg,color){ return { display:"inline-block",background:bg,color,padding:"3px 9px",borderRadius:999,fontSize:12,fontWeight:600 }; }
function btn(bg){ return { display:"inline-block",padding:"10px 16px",borderRadius:10,background:bg,color:"white",border:0,textDecoration:"none",fontWeight:700,cursor:"pointer",fontSize:14 }; }
