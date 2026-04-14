"use client";

export default function VejledningPage() {
  return (
    <div>
      <div style={header}>
        <h1 style={h1}>Vejledning til admin</h1>
        <p style={sub}>Forstå hvordan systemet er bygget op og hvornår du bruger hvad.</p>
      </div>

      {/* Overblik */}
      <div style={infoBox}>
        <span style={infoIcon}>💡</span>
        <p style={infoText}>
          Admin-modulet er bygget i <strong>to separate lag</strong> — et katalog over hvad du tilbyder,
          og en kalender over hvornår det sker. De to lag arbejder uafhængigt af hinanden.
        </p>
      </div>

      {/* De to lag */}
      <div style={twoCol}>

        <div style={{ ...layerCard, borderTop: "4px solid #3d7a57" }}>
          <div style={layerIcon}>📚</div>
          <h2 style={layerTitle}>Lag 1 — Kurser & tekst</h2>
          <p style={layerSub}>Stamdata · Katalog · Beskrivelser</p>
          <p style={layerText}>
            Her styrer du <strong>hvad</strong> du tilbyder — kursusnavn, beskrivelse, pris, billede og bullet-punkter.
            Tænk på det som et produktkatalog. Det vises på <code style={code}>/kurser</code> og <code style={code}>/oplevelser</code> siderne.
          </p>
          <div style={tagRow}>
            <span style={tag}>Kursusnavn</span>
            <span style={tag}>Beskrivelse</span>
            <span style={tag}>Pris</span>
            <span style={tag}>Billede</span>
            <span style={tag}>Publiceret?</span>
          </div>
        </div>

        <div style={{ ...layerCard, borderTop: "4px solid #d8782f" }}>
          <div style={layerIcon}>📅</div>
          <h2 style={layerTitle}>Lag 2 — Kursuskalender</h2>
          <p style={layerSub}>Datoer · Steder · Pladser</p>
          <p style={layerText}>
            Her opretter du <strong>hvornår og hvor</strong> kurserne afholdes — en specifik dato, et sted og et max-antal pladser.
            Det er dette der vises på <code style={code}>/kursuskalender</code> siden.
          </p>
          <div style={tagRow}>
            <span style={{ ...tag, background: "#fdebd8", color: "#a3521d" }}>Dato</span>
            <span style={{ ...tag, background: "#fdebd8", color: "#a3521d" }}>Sted</span>
            <span style={{ ...tag, background: "#fdebd8", color: "#a3521d" }}>Max pladser</span>
            <span style={{ ...tag, background: "#fdebd8", color: "#a3521d" }}>Type</span>
          </div>
        </div>

      </div>

      {/* Eksempel */}
      <div style={exampleBox}>
        <div style={exampleLabel}>Eksempel</div>
        <div style={exampleFlow}>
          <div style={exampleStep}>
            <div style={exampleNum}>1</div>
            <div>
              <strong>Kurser & tekst</strong><br/>
              <span style={{ color: "#4b6355", fontSize: 14 }}>"Begynder i træklatring" med beskrivelse og pris</span>
            </div>
          </div>
          <div style={exampleArrow}>→</div>
          <div style={exampleStep}>
            <div style={{ ...exampleNum, background: "#d8782f" }}>2</div>
            <div>
              <strong>Kursuskalender</strong><br/>
              <span style={{ color: "#4b6355", fontSize: 14 }}>"Begynder · 12. maj · Sjælland · 8 pladser"</span>
            </div>
          </div>
          <div style={exampleArrow}>→</div>
          <div style={exampleStep}>
            <div style={{ ...exampleNum, background: "#1f3a2b" }}>✓</div>
            <div>
              <strong>Kursuskalender på siden</strong><br/>
              <span style={{ color: "#4b6355", fontSize: 14 }}>Deltagere kan se og tilmelde sig</span>
            </div>
          </div>
        </div>
      </div>

      {/* Knap-vejledning */}
      <h2 style={sectionTitle}>Hvad gør knapperne?</h2>

      <div style={btnGuideGrid}>

        <div style={btnCard}>
          <div style={{ ...btnBadge, background: "#1f3a2b" }}>Kurser & tekst</div>
          <div style={btnItem}>
            <div style={btnName}>Indlæs standardkurser</div>
            <p style={btnDesc}>
              Bruges <strong>første gang</strong> du sætter systemet op, eller når et <strong>nyt kursus</strong> er
              tilføjet i koden (fx Førstehjælpskursus). Indsætter kun kurser der ikke allerede findes — eksisterende kurser røres ikke.
            </p>
            <div style={whenBox}>
              🕐 <strong>Brug den når:</strong> du har fået tilføjet et nyt kursus og det ikke vises i listen endnu.
            </div>
          </div>

          <div style={{ ...btnItem, borderTop: "1px solid #edf2ee", paddingTop: 20, marginTop: 4 }}>
            <div style={btnName}>Opdater tekster fra standard</div>
            <p style={btnDesc}>
              Bruges når en <strong>tekst, beskrivelse eller bullet-punkt</strong> er blevet opdateret i koden.
              Overskriver tekst og bullets på alle kurser med de nyeste versioner. Pris, billede og
              publiceringstatus bevares uændret.
            </p>
            <div style={whenBox}>
              🕐 <strong>Brug den når:</strong> du har bedt om en tekstopdatering og vil have den slået igennem på siden.
            </div>
          </div>

          <div style={{ ...btnItem, borderTop: "1px solid #edf2ee", paddingTop: 20, marginTop: 4 }}>
            <div style={btnName}>Publicér / Skjul</div>
            <p style={btnDesc}>
              Styrer om et kursus er synligt på hjemmesiden. Et kursus kan godt eksistere i kataloget uden at være synligt — nyttigt hvis du forbereder et nyt kursus.
            </p>
            <div style={whenBox}>
              🕐 <strong>Brug den når:</strong> du vil skjule et kursus midlertidigt eller aktivere et nyt.
            </div>
          </div>
        </div>

        <div style={btnCard}>
          <div style={{ ...btnBadge, background: "#d8782f" }}>Kursuskalender</div>
          <div style={btnItem}>
            <div style={btnName}>Indlæs standardbegivenheder</div>
            <p style={btnDesc}>
              Indsætter et sæt eksempel-datoer fra koden som udgangspunkt. Bruges typisk kun <strong>én gang ved opstart</strong>,
              eller hvis kalenderen er helt tom og du vil have noget at arbejde ud fra.
            </p>
            <div style={whenBox}>
              🕐 <strong>Brug den når:</strong> kalenderen er tom og du vil have et startpunkt.
            </div>
          </div>

          <div style={{ ...btnItem, borderTop: "1px solid #edf2ee", paddingTop: 20, marginTop: 4 }}>
            <div style={btnName}>Opret ny begivenhed</div>
            <p style={btnDesc}>
              Den primære måde at tilføje kursusdatoer på. Vælg kursus, angiv dato, sted og max-antal pladser.
              Du kan oprette samme kursus mange gange med forskellige datoer.
            </p>
            <div style={whenBox}>
              🕐 <strong>Brug den når:</strong> du vil tilføje en ny dato til kursuskalenderen.
            </div>
          </div>
        </div>

      </div>

      {/* Arbejdsgang */}
      <h2 style={sectionTitle}>Den praktiske arbejdsgang</h2>

      <div style={workflowGrid}>
        {[
          { emoji: "✏️", title: "Ny tekst i et kursus?", steps: ["Kurser & tekst", "→ klik 'Opdater tekster fra standard'"] },
          { emoji: "➕", title: "Nyt kursus i koden?", steps: ["Kurser & tekst", "→ klik 'Indlæs standardkurser'"] },
          { emoji: "📅", title: "Nyt kursus på en dato?", steps: ["Kursuskalender", "→ klik 'Opret ny begivenhed'"] },
          { emoji: "👁️", title: "Skjul et kursus midlertidigt?", steps: ["Kurser & tekst", "→ klik 'Skjul' på kurset"] },
        ].map((item) => (
          <div key={item.title} style={workflowCard}>
            <div style={workflowEmoji}>{item.emoji}</div>
            <div style={workflowTitle}>{item.title}</div>
            {item.steps.map((s, i) => (
              <div key={i} style={{ fontSize: 13, color: i === 0 ? "#1f3a2b" : "#d8782f", fontWeight: i === 0 ? 700 : 600, marginTop: i === 0 ? 8 : 2 }}>{s}</div>
            ))}
          </div>
        ))}
      </div>

    </div>
  );
}

