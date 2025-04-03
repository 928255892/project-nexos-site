document.addEventListener("DOMContentLoaded", function () {
    console.log("Bem-vindo ao Project Nexos!");

    const btnLogin = document.getElementById("btnLogin");
    const modalLogin = document.getElementById("modalLogin");
    const closeModal = document.querySelector(".close");
    const loginContainer = document.getElementById("loginContainer");
    const registerContainer = document.getElementById("registerContainer");
    const showRegister = document.getElementById("showRegister");
    const showLogin = document.getElementById("showLogin");

    // Abrir modal ao clicar em "Login"
    btnLogin.addEventListener("click", function () {
        modalLogin.style.display = "block";
        loginContainer.style.display = "block";
        registerContainer.style.display = "none";
    });

    // Fechar modal ao clicar no "X"
    closeModal.addEventListener("click", function () {
        modalLogin.style.display = "none";
    });

    // Fechar modal ao clicar fora dele
    window.addEventListener("click", function (event) {
        if (event.target === modalLogin) {
            modalLogin.style.display = "none";
        }
    });

    // Alternar para cadastro
    showRegister.addEventListener("click", function (event) {
        event.preventDefault();
        loginContainer.style.display = "none";
        registerContainer.style.display = "block";
    });

    // Alternar para login
    showLogin.addEventListener("click", function (event) {
        event.preventDefault();
        registerContainer.style.display = "none";
        loginContainer.style.display = "block";
    });
});
