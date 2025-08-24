async function enviar() {
  const nome = document.getElementById("nome").value;
  const tema = document.getElementById("tema").value;
  const redacao = document.getElementById("redacao").value;

  if (!nome || !tema || !redacao) {
    alert("Preencha todos os campos!");
    return;
  }

  try {
    // Salvar a redação no Firestore
    await db.collection("redacoes").add({
      nome: nome,
      tema: tema,
      redacao: redacao,
      dataEnvio: firebase.firestore.FieldValue.serverTimestamp(),
      corrigida: false
    });

    alert("Redação enviada com sucesso!");
    document.getElementById("nome").value = "";
    document.getElementById("tema").value = "";
    document.getElementById("redacao").value = "";
  } catch (e) {
    console.error("Erro ao adicionar documento: ", e);
    alert("Ocorreu um erro ao enviar sua redação.");
  }
}