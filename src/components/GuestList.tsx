"use client";

import { useEffect, useMemo, useState } from "react";
import type { User } from "firebase/auth";
import CornerRibbon from "./CornerRibbon";
import NameTitle from "./NameTitle";
import { eventConfig } from "@/lib/eventConfig";
import {
  isFirebaseConfigured,
  signInWithGoogle,
  signOutAdmin,
  watchRsvps,
  watchUser,
  type Rsvp,
} from "@/lib/firebase";

// Só em desenvolvimento: /lista?demo mostra dados fictícios para testar o visual.
const DEMO_ROWS: Rsvp[] = [
  ["Rachel Green", "98991234567", 5],
  ["Ross Geller", "98987654321", 30],
  ["Mônica Geller", "98988887777", 90],
  ["Chandler Bing", "98981112222", 200],
  ["Joey Tribbiani", "98987654321", 400],
  ["Phoebe Buffay", "9832345678", 1500],
].map(([nome, telefone, min], i) => ({
  id: String(i),
  nome: nome as string,
  telefone: telefone as string,
  criadoEm: new Date(Date.UTC(2026, 9, 1, 15) - (min as number) * 60000),
}));

const DOTS = ["var(--dot-red)", "var(--dot-yellow)", "var(--dot-blue)"];

function formatPhone(d: string) {
  if (d.length === 11) return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
  if (d.length === 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return d;
}

const dateFmt = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
});

function normalize(s: string) {
  return s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}