/* ── STYLES ── */

const header = { marginBottom: 28 };
const h1 = { color: "#1f3a2b", fontSize: 24, margin: "0 0 6px", fontWeight: 800 };
const sub = { color: "#4b6355", fontSize: 14, margin: 0 };

const infoBox = {
  display: "flex",
  gap: 14,
  alignItems: "flex-start",
  background: "#eef4ef",
  border: "1px solid #c6ddd0",
  borderRadius: 12,
  padding: "16px 20px",
  marginBottom: 28,
};
const infoIcon = { fontSize: 22, flexShrink: 0 };
const infoText = { margin: 0, fontSize: 15, lineHeight: 1.7, color: "#2d4034" };

const twoCol = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20, marginBottom: 28 };

const layerCard = {
  background: "white",
  borderRadius: 14,
  padding: "24px 22px",
  boxShadow: "0 4px 18px rgba(0,0,0,0.06)",
};
const layerIcon = { fontSize: 28, marginBottom: 10 };
const layerTitle = { color: "#1f3a2b", fontSize: 18, fontWeight: 800, margin: "0 0 2px" };
const layerSub = { color: "#6c8f7a", fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.6, margin: "0 0 12px" };
const layerText = { color: "#4b6355", fontSize: 14, lineHeight: 1.7, margin: "0 0 14px" };
const tagRow = { display: "flex", gap: 6, flexWrap: "wrap" };
const tag = { display: "inline-block", padding: "4px 9px", borderRadius: 999, background: "#e7efe9", color: "#1f3a2b", fontSize: 12, fontWeight: 700 };
const code = { background: "#eef3ef", padding: "1px 6px", borderRadius: 4, fontSize: 13, fontFamily: "monospace", color: "#1f3a2b" };

