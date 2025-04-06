document.addEventListener("DOMContentLoaded", function() {
    // Funcionalidade para o menu mobile
    const menuToggle = document.getElementById('menuToggle');
    const navbar = document.querySelector('.navbar');

    // Quando o ícone de menu for clicado, alterna a classe 'active' no navbar
    menuToggle.addEventListener('click', function() {
        navbar.classList.toggle('active');
    });

    // Animações AOS (Animate on Scroll)
    AOS.init({
        duration: 1000,  // Definindo duração das animações
        offset: 200,     // Distância para iniciar a animação
        easing: 'ease-in-out',  // Suavizando as animações
        once: true,      // A animação acontece apenas uma vez durante o scroll
    });

    // Correção para garantir que o menu de navegação tenha uma transição suave de cor ao interagir
    const navbarItems = document.querySelectorAll('.navbar a');
    navbarItems.forEach(item => {
        item.style.transition = "color 0.3s ease";  // Adicionando transições suaves nas cores ao interagir
    });

    // Ajustando para que o estilo do menu não seja alterado
    const header = document.querySelector('header');
    if (header) {
        header.classList.add('loaded');  // Adiciona a classe 'loaded' quando a página carrega, se necessário
    }
});
