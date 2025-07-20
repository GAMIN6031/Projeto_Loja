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
        session_start();
        $_SESSION['user_role'] = 'Admin';
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
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="stylesheet" href="main.css">
  <link rel="stylesheet" href="../css/nav.css">
  <link rel="stylesheet" href="../Font/font.css">
</head>
<body>

<div class="hamburger" onclick="toggleSidebar()" aria-label="Menu" aria-expanded="false" role="button" tabindex="0">
  <span></span><span></span><span></span>
</div>

<nav>
  <ul>
    <img src="../imgs/logo loja.jpg" alt="Logo Loja">
    <li><a href="../Home/Index.html">INICIO</a></li>
    <li><a href="../Store/Loja.php">LOJA</a></li>
    <li><a href="../contract/index.html">CONTATO</a></li>
    <li><a href="../services/index.php">SERVIÇOS</a></li>
  </ul>
  <ul id="conta">
    <li><a href="../Login/login.php" class="nick">LOGIN</a></li>
  </ul>
</nav>

<div class="mobile-sidebar" id="sidebar">
  <ul>
    <img src="../imgs/logo loja.jpg" alt="Logo Loja">
    <li><a href="../Home/Index.html">INICIO</a></li>
    <li><a href="../Store/Loja.php">LOJA</a></li>
    <li><a href="../contract/index.html">CONTATO</a></li>
    <li><a href="../services/index.php">SERVIÇOS</a></li>
  </ul>
  <ul id="conta-mobile">
    <li><a href="../Login/login.php" class="nick">LOGIN</a></li>
  </ul>
</div>

<main>
  <div style="background-color: #ffc107; color: #212529; padding: 16px; border-radius: 8px; font-family: sans-serif; box-shadow: 0 2px 6px rgba(0,0,0,0.1); margin-top: 50px;">
    <strong>🔐 Acesso restrito:</strong> Esta área de login é exclusiva para <span style="color: #c82333; font-weight: bold;">administradores</span>. Se você não tem autorização, por favor retorne à página principal.
  </div>

  <div class="login-wrapper">
    <div class="login-box">
      <h2>Login</h2>
      <input type="text" id="usuario" placeholder="Usuário">
      <input type="password" id="senha" placeholder="Senha">
      <button onclick="verificarSenha()">Entrar</button>
      <p id="mensagem"></p>
    </div>
  </div>
</main>

<script src="../JS/logado.js"></script>
<script src="main.js"></script>
<script src="../JS/javascript.js"></script>

</body>
</html>
