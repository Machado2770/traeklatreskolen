import Image from "next/image";

export const metadata = { title: "Arbejdstøj — admin" };

// Intern oversigt over Træklatreskolens arbejdstøj med logo.
// Disse plagg sælges ikke i shoppen — de bruges af instruktører og hjælpere.
// Billederne genereres med scripts/gen-logo-toej.mjs (originaler i scripts/assets/toej/).
const ITEMS = [
  {
    name: "Softshell-jakke med logo",
    image: "/images/shop/softshell-jakke-logo.jpg",
    note:
      "Smidig grøn softshell med hætte — vindtæt, åndbar og bevægelig nok til rebarbejde. Hverdagsjakken i skoven.",
    detail: "Træklatreskolens logo i hvidt på brystet. Størrelser efter behov (S–XXL).",
  },
  {
    name: "Skaljakke med logo",
    image: "/images/shop/skaljakke-logo.jpg",
    note:
      "Vandtæt skaljakke med tapede sømme og justerbar hætte — til de dage, hvor undervisningen fortsætter i silende regn.",
    detail: "Træklatreskolens logo i hvidt på brystet. Størrelser efter behov (S–XXL).",
  },
  {
    name: "Vest med logo",
    image: "/images/shop/vest-logo.jpg",
    note:
      "Sort vest med fleece — varm krop og frie arme til rebarbejde. Sælges også i shoppen under \"Jakker & veste\".",
    detail: "Træklatreskolens logo i hvidt på brystet. Størrelser efter behov (S–XXL).",
  },
];

export default function ArbejdstoejPage() {
  return (
    <div>
      <h1 style={h1}>Arbejdstøj</h1>
      <p style={intro}>
        Intern oversigt over Træklatreskolens arbejdstøj med logo — til instruktører og hjælpere.
        Jakkerne sælges ikke i shoppen; vesten gør (under &quot;Jakker &amp; veste&quot;).
      </p>

      <div style={grid}>
        {ITEMS.map((item) => (
          <div key={item.name} style={card}>
            <div style={imageWrap}>
              <Image src={item.image} alt={item.name} fill style={{ objectFit: "cover" }}
                sizes="(max-width: 768px) 100vw, 400px" />
            </div>
            <div style={body}>
              <h2 style={name}>{item.name}</h2>
              <p style={note}>{item.note}</p>
              <p style={detail}>{item.detail}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={hintBox}>
        <strong style={{ color: "#1f3a2b" }}>Bestilling af nyt arbejdstøj:</strong>{" "}
        Logoet sættes på nye fotos/plagg med <code style={code}>node scripts/gen-logo-toej.mjs</code>{" "}
        — originalbillederne ligger i <code style={code}>scripts/assets/toej/</code>.
      </div>
    </div>
  );
}

const h1 = { fontSize: 28, fontWeight: 800, color: "#1f3a2b", margin: "0 0 10px" };
const intro = { color: "#4b6355", fontSize: 15, lineHeight: 1.7, maxWidth: 720, margin: "0 0 28px" };

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
  gap: 24,
  maxWidth: 900,
};
const card = {
  background: "white",
  borderRadius: 16,
  overflow: "hidden",
  boxShadow: "0 6px 24px rgba(0,0,0,0.08)",
};
const imageWrap = { position: "relative", height: 320, background: "#eef3ef" };
const body = { padding: "18px 22px 22px" };
const name = { margin: "0 0 8px", color: "#1f3a2b", fontSize: 18, fontWeight: 700 };
const note = { margin: "0 0 10px", color: "#4b6355", fontSize: 14.5, lineHeight: 1.6 };
const detail = { margin: 0, color: "#6c7f73", fontSize: 13.5, lineHeight: 1.6 };

const hintBox = {
  marginTop: 28,
  maxWidth: 900,
  background: "#eef3ef",
  borderRadius: 12,
  padding: "16px 20px",
  color: "#4b6355",
  fontSize: 14,
  lineHeight: 1.7,
};
const code = {
  background: "white",
  padding: "2px 6px",
  borderRadius: 6,
  fontSize: 13,
  color: "#1f3a2b",
};
