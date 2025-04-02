// Mensagem de boas-vindas ao carregar a página
document.addEventListener("DOMContentLoaded", function () {
    console.log("Bem-vindo ao Project Nexos!");

    // Elementos do modal de login/cadastro
    const btnLogin = document.getElementById("btnLogin");
    const modalLogin = document.getElementById("modalLogin");
    const closeModal = document.querySelector(".close");
    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");
    const showRegister = document.getElementById("showRegister");
    const showLogin = document.getElementById("showLogin");

    // Garante que apenas o formulário de login apareça inicialmente
    registerForm.style.display = "none";

    // Mostrar modal ao clicar no botão de login
    if (btnLogin) {
        btnLogin.addEventListener("click", function () {
            modalLogin.style.display = "block";
            loginForm.style.display = "block";
            registerForm.style.display = "none";
        });
    }

    // Fechar modal ao clicar no "x"
    if (closeModal) {
        closeModal.addEventListener("click", function () {
            modalLogin.style.display = "none";
        });
    }

    // Fechar modal se clicar fora dele
    window.addEventListener("click", function (event) {
        if (event.target === modalLogin) {
            modalLogin.style.display = "none";
        }
    });

    // Alternar para o formulário de cadastro
    if (showRegister) {
        showRegister.addEventListener("click", function (event) {
            event.preventDefault();
            loginForm.style.display = "none";
            registerForm.style.display = "block";
        });
    }

    // Alternar para o formulário de login
    if (showLogin) {
        showLogin.addEventListener("click", function (event) {
            event.preventDefault();
            registerForm.style.display = "none";
            loginForm.style.display = "block";
        });
    }
});
