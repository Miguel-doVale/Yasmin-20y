"use client";

import { useState } from "react";
import Link from "next/link";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { eventConfig } from "@/lib/eventConfig";

type Status = "idle" | "sending" | "done" | "error";

export default function ConfirmarPage() {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [vaiComparecer, setVaiComparecer] = useState<boolean | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!nome.trim() || !telefone.trim() || vaiComparecer === null) {
      setErrorMsg("Preencha nome, telefone e diga se vai comparecer.");
      return;
    }

    setErrorMsg("");
    setStatus("sending");

    try {
      await addDoc(collection(db, "confirmacoes"), {
        nome: nome.trim(),
        telefone: telefone.trim(),
        vaiComparecer,
        criadoEm: serverTimestamp(),
      });
      setStatus("done");
    } catch (err) {
      console.error(err);
      setStatus("error");
      setErrorMsg(
        "Não foi possível enviar agora. Confira sua internet e tente de novo."
      );
    }
  }

  if (status === "done") {
    return (
      <main className="min-h-screen w-full flex items-center justify-center bg-brand-purple px-4">
        <div className="max-w-sm w-full text-center bg-white/10 rounded-3xl p-8">
          <p className="font-script text-3xl mb-2">
            {vaiComparecer ? "Que ótimo! 🎉" : "Poxa, que pena!"}
          </p>
          <p className="mb-6">
            {vaiComparecer
              ? "Sua presença foi confirmada. Te espero lá!"
              : "Obrigada por avisar. Você vai fazer falta!"}
          </p>
          <Link
            href="/"
            className="inline-block bg-brand-yellow text-brand-purple-dark font-bold px-5 py-2 rounded-full"
          >
            Voltar ao convite
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-brand-purple px-4 py-10">
      <div className="max-w-sm w-full bg-white/10 rounded-3xl p-6 sm:p-8">
        <p className="font-script text-3xl text-center mb-1">
          {eventConfig.botoes.confirmarPresenca}
        </p>
        <p className="text-center text-sm opacity-80 mb-6">
          Aniversário de {eventConfig.nome} — {eventConfig.diaSemana},{" "}
          {eventConfig.dia} de {eventConfig.mes}
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="flex flex-col gap-1">
            <span className="text-sm font-semibold">Seu nome</span>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="rounded-xl px-4 py-2 text-brand-purple-dark bg-white outline-none"
              placeholder="Nome completo"
              required
            />
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-sm font-semibold">Seu telefone</span>
            <input
              type="tel"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              className="rounded-xl px-4 py-2 text-brand-purple-dark bg-white outline-none"
              placeholder="(99) 99999-9999"
              required
            />
          </label>

          <div className="flex flex-col gap-2">
            <span className="text-sm font-semibold">Você vai?</span>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setVaiComparecer(true)}
                className={`flex-1 rounded-xl py-2 font-bold transition-colors ${
                  vaiComparecer === true
                    ? "bg-brand-yellow text-brand-purple-dark"
                    : "bg-white/20"
                }`}
              >
                Vou! 🎉
              </button>
              <button
                type="button"
                onClick={() => setVaiComparecer(false)}
                className={`flex-1 rounded-xl py-2 font-bold transition-colors ${
                  vaiComparecer === false
                    ? "bg-brand-pink text-brand-purple-dark"
                    : "bg-white/20"
                }`}
              >
                Não vou
              </button>
            </div>
          </div>

          {errorMsg && (
            <p className="text-sm text-red-200 bg-red-900/30 rounded-lg px-3 py-2">
              {errorMsg}
            </p>
          )}

          <button
            type="submit"
            disabled={status === "sending"}
            className="mt-2 bg-brand-yellow text-brand-purple-dark font-bold py-3 rounded-full disabled:opacity-60"
          >
            {status === "sending" ? "Enviando..." : "Confirmar"}
          </button>

          <Link
            href="/"
            className="text-center text-sm underline opacity-80 mt-1"
          >
            Voltar ao convite
          </Link>
        </form>
      </div>
    </main>
  );
}
