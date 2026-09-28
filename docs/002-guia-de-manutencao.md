# 002 — Guia de manutenção do site (Yasmin 20 anos)

Onde mexer para editar ou manter o site sem precisar ler todo o código.
Histórico de mudanças: `docs/001-...`, `docs/004-...` etc.

## Stack

- **Next.js 16** (App Router) + **TypeScript**
- **Tailwind CSS v4** (configurado direto no CSS, sem `tailwind.config.js`)
- **Firebase Firestore** (lista de confirmados)
- Fontes do Google via `next/font`: **Satisfy** (script), **Gochi Hand** (nome), **Fredoka** (botões do RSVP),
  **Montserrat** (textos pequenos)

## Estrutura de pastas

```
Yasmin-20y/
├── docs/                         # Documentação (este guia + histórico de mudanças)
├── firestore.rules               # Regras de segurança do banco (cole no Console do Firebase)
├── .env.local.example            # Modelo das credenciais do Firebase
├── .env.local                    # (você cria) credenciais reais, NUNCA vai pro git
├── next.config.ts                # Config do Next (indicador de dev desligado)
├── public/images/
│   ├── yasmin-face.png           # Rosto recortado (PNG transparente); vira P&B via CSS
│   ├── party-hat-top.png         # Chapéu rosa (o usado hoje)
│   ├── party-hat-confetti.png    # Chapéu de confete (alternativa)
│   └── party-hats.png            # Imagem original com os 2 chapéus (só referência)
└── src/
    ├── app/
    │   ├── layout.tsx            # Fontes, título da aba, cor da barra do navegador
    │   ├── globals.css           # PALETA DE CORES + todas as animações
    │   ├── page.tsx              # PÁGINA DO CONVITE (ordem e tempo das animações)
    │   ├── confirmar/page.tsx    # Página de RSVP (só monta o cartão + RsvpFlow)
    │   └── lista/page.tsx        # Lista de confirmados (só organizadores, login Google)
    ├── components/
    │   ├── InviteCard.tsx        # O "cartão" roxo com as 4 fitas (usado nas 2 páginas)
    │   ├── CornerRibbon.tsx      # Fita dourada com laço de cada canto
    │   ├── FriendsFrame.tsx      # Desenho SVG da moldura do Friends
    │   ├── FrameCarousel.tsx     # Carrossel: fila de molduras + rosto + chapéu + estrelinhas
    │   ├── NameTitle.tsx         # Y·A·S·M·I·N (Gochi Hand, letras brancas, bolinhas ovais coloridas)
    │   ├── SecretTap.tsx         # Atalho escondido (5 toques no nome → /lista)
    │   ├── TypeReveal.tsx        # Efeito de texto sendo digitado
    │   ├── Sparkle.tsx           # Estrelinha branca de 4 pontas
    │   ├── ActionButtons.tsx     # "Como chegar" e "Confirme sua presença!" (ícones)
    │   ├── RsvpFlow.tsx          # Fluxo: vai? → nome + telefone → salva
    │   └── GuestList.tsx         # Página /lista: contador, busca, tabela, planilha
    └── lib/
        ├── eventConfig.ts        # TEXTOS E DADOS DO EVENTO (comece por aqui!)
        └── firebase.ts           # Conexão com o Firebase + função saveRsvp()
```

## "Quero mudar X, onde mexo?"

| O que mudar | Onde |
|---|---|
| Data, hora | `src/lib/eventConfig.ts` → `diaSemana`, `dia`, `mes`, `hora` |
| Link do "Como chegar" (Google Maps) | `eventConfig.ts` → `local.mapsUrl` |
| Frase "Posso ficar com os presentes..." | `eventConfig.ts` → `frase` |
| "Aquele em que" / "faz 20 anos" / nome | `eventConfig.ts` → `chamada`, `subtitulo`, `nome` |
| Texto dos botões | `eventConfig.ts` → `botoes` |
| Fotos que passam nas molduras | Coloque o PNG **com fundo transparente** em `public/images/` e adicione em `eventConfig.ts` → `fotosCarrossel` (cada moldura que chega traz a próxima foto) |
| Trocar o chapéu | `eventConfig.ts` → `chapeu` |
| Velocidade do carrossel | `eventConfig.ts` → `carrosselIntervaloMs` |
| Cores (roxo, amarelo, pontos) | `src/app/globals.css` → bloco `:root` |
| Fontes | `src/app/layout.tsx` |
| Formato da moldura | `src/components/FriendsFrame.tsx` |
| Tamanho da moldura / distância entre molduras | `FrameCarousel.tsx` → `FRAME_W`, `SLOT` |
| Posição do rosto e do chapéu na moldura | `FrameCarousel.tsx` (classes `left-[..%] top-[..%]`) |
| Ordem e tempo das animações de entrada | `src/app/page.tsx` → props `start` (segundos) |
| Textos da página de confirmação | `src/components/RsvpFlow.tsx` |
| Campos salvos no banco | `src/lib/firebase.ts` → `saveRsvp` **e** `firestore.rules` (os dois precisam bater!) |
| **Remover o botão "Organizadores"** do rodapé | `eventConfig.ts` → `mostrarBotaoLista: false` (detalhes no doc 007) |
| Atalho de 5 toques no nome | `src/app/page.tsx` → `<SecretTap>` (doc 007) |
| Ícone da aba (favicon) | `src/app/favicon.ico`, `icon.png`, `apple-icon.png` (doc 008) |
| Título da aba / preview no WhatsApp | `src/app/layout.tsx` → `metadata` |

## Tamanhos em `cqw`

Dentro do cartão, os tamanhos usam `cqw` = 1% da largura do cartão
(ex.: `text-[6cqw]`). É isso que deixa o site com a mesma proporção do
Canva em qualquer tela. Para aumentar ou diminuir algo, mude o número.

## Emojis, tokens e segredos

- Não há emojis no site (o design original não usa).
- Não há chaves escritas no código. As credenciais do Firebase ficam só no
  `.env.local` (e nas variáveis de ambiente da Vercel no deploy).

## Ver a lista de confirmados

No próprio site: **`/lista`** (login com Google; ativação em `docs/006-pagina-lista-de-confirmados.md`).
Quem pode ver é definido em `firestore.rules`, na função `isOrganizer()`.

Ou no Console do Firebase → Firestore Database → aba **Dados** → coleção
**`confirmacoes`**. Cada documento tem `nome`, `telefone` (só dígitos, com
DDD) e `criadoEm`. Se alguém confirmar duas vezes, aparecem dois
documentos com o mesmo telefone.

## Rodar localmente

```bash
npm install
cp .env.local.example .env.local   # preencha (docs/003-configurar-firebase.md)
npm run dev                        # http://localhost:3000
```

## Deploy (recomendado: Vercel, plano grátis)

1. Importe o repositório do GitHub na Vercel.
2. Em Settings → Environment Variables, cadastre as 6 variáveis do `.env.local`.
3. Cada push na branch principal publica sozinho.

## Convenção

Toda alteração nova ganha um arquivo `docs/00X-nome-da-mudanca.md`
(numeração sequencial). Se a estrutura de pastas mudar, atualize este guia.
