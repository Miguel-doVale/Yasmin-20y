"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import FriendsFrame from "./FriendsFrame";
import Sparkle from "./Sparkle";

const FRAME_W = 46; // largura da moldura, em cqw (% da largura do convite)
const FRAME_H = (FRAME_W * 228) / 200;
const SLOT = 63; // distância entre o centro de uma moldura e a próxima, em cqw
const COUNT = 7; // molduras na fila (3 de cada lado + a do centro)
const HALF = Math.floor(COUNT / 2);
const MOVE_MS = 900;

const mod = (a: number, n: number) => ((a % n) + n) % n;

type Props = {
  photos: readonly string[];
  hat: string;
  intervalMs: number;
  startDelayMs: number;
};

export default function FrameCarousel({ photos, hat, intervalMs, startDelayMs }: Props) {
  const [step, setStep] = useState(0);
  const [moving, setMoving] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let stopTimer: ReturnType<typeof setTimeout>;
    let loop: ReturnType<typeof setInterval>;
    const advance = () => {
      setStep((s) => s + 1);
      setMoving(true);
      stopTimer = setTimeout(() => setMoving(false), MOVE_MS);
    };
    const first = setTimeout(() => {
      advance();
      loop = setInterval(advance, intervalMs);
    }, startDelayMs);

    return () => {
      clearTimeout(first);
      clearTimeout(stopTimer);
      clearInterval(loop);
    };
  }, [intervalMs, startDelayMs]);

  return (
    <div className="relative w-full" style={{ height: `${FRAME_H}cqw` }}>
      <div className="anim-track-in absolute inset-0">
      <div className={`absolute inset-0 ${moving ? "anim-motion-blur" : ""}`}>
        {Array.from({ length: COUNT }, (_, i) => {
          const rel = mod(i - step + HALF, COUNT) - HALF;
          const photo = photos[mod(step + rel, photos.length)];
          const isCenter = rel === 0;

          return (
            <div
              key={i}
              className="absolute top-0"
              style={{
                left: `calc(50% - ${FRAME_W / 2}cqw)`,
                width: `${FRAME_W}cqw`,
                height: `${FRAME_H}cqw`,
                transform: `translateX(${rel * SLOT}cqw)`,
                transition:
                  rel === HALF ? "none" : `transform ${MOVE_MS}ms cubic-bezier(.65,0,.35,1)`,
              }}
            >
              <FriendsFrame className="absolute inset-0 size-full" />

              <div
                className="absolute inset-0 transition-opacity ease-in-out"
                style={{ opacity: isCenter ? 1 : 0, transitionDuration: `${MOVE_MS * 0.8}ms` }}
                aria-hidden={!isCenter}
              >
                <Image
                  src={photo}
                  alt="Yasmin criança"
                  width={774}
                  height={744}
                  priority={i === HALF}
                  sizes="(max-width: 640px) 36vw, 180px"
                  className="absolute left-[8.6%] top-[17.6%] w-[78%] h-auto grayscale contrast-[1.08] drop-shadow-[0_0.6cqw_0.8cqw_rgba(0,0,0,0.25)]"
                />
                <div
                  className="absolute bottom-[65.5%] left-[19.5%] w-[36%] origin-bottom"
                  style={{ transform: "rotate(-22deg)" }}
                >
                  <div className="anim-hat origin-bottom">
                    <Image src={hat} alt="" width={346} height={440} className="h-auto w-full drop-shadow-md" />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      </div>

      {/* Estrelinhas fixas em volta da moldura central */}
      <div
        className="pointer-events-none absolute top-0"
        style={{ left: `calc(50% - ${FRAME_W / 2}cqw)`, width: `${FRAME_W}cqw`, height: `${FRAME_H}cqw` }}
      >
        {[
          { x: 2, y: 5.6, s: 9, d: 2.1 },
          { x: -5.3, y: 26, s: 12, d: 2.3 },
          { x: 94.5, y: 84, s: 19, d: 2.5 },
          { x: 100, y: 77, s: 8, d: 2.6 },
        ].map((p, i) => (
          <div
            key={i}
            className="anim-pop absolute"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.s}%`,
              translate: "-50% -50%",
              animationDelay: `${p.d}s`,
            }}
          >
            <Sparkle className="anim-twinkle block w-full" style={{ animationDelay: `${i * 0.6}s` }} />
          </div>
        ))}
      </div>
    </div>
  );
}
