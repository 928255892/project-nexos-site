// ========== Alternância de Tema ==========
const toggleBtn = document.getElementById("theme-toggle");
const body = document.body;
const iconSol = document.getElementById("icon-sol");
const iconLua = document.getElementById("icon-lua");
const indicador = document.querySelector(".toggle-indicador");

function aplicarTema(tema) {
  if (tema === "dark") {
    body.classList.add("dark");
    iconLua.classList.add("active");
    iconSol.classList.remove("active");
    indicador.style.transform = "translateX(0)";
  } else {
    body.classList.remove("dark");
    iconSol.classList.add("active");
    iconLua.classList.remove("active");
    indicador.style.transform = "translateX(32px)";
  }
  localStorage.setItem("tema", tema);
}

toggleBtn.addEventListener("click", () => {
  const temaAtual = body.classList.contains("dark") ? "dark" : "light";
  aplicarTema(temaAtual === "dark" ? "light" : "dark");
});

document.addEventListener("DOMContentLoaded", () => {
  lucide.createIcons();
  const temaSalvo = localStorage.getItem("tema") || "light";
  aplicarTema(temaSalvo);
});

// ========== Botão "Voltar ao Topo" ==========
const topBtn = document.getElementById("top-btn");
window.addEventListener("scroll", () => {
  topBtn.style.display = window.scrollY > 300 ? "flex" : "none";
});
topBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ========== Vanta.js ==========
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
