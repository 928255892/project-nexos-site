document.addEventListener("DOMContentLoaded", function () {
    console.log("Bem-vindo ao Project Nexos!");

    const btnLogin = document.getElementById("btnLogin");
    const btnLogout = document.getElementById("btnLogout");
    const modalLogin = document.getElementById("modalLogin");
    const closeModal = document.querySelector(".close");

    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");

    // Verifica se o usuário já está logado
    function checkLoginStatus() {
        const user = localStorage.getItem("loggedUser");
        if (user) {
            btnLogin.style.display = "none";
            btnLogout.style.display = "block";
        } else {
            btnLogin.style.display = "block";
            btnLogout.style.display = "none";
        }
    }

    checkLoginStatus();

    // Abre o modal de login/cadastro
    btnLogin.addEventListener("click", function () {
        modalLogin.style.display = "block";
    });

    // Fecha o modal ao clicar no "X"
    closeModal.addEventListener("click", function () {
        modalLogin.style.display = "none";
    });

    // Fecha o modal se clicar fora dele
    window.addEventListener("click", function (event) {
        if (event.target === modalLogin) {
            modalLogin.style.display = "none";
        }
    });

    // Cadastro de usuários
    registerForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const user = document.getElementById("registerUser").value;
        const pass = document.getElementById("registerPass").value;

        if (localStorage.getItem(user)) {
            alert("Usuário já existe!");
        } else {
            localStorage.setItem(user, pass);
            alert("Cadastro realizado com sucesso!");
        }
        registerForm.reset();
    });

    // Login de usuários
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const user = document.getElementById("loginUser").value;
        const pass = document.getElementById("loginPass").value;

        if (localStorage.getItem(user) === pass) {
            alert("Login bem-sucedido!");
            localStorage.setItem("loggedUser", user);
            modalLogin.style.display = "none";
            checkLoginStatus();
        } else {
            alert("Usuário ou senha incorretos!");
        }
        loginForm.reset();
    });

    // Logout
    btnLogout.addEventListener("click", function () {
        localStorage.removeItem("loggedUser");
        checkLoginStatus();
        alert("Logout realizado com sucesso!");
    });
});
