function buscar() {
  const nome = document.getElementById("Nome").value.trim();
  const id = document.getElementById("ID").value.trim();
  const erro = document.getElementById("mensagem-erro");
  const resultado = document.getElementById("resultado-busca");

  erro.innerHTML = "";
  resultado.innerHTML = "";

  if (!nome || !id) {
    erro.innerHTML = `<p style="color:red;">Por favor, preencha nome e ID para buscar.</p>`;
    return;
  }

  if (isNaN(id)) {
    erro.innerHTML = `<p style="color:red;">ID deve ser numérico.</p>`;
    return;
  }

  fetch("", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `action=buscar&nome=${encodeURIComponent(nome)}&id=${encodeURIComponent(id)}`
  })
  .then(res => {
    if (!res.ok) throw new Error("Erro na resposta do servidor");
    return res.json();
  })
  .then(data => {
    if (data.erro) {
      erro.innerHTML = `<p style="color:red;">${data.erro}</p>`;
    } else {
      resultado.innerHTML = `
        <div class="overlay" id="modal-overlay" onclick="fecharModal()"></div>
        <div class="resultado-busca" id="modal-resultado">
          <button class="fechar-modal" onclick="fecharModal()">×</button>
          <h3>Ordem Localizada</h3>
          <table>
            <thead>
              <tr>
                <th>ID</th><th>Nome</th><th>Telefone</th><th>Aparelho</th><th>Defeito</th><th>Tempo</th><th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>${data.id}</td>
                <td>${data.nome}</td>
                <td>${data.telefone}</td>
                <td>${data.aparelho}</td>
                <td>${data.defeito}</td>
                <td>${data.tempo}</td>
                <td>${data.status}</td>
              </tr>
            </tbody>
          </table>
        </div>
      `;
    }
  })
  .catch(() => {
    erro.innerHTML = `<p style="color:red;">Erro ao buscar a ordem. Tente novamente.</p>`;
  });
}

function fecharModal() {
  const modal = document.getElementById("modal-resultado");
  const overlay = document.getElementById("modal-overlay");
  if (modal) modal.remove();
  if (overlay) overlay.remove();
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") fecharModal();
});
