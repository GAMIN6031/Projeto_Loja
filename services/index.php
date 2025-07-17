<?php
require '../php/config.php';
// 🔄 Processamento AJAX
if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_POST["action"]) && $_POST["action"] === "buscar") {
    $nome = $_POST["nome"];
    $telefone = $_POST["telefone"];

    $resultado = $conn->query("SELECT * FROM ordemdeservico WHERE nome = '$nome' AND telefone = '$telefone' LIMIT 1");

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
    <meta charset="UTF-8">
    <title>Correa Informática</title>
    <meta name='viewport' content='width=device-width, initial-scale=1'>
    <link rel='stylesheet' type='text/css' media='screen' href='main.css'>
    <link rel='stylesheet' type='text/css' media='screen' href='../css/nav.css'>
    <link rel='stylesheet' type='text/css' media='screen' href='../css/footer.css'>
    <link rel='stylesheet' type='text/css' media='screen' href='../Font/font.css'>
</head>
<body>
<div class="pagina">
    
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





<div id="div_dados">
    <h2>Localizar Ordem de Serviço</h2>


    <label for="Nome">Nome:</label>
    <input type="text" placeholder="Nome" id="Nome">

    <label for="Telefone">Telefone:</label>
    <input type="text" placeholder="Número de Telefone" id="Telefone">
    <div id="mensagem-erro" style="margin: 10px 0px 20px 0px; text-align: center;"></div>

    <input type="button" value="Buscar" onclick="buscar()">
</div>

<div id="resultado-busca"></div>



    <footer id="footer">
        <p>&copy; 2025 Correa Informática. Todos os direitos reservados.</p>
        <p>Desenvolvendo soluções tecnológicas de ponta para você.</p>
        <p>Conectando pessoas e ideias.</p>
    </footer>
</div>

<script src="main.js"></script>
<script src="../JS/logado.js"></script>
</body>
</html>
