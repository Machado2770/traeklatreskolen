"use client";

import { useState } from "react";
import Image from "next/image";
import { useCart } from "@/app/components/CartProvider";
import { formatPrice } from "@/lib/format";
import { SHIPPING } from "@/lib/shopData";

export default function KurvPage() {
  const { items, setQty, remove, clear, subtotal, count, loaded } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Faktura-flow
  const [showInvoice, setShowInvoice] = useState(false);
  const [invoiceLoading, setInvoiceLoading] = useState(false);
  const [invoiceError, setInvoiceError] = useState("");
  const [invoiceSent, setInvoiceSent] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", phone: "", organization: "",
    cvr: "", ean: "", address: "", note: "", website: "",
  });

  const shipping = subtotal === 0 ? 0 : subtotal >= SHIPPING.freeOver ? 0 : SHIPPING.flatRate;
  const total = subtotal + shipping;

  async function checkout() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: items.map((i) => ({ slug: i.slug, qty: i.qty, size: i.size })) }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) throw new Error(data.error || "Kunne ikke starte betaling.");
      window.location.href = data.url;
    } catch (e) {
      setError(e.message || "Noget gik galt. Prøv igen.");
      setLoading(false);
    }
  }

  function setField(key) {
    return (e) => setForm((f) => ({ ...f, [key]: e.target.value }));
  }

  async function submitInvoice(e) {
    e.preventDefault();
    setInvoiceLoading(true);
    setInvoiceError("");
    try {
      const res = await fetch("/api/checkout/invoice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          items: items.map((i) => ({ slug: i.slug, qty: i.qty, size: i.size })),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Ordren kunne ikke sendes.");
      setInvoiceSent(true);
      clear();
    } catch (err) {
      setInvoiceError(err.message || "Noget gik galt. Prøv igen.");
    } finally {
      setInvoiceLoading(false);
    }
  }

  return (
    <main>
      <div style={pageInner}>
        <h1 style={h1}>Din kurv</h1>

        {invoiceSent ? (
          <div style={emptyBox}>
            <p style={{ fontSize: 22, fontWeight: 800, color: "#1f3a2b", margin: "0 0 10px" }}>
              Tak for din ordre! ✓
            </p>
            <p style={{ fontSize: 16, color: "#4b6355", margin: "0 0 24px", lineHeight: 1.7 }}>
              Vi har modtaget din bestilling og sender en faktura hurtigst muligt.
              Du får en bekræftelse pr. e-mail med det samme.
            </p>
            <a href="/shop" style={primaryBtn}>Tilbage til shoppen</a>
          </div>
        ) : !loaded ? null : count === 0 ? (
          <div style={emptyBox}>
            <p style={{ fontSize: 18, color: "#4b6355", margin: "0 0 20px" }}>Din kurv er tom.</p>
            <a href="/shop" style={primaryBtn}>Gå til shop</a>
          </div>
        ) : (
          <>
            {subtotal >= SHIPPING.freeOver ? (
              <div style={freeBarDone}>
                <span style={freeBarIcon}>🎉</span>
                <span>Du har fri fragt!</span>
              </div>
            ) : (
              <div style={freeBarBox}>
                <p style={freeBarText}>
                  Du mangler <strong>{formatPrice(SHIPPING.freeOver - subtotal)}</strong> til fri fragt
                </p>
                <div style={freeBarTrack}>
                  <div
                    style={{
                      ...freeBarFill,
                      width: `${Math.min(100, Math.round((subtotal / SHIPPING.freeOver) * 100))}%`,
                    }}
                  />
                </div>
              </div>
            )}
          <div style={layout} className="cart-layout">
            <div style={itemsCol}>
              {items.map((i) => (
                <div key={i.key} style={row}>
                  <div style={thumb}>
                    {i.image && <Image src={i.image} alt={i.name} fill style={{ objectFit: "contain" }} sizes="90px" />}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <a href={`/shop/${i.slug}`} style={itemName}>{i.name}</a>
                    <div style={itemPrice}>
                      {i.size ? `Str. ${i.size} · ` : ""}{formatPrice(i.price)}
                    </div>
                  </div>
                  <div style={qtyRow}>
                    <button style={qtyBtn} onClick={() => setQty(i.key, i.qty - 1)} aria-label="Færre">−</button>
                    <span style={qtyVal}>{i.qty}</span>
                    <button style={qtyBtn} onClick={() => setQty(i.key, i.qty + 1)} aria-label="Flere">+</button>
                  </div>
                  <div style={lineTotal}>{formatPrice(i.price * i.qty)}</div>
                  <button style={removeBtn} onClick={() => remove(i.key)} aria-label="Fjern">×</button>
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
              <div style={totalRow}><span>Total</span><span>{formatPrice(total)}</span></div>

              {error && <p style={errorBox}>{error}</p>}

              <button style={{ ...checkoutBtn, opacity: loading ? 0.7 : 1 }} onClick={checkout} disabled={loading}>
                {loading ? "Sender til betaling…" : "Gå til betaling"}
              </button>
              <p style={secureNote}>Sikker betaling med kort via Stripe.</p>

              {/* Faktura-betaling */}
              <div style={invoiceDivider}>
                <span style={invoiceDividerText}>eller</span>
              </div>
              {!showInvoice ? (
                <>
                  <button style={invoiceToggleBtn} onClick={() => setShowInvoice(true)}>
                    Betal på fremsendt faktura
                  </button>
                  <p style={secureNote}>
                    For organisationer, skoler og foreninger — også elektronisk faktura (EAN).
                  </p>
                </>
              ) : (
                <form onSubmit={submitInvoice} style={invoiceForm}>
                  <p style={invoiceIntro}>
                    Udfyld oplysningerne, så sender vi en faktura — elektronisk (EAN) eller pr. e-mail.
                    Varerne afsendes efter aftale.
                  </p>

                  {/* Honeypot — skjult for mennesker */}
                  <input type="text" name="website" value={form.website} onChange={setField("website")}
                    style={{ display: "none" }} tabIndex={-1} autoComplete="off" />

                  <input style={input} type="text" placeholder="Navn *" required maxLength={120}
                    value={form.name} onChange={setField("name")} />
                  <input style={input} type="email" placeholder="E-mail *" required maxLength={200}
                    value={form.email} onChange={setField("email")} />
                  <input style={input} type="tel" placeholder="Telefon *" required maxLength={40}
                    value={form.phone} onChange={setField("phone")} />
                  <input style={input} type="text" placeholder="Organisation / skole / forening" maxLength={160}
                    value={form.organization} onChange={setField("organization")} />
                  <div style={{ display: "flex", gap: 8 }}>
                    <input style={{ ...input, flex: 1 }} type="text" placeholder="CVR (8 cifre)" maxLength={8}
                      inputMode="numeric" value={form.cvr} onChange={setField("cvr")} />
                    <input style={{ ...input, flex: 1.4 }} type="text" placeholder="EAN (13 cifre)" maxLength={13}
                      inputMode="numeric" value={form.ean} onChange={setField("ean")} />
                  </div>
                  <input style={input} type="text" placeholder="Leveringsadresse" maxLength={300}
                    value={form.address} onChange={setField("address")} />
                  <textarea style={{ ...input, minHeight: 70, resize: "vertical" }} placeholder="Bemærkninger"
                    maxLength={1000} value={form.note} onChange={setField("note")} />

                  {invoiceError && <p style={errorBox}>{invoiceError}</p>}

                  <button type="submit" style={{ ...invoiceSubmitBtn, opacity: invoiceLoading ? 0.7 : 1 }}
                    disabled={invoiceLoading}>
                    {invoiceLoading ? "Sender ordre…" : `Bestil på faktura — ${formatPrice(total)}`}
                  </button>
                  <button type="button" style={invoiceCancelBtn} onClick={() => setShowInvoice(false)}>
                    Annullér
                  </button>
                </form>
              )}

              <a href="/shop" style={continueLink}>← Fortsæt med at handle</a>
            </aside>
          </div>
          </>
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
const thumb = { position: "relative", width: 70, height: 70, borderRadius: 10, overflow: "hidden", background: "white", border: "1px solid #edf2ee", flexShrink: 0 };
const itemName = { display: "block", fontWeight: 700, color: "#1f3a2b", textDecoration: "none", marginBottom: 4 };
const itemPrice = { fontSize: 14, color: "#6c7f73" };

const qtyRow = { display: "flex", alignItems: "center", border: "1.5px solid #d7e2da", borderRadius: 10, overflow: "hidden" };
const qtyBtn = { width: 32, height: 36, border: "none", background: "#f0f4f1", color: "#1f3a2b", fontSize: 18, fontWeight: 700, cursor: "pointer" };
const qtyVal = { minWidth: 30, textAlign: "center", fontWeight: 700, color: "#1f3a2b" };

const lineTotal = { fontWeight: 800, color: "#1f3a2b", minWidth: 80, textAlign: "right" };
const removeBtn = { border: "none", background: "transparent", color: "#a3521d", fontSize: 24, lineHeight: 1, cursor: "pointer", padding: "0 4px" };

const summary = { background: "white", borderRadius: 18, padding: 24, boxShadow: "0 8px 28px rgba(0,0,0,0.08)" };
const sumRow = { display: "flex", justifyContent: "space-between", margin: "12px 0", color: "#33463a" };
const freeBarBox = { background: "white", borderRadius: 16, padding: "16px 20px", marginBottom: 20, boxShadow: "0 4px 18px rgba(0,0,0,0.06)" };
const freeBarText = { margin: "0 0 10px", color: "#33463a", fontSize: 14.5, fontWeight: 600 };
const freeBarTrack = { height: 10, borderRadius: 999, background: "#e3efe6", overflow: "hidden" };
const freeBarFill = { height: "100%", borderRadius: 999, background: "#d8782f", transition: "width 0.3s ease" };
const freeBarDone = { display: "flex", alignItems: "center", gap: 10, background: "#e3efe6", color: "#216344", borderRadius: 16, padding: "16px 20px", marginBottom: 20, fontWeight: 800, fontSize: 15.5 };
const freeBarIcon = { fontSize: 20 };
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
const continueLink = { display: "block", textAlign: "center", marginTop: 16, color: "#1f3a2b", textDecoration: "none", fontWeight: 700, fontSize: 14 };
const secureNote = { textAlign: "center", fontSize: 13, color: "#6c7f73", marginTop: 10, marginBottom: 0 };
const primaryBtn = { display: "inline-block", padding: "13px 26px", background: "#d8782f", color: "white", borderRadius: 12, textDecoration: "none", fontWeight: 700 };

const invoiceDivider = {
  display: "flex", alignItems: "center", gap: 12, margin: "18px 0 14px",
  color: "#9bab9f",
};
const invoiceDividerText = {
  flex: "none", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1,
  width: "100%", textAlign: "center", borderTop: "1px solid #edf2ee", paddingTop: 12,
};
const invoiceToggleBtn = {
  width: "100%", padding: "13px", background: "white", color: "#1f3a2b",
  border: "1.5px solid #1f3a2b", borderRadius: 12, fontWeight: 700, fontSize: 15, cursor: "pointer",
};
const invoiceForm = { display: "flex", flexDirection: "column", gap: 8 };
const invoiceIntro = { fontSize: 13.5, color: "#4b6355", lineHeight: 1.55, margin: "0 0 4px" };
const input = {
  width: "100%", boxSizing: "border-box", padding: "11px 12px", borderRadius: 10,
  border: "1.5px solid #d7e2da", fontSize: 14.5, color: "#1f3a2b", background: "#fbfdfb",
  fontFamily: "inherit",
};
const invoiceSubmitBtn = {
  width: "100%", marginTop: 6, padding: "13px", background: "#1f3a2b", color: "white",
  border: "none", borderRadius: 12, fontWeight: 800, fontSize: 15, cursor: "pointer",
};
const invoiceCancelBtn = {
  width: "100%", padding: "9px", background: "transparent", color: "#6c7f73",
  border: "none", fontWeight: 700, fontSize: 13.5, cursor: "pointer",
};
