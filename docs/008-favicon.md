# 008 — Favicon com a Yasmin de chapéu

**Data:** 2026-09-28 · **Autor:** Miguel (M) + Claude Code · **Tipo:** Visual

A imagem enviada (`Yas faz 20!_20260927_232628_0000.png`) foi renomeada para
**`public/images/yasmin-chapeu.png`** (sem espaços nem "!", que dão problema
em links) e virou o ícone do site:

| Arquivo | Onde aparece | Detalhe |
|---|---|---|
| `src/app/favicon.ico` | Aba do navegador | 16, 32 e 48px, fundo transparente |
| `src/app/icon.png` | Navegadores modernos / Android | 256px, fundo transparente |
| `src/app/apple-icon.png` | "Adicionar à tela inicial" no iPhone | 180px, **fundo roxo** (o iPhone pinta a transparência de preto) |

O Next.js acha esses arquivos sozinho pelo nome. Não precisa configurar nada.

A **prévia do link** (quando o convite é enviado no WhatsApp) também passou a
usar `yasmin-chapeu.png` (`src/app/layout.tsx` → `openGraph.images`).

## Trocar o ícone no futuro

Substitua os 3 arquivos acima, mantendo **os mesmos nomes**. Use uma imagem
quadrada com o rosto ocupando quase tudo, porque em 16px os detalhes somem.
O navegador guarda o ícone antigo em cache: para ver o novo, abra numa aba
anônima.
