"use client";

import { useEffect, useRef, useState } from "react";

export default function BillederPage() {
  const [images,     setImages]     = useState([]);
  const [loading,    setLoading]    = useState(true);
  const [uploading,  setUploading]  = useState(false);
  const [msg,        setMsg]        = useState("");
  const [copied,     setCopied]     = useState("");
  const fileRef = useRef(null);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/upload", { cache:"no-store" });
    const d   = await res.json();
    setImages(d.data || []);
    setLoading(false);
  }
  useEffect(() => { load(); }, []);

  function flash(t) { setMsg(t); setTimeout(()=>setMsg(""),3500); }

  async function upload(files) {
    if (!files?.length) return;
    setUploading(true);
    for (const file of files) {
      const form = new FormData();
      form.append("file", file);
      const res = await fetch("/api/upload", { method:"POST", body:form });
      if (!res.ok) { flash(`Fejl ved upload af ${file.name}`); }
    }
    flash(`${files.length} billede${files.length!==1?"r":""} uploadet ✓`);
    setUploading(false);
    load();
  }

  async function del(name) {
    if (!confirm(`Slet "${name}"?`)) return;
    await fetch("/api/upload", { method:"DELETE", headers:{"Content-Type":"application/json"}, body:JSON.stringify({name}) });
    load();
  }

  function copyUrl(url) {
    navigator.clipboard.writeText(url);
    setCopied(url);
    setTimeout(()=>setCopied(""),2000);
  }

  function onDrop(e) {
    e.preventDefault();
    upload(e.dataTransfer.files);
  }

  return (
    <>
      <div style={{ marginBottom:24 }}>
        <h1 style={h1}>Billeder</h1>
        <p style={sub}>Upload billeder til brug på hjemmesiden. Klik et billede for at kopiere URL'en til kurseditoren.</p>
      </div>

      {/* Upload zone */}
      <div style={card}>
        <div
          onDrop={onDrop}
          onDragOver={e=>e.preventDefault()}
          onClick={()=>fileRef.current?.click()}
          style={{ border:"2px dashed #cfd8d3", borderRadius:12, padding:"36px 24px", textAlign:"center", cursor:"pointer", background:"#fafcfb", transition:"border-color 0.2s" }}
        >
          <div style={{ fontSize:32, marginBottom:8 }}>📎</div>
          <div style={{ fontWeight:700, color:"#1f3a2b" }}>Træk billeder hertil eller klik for at vælge</div>
          <div style={{ fontSize:13, color:"#4b6355", marginTop:4 }}>JPG, PNG, WebP — maks 10 MB per fil</div>
          <input ref={fileRef} type="file" accept="image/*" multiple style={{ display:"none" }}
            onChange={e=>upload(e.target.files)} />
        </div>
        {uploading && <div style={{ marginTop:12, color:"#3d7a57", fontWeight:600 }}>Uploader…</div>}
        {msg && <div style={{ marginTop:12, padding:"10px 14px", borderRadius:10, background: msg.includes("Fejl") ? "#fbe4e2" : "#dff3e5", color: msg.includes("Fejl") ? "#9a2f27" : "#165c2c", fontWeight:600 }}>{msg}</div>}
      </div>

      {/* Billedgalleri */}
      <div style={{ marginTop:24 }}>
        <h2 style={{ ...h2, marginBottom:12 }}>Uploadede billeder ({images.length})</h2>
        {loading && <p style={{color:"#4b6355"}}>Henter…</p>}
        {!loading && images.length===0 && <div style={card}>Ingen billeder endnu.</div>}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(180px, 1fr))", gap:12 }}>
          {images.map(img=>(
            <div key={img.name} style={{ background:"white", borderRadius:12, overflow:"hidden", boxShadow:"0 2px 12px rgba(0,0,0,0.08)" }}>
              <div style={{ height:130, overflow:"hidden" }}>
                <img src={img.url} alt={img.name} style={{ width:"100%", height:"100%", objectFit:"cover" }} />
              </div>
              <div style={{ padding:"10px 12px" }}>
                <div style={{ fontSize:12, color:"#4b6355", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{img.name}</div>
                <div style={{ display:"flex", gap:6, marginTop:8 }}>
                  <button onClick={()=>copyUrl(img.url)} style={{ ...mini("#3d7a57"), flex:1 }}>
                    {copied===img.url ? "Kopieret!" : "Kopiér URL"}
                  </button>
                  <button onClick={()=>del(img.name)} style={mini("#8f2d20")}>✕</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

const h1   = { color:"#1f3a2b", fontSize:24, margin:0, fontWeight:800 };
const h2   = { color:"#1f3a2b", fontSize:17, margin:"0 0 16px", fontWeight:700 };
const sub  = { color:"#4b6355", fontSize:14, margin:"6px 0 0" };
const card = { background:"white", borderRadius:14, padding:24, boxShadow:"0 4px 18px rgba(0,0,0,0.06)" };
function mini(bg){ return { padding:"6px 10px",borderRadius:8,background:bg,color:"white",border:0,fontWeight:600,cursor:"pointer",fontSize:12 }; }
