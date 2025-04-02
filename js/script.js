// Mensagem de boas-vindas ao carregar a página
document.addEventListener("DOMContentLoaded", function () {
    console.log("Bem-vindo ao Project Nexos!");
});

// Abrir e fechar modal de login
const btnLogin = document.getElementById("btnLogin");
const modalLogin = document.getElementById("modalLogin");
const closeModal = document.querySelector(".close");

btnLogin.addEventListener("click", function () {
    modalLogin.style.display = "block";
});

closeModal.addEventListener("click", function () {
    modalLogin.style.display = "none";
});

window.addEventListener("click", function (event) {
    if (event.target === modalLogin) {
        modalLogin.style.display = "none";
    }
});

// Simulação de login
document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault();
    alert("Login bem-sucedido! (Simulação)");
    modalLogin.style.display = "none";
});

// Exibir botão "Voltar ao Topo"
const btnTopo = document.getElementById("btnTopo");

window.addEventListener("scroll", function () {
    if (window.scrollY > 300) {
        btnTopo.style.display = "block";
    } else {
        btnTopo.style.display = "none";
    }
});

// Voltar ao topo ao clicar no botão
btnTopo.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
});
