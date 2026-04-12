"use client";

import { useEffect, useState } from "react";

const EMPTY = { name:"", email:"", password:"", role:"editor" };

export default function BrugerePage() {
  const [admins,  setAdmins]  = useState([]);
  const [loading, setLoading] = useState(true);
  const [form,    setForm]    = useState(EMPTY);
  const [msg,     setMsg]     = useState({ text:"", ok:true });

  async function load() {
    setLoading(true);
    const res = await fetch("/api/admins", { cache:"no-store" });
    const d   = await res.json();
    setAdmins(d.data || []);
    setLoading(false);
  }
  useEffect(() => { load(); }, []);

  function flash(text, ok=true) { setMsg({text,ok}); setTimeout(()=>setMsg({text:"",ok:true}),4000); }

  async function addAdmin() {
    if (!form.name || !form.email || !form.password) { flash("Navn, email og adgangskode er påkrævet.", false); return; }
    const res = await fetch("/api/admins", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(form) });
    const d   = await res.json();
    if (!res.ok) { flash(d.error || "Fejl", false); return; }
    flash("Bruger oprettet ✓");
    setForm(EMPTY); load();
  }

  async function del(id, name) {
    if (!confirm(`Slet "${name}"? Personen mister adgang til admin.`)) return;
    await fetch(`/api/admins/${id}`, { method:"DELETE" });
    load();
  }

  return (
    <>
      <div style={{ marginBottom:24 }}>
        <h1 style={h1}>Admin-brugere</h1>
        <p style={sub}>Tilføj og fjern brugere der kan logge ind på admin-siden.</p>
      </div>

      {/* Tilføj bruger */}
      <div style={card}>
        <h2 style={h2}>Tilføj ny bruger</h2>
        <div style={grid}>
          <Field label="Fulde navn *">
            <input style={inp} value={form.name} onChange={e=>setForm(p=>({...p,name:e.target.value}))} placeholder="Mette Hansen" />
          </Field>
          <Field label="Email *">
            <input style={inp} type="email" value={form.email} onChange={e=>setForm(p=>({...p,email:e.target.value}))} placeholder="mette@traeklatreskolen.dk" />
          </Field>
          <Field label="Adgangskode *">
            <input style={inp} type="password" value={form.password} onChange={e=>setForm(p=>({...p,password:e.target.value}))} placeholder="Mindst 8 tegn" />
          </Field>
          <Field label="Rolle">
            <select style={inp} value={form.role} onChange={e=>setForm(p=>({...p,role:e.target.value}))}>
              <option value="editor">Editor — kan redigere indhold</option>
              <option value="super">Super-admin — fuld adgang</option>
            </select>
          </Field>
        </div>
        <button onClick={addAdmin} style={{ ...btn("#3d7a57"), marginTop:16 }}>Opret bruger</button>
        {msg.text && (
          <div style={{ marginTop:12, padding:"10px 14px", borderRadius:10, fontWeight:600,
            background: msg.ok ? "#dff3e5" : "#fbe4e2", color: msg.ok ? "#165c2c" : "#9a2f27" }}>
            {msg.text}
          </div>
        )}
      </div>

      {/* Brugerliste */}
      <div style={{ marginTop:24 }}>
        <h2 style={{ ...h2, marginBottom:12 }}>Nuværende brugere</h2>
        {loading && <p style={{color:"#4b6355"}}>Henter…</p>}
        {!loading && admins.length===0 && (
          <div style={card}>
            <p style={{margin:0, color:"#4b6355"}}>Ingen brugere i databasen endnu.</p>
            <p style={{margin:"10px 0 0", fontSize:13, color:"#4b6355"}}>
              <strong>Bemærk:</strong> Indtil du tilføjer en bruger her, virker login stadig med brugernavn/adgangskode fra .env.local (admin / adminclimb).
            </p>
          </div>
        )}
        {admins.map(a=>(
          <div key={a.id} style={{ ...card, marginBottom:10, display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:12 }}>
            <div>
              <div style={{ fontWeight:700, color:"#1f3a2b" }}>{a.name}</div>
              <div style={{ fontSize:13, color:"#4b6355", marginTop:2 }}>
                {a.email} · <span style={{ fontWeight:600 }}>{a.role==="super" ? "Super-admin" : "Editor"}</span>
              </div>
              <div style={{ fontSize:12, color:"#8aab97", marginTop:2 }}>Oprettet {new Date(a.created_at).toLocaleDateString("da-DK")}</div>
            </div>
            <button onClick={()=>del(a.id, a.name)} style={btn("#8f2d20")}>Fjern adgang</button>
          </div>
        ))}
      </div>

      {/* Info boks */}
      <div style={{ ...card, marginTop:24, borderLeft:"4px solid #d8782f" }}>
        <div style={{ fontWeight:700, color:"#1f3a2b", marginBottom:8 }}>Sådan virker login</div>
        <p style={{ margin:0, fontSize:14, color:"#4b6355", lineHeight:1.7 }}>
          Brugere logger ind på <strong>/login</strong> med deres email og adgangskode.
          Adgangskoder gemmes krypteret (bcrypt) — ingen kan se dem, heller ikke dig.
          Hvis du glemmer en adgangskode, slet brugeren og opret en ny.
        </p>
      </div>
    </>
  );
}

function Field({ label, children }) {
  return (
    <label style={{ display:"block" }}>
      <div style={{ fontWeight:600, fontSize:13, color:"#1f3a2b", marginBottom:5 }}>{label}</div>
      {children}
    </label>
  );
}

const h1   = { color:"#1f3a2b", fontSize:24, margin:0, fontWeight:800 };
const h2   = { color:"#1f3a2b", fontSize:17, margin:"0 0 16px", fontWeight:700 };
const sub  = { color:"#4b6355", fontSize:14, margin:"6px 0 0" };
const card = { background:"white", borderRadius:14, padding:24, boxShadow:"0 4px 18px rgba(0,0,0,0.06)" };
const inp  = { width:"100%", padding:"10px 12px", borderRadius:10, border:"1px solid #cfd8d3", font:"inherit", fontSize:14, boxSizing:"border-box" };
const grid = { display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(240px, 1fr))", gap:16 };
function btn(bg){ return { padding:"10px 18px",borderRadius:10,background:bg,color:"white",border:0,fontWeight:700,cursor:"pointer",fontSize:14 }; }
