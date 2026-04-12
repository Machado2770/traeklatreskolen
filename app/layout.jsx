import Image from "next/image";
import "./globals.css";

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://traeklatreskolen.vercel.app"
  ),
  title: {
    default: "Træklatreskolen – Kurser og oplevelser i træklatring",
    template: "%s | Træklatreskolen",
  },
  description:
    "Træklatreskolen tilbyder professionelle kurser og oplevelser i træklatring i hele Danmark. Begynderkurser, instruktøruddannelse, overnatning i trækronerne og skovoplevelser for private, skoler og institutioner.",
  keywords: [
    "træklatring", "træklatreskole", "træklatrekursus", "træklatreinstruktør",
    "begynderkursus træklatring", "naturoplevelse", "skovoplevelse",
    "overnatning trækroner", "udendørs kursus Danmark",
  ],
  openGraph: {
    siteName: "Træklatreskolen",
    locale: "da_DK",
    type: "website",
    images: [{ url: "/images/hero-forest.jpg", width: 1600, height: 900 }],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }) {
  return (
    <html lang="da">
      <body
        style={{
          margin: 0,
          fontFamily: "system-ui, sans-serif",
          background: "#f5f7f6",
          color: "#1f2f25",
        }}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}

function Header() {
  return (
    <header
      style={{
        background: "#ffffff",
        borderBottom: "1px solid #e7ece8",
        padding: "14px 24px",
        position: "sticky",
        top: 0,
        zIndex: 20,
        boxShadow: "0 4px 18px rgba(0,0,0,0.05)",
      }}
    >
      <div className="header-inner">
        <a
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
          }}
        >
          <Image
            src="/logo/logo-main.png"
            alt="Træklatreskolen"
            width={320}
            height={72}
            priority
            style={{
              width: "auto",
              height: "auto",
              maxHeight: 54,
            }}
          />
        </a>

        <nav className="main-nav">
          <a href="/" style={navLink}>Forside</a>
          <a href="/kurser" style={navLink}>Kurser</a>
          <a href="/oplevelser" style={navLink}>Oplevelser</a>
          <a href="/kursuskalender" style={navLink}>Kursuskalender</a>
          <a href="/kontakt" style={navLink}>Kontakt</a>
          <a href="/booking" style={ctaLink}>Tilmelding</a>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer
      style={{
        marginTop: 60,
        background: "#1f3a2b",
        color: "white",
      }}
    >
      <div
        style={{
          maxWidth: 1180,
          margin: "0 auto",
          padding: "40px 24px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 28,
        }}
      >
        <div>
          <Image
            src="/logo/logo-main.png"
            alt="Træklatreskolen"
            width={260}
            height={60}
            style={{
              width: "auto",
              height: "auto",
              maxHeight: 42,
              background: "white",
              padding: 6,
              borderRadius: 8,
              marginBottom: 12,
            }}
          />
          <p style={footerText}>
            Kurser, faglighed og eventyrlige oplevelser i træernes verden.
          </p>
        </div>

        <div>
          <div style={footerHeading}>Sider</div>
          <div style={footerList}>
            <a href="/" style={footerLink}>Forside</a>
            <a href="/kurser" style={footerLink}>Kurser</a>
            <a href="/oplevelser" style={footerLink}>Oplevelser</a>
            <a href="/kursuskalender" style={footerLink}>Kursuskalender</a>
            <a href="/kontakt" style={footerLink}>Kontakt</a>
          </div>
        </div>

        <div>
          <div style={footerHeading}>Handling</div>
          <div style={footerList}>
            <a href="/booking" style={footerLink}>Tilmeld kursus</a>
            <a href="/admin" style={footerLink}>Admin</a>
            <a href="/login" style={footerLink}>Login</a>
          </div>
        </div>

        <div>
          <div style={footerHeading}>Kontakt</div>
          <p style={footerText}>Træklatreskolen</p>
          <p style={footerText}>
            Kontakt via bookingsiden eller ved direkte henvendelse.
          </p>
        </div>
      </div>

      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,0.12)",
          padding: "14px 24px",
          textAlign: "center",
          fontSize: 13,
          opacity: 0.8,
        }}
      >
        © Træklatreskolen · Natur · Faglighed · Oplevelser
      </div>
    </footer>
  );
}

const navLink = {
  color: "#1f3a2b",
  textDecoration: "none",
  fontWeight: 600,
};

const ctaLink = {
  color: "white",
  textDecoration: "none",
  fontWeight: 700,
  background: "#d8782f",
  padding: "10px 14px",
  borderRadius: 10,
};

const footerHeading = {
  fontWeight: 700,
  marginBottom: 12,
};

const footerList = {
  display: "flex",
  flexDirection: "column",
  gap: 8,
};

const footerLink = {
  color: "white",
  textDecoration: "none",
  opacity: 0.9,
};

const footerText = {
  margin: "0 0 8px",
  opacity: 0.88,
  lineHeight: 1.6,
};