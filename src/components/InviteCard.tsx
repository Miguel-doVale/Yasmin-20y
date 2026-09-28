import CornerRibbon from "./CornerRibbon";

/**
 * Cartão do convite. No celular ocupa a tela inteira; no computador vira
 * um "pôster" na proporção do design do Canva (396×558), centralizado.
 * Tudo dentro dele é medido em cqw (% da largura do cartão).
 */
export default function InviteCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-[radial-gradient(ellipse_at_center,#7a5596_0%,var(--purple-deep)_70%)] sm:py-6">
      <main className="invite relative flex min-h-dvh w-full flex-col justify-center overflow-hidden sm:min-h-0 sm:w-[min(520px,calc((100dvh-48px)*0.7097))] sm:aspect-[396/558] sm:rounded-[28px] sm:shadow-[0_30px_80px_-20px_rgba(0,0,0,0.55)]">
        <CornerRibbon corner="tl" delay={0.3} />
        <CornerRibbon corner="tr" delay={0.4} />
        <CornerRibbon corner="bl" delay={0.5} />
        <CornerRibbon corner="br" delay={0.6} />
        {children}
      </main>
    </div>
  );
}
