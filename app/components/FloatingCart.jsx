"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useCart } from "./CartProvider";

// Svævende kurv-knap nederst til højre.
// - Usynlig ved tom kurv: dukker først op (med pop), når første vare lægges i.
// - Hopper let, når antallet ændrer sig — kvittering for "den røg i kurven".
// - Skjult på selve kurv-siden og i admin.
export default function FloatingCart() {
  const { count, loaded } = useCart();
  const pathname = usePathname();
  const [bump, setBump] = useState(false);
  const prevCount = useRef(null);

  useEffect(() => {
    if (!loaded) return;
    if (prevCount.current !== null && count !== prevCount.current && count > 0) {
      setBump(true);
      const t = setTimeout(() => setBump(false), 450);
      prevCount.current = count;
      return () => clearTimeout(t);
    }
    prevCount.current = count;
  }, [count, loaded]);

  if (!loaded || count === 0) return null;
  if (pathname === "/kurv" || pathname.startsWith("/admin")) return null;

  return (
    <a
      href="/kurv"
      className={`floating-cart ${bump ? "floating-cart-bump" : ""}`}
      aria-label={`Kurv med ${count} ${count === 1 ? "vare" : "varer"} — gå til kassen`}
    >
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M3 4h2l2.4 12.2a1.5 1.5 0 001.5 1.2h8.6a1.5 1.5 0 001.5-1.2L21 8H6"
          stroke="#1f3a2b" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="10" cy="20.5" r="1.4" fill="#1f3a2b"/>
        <circle cx="18" cy="20.5" r="1.4" fill="#1f3a2b"/>
      </svg>
      <span className="floating-cart-badge">{count}</span>
    </a>
  );
}
