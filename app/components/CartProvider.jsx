"use client";

import { createContext, useContext, useEffect, useState } from "react";

const STORAGE_KEY = "traeklatreskolen-cart-v1";
const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);   // [{ slug, name, price, image, qty }]
  const [loaded, setLoaded] = useState(false);

  // Indlæs fra localStorage ved mount
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
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

  function add(product, qty = 1) {
    setItems((prev) => {
      const found = prev.find((i) => i.slug === product.slug);
      if (found) {
        return prev.map((i) =>
          i.slug === product.slug ? { ...i, qty: i.qty + qty } : i
        );
      }
      return [
        ...prev,
        {
          slug: product.slug,
          name: product.name,
          price: product.price,
          image: product.image,
          qty,
        },
      ];
    });
  }

  function setQty(slug, qty) {
    setItems((prev) =>
      qty <= 0
        ? prev.filter((i) => i.slug !== slug)
        : prev.map((i) => (i.slug === slug ? { ...i, qty } : i))
    );
  }

  function remove(slug) {
    setItems((prev) => prev.filter((i) => i.slug !== slug));
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
