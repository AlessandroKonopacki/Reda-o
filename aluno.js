document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formAluno");
  const mensagem = document.getElementById("mensagemAluno");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nome = document.getElementById("nomeAluno").value.trim();
    const texto = document.getElementById("redacao").value.trim();

    if (!nome || !texto) {
      mensagem.textContent = "Preencha todos os campos!";
      mensagem.style.color = "red";
      return;
    }

    const redacao = { nome, texto, status: "enviada" };

    const lista = JSON.parse(localStorage.getItem("redacoes") || "[]");
    lista.push(redacao);
    localStorage.setItem("redacoes", JSON.stringify(lista));

    mensagem.textContent = "Redação enviada com sucesso!";
    mensagem.style.color = "green";
    form.reset();
  });
});
