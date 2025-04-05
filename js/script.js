// Menu mobile
const menuToggle = document.querySelector('#menuToggle');
const navbar = document.querySelector('.navbar');

menuToggle.addEventListener('click', () => {
  navbar.classList.toggle('active');
});

// Botão voltar ao topo
const btnTopo = document.createElement('button');
btnTopo.id = 'btnTopo';
btnTopo.innerHTML = '&#8679;';
document.body.appendChild(btnTopo);

btnTopo.style.position = 'fixed';
btnTopo.style.bottom = '30px';
btnTopo.style.right = '30px';
btnTopo.style.padding = '10px 14px';
btnTopo.style.fontSize = '20px';
btnTopo.style.borderRadius = '50%';
btnTopo.style.border = 'none';
btnTopo.style.background = '#0066ff';
btnTopo.style.color = '#fff';
btnTopo.style.cursor = 'pointer';
btnTopo.style.display = 'none';
btnTopo.style.zIndex = '999';

// Mostrar botão ao rolar a página
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    btnTopo.style.display = 'block';
  } else {
    btnTopo.style.display = 'none';
  }
});

// Ação do botão voltar ao topo
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

// (Opcional) Scroll suave para âncoras
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const section = document.querySelector(this.getAttribute('href'));
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
