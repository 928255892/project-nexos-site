document.addEventListener("DOMContentLoaded", () => {
  // ========== Ícones ==========
  lucide.createIcons();

  // ========== Tema ==========
  const body = document.body;
  const toggleBtn = document.getElementById("theme-toggle");
  const iconSol = document.getElementById("icon-sol");
  const iconLua = document.getElementById("icon-lua");
  const indicador = document.querySelector(".toggle-indicador");

  function aplicarTema(tema) {
    body.classList.remove("light", "dark");
    body.classList.add(tema);
    iconLua?.classList.toggle("active", tema === "dark");
    iconSol?.classList.toggle("active", tema === "light");
    if (indicador) {
      indicador.style.transform = tema === "dark" ? "translateX(0)" : "translateX(32px)";
    }
    localStorage.setItem("tema", tema);
  }

  // Aplica o tema salvo ou padrão
  const temaSalvo = localStorage.getItem("tema") || "light";
  aplicarTema(temaSalvo);

  // Alternância ao clicar no botão
  toggleBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    const temaAtual = body.classList.contains("dark") ? "dark" : "light";
    aplicarTema(temaAtual === "dark" ? "light" : "dark");
  });

  // ========== Navegação suave ==========
  document.querySelectorAll('nav a[href^="#"]').forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const destino = document.querySelector(link.getAttribute("href"));
      if (destino) {
        destino.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

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
});
