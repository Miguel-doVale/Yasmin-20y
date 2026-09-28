"use client";

import { useRouter } from "next/navigation";
import { useRef } from "react";

/** Abre `href` depois de `taps` toques seguidos (com no máximo 1,5s entre eles). */
export default function SecretTap({
  href,
  taps = 5,
  children,
}: {
  href: string;
  taps?: number;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const count = useRef(0);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  function handleTap() {
    count.current += 1;
    clearTimeout(timer.current);
    if (count.current >= taps) {
      count.current = 0;
      navigator.vibrate?.(40);
      router.push(href);
      return;
    }
    timer.current = setTimeout(() => (count.current = 0), 1500);
  }

  return (
    <div onClick={handleTap} className="cursor-default select-none [-webkit-tap-highlight-color:transparent]">
      {children}
    </div>
  );
}
