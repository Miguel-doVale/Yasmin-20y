const DOT_COLORS = ["var(--dot-red)", "var(--dot-yellow)", "var(--dot-blue)"];

/** Nome no estilo do logo de Friends: letras brancas separadas por pontos coloridos. */
export default function NameTitle({ nome, start = 0 }: { nome: string; start?: number }) {
  const letters = [...nome.toUpperCase()];

  return (
    <h1
      className="flex items-center justify-center font-friends text-[10.4cqw] leading-none"
      aria-label={nome}
    >
      {letters.map((letter, i) => (
        <span key={i} className="flex items-center" aria-hidden>
          <span className="anim-pop" style={{ animationDelay: `${start + i * 0.12}s` }}>
            {letter}
          </span>
          {i < letters.length - 1 && (
            <span
              className="anim-pop mx-[1.2cqw] h-[1.9cqw] w-[2.3cqw] rounded-[50%]"
              style={{
                background: DOT_COLORS[i % DOT_COLORS.length],
                animationDelay: `${start + i * 0.12 + 0.06}s`,
              }}
            />
          )}
        </span>
      ))}
    </h1>
  );
}
