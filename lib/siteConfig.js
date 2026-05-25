// Central konfiguration for hele sitet — ét sted at vedligeholde domæne,
// kontaktinfo og sociale profiler. Bruges af metadata, sitemap, robots og JSON-LD.

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.traeklatreskolen.dk"
).replace(/\/$/, "");

export const SITE_NAME = "Træklatreskolen";
export const SITE_DESCRIPTION =
  "Træklatreskolen tilbyder professionelle kurser og oplevelser i træklatring i hele Danmark. Begynderkurser, instruktøruddannelse, overnatning i trækronerne og skovoplevelser for private, skoler og institutioner.";

export const CONTACT_EMAIL = "info@traeklatreskolen.dk";

// CVR — dansk virksomhedsnummer (bruges som vatID i struktureret data).
export const CVR = "25579321";

// Telefon i international E.164-form (kræves af struktureret data).
// Kan overstyres via env, men har en fast default da nummeret er offentligt.
export const CONTACT_PHONE = process.env.NEXT_PUBLIC_PHONE || "+4551920114";

// Pæn visning til mennesker: "+45 51 92 01 14"
export const CONTACT_PHONE_DISPLAY = "+45 51 92 01 14";

// Geografisk dækning — bruges i LocalBusiness/areaServed.
export const AREA_SERVED = ["Sjælland", "Fyn", "Jylland"];

// Sociale profiler. Udfyldes via env og linkes i Organization.sameAs,
// så Google og AI-tjenester kan koble profilerne til virksomheden.
export const SOCIAL = {
  facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL || "",
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "",
  youtube: process.env.NEXT_PUBLIC_YOUTUBE_URL || "",
  linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL || "",
};

// Kun de profiler der faktisk er sat.
export const sameAs = Object.values(SOCIAL).filter(Boolean);

// Byg en absolut URL ud fra en sti ("/kurser" -> "https://.../kurser").
export function absUrl(path = "/") {
  if (!path) return SITE_URL;
  if (path.startsWith("http")) return path;
  return `${SITE_URL}${path.startsWith("/") ? "" : "/"}${path}`;
}
