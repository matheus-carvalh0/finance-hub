// Sistema de Autenticação
class AuthManager {
    constructor() {
        this.currentUser = null;
        this.users = JSON.parse(localStorage.getItem('finance_hub_users')) || [];
        this.init();
    }

    init() {
        // Verificar se há usuário logado
        const savedUser = localStorage.getItem('finance_hub_current_user');
        if (savedUser) {
            this.currentUser = JSON.parse(savedUser);
            this.showMainApp();
        } else {
            this.showLoginScreen();
        }

        this.setupEventListeners();
    }

    setupEventListeners() {
        // Alternância entre abas de login e cadastro
        const loginTab = document.getElementById('login-tab');
        const registerTab = document.getElementById('register-tab');
        const loginForm = document.getElementById('login-form');
        const registerForm = document.getElementById('register-form');

        if (loginTab && registerTab) {
            loginTab.addEventListener('click', () => {
                this.switchTab('login', loginTab, registerTab, loginForm, registerForm);
            });

            registerTab.addEventListener('click', () => {
                this.switchTab('register', registerTab, loginTab, registerForm, loginForm);
            });
        }

        // Formulários
        const loginFormEl = document.getElementById('login-form');
        const registerFormEl = document.getElementById('register-form');

        if (loginFormEl) {
            loginFormEl.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleLogin();
            });
        }

        if (registerFormEl) {
            registerFormEl.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleRegister();
            });
        }

        // Login com Google (simulado)
        const googleLoginBtn = document.getElementById('google-login');
        if (googleLoginBtn) {
            googleLoginBtn.addEventListener('click', () => {
                this.handleGoogleLogin();
            });
        }

        // Logout
        const logoutBtn = document.getElementById('logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                this.logout();
            });
        }

        // Toggle de tema na tela de login
        const loginThemeToggle = document.getElementById('login-theme-toggle');
        if (loginThemeToggle) {
            loginThemeToggle.addEventListener('click', () => {
                document.documentElement.classList.toggle('dark');
                const theme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
                localStorage.setItem('theme', theme);
            });
        }
    }

    switchTab(activeTab, activeBtn, inactiveBtn, activeForm, inactiveForm) {
        // Atualizar botões
        activeBtn.classList.add('text-primary-light', 'dark:text-primary-dark', 'border-primary-light', 'dark:border-primary-dark');
        activeBtn.classList.remove('text-gray-500', 'dark:text-gray-400', 'border-transparent');
        
        inactiveBtn.classList.remove('text-primary-light', 'dark:text-primary-dark', 'border-primary-light', 'dark:border-primary-dark');
        inactiveBtn.classList.add('text-gray-500', 'dark:text-gray-400', 'border-transparent');

        // Mostrar/ocultar formulários
        activeForm.classList.remove('hidden');
        inactiveForm.classList.add('hidden');
    }

    handleLogin() {
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        if (!email || !password) {
            this.showAlert('Por favor, preencha todos os campos.', 'error');
            return;
        }

        // Verificar credenciais
        const user = this.users.find(u => u.email === email && u.password === password);
        
        if (user) {
            this.currentUser = user;
            localStorage.setItem('finance_hub_current_user', JSON.stringify(user));
            this.showAlert('Login realizado com sucesso!', 'success');
            setTimeout(() => {
                this.showMainApp();
            }, 1000);
        } else {
            this.showAlert('Email ou senha incorretos.', 'error');
        }
    }

    handleRegister() {
        const name = document.getElementById('register-name').value;
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;
        const confirmPassword = document.getElementById('register-confirm-password').value;

        if (!name || !email || !password || !confirmPassword) {
            this.showAlert('Por favor, preencha todos os campos.', 'error');
            return;
        }

        if (password !== confirmPassword) {
            this.showAlert('As senhas não coincidem.', 'error');
            return;
        }

        if (password.length < 6) {
            this.showAlert('A senha deve ter pelo menos 6 caracteres.', 'error');
            return;
        }

        // Verificar se o email já existe
        if (this.users.find(u => u.email === email)) {
            this.showAlert('Este email já está cadastrado.', 'error');
            return;
        }

        // Criar novo usuário
        const newUser = {
            id: Date.now().toString(),
            name,
            email,
            password,
            createdAt: new Date().toISOString(),
            portfolios: [],
            alerts: [],
            rebalancerSettings: {}
        };

        this.users.push(newUser);
        localStorage.setItem('finance_hub_users', JSON.stringify(this.users));

        this.showAlert('Cadastro realizado com sucesso! Faça login para continuar.', 'success');
        
        // Limpar formulário e voltar para login
        document.getElementById('register-form').reset();
        setTimeout(() => {
            document.getElementById('login-tab').click();
        }, 1500);
    }

    handleGoogleLogin() {
        // Simulação de login com Google
        const mockGoogleUser = {
            id: 'google_' + Date.now(),
            name: 'Usuário Google',
            email: 'usuario@gmail.com',
            provider: 'google',
            createdAt: new Date().toISOString(),
            portfolios: [],
            alerts: [],
            rebalancerSettings: {}
        };

        this.currentUser = mockGoogleUser;
        localStorage.setItem('finance_hub_current_user', JSON.stringify(mockGoogleUser));
        
        this.showAlert('Login com Google realizado com sucesso!', 'success');
        setTimeout(() => {
            this.showMainApp();
        }, 1000);
    }

    logout() {
        this.currentUser = null;
        localStorage.removeItem('finance_hub_current_user');
        this.showLoginScreen();
        this.showAlert('Logout realizado com sucesso!', 'info');
    }

    showLoginScreen() {
        document.getElementById('login-screen').classList.remove('hidden');
        document.getElementById('main-app').classList.add('hidden');
    }

    showMainApp() {
        document.getElementById('login-screen').classList.add('hidden');
        document.getElementById('main-app').classList.remove('hidden');
        
        // Atualizar nome do usuário na sidebar
        const userNameEl = document.getElementById('user-name');
        if (userNameEl && this.currentUser) {
            userNameEl.textContent = this.currentUser.name;
        }

        // Disparar um evento personalizado para que o FinanceApp possa inicializar
        // Isso garante que o DOM esteja pronto e o AuthManager esteja disponível
        document.dispatchEvent(new CustomEvent("auth:loggedIn"));
    }

    showAlert(message, type = 'info') {
        // Criar elemento de alerta
        const alertEl = document.createElement('div');
        alertEl.className = `alert alert-${type} fixed top-4 right-4 z-50 max-w-sm fade-in`;
        alertEl.innerHTML = `
            <div class="flex items-center">
                <div class="flex-shrink-0">
                    ${this.getAlertIcon(type)}
                </div>
                <div class="ml-3">
                    <p class="text-sm font-medium">${message}</p>
                </div>
                <div class="ml-auto pl-3">
                    <button class="inline-flex text-gray-400 hover:text-gray-600" onclick="this.parentElement.parentElement.parentElement.remove()">
                        <ion-icon name="close-outline"></ion-icon>
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(alertEl);

        // Remover automaticamente após 5 segundos
        setTimeout(() => {
            if (alertEl.parentNode) {
                alertEl.remove();
            }
        }, 5000);
    }

    getAlertIcon(type) {
        const icons = {
            success: '<ion-icon name="checkmark-circle-outline" class="text-green-500"></ion-icon>',
            error: '<ion-icon name="alert-circle-outline" class="text-red-500"></ion-icon>',
            warning: '<ion-icon name="warning-outline" class="text-yellow-500"></ion-icon>',
            info: '<ion-icon name="information-circle-outline" class="text-blue-500"></ion-icon>'
        };
        return icons[type] || icons.info;
    }

    getCurrentUser() {
        return this.currentUser;
    }

    updateUserData(data) {
        if (!this.currentUser) return;

        // Atualizar dados do usuário atual
        Object.assign(this.currentUser, data);
        localStorage.setItem('finance_hub_current_user', JSON.stringify(this.currentUser));

        // Atualizar na lista de usuários se não for login social
        if (!this.currentUser.provider) {
            const userIndex = this.users.findIndex(u => u.id === this.currentUser.id);
            if (userIndex !== -1) {
                this.users[userIndex] = { ...this.currentUser };
                localStorage.setItem('finance_hub_users', JSON.stringify(this.users));
            }
        }
    }

    isAuthenticated() {
        return this.currentUser !== null;
    }
}

// Inicializar o gerenciador de autenticação quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    window.AuthManager = new AuthManager();
});
