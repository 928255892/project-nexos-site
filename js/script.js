// Função para copiar o texto para a área de transferência
document.querySelectorAll('.btn-copiar').forEach(button => {
  button.addEventListener('click', function() {
    const targetId = this.getAttribute('data-target');
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      const range = document.createRange();
      range.selectNode(targetElement);
      window.getSelection().removeAllRanges();
      window.getSelection().addRange(range);

      try {
        document.execCommand('copy');
        alert('Código copiado com sucesso!');
      } catch (err) {
        alert('Falha ao copiar!');
      }

      window.getSelection().removeAllRanges();
    }
  });
});

// Botão voltar ao topo
const btnTopo = document.createElement('button');
btnTopo.id = 'btnTopo';
btnTopo.innerHTML = '&#8679;';
document.body.appendChild(btnTopo);

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

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    btnTopo.style.display = 'block';
  } else {
    btnTopo.style.display = 'none';
  }
});

btnTopo.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Inicializar animações AOS
AOS.init({
  duration: 800,
  easing: 'ease-in-out',
});
// Botão "Copiar"
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
