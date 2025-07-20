document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const sidebar = document.getElementById('sidebar');

  function toggleSidebar() {
    const isActive = sidebar.classList.toggle('active');
    hamburger.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', isActive);
    sidebar.setAttribute('aria-hidden', !isActive);
  }

  hamburger.addEventListener('click', toggleSidebar);
  hamburger.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleSidebar();
    }
  });
});

(function(){
  // --- Cookies ---
  function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + days * 86400000);
    document.cookie = `${name}=${value};expires=${d.toUTCString()};path=/`;
  }

  function getCookie(name) {
    const cname = name + "=";
    const decoded = decodeURIComponent(document.cookie);
    const parts = decoded.split(';');
    for (let part of parts) {
      part = part.trim();
      if (part.indexOf(cname) === 0) return part.substring(cname.length);
    }
    return "";
  }

  // --- Helper para criar elementos ---
  function createElem(tag, styles = {}, text = "", attrs = {}) {
    const el = document.createElement(tag);
    Object.assign(el.style, styles);
    if (text) el.textContent = text;
    for (const [k, v] of Object.entries(attrs)) {
      el.setAttribute(k, v);
    }
    return el;
  }

  // --- Criar estrelas com suporte a teclado e mouse ---
  function criarEstrelas(numStars, onChange) {
    const container = createElem('div', {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: '15px',
      userSelect: 'none',
      cursor: 'pointer',
      gap: '8px',
    });
    container.setAttribute('role', 'radiogroup');
    container.setAttribute('aria-label', 'Avaliação por estrelas');

    let selectedRating = 0;
    let focusedIndex = 0;
    const stars = [];

    function pintarEstrelas(nota) {
      stars.forEach((star, i) => {
        star.style.color = i < nota ? '#FFB800' : '#ccc';
        star.textContent = i < nota ? '★' : '☆';
      });
    }

    function updateAria() {
      stars.forEach((star, i) => {
        star.setAttribute('aria-checked', i === selectedRating - 1 ? 'true' : 'false');
        star.tabIndex = i === focusedIndex ? '0' : '-1';
      });
    }

    for(let i = 0; i < numStars; i++) {
      const star = createElem('span', {
        fontSize: '42px',
        color: '#ccc',
        transition: 'color 0.3s',
        userSelect: 'none',
      }, '☆', {
        role: 'radio',
        'aria-checked': 'false',
        tabIndex: i === 0 ? '0' : '-1',
        'aria-label': `${i+1} estrela${i === 0 ? '' : 's'}`,
      });

      star.addEventListener('click', () => {
        selectedRating = i + 1;
        pintarEstrelas(selectedRating);
        updateAria();
        onChange(selectedRating);
      });

      star.addEventListener('mouseenter', () => pintarEstrelas(i + 1));
      star.addEventListener('mouseleave', () => pintarEstrelas(selectedRating));
      star.addEventListener('focus', () => focusedIndex = i);

      star.addEventListener('keydown', e => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
          e.preventDefault();
          focusedIndex = (focusedIndex + 1) % numStars;
          stars[focusedIndex].focus();
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
          e.preventDefault();
          focusedIndex = (focusedIndex - 1 + numStars) % numStars;
          stars[focusedIndex].focus();
        } else if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          selectedRating = focusedIndex + 1;
          pintarEstrelas(selectedRating);
          updateAria();
          onChange(selectedRating);
        }
      });

      stars.push(star);
      container.appendChild(star);
    }

    pintarEstrelas(selectedRating);
    updateAria();
    return container;
  }

  // --- Botão fixo para abrir modal ---
  function criarBotaoIconeAbrirModal() {
    if(document.getElementById('btnAvaliarIcone')) return;

    const btn = createElem('button', {
      position: 'fixed',
      bottom: '25px',
      right: '25px',
      width: '56px',
      height: '56px',
      borderRadius: '50%',
      backgroundColor: '#FFB800',
      border: 'none',
      cursor: 'pointer',
      boxShadow: '0 4px 12px rgba(255, 184, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 10000,
      transition: 'background-color 0.3s ease, box-shadow 0.3s ease, transform 0.2s ease',
    }, '', {
      id: 'btnAvaliarIcone',
      'aria-label': 'Avaliar serviço',
      title: 'Clique para avaliar',
      type: 'button',
    });

    btn.innerHTML = `
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.2" stroke-linejoin="round" stroke-linecap="round">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z"/>
      </svg>
    `;

    btn.addEventListener('mouseenter', () => {
      btn.style.backgroundColor = '#e0a800';
      btn.style.boxShadow = '0 6px 18px rgba(224, 168, 0, 0.8)';
      btn.style.transform = 'scale(1.1)';
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.backgroundColor = '#FFB800';
      btn.style.boxShadow = '0 4px 12px rgba(255, 184, 0, 0.5)';
      btn.style.transform = 'scale(1)';
    });

    btn.addEventListener('click', () => {
      criarModalAvaliar();
      document.body.removeChild(btn);
    });

    document.body.appendChild(btn);
  }

  // --- Modal de avaliação ---
  function criarModalAvaliar() {
    if(document.getElementById('modalAvaliar')) return;

    const modal = createElem("div", {
      position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
      backgroundColor: "rgba(0,0,0,0.55)",
      display: "flex", justifyContent: "center", alignItems: "center",
      opacity: 0,
      transition: "opacity 0.35s",
      zIndex: 9999,
    }, "", {
      role: "dialog",
      "aria-modal": "true",
      "aria-labelledby": "modalTitle",
      id: 'modalAvaliar'
    });

    const box = createElem("div", {
      backgroundColor: "white",
      borderRadius: "12px",
      padding: "28px 32px",
      maxWidth: "380px",
      width: "90%",
      boxSizing: "border-box",
      boxShadow: "0 10px 25px rgba(0,0,0,0.25)",
      textAlign: "center",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      userSelect: "none",
      position: 'relative',
    });

    const titulo = createElem("h2", {
      marginBottom: "18px",
      fontSize: "24px",
      fontWeight: "600",
      color: "#222",
    }, "Gostaria de avaliar nosso serviço?");
    titulo.id = "modalTitle";

    const mensagemNota = createElem("p", {
      fontSize: "17px",
      color: "#555",
      minHeight: "26px",
      marginBottom: "24px",
      fontWeight: "500",
      transition: "color 0.3s",
    });

    let notaSelecionada = 0;

    const estrelas = criarEstrelas(5, (nota) => {
      notaSelecionada = nota;
      mensagemNota.textContent = `Você avaliou ${nota} estrela${nota > 1 ? 's' : ''}.`;
      btnAvaliar.disabled = false;
      btnAvaliar.style.backgroundColor = "#28a745";
      btnAvaliar.style.cursor = "pointer";
    });

    const btnAvaliar = createElem("button", {
      backgroundColor: "#999",
      color: "white",
      border: "none",
      padding: "14px 30px",
      borderRadius: "8px",
      cursor: "not-allowed",
      fontSize: "18px",
      fontWeight: "700",
      marginRight: "12px",
      transition: "background-color 0.3s, box-shadow 0.3s",
      boxShadow: "none",
    }, "Avaliar");
    btnAvaliar.disabled = true;
    btnAvaliar.onmouseenter = () => {
      if (!btnAvaliar.disabled)
        btnAvaliar.style.boxShadow = "0 0 10px #28a745cc";
    };
    btnAvaliar.onmouseleave = () => {
      btnAvaliar.style.boxShadow = "none";
    };
    btnAvaliar.onclick = () => {
      if (notaSelecionada === 0) return;
      setCookie("avaliou", "sim", 30);
      modal.style.opacity = 0;
      setTimeout(() => {
        window.location.href = "https://www.exemplo.com/avaliar";
      }, 350);
    };

    const btnNao = createElem("button", {
      backgroundColor: "#dc3545",
      color: "white",
      border: "none",
      padding: "14px 28px",
      borderRadius: "8px",
      cursor: "pointer",
      fontSize: "16px",
      fontWeight: "600",
      transition: "background-color 0.3s",
    }, "Não, obrigado");
    btnNao.onmouseenter = () => btnNao.style.backgroundColor = "#bb2d3b";
    btnNao.onmouseleave = () => btnNao.style.backgroundColor = "#dc3545";
    btnNao.onclick = () => {
      setCookie("avaliou", "nao", 30);
      modal.style.opacity = 0;
      setTimeout(() => {
        document.body.removeChild(modal);
        criarBotaoIconeAbrirModal();
      }, 350);
    };

    const divBotoes = createElem('div', {
      display: 'flex',
      justifyContent: 'center',
      gap: '12px',
      flexWrap: 'wrap',
    });
    divBotoes.append(btnAvaliar, btnNao);

    box.append(titulo, estrelas, mensagemNota, divBotoes);
    modal.appendChild(box);
    document.body.appendChild(modal);

    requestAnimationFrame(() => {
      modal.style.opacity = "1";
    });

    const firstStar = estrelas.querySelector('span[role="radio"]');
    if (firstStar) firstStar.focus();
  }

  // --- Lógica principal ---
  const avaliado = getCookie("avaliou");
  if (avaliado === "sim") {
    // Já avaliou, não mostra nada
    return;
  } else if (avaliado === "nao") {
    // Escolheu não avaliar, mostra botão
    criarBotaoIconeAbrirModal();
  } else {
    // Não avaliou, mostra modal direto
    criarModalAvaliar();
  }
})();
