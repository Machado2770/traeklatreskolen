"use client";

import { useEffect, useRef, useState } from "react";

const VIDEO_EXTS = ["mp4", "mov", "webm", "m4v", "avi", "mkv"];

function isVideo(name) {
  const ext = (name.split(".").pop() || "").toLowerCase();
  return VIDEO_EXTS.includes(ext);
}

// Fallback MIME-type når browser ikke rapporterer file.type (fx .mov)
function getMimeType(file) {
  if (file.type) return file.type;
  const ext = (file.name.split(".").pop() || "").toLowerCase();
  const map = {
    mp4: "video/mp4",
    mov: "video/quicktime",
    webm: "video/webm",
    m4v:  "video/mp4",
    avi:  "video/x-msvideo",
    mkv:  "video/x-matroska",
    jpg:  "image/jpeg",
    jpeg: "image/jpeg",
    png:  "image/png",
    webp: "image/webp",
    gif:  "image/gif",
  };
  return map[ext] || "application/octet-stream";
}

export default function BillederPage() {
  const [media,     setMedia]     = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [uploading, setUploading] = useState(false);
  const [progress,  setProgress]  = useState("");
  const [msg,       setMsg]       = useState({ text: "", ok: true });
  const [copied,    setCopied]    = useState("");
  const fileRef = useRef(null);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/upload", { cache: "no-store" });
    const d   = await res.json();
    setMedia(d.data || []);
    setLoading(false);
  }
  useEffect(() => { load(); }, []);

  function flash(text, ok = true) {
    setMsg({ text, ok });
    setTimeout(() => setMsg({ text: "", ok: true }), 5000);
  }

  async function upload(files) {
    if (!files?.length) return;
    setUploading(true);
    let ok = 0;
    const errors = [];
    const MAX_MB = 50;

    for (const file of files) {
      const sizeMB = file.size / 1024 / 1024;
      setProgress(`Uploader ${file.name} (${sizeMB.toFixed(1)} MB)…`);
      try {
        if (sizeMB > MAX_MB) {
          throw new Error(
            `Filen er ${sizeMB.toFixed(0)} MB — Supabase tillader max ${MAX_MB} MB. ` +
            `Komprimér videoen (fx med HandBrake) eller upload til YouTube og brug YouTube-linket i stedet.`
          );
        }

        const contentType = getMimeType(file);

        // 1. Hent signed URL fra API
        const signedRes = await fetch("/api/upload/signed", {
          method:  "POST",
          headers: { "Content-Type": "application/json" },
          body:    JSON.stringify({ filename: file.name, contentType }),
        });
        const signed = await signedRes.json();
        if (!signed.ok) throw new Error(`Signed URL fejl: ${signed.error}`);

        // 2. PUT direkte til Supabase (ingen Vercel-grænse)
        const put = await fetch(signed.signedUrl, {
          method:  "PUT",
          headers: { "Content-Type": contentType },
          body:    file,
        });

        if (!put.ok) {
          const body = await put.text().catch(() => "(ingen detaljer)");
          throw new Error(`Supabase afviste filen (${put.status}): ${body.slice(0, 120)}`);
        }

        ok++;
      } catch (e) {
        console.error("Upload fejl:", e);
        errors.push(`${file.name}: ${e.message}`);
      }
    }

    setProgress("");
    setUploading(false);

    if (errors.length) {
      flash(`${ok} uploadet — ${errors.length} fejlede:\n${errors.join("\n")}`, false);
    } else {
      flash(`${ok} fil${ok !== 1 ? "er" : ""} uploadet ✓`);
    }

    load();
  }

  async function del(name) {
    if (!confirm(`Slet "${name}"?`)) return;
    await fetch("/api/upload", {
      method:  "DELETE",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ name }),
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
  const videos = media.filter(f =>  isVideo(f.name));

  return (
    <>
      <div style={{ marginBottom: 24 }}>
        <h1 style={h1}>Billeder & Videoer</h1>
        <p style={sub}>
          Upload billeder og videoer. Klik på en fil for at kopiere URL'en.
          Store videofiler uploades direkte — ingen størrelsesgrænse.
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
            Træk filer hertil — eller klik for at vælge
          </div>
          <div style={{ fontSize: 13, color: "#4b6355", marginTop: 4 }}>
            JPG, PNG, WebP · MP4, MOV, WebM, M4V — ingen størrelsesgrænse
          </div>
          <input
            ref={fileRef}
            type="file"
            accept="image/*,video/*,.mov,.mp4,.webm,.m4v,.avi,.mkv"
            multiple
            style={{ display: "none" }}
            onChange={e => upload(e.target.files)}
          />
        </div>

        {uploading && (
          <div style={{ marginTop: 14, display: "flex", alignItems: "center", gap: 10 }}>
            <div style={spinner} />
            <span style={{ color: "#3d7a57", fontWeight: 600, fontSize: 14 }}>
              {progress || "Uploader…"}
            </span>
          </div>
        )}

        {msg.text && (
          <div style={{
            marginTop: 12, padding: "12px 16px", borderRadius: 10, whiteSpace: "pre-wrap",
            background: msg.ok ? "#dff3e5" : "#fbe4e2",
            color:      msg.ok ? "#165c2c" : "#9a2f27",
            fontWeight: 600, fontSize: 14,
          }}>
            {msg.text}
          </div>
        )}
      </div>

      {/* Billeder */}
      <div style={{ marginTop: 28 }}>
        <h2 style={{ ...h2, marginBottom: 12 }}>Billeder ({images.length})</h2>
        {loading && <p style={{ color: "#4b6355" }}>Henter…</p>}
        {!loading && images.length === 0 && <div style={emptyBox}>Ingen billeder endnu.</div>}
        <div style={grid}>
          {images.map(img => (
            <MediaCard key={img.name} item={img} onCopy={copyUrl} onDel={del} copied={copied} video={false} />
          ))}
        </div>
      </div>

      {/* Videoer */}
      <div style={{ marginTop: 28 }}>
        <h2 style={{ ...h2, marginBottom: 12 }}>Videoer ({videos.length})</h2>
        {!loading && videos.length === 0 && <div style={emptyBox}>Ingen videoer endnu.</div>}
        <div style={grid}>
          {videos.map(vid => (
            <MediaCard key={vid.name} item={vid} onCopy={copyUrl} onDel={del} copied={copied} video={true} />
          ))}
        </div>
      </div>
    </>
  );
}

