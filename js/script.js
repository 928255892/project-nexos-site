// Abrir e fechar modal de login com animação
const btnLogin = document.getElementById("btnLogin");
const modalLogin = document.getElementById("modalLogin");
const closeModal = document.querySelector(".close");

btnLogin.addEventListener("click", function () {
    modalLogin.classList.add("show");
});

closeModal.addEventListener("click", function () {
    modalLogin.classList.remove("show");
    setTimeout(() => modalLogin.style.display = "none", 300); // Remove da tela após animação
});

window.addEventListener("click", function (event) {
    if (event.target === modalLogin) {
        modalLogin.classList.remove("show");
        setTimeout(() => modalLogin.style.display = "none", 300);
    }
});
