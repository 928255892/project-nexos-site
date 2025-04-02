// Mensagem de boas-vindas ao carregar a página
document.addEventListener("DOMContentLoaded", function () {
    console.log("Bem-vindo ao Project Nexos!");
});

// Elementos do modal de login/cadastro
const btnLogin = document.getElementById("btnLogin");
const modalLogin = document.getElementById("modalLogin");
const closeModal = document.querySelector(".close");
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

// Botão para alternar entre login e cadastro
const toggleToRegister = document.createElement("p");
toggleToRegister.innerHTML = "Não tem uma conta? <a href='#' id='showRegister'>Cadastre-se</a>";
toggleToRegister.style.textAlign = "center";

const toggleToLogin = document.createElement("p");
toggleToLogin.innerHTML = "Já tem uma conta? <a href='#' id='showLogin'>Faça login</a>";
toggleToLogin.style.textAlign = "center";

// Adiciona a troca de formulários
loginForm.appendChild(toggleToRegister);
registerForm.appendChild(toggleToLogin);

// Esconder o formulário de cadastro inicialmente
registerForm.style.display = "none";

// Mostrar modal ao clicar no botão de login
btnLogin.addEventListener("click", function () {
    modalLogin.style.display = "block";
    loginForm.style.display = "block";
    registerForm.style.display = "none";
});

// Fechar modal ao clicar no "x"
closeModal.addEventListener("click", function () {
    modalLogin.style.display = "none";
});

// Fechar modal se clicar fora dele
window.addEventListener("click", function (event) {
    if (event.target === modalLogin) {
        modalLogin.style.display = "none";
    }
});

// Alternar para cadastro
document.getElementById("showRegister").addEventListener("click", function (event) {
    event.preventDefault();
    loginForm.style.display = "none";
    registerForm.style.display = "block";
});

// Alternar para login
document.getElementById("showLogin").addEventListener("click", function (event) {
    event.preventDefault();
    registerForm.style.display = "none";
    loginForm.style.display = "block";
});
