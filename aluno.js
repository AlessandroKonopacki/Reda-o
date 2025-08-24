    function enviar() {
      const nome = document.getElementById("nome").value;
           const tema = document.getElementById("tema").value;
      const redacao = document.getElementById("redacao").value;

      if (!nome || !tema || !redacao) {
        alert("Preencha todos os campos!");
        return;
      }

      // Criar objeto da redação
      const novaRedacao = {
        id: Date.now(),
        nome,
        tema,
        redacao,
        correcao: null
      };

      // Salvar no localStorage
      let lista = JSON.parse(localStorage.getItem("redacoes") || "[]");
      lista.push(novaRedacao);
      localStorage.setItem("redacoes", JSON.stringify(lista));

      alert("Redação enviada com sucesso!");
      document.getElementById("nome").value = "";
      document.getElementById("tema").value = "";
      document.getElementById("redacao").value = "";
    }
