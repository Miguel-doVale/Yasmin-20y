# 002 — Guia de manutenção do site (Yasmin 20 anos)

Guia completo de onde mexer para manter, editar ou dar suporte a este
site sem precisar reler todo o código.

## Stack

- **Next.js 16** (App Router) + **TypeScript**
- **Tailwind CSS v4** (config direto no CSS, sem `tailwind.config.js`)
- **Firebase Firestore** (banco de dados do RSVP)
- Fontes: `Caveat` (script/manuscrita) e `Baloo 2` (título), via
  `next/font/google`

## Estrutura de pastas

```
Yasmin-20y/
├── docs/                       # Documentação (este guia e o changelog)
├── firestore.rules             # Regras de segurança do Firestore
├── .env.local.example          # Modelo das variáveis de ambiente do Firebase
├── .env.local                  # (você cria) credenciais reais — NUNCA commitar
├── public/
│   └── images/
│       ├── yasmin-face.png     # Foto de rosto usada na moldura (fundo transparente)
│       ├── party-hats.png      # Imagem original com os 2 chapéus (referência)
│       └── party-hat-top.png   # Chapéu já recortado/isolado, usado no site
└── src/
    ├── app/
    │   ├── layout.tsx          # Fontes globais + <html>/<body>
    │   ├── globals.css         # Paleta de cores (roxo/amarelo/rosa) e tema Tailwind
    │   ├── page.tsx            # PÁGINA INICIAL (o convite)
    │   └── confirmar/
    │       └── page.tsx        # PÁGINA DE RSVP (formulário + grava no Firestore)
    ├── components/
    │   ├── PhotoCarousel.tsx   # Carrossel de fotos + chapéu sobreposto
    │   ├── PeepholeFrame.tsx   # A moldura ornamentada (SVG, estilo "Friends")
    │   ├── CornerDoodle.tsx    # Rabisco dourado dos cantos superiores
    │   ├── Sparkle.tsx         # Ícone de estrelinha/brilho
    │   ├── NameTitle.tsx       # "Y·A·S·M·I·N" com letras coloridas
    │   └── ActionButtons.tsx   # Botões "Como chegar" e "Confirme sua presença!"
    └── lib/
        ├── eventConfig.ts      # TEXTOS E DADOS DO EVENTO (edite aqui primeiro!)
        └── firebase.ts         # Conexão com o Firebase (lê variáveis de ambiente)
```

## "Preciso mudar X, onde mexo?"

| O que você quer mudar | Arquivo |
|---|---|
| Data, hora, local do evento | `src/lib/eventConfig.ts` |
| Texto dos botões | `src/lib/eventConfig.ts` → `botoes` |
| Frase engraçada ("Posso ficar com os presentes...") | `src/lib/eventConfig.ts` → `frase` |
| Link do Google Maps do "Como chegar" | `src/lib/eventConfig.ts` → `local.mapsUrl` |
| Fotos que aparecem na moldura (carrossel) | `src/lib/eventConfig.ts` → `fotosCarrossel` (adicione o caminho da imagem em `public/images/` e inclua na lista) |
| Cores (roxo, amarelo, rosa) | `src/app/globals.css` (variáveis `--color-purple`, `--color-yellow`, `--color-pink`) |
| Fontes | `src/app/layout.tsx` (troque `Caveat`/`Baloo_2` por outra do Google Fonts) |
| Nome "YASMIN" e cor de cada letra | `src/components/NameTitle.tsx` |
| Campos do formulário de RSVP (nome, telefone, etc.) | `src/app/confirmar/page.tsx` |
| Onde as confirmações são salvas | Firestore, coleção `confirmacoes` (ver `docs/003-configurar-firebase.md`) |
| Regras de quem pode ler/escrever no banco | `firestore.rules` |
| Título da aba do navegador / SEO | `src/app/layout.tsx` → `export const metadata` |

## Nenhum texto, emoji, token ou nome está "espalhado" pelo código

Por design, todo o conteúdo editável (textos, data, telefone de contato,
link do mapa, lista de fotos) está centralizado em **um único arquivo**:
`src/lib/eventConfig.ts`. Comece sempre por ali quando for alterar
conteúdo — só mexa nos componentes (`src/components/`) se for mudar
**layout ou visual**.

Não existem tokens, chaves de API ou segredos escritos diretamente no
código: tudo isso fica em variáveis de ambiente (`.env.local`, que nunca é
commitado no git — veja `.gitignore`).

## Como rodar o projeto localmente

```bash
npm install
npm run dev
```

Abra `http://localhost:3000`.

## Como fazer o deploy

Recomendado: [Vercel](https://vercel.com) (mesma empresa do Next.js,
plano gratuito é suficiente).

1. Suba o repositório para o GitHub.
2. Importe o repositório na Vercel.
3. Nas configurações do projeto na Vercel, adicione as mesmas variáveis
   de `.env.local` (Settings → Environment Variables).
4. Deploy automático a cada push.

## Convenção para futuras alterações

Sempre que uma nova alteração, adição ou correção for feita neste
projeto, documentar em um novo arquivo `docs/00X-nome-da-mudanca.md`
(numeração sequencial), explicando o que mudou e por quê — e atualizar
este guia se a estrutura de pastas mudar.
