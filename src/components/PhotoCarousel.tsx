"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import PeepholeFrame from "./PeepholeFrame";
import Sparkle from "./Sparkle";

export default function PhotoCarousel({ photos }: { photos: readonly string[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (photos.length <= 1) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % photos.length);
    }, 3500);
    return () => clearInterval(id);
  }, [photos.length]);

  return (
    <div className="relative flex justify-center">
      <Sparkle className="w-6 h-6 absolute -left-2 top-2 animate-pulse" />
      <Sparkle className="w-8 h-8 absolute right-0 bottom-6 animate-pulse [animation-delay:.6s]" />

      <PeepholeFrame>
        {photos.map((src, i) => (
          <div
            key={src + i}
            className="absolute inset-0 transition-opacity duration-700 ease-in-out"
            style={{ opacity: i === index ? 1 : 0 }}
          >
            <Image
              src={src}
              alt="Foto da Yasmin"
              fill
              className="object-cover object-top"
              priority={i === 0}
            />
          </div>
        ))}

        {/* Chapeuzinho de festa, igual ao convite */}
        <div className="absolute -top-8 left-1/2 -translate-x-[60%] w-14 rotate-[-18deg] z-10 pointer-events-none drop-shadow-md">
          <Image
            src="/images/party-hat-top.png"
            alt=""
            width={345}
            height={413}
            className="w-full h-auto object-contain"
          />
        </div>
      </PeepholeFrame>
    </div>
  );
}
