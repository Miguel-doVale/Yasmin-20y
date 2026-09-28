import Link from "next/link";
import { eventConfig } from "@/lib/eventConfig";

function MapPinIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none">
      <path
        d="M12 22s7-7.58 7-12.5A7 7 0 1 0 5 9.5C5 14.42 12 22 12 22Z"
        stroke="var(--color-brand-purple)"
        strokeWidth="1.8"
      />
      <circle cx="12" cy="9.5" r="2.6" fill="var(--color-brand-purple)" />
    </svg>
  );
}

function EnvelopeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none">
      <rect
        x="2.5"
        y="5"
        width="19"
        height="14"
        rx="2.5"
        stroke="var(--color-brand-purple)"
        strokeWidth="1.8"
      />
      <path
        d="M3.5 6.5 12 13 20.5 6.5"
        stroke="var(--color-brand-purple)"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ActionButtons() {
  return (
    <div className="flex gap-4 justify-center mt-6">
      <a
        href={eventConfig.local.mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center gap-2 group"
      >
        <span className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-md group-active:scale-95 transition-transform">
          <MapPinIcon />
        </span>
        <span className="text-sm font-semibold text-center max-w-[7rem]">
          {eventConfig.botoes.comoChegar}
        </span>
      </a>

      <Link
        href="/confirmar"
        className="flex flex-col items-center gap-2 group"
      >
        <span className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-md group-active:scale-95 transition-transform">
          <EnvelopeIcon />
        </span>
        <span className="text-sm font-semibold text-center max-w-[7rem]">
          {eventConfig.botoes.confirmarPresenca}
        </span>
      </Link>
    </div>
  );
}
