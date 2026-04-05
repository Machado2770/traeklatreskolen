export const metadata = {
  title: "Træklatreskolen",
  description: "Booking og deltagerstyring for Træklatreskolen",
};

export default function RootLayout({ children }) {
  return (
    <html lang="da">
      <body style={{ margin: 0, fontFamily: "Arial, sans-serif", background: "#f7faf7", color: "#213227" }}>
        {children}
      </body>
    </html>
  );
}
