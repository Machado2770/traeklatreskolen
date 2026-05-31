import sharp from "sharp";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Apple touch icon: 180x180, fuld baggrund (iOS maskerer selv hjørnerne),
// samme motiv/brandfarver som app/icon.svg, skaleret op (canopy/trunk x ~2.8).
const svg = `<svg width="180" height="180" viewBox="0 0 180 180" xmlns="http://www.w3.org/2000/svg">
  <rect width="180" height="180" fill="#1f3a2b"/>
  <circle cx="68" cy="76" r="29" fill="#5fae3a"/>
  <circle cx="112" cy="76" r="29" fill="#4e9a32"/>
  <circle cx="90" cy="54" r="33" fill="#6cc24a"/>
  <path d="M81 76 h18 v50 a9 9 0 0 1 -18 0 z" fill="#e8821e"/>
  <path d="M96 62 q20 14 3 31 q-20 14 0 31" fill="none" stroke="#f6a94a" stroke-width="7" stroke-linecap="round"/>
  <path d="M45 140 q45 20 90 0" fill="none" stroke="#e8821e" stroke-width="7.5" stroke-linecap="round"/>
</svg>`;

await sharp(Buffer.from(svg))
  .png()
  .toFile(join(__dirname, "..", "app", "apple-icon.png"));

console.log("Wrote app/apple-icon.png");
