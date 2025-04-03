// Rolagem suave ao clicar nos links do menu
document.querySelectorAll('nav ul li a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    document.getElementById(targetId).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Botão "Voltar ao Topo"
const btnTopo = document.getElementById("btnTopo");

window.onscroll = function () {
  if (document.documentElement.scrollTop > 300) {
    btnTopo.style.display = "block";
  } else {
    btnTopo.style.display = "none";
  }
};

btnTopo.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

// Animação das seções ao aparecer na tela
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, {
  threshold: 0.2
});

document.querySelectorAll('.section').forEach(section => {
  observer.observe(section);
});
