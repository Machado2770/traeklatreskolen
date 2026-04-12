"use client";

import { useEffect, useRef, useState } from "react";

const VIDEO_EXTS = ["mp4", "mov", "webm", "m4v", "avi", "mkv"];

function isVideo(name) {
  const ext = name.split(".").pop().toLowerCase();
  return VIDEO_EXTS.includes(ext);
}

export default function BillederPage() {
  const [media,      setMedia]      = useState([]);
  const [loading,    setLoading]    = useState(true);
  const [uploading,  setUploading]  = useState(false);
  const [progress,   setProgress]   = useState("");
  const [msg,        setMsg]        = useState("");
  const [copied,     setCopied]     = useState("");
  const fileRef = useRef(null);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/upload", { cache: "no-store" });
    const d   = await res.json();
    setMedia(d.data || []);
    setLoading(false);
  }
  useEffect(() => { load(); }, []);

  function flash(t) { setMsg(t); setTimeout(() => setMsg(""), 4000); }

  async function upload(files) {
    if (!files?.length) return;
    setUploading(true);
    let ok = 0, fail = 0;

    for (const file of files) {
      setProgress(`Uploader ${file.name}…`);
      try {
        // Hent signed URL fra API (ingen størrelsesbegrænsning)
        const signed = await fetch("/api/upload/signed", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ filename: file.name, contentType: file.type }),
        }).then(r => r.json());

        if (!signed.ok) throw new Error(signed.error);

        // Upload direkte til Supabase (browser → Supabase, ingen Vercel-grænse)
        const put = await fetch(signed.signedUrl, {
          method: "PUT",
          headers: { "Content-Type": file.type },
          body: file,
        });

        if (!put.ok) throw new Error("Upload fejlede");
        ok++;
      } catch (e) {
        console.error(e);
        fail++;
      }
    }

    setProgress("");
    flash(fail > 0
      ? `${ok} uploadet, ${fail} fejlede`
      : `${ok} fil${ok !== 1 ? "er" : ""} uploadet ✓`
    );
    setUploading(false);
    load();
  }

  async function del(name) {
    if (!confirm(`Slet "${name}"?`)) return;
    await fetch("/api/upload", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    load();
  }

  function copyUrl(url) {
    navigator.clipboard.writeText(url);
    setCopied(url);
    setTimeout(() => setCopied(""), 2000);
  }

  function onDrop(e) {
    e.preventDefault();
    upload(e.dataTransfer.files);
  }

  const images = media.filter(f => !isVideo(f.name));
  const videos = media.filter(f => isVideo(f.name));

  return (
    <>
      <div style={{ marginBottom: 24 }}>
        <h1 style={h1}>Billeder & Videoer</h1>
        <p style={sub}>
          Upload billeder og videoer til brug på hjemmesiden. Klik på en fil for at kopiere URL'en.
          Ingen størrelsesgrænse — videoer uploades direkte til serveren.
        </p>
      </div>

      {/* Upload zone */}
      <div style={card}>
        <div
          onDrop={onDrop}
          onDragOver={e => e.preventDefault()}
          onClick={() => fileRef.current?.click()}
          style={dropZone}
        >
          <div style={{ fontSize: 32, marginBottom: 8 }}>📎</div>
          <div style={{ fontWeight: 700, color: "#1f3a2b" }}>
            Træk billeder eller videoer hertil — eller klik for at vælge
          </div>
          <div style={{ fontSize: 13, color: "#4b6355", marginTop: 4 }}>
            JPG, PNG, WebP, MP4, MOV, WebM — ingen størrelsesgrænse
          </div>
          <input
            ref={fileRef}
            type="file"
            accept="image/*,video/*,.mov,.mp4,.webm,.m4v"
            multiple
            style={{ display: "none" }}
            onChange={e => upload(e.target.files)}
          />
        </div>
        {uploading && (
          <div style={{ marginTop: 12, color: "#3d7a57", fontWeight: 600 }}>
            {progress || "Uploader…"}
          </div>
        )}
        {msg && (
          <div style={{
            marginTop: 12, padding: "10px 14px", borderRadius: 10,
            background: msg.includes("fejl") ? "#fbe4e2" : "#dff3e5",
            color: msg.includes("fejl") ? "#9a2f27" : "#165c2c",
            fontWeight: 600,
          }}>
            {msg}
          </div>
        )}
      </div>

      {/* Billeder */}
      <div style={{ marginTop: 28 }}>
        <h2 style={{ ...h2, marginBottom: 12 }}>Billeder ({images.length})</h2>
        {loading && <p style={{ color: "#4b6355" }}>Henter…</p>}
        {!loading && images.length === 0 && <div style={card}>Ingen billeder endnu.</div>}
        <div style={grid}>
          {images.map(img => (
            <MediaCard key={img.name} item={img} onCopy={copyUrl} onDel={del} copied={copied} isVideo={false} />
          ))}
        </div>
      </div>

      {/* Videoer */}
      <div style={{ marginTop: 28 }}>
        <h2 style={{ ...h2, marginBottom: 12 }}>Videoer ({videos.length})</h2>
        {!loading && videos.length === 0 && <div style={card}>Ingen videoer endnu.</div>}
        <div style={grid}>
          {videos.map(vid => (
            <MediaCard key={vid.name} item={vid} onCopy={copyUrl} onDel={del} copied={copied} isVideo={true} />
          ))}
        </div>
      </div>
    </>
  );
}

function MediaCard({ item, onCopy, onDel, copied, isVideo }) {
  return (
    <div style={mediaCard}>
      <div style={{ height: 130, overflow: "hidden", background: "#111" }}>
        {isVideo ? (
          <video
            src={item.url}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            muted
            preload="metadata"
          />
        ) : (
          <img
            src={item.url}
            alt={item.name}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        )}
      </div>
      <div style={{ padding: "10px 12px" }}>
        <div style={{ fontSize: 12, color: "#4b6355", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          {item.name}
        </div>
        <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
          <button onClick={() => onCopy(item.url)} style={{ ...mini("#3d7a57"), flex: 1 }}>
            {copied === item.url ? "Kopieret!" : "Kopiér URL"}
          </button>
          <button onClick={() => onDel(item.name)} style={mini("#8f2d20")}>✕</button>
        </div>
      </div>
    </div>
  );
}

const h1      = { color: "#1f3a2b", fontSize: 24, margin: 0, fontWeight: 800 };
const h2      = { color: "#1f3a2b", fontSize: 17, margin: "0 0 16px", fontWeight: 700 };
const sub     = { color: "#4b6355", fontSize: 14, margin: "6px 0 0" };
const card    = { background: "white", borderRadius: 14, padding: 24, boxShadow: "0 4px 18px rgba(0,0,0,0.06)" };
const mediaCard = { background: "white", borderRadius: 12, overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.08)" };
const grid    = { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 12 };
const dropZone = { border: "2px dashed #cfd8d3", borderRadius: 12, padding: "36px 24px", textAlign: "center", cursor: "pointer", background: "#fafcfb" };
function mini(bg) {
  return { padding: "6px 10px", borderRadius: 8, background: bg, color: "white", border: 0, fontWeight: 600, cursor: "pointer", fontSize: 12 };
}
