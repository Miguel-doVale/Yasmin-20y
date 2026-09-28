export default function Sparkle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className}>
      <path
        d="M20 2 L23 15 L36 18 L23 21 L20 34 L17 21 L4 18 L17 15 Z"
        fill="var(--color-brand-yellow)"
      />
      <path
        d="M32 2 L33.2 6.2 L37 7.5 L33.2 8.8 L32 13 L30.8 8.8 L27 7.5 L30.8 6.2 Z"
        fill="var(--color-brand-yellow)"
      />
    </svg>
  );
}
