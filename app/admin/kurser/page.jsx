"use client";

import { useEffect, useState } from "react";

const EMPTY = { slug:"", title:"", short:"", price:"", level:"", description:"", bullets:"", image:"", booking_href:"", is_experience:false };

export default function KurserAdminPage() {
  const [items,   setItems]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [form,    setForm]    = useState(EMPTY);
  const [editing, setEditing] = useState(null);
  const [msg,     setMsg]     = useState("");
  const [images,  setImages]  = useState([]);

  async function load() {
    setLoading(true);
    const [cr, ir] = await Promise.all([
      fetch("/api/courses-cms", { cache:"no-store" }),
      fetch("/api/upload",      { cache:"no-store" }),
    ]);
    const cd = await cr.json(); setItems(cd.data || []);
    const id = await ir.json(); setImages(id.data || []);
    setLoading(false);
  }
  useEffect(() => { load(); }, []);

  function flash(t) { setMsg(t); setTimeout(()=>setMsg(""),3500); }

  async function save() {
    if (!form.title) { flash("Titel er påkrævet."); return; }
    const slug = form.slug || form.title.toLowerCase().replace(/\s+/g,"-").replace(/[æ]/g,"ae").replace(/[ø]/g,"oe").replace(/[å]/g,"aa").replace(/[^a-z0-9-]/g,"");
    const payload = { ...form, slug, bullets: form.bullets ? form.bullets.split("\n").map(b=>b.trim()).filter(Boolean) : [] };

    const method = editing ? "PUT" : "POST";
    const url    = editing ? `/api/courses-cms/${editing}` : "/api/courses-cms";
    const res    = await fetch(url, { method, headers:{"Content-Type":"application/json"}, body:JSON.stringify(payload) });
    if (!res.ok) { flash("Fejl ved gemning."); return; }
    flash(editing ? "Opdateret ✓" : "Oprettet ✓");
    setForm(EMPTY); setEditing(null); load();
  }

  async function del(id) {
    if (!confirm("Slet dette kursus/denne oplevelse?")) return;
    await fetch(`/api/courses-cms/${id}`, { method:"DELETE" });
    load();
  }

  function startEdit(item) {
    setEditing(item.id);
    setForm({ ...item, bullets: (item.bullets||[]).join("\n") });
    window.scrollTo(0, 0);
  }

  const kurser     = items.filter(i=>!i.is_experience);
  const oplevelser = items.filter(i=> i.is_experience);

  return (
    <>
      <div style={{ marginBottom:24 }}>
        <h1 style={h1}>Kurser & tekst</h1>
        <p style={sub}>Rediger kursusbeskrivelser, priser og billeder. Ændringer vises øjeblikkeligt på hjemmesiden.</p>
      </div>

      {/* Formular */}
      <div style={card}>
        <h2 style={h2}>{editing ? "Rediger" : "Tilføj nyt kursus / oplevelse"}</h2>
        <div style={grid2}>
          <Field label="Titel *">
            <input style={inp} value={form.title} onChange={e=>setForm(p=>({...p,title:e.target.value}))} placeholder="Begynder i træklatring" />
          </Field>
          <Field label="Kort beskrivelse">
            <input style={inp} value={form.short} onChange={e=>setForm(p=>({...p,short:e.target.value}))} placeholder="Kom trygt i gang med træklatring" />
          </Field>
          <Field label="Pris">
            <input style={inp} value={form.price} onChange={e=>setForm(p=>({...p,price:e.target.value}))} placeholder="1.900 kr." />
          </Field>
          <Field label="Niveau">
            <input style={inp} value={form.level} onChange={e=>setForm(p=>({...p,level:e.target.value}))} placeholder="Begynder" />
          </Field>
          <Field label="Booking href">
            <input style={inp} value={form.booking_href} onChange={e=>setForm(p=>({...p,booking_href:e.target.value}))} placeholder="/booking?course=..." />
          </Field>
          <Field label="Type">
            <select style={inp} value={form.is_experience?"exp":"kursus"} onChange={e=>setForm(p=>({...p,is_experience:e.target.value==="exp"}))}>
              <option value="kursus">Kursus</option>
              <option value="exp">Oplevelse</option>
            </select>
          </Field>
        </div>
        <Field label="Beskrivelse (lang tekst)">
          <textarea style={{...inp, marginTop:16}} rows={4} value={form.description} onChange={e=>setForm(p=>({...p,description:e.target.value}))} placeholder="Beskrivelse der vises på kursets detaljeside…" />
        </Field>
        <Field label="Bullet-punkter (ét per linje)">
          <textarea style={{...inp, marginTop:12}} rows={5} value={form.bullets} onChange={e=>setForm(p=>({...p,bullets:e.target.value}))}
            placeholder={"Introduktion til udstyr\nGrundlæggende klatreteknik\nSikkerhed i praksis"} />
        </Field>

        {/* Billedvælger */}
        <div style={{ marginTop:16 }}>
          <div style={{ fontWeight:600, fontSize:13, color:"#1f3a2b", marginBottom:8 }}>Billede</div>
          <input style={inp} value={form.image} onChange={e=>setForm(p=>({...p,image:e.target.value}))} placeholder="/images/gallery-main.jpg eller Supabase URL" />
          {images.length>0 && (
            <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginTop:10 }}>
              {images.map(img=>(
                <div key={img.name} onClick={()=>setForm(p=>({...p,image:img.url}))}
                  style={{ cursor:"pointer", borderRadius:8, overflow:"hidden", border: form.image===img.url ? "3px solid #d8782f" : "3px solid transparent", width:80, height:60 }}>
                  <img src={img.url} alt={img.name} style={{ width:"100%", height:"100%", objectFit:"cover" }} />
                </div>
              ))}
            </div>
          )}
          {images.length===0 && <p style={{ fontSize:13, color:"#4b6355", marginTop:6 }}>Upload billeder under "Billeder" for at vælge her.</p>}
        </div>

        <div style={{ display:"flex", gap:10, marginTop:20 }}>
          <button onClick={save} style={btn("#3d7a57")}>{editing ? "Gem ændringer" : "Opret"}</button>
          {editing && <button onClick={()=>{setEditing(null);setForm(EMPTY);}} style={btn("#8f8f8f")}>Annullér</button>}
        </div>
        {msg && <div style={{ marginTop:12, padding:"10px 14px", borderRadius:10, background: msg.includes("Fejl") ? "#fbe4e2" : "#dff3e5", color: msg.includes("Fejl") ? "#9a2f27" : "#165c2c", fontWeight:600 }}>{msg}</div>}
      </div>

      {/* Lister */}
      {loading && <p style={{color:"#4b6355", marginTop:20}}>Henter…</p>}

      {!loading && <CourseList title="Kurser" items={kurser} onEdit={startEdit} onDelete={del} />}
      {!loading && <CourseList title="Oplevelser" items={oplevelser} onEdit={startEdit} onDelete={del} />}
    </>
  );
}

