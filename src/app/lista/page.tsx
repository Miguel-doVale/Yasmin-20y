import type { Metadata } from "next";
import GuestList from "@/components/GuestList";

export const metadata: Metadata = {
  title: "Lista de confirmados — Yasmin 20 anos",
  robots: { index: false, follow: false },
};

export default async function ListaPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const demo = process.env.NODE_ENV === "development" && "demo" in (await searchParams);
  return <GuestList demo={demo} />;
}
