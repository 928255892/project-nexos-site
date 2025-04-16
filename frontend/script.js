document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "login.html";
    return;
  }

  const loader = document.getElementById("loader");
  const successMessage = document.getElementById("success-message");
  const listaProjetos = document.getElementById("lista-projetos");
  const dashboard = document.querySelector(".dashboard");

  // Oculta a dashboard inicialmente
  dashboard.style.display = "none";
  loader.style.display = "flex";

  // Buscar dados do usuário autenticado
  fetch("http://localhost:5000/api/user/me", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(res => {
      if (!res.ok) throw new Error("Erro ao buscar dados do usuário");
      return res.json();
    })
    .then(data => {
      // Preenche informações do usuário
      document.getElementById("user-name").textContent = data.name || "Nome não disponível";
      document.getElementById("user-email").textContent = data.email || "Email não disponível";
      document.getElementById("user-avatar").src =
        data.avatar || "https://ui-avatars.com/api/?name=User&background=0072FF&color=fff";

      document.getElementById("project-count").textContent = data.projects?.length || 0;
      document.getElementById("notification-count").textContent = data.notifications?.length || 0;

      // Renderiza lista de projetos
      if (Array.isArray(data.projects)) {
        listaProjetos.innerHTML = "";
        data.projects.forEach(p => {
          const li = document.createElement("li");
          li.innerHTML = `<strong>${p.titulo}</strong><br>${p.descricao || "Sem descrição"}`;
          listaProjetos.appendChild(li);
        });
      }

      // Fade-out do loader e exibição da dashboard
      loader.classList.add("fade-out");
      setTimeout(() => {
        loader.style.display = "none";
        dashboard.style.display = "flex";
      }, 500); // Tempo igual ao transition do CSS
    })
    .catch(err => {
      console.error(err);
      alert("Erro ao carregar dados. Faça login novamente.");
      localStorage.removeItem("token");
      window.location.href = "login.html";
    });

  // Logout
  const logoutBtn = document.getElementById("logout");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("token");
      window.location.href = "login.html";
    });
  }

  // Enviar novo projeto
  const form = document.getElementById("project-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const titulo = document.getElementById("titulo").value.trim();
      const descricao = document.getElementById("descricao").value.trim();

      if (!titulo) {
        alert("Por favor, insira um título.");
        return;
      }

      fetch("http://localhost:5000/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ titulo, descricao })
      })
        .then(res => {
          if (!res.ok) throw new Error("Erro ao salvar projeto");
          return res.json();
        })
        .then(data => {
          // Atualiza contagem de projetos
          const countEl = document.getElementById("project-count");
          countEl.textContent = parseInt(countEl.textContent) + 1;

          // Mostra mensagem de sucesso
          successMessage.style.display = "block";
          setTimeout(() => {
            successMessage.style.display = "none";
          }, 3000);

          // Adiciona o novo projeto na lista
          const li = document.createElement("li");
          li.innerHTML = `<strong>${data.titulo}</strong><br>${data.descricao || "Sem descrição"}`;
          listaProjetos.appendChild(li);

          form.reset();
        })
        .catch(err => {
          console.error(err);
          alert("Erro ao salvar projeto. Tente novamente.");
        });
    });
  }
});
