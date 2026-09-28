"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useSyncExternalStore } from "react";
import FriendsFrame from "./FriendsFrame";
import { eventConfig } from "@/lib/eventConfig";
import { saveRsvp } from "@/lib/firebase";

type Step = "pergunta" | "form" | "nao-vai" | "confirmado";

const STORAGE_KEY = "yasmin20-rsvp";

const subscribeNoop = () => () => {};
function readStored() {
  try {
    return localStorage.getItem(STORAGE_KEY) ?? "";
  } catch {
    return "";
  }
}

function formatPhone(value: string) {
  const d = value.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : "";
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

function MiniPortrait() {
  return (
    <div className="anim-pop relative mx-auto w-[34cqw]" style={{ aspectRatio: "200/228" }}>
      <FriendsFrame className="absolute inset-0 size-full" />
      <Image
        src={eventConfig.fotosCarrossel[0]}
        alt="Yasmin criança"
        width={774}
        height={744}
        priority
        className="absolute left-[8.6%] top-[17.6%] h-auto w-[78%] grayscale"
      />
      <div className="absolute bottom-[65.5%] left-[19.5%] w-[36%] origin-bottom" style={{ transform: "rotate(-22deg)" }}>
        <div className="anim-hat origin-bottom">
          <Image src={eventConfig.chapeu} alt="" width={346} height={440} className="h-auto w-full" />
        </div>
      </div>
    </div>
  );
}

const primaryBtn =
  "rounded-full bg-yellow px-[6cqw] py-[2.6cqw] font-rounded text-[4.6cqw] font-semibold text-purple-deep shadow-[0_1cqw_0_#c98f12] transition active:translate-y-[0.6cqw] active:shadow-none disabled:opacity-60";
const ghostBtn =
  "rounded-full border-2 border-white/80 px-[6cqw] py-[2.3cqw] font-rounded text-[4.6cqw] font-medium transition hover:bg-white/10 active:scale-95";
const inputClass =
  "w-full rounded-[3cqw] border-2 border-transparent bg-white px-[4cqw] py-[2.8cqw] font-sans text-[4.2cqw] text-purple-deep outline-none placeholder:text-purple-deep/40 focus:border-yellow";

export default function RsvpFlow() {
  const stored = useSyncExternalStore(subscribeNoop, readStored, () => "");
  const [chosenStep, setStep] = useState<Step | null>(null);
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [justSaved, setJustSaved] = useState("");
  const savedName = justSaved || stored;
  const step: Step = chosenStep ?? (stored ? "confirmado" : "pergunta");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const cleanName = nome.trim().replace(/\s+/g, " ");
    const digits = telefone.replace(/\D/g, "");

    if (cleanName.length < 2) return setError("Digite seu nome.");
    if (digits.length < 10) return setError("Digite seu telefone com DDD.");

    setError("");
    setSending(true);
    try {
      await saveRsvp(cleanName, digits);
      const first = cleanName.split(" ")[0];
      try {
        localStorage.setItem(STORAGE_KEY, first);
      } catch {}
      setJustSaved(first);
      setStep("confirmado");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "";
      setError(
        msg === "firebase-not-configured"
          ? "O banco de dados ainda não foi configurado. Avise quem te mandou o convite!"
          : "Não deu para enviar agora. Confira sua internet e tente de novo.",
      );
    } finally {
      setSending(false);
    }
  }

  const header = (
    <>
      <MiniPortrait />
      <p className="mt-[4cqw] font-script text-[5cqw] leading-tight opacity-90">
        {eventConfig.chamada} a {eventConfig.nome} {eventConfig.subtitulo}
      </p>
      <p className="mt-[1cqw] flex items-center justify-center gap-[1.6cqw] font-script text-[4.6cqw]">
        {[eventConfig.diaSemana, eventConfig.dia, eventConfig.mes, eventConfig.hora].map((p, i, a) => (
          <span key={i} className="flex items-center gap-[1.6cqw]">
            {p}
            {i < a.length - 1 && (
              <span
                className="size-[1.1cqw] rounded-full"
                style={{ background: ["var(--dot-red)", "var(--dot-yellow)", "var(--dot-blue)"][i] }}
              />
            )}
          </span>
        ))}
      </p>
    </>
  );

  return (
    <div className="relative z-10 flex flex-col items-center px-[11cqw] text-center">
      {header}

      {step === "pergunta" && (
        <div key="pergunta" className="anim-fade mt-[7cqw] flex w-full flex-col items-center">
          <h1 className="font-script text-[8cqw] leading-tight">E aí, você vai?</h1>
          <div className="mt-[5cqw] flex w-full flex-col gap-[3cqw]">
            <button type="button" className={primaryBtn} onClick={() => setStep("form")}>
              Vou sim!
            </button>
            <button type="button" className={ghostBtn} onClick={() => setStep("nao-vai")}>
              Não vou conseguir
            </button>
          </div>
        </div>
      )}

      {step === "form" && (
        <form key="form" onSubmit={handleSubmit} noValidate className="anim-fade mt-[6cqw] flex w-full flex-col gap-[3.2cqw] text-left">
          <h1 className="text-center font-script text-[7.4cqw] leading-tight">Oba! Só preciso disso:</h1>
          <label className="flex flex-col gap-[1.2cqw]">
            <span className="font-sans text-[3.4cqw] font-medium">Seu nome</span>
            <input
              className={inputClass}
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              autoComplete="name"
              maxLength={80}
              placeholder="Nome e sobrenome"
              autoFocus
            />
          </label>
          <label className="flex flex-col gap-[1.2cqw]">
            <span className="font-sans text-[3.4cqw] font-medium">Seu telefone (WhatsApp)</span>
            <input
              className={inputClass}
              value={telefone}
              onChange={(e) => setTelefone(formatPhone(e.target.value))}
              type="tel"
              inputMode="numeric"
              autoComplete="tel-national"
              placeholder="(98) 99999-9999"
            />
          </label>

          {error && (
            <p role="alert" className="rounded-[2cqw] bg-black/20 px-[3cqw] py-[2cqw] font-sans text-[3.3cqw]">
              {error}
            </p>
          )}

          <button type="submit" disabled={sending} className={`${primaryBtn} mt-[2cqw]`}>
            {sending ? "Enviando..." : "Confirmar presença"}
          </button>
          <button type="button" onClick={() => setStep("pergunta")} className="font-sans text-[3.3cqw] underline underline-offset-4 opacity-80">
            Voltar
          </button>
        </form>
      )}

      {step === "nao-vai" && (
        <div key="nao-vai" className="anim-fade mt-[7cqw] flex flex-col items-center">
          <h1 className="font-script text-[8cqw] leading-tight">Poxa, que pena!</h1>
          <p className="mt-[2cqw] font-sans text-[3.8cqw] leading-relaxed opacity-90">
            Obrigada por avisar. Vai fazer falta!
          </p>
          <button type="button" onClick={() => setStep("form")} className={`${ghostBtn} mt-[5cqw]`}>
            Mudei de ideia, eu vou!
          </button>
        </div>
      )}

      {step === "confirmado" && (
        <div key="confirmado" className="anim-fade mt-[7cqw] flex flex-col items-center">
          <h1 className="font-script text-[8.4cqw] leading-tight">Presença confirmada!</h1>
          <p className="mt-[2cqw] font-sans text-[3.8cqw] leading-relaxed opacity-90">
            {savedName ? `Te espero lá, ${savedName}!` : "Te espero lá!"}
          </p>
          <a href={eventConfig.local.mapsUrl} target="_blank" rel="noopener noreferrer" className={`${primaryBtn} mt-[5cqw]`}>
            {eventConfig.botoes.comoChegar}
          </a>
        </div>
      )}

      <Link href="/" className="mt-[5cqw] font-sans text-[3.3cqw] underline underline-offset-4 opacity-80">
        Voltar ao convite
      </Link>
    </div>
  );
}
