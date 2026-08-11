// Simpel in-memory rate limiter (glidende vindue pr. nøgle).
//
// Formål: bremse bot-spam på formularer og brute-force på login uden at
// kræve ekstra infrastruktur eller env-nøgler. Tælleren lever i processens
// hukommelse — den nulstilles ved cold start og deles IKKE på tværs af flere
// serverless-instanser. Det er stadig en reel beskyttelse (en enkelt bot
// rammer typisk samme varme instans), men vil I have garanteret distribueret
// limitering, så skift til fx Upstash Ratelimit senere; API'et her kan
// beholdes uændret.

const buckets = new Map();

// Rydder udløbne nøgler så hukommelsen ikke vokser i det uendelige.
function sweep(now) {
  if (buckets.size < 5000) return;
  for (const [k, v] of buckets) {
    if (now > v.reset) buckets.delete(k);
  }
}

// Returnerer { ok, remaining, retryAfter } for en given nøgle.
export function rateLimit(key, { limit = 5, windowMs = 60_000 } = {}) {
  const now = Date.now();
  sweep(now);

  const entry = buckets.get(key);
  if (!entry || now > entry.reset) {
    buckets.set(key, { count: 1, reset: now + windowMs });
    return { ok: true, remaining: limit - 1, retryAfter: 0 };
  }

  if (entry.count >= limit) {
    return { ok: false, remaining: 0, retryAfter: Math.ceil((entry.reset - now) / 1000) };
  }

  entry.count += 1;
  return { ok: true, remaining: limit - entry.count, retryAfter: 0 };
}

// Udleder klientens IP fra proxy-headere. Virker både med en Web-Request
// (Headers med .get) og next-auth's authorize-req (almindeligt objekt).
export function clientIp(reqOrHeaders) {
  const source = reqOrHeaders?.headers ?? reqOrHeaders;
  const read = (name) => {
    if (!source) return null;
    if (typeof source.get === "function") return source.get(name);
    return source[name] ?? source[name.toLowerCase()] ?? null;
  };

  const xff = read("x-forwarded-for");
  if (xff) return String(xff).split(",")[0].trim();
  return read("x-real-ip") || "unknown";
}

// Standardsvar ved overskredet grænse — sæt Retry-After så pæne klienter kan
// vente det rigtige stykke tid.
export function tooManyRequests(retryAfter, message = "For mange forsøg. Vent lidt og prøv igen.") {
  return Response.json(
    { error: message },
    { status: 429, headers: { "Retry-After": String(retryAfter || 60) } }
  );
}
