function exibirUsuarioAdmin() {
  // Função para pegar cookie pelo nome
  function getCookie(nome) {
    const nomeEQ = nome + "=";
    const ca = document.cookie.split(';');
    for(let i=0; i < ca.length; i++) {
      let c = ca[i].trim();
      if (c.indexOf(nomeEQ) === 0) return c.substring(nomeEQ.length, c.length);
    }
    return null;
  }

  const usuariosCookie = getCookie("usuarios"); // Exemplo: "GAMIN=Admin,Joao=12345"

  if (usuariosCookie) {
    const usuariosArr = usuariosCookie.split(","); // ["GAMIN=Admin", "Joao=12345"]
    
    // Procura usuário com senha "Admin"
    for (const u of usuariosArr) {
      const [nome, senha] = u.split("=");
      if (senha === "Admin") {
        // Atualiza o texto com "User: Admin (GAMIN)"
        document.getElementById("nick").innerHTML = `User: Admin (${nome})`;
        areaAdmin(); // ativa área admin
        break; // para após o primeiro encontrado
      }
    }
  }
}

function areaAdmin() {
  const ulConta = document.getElementById("conta");
  const li_areaAdmin = document.createElement("li");
  const a_areaAdmin = document.createElement("a");
  a_areaAdmin.innerText = "ÁREA ADMINISTRATIVA";
  a_areaAdmin.href = "../Admin/index.php";
  li_areaAdmin.appendChild(a_areaAdmin);
  ulConta.appendChild(li_areaAdmin);
}

// Chame essa função para mostrar o usuário admin no carregamento da página:
exibirUsuarioAdmin();
