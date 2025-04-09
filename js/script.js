// Função para copiar o conteúdo do código para a área de transferência
const copiarBtn = document.querySelector('.btn-copiar');
const copiarBloco = document.querySelector('.copiar-bloco pre');
const copiadoFeedback = document.querySelector('#copiadoFeedback');

if (copiarBtn && copiarBloco) {
  copiarBtn.addEventListener('click', () => {
    const texto = copiarBloco.textContent;
    navigator.clipboard.writeText(texto).then(() => {
      copiadoFeedback.style.display = 'inline'; // Exibe o feedback
      setTimeout(() => {
        copiadoFeedback.style.display = 'none'; // Esconde após 2 segundos
      }, 2000);
    }).catch(err => {
      console.error('Erro ao copiar texto: ', err);
    });
  });
}

// Função para carregar animações AOS
AOS.init({
  duration: 1000,  // Tempo da animação
  offset: 100,    // Distância até começar a animação
});

// Exemplo de ação para esconder menu no mobile, se necessário (caso tenha necessidade de algum script para o mobile)
const menuBtn = document.querySelector('#menu-btn');
const menu = document.querySelector('#menu');

if (menuBtn && menu) {
  menuBtn.addEventListener('click', () => {
    menu.classList.toggle('active'); // Alterna visibilidade do menu
  });
}

// Função para controle de animação de mudança no logotipo (se necessário)
const logo = document.querySelector('.logo');

if (logo) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      logo.style.transform = 'scale(1.1)';
      logo.style.transition = 'transform 0.3s ease';
    } else {
      logo.style.transform = 'scale(1)';
    }
  });
}
