        function consultar() {
            const nome = document.getElementById("nome").value.trim();
            const resultado = document.getElementById("resultado");

            resultado.innerHTML = "";

            let lista = JSON.parse(localStorage.getItem("redacoes") || "[]");

            // filtra as redações do aluno
            const minhas = lista.filter(r =>
                r.nome.toLowerCase() === nome.toLowerCase()
        );

            if (minhas.length === 0) {
                resultado.innerHTML = "<p>Nenhuma redação encontrada.</p>";
                return;
            }

            // exibe cada redação
            minhas.forEach(r => {
                const div = document.createElement("div");
                div.className = "redacao";
                div.innerHTML = `
          <p><b>Tema:</b> ${r.tema}</p>
          <p><b>Redação:</b><br>${r.redacao.replace(/\n/g, "<br>")}</p>
          ${r.correcao
                        ? `<p><b>Nota:</b> ${r.correcao.nota}</p>
               <p><b>Comentário:</b><br>${r.correcao.comentario.replace(/\n/g, "<br>")}</p>`
                        : `<p class="sem-correcao">Aguardando correção...</p>`
                    }
        `;
                resultado.appendChild(div);
            });
        }
