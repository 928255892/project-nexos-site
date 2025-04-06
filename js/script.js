document.addEventListener("DOMContentLoaded", function() {
    // Funcionalidade para o menu mobile
    const menuToggle = document.getElementById('menuToggle');
    const navbar = document.querySelector('.navbar');

    // Garantir que o menu apenas altera a visibilidade sem afetar o estilo
    menuToggle.addEventListener('click', function() {
        navbar.classList.toggle('active');
    });

    // Inicializar animações AOS (Animate on Scroll)
    AOS.init({
        duration: 1000,  // Definir duração das animações
        offset: 200,     // Distância para iniciar a animação
        easing: 'ease-in-out',  // Definir suavização das animações
        once: true,      // A animação acontece apenas uma vez durante o scroll
    });

    // Restaurar estilos visuais e garantir que nada foi modificado
    const header = document.querySelector('header');
    const heroImage = document.querySelector('.hero img');

    // Garantir que a imagem hero tenha o tamanho correto e não seja modificada por JavaScript
    if (heroImage) {
        heroImage.style.maxWidth = "100%";  // Ajuste para manter a imagem responsiva
        heroImage.style.height = "auto";    // Garantir que a altura seja proporcional
    }

    // A barra de navegação e seus itens não devem ter suas cores ou fontes alteradas pelo JS
    const navbarItems = document.querySelectorAll('.navbar a');
    navbarItems.forEach(item => {
        item.style.transition = "color 0.3s ease";  // Adiciona transições suaves para os links
    });

    // Remover qualquer alteração de layout que possa ter sido aplicada de forma indesejada
    if (header) {
        header.classList.add('loaded');  // Se necessário, pode restaurar estilos relacionados ao header
    }
});
