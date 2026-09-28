import InviteCard from "@/components/InviteCard";
import NameTitle from "@/components/NameTitle";
import FrameCarousel from "@/components/FrameCarousel";
import ActionButtons from "@/components/ActionButtons";
import TypeReveal from "@/components/TypeReveal";
import SecretTap from "@/components/SecretTap";
import Link from "next/link";
import { eventConfig } from "@/lib/eventConfig";

const DOTS = ["var(--dot-red)", "var(--dot-yellow)", "var(--dot-blue)"];

export default function Home() {
  const { diaSemana, dia, mes, hora } = eventConfig;
  const dateParts = [diaSemana, dia, mes, hora];

  return (
    <InviteCard>
      <div className="relative z-10 flex flex-col items-center text-center">
        <p className="font-script text-[6cqw] leading-tight">
          <TypeReveal text={eventConfig.chamada} start={0.9} />
        </p>
        <div className="mt-[1.4cqw]">
          {/* Atalho escondido: 5 toques seguidos no nome abrem a lista de confirmados */}
          <SecretTap href="/lista">
            <NameTitle nome={eventConfig.nome} start={1.4} />
          </SecretTap>
        </div>
        <p className="mt-[2.2cqw] font-script text-[6cqw] leading-tight">
          <TypeReveal text={eventConfig.subtitulo} start={2.2} />
        </p>

        <div className="mt-[8.5cqw] w-full">
          <FrameCarousel
            photos={eventConfig.fotosCarrossel}
            hat={eventConfig.chapeu}
            intervalMs={eventConfig.carrosselIntervaloMs}
            startDelayMs={5200}
          />
        </div>

        <p className="mt-[0.8cqw] flex items-center font-script text-[5.9cqw] leading-tight" aria-label={dateParts.join(", ")}>
          {dateParts.map((part, i) => (
            <span key={i} className="flex items-center" aria-hidden>
              <TypeReveal text={part} start={2.7 + i * 0.25} speed={0.05} />
              {i < dateParts.length - 1 && (
                <span
                  className="anim-pop mx-[1.6cqw] size-[1.25cqw] rounded-full"
                  style={{ background: DOTS[i % DOTS.length], animationDelay: `${2.9 + i * 0.25}s` }}
                />
              )}
            </span>
          ))}
        </p>
        <p className="mt-[0.4cqw] px-[4cqw] font-script text-[4.05cqw] leading-snug">
          <TypeReveal text={`"${eventConfig.frase}"`} start={3.8} speed={0.022} />
        </p>

        <div className="mt-[5.5cqw]">
          <ActionButtons start={4.8} />
        </div>

        {/* Botão discreto para a lista. Liga/desliga em eventConfig.mostrarBotaoLista */}
        {eventConfig.mostrarBotaoLista && (
          <Link
            href="/lista"
            className="anim-fade mt-[4cqw] flex items-center gap-[1cqw] rounded-full px-[3cqw] py-[1cqw] font-sans text-[2.6cqw] transition hover:bg-white/10"
            style={{ animationDelay: "5.4s", ["--fade-to" as string]: 0.55 }}
          >
            <svg viewBox="0 0 24 24" className="size-[3cqw]" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <rect x="5" y="11" width="14" height="10" rx="2" />
              <path d="M8 11V8a4 4 0 0 1 8 0v3" />
            </svg>
            Organizadores
          </Link>
        )}
      </div>
    </InviteCard>
  );
}
