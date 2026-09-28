import Link from "next/link";
import { eventConfig } from "@/lib/eventConfig";

function MapIcon() {
  return (
    <svg viewBox="0 0 48 48" className="size-full" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinejoin="round" aria-hidden>
      <path d="M24 5a9 9 0 0 0-9 9c0 7 9 16 9 16s9-9 9-16a9 9 0 0 0-9-9Z" />
      <circle cx="24" cy="14" r="3.4" />
      <path d="M14 28 6 31 3 43l10-3 11 3 11-3 10 3-3-12-8-3" />
      <path d="M13 40l2-10M35 40l-2-10M24 43v-9" strokeDasharray="2 2.5" />
    </svg>
  );
}

function LetterIcon() {
  return (
    <svg viewBox="0 0 48 48" className="size-full" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinejoin="round" aria-hidden>
      <path d="M11 22V6h26v16" />
      <path d="M24 19c-5-3.2-6.6-6-5.2-8.2 1.2-1.8 3.8-1.6 5.2.6 1.4-2.2 4-2.4 5.2-.6 1.4 2.2-.2 5-5.2 8.2Z" />
      <path d="M5 20l6-4M43 20l-6-4M5 20v23h38V20L24 33 5 20Z" />
      <path d="M5 43l14-13M43 43 29 30" />
    </svg>
  );
}

const itemClass =
  "group flex w-[27cqw] flex-col items-center gap-[1.2cqw] text-center font-sans text-[3.1cqw] leading-snug outline-none";
const iconClass =
  "size-[7.4cqw] transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-110 group-focus-visible:scale-110 group-active:scale-95";

export default function ActionButtons({ start = 0 }: { start?: number }) {
  return (
    <nav className="anim-fade flex justify-center gap-[5cqw]" style={{ animationDelay: `${start}s` }}>
      <a href={eventConfig.local.mapsUrl} target="_blank" rel="noopener noreferrer" className={itemClass}>
        <span className={iconClass}>
          <MapIcon />
        </span>
        <span className="underline-offset-4 group-hover:underline">{eventConfig.botoes.comoChegar}</span>
      </a>

      <Link href="/confirmar" className={itemClass}>
        <span className={`${iconClass} anim-nudge`}>
          <LetterIcon />
        </span>
        <span className="underline-offset-4 group-hover:underline">{eventConfig.botoes.confirmarPresenca}</span>
      </Link>
    </nav>
  );
}
