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
  const loader = document.getElementById("loader");
  const dashboard = document.querySelector(".dashboard");
  const btnVerMais = document.getElementById("btn-ver-mais");
  const btnEditarPerfil = document.getElementById("btn-editar-perfil");
  const modalPerfil = document.getElementById("modal-perfil");
  const formPerfil = document.getElementById("form-perfil");

  // Campos do modal de perfil
  const campoNome = document.getElementById("perfil-nome");
  const campoAvatar = document.getElementById("perfil-avatar");
  const campoSenha = document.getElementById("perfil-senha");
  const avatarPreview = document.getElementById("avatar-preview");

  let todosProjetos = [];
  let pagina = 0;
  const projetosPorPagina = 5;

  loader.style.display = "flex";
  if (dashboard) dashboard.style.display = "none";

  // === BUSCA DE DADOS ===
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

      // Preencher modal de perfil
      campoNome.value = data.nome;
      campoAvatar.value = data.avatar || "";
      avatarPreview.src = data.avatar || "https://via.placeholder.com/80";
    })
    .catch(() => window.location.href = "login.html")
    .finally(() => {
      loader.classList.add("fade-out");
      setTimeout(() => {
        loader.remove();
        dashboard.style.display = "flex";
      }, 800);
    });

  // === RENDERIZAÇÃO DE PROJETOS ===
  function renderizarProjetos(projetos) {
    todosProjetos = projetos.sort((a, b) => new Date(b.dataCriacao) - new Date(a.dataCriacao));
    pagina = 0;
    listaProjetos.innerHTML = "";

    if (!todosProjetos.length) {
      listaProjetos.innerHTML = `<li class="lista-vazia">Você ainda não criou projetos.</li>`;
      btnVerMais.classList.add("hidden");
      return;
    }

    carregarMaisProjetos();
  }

  function carregarMaisProjetos() {
    const inicio = pagina * projetosPorPagina;
    const fim = inicio + projetosPorPagina;
    const projetosParaMostrar = todosProjetos.slice(inicio, fim);

    projetosParaMostrar.forEach(proj => {
      const li = document.createElement("li");

      const ehNovo = (new Date() - new Date(proj.dataCriacao)) < (48 * 60 * 60 * 1000);
      const badgeNovo = ehNovo ? `<span class="badge-novo">Novo</span>` : "";

      const icones = ["file-code", "folder", "rocket", "zap", "layers"];
      const icone = icones[Math.floor(Math.random() * icones.length)];

      li.innerHTML = `
        <i data-lucide="${icone}"></i>
        <strong>${proj.titulo}</strong> ${badgeNovo}
        <button onclick='abrirDetalhes(${JSON.stringify(proj)})'><i data-lucide="eye"></i></button>
        <button onclick='abrirModal(${JSON.stringify(proj)})'><i data-lucide="pencil"></i></button>
        <button onclick='deletarProjeto("${proj._id}")'><i data-lucide="trash-2"></i></button>
      `;
      listaProjetos.appendChild(li);
    });

    pagina++;
    lucide.createIcons();

    if (todosProjetos.length > pagina * projetosPorPagina) {
      btnVerMais.classList.remove("hidden");
    } else {
      btnVerMais.classList.add("hidden");
    }
  }

  btnVerMais.addEventListener("click", () => carregarMaisProjetos());

  // === MODAL: Editar Projeto ===
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
        const index = todosProjetos.findIndex(p => p._id === projetoAtualizado._id);
        if (index !== -1) {
          todosProjetos[index] = projetoAtualizado;
          renderizarProjetos(todosProjetos);
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
        todosProjetos = todosProjetos.filter(p => p._id !== id);
        renderizarProjetos(todosProjetos);
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

  // === MODAL: Editar Perfil ===
  btnEditarPerfil.addEventListener("click", () => {
    modalPerfil.classList.remove("hidden");
  });

  campoAvatar.addEventListener("input", () => {
    avatarPreview.src = campoAvatar.value || "https://via.placeholder.com/80";
  });

  formPerfil.addEventListener("submit", async (e) => {
    e.preventDefault();
    const nome = campoNome.value.trim();
    const avatar = campoAvatar.value.trim();
    const senha = campoSenha.value.trim();

    try {
      const res = await fetch("http://localhost:3000/api/usuario/perfil", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ nome, avatar, senha }),
      });

      if (res.ok) {
        const dadosAtualizados = await res.json();
        nomeUsuario.textContent = dadosAtualizados.nome;
        primeiroNome.textContent = dadosAtualizados.nome.split(" ")[0];
        emailUsuario.textContent = dadosAtualizados.email;
        avatarUsuario.src = dadosAtualizados.avatar || "https://via.placeholder.com/80";
        campoSenha.value = "";
        modalPerfil.classList.add("hidden");
        alert("Perfil atualizado com sucesso!");
      } else {
        alert("Erro ao atualizar perfil.");
      }
    } catch (err) {
      console.error(err);
    }
  });

  document.getElementById("btn-excluir-conta").addEventListener("click", async () => {
    const confirmar = confirm("Tem certeza? Esta ação é permanente e excluirá sua conta.");
    if (!confirmar) return;

    try {
      const res = await fetch("http://localhost:3000/api/usuario/deletar", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        localStorage.removeItem("token");
        alert("Conta excluída com sucesso.");
        window.location.href = "index.html";
      } else {
        alert("Erro ao excluir conta.");
      }
    } catch (err) {
      console.error(err);
    }
  });

  window.fecharModalPerfil = () => {
    modalPerfil.classList.add("hidden");
  };
});
