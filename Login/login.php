<?php
require '../php/config.php';
error_reporting(E_ALL);
ini_set('display_errors', 1);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $usuario = $_POST['usuario'] ?? '';
    $senha   = $_POST['senha'] ?? '';

    $stmt = $conn->prepare("SELECT senha FROM admin WHERE usuario = ?");
    $stmt->bind_param("s", $usuario);
    $stmt->execute();
    $result = $stmt->get_result();
    $linha = $result->fetch_assoc();

    if ($linha && $senha === $linha['senha']) {
        echo json_encode(["sucesso" => true]);
    } else {
        echo json_encode(["sucesso" => false]);
    }
    exit;
}
?>



<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="utf-8">
  <title>Correa Informática</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
    
  <!-- Estilos -->
  <link rel="stylesheet" href="main.css">
  <link rel="stylesheet" href="../css/nav.css">
  <link rel="stylesheet" href="../css/footer.css">
  <link rel="stylesheet" href="../Font/font.css">
</head>
<body>
  <nav>
    <ul>
      <img src="../imgs/logo loja.jpg" alt="">
      <li><a href="../Home/Index.html">INICIO</a></li>
      <li><a href="../Store/base/Loja.html">LOJA</a></li>
      <li><a href="../contract/index.html">CONTATO</a></li>
      <li><a href="../services/index.html">SERVIÇOS</a></li>
    </ul>
    <ul>
      <li><a href="../Login/login.php">LOGIN</a></li>
    </ul>
  </nav>

  <main>
    <div class="login-box">
      <h2>Login</h2>
      <input type="text" id="usuario" placeholder="Usuário">
      <input type="password" id="senha" placeholder="Senha">
      <button onclick="verificarSenha()">Entrar</button>
      <p id="mensagem"></p>
    </div>
  </main>
  <script>
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
      mensagem.textContent = '✅ Login bem-sucedido!';
      mensagem.style.color = 'green';
      document.cookie = "Admin="+usuario+";expires=Fri, 13 Dec 2027 23:59:59 GMT; path=/";
    } else {
      mensagem.textContent = '❌ Usuário ou senha incorretos.';
      mensagem.style.color = 'red';
    }
  })
}

  </script>
</body>
</html>
