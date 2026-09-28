# 003 — Como criar e configurar o Firebase (passo a passo)

Eu não tenho acesso ao Console do Firebase (é uma conta sua/da DMG), então
o código já está pronto pra usar — só falta você criar o projeto e colar
as credenciais. Leva uns 5 minutos.

## 1. Criar o projeto no Firebase

1. Acesse **https://console.firebase.google.com**
2. Clique em **"Adicionar projeto"**
3. Dê um nome, ex: `yasmin-20-anos`
4. Pode desativar o Google Analytics (não é necessário aqui)
5. Clique em **"Criar projeto"**

## 2. Criar o banco de dados (Firestore)

1. No menu lateral, vá em **Build → Firestore Database**
2. Clique em **"Criar banco de dados"**
3. Escolha o modo **produção** (não "teste") — as regras que já preparamos
   (`firestore.rules`) cuidam da segurança.
4. Escolha a região mais próxima (ex: `southamerica-east1` — São Paulo)
5. Clique em **Ativar**

## 3. Publicar as regras de segurança

1. Ainda em Firestore, vá na aba **"Regras"**
2. Apague o conteúdo e cole o conteúdo do arquivo `firestore.rules`
   (está na raiz do projeto)
3. Clique em **"Publicar"**

Essas regras garantem que:
- Qualquer visitante do site pode **enviar** uma confirmação de presença
- **Ninguém** consegue ler a lista de confirmados pelo site (só vocês, no
  Console do Firebase, na aba "Dados")

## 4. Criar o "app da Web" e pegar as credenciais

1. No menu lateral, clique na engrenagem ⚙️ → **"Configurações do
   projeto"**
2. Em **"Seus apps"**, clique no ícone **`</>`** (Web)
3. Dê um apelido, ex: `yasmin-site` (não precisa marcar Firebase Hosting)
4. Clique em **"Registrar app"**
5. Vai aparecer um bloco de código com um objeto `firebaseConfig` assim:

```js
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "yasmin-20-anos.firebaseapp.com",
  projectId: "yasmin-20-anos",
  storageBucket: "yasmin-20-anos.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456",
};
```

## 5. Colar as credenciais no projeto

1. Na raiz do projeto, copie o arquivo `.env.local.example` para um novo
   arquivo chamado **`.env.local`**:

   ```bash
   cp .env.local.example .env.local
   ```

2. Abra `.env.local` e preencha com os valores que você pegou no passo 4:

   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=yasmin-20-anos.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=yasmin-20-anos
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=yasmin-20-anos.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
   NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef123456
   ```

3. Salve o arquivo. Ele **nunca** vai pro GitHub (está no `.gitignore`),
   então cada pessoa que rodar o projeto localmente (ou o servidor de
   deploy, como a Vercel) precisa ter o próprio `.env.local`/variáveis de
   ambiente configuradas.

## 6. Testar

```bash
npm run dev
```

Acesse `http://localhost:3000/confirmar`, clique em **"Vou sim!"**,
preencha nome e telefone e envie. Depois vá no Console do Firebase →
Firestore Database → aba **"Dados"** → coleção **`confirmacoes`** e veja o
registro aparecer, com os campos `nome`, `telefone` (só dígitos) e `criadoEm`.

Quem clica em "Não vou conseguir" **não** é salvo no banco.

## 7. Se for fazer deploy (ex: Vercel)

Adicione as mesmas 6 variáveis acima em **Project Settings → Environment
Variables** na Vercel (ou na plataforma de deploy escolhida), com os
mesmos valores do seu `.env.local`.

---

## Mensagens de erro no formulário

- **"O banco de dados ainda não foi configurado"** → o `.env.local` (ou as
  variáveis na Vercel) está vazio ou incompleto. Preencha e reinicie o
  `npm run dev` (na Vercel, faça um novo deploy).
- **"Não deu para enviar agora"** → sem internet, **ou** as regras do passo 3
  não foram publicadas, **ou** a versão das regras no Console está diferente
  do `firestore.rules` do projeto. Abra o console do navegador (F12) para
  ver o erro exato (ex.: `permission-denied`).
