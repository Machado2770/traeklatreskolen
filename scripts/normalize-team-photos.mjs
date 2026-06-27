// Normaliserer portrætter til om-os, så HOVEDERNE fylder lige meget på alle
// kort — uanset hvor tæt/langt det oprindelige foto er taget.
//
// Sådan virker det: For hvert foto angives en "head box" (toppen af håret,
// hagen og ansigtets vandrette midte i kildens pixels). Scriptet beskærer til
// ét fast billedformat (OUT_W×OUT_H), så hovedet altid udgør samme andel
// (HEAD_FRACTION) af billedhøjden og sidder samme sted. Output er ens i mål og
// hovedstørrelse → kortene ser ensartede ud.
//
// STANDARD til kommende billeder: læg originalen i scripts/assets/team/,
// tilføj en blok i PEOPLE med slug + headTop/chin/centerX (aflæs i et
// billedprogram), og kør:  node scripts/normalize-team-photos.mjs
// Output: public/images/team/<slug>.jpg
//
// HEAD_FRACTION kan ikke være mindre end et tæt foto tillader (et selfie kan
// ikke "zoomes ud"). Kasper er det tætteste foto og sætter derfor loftet.

import sharp from "sharp";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { mkdirSync } from "node:fs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SRC = join(__dirname, "assets", "team");
const OUT = join(__dirname, "..", "public", "images", "team");

// Fast outputformat (4:3) og hvor stor en andel af højden hovedet skal fylde.
const OUT_W = 1400;
const OUT_H = 1050;
const OUT_ASPECT = OUT_W / OUT_H;
const HEAD_FRACTION = 0.7; // top-af-hår → hage = 70 % af billedhøjden (matcher Kaspers tætte foto)
const TOP_SHARE = 0.42;    // hvor stor del af luften der lægges OVER hovedet

// headTop/chin/centerX aflæst i kildens egne pixels.
const PEOPLE = [
  { slug: "lykke",  file: "lykke.jpg",  headTop: 330, chin: 905,  centerX: 870 },
  { slug: "kasper", file: "kasper.png", headTop: 18,  chin: 600,  centerX: 470 },
  { slug: "martin", file: "martin.jpg", headTop: 545, chin: 1960, centerX: 1850 },
];

function clamp(v, min, max) {
  return Math.max(min, Math.min(max, v));
}

async function run() {
  mkdirSync(OUT, { recursive: true });

  for (const p of PEOPLE) {
    const srcPath = join(SRC, p.file);
    const img = sharp(srcPath);
    const meta = await img.metadata();
    const headH = p.chin - p.headTop;

    // Ønsket beskæringshøjde, så hovedet bliver HEAD_FRACTION af outputtet.
    let cropH = Math.round(headH / HEAD_FRACTION);
    let cropW = Math.round(cropH * OUT_ASPECT);

    // Hvis fotoet er for tæt til at give plads (cropH > billedet), zoomes der
    // så meget ud som muligt (brug hele højden) — hovedet bliver da lidt
    // større end målet, men aldrig beskåret.
    if (cropH > meta.height) {
      cropH = meta.height;
      cropW = Math.round(cropH * OUT_ASPECT);
    }
    if (cropW > meta.width) {
      cropW = meta.width;
      cropH = Math.round(cropW / OUT_ASPECT);
    }

    // Placér hovedet lodret med TOP_SHARE af luften ovenover.
    const slack = cropH - headH;
    let top = Math.round(p.headTop - slack * TOP_SHARE);
    let left = Math.round(p.centerX - cropW / 2);

    top = clamp(top, 0, meta.height - cropH);
    left = clamp(left, 0, meta.width - cropW);

    const outPath = join(OUT, `${p.slug}.jpg`);
    await sharp(srcPath)
      .extract({ left, top, width: cropW, height: cropH })
      .resize(OUT_W, OUT_H, { fit: "cover" })
      .jpeg({ quality: 86, mozjpeg: true })
      .toFile(outPath);

    const headPct = ((headH / cropH) * 100).toFixed(1);
    console.log(`${p.slug.padEnd(7)} crop ${cropW}x${cropH} @ (${left},${top})  hoved=${headPct}%  -> public/images/team/${p.slug}.jpg`);
  }
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
