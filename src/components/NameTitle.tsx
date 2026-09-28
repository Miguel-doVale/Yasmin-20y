const letterColors = [
  "text-brand-yellow",
  "text-pink-300",
  "text-sky-300",
  "text-lime-300",
  "text-orange-300",
  "text-fuchsia-300",
  "text-red-300",
  "text-teal-300",
];

export default function NameTitle({ nome }: { nome: string }) {
  const letters = nome.split("");

  return (
    <div className="flex items-center justify-center flex-wrap gap-x-1">
      {letters.map((letter, i) => (
        <span key={i} className="flex items-center">
          <span
            className={`font-title font-extrabold text-3xl sm:text-4xl tracking-wide ${
              letterColors[i % letterColors.length]
            }`}
            style={{ WebkitTextStroke: "1px rgba(0,0,0,0.15)" }}
          >
            {letter}
          </span>
          {i < letters.length - 1 && (
            <span className="text-brand-yellow text-2xl mx-0.5 self-center">
              ·
            </span>
          )}
        </span>
      ))}
    </div>
  );
}
