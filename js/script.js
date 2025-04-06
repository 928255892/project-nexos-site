// Script para ativar/desativar o menu mobile
document.getElementById('menuToggle').addEventListener('click', function() {
    // Altera a classe active na header para abrir/fechar o menu
    document.querySelector('header').classList.toggle('active');
    document.querySelector('.navbar').classList.toggle('active');  // Adicionando a classe 'active' ao menu de navegação
});

// Animações AOS (Animate on Scroll)
AOS.init({
    duration: 1000,  // Duração da animação
    offset: 200,     // Distância para disparar a animação
    easing: 'ease-in-out',  // Suaviza as animações
    once: true,      // As animações ocorrem uma única vez durante o scroll
});

// Função para correção do menu mobile
const menuToggle = document.getElementById('menuToggle');
const navbar = document.querySelector('.navbar');

// Adicionando e removendo a classe 'active' ao clicar no menu mobile
menuToggle.addEventListener('click', () => {
    navbar.classList.toggle('active');
});

// A função abaixo garante que o layout do menu seja responsivo e o estilo não seja alterado
// O código do menu mobile apenas altera a visibilidade do menu e não deve afetar o design.

document.addEventListener("DOMContentLoaded", function() {
    // Esse trecho certifica-se de que o menu e a barra de navegação sejam inicialmente carregados corretamente
    const navbarItems = document.querySelectorAll('.navbar a');
    navbarItems.forEach(item => {
        item.style.transition = "color 0.3s ease";  // Garantindo transições suaves nas interações com o menu
    });
});
