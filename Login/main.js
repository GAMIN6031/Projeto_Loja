function verificarSenha() {
  const usuario = document.getElementById('usuario').value;
  const senha = document.getElementById('senha').value;
  const mensagem = document.getElementById('mensagem');

  fetch('login.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `usuario=${encodeURIComponent(usuario)}&senha=${encodeURIComponent(senha)}`
  })
  .then(response => response.json())
  .then(data => {
    if (data.sucesso) {
      mensagem.textContent = 'Login bem-sucedido!';
      mensagem.style.color = 'green';

      let usuariosCookie = getCookie('usuarios');
      let usuarios = usuariosCookie ? usuariosCookie.split(',') : [];

      const novoUsuario = usuario + '=Admin';
      if (!usuarios.includes(novoUsuario)) {
        usuarios.push(novoUsuario);
      }

      const now = new Date();
      now.setTime(now.getTime() + 1 * 24 * 60 * 60 * 1000);
      const expires = now.toUTCString();

      document.cookie = `usuarios=${usuarios.join(',')};expires=${expires};path=/`;

      location.reload();
    } else {
      mensagem.textContent = 'Usuário ou senha incorretos.';
      mensagem.style.color = 'red';
    }
  });
}

function getCookie(nome) {
  const nomeEQ = nome + "=";
  const ca = document.cookie.split(';');
  for(let i=0; i < ca.length; i++) {
    let c = ca[i].trim();
    if (c.indexOf(nomeEQ) === 0) return c.substring(nomeEQ.length);
  }
  return null;
}

function exibirInfoContaSeLogado() {
  const usuariosCookie = getCookie("usuarios");
  const loginWrapper = document.querySelector('.login-wrapper');

  if (usuariosCookie && loginWrapper) {
    const usuariosArr = usuariosCookie.split(',');

    for (const u of usuariosArr) {
      const [nome, senha] = u.split('=');

      if (senha.trim() === "Admin") {
        loginWrapper.remove();

        const tabela = document.createElement('table');

        tabela.innerHTML = `
          <thead>
            <tr>
              <th>Usuário</th>
              <th>Função</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>${nome}</td>
              <td>${senha}</td>
              <td>
                <button onclick="sairConta()">Sair</button>
              </td>
            </tr>
          </tbody>
        `;
        document.querySelector('main').appendChild(tabela);
        break;
      }
    }
  }
}

function sairConta() {
  document.cookie = "usuarios=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  location.reload();
}

exibirInfoContaSeLogado();
(function(){
  const css = `
    /* Container do login */
    .login-wrapper {
      max-width: 400px;
      margin: 60px auto;
      padding: 30px 35px;
      background-color: #ffffff;
      border-radius: 12px;
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      transition: box-shadow 0.3s ease;
    }
    .login-wrapper:hover {
      box-shadow: 0 12px 30px rgba(0, 0, 0, 0.16);
    }

    /* Inputs do formulário */
    .login-wrapper input[type="text"],
    .login-wrapper input[type="password"] {
      width: 100%;
      padding: 14px 18px;
      margin-bottom: 22px;
      border: 1.5px solid #cfd8dc;
      border-radius: 8px;
      font-size: 17px;
      color: #374151;
      background-color: #fefefe;
      box-sizing: border-box;
      transition: border-color 0.25s ease, box-shadow 0.25s ease;
      outline-offset: 2px;
    }
    .login-wrapper input[type="text"]::placeholder,
    .login-wrapper input[type="password"]::placeholder {
      color: #9ca3af;
    }
    .login-wrapper input[type="text"]:focus,
    .login-wrapper input[type="password"]:focus {
      border-color: #3b82f6;
      box-shadow: 0 0 8px rgba(59, 130, 246, 0.4);
      outline: none;
      background-color: #fff;
    }

    /* Botão do formulário */
    .login-wrapper button {
      width: 100%;
      padding: 14px 0;
      background: linear-gradient(90deg, #2563eb, #3b82f6);
      border: none;
      border-radius: 10px;
      font-size: 19px;
      font-weight: 700;
      color: white;
      cursor: pointer;
      text-transform: uppercase;
      letter-spacing: 1.1px;
      box-shadow: 0 5px 15px rgba(59, 130, 246, 0.4);
      transition: background 0.3s ease, box-shadow 0.3s ease;
    }
    .login-wrapper button:hover {
      background: linear-gradient(90deg, #1d4ed8, #2563eb);
      box-shadow: 0 7px 18px rgba(37, 99, 235, 0.6);
    }
    .login-wrapper button:active {
      transform: scale(0.98);
    }

    /* Mensagem de feedback */
    #mensagem {
      font-size: 16px;
      margin-top: 14px;
      min-height: 22px;
      font-weight: 700;
      letter-spacing: 0.02em;
      user-select: none;
      text-align: center;
      transition: color 0.3s ease;
    }

    /* Tabela de usuário logado */
    main table {
      width: 95%;
      max-width: 720px;
      margin: 60px auto;
      border-collapse: separate;
      border-spacing: 0 10px;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      box-shadow: 0 10px 30px rgba(0,0,0,0.1);
      border-radius: 12px;
      overflow: hidden;
    }

    /* Cabeçalho da tabela */
    main table thead tr {
      background-color: #2563eb;
      color: #ffffff;
      text-align: left;
      font-weight: 700;
      letter-spacing: 0.05em;
      font-size: 16px;
    }

    /* Células do cabeçalho */
    main table thead th {
      padding: 18px 24px;
      border: none;
      user-select: none;
    }

    /* Corpo da tabela */
    main table tbody tr {
      background-color: #ffffff;
      box-shadow: 0 4px 12px rgba(0,0,0,0.08);
      transition: transform 0.25s ease, box-shadow 0.25s ease;
      border-radius: 12px;
    }
    main table tbody tr:hover {
      box-shadow: 0 8px 20px rgba(0,0,0,0.14);
      transform: translateY(-4px);
    }

    /* Células do corpo */
    main table tbody td {
      padding: 18px 24px;
      border: none;
      vertical-align: middle;
      color: #374151;
      font-size: 15px;
    }

    /* Botão Sair */
    main table tbody button {
      background-color: #ef4444;
      border: none;
      color: #fff;
      font-weight: 700;
      cursor: pointer;
      font-size: 15px;
      padding: 8px 16px;
      border-radius: 8px;
      transition: background-color 0.3s ease, box-shadow 0.3s ease;
      box-shadow: 0 3px 8px rgba(239, 68, 68, 0.5);
      user-select: none;
    }
    main table tbody button:hover {
      background-color: #b91c1c;
      box-shadow: 0 5px 14px rgba(185, 28, 28, 0.7);
    }
    main table tbody button:active {
      transform: scale(0.96);
    }

    /* Responsividade */
    @media (max-width: 480px) {
      .login-wrapper {
        margin: 30px 15px;
        padding: 24px 20px;
      }
      main table {
        width: 100%;
        font-size: 14px;
      }
      main table thead th,
      main table tbody td {
        padding: 12px 14px;
      }
      .login-wrapper button,
      main table tbody button {
        font-size: 16px;
        padding: 12px 0;
      }
    }
  `;

  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);
})();