const exampleBox = {
  background: "white",
  borderRadius: 14,
  padding: "22px 24px",
  boxShadow: "0 4px 18px rgba(0,0,0,0.06)",
  marginBottom: 36,
};
const exampleLabel = { fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, color: "#6c8f7a", marginBottom: 16 };
const exampleFlow = { display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" };
const exampleStep = { display: "flex", alignItems: "center", gap: 12, flex: 1, minWidth: 160 };
const exampleNum = { width: 32, height: 32, borderRadius: "50%", background: "#3d7a57", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 14, flexShrink: 0 };
const exampleArrow = { fontSize: 20, color: "#c6ddd0", fontWeight: 700 };

const sectionTitle = { color: "#1f3a2b", fontSize: 18, fontWeight: 800, margin: "0 0 16px" };

const btnGuideGrid = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20, marginBottom: 36 };
const btnCard = { background: "white", borderRadius: 14, padding: "22px 22px", boxShadow: "0 4px 18px rgba(0,0,0,0.06)" };
const btnBadge = { display: "inline-block", color: "white", fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 999, marginBottom: 18, textTransform: "uppercase", letterSpacing: 0.6 };
const btnItem = { paddingBottom: 4 };
const btnName = { fontWeight: 700, color: "#1f3a2b", fontSize: 15, marginBottom: 6 };
const btnDesc = { color: "#4b6355", fontSize: 14, lineHeight: 1.7, margin: "0 0 10px" };
const whenBox = { background: "#f7faf8", borderRadius: 8, padding: "10px 12px", fontSize: 13, color: "#2d4034", lineHeight: 1.6 };

const workflowGrid = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 };
const workflowCard = { background: "white", borderRadius: 12, padding: "20px 18px", boxShadow: "0 4px 14px rgba(0,0,0,0.06)" };
const workflowEmoji = { fontSize: 26, marginBottom: 8 };
const workflowTitle = { fontWeight: 700, color: "#1f3a2b", fontSize: 14, lineHeight: 1.4 };
