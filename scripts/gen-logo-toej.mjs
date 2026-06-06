// Sætter Træklatreskolens logo (hvid version) på beklædningsfotos og
// gemmer dem som produktbilleder til shoppen.
//
// Originalfotos ligger i scripts/assets/toej/. Logoet hvidgøres ud fra
// public/logo/logo-main.png (alle farvede pixels → hvide, kanterne bevares
// bløde via afstanden til hvid som alfakanal).
//
// Kør: node scripts/gen-logo-toej.mjs
// Output: public/images/shop/<navn>.jpg

import sharp from "sharp";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const outDir = join(root, "public", "images", "shop");

// Placering pr. plagg: logoets centrum og bredde som brøkdele af fotoet.
const GARMENTS = [
  { src: "softshell.webp", out: "softshell-jakke-logo.jpg", cx: 0.385, cy: 0.445, w: 0.155 },
  { src: "vest.webp",      out: "vest-logo.jpg",            cx: 0.405, cy: 0.400, w: 0.150 },
  { src: "jakke.jpg",      out: "skaljakke-logo.jpg",       cx: 0.355, cy: 0.480, w: 0.155 },
];

// Hvidgør logoet: RGB → hvid, alfa = (afstand til hvid) × oprindelig alfa.
async function whiteLogo() {
  const { data, info } = await sharp(join(root, "public", "logo", "logo-main.png"))
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  for (let i = 0; i < data.length; i += 4) {
    const dist = Math.max(255 - data[i], 255 - data[i + 1], 255 - data[i + 2]);
    // Tærskel 40 fjerner logoets næsten-hvide baggrund helt; kun selve
    // bogstaverne/swooshen (markant mørkere end hvid) bliver stående.
    const a = Math.max(0, Math.min(255, Math.round((dist - 40) * 2.5))) * (data[i + 3] / 255);
    data[i] = data[i + 1] = data[i + 2] = 255;
    data[i + 3] = Math.round(a);
  }
  return sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } })
    .png()
    .toBuffer();
}

const logoBuf = await whiteLogo();
const logoMeta = await sharp(logoBuf).metadata();

for (const g of GARMENTS) {
  const photo = sharp(join(__dirname, "assets", "toej", g.src));
  const { width, height } = await photo.metadata();

  const logoW = Math.round(width * g.w);
  const logoH = Math.round(logoW * (logoMeta.height / logoMeta.width));
  const left = Math.round(width * g.cx - logoW / 2);
  const top = Math.round(height * g.cy - logoH / 2);

  const resizedLogo = await sharp(logoBuf).resize({ width: logoW }).png().toBuffer();

  await photo
    .composite([{ input: resizedLogo, left, top }])
    .jpeg({ quality: 90 })
    .toFile(join(outDir, g.out));
}
console.log(`Skrev ${GARMENTS.length} produktbilleder med hvidt logo til public/images/shop/`);
