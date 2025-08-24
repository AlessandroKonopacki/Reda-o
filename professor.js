document.addEventListener("DOMContentLoaded", () => {
    // Escuta mudanças de autenticação
    auth.onAuthStateChanged(user => {
        if (user) {
            document.getElementById('login-form').style.display = 'none';
            document.getElementById('painel-professor').style.display = 'block';
            carregarRedacoes();
        } else {
            document.getElementById('login-form').style.display = 'block';
            document.getElementById('painel-professor').style.display = 'none';
        }
    });
});

async function login() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  try {
    await auth.signInWithEmailAndPassword(email, password);
  } catch (error) {
    alert("Erro de login: " + error.message);
  }
}

async function carregarRedacoes() {
  const container = document.getElementById("lista");
  container.innerHTML = "Carregando redações...";
  try {
    const snapshot = await db.collection("redacoes").get();
    container.innerHTML = "";
    if (snapshot.empty) {
        container.innerHTML = "<p>Nenhuma redação cadastrada.</p>";
        return;
    }
    snapshot.forEach(doc => {
      const r = doc.data();
      const div = document.createElement("div");
      div.className = "redacao";
      div.innerHTML = `
        <p><b>Aluno:</b> ${r.nome}</p>
        <p><b>Tema:</b> ${r.tema}</p>
        <p><b>Redação:</b><br>${r.redacao.replace(/\n/g, "<br>")}</p>
        <label>Nota:</label>
        <input type="number" id="nota-${doc.id}" value="${r.correcao ? r.correcao.nota : ""}" min="0" max="100">
        <label>Comentário:</label>
        <textarea id="comentario-${doc.id}">${r.correcao ? r.correcao.comentario : ""}</textarea>
        <button class="btn-salvar" onclick="salvar('${doc.id}')">Salvar Correção</button>
      `;
      container.appendChild(div);
    });
  } catch (e) {
    console.error("Erro ao carregar redações: ", e);
    container.innerHTML = "<p>Ocorreu um erro ao carregar as redações.</p>";
  }
}

async function salvar(docId) {
  const nota = document.getElementById(`nota-${docId}`).value;
  const comentario = document.getElementById(`comentario-${docId}`).value;
  try {
    await db.collection("redacoes").doc(docId).update({
      correcao: { nota, comentario },
      corrigida: true,
      dataCorrecao: firebase.firestore.FieldValue.serverTimestamp()
    });
    alert("Correção salva!");
  } catch (e) {
    console.error("Erro ao salvar correção: ", e);
    alert("Ocorreu um erro ao salvar a correção.");
  }
}