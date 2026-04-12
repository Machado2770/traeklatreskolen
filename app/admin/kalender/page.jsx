"use client";

import { useEffect, useState } from "react";
import { courses as sdCourses, experiences as sdExperiences } from "@/lib/siteData";

function buildCourseOptions(cmsData) {
  // siteData er altid base — sikrer at standardkurser altid vises
  const base = [
    ...sdCourses.map(c     => ({ slug: c.slug, title: c.title, type: "Kursus",    href: `/kurser/${c.slug}`,     defaultMax: 8,  defaultPrice: c.price || "" })),
    ...sdExperiences.map(e => ({ slug: e.slug, title: e.title, type: "Oplevelse", href: `/oplevelser/${e.slug}`, defaultMax: 12, defaultPrice: e.price || "" })),
  ];

  if (!cmsData?.length) return base;

  // Supabase-data overstyrer siteData for samme slug; nye kurser tilføjes
  const cmsOptions = cmsData.map(c => ({
    slug:         c.slug,
    title:        c.title,
    type:         c.is_experience ? "Oplevelse" : "Kursus",
    href:         c.is_experience ? `/oplevelser/${c.slug}` : `/kurser/${c.slug}`,
    defaultMax:   c.is_experience ? 12 : 8,
    defaultPrice: c.price || "",
  }));

  const cmsSlugs = new Set(cmsOptions.map(c => c.slug));
  // Behold siteData-kurser der IKKE er i Supabase, tilføj derefter alle Supabase-kurser
  return [...base.filter(b => !cmsSlugs.has(b.slug)), ...cmsOptions];
}

const EMPTY = { courseIdx: "", dates: [""], place: "", max_participants: 8, price: "" };

function buildDateString(dates) {
  const filled = dates.filter(d => d.trim());
  if (filled.length === 0) return "";
  if (filled.length === 1) return filled[0];
  if (filled.length === 2) {
    const [a, b] = filled;
    const am = a.match(/^(\d+)\.\s+(\w+)\s+(\d{4})$/);
    const bm = b.match(/^(\d+)\.\s+(\w+)\s+(\d{4})$/);
    if (am && bm && am[2] === bm[2] && am[3] === bm[3]) {
      return `${am[1]}.–${bm[1]}. ${bm[2]} ${bm[3]}`;
    }
    return `${a} – ${b}`;
  }
  // 3+ datoer: "12. maj, 14. maj og 16. maj 2026"
  const last = filled[filled.length - 1];
  const rest = filled.slice(0, -1);
  return `${rest.join(", ")} og ${last}`;
}

