document.addEventListener("DOMContentLoaded", function () {
  // AOS Initialization
  AOS.init({
    once: true,
  });

  // Menu Mobile Toggle
  const menuToggle = document.getElementById("menuToggle");
  const menuMobile = document.getElementById("menuMobile");

  menuToggle.addEventListener("click", () => {
    menuMobile.classList.toggle("open");
  });

  // Botão Voltar ao Topo
  const btnVoltarTopo = document.getElementById("btnVoltarTopo");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 200) {
      btnVoltarTopo.style.display = "block";
    } else {
      btnVoltarTopo.style.display = "none";
    }
  });

  btnVoltarTopo.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});
