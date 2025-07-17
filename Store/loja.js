// Função para setar cookie (com validade em dias)
function setCookie(name, value, days) {
  const d = new Date();
  d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = "expires=" + d.toUTCString();
  document.cookie = name + "=" + encodeURIComponent(value) + ";" + expires + ";path=/";
}

// Função para ler cookie pelo nome
function getCookie(name) {
  const cname = name + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i].trim();
    if (c.indexOf(cname) === 0) {
      return c.substring(cname.length, c.length);
    }
  }
  return "";
}

// Recupera lista do cookie
function pegarSacola() {
  const sacolaStr = getCookie("sacola");
  if (sacolaStr) {
    try {
      return JSON.parse(sacolaStr);
    } catch {
      return [];
    }
  }
  return [];
}

// Salva lista no cookie
function salvarSacola(sacola) {
  setCookie("sacola", JSON.stringify(sacola), 7);
}

// Atualiza texto do contador da sacola
function atualizarContador() {
  const sacola = pegarSacola();
  const contador = document.getElementById("contador-sacola");
  contador.textContent = sacola.length;
}

// Renderiza os itens na lista da sacola, com botão excluir
function renderizarSacola() {
  const sacola = pegarSacola();
  const ul = document.getElementById("itens-sacola");
  ul.innerHTML = "";

  if (sacola.length === 0) {
    ul.innerHTML = "<li>Sua sacola está vazia.</li>";
  } else {
    sacola.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item;

      // Botão excluir
      const btnExcluir = document.createElement("button");
      btnExcluir.textContent = "Excluir";
      btnExcluir.className = "btn-excluir-item";
      btnExcluir.onclick = () => remover_item(item);

      li.appendChild(btnExcluir);
      ul.appendChild(li);
    });
  }
}

// Remove item da sacola
function remover_item(nome) {
  let sacola = pegarSacola();
  sacola = sacola.filter((item) => item !== nome);
  salvarSacola(sacola);
  atualizarContador();
  renderizarSacola();
}

// Adiciona item na sacola
function adicionar_item(nome) {
  if (!nome) {
    alert("Produto inválido.");
    return;
  }
  let sacola = pegarSacola();

  if (sacola.includes(nome)) {
    alert("Este item já está na sua sacola.");
    return;
  }

  sacola.push(nome);
  salvarSacola(sacola);
  atualizarContador();
  renderizarSacola();
}

// Mostrar/Esconder lista da sacola ao clicar no carrinho
document.getElementById("carrinho-container").addEventListener("click", () => {
  const lista = document.getElementById("lista-sacola");
  lista.classList.toggle("active");
});

// Fechar lista da sacola
document.getElementById("btn-fechar-sacola").addEventListener("click", () => {
  document.getElementById("lista-sacola").classList.remove("active");
});

// Enviar para WhatsApp
document.getElementById("btn-enviar-whatsapp").addEventListener("click", function () {
  const itens = document.querySelectorAll("#itens-sacola li");
  const nomeCliente = document.getElementById("nome-cliente").value.trim();
  const agora = new Date();
  const dataHora = agora.toLocaleString("pt-BR");

  if (itens.length === 0 || (itens.length === 1 && itens[0].textContent.includes("vazia"))) {
    alert("Sua sacola está vazia!");
    return;
  }

  let mensagem = "Olá! Gostaria de saber mais sobre os seguintes produtos:\n\n";
  itens.forEach((item, index) => {
    const nomeProduto = item.firstChild.textContent.trim();
    mensagem += `${index + 1}. ${nomeProduto}\n`;
  });

  if (nomeCliente) {
    mensagem += `\nNome: ${nomeCliente}`;
  }

  mensagem += `\nData/Hora: ${dataHora}`;
  mensagem += "\n\nAguardo retorno. Obrigado!";

  const numeroWhatsApp = "5511948075271"; // Altere para o número da loja com DDD
  const link = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;
  window.open(link, "_blank");
});

// Inicializa ao carregar a página
window.addEventListener("load", () => {
  atualizarContador();
  renderizarSacola();
});
