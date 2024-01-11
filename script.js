document.addEventListener("DOMContentLoaded", function () {
  const feriadoInfoElement = document.getElementById("feriado-info");
  const statusElement = document.getElementById("status");
  const feriadosListElement = document.getElementById("feriados-list");
  const dateElement = document.getElementById("date");

  // Caminho para o arquivo JSON
  const jsonFilePath = "holidays.json";

  // Função para verificar se a data atual está em um objeto JSON de feriados
  function verificarFeriado(dataAtual, feriados) {
    const dataFormatada = formatDate(dataAtual);

    // Se a data de hoje existir no json...
    if (feriados[dataFormatada]) {
      const feriadoInfo = feriados[dataFormatada];
      const listaFeriados = feriadoInfo.holidays;

      // Exibir status e lista de feriados
      dateElement.textContent = dataFormatada;
      statusElement.textContent = `Hoje é feriado!`;

      feriadosListElement.innerHTML = listaFeriados
        .map((feriado) => `<li>${feriado}</li>`)
        .join("");
    } else {
      // Se não for feriado, exibir status indicando que não é feriado
      dateElement.textContent = dataFormatada;
      statusElement.textContent = "Hoje não é feriado.";
      feriadosListElement.innerHTML = ""; // Limpar a lista
    }
  }

  // Função para formatar a data como "dd/mm/yyyy"
  function formatDate(date) {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  // Carregar o JSON usando fetch
  fetch(jsonFilePath)
    .then((response) => response.json())
    .then((feriados) => {
      // Obter a data atual
      const dataAtual = new Date();

      // Verificar se é feriado e atualizar a DOM
      verificarFeriado(dataAtual, feriados);
    })
    .catch((error) => console.error("Erro ao carregar o arquivo JSON:", error));
});
