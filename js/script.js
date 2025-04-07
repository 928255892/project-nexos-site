document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.getElementById("menuToggle");
  const mobileMenu = document.getElementById("mobileMenu");

  menuToggle.addEventListener("click", function () {
    mobileMenu.style.display = mobileMenu.style.display === "flex" ? "none" : "flex";
  });

  document.querySelectorAll('#mobileMenu a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.style.display = "none";
    });
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
