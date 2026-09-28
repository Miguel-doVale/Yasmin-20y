/**
 * Conteúdo do convite. Para trocar textos, data, local ou fotos, edite
 * só este arquivo. Guia completo: docs/002-guia-de-manutencao.md
 */
export const eventConfig = {
  nome: "Yasmin",
  chamada: "Aquele em que",
  subtitulo: "faz 20 anos",
  frase: "Posso ficar com os presentes e ainda ter 19?",

  // Data e hora (PLACEHOLDER — confirme os dados reais)
  diaSemana: "Quarta",
  dia: "4",
  mes: "NOV",
  hora: "18:30H",

  // Local (PLACEHOLDER — troque pelo link real do Google Maps)
  local: {
    nomeLocal: "Local a definir",
    mapsUrl: "https://maps.google.com/?q=",
  },

  botoes: {
    comoChegar: "Como chegar",
    confirmarPresenca: "Confirme sua presença!",
  },

  // Fotos que passam pelas molduras do carrossel (PNG com fundo transparente, em /public/images)
  fotosCarrossel: ["/images/yasmin-face.png"],
  // Chapéu de festa por cima da foto. Alternativa: "/images/party-hat-confetti.png"
  chapeu: "/images/party-hat-top.png",
  // Botão discreto "Organizadores" no rodapé do convite, que leva à /lista.
  // Para remover o botão, troque para false. O atalho de tocar 5x no nome continua funcionando.
  mostrarBotaoLista: false,

  // Tempo que cada foto fica parada na moldura central antes de passar para a próxima
  carrosselIntervaloMs: 4000,
} as const;
