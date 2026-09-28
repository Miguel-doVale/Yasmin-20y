type Corner = "tl" | "tr" | "bl" | "br";

const place: Record<Corner, string> = {
  tl: "top-0 left-0",
  tr: "top-0 right-0 -scale-x-100",
  bl: "bottom-0 left-0 -scale-y-100",
  br: "bottom-0 right-0 -scale-x-100 -scale-y-100",
};

/** Fita dourada com laço que corre pelas bordas de cada canto do convite. */
export default function CornerRibbon({ corner, delay = 0 }: { corner: Corner; delay?: number }) {
  return (
    <svg
      viewBox="0 0 140 170"
      className={`anim-draw pointer-events-none absolute w-[35cqw] ${place[corner]}`}
      fill="none"
      stroke="var(--yellow)"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {[
        "M34,26 C40,10 52,3 58,9 C63,15 50,24 34,26",
        "M34,26 C22,21 9,23 11,31 C13,38 26,34 34,26",
        "M34,26 C48,24 56,21 67,20 C84,17 96,23 110,19 C119,16 126,14 130,17 C134,21 130,26 126,23 C123,20 128,15 137,16",
        "M34,26 C26,34 21,44 21,58 C21,76 15,92 19,110 C21,119 26,126 22,130 C18,134 13,128 17,125 C21,122 24,132 24,142 C24,152 22,160 24,168",
        "M34,26 C36,32 40,36 44,42",
      ].map((d, i) => (
        <path key={i} d={d} pathLength={1} style={{ animationDelay: `${delay + i * 0.08}s` }} />
      ))}
    </svg>
  );
}
