// Verifica token e busca dados do usuário
document.addEventListener('DOMContentLoaded', () => {
  const token = localStorage.getItem('token');
  if (!token) {
    window.location.href = '/login.html';
    return;
  }

  fetch('/me', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  .then(res => {
    if (!res.ok) throw new Error('Não autorizado');
    return res.json();
  })
  .then(data => {
    document.getElementById('username').textContent = data.name || 'Usuário';
    document.getElementById('useremail').textContent = data.email || 'Email';
    document.getElementById('avatar').src = data.avatar || 'img/avatar-placeholder.png';
    document.getElementById('projectCount').textContent = data.projects?.length || 0;
    document.getElementById('notifications').textContent = data.notifications?.length || 0;
  })
  .catch(err => {
    console.error(err);
    window.location.href = '/login.html';
  });

  // Logout
  document.getElementById('logout').addEventListener('click', () => {
    localStorage.removeItem('token');
    window.location.href = '/login.html';
  });
});
