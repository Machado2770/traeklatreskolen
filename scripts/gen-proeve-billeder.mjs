// Genererer skarpe prøvebilleder (1200×1200 PNG) til shop-varer, hvis
// nuværende billede ligger under billedstandarden (se docs/BILLEDSTANDARD-SHOP.md).
// Prøvebilledet viser varens navn + "Prøvebillede — nyt produktfoto er på vej",
// så det er tydeligt for kunden og for jer, hvilke fotos der mangler.
//
// Kør: node scripts/gen-proeve-billeder.mjs
// Output: public/images/shop/proeve/<slug>.png

import sharp from "sharp";
import { mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, "..", "public", "images", "shop", "proeve");
mkdirSync(outDir, { recursive: true });

const { products } = await import(new URL("../lib/shopData.js", import.meta.url));

// Varer der skal have prøvebillede: gamle billeder under standarden
// (korteste side < 200 px → uskarpe) eller intet billede.
const UPGRADE_SLUGS = [
  // Uskarpe gamle thumbnails
  "millet-spelunca-60m",
  "black-diamond-atc-xp",
  "faders-hms-skruekarabin",
  "faders-petit-dru",
  "faders-oval-440",
  "wild-country-synergy-hms",
  "faders-seven-step-etrier",
  "black-diamond-momentum-ds",
  "wild-country-vision-kids",
  "camp-classic-y",
  "camp-rock-star",
  "camp-armour",
  "klatresaek-lille",
  "klatresaek-stor",
  "kyllingeovn",
  "rundbraender",
  "frisport-kaffekrog",
  "frisport-toerrestativ",
  // Varer uden foto
  "baalpande",
  "baalgryde-stoebejern",
  "lejroekse",
  "vanddunk-med-hane",
];

function esc(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// Simpel ordombrydning til SVG-tekst (centreret, maks 3 linjer).
function wrapName(name, maxChars = 24) {
  const words = name.split(" ");
  const lines = [];
  let line = "";
  for (const w of words) {
    if ((line + " " + w).trim().length > maxChars && line) {
      lines.push(line);
      line = w;
    } else {
      line = (line + " " + w).trim();
    }
  }
  if (line) lines.push(line);
  return lines.slice(0, 3);
}

function svgFor(name) {
  const lines = wrapName(name);
  const nameY = 830 - (lines.length - 1) * 38;
  const nameTspans = lines
    .map((l, i) => `<tspan x="600" dy="${i === 0 ? 0 : 76}">${esc(l)}</tspan>`)
    .join("");
  return `<svg width="1200" height="1200" viewBox="0 0 1200 1200" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="1200" fill="#eef3ef"/>
  <circle cx="600" cy="460" r="290" fill="#e2ece5"/>
  <circle cx="600" cy="460" r="290" fill="none" stroke="#d3e2d8" stroke-width="4"/>

  <!-- Kamera-ikon -->
  <g stroke="#9bb3a4" stroke-width="22" fill="none" stroke-linejoin="round" stroke-linecap="round">
    <rect x="430" y="400" width="340" height="250" rx="30"/>
    <path d="M520 400 l34 -52 h92 l34 52"/>
    <circle cx="600" cy="522" r="72"/>
    <circle cx="722" cy="452" r="6" fill="#9bb3a4"/>
  </g>

  <!-- Varenavn -->
  <text x="600" y="${nameY}" text-anchor="middle"
        font-family="Segoe UI, Arial, sans-serif" font-size="62" font-weight="700"
        fill="#1f3a2b">${nameTspans}</text>

  <!-- Badge -->
  <rect x="390" y="985" width="420" height="70" rx="35" fill="#d8782f"/>
  <text x="600" y="1031" text-anchor="middle"
        font-family="Segoe UI, Arial, sans-serif" font-size="30" font-weight="700"
        letter-spacing="3" fill="#ffffff">PRØVEBILLEDE</text>
  <text x="600" y="1110" text-anchor="middle"
        font-family="Segoe UI, Arial, sans-serif" font-size="33"
        fill="#6c7f73">Nyt produktfoto er på vej</text>
</svg>`;
}

let n = 0;
for (const slug of UPGRADE_SLUGS) {
  const product = products.find((p) => p.slug === slug);
  if (!product) {
    console.warn(`ADVARSEL: ukendt slug '${slug}' — springes over.`);
    continue;
  }
  await sharp(Buffer.from(svgFor(product.name)))
    .png({ compressionLevel: 9 })
    .toFile(join(outDir, `${slug}.png`));
  n++;
}
console.log(`Skrev ${n} prøvebilleder til public/images/shop/proeve/`);
