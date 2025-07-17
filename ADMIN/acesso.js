function getCookie(nome) {
  const nomeEQ = nome + "=";
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i].trim();
    if (c.indexOf(nomeEQ) === 0) return c.substring(nomeEQ.length, c.length);
  }
  return null;
}

const usuariosCookie = getCookie("usuarios"); // exemplo: "GAMIN=Admin,Joao=1234"
let acessoLiberado = false;

if (usuariosCookie) {
  const usuariosArr = usuariosCookie.split(",");
  for (const u of usuariosArr) {
    const [nome, senha] = u.split("=");
    if (senha === "Admin") {
      acessoLiberado = true;
      break;
    }
  }
}

if (!acessoLiberado) {
  const elemento = document.getElementById("html");
  if (elemento) elemento.remove();
  alert("Acesso restrito");
  window.location.href = "../Login/login.php";
}