function CourseList({ title, items, onEdit, onDelete }) {
  if (!items.length) return null;
  return (
    <div style={{ marginTop:24 }}>
      <h2 style={{ ...h2, marginBottom:12 }}>{title} ({items.length})</h2>
      {items.map(item=>(
        <div key={item.id} style={{ ...card, marginBottom:10, display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:12 }}>
          <div style={{ display:"flex", gap:14, alignItems:"center" }}>
            {item.image && (
              <div style={{ width:56, height:42, borderRadius:8, overflow:"hidden", flexShrink:0 }}>
                <img src={item.image} alt="" style={{ width:"100%", height:"100%", objectFit:"cover" }} />
              </div>
            )}
            <div>
              <div style={{ fontWeight:700, color:"#1f3a2b" }}>{item.title}</div>
              <div style={{ fontSize:13, color:"#4b6355", marginTop:2 }}>{item.price} · {item.level}</div>
            </div>
          </div>
          <div style={{ display:"flex", gap:8 }}>
            <button onClick={()=>onEdit(item)} style={btn("#3d7a57")}>Rediger</button>
            <button onClick={()=>onDelete(item.id)} style={btn("#8f2d20")}>Slet</button>
          </div>
        </div>
      ))}
    </div>
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
const grid2 = { display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(260px, 1fr))", gap:16, marginBottom:4 };
function btn(bg){ return { padding:"10px 18px",borderRadius:10,background:bg,color:"white",border:0,fontWeight:700,cursor:"pointer",fontSize:14 }; }
