// Função para verificar o token no localStorage
function checkToken() {
    const token = localStorage.getItem('token');

    // Verificação desativada temporariamente para não redirecionar
    if (!token) {
        console.warn('Token ausente. Redirecionamento desativado para testes.');
        // window.location.href = 'login.html';  // Redireciona para login se não houver token
    }

    return token;
}

// Função para carregar informações do usuário
async function loadUserInfo() {
    const token = checkToken();

    try {
        const response = await fetch('http://localhost:5000/api/auth/protegida', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            const data = await response.json();
            document.getElementById('username').textContent = data.mensagem.split(' ')[1]; // Exibe o nome
            document.getElementById('useremail').textContent = data.mensagem.split(' ')[5]; // Exibe o email
        } else {
            console.warn('Token inválido ou acesso negado. Redirecionamento desativado para testes.');
            // window.location.href = 'login.html';  // Redireciona para login se a rota protegida falhar
        }
    } catch (error) {
        console.error('Erro ao carregar informações do usuário:', error);
    }
}

// Função de logout
document.getElementById('logout').addEventListener('click', () => {
    localStorage.removeItem('token');  // Remove o token

    console.log('Logout efetuado. Redirecionamento desativado para testes.');
    // window.location.href = 'login.html';  // Redireciona para a página de login
});

// Carregar as informações do usuário quando o dashboard for carregado
loadUserInfo();
