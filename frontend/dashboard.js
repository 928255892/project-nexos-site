document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");
  if (!token) return window.location.href = "login.html";

  const nomeUsuario = document.getElementById("user-name");
  const primeiroNome = document.getElementById("user-firstname");
  const emailUsuario = document.getElementById("user-email");
  const avatarUsuario = document.getElementById("user-avatar");
  const qtdProjetos = document.getElementById("total-projetos");
  const qtdNotificacoes = document.getElementById("total-notificacoes");
  const listaProjetos = document.getElementById("lista-projetos");
  const successMessage = document.querySelector(".success-message");
  const loader = document.getElementById("loader");
  const dashboard = document.querySelector(".dashboard");

  // Inicialmente oculta a dashboard
  if (dashboard) dashboard.style.display = "none";

  // Busca os dados do usuário e projetos
  fetch("http://localhost:3000/api/me", {
    headers: { Authorization: `Bearer ${token}` },
  })
    .then(res => res.json())
    .then(data => {
      nomeUsuario.textContent = data.nome;
      primeiroNome.textContent = data.nome.split(" ")[0];
      emailUsuario.textContent = data.email;
      avatarUsuario.src = data.avatar || "https://via.placeholder.com/80";
      qtdProjetos.textContent = data.projetos.length || 0;
      qtdNotificacoes.textContent = data.notificacoes?.length || 0;

      renderizarProjetos(data.projetos);
    })
    .catch(() => window.location.href = "login.html")
    .finally(() => {
      // Animação de saída do loader
      if (loader) {
        loader.classList.add("fade-out");
        setTimeout(() => {
          loader.remove();
          if (dashboard) dashboard.style.display = "flex";
        }, 800); // mesmo tempo da transição CSS
      }
    });

  // Renderizar projetos com botão de edição
  function renderizarProjetos(projetos) {
    listaProjetos.innerHTML = "";

    if (!projetos.length) {
      listaProjetos.innerHTML = "<li>Nenhum projeto encontrado.</li>";
      return;
    }

    projetos.forEach(proj => {
      const li = document.createElement("li");
      li.innerHTML = `
        <strong>${proj.titulo}</strong>
        <button class="btn-editar" onclick='abrirModal(${JSON.stringify(proj)})'>✏️</button>
      `;
      listaProjetos.appendChild(li);
    });
  }

  // Exibir mensagem de sucesso
  function exibirMensagemSucesso(texto = "Projeto salvo com sucesso!") {
    successMessage.textContent = texto;
    successMessage.style.display = "block";
    setTimeout(() => {
      successMessage.style.display = "none";
    }, 3000);
  }

  // Abrir e fechar modal de edição
  window.abrirModal = function (projeto) {
    document.getElementById("edit-id").value = projeto._id;
    document.getElementById("edit-titulo").value = projeto.titulo;
    document.getElementById("edit-descricao").value = projeto.descricao || '';
    document.getElementById("modal-edicao").classList.remove("hidden");
  };

  window.fecharModal = function () {
    document.getElementById("modal-edicao").classList.add("hidden");
  };

  // Enviar edição
  document.getElementById("form-edicao").addEventListener("submit", async function (e) {
    e.preventDefault();

    const id = document.getElementById("edit-id").value;
    const titulo = document.getElementById("edit-titulo").value;
    const descricao = document.getElementById("edit-descricao").value;

    try {
      const response = await fetch(`http://localhost:3000/api/projetos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ titulo, descricao }),
      });

      if (response.ok) {
        fecharModal();
        exibirMensagemSucesso("Projeto atualizado com sucesso!");
        setTimeout(() => location.reload(), 800);
      } else {
        alert("Erro ao atualizar projeto.");
      }
    } catch (err) {
      console.error("Erro ao enviar edição:", err);
    }
  });
});
