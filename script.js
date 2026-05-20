// ==========================================
// VARIÁVEIS DE CONTROLE DE SESSÃO
// ==========================================
let usuarioLogado = false;

document.addEventListener("DOMContentLoaded", () => {
    console.log("Ambiente PET-Saúde Digital carregado.");
    configurarOlhoSenha();
});

// ==========================================
// CONTROLE DOS MODAIS
// ==========================================
function abrirModal(modalId) {
    const overlay = document.getElementById('modalOverlay');
    const loginModal = document.getElementById('loginModal');
    const registerModal = document.getElementById('registerModal');

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
    if (event.target === overlay) {
        overlay.style.display = 'none';
    }
}

function trocarModal(modalId) {
    abrirModal(modalId); 
}

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
// LÓGICA DE LOGIN E REDIRECIONAMENTO
// ==========================================
function processarLogin(event) {
    event.preventDefault(); 
    entrarNoPainel();
}

function processarCadastro(event) {
    event.preventDefault(); 
    
    const aceitaTermos = document.getElementById('termos').checked;
    if(!aceitaTermos) {
        alert("Você precisa aceitar os termos de uso para continuar.");
        return;
    }
    entrarNoPainel();
}

function entrarNoPainel() {
    usuarioLogado = true;

    document.getElementById('modalOverlay').style.display = 'none';
    document.getElementById('landing-view').style.display = 'none';
    document.getElementById('course-player-view').style.display = 'none';
    document.getElementById('dashboard-view').style.display = 'block';
    
    window.scrollTo({ top: 0, behavior: 'smooth' });

    document.getElementById('nav-unlogged').style.display = 'none'; 
    document.getElementById('nav-menu-center').style.display = 'none'; 
    document.getElementById('nav-logged').style.display = 'flex'; 
}

function fazerLogout() {
    if(!usuarioLogado) return; 

    if(confirm("Tem certeza que deseja sair da sua conta?")) {
        usuarioLogado = false;

        document.getElementById('dashboard-view').style.display = 'none';
        document.getElementById('course-player-view').style.display = 'none';
        document.getElementById('landing-view').style.display = 'block';
        
        document.getElementById('nav-logged').style.display = 'none';
        document.getElementById('nav-menu-center').style.display = 'flex'; 
        document.getElementById('nav-unlogged').style.display = 'flex';
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function verificarLoginEIrParaPainel() {
    if(usuarioLogado) {
        document.getElementById('landing-view').style.display = 'none';
        document.getElementById('course-player-view').style.display = 'none';
        document.getElementById('dashboard-view').style.display = 'block';
    } else {
        abrirModal('loginModal'); 
    }
}

// ==========================================
// NAVEGAÇÃO PARA A TELA DE VÍDEO AULAS
// ==========================================
function abrirAula(nomeCurso) {
    // Esconde o painel
    document.getElementById('dashboard-view').style.display = 'none';
    
    // Atualiza o título do curso no Player
    document.getElementById('player-course-title').innerText = nomeCurso;
    
    // Mostra a tela de vídeo
    document.getElementById('course-player-view').style.display = 'block';
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function fecharAula() {
    // Esconde o Player e volta pro Dashboard
    document.getElementById('course-player-view').style.display = 'none';
    document.getElementById('dashboard-view').style.display = 'block';
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
