"use client";

import { useState } from "react";
import Image from "next/image";
import { useCart } from "./CartProvider";

const NAV = [
  { href: "/",               label: "Forside" },
  { href: "/organisationer", label: "Organisationer" },
  { href: "/kurser",         label: "Kurser" },
  { href: "/oplevelser",     label: "Oplevelser" },
  { href: "/kontakt",        label: "Kontakt" },
];

function CartIcon({ onClick }) {
  const { count } = useCart();
  return (
    <a href="/kurv" style={cartLink} aria-label={`Kurv med ${count} varer`} onClick={onClick}>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M3 4h2l2.4 12.2a1.5 1.5 0 001.5 1.2h8.6a1.5 1.5 0 001.5-1.2L21 8H6"
          stroke="#1f3a2b" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="10" cy="20.5" r="1.4" fill="#1f3a2b"/>
        <circle cx="18" cy="20.5" r="1.4" fill="#1f3a2b"/>
      </svg>
      {count > 0 && <span style={cartBadge}>{count}</span>}
    </a>
  );
}

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
          <a href="/kursuskalender" style={ctaLink}>Kursuskalender</a>
          <CartIcon />
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
          <a href="/kursuskalender" className="mobile-nav-cta" onClick={() => setOpen(false)}>
            Kursuskalender
          </a>
          <a href="/kurv" className="mobile-nav-link" onClick={() => setOpen(false)}>
            Kurv
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

const cartLink = {
  position: "relative",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  textDecoration: "none",
  padding: "6px",
};

const cartBadge = {
  position: "absolute",
  top: -4,
  right: -6,
  minWidth: 18,
  height: 18,
  padding: "0 5px",
  background: "#d8782f",
  color: "white",
  borderRadius: 999,
  fontSize: 11,
  fontWeight: 800,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};
