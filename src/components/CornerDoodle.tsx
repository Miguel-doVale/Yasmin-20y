type Props = {
  className?: string;
  flip?: boolean;
};

/**
 * Rabisco decorativo dourado dos cantos superiores, igual ao do convite.
 */
export default function CornerDoodle({ className = "", flip = false }: Props) {
  return (
    <svg
      viewBox="0 0 160 90"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={flip ? { transform: "scaleX(-1)" } : undefined}
    >
      <path
        d="M4 8 C 40 -4, 70 18, 96 10 C 116 4, 128 14, 122 24"
        stroke="var(--color-brand-yellow)"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M8 10 C 8 30, 6 45, 14 58 C 20 68, 12 76, 18 84"
        stroke="var(--color-brand-yellow)"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="122" cy="24" r="3.5" fill="var(--color-brand-yellow)" />
      <circle cx="18" cy="84" r="3.5" fill="var(--color-brand-yellow)" />
    </svg>
  );
}
