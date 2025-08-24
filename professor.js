    function carregarRedacoes() {
      let lista = JSON.parse(localStorage.getItem("redacoes") || "[]");
      const container = document.getElementById("lista");
      container.innerHTML = "";

      if (lista.length === 0) {
        container.innerHTML = "<p>Nenhuma redação cadastrada.</p>";
        return;
      }

      lista.forEach((r, index) => {
        const div = document.createElement("div");
        div.className = "redacao";
        div.innerHTML = `
          <p><b>Aluno:</b> ${r.nome} - ${r.turma}</p>
          <p><b>Tema:</b> ${r.tema}</p>
          <p><b>Redação:</b><br>${r.redacao.replace(/\n/g, "<br>")}</p>

          <label>Nota:</label>
          <input type="number" id="nota-${index}" value="${r.correcao ? r.correcao.nota : ""}" min="0" max="100">

          <label>Comentário:</label>
          <textarea id="comentario-${index}">${r.correcao ? r.correcao.comentario : ""}</textarea>

          <button class="btn-salvar" onclick="salvar(${index})">Salvar Correção</button>
        `;
        container.appendChild(div);
      });
    }

    function salvar(index) {
      let lista = JSON.parse(localStorage.getItem("redacoes") || "[]");

      const nota = document.getElementById(`nota-${index}`).value;
      const comentario = document.getElementById(`comentario-${index}`).value;

      lista[index].correcao = {
        nota: nota,
        comentario: comentario
      };

      localStorage.setItem("redacoes", JSON.stringify(lista));
      alert("Correção salva!");
    }

    function limparHistorico() {
      if (confirm("Tem certeza que deseja apagar TODO o histórico de redações?")) {
        localStorage.removeItem("redacoes");
        carregarRedacoes();
        alert("Histórico apagado com sucesso!");
      }
    }

    // carrega ao abrir a página
    carregarRedacoes();
