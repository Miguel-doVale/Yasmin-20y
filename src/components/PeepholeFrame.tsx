/**
 * Moldura ornamentada estilo "olho mágico" (tema Friends), com os
 * rabiscos/espirais nos 4 cantos, igual ao convite em vídeo.
 * Recebe a foto como children, posicionada dentro do vão retangular.
 */
export default function PeepholeFrame({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <div className="relative w-64 h-72 sm:w-72 sm:h-80">
      <svg
        viewBox="0 0 280 320"
        className="absolute inset-0 w-full h-full drop-shadow-lg"
        fill="none"
      >
        <rect
          x="55"
          y="55"
          width="170"
          height="210"
          rx="14"
          fill="var(--color-brand-yellow)"
        />
        {(
          [
            [55, 55],
            [225, 55],
            [55, 265],
            [225, 265],
          ] as const
        ).map(([cx, cy], i) => (
          <g key={i}>
            <circle cx={cx} cy={cy} r="34" fill="var(--color-brand-yellow)" />
            <circle
              cx={cx}
              cy={cy}
              r="34"
              fill="none"
              stroke="var(--color-brand-purple)"
              strokeWidth="2.5"
              strokeDasharray="6 7"
              opacity="0.5"
            />
          </g>
        ))}
        <path
          d="M40 55 C 40 40, 55 30, 70 34"
          stroke="var(--color-brand-yellow)"
          strokeWidth="10"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M240 55 C 240 40, 225 30, 210 34"
          stroke="var(--color-brand-yellow)"
          strokeWidth="10"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M40 265 C 40 280, 55 290, 70 286"
          stroke="var(--color-brand-yellow)"
          strokeWidth="10"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M240 265 C 240 280, 225 290, 210 286"
          stroke="var(--color-brand-yellow)"
          strokeWidth="10"
          strokeLinecap="round"
          fill="none"
        />
      </svg>

      <div className="absolute left-[26%] top-[24%] right-[26%] bottom-[24%] overflow-hidden rounded-md bg-brand-purple-dark">
        {children}
      </div>
    </div>
  );
}
