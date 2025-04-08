// Botão de copiar código
document.querySelectorAll('.btn-copiar').forEach(button => {
  button.addEventListener('click', () => {
    const targetId = button.getAttribute('data-target');
    const texto = document.getElementById(targetId).innerText;

    navigator.clipboard.writeText(texto)
      .then(() => {
        button.textContent = 'Copiado!';
        setTimeout(() => button.textContent = 'Copiar', 2000);
      })
      .catch(() => {
        button.textContent = 'Erro';
        setTimeout(() => button.textContent = 'Copiar', 2000);
      });
  });
});

// Botão "Voltar ao Topo"
const btnTopo = document.createElement('button');
btnTopo.id = 'btnTopo';
btnTopo.innerHTML = '&#8679;';
document.body.appendChild(btnTopo);

// Estilo do botão de voltar ao topo
btnTopo.style.position = 'fixed';
btnTopo.style.bottom = '17px';
btnTopo.style.right = '12px';
btnTopo.style.padding = '10px 14px';
btnTopo.style.fontSize = '13px';
btnTopo.style.borderRadius = '30%';
btnTopo.style.border = 'none';
btnTopo.style.background = '#0066ff';
btnTopo.style.color = '#fff';
btnTopo.style.cursor = 'pointer';
btnTopo.style.display = 'none';
btnTopo.style.zIndex = '999';

// Exibir o botão "Voltar ao Topo" após rolar 300px
window.addEventListener('scroll', () => {
  btnTopo.style.display = window.scrollY > 300 ? 'block' : 'none';
});

// Função de rolar para o topo suavemente
btnTopo.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Inicializando AOS com maior velocidade de animação
AOS.init({
  duration: 500, // Duração de 500ms para uma animação mais rápida
  easing: 'ease-in-out',
});

