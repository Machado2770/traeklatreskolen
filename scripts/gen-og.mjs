// Genererer statiske OG-billeder (1200×630) i public/og/ — titel på skovbaggrund,
// så de matcher de 6 oprindelige (forside, kurser, oplevelser, …).
//
// Hvorfor et script frem for dynamisk opengraph-image.js: @vercel/og kan ikke
// bygge i denne projektsti pga. mellemrum i OneDrive-stien (fileURLToPath
// "Invalid URL"). satori kaldes derimod direkte med font-buffere og rammer ikke
// den fejl; satori tegner tekst som vektorbaner, så sharp kan rasterisere det
// font-uafhængigt.
//
// Forudsætning: Poppins-fonte i C:\temp\ogfonts (Regular/SemiBold/ExtraBold).
// Hentes med:
//   curl -sL -o C:\temp\ogfonts\Poppins-Regular.ttf  https://github.com/google/fonts/raw/main/ofl/poppins/Poppins-Regular.ttf
//   curl -sL -o C:\temp\ogfonts\Poppins-SemiBold.ttf  https://github.com/google/fonts/raw/main/ofl/poppins/Poppins-SemiBold.ttf
//   curl -sL -o C:\temp\ogfonts\Poppins-ExtraBold.ttf https://github.com/google/fonts/raw/main/ofl/poppins/Poppins-ExtraBold.ttf
//
// Kør:  node scripts/gen-og.mjs

import fs from "node:fs";
import path from "node:path";
import satori from "satori";
import sharp from "sharp";

const ROOT = process.cwd();
const FONT_DIR = "C:\\temp\\ogfonts";
const OUT_DIR = path.join(ROOT, "public", "og");

const bg = fs.readFileSync(path.join(ROOT, "public", "images", "hero-forest.jpg"));
const bgDataUri = `data:image/jpeg;base64,${bg.toString("base64")}`;

const fonts = [
  { name: "Poppins", weight: 400, style: "normal", data: fs.readFileSync(path.join(FONT_DIR, "Poppins-Regular.ttf")) },
  { name: "Poppins", weight: 600, style: "normal", data: fs.readFileSync(path.join(FONT_DIR, "Poppins-SemiBold.ttf")) },
  { name: "Poppins", weight: 800, style: "normal", data: fs.readFileSync(path.join(FONT_DIR, "Poppins-ExtraBold.ttf")) },
];

// Billeder der skal genereres.
const IMAGES = [
  {
    file: "shop.png",
    eyebrow: "SHOP",
    title: "Udstyr vi selv klatrer med",
    subtitle: "Kvalificeret klatre- og friluftsudstyr — og vejledning med i købet.",
  },
  {
    file: "naturdannelse.png",
    eyebrow: "NATURDANNELSE",
    title: "Naturen som læringsrum",
    subtitle: "Træklatring som ramme for læring, refleksion og personlig udvikling.",
  },
];

function tree({ eyebrow, title, subtitle }) {
  return {
    type: "div",
    props: {
      style: {
        width: 1200, height: 630, display: "flex", position: "relative",
        fontFamily: "Poppins", overflow: "hidden",
      },
      children: [
        // Baggrundsfoto
        {
          type: "img",
          props: {
            src: bgDataUri, width: 1200, height: 630,
            style: { position: "absolute", top: 0, left: 0, width: 1200, height: 630, objectFit: "cover" },
          },
        },
        // Mørk gradient-overlay (mørkest nederst, hvor teksten står)
        {
          type: "div",
          props: {
            style: {
              position: "absolute", top: 0, left: 0, width: 1200, height: 630, display: "flex",
              backgroundImage:
                "linear-gradient(180deg, rgba(18,33,26,0.38) 0%, rgba(18,33,26,0.55) 48%, rgba(13,24,18,0.90) 100%)",
            },
          },
        },
        // Indhold
        {
          type: "div",
          props: {
            style: {
              position: "absolute", top: 0, left: 0, width: 1200, height: 630,
              display: "flex", flexDirection: "column", justifyContent: "space-between",
              padding: "64px 70px", color: "#ffffff",
            },
            children: [
              // Eyebrow
              {
                type: "div",
                props: {
                  style: {
                    display: "flex", fontSize: 22, fontWeight: 600, letterSpacing: 4,
                    color: "rgba(255,255,255,0.92)",
                  },
                  children: eyebrow,
                },
              },
              // Titel + undertekst
              {
                type: "div",
                props: {
                  style: { display: "flex", flexDirection: "column" },
                  children: [
                    {
                      type: "div",
                      props: {
                        style: { display: "flex", fontSize: 66, fontWeight: 800, lineHeight: 1.04, maxWidth: 1000 },
                        children: title,
                      },
                    },
                    {
                      type: "div",
                      props: {
                        style: {
                          display: "flex", fontSize: 30, fontWeight: 400, lineHeight: 1.35,
                          marginTop: 20, maxWidth: 880, color: "rgba(255,255,255,0.90)",
                        },
                        children: subtitle,
                      },
                    },
                  ],
                },
              },
              // Footer: orange prik + URL
              {
                type: "div",
                props: {
                  style: { display: "flex", alignItems: "center" },
                  children: [
                    {
                      type: "div",
                      props: { style: { width: 14, height: 14, borderRadius: 7, background: "#d8782f", marginRight: 12, display: "flex" } },
                    },
                    {
                      type: "div",
                      props: { style: { display: "flex", fontSize: 24, fontWeight: 600 }, children: "www.traeklatreskolen.dk" },
                    },
                  ],
                },
              },
            ],
          },
        },
      ],
    },
  };
}

for (const img of IMAGES) {
  const svg = await satori(tree(img), { width: 1200, height: 630, fonts });
  const out = path.join(OUT_DIR, img.file);
  await sharp(Buffer.from(svg)).png().toFile(out);
  console.log("Skrev", out);
}
