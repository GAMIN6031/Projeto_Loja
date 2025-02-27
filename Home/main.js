if (document.cookie.includes('entrou=ok')) {
    document.getElementById('inicio').style.display = 'none';
    document.getElementById('pagina').style.display = 'block';
} else {
    function entrar() {
        const diventrar = document.getElementById('inicio');
        diventrar.style.display = 'none';
        document.getElementById('pagina').style.display = 'block';
        let days = 1;
        let date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        let expires = "expires=" + date.toUTCString();
        document.cookie = "entrou=ok;" + expires + ";path=/";
    }
}
var data = new Date();
var dia = data.getDate();
var mes = data.getMonth() + 1;
var ano = data.getFullYear();
document.getElementById('data').innerHTML = (dia + " / " + mes + " / " + ano);


