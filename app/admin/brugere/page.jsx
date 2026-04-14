"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const EMPTY = { name:"", email:"", password:"", role:"editor" };

export default function BrugerePage() {
  const { data: session } = useSession();
  const isSuper = session?.user?.role === "super";

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
    if (!confirm(`Fjern "${name}"? Personen mister adgang til admin.`)) return;
    const res = await fetch(`/api/admins/${id}`, { method:"DELETE" });
    const d   = await res.json();
    if (!res.ok) { flash(d.error || "Fejl", false); return; }
    load();
  }

  return (
    <>
      <div style={{ marginBottom:24 }}>
        <h1 style={h1}>Admin-brugere</h1>
        <p style={sub}>
          {isSuper
            ? "Opret og fjern brugere der kan logge ind på admin-siden."
            : "Oversigt over brugere med adgang til admin. Kun super-admin kan oprette og fjerne brugere."}
        </p>
      </div>

      {/* Rolle-advarsel til editor */}
      {!isSuper && (
        <div style={restrictedBox}>
          <span style={{ fontSize: 20 }}>🔒</span>
          <div>
            <strong>Begrænset adgang</strong> — du er logget ind som <strong>Editor</strong>.
            Du kan se brugerlisten, men kun en super-admin kan oprette eller fjerne brugere.
          </div>
        </div>
      )}

      {/* Tilføj bruger — kun super-admin */}
      {isSuper && (
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
      )}

      {/* Brugerliste */}
      <div style={{ marginTop:24 }}>
        <h2 style={{ ...h2, marginBottom:12 }}>Nuværende brugere</h2>
        {loading && <p style={{color:"#4b6355"}}>Henter…</p>}
        {!loading && admins.length===0 && (
          <div style={card}>
            <p style={{margin:0, color:"#4b6355"}}>Ingen brugere i databasen endnu.</p>
            <p style={{margin:"10px 0 0", fontSize:13, color:"#4b6355"}}>
              <strong>Bemærk:</strong> Indtil du tilføjer en bruger her, virker login med brugernavn/adgangskode fra .env.local.
            </p>
          </div>
        )}
        {admins.map(a=>(
          <div key={a.id} style={{ ...card, marginBottom:10, display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:12 }}>
            <div>
              <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                <span style={{ fontWeight:700, color:"#1f3a2b" }}>{a.name}</span>
                <span style={{
                  fontSize:11, fontWeight:700, padding:"2px 8px", borderRadius:999,
                  background: a.role==="super" ? "#1f3a2b" : "#e7efe9",
                  color:      a.role==="super" ? "white"   : "#1f3a2b",
                }}>
                  {a.role==="super" ? "Super-admin" : "Editor"}
                </span>
              </div>
              <div style={{ fontSize:13, color:"#4b6355", marginTop:3 }}>{a.email}</div>
              <div style={{ fontSize:12, color:"#8aab97", marginTop:2 }}>Oprettet {new Date(a.created_at).toLocaleDateString("da-DK")}</div>
            </div>
            {isSuper && (
              <button onClick={()=>del(a.id, a.name)} style={btn("#8f2d20")}>Fjern adgang</button>
            )}
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
        <div style={{ marginTop:12, fontSize:14, color:"#4b6355", lineHeight:1.7 }}>
          <strong>Roller:</strong><br/>
          <strong>Editor</strong> — kan se og redigere kurser, kalender, billeder og tilmeldinger.<br/>
          <strong>Super-admin</strong> — fuld adgang, herunder oprettelse og fjernelse af brugere.
        </div>
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
const restrictedBox = {
  display:"flex", gap:14, alignItems:"flex-start",
  background:"#fff8f0", border:"1px solid #f0d0a8", borderRadius:12,
  padding:"16px 20px", marginBottom:24, color:"#7a4510", fontSize:14, lineHeight:1.7,
};
function btn(bg){ return { padding:"10px 18px",borderRadius:10,background:bg,color:"white",border:0,fontWeight:700,cursor:"pointer",fontSize:14 }; }
