<?php
require '../php/config.php';
$linha = $conn->query("SELECT usuario, senha FROM admin")->fetch_assoc();
?>

<!DOCTYPE html>
<html lang="en">
<head>
       <meta charset='utf-8'>
    <meta http-equiv='X-UA-Compatible' content='IE=edge'>
    <title>Correa Informatica</title>
    <meta name='viewport' content='width=device-width, initial-scale=1'>
    <link rel='stylesheet' type='text/css' media='screen' href='main.css'>
    <link rel='stylesheet' type='text/css' media='screen' href='../css/nav.css'>
    <link rel='stylesheet' type='text/css' media='screen' href='../css/footer.css'>
    <link rel='stylesheet' type='text/css' media='screen' href='../Font/font.css'>
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
            <li><a href="../ADMIN/login.html">LOGIN</a></li>
        </ul>
    </nav>
    <main>
        <div class="login-box">
        <h2>Login</h2>
        <form>
            <input type="text" name="usuario" placeholder="Usuário" required id="usuario" />
            <input type="password" name="senha" placeholder="Senha" required id="senha"/>
            <button type="submit">Entrar</button>
        </form>
    </main>
</body>
</html>
