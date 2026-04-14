import Image from "next/image";
import "./globals.css";
import Providers from "./providers";
import Header from "./components/Header";

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
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>

      </body>
    </html>
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
            <a href="/om-os" style={footerLink}>Om os</a>
          </div>
        </div>

        <div>
          <div style={footerHeading}>Kontakt</div>
          <div style={footerList}>
            <a href="/kontakt" style={footerLink}>Kontakt os</a>
            <a href="mailto:info@traeklatreskolen.dk" style={footerLink}>info@traeklatreskolen.dk</a>
          </div>
        </div>

        <div>
          <div style={footerHeading}>Tilmeld</div>
          <div style={footerList}>
            <a href="/kursuskalender" style={footerLink}>Se kursuskalender</a>
            <a href="/booking" style={footerLink}>Tilmeld kursus</a>
          </div>
        </div>
      </div>

      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,0.12)",
          padding: "14px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 12,
          maxWidth: 1180,
          margin: "0 auto",
        }}
      >
        <span style={{ fontSize: 13, opacity: 0.8 }}>
          © Træklatreskolen · Natur · Faglighed · Oplevelser
        </span>
        <a href="/admin" style={adminFooterBtn}>
          <svg width="15" height="15" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}>
            <circle cx="10" cy="7" r="3.5" stroke="currentColor" strokeWidth="1.7"/>
            <path d="M3 17c0-3.9 3.1-7 7-7s7 3.1 7 7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
          </svg>
          Admin
        </a>
      </div>
    </footer>
  );
}

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

const adminFooterBtn = {
  display: "inline-flex",
  alignItems: "center",
  gap: 7,
  padding: "8px 16px",
  background: "#d8782f",
  color: "white",
  borderRadius: 10,
  textDecoration: "none",
  fontWeight: 700,
  fontSize: 13,
  letterSpacing: "0.2px",
};