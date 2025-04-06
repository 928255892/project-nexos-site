// script.js

// Este script é reservado para funcionalidades futuras
// Exemplo: Scroll suave, abertura de menus, integração com backend etc.

document.addEventListener('DOMContentLoaded', () => {
  // Scroll suave para âncoras
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
