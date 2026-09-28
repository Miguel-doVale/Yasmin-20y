/**
 * Configuração central do evento.
 * Edite este arquivo para trocar textos, data, local e frases do convite
 * sem precisar mexer nos componentes visuais.
 * Veja também: docs/002-guia-de-manutencao.md
 */

export const eventConfig = {
  // Nome que aparece em "Y·A·S·M·I·N"
  nome: "YASMIN",

  // Texto acima do nome
  chamada: "Aquele em que",

  // Texto abaixo do nome (ex: "faz 20 anos")
  subtitulo: "faz 20 anos",

  // Frase estilo "amigos" (fonte script), citação engraçada
  frase: "Posso ficar com os presentes e ainda ter 19?",

  // Data e hora do evento — PLACEHOLDER, ajuste depois
  diaSemana: "Quarta",
  dia: "4",
  mes: "NOV",
  hora: "18:30H",

  // Local do evento — PLACEHOLDER
  local: {
    nomeLocal: "Local a definir",
    endereco: "Endereço a definir",
    // Link do Google Maps (placeholder) — troque pelo link real do local
    mapsUrl: "https://maps.google.com/?q=",
  },

  // Textos dos botões
  botoes: {
    comoChegar: "Como chegar",
    confirmarPresenca: "Confirme sua presença!",
  },

  // Fotos usadas no carrossel de molduras (ordem de exibição)
  fotosCarrossel: ["/images/yasmin-face.png"],
} as const;
