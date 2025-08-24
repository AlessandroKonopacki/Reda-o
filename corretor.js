document.addEventListener("DOMContentLoaded", () => {
  const lista = document.getElementById("listaCorretor");
  const redacoes = JSON.parse(localStorage.getItem("redacoes") || "[]");

  if (redacoes.length === 0) {
    lista.innerHTML = "<li>Nenhuma redação para corrigir.</li>";
    return;
  }

  redacoes.forEach((r, i) => {
    const li = document.createElement("li");
    li.textContent = `${r.nome}: ${r.texto}`;

    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Nota";

    const btn = document.createElement("button");
    btn.textContent = "Salvar nota";
    btn.addEventListener("click", () => {
      r.nota = input.value || "sem nota";
      redacoes[i] = r;
      localStorage.setItem("redacoes", JSON.stringify(redacoes));
      alert("Nota salva!");
    });

    li.appendChild(input);
    li.appendChild(btn);
    lista.appendChild(li);
  });
});
