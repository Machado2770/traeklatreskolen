export const metadata = {
  title: "Træklatreskolen",
  description: "Kurser og oplevelser i træklatring",
};

export default function RootLayout({ children }) {
  return (
    <html lang="da">
      <body style={{ margin: 0, fontFamily: "system-ui, sans-serif", background: "#f5f7f6" }}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}

function Header() {
  return (
    <header style={{
      background: "#1f3a2b",
      color: "white",
      padding: "16px 24px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }}>
      <div style={{ fontWeight: 700, fontSize: 20 }}>
        🌳 Træklatreskolen
      </div>

      <nav style={{ display: "flex", gap: 20 }}>
        <a href="/" style={link}>Forside</a>
        <a href="/booking" style={link}>Tilmeld</a>
        <a href="/admin" style={link}>Admin</a>
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer style={{
      marginTop: 60,
      background: "#1f3a2b",
      color: "white",
      padding: 24,
      textAlign: "center"
    }}>
      <div>© Træklatreskolen</div>
      <div style={{ marginTop: 8, fontSize: 12, opacity: 0.7 }}>
        Natur · Faglighed · Oplevelser
      </div>
    </footer>
  );
}

const link = {
  color: "white",
  textDecoration: "none",
  fontWeight: 600
};