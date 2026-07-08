// Google Analytics Data API (GA4) — letvægts-klient uden eksterne pakker.
// Signerer et service-konto-JWT med Node's crypto, veksler det til et
// access token og kalder Data API'et via fetch. Bruges KUN server-side
// (admin-statistik) — service-konto-nøglen må aldrig sendes til browseren.
//
// Krævede env-variabler (sættes i Vercel):
//   GA_PROPERTY_ID        — GA4 property-id, fx 533945728 (kun tal)
//   GA_SA_CLIENT_EMAIL    — service-kontoens e-mail (…@…iam.gserviceaccount.com)
//   GA_SA_PRIVATE_KEY     — service-kontoens private key (PEM). \n bevares.

import crypto from "crypto";

const TOKEN_URL = "https://oauth2.googleapis.com/token";
const SCOPE = "https://www.googleapis.com/auth/analytics.readonly";
const DATA_API = "https://analyticsdata.googleapis.com/v1beta";

// Access token caches i memory på tværs af requests (samme lambda-instans).
let cachedToken = null; // { token, exp (unix-sekunder) }

export function gaConfigured() {
  return Boolean(
    process.env.GA_PROPERTY_ID &&
      process.env.GA_SA_CLIENT_EMAIL &&
      process.env.GA_SA_PRIVATE_KEY
  );
}

function base64url(input) {
  return Buffer.from(input)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

async function getAccessToken() {
  const now = Math.floor(Date.now() / 1000);
  if (cachedToken && cachedToken.exp - 60 > now) return cachedToken.token;

  const clientEmail = process.env.GA_SA_CLIENT_EMAIL;
  // Vercel gemmer ofte private keys med escaped \n — gør dem til rigtige linjeskift.
  const privateKey = (process.env.GA_SA_PRIVATE_KEY || "").replace(/\\n/g, "\n");

  const header = base64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claim = base64url(
    JSON.stringify({
      iss: clientEmail,
      scope: SCOPE,
      aud: TOKEN_URL,
      iat: now,
      exp: now + 3600,
    })
  );
  const signingInput = `${header}.${claim}`;
  const signature = crypto
    .createSign("RSA-SHA256")
    .update(signingInput)
    .sign(privateKey);
  const jwt = `${signingInput}.${base64url(signature)}`;

  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });
  if (!res.ok) {
    throw new Error(`GA token-fejl: ${res.status} ${await res.text()}`);
  }
  const data = await res.json();
  cachedToken = { token: data.access_token, exp: now + (data.expires_in || 3600) };
  return cachedToken.token;
}

async function callApi(method, body) {
  const token = await getAccessToken();
  const propertyId = process.env.GA_PROPERTY_ID;
  const res = await fetch(`${DATA_API}/properties/${propertyId}:${method}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    throw new Error(`GA ${method}-fejl: ${res.status} ${await res.text()}`);
  }
  return res.json();
}

// Første metricværdi i første række som tal (0 hvis tom).
function firstMetric(report, idx = 0) {
  const v = report?.rows?.[0]?.metricValues?.[idx]?.value;
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
}

// "20260708" -> "8/7"
function shortDate(yyyymmdd) {
  const m = /^(\d{4})(\d{2})(\d{2})$/.exec(yyyymmdd || "");
  if (!m) return yyyymmdd || "";
  return `${Number(m[3])}/${Number(m[2])}`;
}

export async function getGaStats() {
  // Alle rapporter kører parallelt på samme (cachede) token — én round-trip i praksis.
  const [today, last30, pages, sources, daily, realtime] = await Promise.all([
    callApi("runReport", {
      dateRanges: [{ startDate: "today", endDate: "today" }],
      metrics: [{ name: "totalUsers" }, { name: "screenPageViews" }],
    }),
    callApi("runReport", {
      dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
      metrics: [
        { name: "totalUsers" },
        { name: "screenPageViews" },
        { name: "sessions" },
        { name: "screenPageViewsPerSession" },
      ],
    }),
    callApi("runReport", {
      dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
      dimensions: [{ name: "pageTitle" }],
      metrics: [{ name: "screenPageViews" }],
      orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }],
      limit: 6,
    }),
    callApi("runReport", {
      dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
      dimensions: [{ name: "sessionDefaultChannelGroup" }],
      metrics: [{ name: "sessions" }],
      orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
      limit: 6,
    }),
    callApi("runReport", {
      dateRanges: [{ startDate: "29daysAgo", endDate: "today" }],
      dimensions: [{ name: "date" }],
      metrics: [{ name: "totalUsers" }],
      orderBys: [{ dimension: { dimensionName: "date" } }],
    }),
    callApi("runRealtimeReport", {
      metrics: [{ name: "activeUsers" }],
    }),
  ]);

  return {
    configured: true,
    activeNow: firstMetric(realtime),
    today: {
      users: firstMetric(today, 0),
      views: firstMetric(today, 1),
    },
    last30: {
      users: firstMetric(last30, 0),
      views: firstMetric(last30, 1),
      sessions: firstMetric(last30, 2),
      viewsPerSession: Math.round(firstMetric(last30, 3) * 10) / 10,
    },
    topPages: (pages.rows || []).map((r) => ({
      title: r.dimensionValues?.[0]?.value || "(uden titel)",
      views: Number(r.metricValues?.[0]?.value || 0),
    })),
    sources: (sources.rows || []).map((r) => ({
      channel: r.dimensionValues?.[0]?.value || "(ukendt)",
      sessions: Number(r.metricValues?.[0]?.value || 0),
    })),
    daily: (daily.rows || []).map((r) => ({
      label: shortDate(r.dimensionValues?.[0]?.value),
      users: Number(r.metricValues?.[0]?.value || 0),
    })),
  };
}
