# 004 — Redesign fiel ao convite do Canva + novo fluxo de RSVP

**Data:** 2026-09-28
**Autor:** Miguel (M) + Claude Code
**Tipo:** Correção de design / feature

## Motivo

A primeira versão (001) ficou bem diferente do vídeo do Canva: cor de fundo
errada, moldura em formato de "portal" com círculos, letras do nome
coloridas, fontes diferentes, cartão pequeno e parado ("sem vida").

## Como o design foi reconstruído

Os quadros do vídeo foram extraídos com `ffmpeg` e ampliados para copiar
medidas, cores e fontes.

| Elemento | Antes | Agora (igual ao vídeo) |
|---|---|---|
| Fundo | `#7c68b0` acinzentado | `#8c64a8`, cor amostrada do vídeo |
| Amarelo | `#f3c53d` | `#f7c514`, cor amostrada do vídeo |
| Moldura | retângulo + 4 círculos | moldura da porta do Friends: lados côncavos, volutas em espiral nos cantos e sulcos em dourado escuro (`FriendsFrame.tsx`) |
| Carrossel | 1 moldura, troca por fade | fila de 7 molduras; as vizinhas aparecem cortadas nas laterais; o rosto passa de moldura em moldura com desfoque de movimento |
| Foto | colorida, dentro do vão | preto e branco, transbordando o vão, igual ao Canva |
| Chapéu | cortado pela moldura | por cima da borda, inclinado e balançando |
| Nome | letras coloridas | letras **brancas** + pontos vermelho/amarelo/azul (logo do Friends) |
| Fontes | Caveat + Baloo | **Satisfy** (títulos e data; idêntica à do Canva), **Fredoka** (nome), **Montserrat** (legendas) |
| Cantos | rabiscos | fita dourada com laço nos 4 cantos, que se "desenha" na entrada |
| Estrelinhas | amarelas, pequenas | brancas em contorno, piscando, nas mesmas posições do vídeo |
| Ícones | círculo branco | só o contorno branco (mapa com pino, carta com coração) |
| Tamanho | cartão pequeno fixo | tudo medido em `cqw` (% da largura do cartão): no celular ocupa a tela; no PC vira um pôster 396×558 |

### Animação de entrada (mesma ordem do vídeo)

1. A fila de molduras entra deslizando da direita, com desfoque (0,2s a 1,7s).
2. As fitas dos cantos se desenham.
3. "Aquele em que" é digitado; o nome aparece letra por letra; depois "faz 20 anos".
4. As estrelinhas aparecem; a data e a frase são digitadas.
5. Os botões aparecem (4,8s).
6. A partir de ~5,2s, a cada 4s, o rosto passa para a próxima moldura.

Com "reduzir movimento" ativado no celular, as animações ficam desligadas.

## Novo fluxo de confirmação (`/confirmar`)

Do jeito que foi pedido: **primeiro pergunta se a pessoa vai**.

- **"Vou sim!"** → pede nome e telefone (com máscara) → salva no Firestore.
- **"Não vou conseguir"** → mensagem de agradecimento e **nada é salvo**
  (tem um botão "Mudei de ideia").
- Depois de confirmar, o navegador guarda o primeiro nome e, se a pessoa
  voltar, vê "Presença confirmada! Te espero lá, Fulano!".
- Se o Firebase ainda não estiver configurado, aparece um aviso claro em
  vez de ficar travado em "Enviando...". Sem internet, desiste depois de 15s.

Documento salvo em `confirmacoes`: `{ nome, telefone (só dígitos), criadoEm }`.
As regras (`firestore.rules`) validam esse formato e bloqueiam leitura,
edição e exclusão pelo site.

## Arquivos

- Novos: `FriendsFrame.tsx`, `FrameCarousel.tsx`, `CornerRibbon.tsx`,
  `TypeReveal.tsx`, `InviteCard.tsx`, `RsvpFlow.tsx`,
  `public/images/party-hat-confetti.png`
- Removidos: `PeepholeFrame.tsx`, `PhotoCarousel.tsx`, `RibbonBow.tsx`,
  `CornerDoodle.tsx`
- Alterados: `globals.css`, `layout.tsx`, `page.tsx`, `confirmar/page.tsx`,
  `NameTitle.tsx`, `ActionButtons.tsx`, `Sparkle.tsx`, `eventConfig.ts`,
  `firebase.ts`, `firestore.rules`, `next.config.ts`
- `yasmin-face.png` foi recortado nas bordas (o fundo transparente sobrando
  atrapalhava o posicionamento).
