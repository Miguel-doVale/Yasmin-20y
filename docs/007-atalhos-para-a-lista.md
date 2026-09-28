# 007 — Atalhos para abrir a lista de confirmados

**Data:** 2026-09-28 · **Autor:** Miguel (M) + Claude Code · **Tipo:** Feature

Agora dá para chegar na página `/lista` sem digitar o endereço, de dois jeitos:

## 1. Atalho escondido: 5 toques no nome

No convite, toque **5 vezes seguidas** no **Y·A·S·M·I·N** (com no máximo
1,5 segundo entre um toque e outro). A lista abre, e no celular ele vibra
de leve. Convidados não descobrem isso sem querer.

- Código: `src/components/SecretTap.tsx`
- Onde está ligado: `src/app/page.tsx`, no `<SecretTap href="/lista">` em volta do nome
- Mudar a quantidade de toques: `<SecretTap href="/lista" taps={3}>`
- Remover: em `page.tsx`, apague as linhas `<SecretTap href="/lista">` e
  `</SecretTap>`, deixando só o `<NameTitle ... />` que está no meio.

## 2. Botão "Organizadores" no rodapé

Link pequeno e discreto (cadeado + "Organizadores", semitransparente)
abaixo dos botões do convite.

### Como REMOVER o botão (sem mexer em código)

Abra **`src/lib/eventConfig.ts`** e troque:

```ts
mostrarBotaoLista: true,
```

por:

```ts
mostrarBotaoLista: false,
```

Salve e faça o deploy. O botão some, e o atalho dos 5 toques continua funcionando.

- Texto, ícone e transparência do botão: `src/app/page.tsx`, bloco
  comentado "Botão discreto para a lista" (a transparência é o `0.55` em `--fade-to`).

## Segurança

Nenhum dos atalhos libera nada sozinho: quem abrir a lista precisa entrar
com um e-mail Google autorizado em `firestore.rules` (veja o doc 006).

## Dica

Depois de abrir a lista no celular, use "Adicionar à tela inicial" no
navegador: ela vira um ícone igual a um app.
