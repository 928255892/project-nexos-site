// Script de funcionalidade para o menu mobile
document.getElementById('menuToggle').addEventListener('click', function() {
  document.querySelector('header').classList.toggle('active');
});

// Funcionalidade para os efeitos de rolagem e animações da biblioteca AOS
AOS.init({
  duration: 1000, // Definindo duração para as animações
  offset: 200, // Definindo o deslocamento das animações
  easing: 'ease-in-out', // Efeito de transição suave
  once: true // As animações ocorrem uma única vez
});

// Menu mobile: tornar visível ao clicar
const menuToggle = document.getElementById('menuToggle');
const navbar = document.querySelector('.navbar');
menuToggle.addEventListener('click', () => {
  navbar.classList.toggle('active');
});
