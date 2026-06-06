// Fælles dato-logik for kursuskalenderen.
// Datoer indtastes som dansk tekst, fx "12. maj 2026" eller
// "30. maj - 1. juni 2026" (flerdages-arrangementer).

const MONTHS = {
  januar: 1, februar: 2, marts: 3, april: 4, maj: 5, juni: 6,
  juli: 7, august: 8, september: 9, oktober: 10, november: 11, december: 12,
};

const MONTH_RE = /januar|februar|marts|april|maj|juni|juli|august|september|oktober|november|december/g;

// Sidste dato i strengen — slutdatoen for flerdages-arrangementer.
// Returnerer { y, m (1-12), d } eller null hvis datoen ikke kan parses.
export function parseLastDate(str) {
  if (!str) return null;
  const lower = String(str).toLowerCase();
  const days = [...lower.matchAll(/(\d{1,2})\./g)].map((m) => +m[1]);
  const months = lower.match(MONTH_RE);
  const years = lower.match(/\d{4}/g);
  if (!days.length || !months || !years) return null;
  return {
    y: +years[years.length - 1],
    m: MONTHS[months[months.length - 1]],
    d: days[days.length - 1],
  };
}

// Sammenligningsnøgle YYYYMMDD — rene heltal, ingen tidszone-bøvl.
function dateKey(y, m, d) {
  return y * 10000 + m * 100 + d;
}

// Dags dato i dansk tidszone, uanset hvor serveren kører.
export function todayKeyCopenhagen() {
  const s = new Date().toLocaleDateString("en-CA", { timeZone: "Europe/Copenhagen" }); // "2026-06-06"
  const [y, m, d] = s.split("-").map(Number);
  return dateKey(y, m, d);
}

// true hvis arrangementet ikke er afholdt endnu (synligt til og med sidste dag).
// Datoer der ikke kan parses, regnes som kommende, så de ikke forsvinder stille
// pga. en tastefejl — ret i stedet datoen i admin-kalenderen.
export function isUpcoming(dateStr) {
  const last = parseLastDate(dateStr);
  if (!last) return true;
  return dateKey(last.y, last.m, last.d) >= todayKeyCopenhagen();
}
