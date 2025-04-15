// Função para verificar o token no localStorage
function checkToken() {
    const token = localStorage.getItem('token');

    if (!token) {
        console.warn('Token ausente. Redirecionamento desativado para testes.');
        // window.location.href = 'login.html';  // Redireciona para login se não houver token
    }

    return token;
}

// Função para carregar informações do usuário
async function loadUserInfo() {
    const token = checkToken();

    if (!token) return;

    try {
        const response = await fetch('http://localhost:5000/api/auth/protegida', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            const data = await response.json();
            document.getElementById('username').textContent = data.mensagem.split(' ')[1]; // Nome
            document.getElementById('useremail').textContent = data.mensagem.split(' ')[5]; // Email
        } else {
            console.warn('Token inválido ou acesso negado. Redirecionamento desativado para testes.');
            // window.location.href = 'login.html';
        }
    } catch (error) {
        console.error('Erro ao carregar informações do usuário:', error);
    }
}

// Função de logout (somente se existir o botão na página)
const logoutBtn = document.getElementById('logout');
if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('token');
        console.log('Logout efetuado. Redirecionamento desativado para testes.');
        // window.location.href = 'login.html';
    });
}

// Executa apenas se estiver no dashboard
if (document.getElementById('username') && document.getElementById('useremail')) {
    loadUserInfo();
}
