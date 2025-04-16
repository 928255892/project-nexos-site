// frontend/public.js

document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const btnEntrar = document.getElementById('btnEntrar');
  const toggleTema = document.getElementById('toggleTema');
  const iconSol = document.getElementById('iconSol');
  const iconLua = document.getElementById('iconLua');
  const btnVoltarTopo = document.getElementById('btnVoltarTopo');

  // ===== Aplicar preferência de tema salva =====
  const temaSalvo = localStorage.getItem('tema');
  if (temaSalvo === 'dark') {
    body.classList.replace('light', 'dark');
    iconSol.classList.add('hidden');
    iconLua.classList.remove('hidden');
  }

  // ===== Alternar tema (claro/escuro) =====
  toggleTema.addEventListener('click', () => {
    body.classList.toggle('dark');
    body.classList.toggle('light');
    const temaAtual = body.classList.contains('dark') ? 'dark' : 'light';
    localStorage.setItem('tema', temaAtual);
    iconSol.classList.toggle('hidden');
    iconLua.classList.toggle('hidden');
  });

  // ===== Redirecionar automaticamente se logado =====
  btnEntrar.addEventListener('click', () => {
    const token = localStorage.getItem('token');
    if (token) {
      window.location.href = 'dashboard.html';
    } else {
      window.location.href = 'login.html';
    }
  });

  // ===== Mostrar botão "Voltar ao Topo" ao rolar =====
  window.addEventListener('scroll', () => {
    btnVoltarTopo.style.display = window.scrollY > 300 ? 'block' : 'none';
  });

  btnVoltarTopo.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});