export default function KalenderAdminPage() {
  const [items,   setItems]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const [form,    setForm]    = useState(EMPTY);
  const [editing, setEditing] = useState(null);
  const [msg,     setMsg]     = useState({ text: "", ok: true });

  async function load() {
    setLoading(true);
    const [calRes, cmsRes] = await Promise.all([
      fetch("/api/calendar",    { cache: "no-store" }),
      fetch("/api/courses-cms", { cache: "no-store" }),
    ]);
    const calData = await calRes.json();
    const cmsData = await cmsRes.json();
    setItems(calData.data || []);
    setCourses(buildCourseOptions(cmsData.data));
    setLoading(false);
  }
  useEffect(() => { load(); }, []);

  function flash(text, ok = true) { setMsg({ text, ok }); setTimeout(() => setMsg({ text: "", ok: true }), 3500); }

  function selectCourse(idx) {
    const c = courses[idx];
    setForm(p => ({ ...p, courseIdx: idx, max_participants: c?.defaultMax ?? 8, price: c?.defaultPrice ?? "" }));
  }

  async function save() {
    const selected = courses[form.courseIdx];
    if (!selected)             { flash("Vælg et kursus eller en oplevelse.", false); return; }
    if (!form.dates[0]?.trim()) { flash("Angiv mindst én dato.", false); return; }
    if (!form.place)           { flash("Angiv et sted.", false); return; }

    const dateString = buildDateString(form.dates);

    const payload = {
      title:            selected.title,
      type:             selected.type,
      href:             selected.href,
      date:             dateString,
      place:            form.place,
      max_participants: form.max_participants,
      price:            form.price,
    };

    const method = editing ? "PUT"  : "POST";
    const url    = editing ? `/api/calendar/${editing}` : "/api/calendar";
    const res    = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    if (!res.ok) { flash("Fejl ved gemning.", false); return; }
    flash(editing ? "Opdateret ✓" : "Tilføjet til kalender ✓");
    setForm(EMPTY); setEditing(null); load();
  }

  async function del(id) {
    if (!confirm("Slet denne kalenderbegivenhed?")) return;
    await fetch(`/api/calendar/${id}`, { method: "DELETE" });
    load();
  }

  function startEdit(item) {
    setEditing(item.id);
    const idx = courses.findIndex(c => c.title === item.title);
    setForm({ courseIdx: idx >= 0 ? idx : "", dates: [item.date], place: item.place, max_participants: item.max_participants, price: item.price || "" });
    window.scrollTo(0, 0);
  }

  const selected = form.courseIdx !== "" ? courses[form.courseIdx] : null;
  const sorted   = [...items].sort((a, b) => a.date.localeCompare(b.date));
  const kurser     = sorted.filter(i => i.type !== "Oplevelse");
  const oplevelser = sorted.filter(i => i.type === "Oplevelse");

  return (
    <>
      <div style={{ marginBottom: 24 }}>
        <h1 style={h1}>Kursuskalender</h1>
        <p style={sub}>Vælg et kursus eller en oplevelse og angiv dato, sted, pris og pladser.</p>
      </div>

      {/* ── Formular ── */}
      <div style={card}>
        <h2 style={h2}>{editing ? "Rediger begivenhed" : "Tilføj ny begivenhed"}</h2>

        {/* Trin 1: Vælg kursus/oplevelse */}
        <div style={stepRow}>
          <div style={stepNum}>1</div>
          <div style={{ flex: 1 }}>
            <div style={stepLabel}>Vælg kursus eller oplevelse</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))", gap: 8, marginTop: 10 }}>
              {courses.map((c, i) => (
                <button key={i} onClick={() => selectCourse(i)} style={{
                  padding: "10px 14px", borderRadius: 10, cursor: "pointer",
                  border: "2px solid", textAlign: "left", fontSize: 14,
                  borderColor: form.courseIdx === i ? "#3d7a57" : "#e0e9e3",
                  background:  form.courseIdx === i ? "#eef7f2" : "white",
                  color:       form.courseIdx === i ? "#1f3a2b" : "#4b6355",
                  fontWeight:  form.courseIdx === i ? 700 : 400,
                  display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8,
                }}>
                  <span>{c.title}</span>
                  <span style={{
                    fontSize: 11, fontWeight: 700, padding: "2px 7px", borderRadius: 999, flexShrink: 0,
                    background: c.type === "Kursus" ? "#e7efe9" : "#f5e5d8",
                    color:      c.type === "Kursus" ? "#1f3a2b" : "#a3521d",
                  }}>{c.type}</span>
                </button>
              ))}
            </div>
            {selected && (
              <div style={{ marginTop: 10, fontSize: 13, color: "#3d7a57", fontWeight: 600 }}>
                ✓ {selected.title} · {selected.type} · {selected.href}
              </div>
            )}
          </div>
        </div>

        {/* Trin 2: Detaljer */}
        <div style={{ ...stepRow, marginTop: 24 }}>
          <div style={stepNum}>2</div>
          <div style={{ flex: 1 }}>
            <div style={stepLabel}>Angiv dato, sted, pris og pladser</div>
            {/* Datoer — dynamisk liste */}
            <div style={{ marginTop: 10 }}>
              <div style={{ fontWeight: 600, fontSize: 13, color: "#1f3a2b", marginBottom: 6 }}>Datoer *</div>
              {form.dates.map((d, i) => (
                <div key={i} style={{ display: "flex", gap: 8, marginBottom: 8, alignItems: "center" }}>
                  <input
                    style={{ ...inp, flex: 1 }}
                    value={d}
                    placeholder={i === 0 ? "12. maj 2026" : "14. maj 2026"}
                    onChange={e => {
                      const next = [...form.dates];
                      next[i] = e.target.value;
                      setForm(p => ({ ...p, dates: next }));
                    }}
                  />
                  {form.dates.length > 1 && (
                    <button
                      onClick={() => setForm(p => ({ ...p, dates: p.dates.filter((_, j) => j !== i) }))}
                      style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid #e0e9e3", background: "white", color: "#8f2d20", cursor: "pointer", fontWeight: 700, fontSize: 14, flexShrink: 0 }}
                    >✕</button>
                  )}
                </div>
              ))}
              <button
                onClick={() => setForm(p => ({ ...p, dates: [...p.dates, ""] }))}
                style={{ padding: "7px 14px", borderRadius: 8, border: "1px dashed #3d7a57", background: "white", color: "#3d7a57", cursor: "pointer", fontWeight: 600, fontSize: 13, marginTop: 2 }}
              >+ Tilføj dato</button>
              <div style={hint}>Fx "12. maj 2026". Tilføj én linje per dag.</div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))", gap: 14, marginTop: 14 }}>
              <Field label="Sted *">
                <input style={inp} value={form.place}
                  onChange={e => setForm(p => ({ ...p, place: e.target.value }))}
                  placeholder="Sjælland" />
                <div style={hint}>Fx Sjælland, Fyn, Midtjylland…</div>
              </Field>
              <Field label="Pris">
                <input style={inp} value={form.price}
                  onChange={e => setForm(p => ({ ...p, price: e.target.value }))}
                  placeholder="1.900 kr." />
                <div style={hint}>Forvalgt fra kursus — kan tilpasses</div>
              </Field>
              <Field label="Maks. deltagere">
                <input style={inp} type="number" min={1} max={100} value={form.max_participants}
                  onChange={e => setForm(p => ({ ...p, max_participants: +e.target.value }))} />
                <div style={hint}>Vises som pladstæller på kalendersiden</div>
              </Field>
            </div>
            {form.dates[0]?.trim() && (
              <div style={{ marginTop: 10, fontSize: 13, color: "#3d7a57", fontWeight: 600 }}>
                Vises som: "{buildDateString(form.dates)}"
              </div>
            )}
          </div>
        </div>

        <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
          <button onClick={save} style={btn("#3d7a57")}>
            {editing ? "Gem ændringer" : "Tilføj til kalender"}
          </button>
          {editing && <button onClick={() => { setEditing(null); setForm(EMPTY); }} style={btn("#8f8f8f")}>Annullér</button>}
        </div>

        {msg.text && (
          <div style={{ marginTop: 14, padding: "10px 14px", borderRadius: 10, fontWeight: 600,
            background: msg.ok ? "#dff3e5" : "#fbe4e2",
            color:      msg.ok ? "#165c2c" : "#9a2f27" }}>
            {msg.text}
          </div>
        )}
      </div>

      {/* ── Kalender-oversigt ── */}
      <div style={{ marginTop: 28 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <h2 style={{ ...h2, margin: 0 }}>Planlagte begivenheder ({items.length})</h2>
        </div>

        {loading && <p style={{ color: "#4b6355" }}>Henter…</p>}
        {!loading && items.length === 0 && <div style={{ ...card, color: "#4b6355" }}>Ingen begivenheder endnu.</div>}

        {kurser.length > 0 && (
          <>
            <div style={groupLabel}>Kurser</div>
            {kurser.map(item => <CalendarRow key={item.id} item={item} onEdit={startEdit} onDelete={del} />)}
          </>
        )}
        {oplevelser.length > 0 && (
          <>
            <div style={{ ...groupLabel, marginTop: 16 }}>Oplevelser</div>
            {oplevelser.map(item => <CalendarRow key={item.id} item={item} onEdit={startEdit} onDelete={del} />)}
          </>
        )}
      </div>
    </>
  );
}