function MediaCard({ item, onCopy, onDel, copied, video }) {
  return (
    <div style={mediaCard}>
      <div style={{ height: 130, overflow: "hidden", background: "#0e1e14" }}>
        {video ? (
          <video
            src={item.url}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            muted preload="metadata"
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
        <div style={{ fontSize: 11, color: "#4b6355", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
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

/* ── STYLES ── */
const h1       = { color: "#1f3a2b", fontSize: 24, margin: 0, fontWeight: 800 };
const h2       = { color: "#1f3a2b", fontSize: 17, margin: "0 0 16px", fontWeight: 700 };
const sub      = { color: "#4b6355", fontSize: 14, margin: "6px 0 0" };
const card     = { background: "white", borderRadius: 14, padding: 24, boxShadow: "0 4px 18px rgba(0,0,0,0.06)" };
const emptyBox = { background: "white", borderRadius: 14, padding: "16px 20px", color: "#4b6355", fontSize: 14, boxShadow: "0 4px 18px rgba(0,0,0,0.06)" };
const mediaCard = { background: "white", borderRadius: 12, overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.08)" };
const grid     = { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 12 };
const dropZone = { border: "2px dashed #cfd8d3", borderRadius: 12, padding: "36px 24px", textAlign: "center", cursor: "pointer", background: "#fafcfb" };
const spinner  = {
  width: 18, height: 18, borderRadius: "50%", flexShrink: 0,
  border: "2px solid #c8e6d4", borderTopColor: "#3d7a57",
  animation: "spin 0.8s linear infinite",
};

function mini(bg) {
  return { padding: "6px 10px", borderRadius: 8, background: bg, color: "white", border: 0, fontWeight: 600, cursor: "pointer", fontSize: 12 };
}
