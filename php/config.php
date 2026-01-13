<?php 

$server = 'localhost';
$usuario = 'root';
$banco = 'projeto_loja';
$senha = '';

$conn = new mysqli($server, $usuario, $senha, $banco);

if ($conn->connect_error) {
    die("Conexão falhou: " . $conn->connect_error);
} 

// Se quiser evitar mostrar mensagem, pode deixar o else vazio ou removê-lo

?>
