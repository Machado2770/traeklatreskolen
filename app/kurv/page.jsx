"use client";

import { useState } from "react";
import Image from "next/image";
import { useCart } from "@/app/components/CartProvider";
import { formatPrice } from "@/lib/format";
import { SHIPPING } from "@/lib/shopData";

export default function KurvPage() {
  const { items, setQty, remove, subtotal, count, loaded } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const shipping = subtotal === 0 ? 0 : subtotal >= SHIPPING.freeOver ? 0 : SHIPPING.flatRate;
  const total = subtotal + shipping;

  async function checkout() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: items.map((i) => ({ slug: i.slug, qty: i.qty })) }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) throw new Error(data.error || "Kunne ikke starte betaling.");
      window.location.href = data.url;
    } catch (e) {
      setError(e.message || "Noget gik galt. Prøv igen.");
      setLoading(false);
    }
  }

  return (
    <main>
      <div style={pageInner}>
        <h1 style={h1}>Din kurv</h1>

        {!loaded ? null : count === 0 ? (
          <div style={emptyBox}>
            <p style={{ fontSize: 18, color: "#4b6355", margin: "0 0 20px" }}>Din kurv er tom.</p>
            <a href="/shop" style={primaryBtn}>Gå til shop</a>
          </div>
        ) : (
          <div style={layout} className="cart-layout">
            <div style={itemsCol}>
              {items.map((i) => (
                <div key={i.slug} style={row}>
                  <div style={thumb}>
                    {i.image && <Image src={i.image} alt={i.name} fill style={{ objectFit: "cover" }} sizes="90px" />}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <a href={`/shop/${i.slug}`} style={itemName}>{i.name}</a>
                    <div style={itemPrice}>{formatPrice(i.price)}</div>
                  </div>
                  <div style={qtyRow}>
                    <button style={qtyBtn} onClick={() => setQty(i.slug, i.qty - 1)} aria-label="Færre">−</button>
                    <span style={qtyVal}>{i.qty}</span>
                    <button style={qtyBtn} onClick={() => setQty(i.slug, i.qty + 1)} aria-label="Flere">+</button>
                  </div>
                  <div style={lineTotal}>{formatPrice(i.price * i.qty)}</div>
                  <button style={removeBtn} onClick={() => remove(i.slug)} aria-label="Fjern">×</button>
                </div>
              ))}
            </div>

            <aside style={summary}>
              <h2 style={{ marginTop: 0, fontSize: 20, color: "#1f3a2b" }}>Oversigt</h2>
              <div style={sumRow}><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
              <div style={sumRow}>
                <span>Fragt</span>
                <span>{shipping === 0 ? "Gratis" : formatPrice(shipping)}</span>
              </div>
              {shipping > 0 && (
                <p style={freeHint}>
                  Køb for {formatPrice(SHIPPING.freeOver - subtotal)} mere og få fri fragt.
                </p>
              )}
              <div style={totalRow}><span>Total</span><span>{formatPrice(total)}</span></div>

              {error && <p style={errorBox}>{error}</p>}

              <button style={{ ...checkoutBtn, opacity: loading ? 0.7 : 1 }} onClick={checkout} disabled={loading}>
                {loading ? "Sender til betaling…" : "Gå til betaling"}
              </button>
              <a href="/shop" style={continueLink}>← Fortsæt med at handle</a>
              <p style={secureNote}>Sikker betaling med kort via Stripe.</p>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}

const pageInner = { maxWidth: 1080, margin: "0 auto", padding: "48px 24px 80px" };
const h1 = { fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 800, color: "#1f3a2b", margin: "0 0 28px" };

const emptyBox = {
  background: "white", borderRadius: 18, padding: "48px 24px", textAlign: "center",
  boxShadow: "0 8px 28px rgba(0,0,0,0.07)",
};

const layout = { display: "grid", gridTemplateColumns: "1fr 340px", gap: 28, alignItems: "start" };
const itemsCol = { display: "flex", flexDirection: "column", gap: 14 };

const row = {
  display: "flex", alignItems: "center", gap: 14, background: "white",
  borderRadius: 16, padding: 14, boxShadow: "0 4px 18px rgba(0,0,0,0.06)",
};
const thumb = { position: "relative", width: 70, height: 70, borderRadius: 10, overflow: "hidden", background: "#dce8e0", flexShrink: 0 };
const itemName = { display: "block", fontWeight: 700, color: "#1f3a2b", textDecoration: "none", marginBottom: 4 };
const itemPrice = { fontSize: 14, color: "#6c7f73" };

const qtyRow = { display: "flex", alignItems: "center", border: "1.5px solid #d7e2da", borderRadius: 10, overflow: "hidden" };
const qtyBtn = { width: 32, height: 36, border: "none", background: "#f0f4f1", color: "#1f3a2b", fontSize: 18, fontWeight: 700, cursor: "pointer" };
const qtyVal = { minWidth: 30, textAlign: "center", fontWeight: 700, color: "#1f3a2b" };

const lineTotal = { fontWeight: 800, color: "#1f3a2b", minWidth: 80, textAlign: "right" };
const removeBtn = { border: "none", background: "transparent", color: "#a3521d", fontSize: 24, lineHeight: 1, cursor: "pointer", padding: "0 4px" };

const summary = { background: "white", borderRadius: 18, padding: 24, boxShadow: "0 8px 28px rgba(0,0,0,0.08)" };
const sumRow = { display: "flex", justifyContent: "space-between", margin: "12px 0", color: "#33463a" };
const freeHint = { fontSize: 13, color: "#216344", background: "#e3efe6", borderRadius: 10, padding: "8px 12px", margin: "8px 0" };
const totalRow = {
  display: "flex", justifyContent: "space-between", marginTop: 14, paddingTop: 14,
  borderTop: "1px solid #edf2ee", fontWeight: 800, fontSize: 18, color: "#1f3a2b",
};
const errorBox = { background: "#fbe6e0", color: "#a3301d", borderRadius: 10, padding: "10px 12px", fontSize: 14, marginTop: 14 };
const checkoutBtn = {
  width: "100%", marginTop: 18, padding: "15px", background: "#d8782f", color: "white",
  border: "none", borderRadius: 12, fontWeight: 800, fontSize: 16, cursor: "pointer",
  boxShadow: "0 4px 18px rgba(216,120,47,0.35)",
};
const continueLink = { display: "block", textAlign: "center", marginTop: 14, color: "#1f3a2b", textDecoration: "none", fontWeight: 700, fontSize: 14 };
const secureNote = { textAlign: "center", fontSize: 13, color: "#6c7f73", marginTop: 12, marginBottom: 0 };
const primaryBtn = { display: "inline-block", padding: "13px 26px", background: "#d8782f", color: "white", borderRadius: 12, textDecoration: "none", fontWeight: 700 };
