// Rolagem suave ao clicar nos links do menu
document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        document.getElementById(targetId).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Botão "Voltar ao Topo"
const btnTopo = document.getElementById("btnTopo");

window.onscroll = function () {
    if (document.documentElement.scrollTop > 300) {
        btnTopo.style.display = "block";
    } else {
        btnTopo.style.display = "none";
    }
};

btnTopo.addEventListener("click", function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// Animação das seções ao aparecer na tela
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("fade-in");
        }
    });
}, {
    threshold: 0.2
});

document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
});

// Mudança de cor no menu ao rolar a página
window.addEventListener("scroll", function () {
    let header = document.querySelector("header");
    if (window.scrollY > 50) {
        header.classList.add("rolagem");
    } else {
        header.classList.remove("rolagem");
    }
});

// Validação do formulário de contato
const contatoForm = document.querySelector("#contato form");
const inputs = contatoForm.querySelectorAll("input, textarea");

contatoForm.addEventListener("submit", function (event) {
    event.preventDefault();
    let formValido = true;

    inputs.forEach(input => {
        if (input.value.trim() === "") {
            input.classList.add("erro");
            input.classList.remove("sucesso");
            formValido = false;
        } else {
            input.classList.add("sucesso");
            input.classList.remove("erro");
        }
    });

    if (formValido) {
        alert("Mensagem enviada com sucesso!");
        contatoForm.reset();
        inputs.forEach(input => input.classList.remove("sucesso"));
    }
});
