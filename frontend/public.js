document.addEventListener("DOMContentLoaded", () => {
  // ========== Ícones ==========
  lucide.createIcons();

  // ========== Alternância de Tema ==========
  const toggleBtn = document.getElementById("theme-toggle");
  const body = document.body;
  const iconSol = document.getElementById("icon-sol");
  const iconLua = document.getElementById("icon-lua");
  const indicador = document.querySelector(".toggle-indicador");

  function aplicarTema(tema) {
    body.classList.remove("dark", "light");
    body.classList.add(tema);
    iconLua.classList.toggle("active", tema === "dark");
    iconSol.classList.toggle("active", tema === "light");
    indicador.style.transform = tema === "dark" ? "translateX(0)" : "translateX(32px)";
    localStorage.setItem("tema", tema);
  }

  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      const temaAtual = body.classList.contains("dark") ? "dark" : "light";
      aplicarTema(temaAtual === "dark" ? "light" : "dark");
    });
  }

  const temaSalvo = localStorage.getItem("tema") || "light";
  aplicarTema(temaSalvo);

  // ========== Botão "Voltar ao Topo" ==========
  const topBtn = document.getElementById("top-btn");
  if (topBtn) {
    window.addEventListener("scroll", () => {
      topBtn.style.display = window.scrollY > 300 ? "flex" : "none";
    });
    topBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // ========== Vanta.js ==========
  const vantaContainer = document.getElementById("vanta-bg");
  if (vantaContainer) {
    import('https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.net.min.js').then(module => {
      VANTA.NET({
        el: "#vanta-bg",
        mouseControls: true,
        touchControls: true,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.0,
        scaleMobile: 1.0,
        color: 0x00c6ff,
        backgroundColor: 0x0a1a2f,
        points: 10.0,
        maxDistance: 25.0,
        spacing: 15.0
      });
    });
  }
});
