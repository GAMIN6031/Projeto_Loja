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
        session_start();
          $_SESSION['user_role'] = 'Admin'; // define a chave de adm

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
  
<div class="hamburger" onclick="toggleSidebar()">☰</div>
<nav>
  <ul>
    <img src="../imgs/logo loja.jpg" alt="Logo Loja">
    <li><a href="../Home/Index.html">INICIO</a></li>
    <li><a href="../Store/Loja.html">LOJA</a></li>
    <li><a href="../contract/index.html">CONTATO</a></li>
    <li><a href="../services/index.php">SERVIÇOS</a></li>
  </ul>
  <ul id="conta">
    <li><a href="../Login/login.php" id="nick">LOGIN</a></li>
  </ul>
</nav>

<!-- Menu lateral (mobile), mantendo o id original -->
<div class="mobile-sidebar" id="sidebar">
  <ul>
    <img src="../imgs/logo loja.jpg" alt="Logo Loja">
    <li><a href="../Home/Index.html">INICIO</a></li>
    <li><a href="../Store/Loja.html">LOJA</a></li>
    <li><a href="../contract/index.html">CONTATO</a></li>
    <li><a href="../services/index.php">SERVIÇOS</a></li>
  </ul>
  <ul id="conta">
    <li><a href="../Login/login.php" id="nick">LOGIN</a></li>
  </ul>
</div>




  <main>
    <div class="login-box">
      <h2>Login</h2>
      <input type="text" id="usuario" placeholder="Usuário">
      <input type="password" id="senha" placeholder="Senha">
      <button onclick="verificarSenha()">Entrar</button>
      <p id="mensagem"></p>
    </div>
  </main>
  <script src='main.js'></script>
  <script src="../JS/logado.js"></script>  
</body>
</html>
