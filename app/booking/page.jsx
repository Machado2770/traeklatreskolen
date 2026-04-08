"use client";

import { useEffect, useState } from "react";

const defaultCourse = "Begynder i træklatring";

const courseOptions = [
  "Begynder i træklatring",
  "Træklatreinstruktør",
  "Avanceret træklatring",
  "Oplevelsestur i trækronerne",
  "Overnatning i trækronerne",
  "Den vilde klatretur",
  "Brush-up",
];

export default function BookingPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    course: defaultCourse,
    notes: "",
  });
  const [status, setStatus] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const selectedCourse = params.get("course");

    if (selectedCourse && courseOptions.includes(selectedCourse)) {
      setForm((prev) => ({
        ...prev,
        course: selectedCourse,
      }));
    }
  }, []);

  async function submit(e) {
    e.preventDefault();
    setStatus("Sender...");

    const response = await fetch("/api/booking", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (!response.ok) {
      const errorPayload = await response.json().catch(() => null);
      console.error(errorPayload);
      setStatus("Noget gik galt. Prøv igen.");
      return;
    }

    setStatus("Tilmelding modtaget. Deltager er oprettet med betalingsstatus 'pending'.");
    setForm({
      name: "",
      email: "",
      phone: "",
      course: defaultCourse,
      notes: "",
    });
  }

  return (
    <main style={{ maxWidth: 760, margin: "0 auto", padding: 40 }}>
      <h1 style={{ color: "#1f3a2b" }}>Kursustilmelding</h1>
      <p>
        Betaling sker via bankoverførsel. Deltageren oprettes først som <strong>pending</strong>,
        og kan derefter markeres som betalt i admin.
      </p>

      <div
        style={{
          background: "#fff",
          borderRadius: 16,
          padding: 20,
          marginBottom: 24,
          boxShadow: "0 6px 24px rgba(0,0,0,0.06)",
        }}
      >
        <div><strong>Reg.nr.:</strong> 1234</div>
        <div><strong>Konto:</strong> 567890</div>
        <div><strong>Reference:</strong> Navn + kursus</div>
      </div>

      <form
        onSubmit={submit}
        style={{
          display: "grid",
          gap: 14,
          background: "white",
          padding: 24,
          borderRadius: 16,
          boxShadow: "0 6px 24px rgba(0,0,0,0.06)",
        }}
      >
        <Field label="Navn">
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
            style={inputStyle}
          />
        </Field>

        <Field label="E-mail">
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
            style={inputStyle}
          />
        </Field>

        <Field label="Telefon">
          <input
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            style={inputStyle}
          />
        </Field>

        <Field label="Kursus / oplevelse">
          <select
            value={form.course}
            onChange={(e) => setForm({ ...form, course: e.target.value })}
            style={inputStyle}
          >
            {courseOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </Field>

        <Field label="Bemærkninger">
          <textarea
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
            rows={4}
            style={inputStyle}
          />
        </Field>

        <button type="submit" style={btnStyle}>Send tilmelding</button>
        {status ? <div>{status}</div> : null}
      </form>
    </main>
  );
}

function Field({ label, children }) {
  return (
    <label>
      <div style={{ fontWeight: 700, marginBottom: 6 }}>{label}</div>
      {children}
    </label>
  );
}

const inputStyle = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: 10,
  border: "1px solid #cfd8d3",
  boxSizing: "border-box",
  font: "inherit",
};

const btnStyle = {
  background: "#d8782f",
  color: "white",
  border: 0,
  padding: "12px 16px",
  borderRadius: 10,
  fontWeight: 700,
  cursor: "pointer",
};