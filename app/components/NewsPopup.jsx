"use client";

import { useEffect, useState } from "react";

// Vis-én-gang-nøgle. Bump tallet hvis nyheden ændres og skal vises igen.
const STORAGE_KEY = "news-popup-organisationer-v1";

export default function NewsPopup() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let dismissed = false;
    try {
      dismissed = window.localStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      // localStorage utilgængelig (privat browsing) — vis alligevel
    }
    if (dismissed) return;
    const t = setTimeout(() => setShow(true), 1200);
    return () => clearTimeout(t);
  }, []);

  function close() {
    setShow(false);
    try {
      window.localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // ignorér
    }
  }

  if (!show) return null;

  return (
    <div style={wrap}>
      <div style={modal} role="dialog" aria-label="Nyhed">
        <button onClick={close} style={closeBtn} aria-label="Luk">×</button>

        <p style={badge}>Nyt</p>
        <h2 style={title}>Træklatring for organisationer</h2>

        <div style={body}>
          <p style={text}>Vil I uddanne egne medarbejdere i sikker træklatring?</p>
          <p style={text}>
            Træklatreskolen åbner nu for nogle få pilotforløb for skoler,
            institutioner, naturskoler og friluftsorganisationer, der vil opbygge
            egne kompetencer i træklatring.
          </p>
          <p style={text}>
            Forløbet er for op til 6 medarbejdere og samler instruktøruddannelse,
            faste sikkerhedsprocedurer (SOP – nedskrevne arbejdsgange for sikker
            gennemførelse), risikovurdering og praktisk træning i én samlet pakke
            — så I selv kan gennemføre træklatring trygt og fagligt stærkt
            bagefter.
          </p>
        </div>

        <a href="/organisationer" style={cta} onClick={close}>Læs mere</a>
      </div>

      <style>{`
        @keyframes newspop-in {
          from { opacity: 0; transform: translateY(16px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)    scale(1); }
        }
        @keyframes newspop-fade {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

// Diskret hjørne-toast nederst til højre — dækker ikke siden, og resten
// af siden forbliver klikbar (pointerEvents: none på wrapperen).
const wrap = {
  position: "fixed",
  right: 20,
  bottom: 20,
  zIndex: 100,
  width: 340,
  maxWidth: "calc(100vw - 32px)",
  pointerEvents: "none",
  animation: "newspop-fade 0.25s ease",
};

const modal = {
  position: "relative",
  pointerEvents: "auto",
  background: "white",
  borderRadius: 18,
  width: "100%",
  padding: "22px 22px 22px",
  boxShadow: "0 16px 48px rgba(0,0,0,0.26)",
  animation: "newspop-in 0.32s cubic-bezier(0.16,1,0.3,1)",
  borderTop: "5px solid #d8782f",
};

const closeBtn = {
  position: "absolute",
  top: 12,
  right: 14,
  width: 36,
  height: 36,
  border: "none",
  background: "#f0f4f1",
  borderRadius: 10,
  fontSize: 24,
  lineHeight: 1,
  color: "#4b6355",
  cursor: "pointer",
};

const badge = {
  display: "inline-block",
  background: "#d8782f",
  color: "white",
  fontSize: 12,
  fontWeight: 800,
  letterSpacing: 1.5,
  textTransform: "uppercase",
  padding: "5px 12px",
  borderRadius: 999,
  margin: "0 0 14px",
};

const title = {
  fontSize: 20,
  fontWeight: 800,
  color: "#1f3a2b",
  margin: "0 0 12px",
  lineHeight: 1.25,
};

const body = {
  display: "flex",
  flexDirection: "column",
  gap: 9,
  marginBottom: 18,
};

const text = {
  margin: 0,
  fontSize: 14,
  lineHeight: 1.6,
  color: "#4b6355",
};

const cta = {
  display: "inline-block",
  background: "#d8782f",
  color: "white",
  textDecoration: "none",
  padding: "11px 22px",
  borderRadius: 10,
  fontWeight: 700,
  fontSize: 14.5,
  boxShadow: "0 4px 16px rgba(216,120,47,0.35)",
};
