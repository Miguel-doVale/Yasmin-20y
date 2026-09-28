import CornerDoodle from "@/components/CornerDoodle";
import NameTitle from "@/components/NameTitle";
import PhotoCarousel from "@/components/PhotoCarousel";
import ActionButtons from "@/components/ActionButtons";
import { eventConfig } from "@/lib/eventConfig";

export default function Home() {
  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-brand-purple px-4 py-10">
      <div className="relative w-full max-w-sm rounded-3xl bg-brand-purple px-6 py-8 overflow-hidden">
        <CornerDoodle className="absolute top-0 left-2 w-24 h-14" />
        <CornerDoodle className="absolute top-0 right-2 w-24 h-14" flip />

        <div className="relative z-10 flex flex-col items-center text-center gap-1 pt-6">
          <p className="font-script text-2xl">{eventConfig.chamada}</p>
          <NameTitle nome={eventConfig.nome} />
          <p className="font-script text-2xl -mt-1">{eventConfig.subtitulo}</p>

          <div className="my-6">
            <PhotoCarousel photos={eventConfig.fotosCarrossel} />
          </div>

          <p className="font-bold">
            {eventConfig.diaSemana} · {eventConfig.dia} · {eventConfig.mes} ·{" "}
            {eventConfig.hora}
          </p>
          <p className="font-script text-xl px-4">&quot;{eventConfig.frase}&quot;</p>

          <ActionButtons />
        </div>
      </div>
    </main>
  );
}
