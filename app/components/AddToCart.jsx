"use client";

import { useState } from "react";
import { useCart } from "./CartProvider";

export default function AddToCart({ product, withQty = false }) {
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState(null);
  const [added, setAdded] = useState(false);

  const sizes = Array.isArray(product.sizes) ? product.sizes : [];
  const needsSize = sizes.length > 0;
  const canAdd = !needsSize || size != null;

  function handleAdd() {
    if (!canAdd) return;
    add(product, qty, size);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    <div>
      {needsSize && (
        <div style={sizeBlock}>
          <span style={sizeLabel}>Størrelse</span>
          <div style={sizeRow}>
            {sizes.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSize(s)}
                style={{ ...sizeBtn, ...(size === s ? sizeBtnActive : null) }}
                aria-pressed={size === s}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      <div style={wrap}>
        {withQty && (
          <div style={qtyRow}>
            <button style={qtyBtn} onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Færre">−</button>
            <span style={qtyVal}>{qty}</span>
            <button style={qtyBtn} onClick={() => setQty((q) => q + 1)} aria-label="Flere">+</button>
          </div>
        )}
        <button
          style={{ ...addBtn, ...(added ? addedBtn : null), ...(canAdd ? null : addBtnDisabled) }}
          onClick={handleAdd}
          disabled={!canAdd}
        >
          {added ? "✓ Lagt i kurv" : canAdd ? "Læg i kurv" : "Vælg størrelse"}
        </button>
      </div>
    </div>
  );
}

const sizeBlock = { marginBottom: 16 };
const sizeLabel = {
  display: "block",
  fontSize: 13,
  fontWeight: 700,
  color: "#4b6355",
  textTransform: "uppercase",
  letterSpacing: 1,
  marginBottom: 8,
};
const sizeRow = { display: "flex", gap: 8, flexWrap: "wrap" };
const sizeBtn = {
  minWidth: 52,
  padding: "10px 14px",
  border: "1.5px solid #d7e2da",
  borderRadius: 10,
  background: "white",
  color: "#1f3a2b",
  fontWeight: 700,
  fontSize: 15,
  cursor: "pointer",
};
const sizeBtnActive = {
  background: "#1f3a2b",
  borderColor: "#1f3a2b",
  color: "white",
};

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
const addBtnDisabled = { background: "#c8d4cc", boxShadow: "none", cursor: "not-allowed" };
