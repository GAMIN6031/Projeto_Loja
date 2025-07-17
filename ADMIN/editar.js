function editar(dados) {
    const nome     = prompt("Nome:", dados.nome);
    const telefone = prompt("Telefone:", dados.telefone);
    const aparelho = prompt("Aparelho:", dados.aparelho);
    const defeito  = prompt("Defeito:", dados.defeito);
    const tempo    = prompt("Tempo estimado:", dados.tempo);
    const status   = prompt("Status:", dados.status);

    if (nome && telefone && aparelho && defeito && tempo && status) {
        fetch("", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `action=editar&id=${dados.id}&nome=${encodeURIComponent(nome)}&telefone=${encodeURIComponent(telefone)}&aparelho=${encodeURIComponent(aparelho)}&defeito=${encodeURIComponent(defeito)}&tempo=${encodeURIComponent(tempo)}&status=${encodeURIComponent(status)}`
        })
        .then(res => res.text())
        .then(msg => { alert(msg); location.reload(); });
    }
}

function deletar(id) {
    if (confirm("Tem certeza que deseja excluir?")) {
        fetch("", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `action=deletar&id=${id}`
        })
        .then(res => res.text())
        .then(msg => { alert(msg); location.reload(); });
    }
}

function alterarStatus(id, status) {
    fetch("", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `action=status&id=${id}&status=${encodeURIComponent(status)}`
    })
    .then(res => res.text())
    .then(msg => { alert(msg); location.reload(); });
}