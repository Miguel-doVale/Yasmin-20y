# 006 — Página /lista (lista de confirmados)

**Data:** 2026-09-28 · **Autor:** Miguel (M) + Claude Code · **Tipo:** Feature

## O que é

Página `/lista`, no visual do convite, para os organizadores verem quem
confirmou, sem abrir o Console do Firebase:

- Contador de pessoas confirmadas (telefones repetidos contam uma vez só)
- Tabela com nome, telefone e data/hora da confirmação, a mais recente primeiro
- Atualiza em tempo real quando alguém confirma
- Busca por nome (ignora acentos) ou por telefone
- Telefone clicável, que abre o WhatsApp da pessoa
- Marca "repetido" quando o mesmo telefone confirmou mais de uma vez
- Botão "Baixar planilha" (CSV que abre certo no Excel e no Google Planilhas)
- A página não aparece no Google (`noindex`)

## Segurança

O site é público, então a lista fica protegida por **login com Google**.
Só os e-mails listados em `firestore.rules`, na função `isOrganizer()`,
conseguem ler a coleção. Quem entrar com outro e-mail vê "sem permissão".
A proteção está nas regras do banco, não só na tela: mesmo quem mexer no
código do navegador não consegue ler os dados.

## Como ativar (uma vez só)

1. **Console do Firebase → Authentication → Sign-in method → Google →
   Ativar** (escolha um e-mail de suporte e salve).
2. **Authentication → Settings → Authorized domains → Add domain**:
   adicione o domínio da Vercel (ex.: `yasmin-20y.vercel.app`) e o domínio
   próprio, se houver. `localhost` já vem na lista.
3. No `firestore.rules`, troque `'SEU_EMAIL@gmail.com'` pelos e-mails dos
   organizadores, entre aspas simples e separados por vírgula:
   `['miguel@gmail.com', 'yasmin@gmail.com']`.
4. **Firestore → Regras**: cole o conteúdo novo do `firestore.rules` e publique.
5. Acesse `seusite/lista` e clique em "Entrar com Google".

## Testar o visual sem dados reais

Com `npm run dev`, acesse `http://localhost:3000/lista?demo` para ver a
página com convidados fictícios. Isso só funciona em desenvolvimento e é
ignorado no site publicado.

## Arquivos

- Novos: `src/app/lista/page.tsx`, `src/components/GuestList.tsx`
- Alterados: `src/lib/firebase.ts` (login com Google e leitura em tempo real),
  `firestore.rules` (leitura liberada só para organizadores)