function CalendarRow({ item, onEdit, onDelete }) {
  return (
    <div style={{ ...card, marginBottom: 10, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
      <div>
        <div style={{ fontWeight: 700, color: "#1f3a2b", fontSize: 15 }}>{item.title}</div>
        <div style={{ display: "flex", gap: 8, marginTop: 6, flexWrap: "wrap" }}>
          <span style={chip("#f5e5d8", "#a3521d")}>{item.date}</span>
          <span style={chip("#e7efe9", "#2d5c3e")}>{item.place}</span>
          {item.price && <span style={chip("#fff7ed", "#a3521d")}>{item.price}</span>}
          <span style={chip("#eef3ef", "#3d5c47")}>Maks {item.max_participants}</span>
          <span style={chip(item.type === "Kursus" ? "#e7efe9" : "#f5e5d8", item.type === "Kursus" ? "#1f3a2b" : "#a3521d")}>{item.type}</span>
        </div>
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={() => onEdit(item)}     style={btn("#3d7a57")}>Rediger</button>
        <button onClick={() => onDelete(item.id)} style={btn("#8f2d20")}>Slet</button>
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label style={{ display: "block" }}>
      <div style={{ fontWeight: 600, fontSize: 13, color: "#1f3a2b", marginBottom: 5 }}>{label}</div>
      {children}
    </label>
  );
}

const h1        = { color: "#1f3a2b", fontSize: 24, margin: 0, fontWeight: 800 };
const h2        = { color: "#1f3a2b", fontSize: 17, margin: "0 0 16px", fontWeight: 700 };
const sub       = { color: "#4b6355", fontSize: 14, margin: "6px 0 0" };
const card      = { background: "white", borderRadius: 14, padding: 24, boxShadow: "0 4px 18px rgba(0,0,0,0.06)" };
const inp       = { width: "100%", padding: "10px 12px", borderRadius: 10, border: "1px solid #cfd8d3", font: "inherit", fontSize: 14, boxSizing: "border-box" };
const hint      = { fontSize: 12, color: "#8aab97", marginTop: 4 };
const stepRow   = { display: "flex", gap: 16, alignItems: "flex-start" };
const stepNum   = { width: 28, height: 28, borderRadius: "50%", background: "#1f3a2b", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 14, flexShrink: 0, marginTop: 2 };
const stepLabel = { fontWeight: 700, fontSize: 15, color: "#1f3a2b" };
const groupLabel = { fontSize: 12, fontWeight: 700, color: "#8aab97", textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 };
function chip(bg, color) { return { display: "inline-block", background: bg, color, padding: "3px 9px", borderRadius: 999, fontSize: 12, fontWeight: 600 }; }
function btn(bg) { return { padding: "10px 18px", borderRadius: 10, background: bg, color: "white", border: 0, fontWeight: 700, cursor: "pointer", fontSize: 14 }; }
