// Animação Lottie do "N"
document.addEventListener("DOMContentLoaded", function () {
  if (typeof lottie !== 'undefined') {
    lottie.loadAnimation({
      container: document.getElementById('nAnimation'),
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: 'js/nexos-neon-n.json' // Caminho correto para o JSON
    });
  } else {
    console.warn('Lottie não foi carregado.');
  }
});

// Menu mobile
const menuToggle = document.querySelector('#menuToggle');
const navbar = document.querySelector('.navbar');

menuToggle.addEventListener('click', () => {
  navbar.classList.toggle('active');
  if (navbar.classList.contains('active')) {
    navbar.style.height = 'auto';
    navbar.style.backgroundColor = '#0066ff';
  } else {
    navbar.style.height = '0';
    navbar.style.backgroundColor = 'transparent';
  }
});

// Botão voltar ao topo
const btnTopo = document.createElement('button');
btnTopo.id = 'btnTopo';
btnTopo.innerHTML = '&#8679;';
document.body.appendChild(btnTopo);

btnTopo.style.position = 'fixed';
btnTopo.style.bottom = '17px';
btnTopo.style.right = '12px';
btnTopo.style.padding = '10px 14px';
btnTopo.style.fontSize = '13px';
btnTopo.style.borderRadius = '30%';
btnTopo.style.border = 'none';
btnTopo.style.background = '#0066ff';
btnTopo.style.color = '#fff';
btnTopo.style.cursor = 'pointer';
btnTopo.style.display = 'none';
btnTopo.style.zIndex = '999';

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    btnTopo.style.display = 'block';
  } else {
    btnTopo.style.display = 'none';
  }
});

btnTopo.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Inicializar animações AOS
AOS.init({
  duration: 800,
  easing: 'ease-in-out',
  once: true
});
