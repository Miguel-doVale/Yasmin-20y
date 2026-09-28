/** Estrelinha de 4 pontas em contorno branco, como no convite. */
export default function Sparkle({
  className = "",
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} aria-hidden>
      <path
        d="M12 1 C12.6 8, 16 11.4, 23 12 C16 12.6, 12.6 16, 12 23 C11.4 16, 8 12.6, 1 12 C8 11.4, 11.4 8, 12 1 Z"
        fill="none"
        stroke="#fff"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}
