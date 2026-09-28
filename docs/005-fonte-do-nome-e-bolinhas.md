# 005 — Fonte do nome e bolinhas iguais ao Canva

**Data:** 2026-09-28 · **Autor:** Miguel (M) + Claude Code · **Tipo:** Ajuste de design

## O que mudou

- O nome **Y·A·S·M·I·N** passou de Fredoka para **Gochi Hand** (Google Fonts).
  É a fonte gratuita mais parecida com a do logo do Friends usada no Canva:
  traço de caneta, "Y" inclinado, "M" largo. Foi escolhida comparando 12
  fontes com o nome recortado do vídeo.
- As bolinhas agora são **ovais** (mais largas que altas), maiores e mais
  próximas das letras, como no vídeo.
- Tamanho recalibrado: o nome ocupa a mesma largura do Canva.
- Fredoka continua sendo usada nos botões da página de confirmação
  (classe `font-rounded`).

A fonte original do logo ("Friends", de Gabriel Weiss) não está no Google
Fonts e o download foi bloqueado. Se quiserem usá-la, coloquem o arquivo em
`src/app/fonts/` e troquem `Gochi_Hand` por `next/font/local` em `layout.tsx`
(verifiquem a licença antes).

## Onde ajustar

- Fonte: `src/app/layout.tsx` (`Gochi_Hand`) e `globals.css` (`--font-friends`)
- Tamanho do nome e das bolinhas: `src/components/NameTitle.tsx`
  (`text-[10.4cqw]`, `h-[1.9cqw] w-[2.3cqw]`, `mx-[1.2cqw]`)
