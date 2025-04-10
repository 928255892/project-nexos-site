/* ========================================
   Project Nexos – script.js
   Funcionalidades Interativas e Animações
======================================== */

/* =======================
   Copiar Código para Área de Transferência
======================= */
const copiarBtn = document.querySelector('.btn-copiar');
const copiarBloco = document.querySelector('.copiar-bloco pre');
const copiadoFeedback = document.querySelector('#copiadoFeedback');

if (copiarBtn && copiarBloco && copiadoFeedback) {
  copiarBtn.addEventListener('click', () => {
    const texto = copiarBloco.textContent;
    navigator.clipboard.writeText(texto).then(() => {
      copiadoFeedback.style.display = 'inline';
      setTimeout(() => {
        copiadoFeedback.style.display = 'none';
      }, 2000);
    }).catch(err => {
      console.error('Erro ao copiar texto:', err);
    });
  });
}

/* =======================
   Animações com AOS
======================= */
document.addEventListener('DOMContentLoaded', () => {
  AOS.init({
    duration: 1000,  // Duração das animações
    offset: 100      // Distância até iniciar animação
  });
});

/* =======================
   Controle do Menu Mobile (caso necessário)
======================= */
const menuBtn = document.querySelector('#menu-btn');
const menu = document.querySelector('#menu');

if (menuBtn && menu) {
  menuBtn.addEventListener('click', () => {
    menu.classList.toggle('active');
  });
}

/* =======================
   Efeito de Scroll no Logotipo
======================= */
const logo = document.querySelector('.logo');

if (logo) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      logo.style.transform = 'scale(1.1)';
      logo.style.transition = 'transform 0.3s ease';
    } else {
      logo.style.transform = 'scale(1)';
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  // AOS Initialization
  AOS.init({
    once: true,
  });

  // Menu Mobile Toggle
  const menuToggle = document.getElementById("menuToggle");
  const menuMobile = document.getElementById("menuMobile");

  menuToggle.addEventListener("click", () => {
    menuMobile.classList.toggle("open");
  });

  // Botão Voltar ao Topo
  const btnVoltarTopo = document.getElementById("btnVoltarTopo");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 200) {
      btnVoltarTopo.style.display = "block";
    } else {
      btnVoltarTopo.style.display = "none";
    }
  });

  btnVoltarTopo.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});
