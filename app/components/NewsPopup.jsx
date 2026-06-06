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
    <div style={overlay} onClick={close} role="dialog" aria-modal="true" aria-label="Nyhed">
      <div style={modal} onClick={(e) => e.stopPropagation()}>
        <button onClick={close} style={closeBtn} aria-label="Luk">×</button>

        <p style={badge}>Nyt</p>
        <h2 style={title}>Træklatring for organisationer</h2>

        <div style={body}>
          <p style={text}>Vil I uddanne egne medarbejdere i sikker træklatring?</p>
          <p style={text}>
            Træklatreskolen åbner nu for 2 pilotforløb for skoler,
            institutioner, naturskoler og friluftsorganisationer.
          </p>
          <p style={text}>
            Forløbet er for op til 6 medarbejdere og kombinerer
            instruktøruddannelse, SOP, risikovurdering og praktisk træning.
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

const overlay = {
  position: "fixed",
  inset: 0,
  background: "rgba(15,26,20,0.55)",
  backdropFilter: "blur(3px)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 20,
  zIndex: 100,
  animation: "newspop-fade 0.25s ease",
};

const modal = {
  position: "relative",
  background: "white",
  borderRadius: 22,
  maxWidth: 460,
  width: "100%",
  padding: "36px 32px 32px",
  boxShadow: "0 24px 70px rgba(0,0,0,0.35)",
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
  fontSize: 26,
  fontWeight: 800,
  color: "#1f3a2b",
  margin: "0 0 16px",
  lineHeight: 1.2,
};

const body = {
  display: "flex",
  flexDirection: "column",
  gap: 12,
  marginBottom: 26,
};

const text = {
  margin: 0,
  fontSize: 15.5,
  lineHeight: 1.65,
  color: "#4b6355",
};

const cta = {
  display: "inline-block",
  background: "#d8782f",
  color: "white",
  textDecoration: "none",
  padding: "14px 28px",
  borderRadius: 12,
  fontWeight: 700,
  fontSize: 16,
  boxShadow: "0 4px 18px rgba(216,120,47,0.4)",
};
