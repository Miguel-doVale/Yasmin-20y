const W = 200;
const H = 228;
const GROOVE = "var(--yellow-groove)";

function spiralPath(cx: number, cy: number, rOut: number, rIn: number, turns: number) {
  const steps = 64;
  let d = "";
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const a = Math.PI / 2 + t * turns * 2 * Math.PI;
    const r = rOut + (rIn - rOut) * t;
    d += `${i ? "L" : "M"}${(cx + r * Math.cos(a)).toFixed(2)},${(cy + r * Math.sin(a)).toFixed(2)}`;
  }
  return d;
}

const SPIRAL = spiralPath(28, 28, 19, 3, 1.6);

const corners = [
  "",
  `translate(${W},0) scale(-1,1)`,
  `translate(0,${H}) scale(1,-1)`,
  `translate(${W},${H}) scale(-1,-1)`,
];

/** Moldura do "olho mágico" da porta do Friends. O vão da foto é preenchido com o roxo do fundo. */
export default function FriendsFrame({ className = "" }: { className?: string }) {
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={className} aria-hidden>
      <g fill="var(--yellow)">
        <path d="M28,2 Q100,24 172,2 L198,28 Q176,114 198,200 L172,226 Q100,204 28,226 L2,200 Q24,114 2,28 Z" />
        <circle cx="28" cy="28" r="26" />
        <circle cx="172" cy="28" r="26" />
        <circle cx="28" cy="200" r="26" />
        <circle cx="172" cy="200" r="26" />
      </g>

      <rect x="45" y="45" width="110" height="138" rx="3" fill="var(--purple)" />

      <g fill="none" stroke={GROOVE} strokeWidth="3.2" strokeLinecap="round">
        <path d="M54,18 Q100,38 146,18" />
        <path d="M58,29 Q100,45 142,29" />
        <path d="M54,210 Q100,190 146,210" />
        <path d="M58,199 Q100,183 142,199" />
        <path d="M18,54 Q38,114 18,174" />
        <path d="M29,58 Q45,114 29,170" />
        <path d="M182,54 Q162,114 182,174" />
        <path d="M171,58 Q155,114 171,170" />
        <rect x="40" y="40" width="120" height="148" rx="5" strokeWidth="2.4" opacity="0.7" />
        {corners.map((t, i) => (
          <path key={i} d={SPIRAL} transform={t || undefined} />
        ))}
      </g>
    </svg>
  );
}
