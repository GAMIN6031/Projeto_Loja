<?php
require '../php/config.php';

$conn->set_charset("utf8");

$produtos = [];
$sql = "SELECT * FROM produtos ORDER BY id DESC";
$result = $conn->query($sql);

if ($result && $result->num_rows > 0) {
  while ($row = $result->fetch_assoc()) {
    $produtos[] = $row;
  }
}
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8" />
  <title>Correa Informática - Loja</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="../css/nav.css">
  <link rel="stylesheet" href="../Font/font.css">
  <link rel="stylesheet" href="carrinho.css">
</head>
<body>

<!-- Botão Hamburger -->
<div class="hamburger" aria-label="Menu" aria-expanded="false" aria-controls="sidebar" role="button" tabindex="0">
  <span></span>
  <span></span>
  <span></span>
</div>

<!-- Carrinho fixo no topo (opcional) -->
<a href="#" id="carrinho-container-top" title="Clique para ver a sacola" aria-label="Sacola">
  🛒 <span id="contador-sacola-top">0</span>
</a>

<!-- Barra de navegação principal -->
<nav>
  <ul>
    <li><img src="../imgs/logo loja.jpg" alt="Logo Loja" /></li>
    <li><a href="../Home/Index.html">INÍCIO</a></li>
    <li><a href="../Store/Loja.php">LOJA</a></li>
    <li><a href="../contract/index.html">CONTATO</a></li>
    <li><a href="../services/index.php">SERVIÇOS</a></li>
  </ul>
  <ul id="conta">
    <li>
      <a href="#" id="carrinho-container" title="Clique para ver a sacola">
        🛒 Sacola <span id="contador-sacola">0</span>
      </a>
    </li>
    <li><a href="../Login/login.php" class="nick">LOGIN</a></li>
  </ul>
</nav>

<!-- Sidebar (menu lateral mobile) -->
<div class="mobile-sidebar" id="sidebar" aria-hidden="true">
  <ul>
    <li><img src="../imgs/logo loja.jpg" alt="Logo Loja" /></li>
    <li><a href="../Home/Index.html">INÍCIO</a></li>
    <li><a href="../Store/Loja.php">LOJA</a></li>
    <li><a href="../contract/index.html">CONTATO</a></li>
    <li><a href="../services/index.php">SERVIÇOS</a></li>
  </ul>
  <ul id="conta-mobile">
    <li>
      <a href="#" id="carrinho-container-mobile" title="Clique para ver a sacola">
        🛒 Sacola <span id="contador-sacola-mobile">0</span>
      </a>
    </li>
    <li><a href="../Login/login.php" class="nick">LOGIN</a></li>
  </ul>
</div>

<!-- Mensagem de sucesso -->
<div id="mensagem-sucesso" style="
  display: none;
  position: fixed;
  top: 20px;
  right: 20px;
  background: #28a745;
  color: white;
  padding: 12px 20px;
  border-radius: 6px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.2);
  z-index: 9999;
  font-size: 1rem;
  font-weight: 500;
  animation: fadeIn 0.3s ease-out;
">
  Produto adicionado com sucesso!
</div>
<div id="toast-container"></div>
<!-- Sacola -->
<div id="lista-sacola" class="lista-sacola" style="display:none;">
  <p class="titulo-sacola"><strong>Itens na sacola:</strong></p>
  <ul id="itens-sacola"></ul>

  <label for="nome-cliente">Seu nome:</label>
  <input type="text" id="nome-cliente" placeholder="Digite seu nome" />

  <button id="btn-enviar-whatsapp">📲 Enviar para WhatsApp</button>
  <button id="btn-fechar-sacola">Fechar</button>
</div>

<!-- Lista de Produtos -->
<section id="produtos">
  <?php foreach ($produtos as $produto): ?>
    <article class="produto">
      <img src="../uploads/<?= htmlspecialchars($produto['imagem']) ?>" alt="<?= htmlspecialchars($produto['nome']) ?>" />
      <h3><?= htmlspecialchars($produto['nome']) ?></h3>
      <p class="descricao"><?= htmlspecialchars($produto['descricao']) ?></p>
      <span class="preco">R$ <?= number_format($produto['preco'], 2, ',', '.') ?></span>
      <button class="btn-add" data-nome="<?= htmlspecialchars($produto['nome'], ENT_QUOTES) ?>">Adicionar à sacola</button>
    </article>
  <?php endforeach; ?>
</section>
<script src="../JS/logado.js"></script>
<script src="../js/javascript.js"></script>
<script src="loja.js"></script>
</script>
</body>
</html>
