import Image from "next/image";
import Script from "next/script";
import "./globals.css";
import Providers from "./providers";
import Header from "./components/Header";
import NewsPopup from "./components/NewsPopup";
import FloatingCart from "./components/FloatingCart";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "@/lib/siteConfig";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Træklatreskolen – Kurser og oplevelser i træklatring",
    template: "%s | Træklatreskolen",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "træklatring", "træklatreskole", "træklatrekursus", "træklatreinstruktør",
    "begynderkursus træklatring", "naturoplevelse", "skovoplevelse",
    "overnatning trækroner", "udendørs kursus Danmark",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    siteName: SITE_NAME,
    locale: "da_DK",
    type: "website",
    url: SITE_URL,
    images: [
      {
        url: "/og/forside.png",
        width: 1200,
        height: 630,
        alt: "Træklatreskolen — kurser og oplevelser i trækronerne",
      },
    ],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }) {
  return (
    <html lang="da">
      {GA_ID && <>
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
        <Script id="ga4-init" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}</Script>
      </>}
      <body
        style={{
          margin: 0,
          fontFamily: "system-ui, sans-serif",
          background: "#f7f4ee",
          color: "#1f2f25",
        }}
      >
        <Providers>
          <Header />
          {children}
          <Footer />
          <NewsPopup />
          <FloatingCart />
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
          <a href="/shop" style={shopFooterLink}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
              <path d="M3 4h2l2.4 12.2a1.5 1.5 0 001.5 1.2h8.6a1.5 1.5 0 001.5-1.2L21 8H6"
                stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="10" cy="20.5" r="1.4" fill="currentColor"/>
              <circle cx="18" cy="20.5" r="1.4" fill="currentColor"/>
            </svg>
            Shop — køb det grej vi selv bruger
          </a>
          <div style={{ marginTop: 16 }}>
            <a href="/admin" style={adminFooterBtn}>
              <svg width="15" height="15" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}>
                <circle cx="10" cy="7" r="3.5" stroke="currentColor" strokeWidth="1.7"/>
                <path d="M3 17c0-3.9 3.1-7 7-7s7 3.1 7 7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
              </svg>
              Admin login
            </a>
          </div>
        </div>

        <div>
          <div style={footerHeading}>Sider</div>
          <div style={footerList} className="footer-links">
            <a href="/" style={footerLink}>Forside</a>
            <a href="/kurser" style={footerLink}>Kurser</a>
            <a href="/oplevelser" style={footerLink}>Oplevelser</a>
            <a href="/kursuskalender" style={footerLink}>Kursuskalender</a>
            <a href="/guides" style={footerLink}>Guides</a>
            <a href="/om-os" style={footerLink}>Om os</a>
          </div>
        </div>

        <div>
          <div style={footerHeading}>Kontakt</div>
          <div style={footerList} className="footer-links">
            <a href="/kontakt" style={footerLink}>Kontakt os</a>
            <a href="mailto:info@traeklatreskolen.dk" style={footerLink}>info@traeklatreskolen.dk</a>
          </div>
        </div>

        <div>
          <div style={footerHeading}>Tilmeld</div>
          <div style={footerList} className="footer-links">
            <a href="/kursuskalender" style={footerLink}>Se kursuskalender</a>
            <a href="/booking" style={footerLink}>Tilmeld kursus</a>
          </div>
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

const shopFooterLink = {
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  marginTop: 10,
  padding: "10px 18px",
  background: "#d8782f",
  color: "white",
  borderRadius: 10,
  textDecoration: "none",
  fontWeight: 700,
  fontSize: 14,
  lineHeight: 1.4,
  boxShadow: "0 4px 14px rgba(216,120,47,0.35)",
};

const adminFooterBtn = {
  display: "inline-flex",
  alignItems: "center",
  gap: 7,
  padding: "8px 16px",
  background: "transparent",
  color: "rgba(255,255,255,0.75)",
  border: "1px solid rgba(255,255,255,0.3)",
  borderRadius: 10,
  textDecoration: "none",
  fontWeight: 700,
  fontSize: 13,
  letterSpacing: "0.2px",
};