function downloadCsv(rows: Rsvp[]) {
  const esc = (v: string) => `"${v.replace(/"/g, '""')}"`;
  const lines = [
    ["Nome", "Telefone", "Confirmou em"].join(";"),
    ...rows.map((r) =>
      [esc(r.nome), esc(formatPhone(r.telefone)), esc(r.criadoEm ? dateFmt.format(r.criadoEm) : "")].join(";"),
    ),
  ];
  // BOM para o Excel abrir os acentos certinho
  const blob = new Blob(["﻿" + lines.join("\r\n")], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "confirmados-yasmin-20.csv";
  a.click();
  URL.revokeObjectURL(url);
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh justify-center bg-[radial-gradient(ellipse_at_top,#7a5596_0%,var(--purple-deep)_70%)] sm:px-6 sm:py-8">
      <main className="invite relative w-full overflow-hidden px-5 pb-16 pt-14 sm:max-w-3xl sm:rounded-[28px] sm:px-12 sm:shadow-[0_30px_80px_-20px_rgba(0,0,0,0.55)]">
        <div className="pointer-events-none absolute left-0 top-0 aspect-square w-[min(100%,440px)] [container-type:inline-size]">
          <CornerRibbon corner="tl" />
        </div>
        <div className="pointer-events-none absolute right-0 top-0 aspect-square w-[min(100%,440px)] [container-type:inline-size]">
          <CornerRibbon corner="tr" />
        </div>
        <div className="relative z-10">{children}</div>
      </main>
    </div>
  );
}

function Header({ subtitle }: { subtitle: string }) {
  return (
    <header className="mx-auto mb-8 max-w-[360px] text-center [container-type:inline-size]">
      <p className="font-script text-[7cqw] leading-tight">Aquele em que a gente vê quem vem</p>
      <div className="my-[2cqw]">
        <NameTitle nome={eventConfig.nome} />
      </div>
      <p className="font-script text-[6cqw] opacity-90">{subtitle}</p>
    </header>
  );
}

const btnYellow =
  "rounded-full bg-yellow px-6 py-3 font-rounded text-base font-semibold text-purple-deep shadow-[0_4px_0_#c98f12] transition active:translate-y-1 active:shadow-none";

export default function GuestList({ demo = false }: { demo?: boolean }) {
  const [authUser, setUser] = useState<User | null | undefined>(undefined);
  const [liveRows, setRows] = useState<Rsvp[] | null>(null);
  const user = demo ? ({ email: "demo@exemplo.com" } as User) : authUser;
  const rows = demo ? DEMO_ROWS : liveRows;
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (demo || !isFirebaseConfigured) return;
    return watchUser((u) => {
      setUser(u);
      setRows(null);
      setError("");
    });
  }, [demo]);

  useEffect(() => {
    if (!authUser || demo) return;
    return watchRsvps(
      (data) => {
        setRows(data);
        setError("");
      },
      (code) => setError(code === "permission-denied" ? "denied" : "network"),
    );
  }, [authUser, demo]);

  const filtered = useMemo(() => {
    if (!rows) return [];
    const q = normalize(search.trim());
    const digits = search.replace(/\D/g, "");
    if (!q) return rows;
    return rows.filter((r) => normalize(r.nome).includes(q) || (digits && r.telefone.includes(digits)));
  }, [rows, search]);

  const duplicates = useMemo(() => {
    const seen = new Map<string, number>();
    rows?.forEach((r) => seen.set(r.telefone, (seen.get(r.telefone) ?? 0) + 1));
    return seen;
  }, [rows]);
  const uniqueCount = duplicates.size;

  if (!isFirebaseConfigured && !demo) {
    return (
      <Shell>
        <Header subtitle="Lista de confirmados" />
        <p className="text-center font-sans">
          O Firebase ainda não foi configurado. Siga <code>docs/003-configurar-firebase.md</code>.
        </p>
      </Shell>
    );
  }

  if (user === undefined) {
    return (
      <Shell>
        <Header subtitle="Carregando..." />
      </Shell>
    );
  }

  if (!user || error === "denied") {
    return (
      <Shell>
        <Header subtitle="Área dos organizadores" />
        <div className="mx-auto flex max-w-sm flex-col items-center gap-4 text-center font-sans">
          {error === "denied" ? (
            <>
              <p>
                O e-mail <strong>{user?.email}</strong> não tem permissão para ver a lista.
              </p>
              <button className={btnYellow} onClick={() => signOutAdmin()}>
                Entrar com outra conta
              </button>
            </>
          ) : (
            <>
              <p className="opacity-90">Entre com o Google para ver quem confirmou presença.</p>
              <button
                className={btnYellow}
                onClick={() =>
                  signInWithGoogle().catch((e) => {
                    if (e?.code !== "auth/popup-closed-by-user") setError("login");
                  })
                }
              >
                Entrar com Google
              </button>
              {error === "login" && (
                <p role="alert" className="rounded-xl bg-black/20 px-4 py-2 text-sm">
                  Não foi possível entrar. Confira se o login com Google está ativado no Firebase.
                </p>
              )}
            </>
          )}
        </div>
      </Shell>
    );
  }

  return (
    <Shell>
      <Header subtitle="Lista de confirmados" />

      <section className="mb-6 grid grid-cols-2 gap-3 sm:gap-4">
        <div className="rounded-2xl bg-yellow p-4 text-purple-deep shadow-[0_5px_0_#c98f12] sm:p-5">
          <p className="font-rounded text-5xl font-semibold leading-none sm:text-6xl">{rows ? uniqueCount : "–"}</p>
          <p className="mt-1 font-sans text-sm font-medium">{uniqueCount === 1 ? "pessoa confirmada" : "pessoas confirmadas"}</p>
          {rows && rows.length > uniqueCount && (
            <p className="mt-1 font-sans text-xs opacity-75">
              {rows.length} respostas, {rows.length - uniqueCount} repetida{rows.length - uniqueCount > 1 ? "s" : ""}
            </p>
          )}
        </div>
        <div className="flex flex-col justify-between rounded-2xl border-2 border-white/25 p-4 sm:p-5">
          <p className="font-script text-2xl leading-tight">
            {eventConfig.diaSemana} · {eventConfig.dia} · {eventConfig.mes}
          </p>
          <p className="font-sans text-xs opacity-80">Atualiza sozinho quando alguém confirma</p>
        </div>
      </section>

      <div className="mb-4 flex flex-col gap-3 sm:flex-row">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar por nome ou telefone"
          className="w-full flex-1 rounded-xl border-2 border-transparent bg-white px-4 py-3 font-sans text-purple-deep outline-none placeholder:text-purple-deep/40 focus:border-yellow"
        />
        <button
          onClick={() => rows && downloadCsv(rows)}
          disabled={!rows?.length}
          className="rounded-xl border-2 border-white/70 px-5 py-3 font-sans text-sm font-semibold transition hover:bg-white/10 disabled:opacity-40"
        >
          Baixar planilha
        </button>
      </div>

      {error === "network" && (
        <p role="alert" className="mb-4 rounded-xl bg-black/20 px-4 py-2 font-sans text-sm">
          Sem conexão com o banco. A lista volta a atualizar quando a internet voltar.
        </p>
      )}

      {rows === null ? (
        <p className="py-10 text-center font-sans opacity-80">Carregando lista...</p>
      ) : filtered.length === 0 ? (
        <p className="py-10 text-center font-script text-2xl">
          {rows.length === 0 ? "Ninguém confirmou ainda. Manda o convite!" : "Ninguém com esse nome."}
        </p>
      ) : (
        <ol className="overflow-hidden rounded-2xl bg-white font-sans text-purple-deep">
          <li className="hidden grid-cols-[3rem_1fr_11rem_7rem] gap-3 bg-purple-deep/10 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-purple-deep/60 sm:grid">
            <span>#</span>
            <span>Nome</span>
            <span>Telefone</span>
            <span className="text-right">Confirmou</span>
          </li>
          {filtered.map((r, i) => {
            const dup = (duplicates.get(r.telefone) ?? 0) > 1;
            return (
              <li
                key={r.id}
                className="grid grid-cols-[2.2rem_1fr] items-center gap-x-3 gap-y-1 border-t border-purple-deep/10 px-4 py-3 first:border-t-0 sm:grid-cols-[3rem_1fr_11rem_7rem] sm:first:border-t"
              >
                <span
                  className="row-span-2 flex size-8 items-center justify-center rounded-full font-rounded text-sm font-semibold text-white sm:row-span-1"
                  style={{ background: DOTS[i % DOTS.length] }}
                >
                  {rows.length - rows.indexOf(r)}
                </span>
                <span className="font-semibold">
                  {r.nome}
                  {dup && (
                    <span className="ml-2 rounded-full bg-yellow/40 px-2 py-0.5 text-[11px] font-medium">repetido</span>
                  )}
                </span>
                <a
                  href={`https://wa.me/55${r.telefone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-purple-deep/80 underline-offset-2 hover:underline"
                >
                  {formatPhone(r.telefone)}
                </a>
                <span className="col-start-2 text-xs text-purple-deep/50 sm:col-start-auto sm:text-right">
                  {r.criadoEm ? dateFmt.format(r.criadoEm) : "agora"}
                </span>
              </li>
            );
          })}
        </ol>
      )}

      <div className="mt-8 flex items-center justify-between font-sans text-xs opacity-70">
        <span>{user.email}</span>
        <button onClick={() => signOutAdmin()} className="underline underline-offset-2">
          Sair
        </button>
      </div>
    </Shell>
  );
}
