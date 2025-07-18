function getCookie(nome) {
  const nomeEQ = nome + "=";
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i].trim();
    if (c.indexOf(nomeEQ) === 0) return c.substring(nomeEQ.length, c.length);
  }
  return null;
}

function exibirUsuarioAdmin() {
  const usuariosCookie = getCookie("usuarios"); // Exemplo: "GAMIN=Admin,Joao=12345"

  if (usuariosCookie) {
    const usuariosArr = usuariosCookie.split(",");

    for (const u of usuariosArr) {
      const [nome, senha] = u.split("=");

      if (senha === "Admin") {
        // Atualiza todos os elementos com a classe 'nick'
        const nicks = document.querySelectorAll('.nick');
        nicks.forEach(el => {
          el.innerHTML = `User: Admin (${nome})`;
        });

        criarBotaoSairConta();
        areaAdmin();
        break;
      }
    }
  } else {
    // Remove botão sair se não logado
    document.querySelectorAll('#btn-sair-conta').forEach(btn => {
      btn.parentNode.removeChild(btn);
    });
  }
}

function areaAdmin() {
  ['conta', 'conta-mobile'].forEach(id => {
    const ulConta = document.getElementById(id);
    if (!ulConta) return;

    // Evita duplicar o link da área admin
    const existe = [...ulConta.children].some(li =>
      li.textContent.includes("ÁREA ADMINISTRATIVA")
    );
    if (existe) return;

    const li = document.createElement("li");
    const a = document.createElement("a");
    a.innerText = "ÁREA ADMINISTRATIVA";
    a.href = "../Admin/index.php";
    li.appendChild(a);
    ulConta.appendChild(li);
  });
}

function criarBotaoSairConta() {
  ['conta', 'conta-mobile'].forEach(id => {
    const ulConta = document.getElementById(id);
    if (!ulConta) return;

    // Evita duplicar o botão
    if (ulConta.querySelector('#btn-sair-conta')) return;

    const botao = document.createElement('button');
    botao.id = 'btn-sair-conta';
    botao.textContent = 'Sair da Conta';
    botao.style.cursor = 'pointer';
    botao.style.background = 'none';
    botao.style.border = 'none';
    botao.style.color = 'red';
    botao.style.fontWeight = 'bold';
    botao.style.fontSize = '1rem';
    botao.addEventListener('click', () => {
      document.cookie = "usuarios=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      location.reload();
    });

    const li = document.createElement('li');
    li.appendChild(botao);
    ulConta.appendChild(li);
  });
}

// Executa ao carregar a página
exibirUsuarioAdmin();

// Favicon
let link = document.createElement('link');
link.rel = 'shortcut icon';
link.type = 'image/x-icon';
link.href = '../css/favicon.ico';
document.head.appendChild(link);
