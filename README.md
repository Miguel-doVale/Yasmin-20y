# Yasmin faz 20 anos 🎉

Site de convite digital para a festa de 20 anos da Yasmin, feito em
**Next.js + Tailwind CSS**, recriando o convite em vídeo (tema visual da
abertura de "Friends"). Inclui página de confirmação de presença (RSVP)
que salva os dados no **Firebase Firestore**.

## Documentação

Toda a documentação do projeto está em [`docs/`](./docs):

- [`001-criacao-do-site-convite.md`](./docs/001-criacao-do-site-convite.md) — o que foi construído e por quê
- [`002-guia-de-manutencao.md`](./docs/002-guia-de-manutencao.md) — **comece por aqui** para editar textos, cores, fotos, data do evento etc.
- [`003-configurar-firebase.md`](./docs/003-configurar-firebase.md) — passo a passo para criar o projeto no Firebase

## Rodando localmente

```bash
npm install
cp .env.local.example .env.local   # depois preencha com suas credenciais do Firebase
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).
