<?php
require '../php/config.php';
session_start();

if (!isset($_SESSION['user_role']) || $_SESSION['user_role'] !== 'Admin') {
    header("Location: ../Login/login.php");
    exit();
}

// 🔀 ORGANIZAÇÃO CORRETA DAS AÇÕES
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Ações especiais via fetch
    if (isset($_POST["action"])) {
        $id = $_POST["id"];

        switch ($_POST["action"]) {
            case "editar":
                $conn->query("
                    UPDATE ordemdeservico SET
                        nome     = '{$_POST["nome"]}',
                        telefone = '{$_POST["telefone"]}',
                        aparelho = '{$_POST["aparelho"]}',
                        defeito  = '{$_POST["defeito"]}',
                        tempo    = '{$_POST["tempo"]}',
                        status   = '{$_POST["status"]}'
                    WHERE id = '$id'
                ");
                echo "Registro atualizado!";
                exit();

            case "deletar":
                $conn->query("DELETE FROM ordemdeservico WHERE id = '$id'");
                echo "Registro excluído!";
                exit();

            case "status":
                $conn->query("UPDATE ordemdeservico SET status = '{$_POST["status"]}' WHERE id = '$id'");
                echo "Status alterado!";
                exit();
        }
    }

    // Inserção de novo registro
    elseif (isset($_POST["nome"])) {
        $sql = "INSERT INTO ordemdeservico (nome, telefone, aparelho, defeito, tempo, status)
                VALUES ('{$_POST["nome"]}', '{$_POST["telefone"]}', '{$_POST["aparelho"]}', '{$_POST["defeito"]}', '{$_POST["tempo"]}', '{$_POST["status"]}')";
        if ($conn->query($sql) === TRUE) {
            echo "<p style='color:green;'>Registro cadastrado com sucesso!</p>";
        } else {
            echo "<p style='color:red;'>Erro: " . $conn->error . "</p>";
        }
    }
}
?>

<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Ordem de Serviço</title>
</head>
<body>
    <link rel='stylesheet' type='text/css' media='screen' href='main.css'>
    <link rel='stylesheet' type='text/css' media='screen' href='../css/nav.css'>
    <link rel='stylesheet' type='text/css' media='screen' href='../Font/font.css'>
    
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



    <div class="pagina">
<form method="POST">
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
    <input type="submit" value="Cadastrar">
</form>

<table>
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
