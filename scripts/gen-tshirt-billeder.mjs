// Genererer produkt-mockups (1200×1200 PNG) til shoppens tekst-t-shirts:
// en ren vektor-t-shirt med trykteksten på brystet, i sitets farver.
// Følger billedstandarden (se docs/BILLEDSTANDARD-SHOP.md).
//
// Kør: node scripts/gen-tshirt-billeder.mjs
// Output: public/images/shop/tshirt-<slug>.png

import sharp from "sharp";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, "..", "public", "images", "shop");

// Hver trøje: tryktekst (linjer), trøjefarve, tekstfarve og skriftstørrelse.
const SHIRTS = [
  {
    file: "tshirt-find-me-in-the-woods.png",
    lines: ["FIND ME", "IN THE", "WOODS"],
    shirt: "#1f3a2b", collar: "#16291e", text: "#f3e9d6", fontSize: 64,
  },
  {
    file: "tshirt-op-i-traeet.png",
    lines: ["OP I", "TRÆET!"],
    shirt: "#ece2cd", collar: "#d9cdb2", text: "#1f3a2b", fontSize: 84,
  },
  {
    file: "tshirt-jeg-haenger-bare-ud.png",
    lines: ["JEG", "HÆNGER", "BARE UD"],
    shirt: "#d8782f", collar: "#b85f1b", text: "#ffffff", fontSize: 64,
  },
  {
    file: "tshirt-the-tree-is-calling.png",
    lines: ["THE TREE", "IS CALLING", "AND I", "MUST GO"],
    shirt: "#1f3a2b", collar: "#16291e", text: "#f6a94a", fontSize: 56,
  },
  {
    file: "tshirt-gone-climbing.png",
    lines: ["GONE", "CLIMBING"],
    shirt: "#ece2cd", collar: "#d9cdb2", text: "#c2611d", fontSize: 78,
  },
  {
    file: "tshirt-find-mig-i-skoven.png",
    lines: ["FIND MIG", "I SKOVEN", "— KIG OP —"],
    shirt: "#4b6355", collar: "#3a4f44", text: "#f3e9d6", fontSize: 58,
  },
];

// Klassisk t-shirt-silhuet, centreret omkring x=600.
const TEE_PATH = `M447 300
  C 447 300 490 362 600 362
  C 710 362 753 300 753 300
  L 882 362
  L 954 542
  L 822 602
  L 786 542
  L 786 950
  Q 786 982 754 982
  L 446 982
  Q 414 982 414 950
  L 414 542
  L 378 602
  L 246 542
  L 318 362
  Z`;

function esc(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function svgFor({ lines, shirt, collar, text, fontSize }) {
  const lineHeight = Math.round(fontSize * 1.28);
  const blockH = lineHeight * (lines.length - 1);
  const startY = Math.round(640 - blockH / 2);
  const tspans = lines
    .map((l, i) => `<tspan x="600" dy="${i === 0 ? 0 : lineHeight}">${esc(l)}</tspan>`)
    .join("");
  return `<svg width="1200" height="1200" viewBox="0 0 1200 1200" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="1200" fill="#ffffff"/>

  <!-- Blød skygge under trøjen -->
  <ellipse cx="600" cy="1030" rx="290" ry="26" fill="rgba(31,58,43,0.10)"/>

  <!-- Trøje -->
  <path d="${TEE_PATH}" fill="${shirt}" stroke="${collar}" stroke-width="5" stroke-linejoin="round"/>

  <!-- Krave -->
  <path d="M447 300 C 447 300 490 362 600 362 C 710 362 753 300 753 300"
        fill="none" stroke="${collar}" stroke-width="16" stroke-linecap="round"/>

  <!-- Sømme på ærmer -->
  <path d="M822 602 L786 542 M378 602 L414 542"
        fill="none" stroke="${collar}" stroke-width="5" stroke-linecap="round"/>

  <!-- Tryk -->
  <text x="600" y="${startY}" text-anchor="middle"
        font-family="Segoe UI, Arial, sans-serif" font-size="${fontSize}" font-weight="800"
        letter-spacing="4" fill="${text}">${tspans}</text>
</svg>`;
}

for (const shirt of SHIRTS) {
  await sharp(Buffer.from(svgFor(shirt)))
    .png({ compressionLevel: 9 })
    .toFile(join(outDir, shirt.file));
}
console.log(`Skrev ${SHIRTS.length} t-shirt-mockups til public/images/shop/`);
