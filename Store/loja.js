// Toast flutuante
function mostrarToast(mensagem, duracao = 4000) {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = mensagem;

  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("hide");
    toast.addEventListener("transitionend", () => toast.remove());
  }, duracao);
}

// Cookies
function setCookie(name, value, days) {
  const d = new Date();
  d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = "expires=" + d.toUTCString();
  document.cookie = name + "=" + encodeURIComponent(value) + ";" + expires + ";path=/";
}

function getCookie(name) {
  const cname = name + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(";");
  for (let c of ca) {
    c = c.trim();
    if (c.indexOf(cname) === 0) return c.substring(cname.length);
  }
  return "";
}

// Sacola
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

function salvarSacola(sacola) {
  setCookie("sacola", JSON.stringify(sacola), 7);
}

function atualizarContador() {
  const sacola = pegarSacola();
  const total = sacola.reduce((soma, item) => soma + item.quantidade, 0);
  document.querySelectorAll("#contador-sacola, #contador-sacola-mobile, #contador-sacola-top").forEach(contador => {
    contador.textContent = total;
  });
}

function renderizarSacola() {
  const sacola = pegarSacola();
  const ul = document.getElementById("itens-sacola");
  if (!ul) return;

  ul.innerHTML = "";

  if (sacola.length === 0) {
    ul.innerHTML = "<li>Sua sacola está vazia.</li>";
  } else {
    sacola.forEach(item => {
      const li = document.createElement("li");
      li.textContent = `${item.nome} (x${item.quantidade})`;

      const btnExcluir = document.createElement("button");
      btnExcluir.textContent = "Excluir";
      btnExcluir.classList.add("excluir-btn");
      btnExcluir.onclick = () => remover_item(item.nome);

      li.appendChild(btnExcluir);
      ul.appendChild(li);
    });
  }
}

function adicionar_item(nome) {
  if (!nome) {
    mostrarToast("Produto inválido.");
    return;
  }

  let sacola = pegarSacola();
  const existente = sacola.find(item => item.nome === nome);

  if (existente) {
    existente.quantidade += 1;
  } else {
    sacola.push({ nome, quantidade: 1 });
  }

  salvarSacola(sacola);
  atualizarContador();
  renderizarSacola();

  mostrarToast("✅ Produto adicionado com sucesso!");
}

function remover_item(nome) {
  let sacola = pegarSacola();
  sacola = sacola.filter(item => item.nome !== nome);
  salvarSacola(sacola);
  atualizarContador();
  renderizarSacola();
}

// WhatsApp
function enviarParaWhatsApp() {
  const sacola = pegarSacola();
  const nomeCliente = document.getElementById("nome-cliente")?.value.trim() || "";
  const agora = new Date();
  const dataHora = agora.toLocaleString("pt-BR");

  if (sacola.length === 0) {
    alert("Sua sacola está vazia!");
    return;
  }

  let mensagem = "Olá! Gostaria de saber mais sobre os seguintes produtos:\n\n";
  sacola.forEach((item, index) => {
    mensagem += `${index + 1}. ${item.nome} (x${item.quantidade})\n`;
  });

  if (nomeCliente) mensagem += `\nNome: ${nomeCliente}`;
  mensagem += `\nData/Hora: ${dataHora}`;
  mensagem += "\n\nAguardo retorno. Obrigado!";

  const numeroWhatsApp = "5511948075271";
  const link = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;
  window.open(link, "_blank");
}

// Mostrar/Fechar sacola
function toggleSacola() {
  const lista = document.getElementById("lista-sacola");
  if (!lista) return;
  lista.style.display = (lista.style.display === "block") ? "none" : "block";
}

function fecharSacola() {
  const lista = document.getElementById("lista-sacola");
  if (lista) lista.style.display = "none";
}

// Inicialização ao carregar página
window.addEventListener("load", () => {
  atualizarContador();
  renderizarSacola();

  document.querySelectorAll(".btn-add").forEach(botao => {
    botao.addEventListener("click", () => {
      const nome = botao.dataset.nome;
      adicionar_item(nome);
    });
  });

  document.querySelectorAll("#carrinho-container, #carrinho-container-mobile").forEach(botao => {
    botao.addEventListener("click", toggleSacola);
  });

  document.getElementById("btn-fechar-sacola")?.addEventListener("click", fecharSacola);
  document.getElementById("btn-enviar-whatsapp")?.addEventListener("click", enviarParaWhatsApp);

  const carrinhoTop = document.getElementById("carrinho-container-top");
  if (carrinhoTop) {
    carrinhoTop.addEventListener("click", (e) => {
      e.preventDefault();
      toggleSacola();
    });
  }
});
