// Kilde-sporing — hvor kom den besøgende fra?
//
// Kilden bestemmes ved landing og gemmes i sessionStorage, så den følger med
// hele vejen til tilmeldingsformularen. Den sendes med bookingen og vises på
// admin-statistikken som "Tilmeldinger pr. kilde".
//
// Kun kildenavnet gemmes (fx "facebook") — ingen cookies, ingen ID'er der kan
// følge en person på tværs af sites, og alt forsvinder når fanen lukkes.

const KEY = "tks_source";

// Kendte domæner får et pænt, ensartet navn — ellers ville fx m.facebook.com,
// l.facebook.com og lm.facebook.com tælle som tre forskellige kilder.
const KNOWN_HOSTS = [
  [/(^|\.)(facebook|fb)\.(com|me)$/i, "facebook"],
  [/(^|\.)instagram\.com$/i, "instagram"],
  [/(^|\.)google\./i, "google"],
  [/(^|\.)bing\.com$/i, "bing"],
  [/(^|\.)duckduckgo\.com$/i, "duckduckgo"],
  [/(^|\.)linkedin\.com$/i, "linkedin"],
  [/(^|\.)(youtube\.com|youtu\.be)$/i, "youtube"],
];

// Kun små bogstaver, tal og enkelte tegn — kilden ender i databasen og på en
// admin-side, så den skal ikke kunne indeholde hvad som helst.
function clean(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9._-]/g, "")
    .slice(0, 40);
}

function detect() {
  const params = new URLSearchParams(window.location.search);

  // 1. UTM-tag på linket — det du selv sætter på opslag og bio-link.
  const utm = clean(params.get("utm_source"));
  if (utm) return utm;

  // 2. Meta hænger egne klik-id'er på links. De virker også når
  //    in-app-browseren i Facebook/Instagram ikke sender en referrer med.
  if (params.get("fbclid")) return "facebook";
  if (params.get("igshid")) return "instagram";

  // 3. Ellers: hvilket domæne kom klikket fra?
  const ref = document.referrer;
  if (!ref) return "direkte";
  try {
    const host = new URL(ref).hostname;
    // Referrer fra sitet selv (fx et link åbnet i ny fane): den ydre kilde er
    // ukendt, men tilmeldingen er ny — den hører til under "direkte", så
    // "ukendt" kan holdes fri til tilmeldinger fra før sporingen fandtes.
    if (host === window.location.hostname) return "direkte";
    const known = KNOWN_HOSTS.find(([re]) => re.test(host));
    return known ? known[1] : clean(host.replace(/^www\./, ""));
  } catch {
    return "direkte";
  }
}

// Første kilde i besøget vinder: en tilmelding tilskrives det opslag der
// bragte personen ind — ikke den sidste side de kom fra.
export function captureSource() {
  if (typeof window === "undefined") return;
  try {
    if (sessionStorage.getItem(KEY)) return;
    const source = detect();
    if (source) sessionStorage.setItem(KEY, source);
  } catch {
    /* sessionStorage kan være slået fra i privat browsing */
  }
}

export function getSource() {
  if (typeof window === "undefined") return "";
  try {
    return sessionStorage.getItem(KEY) || "";
  } catch {
    return "";
  }
}
