document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "login.html";
    return;
  }

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
      document.getElementById("user-name").textContent = data.name;
      document.getElementById("user-email").textContent = data.email;
      document.getElementById("user-avatar").src = data.avatar || "https://ui-avatars.com/api/?name=User&background=0072FF&color=fff";
      document.getElementById("project-count").textContent = data.projects?.length || 0;
      document.getElementById("notification-count").textContent = data.notifications?.length || 0;
    })
    .catch(err => {
      console.error(err);
      alert("Erro ao carregar dados. Faça login novamente.");
      localStorage.removeItem("token");
      window.location.href = "login.html";
    });

  document.getElementById("logout").addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.href = "login.html";
  });
});
