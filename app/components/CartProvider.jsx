"use client";

import { createContext, useContext, useEffect, useState } from "react";

const STORAGE_KEY = "traeklatreskolen-cart-v1";
const CartContext = createContext(null);

// Kurv-nøgle: samme vare i to størrelser er to linjer i kurven.
function itemKey(slug, size) {
  return size ? `${slug}__${size}` : slug;
}

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);   // [{ key, slug, size, name, price, image, qty }]
  const [loaded, setLoaded] = useState(false);

  // Indlæs fra localStorage ved mount
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        // Bagudkompatibel: gamle kurve har ingen key/size
        setItems(parsed.map((i) => ({ ...i, key: i.key ?? itemKey(i.slug, i.size) })));
      }
    } catch {
      // ignorér
    }
    setLoaded(true);
  }, []);

  // Gem ved ændringer
  useEffect(() => {
    if (!loaded) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignorér
    }
  }, [items, loaded]);

  function add(product, qty = 1, size = null) {
    const key = itemKey(product.slug, size);
    setItems((prev) => {
      const found = prev.find((i) => i.key === key);
      if (found) {
        return prev.map((i) => (i.key === key ? { ...i, qty: i.qty + qty } : i));
      }
      return [
        ...prev,
        {
          key,
          slug: product.slug,
          size,
          name: product.name,
          price: product.price,
          image: product.image,
          qty,
        },
      ];
    });
  }

  function setQty(key, qty) {
    setItems((prev) =>
      qty <= 0
        ? prev.filter((i) => i.key !== key)
        : prev.map((i) => (i.key === key ? { ...i, qty } : i))
    );
  }

  function remove(key) {
    setItems((prev) => prev.filter((i) => i.key !== key));
  }

  function clear() {
    setItems([]);
  }

  const count = items.reduce((n, i) => n + i.qty, 0);
  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <CartContext.Provider
      value={{ items, add, setQty, remove, clear, count, subtotal, loaded }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart skal bruges inden i CartProvider");
  return ctx;
}
