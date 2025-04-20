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
  const btnVerMais = document.getElementById("btn-ver-mais");

  const btnPerfil = document.getElementById("btn-perfil");
  const modalPerfil = document.getElementById("modal-perfil");
  const formPerfil = document.getElementById("form-perfil");
  const inputNome = document.getElementById("perfil-nome");
  const inputAvatar = document.getElementById("perfil-avatar");
  const previewAvatar = document.getElementById("preview-avatar");
  const inputSenha = document.getElementById("perfil-senha");
  const inputConfirmar = document.getElementById("perfil-confirmar");
  const btnExcluirConta = document.getElementById("btn-excluir-conta");
  const btnResetarPerfil = document.getElementById("btn-resetar-perfil");

  let todosProjetos = [];
  let pagina = 0;
  const projetosPorPagina = 5;

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

      // Preencher modal de perfil
      inputNome.value = data.nome;
      inputAvatar.value = data.avatar || "";
      previewAvatar.src = data.avatar || "https://via.placeholder.com/80";

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

  // Modal de perfil
  btnPerfil?.addEventListener("click", () => {
    modalPerfil.classList.remove("hidden");
  });

  document.getElementById("btn-cancelar-perfil").addEventListener("click", () => {
    modalPerfil.classList.add("hidden");
  });

  inputAvatar.addEventListener("input", () => {
    previewAvatar.src = inputAvatar.value.trim() || "https://via.placeholder.com/80";
  });

  btnResetarPerfil.addEventListener("click", () => {
    fetch("http://localhost:3000/api/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => {
        inputNome.value = data.nome;
        inputAvatar.value = data.avatar || "";
        previewAvatar.src = data.avatar || "https://via.placeholder.com/80";
        inputSenha.value = "";
        inputConfirmar.value = "";
      });
  });

  formPerfil.addEventListener("submit", async (e) => {
    e.preventDefault();
    const nome = inputNome.value.trim();
    const avatar = inputAvatar.value.trim();
    const senha = inputSenha.value.trim();
    const confirmar = inputConfirmar.value.trim();

    if (!nome) return alert("Nome é obrigatório");
    if (senha && senha !== confirmar) return alert("As senhas não coincidem");

    try {
      const res = await fetch("http://localhost:3000/api/usuario/perfil", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ nome, avatar, senha })
      });

      if (res.ok) {
        const usuarioAtualizado = await res.json();
        nomeUsuario.textContent = usuarioAtualizado.nome;
        primeiroNome.textContent = usuarioAtualizado.nome.split(" ")[0];
        avatarUsuario.src = usuarioAtualizado.avatar || "https://via.placeholder.com/80";
        modalPerfil.classList.add("hidden");
        alert("Perfil atualizado com sucesso.");
      } else {
        alert("Erro ao atualizar perfil.");
      }
    } catch (err) {
      console.error(err);
    }
  });

  btnExcluirConta.addEventListener("click", async () => {
    if (!confirm("Tem certeza que deseja excluir sua conta? Esta ação é irreversível.")) return;

    try {
      const res = await fetch("http://localhost:3000/api/usuario/deletar", {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.ok) {
        localStorage.removeItem("token");
        alert("Conta excluída com sucesso.");
        console.log("[LOG] Conta do usuário excluída com sucesso.");
        window.location.href = "index.html";
      } else {
        alert("Erro ao excluir conta.");
      }
    } catch (err) {
      console.error(err);
    }
  });
});
