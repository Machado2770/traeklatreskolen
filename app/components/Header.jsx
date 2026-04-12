"use client";

import { useState } from "react";
import Image from "next/image";

const NAV = [
  { href: "/",               label: "Forside" },
  { href: "/kurser",         label: "Kurser" },
  { href: "/oplevelser",     label: "Oplevelser" },
  { href: "/kursuskalender", label: "Kursuskalender" },
  { href: "/kontakt",        label: "Kontakt" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header style={headerWrap}>
      <div className="header-inner">
        <a href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
          <Image
            src="/logo/logo-main.png"
            alt="Træklatreskolen"
            width={320}
            height={72}
            priority
            style={{ width: "auto", height: "auto", maxHeight: 54 }}
          />
        </a>

        {/* Desktop nav */}
        <nav className="main-nav">
          {NAV.map(l => <a key={l.href} href={l.href} style={navLink}>{l.label}</a>)}
          <a href="/booking" style={ctaLink}>Tilmelding</a>
        </nav>

        {/* Hamburger — kun synlig på mobil */}
        <button
          className="hamburger-btn"
          onClick={() => setOpen(o => !o)}
          aria-label={open ? "Luk menu" : "Åbn menu"}
          aria-expanded={open}
        >
          <span className={`ham-bar ${open ? "open-top" : ""}`} />
          <span className={`ham-bar ${open ? "open-mid" : ""}`} />
          <span className={`ham-bar ${open ? "open-bot" : ""}`} />
        </button>
      </div>

      {/* Mobil-dropdown */}
      {open && (
        <nav className="mobile-nav">
          {NAV.map(l => (
            <a key={l.href} href={l.href} className="mobile-nav-link" onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
          <a href="/booking" className="mobile-nav-cta" onClick={() => setOpen(false)}>
            Tilmelding
          </a>
        </nav>
      )}
    </header>
  );
}

const headerWrap = {
  background: "#ffffff",
  borderBottom: "1px solid #e7ece8",
  position: "sticky",
  top: 0,
  zIndex: 20,
  boxShadow: "0 4px 18px rgba(0,0,0,0.05)",
};

const navLink = {
  color: "#1f3a2b",
  textDecoration: "none",
  fontWeight: 600,
};

const ctaLink = {
  color: "white",
  textDecoration: "none",
  fontWeight: 700,
  background: "#d8782f",
  padding: "10px 14px",
  borderRadius: 10,
};
