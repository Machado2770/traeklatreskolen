"use client";

import { signOut } from "next-auth/react";
import { useEffect, useMemo, useState } from "react";

export default function AdminPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    q: "",
    course: "",
    payment_status: "",
  });

  async function loadParticipants() {
    setLoading(true);
    const params = new URLSearchParams();
    if (filters.q) params.set("q", filters.q);
    if (filters.course) params.set("course", filters.course);
    if (filters.payment_status) params.set("payment_status", filters.payment_status);

    const res = await fetch(`/api/booking?${params.toString()}`, { cache: "no-store" });
    const data = await res.json();
    setItems(Array.isArray(data) ? data : []);
    setLoading(false);
  }

  useEffect(() => {
    loadParticipants();
  }, [filters.q, filters.course, filters.payment_status]);

  const courseOptions = useMemo(() => {
    const set = new Set(items.map((i) => i.course).filter(Boolean));
    return Array.from(set).sort();
  }, [items]);

  async function updateStatus(id, paymentStatus) {
    const res = await fetch(`/api/participants/${id}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ payment_status: paymentStatus }),
    });

    if (res.ok) {
      setItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, payment_status: paymentStatus } : item
        )
      );
    } else {
      alert("Kunne ikke opdatere betalingsstatus.");
    }
  }

  return (
    <main style={{ maxWidth: 1200, margin: "0 auto", padding: 32 }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
        <div>
          <h1 style={{ marginBottom: 8, color: "#1f3a2b" }}>Admin · Deltagerstyring</h1>
          <div style={{ color: "#4b6355" }}>Beskyttet område. Filtrér, opdatér betalingsstatus og eksportér CSV.</div>
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <a href="/api/participants/export" style={button("#d8782f")}>Eksportér CSV</a>
          <button onClick={() => signOut({ callbackUrl: "/" })} style={button("#2f5f43")}>Log ud</button>
        </div>
      </div>

      <section style={cardStyle}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr auto", gap: 12 }}>
          <input
            placeholder="Søg på navn eller email"
            value={filters.q}
            onChange={(e) => setFilters((prev) => ({ ...prev, q: e.target.value }))}
            style={inputStyle}
          />
          <select
            value={filters.course}
            onChange={(e) => setFilters((prev) => ({ ...prev, course: e.target.value }))}
            style={inputStyle}
          >
            <option value="">Alle kurser</option>
            {courseOptions.map((course) => (
              <option key={course} value={course}>{course}</option>
            ))}
          </select>
          <select
            value={filters.payment_status}
            onChange={(e) => setFilters((prev) => ({ ...prev, payment_status: e.target.value }))}
            style={inputStyle}
          >
            <option value="">Alle betalingsstatus</option>
            <option value="pending">pending</option>
            <option value="paid">paid</option>
            <option value="cancelled">cancelled</option>
          </select>
          <button onClick={loadParticipants} style={button("#577e61")}>Opdater</button>
        </div>
      </section>

      <section style={cardStyle}>
        {loading ? (
          <div>Henter deltagere…</div>
        ) : items.length === 0 ? (
          <div>Ingen deltagere fundet.</div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  {["Navn", "Email", "Telefon", "Kursus", "Status", "Oprettet", "Handling"].map((label) => (
                    <th key={label} style={thStyle}>{label}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id}>
                    <td style={tdStyle}>{item.name}</td>
                    <td style={tdStyle}>{item.email}</td>
                    <td style={tdStyle}>{item.phone || "—"}</td>
                    <td style={tdStyle}>{item.course}</td>
                    <td style={tdStyle}>
                      <span style={{
                        ...pillStyle,
                        background: item.payment_status === "paid" ? "#dff3e5" : item.payment_status === "cancelled" ? "#fbe4e2" : "#f7eddc",
                        color: item.payment_status === "paid" ? "#165c2c" : item.payment_status === "cancelled" ? "#9a2f27" : "#7a4d08"
                      }}>
                        {item.payment_status}
                      </span>
                    </td>
                    <td style={tdStyle}>{item.created_at ? new Date(item.created_at).toLocaleString("da-DK") : "—"}</td>
                    <td style={tdStyle}>
                      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                        <button onClick={() => updateStatus(item.id, "paid")} style={miniButton("#2f5f43")}>Marker betalt</button>
                        <button onClick={() => updateStatus(item.id, "pending")} style={miniButton("#d8782f")}>Sæt pending</button>
                        <button onClick={() => updateStatus(item.id, "cancelled")} style={miniButton("#8f2d20")}>Annullér</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}

const cardStyle = {
  background: "white",
  borderRadius: 16,
  padding: 20,
  boxShadow: "0 6px 24px rgba(0,0,0,0.06)",
  marginTop: 20,
};

const inputStyle = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: 10,
  border: "1px solid #cfd8d3",
  boxSizing: "border-box",
  font: "inherit",
};

const thStyle = {
  textAlign: "left",
  padding: "12px 10px",
  borderBottom: "1px solid #e5ece7",
  color: "#486051",
  fontSize: 14,
};

const tdStyle = {
  padding: "12px 10px",
  borderBottom: "1px solid #eef3ef",
  verticalAlign: "top",
};

const pillStyle = {
  display: "inline-block",
  padding: "6px 10px",
  borderRadius: 999,
  fontSize: 12,
  fontWeight: 700,
  textTransform: "uppercase",
};

function button(bg) {
  return {
    display: "inline-block",
    padding: "12px 16px",
    borderRadius: 10,
    background: bg,
    color: "white",
    border: 0,
    textDecoration: "none",
    fontWeight: 700,
    cursor: "pointer",
  };
}

function miniButton(bg) {
  return {
    display: "inline-block",
    padding: "8px 10px",
    borderRadius: 10,
    background: bg,
    color: "white",
    border: 0,
    fontWeight: 700,
    cursor: "pointer",
    fontSize: 12,
  };
}
