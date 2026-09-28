/**
 * Revela o texto letra por letra (efeito de "digitação" do vídeo).
 * `start` = segundos até a 1ª letra; `speed` = segundos entre letras.
 */
export default function TypeReveal({
  text,
  start = 0,
  speed = 0.04,
  className = "",
}: {
  text: string;
  start?: number;
  speed?: number;
  className?: string;
}) {
  let n = 0;
  const words = text.split(" ");

  return (
    <span className={className} aria-label={text} role="text">
      {words.map((word, w) => (
        <span key={w}>
          <span className="inline-block whitespace-nowrap" aria-hidden>
            {[...word].map((ch, i) => (
              <span
                key={i}
                className="anim-char"
                style={{ animationDelay: `${start + n++ * speed}s` }}
              >
                {ch}
              </span>
            ))}
          </span>
          {w < words.length - 1 && " "}
        </span>
      ))}
    </span>
  );
}
