"use client";

import { useState } from "react";
import { useCart } from "./CartProvider";

// Hurtig-køb fra vareoversigten: læg i kurv uden at åbne varen.
// Varer med størrelser folder størrelsesvalget ud direkte på kortet.
export default function QuickAdd({ product }) {
  const { add } = useCart();
  const [showSizes, setShowSizes] = useState(false);
  const [added, setAdded] = useState(false);

  const sizes = Array.isArray(product.sizes) ? product.sizes : [];

  function confirm() {
    setAdded(true);
    setShowSizes(false);
    setTimeout(() => setAdded(false), 1600);
  }

  function handleClick(e) {
    // Kortet er ét stort link — knappen må ikke navigere.
    e.preventDefault();
    e.stopPropagation();
    if (sizes.length > 0) {
      setShowSizes((v) => !v);
      return;
    }
    add(product, 1);
    confirm();
  }

  function pickSize(e, size) {
    e.preventDefault();
    e.stopPropagation();
    add(product, 1, size);
    confirm();
  }

  return (
    <div style={wrap}>
      {showSizes ? (
        <div style={sizeRow}>
          {sizes.map((s) => (
            <button key={s} type="button" style={sizeBtn} onClick={(e) => pickSize(e, s)}>
              {s}
            </button>
          ))}
        </div>
      ) : (
        <button
          type="button"
          style={{ ...btn, ...(added ? btnAdded : null) }}
          onClick={handleClick}
          aria-label={`Læg ${product.name} i kurven`}
        >
          {added ? "✓ Lagt i kurv" : sizes.length > 0 ? "Læg i kurv — vælg str." : "Læg i kurv"}
        </button>
      )}
    </div>
  );
}

// zIndex løfter knappen over kortets stretched link.
const wrap = { position: "relative", zIndex: 2, marginTop: 12 };

const btn = {
  width: "100%",
  padding: "10px 14px",
  background: "white",
  color: "#1f3a2b",
  border: "1.5px solid #1f3a2b",
  borderRadius: 10,
  fontWeight: 700,
  fontSize: 14,
  cursor: "pointer",
};
const btnAdded = {
  background: "#216344",
  borderColor: "#216344",
  color: "white",
};

const sizeRow = { display: "flex", gap: 6, flexWrap: "wrap" };
const sizeBtn = {
  flex: 1,
  minWidth: 44,
  padding: "9px 0",
  border: "1.5px solid #d7e2da",
  borderRadius: 10,
  background: "white",
  color: "#1f3a2b",
  fontWeight: 700,
  fontSize: 14,
  cursor: "pointer",
};
