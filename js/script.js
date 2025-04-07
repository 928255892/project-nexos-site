// Função para gerenciar animações e interações
document.addEventListener('DOMContentLoaded', function() {

    // Exemplo de animação para os elementos que aparecem no scroll
    const elements = document.querySelectorAll('.card, .diferencial-item, .missao, .visao, .valores');
    
    window.addEventListener('scroll', function() {
        elements.forEach(function(el) {
            if (isElementInViewport(el)) {
                el.classList.add('visible');
            }
        });
    });

    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (rect.top >= 0 && rect.bottom <= window.innerHeight);
    }
});
