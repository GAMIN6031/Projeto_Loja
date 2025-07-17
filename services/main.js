function buscar() {
    const nome = document.getElementById("Nome").value;
    const telefone = document.getElementById("Telefone").value;
    const erro = document.getElementById("mensagem-erro");
    const resultado = document.getElementById("resultado-busca");

    // Limpa anteriores
    erro.innerHTML = "";
    resultado.innerHTML = "";

    fetch("", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `action=buscar&nome=${encodeURIComponent(nome)}&telefone=${encodeURIComponent(telefone)}`
    })
    .then(res => res.json())
    .then(dados => {
        if (dados.erro) {
            erro.innerHTML = `<p style="color:red;">${dados.erro}</p>`;
        } else {
            resultado.innerHTML = `
            <div class="resultado-busca">
                <h3>Ordem Localizada</h3>
                <table>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Telefone</th>
                        <th>Aparelho</th>
                        <th>Defeito</th>
                        <th>Tempo</th>
                        <th>Status</th>
                    </tr>
                    <tr>
                        <td>${dados.id}</td>
                        <td>${dados.nome}</td>
                        <td>${dados.telefone}</td>
                        <td>${dados.aparelho}</td>
                        <td>${dados.defeito}</td>
                        <td>${dados.tempo}</td>
                        <td>${dados.status}</td>
                    </tr>
                </table>
            </div>
            `;
        }
    });
}
