"use client";

import { useEffect, useState } from "react";

const courseOptions = [
  "Begynder i træklatring",
  "Træklatreinstruktør",
  "Avanceret træklatring",
  "Eksamen til træklatreinstruktør",
  "Brush-up i træklatring",
  "Oplevelsestur i trækronerne",
  "Overnatning i trækronerne",
  "Den vilde klatretur",
  "Andet / ikke sikker",
];

export default function BookingPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    course: courseOptions[0],
    notes: "",
  });
  const [courseLabel, setCourseLabel] = useState(null); // vises når man kommer fra kalender
  const [status, setStatus] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const course = params.get("course");
    const date = params.get("date");
    const place = params.get("place");

    if (course) {
      // Byg en samlet streng der gemmes i DB
      const parts = [course];
      if (date) parts.push(date);
      if (place) parts.push(place);
      const combined = parts.join(" – ");

      setForm((prev) => ({ ...prev, course: combined }));
      setCourseLabel({ course, date, place });
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

    setStatus("Tilmelding modtaget! Vi sender bekræftelse pr. email.");
    setForm({ name: "", email: "", phone: "", course: courseOptions[0], notes: "" });
    setCourseLabel(null);
  }

  return (
    <main style={page}>
      <div style={pageInner}>

        <div style={pageHeader}>
          <h1 style={h1}>Kursustilmelding</h1>
          <p style={lead}>
            Udfyld formularen herunder. Du modtager en faktura pr. e-mail
            efter tilmelding.
          </p>
        </div>

        {/* Betalingsinfo */}
        <div style={infoBox}>
          <div style={infoTitle}>Sådan foregår det</div>
          <p style={{ margin: "0 0 8px", color: "#33463a", fontSize: 15, lineHeight: 1.7 }}>
            Når du sender tilmeldingen, modtager du en <strong>faktura pr. e-mail</strong> som
            bekræftelse på din plads. Pladsen er reserveret, når betalingen er modtaget.
          </p>
          <p style={{ margin: 0, color: "#4b6355", fontSize: 14 }}>
            Fakturaen sendes til den e-mailadresse du opgiver i formularen.
          </p>
        </div>

        {/* Kursus-info boks — vises kun når man kommer fra kalender */}
        {courseLabel && (
          <div style={courseBox}>
            <div style={courseBoxLabel}>Du tilmelder dig</div>
            <div style={courseBoxTitle}>{courseLabel.course}</div>
            <div style={courseBoxMeta}>
              {courseLabel.date && <span style={metaChip}>📅 {courseLabel.date}</span>}
              {courseLabel.place && <span style={metaChip}>📍 {courseLabel.place}</span>}
            </div>
          </div>
        )}

        {/* Formular */}
        <form onSubmit={submit} style={formStyle}>
          <Field label="Navn *">
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              placeholder="Dit fulde navn"
              style={inputStyle}
            />
          </Field>

          <Field label="E-mail *">
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              placeholder="din@email.dk"
              style={inputStyle}
            />
          </Field>

          <Field label="Telefon">
            <input
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="+45 12 34 56 78"
              style={inputStyle}
            />
          </Field>

          {/* Kursusvalg — dropdown hvis ingen dato i URL, ellers låst */}
          {courseLabel ? (
            <Field label="Kursus / oplevelse">
              <div style={lockedField}>
                {form.course}
              </div>
            </Field>
          ) : (
            <Field label="Kursus / oplevelse *">
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
          )}

          <Field label="Bemærkninger">
            <textarea
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              rows={4}
              placeholder="Særlige ønsker, spørgsmål eller andet..."
              style={inputStyle}
            />
          </Field>

          <button type="submit" style={btnStyle}>Send tilmelding</button>

          {status && (
            <div style={{
              padding: "14px 18px",
              borderRadius: 12,
              background: status.includes("galt") ? "#fbe4e2" : "#dff3e5",
              color: status.includes("galt") ? "#9a2f27" : "#165c2c",
              fontWeight: 600,
            }}>
              {status}
            </div>
          )}
        </form>

      </div>
    </main>
  );
}

function Field({ label, children }) {
  return (
    <label style={{ display: "block" }}>
      <div style={{ fontWeight: 700, marginBottom: 6, color: "#1f3a2b", fontSize: 14 }}>
        {label}
      </div>
      {children}
    </label>
  );
}

/* STYLES */
const page = {
  background: "#f5f7f6",
  minHeight: "100vh",
  padding: "48px 24px 80px",
};

const pageInner = {
  maxWidth: 680,
  margin: "0 auto",
  display: "flex",
  flexDirection: "column",
  gap: 20,
};

const pageHeader = {
  marginBottom: 4,
};

const h1 = {
  color: "#1f3a2b",
  fontSize: 36,
  fontWeight: 800,
  margin: "0 0 10px",
};

const lead = {
  color: "#4b6355",
  fontSize: 17,
  lineHeight: 1.7,
  margin: 0,
};

const infoBox = {
  background: "white",
  borderRadius: 16,
  padding: "20px 24px",
  boxShadow: "0 4px 18px rgba(0,0,0,0.06)",
  borderLeft: "4px solid #d8782f",
};

const infoTitle = {
  fontWeight: 700,
  color: "#1f3a2b",
  marginBottom: 12,
  fontSize: 15,
};

const infoGrid = {
  display: "grid",
  gridTemplateColumns: "auto 1fr",
  gap: "6px 20px",
  fontSize: 15,
  color: "#33463a",
};

const infoLabel = {
  fontWeight: 600,
  color: "#4b6355",
};

const courseBox = {
  background: "#1f3a2b",
  borderRadius: 16,
  padding: "22px 24px",
  color: "white",
};

const courseBoxLabel = {
  fontSize: 12,
  letterSpacing: 2,
  textTransform: "uppercase",
  opacity: 0.7,
  marginBottom: 8,
};

const courseBoxTitle = {
  fontSize: 22,
  fontWeight: 800,
  marginBottom: 14,
};

const courseBoxMeta = {
  display: "flex",
  gap: 10,
  flexWrap: "wrap",
};

const metaChip = {
  background: "rgba(255,255,255,0.15)",
  borderRadius: 999,
  padding: "6px 14px",
  fontSize: 14,
  fontWeight: 600,
};

const formStyle = {
  background: "white",
  borderRadius: 16,
  padding: "28px 24px",
  boxShadow: "0 4px 18px rgba(0,0,0,0.06)",
  display: "flex",
  flexDirection: "column",
  gap: 18,
};

const inputStyle = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: 10,
  border: "1px solid #cfd8d3",
  boxSizing: "border-box",
  font: "inherit",
  fontSize: 15,
  background: "#fafcfb",
};

const lockedField = {
  padding: "12px 14px",
  borderRadius: 10,
  border: "1px solid #cfd8d3",
  background: "#eef3ef",
  color: "#1f3a2b",
  fontWeight: 600,
  fontSize: 15,
};

const btnStyle = {
  background: "#d8782f",
  color: "white",
  border: 0,
  padding: "14px 20px",
  borderRadius: 12,
  fontWeight: 700,
  fontSize: 16,
  cursor: "pointer",
  marginTop: 4,
};
