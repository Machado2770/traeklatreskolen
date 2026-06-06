"use client";

import { useEffect } from "react";
import { useCart } from "@/app/components/CartProvider";

export default function KvitteringPage() {
  const { clear } = useCart();

  // Betaling gennemført — tøm kurven.
  useEffect(() => {
    clear();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main>
      <div style={inner}>
        <div style={icon}>✓</div>
        <h1 style={h1}>Tak for din ordre!</h1>
        <p style={text}>
          Din betaling er gennemført, og vi har modtaget din ordre. Du får en
          kvittering på e-mail fra Stripe. Vi pakker og sender dine varer
          hurtigst muligt.
        </p>
        <p style={text}>
          Har du spørgsmål til din ordre, er du altid velkommen til at skrive til
          os på <a href="mailto:info@traeklatreskolen.dk" style={link}>info@traeklatreskolen.dk</a>.
        </p>
        <div style={btnRow}>
          <a href="/shop" style={primaryBtn}>Tilbage til shop</a>
          <a href="/" style={secondaryBtn}>Til forsiden</a>
        </div>
      </div>
    </main>
  );
}

const inner = { maxWidth: 620, margin: "0 auto", padding: "72px 24px 90px", textAlign: "center" };
const icon = {
  width: 72, height: 72, margin: "0 auto 24px", borderRadius: "50%", background: "#216344",
  color: "white", fontSize: 38, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800,
};
const h1 = { fontSize: "clamp(28px, 5vw, 42px)", fontWeight: 800, color: "#1f3a2b", margin: "0 0 18px" };
const text = { fontSize: 17, lineHeight: 1.75, color: "#4b6355", margin: "0 0 16px" };
const link = { color: "#1f3a2b", borderBottom: "1px solid #3d7a57", textDecoration: "none" };
const btnRow = { display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", marginTop: 28 };
const primaryBtn = { display: "inline-block", padding: "14px 28px", background: "#d8782f", color: "white", borderRadius: 12, textDecoration: "none", fontWeight: 700 };
const secondaryBtn = { display: "inline-block", padding: "14px 28px", background: "#e7efe9", color: "#1f3a2b", borderRadius: 12, textDecoration: "none", fontWeight: 700 };
