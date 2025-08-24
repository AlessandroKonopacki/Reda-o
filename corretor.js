async function consultar() {
  const nome = document.getElementById("nome").value.trim();
  const resultado = document.getElementById("resultado");
  resultado.innerHTML = "";

  if (!nome) {
    alert("Preencha o nome!");
    return;
  }

  try {
    const snapshot = await db.collection("redacoes").where("nome", "==", nome).get();
    
    if (snapshot.empty) {
      resultado.innerHTML = "<p>Nenhuma redação encontrada para este nome.</p>";
      return;
    }

    snapshot.forEach(doc => {
      const r = doc.data();
      const div = document.createElement("div");
      div.className = "redacao";
      div.innerHTML = `
        <p><b>Tema:</b> ${r.tema}</p>
        <p><b>Redação:</b><br>${r.redacao.replace(/\n/g, "<br>")}</p>
        ${
          r.corrigida
            ? `<p><b>Nota:</b> ${r.correcao.nota}</p>
               <p><b>Comentário:</b><br>${r.correcao.comentario.replace(/\n/g, "<br>")}</p>`
            : `<p class="sem-correcao">Aguardando correção...</p>`
        }
      `;
      resultado.appendChild(div);
    });
  } catch (e) {
    console.error("Erro ao consultar redações: ", e);
    resultado.innerHTML = "<p>Ocorreu um erro na consulta.</p>";
  }
}