document.addEventListener("DOMContentLoaded", () => {
  const lista = document.getElementById("listaRedacoes");
  const redacoes = JSON.parse(localStorage.getItem("redacoes") || "[]");

  if (redacoes.length === 0) {
    lista.innerHTML = "<li>Nenhuma redação enviada ainda.</li>";
    return;
  }

  redacoes.forEach((r) => {
    const li = document.createElement("li");
    li.textContent = `${r.nome}: ${r.texto}`;
    lista.appendChild(li);
  });
});
