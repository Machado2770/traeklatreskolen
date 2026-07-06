// Skovbryn-overgang — genbrugelig sektionsovergang med trætop-silhuet.
//
// Motivet fungerer, hvor en MØRK hero møder en LYS sektion: trætoppenes
// mellemrum er transparente, så den mørke hero skinner igennem som silhuet,
// mens den udfyldte "skovbund" har samme farve som sektionen nedenunder og
// derfor flugter sømløst med den.
//
// Brug: læg <TreelineDivider color="#eef3ef" /> lige efter hero-<section>,
// hvor color er baggrundsfarven på sektionen DIREKTE under overgangen.

export default function TreelineDivider({ color = "#eef3ef", height = 46 }) {
  // Silhuet af blandet nåle-/løvskov. Bund y=46, toppe varierer y=4–13.
  // Venstre og højre kant ligger begge i y=24, så motivet kan gentages sømløst.
  const path =
    "M0,46 V24 L10,24 L17,9 L24,24 Q32,12 40,24 L48,7 L56,24 L66,24 " +
    "Q78,4 90,24 L98,11 L106,24 L118,24 L126,8 L134,24 Q144,13 154,24 " +
    "L162,6 L170,24 Q182,10 194,24 L202,11 L210,24 L220,24 L228,7 L236,24 " +
    "Q248,12 260,24 L268,10 L276,24 L288,24 L294,13 L300,24 V46 Z";
  const svg =
    `<svg xmlns='http://www.w3.org/2000/svg' width='300' height='46' ` +
    `viewBox='0 0 300 46'><path d='${path}' fill='${color}'/></svg>`;
  const uri = `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;

  return (
    <div
      aria-hidden="true"
      style={{
        height,
        marginTop: -height,        // trækkes op over hero'ens nederste kant
        position: "relative",
        zIndex: 3,
        backgroundImage: uri,
        backgroundRepeat: "repeat-x",
        backgroundPosition: "center bottom",
        backgroundSize: `300px ${height}px`,
        pointerEvents: "none",
      }}
    />
  );
}
