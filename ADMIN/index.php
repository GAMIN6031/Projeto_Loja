<?php
require '../php/config.php';
session_start();

if (!isset($_SESSION['user_role']) || $_SESSION['user_role'] !== 'Admin') {
    header("Location: ../Login/login.php");
    exit();
}

// Diretório para upload das imagens
$uploadDir = '../uploads/';

if ($_SERVER["REQUEST_METHOD"] === "POST") {

    // AÇÕES COMUNS (EDITAR, DELETAR, STATUS) PARA ORDEM DE SERVIÇO
    if (isset($_POST["action"])) {
        $id = (int) $_POST["id"];
        $nome = $conn->real_escape_string($_POST["nome"] ?? "");
        $telefone = $conn->real_escape_string($_POST["telefone"] ?? "");
        $aparelho = $conn->real_escape_string($_POST["aparelho"] ?? "");
        $defeito = $conn->real_escape_string($_POST["defeito"] ?? "");
        $tempo = $conn->real_escape_string($_POST["tempo"] ?? "");
        $status = $conn->real_escape_string($_POST["status"] ?? "");

        switch ($_POST["action"]) {
            case "editar":
                $conn->query("
                    UPDATE ordemdeservico SET
                        nome     = '$nome',
                        telefone = '$telefone',
                        aparelho = '$aparelho',
                        defeito  = '$defeito',
                        tempo    = '$tempo',
                        status   = '$status'
                    WHERE id = '$id'
                ");
                echo "Registro atualizado!";
                exit();

            case "deletar":
                $conn->query("DELETE FROM ordemdeservico WHERE id = '$id'");
                echo "Registro excluído!";
                exit();

            case "status":
                $conn->query("UPDATE ordemdeservico SET status = '$status' WHERE id = '$id'");
                echo "Status alterado!";
                exit();
        }
    }

    // VERIFICA QUAL FORMULÁRIO FOI ENVIADO
    if (isset($_POST["form_type"])) {
        // CADASTRAR NOVA ORDEM DE SERVIÇO
        if ($_POST["form_type"] === "os") {
            $nome = $conn->real_escape_string($_POST["nome"]);
            $telefone = $conn->real_escape_string($_POST["telefone"]);
            $aparelho = $conn->real_escape_string($_POST["aparelho"]);
            $defeito = $conn->real_escape_string($_POST["defeito"]);
            $tempo = $conn->real_escape_string($_POST["tempo"]);
            $status = $conn->real_escape_string($_POST["status"]);

            $sql = "INSERT INTO ordemdeservico (nome, telefone, aparelho, defeito, tempo, status)
                    VALUES ('$nome', '$telefone', '$aparelho', '$defeito', '$tempo', '$status')";
            $conn->query($sql);

            header("Location: " . $_SERVER['PHP_SELF']);
            exit();
        }

        // CADASTRAR NOVO PRODUTO COM IMAGEM
        elseif ($_POST["form_type"] === "produto") {
            $nome = $conn->real_escape_string($_POST["produto_nome"]);
            $descricao = $conn->real_escape_string($_POST["produto_descricao"]);
            $preco = floatval($_POST["produto_preco"]);

            if (isset($_FILES['produto_imagem']) && $_FILES['produto_imagem']['error'] === UPLOAD_ERR_OK) {
                $fileTmpPath = $_FILES['produto_imagem']['tmp_name'];
                $fileName = basename($_FILES['produto_imagem']['name']);
                $fileType = $_FILES['produto_imagem']['type'];

                $allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
                if (!in_array($fileType, $allowedMimeTypes)) {
                    echo "<script>alert('Formato de imagem não permitido. Use JPG, PNG ou GIF.');window.history.back();</script>";
                    exit();
                }

                $fileExtension = pathinfo($fileName, PATHINFO_EXTENSION);
                $newFileName = uniqid('img_', true) . '.' . $fileExtension;
                $destPath = $uploadDir . $newFileName;

                if (!is_dir($uploadDir)) {
                    mkdir($uploadDir, 0755, true);
                }

                if (move_uploaded_file($fileTmpPath, $destPath)) {
                    $imagem = $conn->real_escape_string($newFileName);

                    $conn->query("
                        INSERT INTO produtos (nome, descricao, preco, imagem)
                        VALUES ('$nome', '$descricao', '$preco', '$imagem')
                    ");

                    header("Location: " . $_SERVER['PHP_SELF']);
                    exit();
                } else {
                    echo "<script>alert('Erro ao salvar a imagem.');window.history.back();</script>";
                    exit();
                }
            } else {
                echo "<script>alert('Erro no upload da imagem.');window.history.back();</script>";
                exit();
            }
        }

        // 🆕 DELETAR PRODUTO
        elseif ($_POST["form_type"] === "deletar_produto") {
            $produto_id = (int) $_POST["produto_id"];

            // Buscar a imagem do produto
            $res = $conn->query("SELECT imagem FROM produtos WHERE id = $produto_id");
            if ($res && $res->num_rows > 0) {
                $img = $res->fetch_assoc()["imagem"];
                $imgPath = $uploadDir . $img;

                // Apagar a imagem do diretório
                if (file_exists($imgPath)) {
                    unlink($imgPath);
                }
            }

            // Deletar produto do banco
            $conn->query("DELETE FROM produtos WHERE id = $produto_id");

            header("Location: " . $_SERVER['PHP_SELF']);
            exit();
        }
    }
}
?>


<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Ordem de Serviço + Cadastro de Produtos</title>
    <link rel='stylesheet' type='text/css' media='screen' href='main.css'>
    <link rel='stylesheet' type='text/css' media='screen' href='../css/nav.css'>
    <link rel='stylesheet' type='text/css' media='screen' href='../Font/font.css'>
</head>
<body>


<div class="hamburger" onclick="toggleSidebar()" aria-label="Menu" aria-expanded="false" role="button" tabindex="0">
  <span></span>
  <span></span>
  <span></span>
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

<!-- Menu lateral (mobile) -->
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


<div class="pagina">
    <!-- FORMULÁRIO CADASTRAR PRODUTO -->
    <form method="POST" enctype="multipart/form-data" style="margin-top: 40px;">
        <input type="hidden" name="form_type" value="produto">
        <h2>Cadastrar Produto</h2>
        <label>Nome:</label>
        <input type="text" name="produto_nome" required>
        <label>Descrição:</label>
        <textarea name="produto_descricao" required></textarea>
        <label>Preço:</label>
        <input type="number" step="0.01" name="produto_preco" required>
        <label>Imagem:</label>
        <input type="file" name="produto_imagem" accept="image/*" required>
        <input type="submit" value="Cadastrar Produto">
    </form>
<!-- TABELA DE PRODUTOS -->
<h2 style="margin-top: 60px;">Produtos Cadastrados</h2>
<table>
  <tr>
    <th>ID</th>
    <th>Nome</th>
    <th>Descrição</th>
    <th>Preço</th>
    <th>Imagem</th>
    <th>Ações</th>
  </tr>
  <?php
  $produtos = $conn->query("SELECT * FROM produtos ORDER BY id DESC");
  while ($p = $produtos->fetch_assoc()) {
    echo "<tr>
      <td data-label>{$p['id']}</td>
      <td data-label>{$p['nome']}</td>
      <td data-label>{$p['descricao']}</td>
      <td data-label>R$ " . number_format($p['preco'], 2, ',', '.') . "</td>
      <td data-label><img src='../uploads/{$p['imagem']}' alt='' width='60'></td>
      <td>
        <form method='POST' onsubmit=\"return confirm('Tem certeza que deseja excluir este produto?');\">
          <input type='hidden' name='form_type' value='deletar_produto'>
          <input type='hidden' name='produto_id' value='{$p['id']}'>
          <input type='submit' value='Excluir' style='color: red; font-weight: bold;'>
        </form>
      </td>
    </tr>";
  }
  ?>
</table>

    <!-- FORMULÁRIO NOVA ORDEM DE SERVIÇO -->
    <form method="POST" style="margin-top: 40px;">
        <input type="hidden" name="form_type" value="os">
        <h2>Nova Ordem de Serviço</h2>
        <label>Nome:</label>
        <input type="text" name="nome" required>
        <label>Telefone:</label>
        <input type="text" name="telefone" required>
        <label>Aparelho:</label>
        <input type="text" name="aparelho" required>
        <label>Defeito:</label>
        <textarea name="defeito" required></textarea>
        <label>Tempo estimado:</label>
        <input type="text" name="tempo" required>
        <label>Status:</label>
        <select name="status" required>
            <option value="Em andamento">Em andamento</option>
            <option value="Pronto">Pronto</option>
        </select>
        <input type="submit" value="Cadastrar OS">
    </form>

    <!-- TABELA ORDEM DE SERVIÇO -->
    <table style="margin-top: 40px;">
        <h2>Serviços Registrados</h2>
        <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Telefone</th>
            <th>Aparelho</th>
            <th>Defeito</th>
            <th>Tempo</th>
            <th>Status</th>
            <th>Ações</th>
        </tr>
        <?php
        $resultado = $conn->query("SELECT * FROM ordemdeservico ORDER BY id DESC");
        while ($linha = $resultado->fetch_assoc()) {
            $json = htmlspecialchars(json_encode($linha), ENT_QUOTES, 'UTF-8');
            echo "<tr>
                <td>{$linha["id"]}</td>
                <td>{$linha["nome"]}</td>
                <td>{$linha["telefone"]}</td>
                <td>{$linha["aparelho"]}</td>
                <td>{$linha["defeito"]}</td>
                <td>{$linha["tempo"]}</td>
                <td>{$linha["status"]}</td>
                <td>
                    <button class='editar' onclick='editar($json)'>Editar</button>
                    <button class='deletar' onclick='deletar({$linha["id"]})'>Apagar</button>
                    <button class='status' onclick=\"alterarStatus({$linha["id"]}, 'Pronto')\">Pronto</button>
                    <button class='status' onclick=\"alterarStatus({$linha["id"]}, 'Em andamento')\">Em Andamento</button>
                </td>
            </tr>";
        }
        $conn->close();
        ?>
    </table>

</div>

<script src="./acesso.js"></script>
<script src="./editar.js"></script>
<script src="../JS/logado.js"></script>
</body>
</html>
