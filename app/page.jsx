export default function HomePage() {
  return (
    <main style={{ maxWidth: 960, margin: "0 auto", padding: 40 }}>
      <h1 style={{ color: "#1f3a2b" }}>Træklatreskolen</h1>
      <p>Version 8 er klar med admin-beskyttelse, betalingsstatus, filtrering og CSV-eksport.</p>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 24 }}>
        <a href="/booking" style={button("#d8782f")}>Kursustilmelding</a>
        <a href="/admin" style={button("#2f5f43")}>Admin</a>
        <a href="/api/auth/signin" style={button("#577e61")}>Login</a>
      </div>
    </main>
  );
}

function button(bg) {
  return {
    display: "inline-block",
    padding: "12px 18px",
    borderRadius: 10,
    background: bg,
    color: "white",
    textDecoration: "none",
    fontWeight: 700,
  };
}
