// Ativa efeitos AOS
AOS.init({
  duration: 800,
  easing: "ease-in-out",
  once: true,
  mirror: false
});

// Ativa scroll suave ao clicar nos links de âncora
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Alterna visibilidade do menu mobile
function toggleMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  if (menu.style.display === 'flex') {
    menu.style.display = 'none';
  } else {
    menu.style.display = 'flex';
  }
}

// Garante que o menu apareça corretamente ao redimensionar a tela
window.addEventListener('resize', () => {
  const menu = document.getElementById('mobile-menu');
  if (window.innerWidth > 768) {
    menu.style.display = 'flex';
  } else {
    menu.style.display = 'none';
  }
});
