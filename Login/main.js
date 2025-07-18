function verificarSenha() {
  const usuario = document.getElementById('usuario').value;
  const senha = document.getElementById('senha').value;
  const mensagem = document.getElementById('mensagem');

  fetch('login.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `usuario=${encodeURIComponent(usuario)}&senha=${encodeURIComponent(senha)}`
  })
  .then(response => response.json())
  .then(data => {
    if (data.sucesso) {
      mensagem.textContent = 'Login bem-sucedido!';
      mensagem.style.color = 'green';

      // Lê o cookie atual "usuarios"
      let usuariosCookie = getCookie('usuarios'); // função para pegar cookie que vou criar abaixo
      let usuarios = usuariosCookie ? usuariosCookie.split(',') : [];

      // Adiciona o novo usuário + "Admin" se não existir ainda
      const novoUsuario = usuario + '=Admin';
      if (!usuarios.includes(novoUsuario)) {
        usuarios.push(novoUsuario);
      }

      // Atualiza o cookie com a lista de usuários
      const now = new Date();
      now.setTime(now.getTime() + 1 * 24 * 60 * 60 * 1000); // adiciona 1 dia em milissegundos
      const expires = now.toUTCString();
      document.cookie = `usuarios=${usuarios.join(',')};expires=${expires};path=/`;


      location.reload();
    } else {
      mensagem.textContent = 'Usuário ou senha incorretos.';
      mensagem.style.color = 'red';
    }
  });
}

// Função para pegar o valor de um cookie pelo nome
function getCookie(nome) {
  const nomeEQ = nome + "=";
  const ca = document.cookie.split(';');
  for(let i=0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nomeEQ) === 0) return c.substring(nomeEQ.length, c.length);
  }
  return null;
}
