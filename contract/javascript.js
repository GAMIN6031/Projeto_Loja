const btnvoltar = document.getElementById('seta_esquerda');
const btnproximo = document.getElementById('seta_direita');
const correainformatica = document.getElementById('correainformatica');
const PieceByCode = document.getElementById('PieceByCode');
let pag = 0;
let empresas = [correainformatica, PieceByCode];

function voltar() {
    if (pag == 1) {  
        correainformatica.style.animation = 'voltar 4s 1 normal forwards';
        PieceByCode.style.animation = 'voltarpiece 4s 1 normal forwards';
        btnvoltar.style.display = 'none';
        btnproximo.style.display = 'block';
        pag = 0; 
    }
}

function proximo() {
    if (pag == 0) {
        correainformatica.style.animation = 'proximo 4s 1 normal forwards';
        PieceByCode.style.animation = 'proximopiece 4s 1 normal forwards';
        btnvoltar.style.display = 'block';
        btnproximo.style.display = 'none'; 
        pag = 1; 
    }
}