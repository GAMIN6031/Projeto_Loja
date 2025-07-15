<?php 

$server = 'localhost';
$usuario = 'root';
$senha = '';
$banco = 'projeto_loja';
$conn = new mysqli($server,$usuario,$senha,$banco);

if($conn->connect_error){
    die($conn->connect_error); // <- ponto e vírgula adicionado aqui
} else {
    echo "";
}


?>