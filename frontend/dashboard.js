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

  loader.style.display = "flex";
  if (dashboard) dashboard.style.display = "none";

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
      loader.classList.add("fade-out");
      setTimeout(() => {
        loader.remove();
        dashboard.style.display = "flex";
      }, 800);
    });

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
        <button onclick='abrirDetalhes(${JSON.stringify(proj)})'><i data-lucide="eye"></i></button>
        <button onclick='abrirModal(${JSON.stringify(proj)})'><i data-lucide="pencil"></i></button>
        <button onclick='deletarProjeto("${proj._id}")'><i data-lucide="trash-2"></i></button>
      `;
      listaProjetos.appendChild(li);
    });
    lucide.createIcons();
  }

  document.getElementById("form-edicao").addEventListener("submit", async (e) => {
    e.preventDefault();
    const id = document.getElementById("edit-id").value;
    const titulo = document.getElementById("edit-titulo").value.trim();
    const descricao = document.getElementById("edit-descricao").value;

    if (!titulo) return alert("Título é obrigatório");

    try {
      const res = await fetch(`http://localhost:3000/api/projetos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ titulo, descricao }),
      });

      if (res.ok) {
        fecharModal();
        const projetoAtualizado = await res.json();
        const index = [...listaProjetos.children].findIndex(li =>
          li.innerText.includes(projetoAtualizado.titulo)
        );
        if (index >= 0) {
          renderizarProjetos([...document.querySelectorAll("#lista-projetos li")].map(li => ({
            titulo: li.querySelector("strong").textContent,
            _id: li.dataset.id,
          })));
        } else {
          location.reload();
        }
      } else {
        alert("Erro ao atualizar projeto");
      }
    } catch (err) {
      console.error(err);
    }
  });

  window.abrirModal = (proj) => {
    document.getElementById("edit-id").value = proj._id;
    document.getElementById("edit-titulo").value = proj.titulo;
    document.getElementById("edit-descricao").value = proj.descricao || "";
    document.getElementById("modal-edicao").classList.remove("hidden");
  };

  window.fecharModal = () => {
    document.getElementById("modal-edicao").classList.add("hidden");
  };

  window.abrirDetalhes = (proj) => {
    document.getElementById("detalhe-titulo").textContent = proj.titulo;
    document.getElementById("detalhe-descricao").textContent = proj.descricao || "Sem descrição.";
    document.getElementById("detalhe-data").textContent = new Date(proj.dataCriacao).toLocaleString();
    document.getElementById("modal-detalhes").classList.remove("hidden");
  };

  window.fecharModalDetalhes = () => {
    document.getElementById("modal-detalhes").classList.add("hidden");
  };

  window.deletarProjeto = async (id) => {
    if (!confirm("Tem certeza que deseja excluir este projeto?")) return;

    try {
      const res = await fetch(`http://localhost:3000/api/projetos/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        document.querySelector(`#lista-projetos button[onclick*="${id}"]`).parentElement.remove();
      } else {
        alert("Erro ao deletar projeto.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  document.getElementById("logout-btn").addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.href = "login.html";
  });
});
