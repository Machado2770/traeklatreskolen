"use client";

import { useState } from "react";
import Image from "next/image";

const VIDEOS = [
  { id: "x6FnqkbzkU4", title: "Rebklatring",                num: 1 },
  { id: "tIdUvaq5hPE", title: "Soloklatring",               num: 2 },
  { id: "Oqe-zdkxvWk", title: "Topanker",                   num: 3 },
  { id: "GRgke2LryfI", title: "Mellemsikringer",            num: 4 },
  { id: "djRSskBFYlY", title: "Nedfiring på dobbeltreb",    num: 5 },
  { id: "vBGkVVhdyVo", title: "At tage sig ud af systemet", num: 6 },
  { id: "6P5bmHiAssI", title: "Redning",                    num: 7 },
];

export default function VideoSection() {
  const [active, setActive] = useState(VIDEOS[0]);
  // Only autoplay after user explicitly clicks a thumbnail
  const [hasInteracted, setHasInteracted] = useState(false);

  function handleSelect(v) {
    setActive(v);
    setHasInteracted(true);
  }

  const embedSrc = `https://www.youtube-nocookie.com/embed/${active.id}?${hasInteracted ? "autoplay=1&" : ""}rel=0`;

  return (
    <section style={section}>
      <div style={inner}>

        {/* Header */}
        <div style={header}>
          <p style={eyebrow}>📹 Videovejledning</p>
          <h2 style={title}>Træklatring i praksis</h2>
          <p style={lead}>
            Videoerne er produceret af Træklatreskolen i regi af{" "}
            <strong style={{ color: "#d8782f" }}>DGI Storkøbenhavn</strong> og
            viser teknikker og metoder inden for træklatring. Klik på en video for at afspille.
          </p>
        </div>

        {/* Stor afspiller */}
        <div style={playerWrap}>
          <div style={playerBox}>
            <iframe
              key={active.id + String(hasInteracted)}
              src={embedSrc}
              title={active.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              style={{ position:"absolute", top:0, left:0, width:"100%", height:"100%", border:0, borderRadius:14 }}
            />
          </div>
          <div style={nowPlaying}>
            ▶ Afspiller: <strong>{active.num}. {active.title}</strong>
          </div>
        </div>

        {/* Thumbnail-grid */}
        <div style={grid}>
          {VIDEOS.map(v => {
            const isActive = v.id === active.id;
            return (
              <button key={v.id} onClick={() => handleSelect(v)} style={thumbBtn(isActive)}>
                <div style={thumbImgWrap}>
                  <Image
                    src={`https://img.youtube.com/vi/${v.id}/hqdefault.jpg`}
                    alt={v.title}
                    fill
                    style={{ objectFit: "cover", borderRadius: 8 }}
                    sizes="180px"
                    unoptimized
                  />
                  {isActive && (
                    <div style={playOverlay}>▶</div>
                  )}
                  <div style={numBadge}>{v.num}</div>
                </div>
                <div style={thumbTitle(isActive)}>{v.title}</div>
              </button>
            );
          })}
        </div>

        {/* Disclaimer + DGI */}
        <div style={bottom}>
          <div style={disclaimer}>
            <div style={disclaimerHead}>⚠ Vigtig vejledning</div>
            <p style={disclaimerText}>
              Vejledningen er kun ment som <strong>inspiration</strong> til træklatring og viser
              kun ÉT alternativ — kan ikke stå alene og skal altid suppleres af undervisning.
            </p>
            <p style={{ ...disclaimerText, marginTop: 8 }}>
              📱 Brug videovejledningen på din smartphone når du er i skoven.
            </p>
          </div>
          <div style={dgiBox}>
            <div style={dgiLabel}>Produceret i samarbejde med</div>
            <div style={dgiName}>DGI Storkøbenhavn</div>
            <div style={dgiSub}>Dansk Gymnastik- og Idrætsforbund</div>
            <a
              href="https://www.youtube.com/playlist?list=PLEgHi5tgtkfcciovbZqTTtlH3LwhToRf1"
              target="_blank"
              rel="noopener noreferrer"
              style={ytLink}
            >
              Se hele afspilningslisten på YouTube →
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}

/* ── STYLES ── */
const section = { background: "#1f3a2b", padding: "72px 24px" };
const inner   = { maxWidth: 1100, margin: "0 auto" };

const header  = { marginBottom: 36 };
const eyebrow = { fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, color: "#d8782f", margin: "0 0 10px" };
const title   = { fontSize: "clamp(26px, 3.5vw, 38px)", fontWeight: 800, color: "white", margin: "0 0 14px", lineHeight: 1.15 };
const lead    = { fontSize: 16, lineHeight: 1.75, color: "rgba(255,255,255,0.78)", margin: 0, maxWidth: 700 };

const playerWrap = { marginBottom: 28 };
const playerBox  = { position: "relative", paddingBottom: "56.25%", height: 0, overflow: "hidden", borderRadius: 14, boxShadow: "0 20px 60px rgba(0,0,0,0.5)" };
const nowPlaying = { marginTop: 10, fontSize: 14, color: "rgba(255,255,255,0.5)", textAlign: "center" };

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
  gap: 12,
  marginBottom: 36,
};

function thumbBtn(active) {
  return {
    background: "none",
    border: active ? "2px solid #d8782f" : "2px solid rgba(255,255,255,0.1)",
    borderRadius: 10,
    padding: 0,
    cursor: "pointer",
    textAlign: "left",
    overflow: "hidden",
    transition: "border-color 0.15s",
  };
}
const thumbImgWrap = { position: "relative", paddingBottom: "56.25%", height: 0, overflow: "hidden" };
function thumbTitle(active) {
  return {
    padding: "8px 10px",
    fontSize: 13,
    fontWeight: active ? 700 : 500,
    color: active ? "#d8782f" : "rgba(255,255,255,0.75)",
    lineHeight: 1.3,
    background: active ? "rgba(216,120,47,0.1)" : "transparent",
  };
}
const playOverlay = {
  position: "absolute", inset: 0, background: "rgba(0,0,0,0.45)",
  display: "flex", alignItems: "center", justifyContent: "center",
  fontSize: 28, color: "white", zIndex: 1,
};
const numBadge = {
  position: "absolute", top: 6, left: 6, background: "#d8782f",
  color: "white", fontSize: 11, fontWeight: 800, borderRadius: 6,
  padding: "2px 7px", zIndex: 2,
};

const bottom = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 };

const disclaimer = { background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderLeft: "4px solid #d8782f", borderRadius: 12, padding: "18px 20px" };
const disclaimerHead = { fontWeight: 700, color: "#d8782f", fontSize: 13, marginBottom: 8, letterSpacing: 0.5 };
const disclaimerText = { fontSize: 13, lineHeight: 1.7, color: "rgba(255,255,255,0.72)", margin: 0 };

const dgiBox  = { background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: "18px 20px", display: "flex", flexDirection: "column", gap: 4 };
const dgiLabel = { fontSize: 11, textTransform: "uppercase", letterSpacing: 1.5, color: "rgba(255,255,255,0.45)", fontWeight: 600 };
const dgiName  = { fontSize: 18, fontWeight: 800, color: "white" };
const dgiSub   = { fontSize: 12, color: "rgba(255,255,255,0.45)" };
const ytLink   = { marginTop: 8, fontSize: 13, color: "#d8782f", textDecoration: "none", fontWeight: 600 };
