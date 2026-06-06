"use client";

import { useState } from "react";
import { useCart } from "./CartProvider";

export function formatPrice(kr) {
  return new Intl.NumberFormat("da-DK", {
    style: "currency",
    currency: "DKK",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(kr);
}

export default function AddToCart({ product, withQty = false }) {
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  function handleAdd() {
    add(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    <div style={wrap}>
      {withQty && (
        <div style={qtyRow}>
          <button style={qtyBtn} onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Færre">−</button>
          <span style={qtyVal}>{qty}</span>
          <button style={qtyBtn} onClick={() => setQty((q) => q + 1)} aria-label="Flere">+</button>
        </div>
      )}
      <button style={{ ...addBtn, ...(added ? addedBtn : null) }} onClick={handleAdd}>
        {added ? "✓ Lagt i kurv" : "Læg i kurv"}
      </button>
    </div>
  );
}

const wrap = { display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" };

const qtyRow = {
  display: "flex",
  alignItems: "center",
  border: "1.5px solid #d7e2da",
  borderRadius: 10,
  overflow: "hidden",
};
const qtyBtn = {
  width: 38,
  height: 42,
  border: "none",
  background: "#f0f4f1",
  color: "#1f3a2b",
  fontSize: 20,
  fontWeight: 700,
  cursor: "pointer",
};
const qtyVal = { minWidth: 36, textAlign: "center", fontWeight: 700, color: "#1f3a2b" };

const addBtn = {
  flex: 1,
  minWidth: 160,
  padding: "13px 24px",
  background: "#d8782f",
  color: "white",
  border: "none",
  borderRadius: 12,
  fontWeight: 700,
  fontSize: 16,
  cursor: "pointer",
  boxShadow: "0 4px 18px rgba(216,120,47,0.35)",
};
const addedBtn = { background: "#216344", boxShadow: "none" };
