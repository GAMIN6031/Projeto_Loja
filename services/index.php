<?php
require '../php/config.php';

if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_POST["action"]) && $_POST["action"] === "buscar") {
    $nome = $_POST["nome"] ?? '';
    $id = $_POST["id"] ?? '';

    // Validação: precisa dos dois
    if ($nome === '' || $id === '') {
        echo json_encode(["erro" => "Por favor, informe nome e ID para buscar."]);
        exit();
    }

    if (!is_numeric($id)) {
        echo json_encode(["erro" => "ID inválido."]);
        exit();
    }

    $stmt = $conn->prepare("SELECT * FROM ordemdeservico WHERE nome = ? AND id = ? LIMIT 1");
    $stmt->bind_param("si", $nome, $id);
    $stmt->execute();
    $resultado = $stmt->get_result();

    if ($resultado->num_rows > 0) {
        echo json_encode($resultado->fetch_assoc());
    } else {
        echo json_encode(["erro" => "Ordem não encontrada"]);
    }
    exit();
}
?>

<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <title>Correa Informática - Buscar Ordem</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="stylesheet" href="../Font/font.css" />
  <link rel="stylesheet" href="../css/nav.css" />
  <link rel="stylesheet" href="../css/services.css" />
</head>
<body>
<div class="hamburger" aria-label="Menu" aria-expanded="false" aria-controls="sidebar" role="button" tabindex="0">
  <span></span>
  <span></span>
  <span></span>
</div>

<nav>
  <ul>
    <img src="../imgs/logo loja.jpg" alt="Logo Loja" />
    <li><a href="../Home/Index.html">INICIO</a></li>
    <li><a href="../Store/Loja.php">LOJA</a></li>
    <li><a href="../contract/index.html">CONTATO</a></li>
    <li><a href="../services/index.php">SERVIÇOS</a></li>
  </ul>
  <ul id="conta">
    <li><a href="../Login/login.php" class="nick">LOGIN</a></li>
  </ul>
</nav>

<!-- Menu lateral (mobile) -->
<div class="mobile-sidebar" id="sidebar" aria-hidden="true">
  <ul>
    <img src="../imgs/logo loja.jpg" alt="Logo Loja" />
    <li><a href="../Home/Index.html">INICIO</a></li>
    <li><a href="../Store/Loja.php">LOJA</a></li>
    <li><a href="../contract/index.html">CONTATO</a></li>
    <li><a href="../services/index.php">SERVIÇOS</a></li>
  </ul>
  <ul id="conta-mobile">
    <li><a href="../Login/login.php" class="nick">LOGIN</a></li>
  </ul>
</div>







  <div style="height: 10vh;"></div>
  <div class="pagina">
    <div id="div_dados">
      <h2>Localizar Ordem de Serviço</h2>

      <label for="ID">ID:</label>
      <input type="text" id="ID" name="id" placeholder="ID da Ordem" />

      <label for="Nome">Nome:</label>
      <input type="text" id="Nome" name="nome" placeholder="Nome" />

      <div id="mensagem-erro"></div>

      <input type="button" value="Buscar" onclick="buscar()" />
    </div>

    <div id="resultado-busca"></div>
  </div>

  <script src="main.js"></script>
  <script src="../JS/javascript.js"></script>
  <script src="../JS/logado.js"></script>
</body>
</html>
