// Mensagem de boas-vindas ao carregar a página
document.addEventListener("DOMContentLoaded", function () {
    console.log("Bem-vindo ao Project Nexos!");
});

// Abrir e fechar modal de login
const btnLogin = document.getElementById("btnLogin");
const modalLogin = document.getElementById("modalLogin");
const closeModal = document.querySelector(".close");

btnLogin.addEventListener("click", function () {
    modalLogin.style.display = "flex";
});

closeModal.addEventListener("click", function () {
    modalLogin.style.display = "none";
});

window.addEventListener("click", function (event) {
    if (event.target === modalLogin) {
        modalLogin.style.display = "none";
    }
});

// Alternar entre login e cadastro
const loginForm = document.getElementById("loginForm");
const cadastroForm = document.getElementById("cadastroForm");
const linkCadastro = document.getElementById("linkCadastro");
const linkVoltarLogin = document.getElementById("linkVoltarLogin");

linkCadastro.addEventListener("click", function () {
    loginForm.style.display = "none";
    cadastroForm.style.display = "block";
});

linkVoltarLogin.addEventListener("click", function () {
    cadastroForm.style.display = "none";
    loginForm.style.display = "block";
});

// Simulação de login e cadastro
loginForm.addEventListener("submit", function (event) {
    event.preventDefault();
    alert("Login bem-sucedido! (Simulação)");
    modalLogin.style.display = "none";
});

cadastroForm.addEventListener("submit", function (event) {
    event.preventDefault();
    alert("Cadastro realizado com sucesso! (Simulação)");
    modalLogin.style.display = "none";
});
