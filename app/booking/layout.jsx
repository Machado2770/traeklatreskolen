// Booking er en transaktionsside med mange query-varianter (course/date/place).
// Den skal kunne tilgås, men ikke indekseres — derfor noindex.
export const metadata = {
  title: "Tilmelding",
  description: "Tilmeld dig et kursus eller en oplevelse hos Træklatreskolen.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/booking" },
};

export default function BookingLayout({ children }) {
  return children;
}
