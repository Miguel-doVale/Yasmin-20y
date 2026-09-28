# 001 — Criação do site de convite (Yasmin 20 anos)

**Data:** 2026-09-28
**Autor:** Miguel (M) + Claude Code
**Tipo:** Feature (criação do projeto)

## O que foi feito

Criado o projeto do zero: um site em **Next.js 16 (App Router) + TypeScript +
Tailwind CSS v4**, recriando fielmente o convite em vídeo feito no Canva
(tema visual da abertura de "Friends" — moldura amarela ornamentada em
fundo roxo).

Funcionalidades entregues:

1. **Página inicial (`/`)** — convite digital com:
   - Moldura ornamentada (estilo "olho mágico" do Friends) em carrossel,
     preparada para ciclar entre várias fotos automaticamente a cada 3.5s
     (hoje só tem 1 foto cadastrada).
   - Chapéu de festa rosa sobreposto à foto, igual ao vídeo.
   - Título "Y·A·S·M·I·N" com letras coloridas + "Aquele em que... faz 20
     anos".
   - Frase estilo "Friends" em fonte manuscrita.
   - Data/hora do evento (placeholders — falta preencher).
   - Dois botões: **"Como chegar"** (abre o Google Maps) e **"Confirme sua
     presença!"** (leva para a página de RSVP).
2. **Página de confirmação (`/confirmar`)** — formulário com nome, telefone
   e "Vou / Não vou", que grava a resposta no **Firebase Firestore**
   (coleção `confirmacoes`).
3. **Integração com Firebase** já programada (`src/lib/firebase.ts`),
   faltando apenas o membro criar o projeto no console e colar as
   credenciais em `.env.local` (passo a passo em
   `docs/003-configurar-firebase.md`).

## Por que assim

- **Next.js + Tailwind**: já é o stack padrão da DMG (ver perfil técnico),
  fácil de hospedar (Vercel) e de dar manutenção.
- **Firestore**: banco simples, sem servidor próprio pra manter, ideal pra
  um caso de uso pequeno como lista de confirmados de festa.
- **Regra do Firestore** (`firestore.rules`) permite que qualquer visitante
  **crie** uma confirmação, mas ninguém consegue **ler/editar/apagar** pelo
  site — só quem tiver acesso ao Console do Firebase vê a lista completa.
  Isso evita que alguém de fora veja quem confirmou ou "vote" por outra
  pessoa.

## O que falta (pendências conhecidas)

- [ ] Preencher data, hora e local reais do evento em
      `src/lib/eventConfig.ts`.
- [ ] Criar o projeto no Firebase e preencher `.env.local`
      (`docs/003-configurar-firebase.md`).
- [ ] Publicar as regras (`firestore.rules`) no Console do Firebase.
- [ ] Fazer o deploy (recomendado: Vercel, mesma dona do Next.js).
- [ ] Opcional: adicionar mais fotos da Yasmin em
      `eventConfig.fotosCarrossel` para o carrossel ciclar entre mais de
      uma imagem, como pedido ("a moldura em carrossel e o rostinho
      passando pelas molduras").

## Arquivos principais tocados

Veja o guia completo em `docs/002-guia-de-manutencao.md`.
