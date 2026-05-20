// ==========================================
// CÓDIGO ORIGINAL (Moodle / PET-Saúde)
// ==========================================
function acessarCurso(nomeCurso) {
    alert(`Redirecionando você para o ambiente do curso: ${nomeCurso}`);
}

document.addEventListener("DOMContentLoaded", () => {
    console.log("Ambiente de Aprendizado PET-Saúde Digital carregado com sucesso.");
    configurarOlhoSenha();
});


// ==========================================
// VARIÁVEIS DE CONTROLE DE SESSÃO
// ==========================================
let usuarioLogado = false;

// ==========================================
// CONTROLE DOS MODAIS (LOGIN E CADASTRO)
// ==========================================
function abrirModal(modalId) {
    const overlay = document.getElementById('modalOverlay');
    const loginModal = document.getElementById('loginModal');
    const registerModal = document.getElementById('registerModal');

    // Mostra o fundo escuro suave
    overlay.style.display = 'flex'; 

    if (modalId === 'loginModal') {
        loginModal.style.display = 'block';
        registerModal.style.display = 'none';
    } else if (modalId === 'registerModal') {
        loginModal.style.display = 'none';
        registerModal.style.display = 'block';
    }
}

function fecharModais(event) {
    const overlay = document.getElementById('modalOverlay');
    // Só fecha se clicar fora da caixinha branca (no fundo cinza/escuro)
    if (event.target === overlay) {
        overlay.style.display = 'none';
    }
}

function trocarModal(modalId) {
    abrirModal(modalId); // Alterna entre os modais de login e cadastro
}

// ==========================================
// FUNÇÃO DO "OLHINHO" DA SENHA
// ==========================================
function configurarOlhoSenha() {
    const toggles = document.querySelectorAll('.toggle-password');
    
    toggles.forEach(icon => {
        icon.addEventListener('click', function() {
            const input = this.previousElementSibling;
            
            if (input.type === 'password') {
                input.type = 'text';
                this.classList.remove('fa-eye');
                this.classList.add('fa-eye-slash');
            } else {
                input.type = 'password';
                this.classList.remove('fa-eye-slash');
                this.classList.add('fa-eye');
            }
        });
    });
}

// ==========================================
// LÓGICA DE TRANSIÇÃO (LOGIN / CADASTRO -> PAINEL)
// ==========================================

function processarLogin(event) {
    event.preventDefault(); // Evita que a página recarregue ao clicar no botão
    
    // Simula a transição do login
    alert("Login realizado com sucesso! Bem-vindo de volta.");
    entrarNoPainel();
}

function processarCadastro(event) {
    event.preventDefault(); // Evita o reload da página
    
    const aceitaTermos = document.getElementById('termos').checked;
    if(!aceitaTermos) {
        alert("Você precisa aceitar os termos de uso para continuar.");
        return;
    }

    // Como você pediu: O usuário cadastra e JÁ LOGA AUTOMATICAMENTE!
    alert("Conta criada com sucesso! Redirecionando para o seu painel...");
    entrarNoPainel();
}

function entrarNoPainel() {
    usuarioLogado = true;

    // 1. Esconder Modais
    document.getElementById('modalOverlay').style.display = 'none';

    // 2. Esconder a Home Page
    document.getElementById('landing-view').style.display = 'none';

    // 3. Mostrar o Dashboard (Painel de Aluno idêntico à Imagem 3)
    document.getElementById('dashboard-view').style.display = 'block';
    
    // Rola suavemente para o topo do Dashboard
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // 4. Mudar a Barra de Navegação Superior (Navbar)
    document.getElementById('nav-unlogged').style.display = 'none'; // Esconde Entrar/Cadastrar
    document.getElementById('nav-menu-center').style.display = 'none'; // Esconde menus da home
    document.getElementById('nav-logged').style.display = 'flex'; // Mostra Avatar e Sinos
}

// Função de Sair (Logout) - Volta para a tela inicial
function fazerLogout() {
    if(!usuarioLogado) return; // Se já estiver deslogado (na home), apenas rola pro topo

    if(confirm("Tem certeza que deseja sair do seu painel?")) {
        usuarioLogado = false;

        // Esconde o Painel
        document.getElementById('dashboard-view').style.display = 'none';
        
        // Volta a Home Page
        document.getElementById('landing-view').style.display = 'block';
        
        // Volta a Navbar ao estado original
        document.getElementById('nav-logged').style.display = 'none';
        document.getElementById('nav-menu-center').style.display = 'flex'; 
        document.getElementById('nav-unlogged').style.display = 'flex';
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// Botões "Painel" na página inicial
function verificarLoginEIrParaPainel() {
    if(usuarioLogado) {
        document.getElementById('landing-view').style.display = 'none';
        document.getElementById('dashboard-view').style.display = 'block';
    } else {
        abrirModal('loginModal'); // Se não estiver logado, pede login primeiro
    }
}
