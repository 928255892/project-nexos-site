// script.js — funcionalidades básicas para interação
document.addEventListener('DOMContentLoaded', () => {
  // Scroll suave ao clicar nos links de navegação com hash #
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const destino = document.querySelector(this.getAttribute('href'));
      if (destino) {
        destino.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});
