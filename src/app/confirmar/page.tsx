import type { Metadata } from "next";
import InviteCard from "@/components/InviteCard";
import RsvpFlow from "@/components/RsvpFlow";

export const metadata: Metadata = {
  title: "Confirme sua presença — Yasmin 20 anos",
};

export default function ConfirmarPage() {
  return (
    <InviteCard>
      <RsvpFlow />
    </InviteCard>
  );
}
