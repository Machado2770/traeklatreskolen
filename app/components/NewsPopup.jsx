"use client";

import { useEffect, useState } from "react";

// Vis-én-gang-nøgle. Bump tallet hvis nyheden ændres og skal vises igen.
// Beholdes på v1: den nye udgave er mindre påtrængende, så folk der
// allerede har lukket den, skal ikke se den igen.
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
      <div style={card} role="complementary" aria-label="Nyhed til organisationer">
        <button onClick={close} style={closeBtn} aria-label="Luk">×</button>

        {/* Målgruppen står først og tydeligt: nyheden må ikke give indtryk
            af, at Træklatreskolen kun er for organisationer. */}
        <p style={eyebrow}>Til skoler og organisationer</p>
        <p style={title}>Pilotforløb: uddan jeres egne medarbejdere</p>

        <a href="/organisationer" style={link} onClick={close}>
          Læs mere →
        </a>
      </div>

      <style>{`
        @keyframes newspop-in {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

// Diskret hjørne-toast nederst til højre — dækker ikke siden, og resten
// af siden forbliver klikbar (pointerEvents: none på wrapperen).
const wrap = {
  position: "fixed",
  right: 18,
  bottom: 18,
  zIndex: 100,
  width: 290,
  maxWidth: "calc(100vw - 28px)",
  pointerEvents: "none",
};

const card = {
  position: "relative",
  pointerEvents: "auto",
  background: "white",
  borderRadius: 12,
  width: "100%",
  padding: "13px 34px 13px 15px",
  border: "1px solid #dfe7e1",
  borderLeft: "3px solid #d8782f",
  boxShadow: "0 6px 20px rgba(31,58,43,0.13)",
  animation: "newspop-in 0.3s ease",
};

const closeBtn = {
  position: "absolute",
  top: 6,
  right: 6,
  width: 24,
  height: 24,
  border: "none",
  background: "transparent",
  borderRadius: 6,
  fontSize: 18,
  lineHeight: 1,
  color: "#8fa397",
  cursor: "pointer",
};

const eyebrow = {
  margin: "0 0 3px",
  fontSize: 10.5,
  fontWeight: 800,
  letterSpacing: 1.1,
  textTransform: "uppercase",
  color: "#a3521d",
};

const title = {
  margin: "0 0 6px",
  fontSize: 14,
  fontWeight: 700,
  lineHeight: 1.4,
  color: "#1f3a2b",
};

const link = {
  display: "inline-block",
  color: "#3d7a57",
  textDecoration: "none",
  fontWeight: 700,
  fontSize: 13,
};
