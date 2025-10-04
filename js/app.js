// Aplicação Principal Finance Hub
class FinanceApp {
    constructor() {
        this.initialized = false;
        this.portfolios = [];
        this.portfolioChart = null;
        this.comparatorChart = null;
        this.currentView = 'dashboard';
        this.marketData = {
            trending: [],
            crypto: [],
            news: []
        };
        
        // Lista expandida de ativos para autocomplete
        this.ALL_ASSETS = [
            // Ações Americanas - Tech
            { symbol: 'AAPL', name: 'Apple Inc.', country: 'us', type: 'stock', icon: '🍎', sector: 'Technology' },
            { symbol: 'GOOGL', name: 'Alphabet Inc.', country: 'us', type: 'stock', icon: '🔍', sector: 'Technology' },
            { symbol: 'MSFT', name: 'Microsoft Corporation', country: 'us', type: 'stock', icon: '💻', sector: 'Technology' },
            { symbol: 'AMZN', name: 'Amazon.com Inc.', country: 'us', type: 'stock', icon: '📦', sector: 'Consumer Discretionary' },
            { symbol: 'TSLA', name: 'Tesla Inc.', country: 'us', type: 'stock', icon: '🚗', sector: 'Consumer Discretionary' },
            { symbol: 'META', name: 'Meta Platforms Inc.', country: 'us', type: 'stock', icon: '📘', sector: 'Technology' },
            { symbol: 'NVDA', name: 'NVIDIA Corporation', country: 'us', type: 'stock', icon: '🎮', sector: 'Technology' },
            { symbol: 'NFLX', name: 'Netflix Inc.', country: 'us', type: 'stock', icon: '🎬', sector: 'Communication Services' },
            { symbol: 'CRM', name: 'Salesforce Inc.', country: 'us', type: 'stock', icon: '☁️', sector: 'Technology' },
            { symbol: 'ORCL', name: 'Oracle Corporation', country: 'us', type: 'stock', icon: '🗄️', sector: 'Technology' },
            { symbol: 'ADBE', name: 'Adobe Inc.', country: 'us', type: 'stock', icon: '🎨', sector: 'Technology' },
            { symbol: 'INTC', name: 'Intel Corporation', country: 'us', type: 'stock', icon: '🔧', sector: 'Technology' },
            { symbol: 'AMD', name: 'Advanced Micro Devices', country: 'us', type: 'stock', icon: '⚡', sector: 'Technology' },
            
            // Ações Americanas - Financeiro
            { symbol: 'JPM', name: 'JPMorgan Chase & Co.', country: 'us', type: 'stock', icon: '🏦', sector: 'Financials' },
            { symbol: 'BAC', name: 'Bank of America Corp.', country: 'us', type: 'stock', icon: '🏛️', sector: 'Financials' },
            { symbol: 'WFC', name: 'Wells Fargo & Company', country: 'us', type: 'stock', icon: '🏪', sector: 'Financials' },
            { symbol: 'GS', name: 'Goldman Sachs Group Inc.', country: 'us', type: 'stock', icon: '💰', sector: 'Financials' },
            { symbol: 'MS', name: 'Morgan Stanley', country: 'us', type: 'stock', icon: '📊', sector: 'Financials' },
            { symbol: 'V', name: 'Visa Inc.', country: 'us', type: 'stock', icon: '💳', sector: 'Financials' },
            { symbol: 'MA', name: 'Mastercard Inc.', country: 'us', type: 'stock', icon: '💎', sector: 'Financials' },
            
            // Ações Americanas - Saúde
            { symbol: 'JNJ', name: 'Johnson & Johnson', country: 'us', type: 'stock', icon: '🏥', sector: 'Healthcare' },
            { symbol: 'PFE', name: 'Pfizer Inc.', country: 'us', type: 'stock', icon: '💊', sector: 'Healthcare' },
            { symbol: 'UNH', name: 'UnitedHealth Group Inc.', country: 'us', type: 'stock', icon: '🩺', sector: 'Healthcare' },
            { symbol: 'MRNA', name: 'Moderna Inc.', country: 'us', type: 'stock', icon: '🧬', sector: 'Healthcare' },
            
            // Ações Americanas - Energia
            { symbol: 'XOM', name: 'Exxon Mobil Corporation', country: 'us', type: 'stock', icon: '⛽', sector: 'Energy' },
            { symbol: 'CVX', name: 'Chevron Corporation', country: 'us', type: 'stock', icon: '🛢️', sector: 'Energy' },
            
            // Ações Americanas - Consumo
            { symbol: 'KO', name: 'The Coca-Cola Company', country: 'us', type: 'stock', icon: '🥤', sector: 'Consumer Staples' },
            { symbol: 'PEP', name: 'PepsiCo Inc.', country: 'us', type: 'stock', icon: '🥤', sector: 'Consumer Staples' },
            { symbol: 'WMT', name: 'Walmart Inc.', country: 'us', type: 'stock', icon: '🛒', sector: 'Consumer Staples' },
            { symbol: 'HD', name: 'The Home Depot Inc.', country: 'us', type: 'stock', icon: '🔨', sector: 'Consumer Discretionary' },
            { symbol: 'MCD', name: 'McDonald\'s Corporation', country: 'us', type: 'stock', icon: '🍟', sector: 'Consumer Discretionary' },
            { symbol: 'SBUX', name: 'Starbucks Corporation', country: 'us', type: 'stock', icon: '☕', sector: 'Consumer Discretionary' },
            { symbol: 'NKE', name: 'Nike Inc.', country: 'us', type: 'stock', icon: '👟', sector: 'Consumer Discretionary' },
            
            // Ações Brasileiras - Bancos
            { symbol: 'ITUB4.SA', name: 'Itaú Unibanco', country: 'br', type: 'stock', icon: '🏦', sector: 'Financeiro' },
            { symbol: 'BBDC4.SA', name: 'Banco Bradesco', country: 'br', type: 'stock', icon: '🏛️', sector: 'Financeiro' },
            { symbol: 'BBAS3.SA', name: 'Banco do Brasil', country: 'br', type: 'stock', icon: '🏪', sector: 'Financeiro' },
            { symbol: 'SANB11.SA', name: 'Santander Brasil', country: 'br', type: 'stock', icon: '🏦', sector: 'Financeiro' },
            { symbol: 'BTOW3.SA', name: 'B2W Digital', country: 'br', type: 'stock', icon: '💻', sector: 'Varejo' },
            
            // Ações Brasileiras - Commodities
            { symbol: 'PETR4.SA', name: 'Petrobras', country: 'br', type: 'stock', icon: '⛽', sector: 'Petróleo e Gás' },
            { symbol: 'VALE3.SA', name: 'Vale S.A.', country: 'br', type: 'stock', icon: '⛏️', sector: 'Mineração' },
            { symbol: 'CSNA3.SA', name: 'CSN', country: 'br', type: 'stock', icon: '🏭', sector: 'Siderurgia' },
            { symbol: 'USIM5.SA', name: 'Usiminas', country: 'br', type: 'stock', icon: '🔩', sector: 'Siderurgia' },
            { symbol: 'SUZB3.SA', name: 'Suzano', country: 'br', type: 'stock', icon: '🌳', sector: 'Papel e Celulose' },
            
            // Ações Brasileiras - Varejo e Consumo
            { symbol: 'MGLU3.SA', name: 'Magazine Luiza', country: 'br', type: 'stock', icon: '🛒', sector: 'Varejo' },
            { symbol: 'LREN3.SA', name: 'Lojas Renner', country: 'br', type: 'stock', icon: '👕', sector: 'Varejo' },
            { symbol: 'ABEV3.SA', name: 'Ambev S.A.', country: 'br', type: 'stock', icon: '🍺', sector: 'Bebidas' },
            { symbol: 'JBSS3.SA', name: 'JBS S.A.', country: 'br', type: 'stock', icon: '🥩', sector: 'Alimentos' },
            { symbol: 'BRFS3.SA', name: 'BRF S.A.', country: 'br', type: 'stock', icon: '🐔', sector: 'Alimentos' },
            
            // Ações Brasileiras - Utilities e Infraestrutura
            { symbol: 'WEGE3.SA', name: 'WEG S.A.', country: 'br', type: 'stock', icon: '⚡', sector: 'Máquinas e Equipamentos' },
            { symbol: 'ELET3.SA', name: 'Eletrobras', country: 'br', type: 'stock', icon: '🔌', sector: 'Energia Elétrica' },
            { symbol: 'SBSP3.SA', name: 'Sabesp', country: 'br', type: 'stock', icon: '💧', sector: 'Saneamento' },
            { symbol: 'CCRO3.SA', name: 'CCR S.A.', country: 'br', type: 'stock', icon: '🛣️', sector: 'Concessões' },
            { symbol: 'EQTL3.SA', name: 'Equatorial Energia', country: 'br', type: 'stock', icon: '⚡', sector: 'Energia Elétrica' },
            
            // Ações Brasileiras - Outros
            { symbol: 'B3SA3.SA', name: 'B3 S.A.', country: 'br', type: 'stock', icon: '📈', sector: 'Serviços Financeiros' },
            { symbol: 'RENT3.SA', name: 'Localiza', country: 'br', type: 'stock', icon: '🚗', sector: 'Aluguel de Carros' },
            { symbol: 'RAIL3.SA', name: 'Rumo S.A.', country: 'br', type: 'stock', icon: '🚂', sector: 'Logística' },
            { symbol: 'HAPV3.SA', name: 'Hapvida', country: 'br', type: 'stock', icon: '🏥', sector: 'Saúde' },
            
            // Criptomoedas - Top 20
            { symbol: 'BTC', name: 'Bitcoin', country: 'global', type: 'crypto', icon: '₿', sector: 'Cryptocurrency' },
            { symbol: 'ETH', name: 'Ethereum', country: 'global', type: 'crypto', icon: 'Ξ', sector: 'Cryptocurrency' },
            { symbol: 'BNB', name: 'Binance Coin', country: 'global', type: 'crypto', icon: '🟡', sector: 'Cryptocurrency' },
            { symbol: 'ADA', name: 'Cardano', country: 'global', type: 'crypto', icon: '₳', sector: 'Cryptocurrency' },
            { symbol: 'SOL', name: 'Solana', country: 'global', type: 'crypto', icon: '◎', sector: 'Cryptocurrency' },
            { symbol: 'XRP', name: 'Ripple', country: 'global', type: 'crypto', icon: '💧', sector: 'Cryptocurrency' },
            { symbol: 'DOT', name: 'Polkadot', country: 'global', type: 'crypto', icon: '🔴', sector: 'Cryptocurrency' },
            { symbol: 'DOGE', name: 'Dogecoin', country: 'global', type: 'crypto', icon: '🐕', sector: 'Cryptocurrency' },
            { symbol: 'AVAX', name: 'Avalanche', country: 'global', type: 'crypto', icon: '🏔️', sector: 'Cryptocurrency' },
            { symbol: 'SHIB', name: 'Shiba Inu', country: 'global', type: 'crypto', icon: '🐕', sector: 'Cryptocurrency' },
            { symbol: 'MATIC', name: 'Polygon', country: 'global', type: 'crypto', icon: '🟣', sector: 'Cryptocurrency' },
            { symbol: 'LTC', name: 'Litecoin', country: 'global', type: 'crypto', icon: '🪙', sector: 'Cryptocurrency' },
            { symbol: 'UNI', name: 'Uniswap', country: 'global', type: 'crypto', icon: '🦄', sector: 'Cryptocurrency' },
            { symbol: 'LINK', name: 'Chainlink', country: 'global', type: 'crypto', icon: '🔗', sector: 'Cryptocurrency' },
            { symbol: 'ATOM', name: 'Cosmos', country: 'global', type: 'crypto', icon: '⚛️', sector: 'Cryptocurrency' },
            
            // ETFs Americanos
            { symbol: 'SPY', name: 'SPDR S&P 500 ETF', country: 'us', type: 'etf', icon: '📊', sector: 'Index Fund' },
            { symbol: 'QQQ', name: 'Invesco QQQ Trust', country: 'us', type: 'etf', icon: '💻', sector: 'Technology ETF' },
            { symbol: 'VTI', name: 'Vanguard Total Stock Market ETF', country: 'us', type: 'etf', icon: '🏛️', sector: 'Total Market ETF' },
            { symbol: 'IWM', name: 'iShares Russell 2000 ETF', country: 'us', type: 'etf', icon: '🏢', sector: 'Small Cap ETF' },
            { symbol: 'EFA', name: 'iShares MSCI EAFE ETF', country: 'us', type: 'etf', icon: '🌍', sector: 'International ETF' },
            { symbol: 'GLD', name: 'SPDR Gold Shares', country: 'us', type: 'etf', icon: '🥇', sector: 'Commodity ETF' },
            { symbol: 'TLT', name: 'iShares 20+ Year Treasury Bond ETF', country: 'us', type: 'etf', icon: '📋', sector: 'Bond ETF' },
            
            // ETFs Brasileiros
            { symbol: 'BOVA11.SA', name: 'iShares Ibovespa', country: 'br', type: 'etf', icon: '📈', sector: 'Índice Bovespa' },
            { symbol: 'SMAL11.SA', name: 'iShares Small Cap', country: 'br', type: 'etf', icon: '🏢', sector: 'Small Cap' },
            { symbol: 'IVVB11.SA', name: 'iShares S&P 500', country: 'br', type: 'etf', icon: '🇺🇸', sector: 'S&P 500' },
            { symbol: 'HASH11.SA', name: 'Hashdex Nasdaq Crypto Index', country: 'br', type: 'etf', icon: '₿', sector: 'Crypto ETF' },
            { symbol: 'GOLD11.SA', name: 'Ouro', country: 'br', type: 'etf', icon: '🥇', sector: 'Ouro' },
            
            // FIIs Brasileiros
            { symbol: 'HGLG11.SA', name: 'CSHG Logística', country: 'br', type: 'fii', icon: '🏭', sector: 'Logística' },
            { symbol: 'XPML11.SA', name: 'XP Malls', country: 'br', type: 'fii', icon: '🏬', sector: 'Shopping Centers' },
            { symbol: 'VISC11.SA', name: 'Vinci Shopping Centers', country: 'br', type: 'fii', icon: '🛍️', sector: 'Shopping Centers' },
            { symbol: 'KNRI11.SA', name: 'Kinea Renda Imobiliária', country: 'br', type: 'fii', icon: '🏢', sector: 'Corporativo' },
            { symbol: 'BTLG11.SA', name: 'BTG Pactual Logística', country: 'br', type: 'fii', icon: '📦', sector: 'Logística' }
        ];
    }

    async initialize() {
        if (this.initialized) return;
        
        console.log('Inicializando Finance App...');
        
        // Aplicar tema salvo
        this.applyTheme();
        
        // Configurar event listeners
        this.setupEventListeners();
        
        // Carregar dados iniciais
        await this.loadInitialData();
        
        // Inicializar componentes
        this.initializeComparator();
        
        // Carregar carteiras do usuário
        this.loadPortfolios();
        
        // Renderizar dados
        await this.renderAllData();
        
        // Inicializar ticker
        this.initializeTicker();
        
        // Iniciar atualizações automáticas
        this.startAutoUpdates();
        
        this.initialized = true;
        console.log('Finance App inicializado com sucesso!');
    }

    applyTheme() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.documentElement.classList.add('dark');
        }
    }

    setupEventListeners() {
        // Toggle de tema
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                document.documentElement.classList.toggle('dark');
                const theme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
                localStorage.setItem('theme', theme);
            });
        }

        // Menu toggle
        const menuToggle = document.getElementById('menu-toggle');
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('overlay');

        if (menuToggle && sidebar && overlay) {
            menuToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleSidebar();
            });

            overlay.addEventListener('click', () => {
                this.closeSidebar();
            });
        }

        // Navegação
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const viewId = link.dataset.view;
                this.switchView(viewId);
                this.closeSidebar();
            });
        });

        // Gerenciador de carteiras
        this.setupPortfolioManager();
        
        // Comparador de carteiras
        this.setupComparator();
        
        // Seção Aprenda a Investir
        this.setupLearnSection();
        
        // Sistema de alertas
        this.setupAlertsSystem();
    }

    toggleSidebar() {
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('overlay');
        
        if (sidebar.classList.contains('-translate-x-full')) {
            sidebar.classList.remove('-translate-x-full');
            overlay.classList.remove('hidden');
        } else {
            sidebar.classList.add('-translate-x-full');
            overlay.classList.add('hidden');
        }
    }

    closeSidebar() {
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('overlay');
        
        sidebar.classList.add('-translate-x-full');
        overlay.classList.add('hidden');
    }

    switchView(viewId) {
        // Ocultar todas as views
        const views = document.querySelectorAll('.view-container');
        views.forEach(view => view.classList.add('hidden'));
        
        // Mostrar view selecionada
        const targetView = document.getElementById(`view-${viewId}`);
        if (targetView) {
            targetView.classList.remove('hidden');
            this.currentView = viewId;
            
            // Carregar conteúdo específico da view se necessário
            this.loadViewContent(viewId);
        }
        
        // Atualizar navegação ativa
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            if (link.dataset.view === viewId) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    async loadViewContent(viewId) {
        switch (viewId) {
            case 'dashboard':
                await this.renderDashboard();
                break;
            case 'aprenda-investir':
                this.renderLearnSection();
                break;
            case 'rebalanceador':
                this.renderRebalancer();
                break;
            case 'alertas':
                this.renderAlerts();
                break;
        }
    }

    async loadInitialData() {
        try {
            // Carregar dados do mercado
            await Promise.all([
                this.loadMarketData(),
                this.loadEconomicIndicators()
            ]);
        } catch (error) {
            console.error('Erro ao carregar dados iniciais:', error);
        }
    }

    async loadMarketData() {
        try {
            // Carregar ações em destaque
            const trendingSymbols = ['AAPL', 'GOOGL', 'MSFT', 'TSLA'];
            this.marketData.trending = await Promise.all(
                trendingSymbols.map(symbol => window.FinancialAPI.getAssetData(symbol))
            );

            // Carregar criptomoedas
            const cryptoSymbols = ['BTC', 'ETH', 'ADA', 'SOL'];
            this.marketData.crypto = await Promise.all(
                cryptoSymbols.map(symbol => window.FinancialAPI.getAssetData(symbol))
            );

            // Carregar notícias
            this.marketData.news = await window.FinancialAPI.getFinancialNews();
            
        } catch (error) {
            console.error('Erro ao carregar dados do mercado:', error);
            // Usar dados mock em caso de erro
            this.loadMockMarketData();
        }
    }

    loadMockMarketData() {
        this.marketData.trending = [
            { symbol: 'AAPL', currentPrice: 175.50, change24h: 2.3, name: 'Apple Inc.' },
            { symbol: 'GOOGL', currentPrice: 142.80, change24h: -1.2, name: 'Alphabet Inc.' },
            { symbol: 'MSFT', currentPrice: 378.90, change24h: 1.8, name: 'Microsoft Corp.' },
            { symbol: 'TSLA', currentPrice: 248.50, change24h: -3.1, name: 'Tesla Inc.' }
        ];

        this.marketData.crypto = [
            { symbol: 'BTC', currentPrice: 67500, change24h: 4.2, name: 'Bitcoin' },
            { symbol: 'ETH', currentPrice: 3850, change24h: 2.8, name: 'Ethereum' },
            { symbol: 'ADA', currentPrice: 0.65, change24h: -1.5, name: 'Cardano' },
            { symbol: 'SOL', currentPrice: 185, change24h: 6.1, name: 'Solana' }
        ];

        this.marketData.news = [
            {
                title: 'Fed mantém taxa de juros em 5,25%-5,50%',
                summary: 'O Federal Reserve decidiu manter as taxas de juros inalteradas na reunião desta semana...',
                publishedAt: new Date().toISOString(),
                source: 'Reuters',
                url: '#'
            },
            {
                title: 'Bitcoin supera US$ 67.000 com otimismo do mercado',
                summary: 'A principal criptomoeda do mundo registrou alta significativa nas últimas 24 horas...',
                publishedAt: new Date().toISOString(),
                source: 'CoinDesk',
                url: '#'
            }
        ];
    }

    setupPortfolioManager() {
        const saveButton = document.getElementById('savePortfolioButton');
        const nameInput = document.getElementById('newPortfolioName');
        const assetsInput = document.getElementById('newPortfolioAssets');
        const autocompleteList = document.getElementById('asset-autocomplete-list');

        if (saveButton) {
            saveButton.addEventListener('click', () => {
                this.savePortfolio();
            });
        }

        if (assetsInput && autocompleteList) {
            assetsInput.addEventListener('input', async (e) => {
                await this.handleAssetSearch(e.target.value);
            });

            autocompleteList.addEventListener('click', (e) => {
                const targetDiv = e.target.closest('[data-symbol]');
                if (targetDiv) {
                    this.selectAssetFromAutocomplete(targetDiv.dataset.symbol);
                }
            });
        }
    }

    async handleAssetSearch(value) {
        const autocompleteList = document.getElementById('asset-autocomplete-list');
        const currentTerm = value.split(',').pop().trim().toLowerCase();
        
        if (!currentTerm || currentTerm.length < 2) {
            autocompleteList.classList.add('hidden');
            return;
        }

        try {
            // Usar a API Finnhub para busca de ativos
            const results = await window.FinnhubAPI.searchSymbols(currentTerm);

            if (results.length > 0) {
                // Obter cotações para os resultados encontrados
                const quotesPromises = results.slice(0, 8).map(async (asset) => {
                    try {
                        const quote = await window.FinnhubAPI.getQuote(asset.symbol);
                        return {
                            ...asset,
                            price: quote.price,
                            change: quote.change,
                            changePercent: quote.changePercent
                        };
                    } catch (error) {
                        console.error(`Erro ao obter cotação para ${asset.symbol}:`, error);
                        return asset;
                    }
                });

                const assetsWithQuotes = await Promise.all(quotesPromises);
                this.renderAutocompleteResults(assetsWithQuotes);
                autocompleteList.classList.remove('hidden');
            } else {
                autocompleteList.classList.add('hidden');
            }
        } catch (error) {
            console.error('Erro na busca de ativos:', error);
            autocompleteList.classList.add('hidden');
        }
    }

    renderAutocompleteResults(results) {
        const autocompleteList = document.getElementById('asset-autocomplete-list');
        
        autocompleteList.innerHTML = results.map(asset => `
            <div class="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer flex items-center border-b border-gray-200 dark:border-gray-600 last:border-b-0 transition-colors" data-symbol="${asset.symbol}">
                <div class="flex items-center flex-1">
                    <div class="flex items-center mr-3">
                        ${asset.icon ? `<span class="text-lg mr-2">${asset.icon}</span>` : ''}
                        ${window.FinnhubAPI.getCountryFlag(asset.country)}
                    </div>
                    <div class="flex flex-col flex-1">
                        <div class="flex items-center justify-between">
                            <span class="font-semibold text-sm text-gray-900 dark:text-white">${asset.symbol}</span>
                            <div class="flex items-center space-x-2">
                                ${asset.price ? `<span class="text-sm font-medium">$${asset.price.toFixed(2)}</span>` : ''}
                                ${asset.changePercent !== undefined ? `<span class="text-xs px-2 py-1 rounded-full ${asset.changePercent >= 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}">${asset.changePercent >= 0 ? '+' : ''}${asset.changePercent.toFixed(2)}%</span>` : ''}
                                <span class="text-xs px-2 py-1 rounded-full ${this.getAssetTypeClass(asset.type)}">${this.getAssetTypeLabel(asset.type)}</span>
                            </div>
                        </div>
                        <span class="text-xs text-gray-500 dark:text-gray-400 truncate">${asset.name}</span>
                        ${asset.sector ? `<span class="text-xs text-blue-600 dark:text-blue-400 mt-1">${asset.sector}</span>` : ''}
                    </div>
                </div>
            </div>
        `).join('');
    }

    getCountryFlag(country) {
        const flags = {
            'us': '🇺🇸',
            'br': '🇧🇷',
            'global': '🌍'
        };
        return flags[country] || '🏳️';
    }

    getAssetTypeLabel(type) {
        const labels = {
            'stock': 'Ação',
            'crypto': 'Crypto',
            'etf': 'ETF',
            'fii': 'FII'
        };
        return labels[type] || type.toUpperCase();
    }

    getAssetTypeClass(type) {
        const classes = {
            stock: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
            crypto: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
            etf: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
        };
        return classes[type] || 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }

    selectAssetFromAutocomplete(symbol) {
        const assetsInput = document.getElementById('newPortfolioAssets');
        const autocompleteList = document.getElementById('asset-autocomplete-list');
        
        const parts = assetsInput.value.split(',');
        parts[parts.length - 1] = ' ' + symbol;
        assetsInput.value = parts.join(',') + ', ';
        
        autocompleteList.classList.add('hidden');
        assetsInput.focus();
    }

    savePortfolio() {
        const nameInput = document.getElementById('newPortfolioName');
        const assetsInput = document.getElementById('newPortfolioAssets');
        
        const name = nameInput.value.trim();
        const assets = assetsInput.value.split(',')
            .map(s => s.trim().toUpperCase())
            .filter(s => s);

        if (!name || assets.length === 0) {
            this.showAlert('Por favor, preencha o nome da carteira e adicione pelo menos um ativo.', 'warning');
            return;
        }

        const portfolio = {
            id: Date.now().toString(),
            name,
            assets,
            createdAt: new Date().toISOString(),
            userId: window.AuthManager.getCurrentUser().id
        };

        this.portfolios.push(portfolio);
        this.savePortfolios();
        
        // Limpar formulário
        nameInput.value = '';
        assetsInput.value = '';
        
        // Atualizar lista
        this.renderSavedPortfolios();
        
        // Atualizar seletores do comparador
        this.updateComparatorSelects();
        
        this.showAlert('Carteira salva com sucesso!', 'success');
    }

    loadPortfolios() {
        const user = window.AuthManager.getCurrentUser();
        if (!user) return;

        const saved = localStorage.getItem(`portfolios_${user.id}`);
        this.portfolios = saved ? JSON.parse(saved) : [];
        
        this.renderSavedPortfolios();
        this.updateComparatorSelects();
    }

    savePortfolios() {
        const user = window.AuthManager.getCurrentUser();
        if (!user) return;

        localStorage.setItem(`portfolios_${user.id}`, JSON.stringify(this.portfolios));
        
        // Atualizar dados do usuário
        window.AuthManager.updateUserData({ portfolios: this.portfolios });
    }

    renderSavedPortfolios() {
        const container = document.getElementById('savedPortfoliosList');
        if (!container) return;

        if (this.portfolios.length === 0) {
            container.innerHTML = `
                <div class="text-center py-8 text-gray-500 dark:text-gray-400">
                    <ion-icon name="briefcase-outline" class="text-4xl mb-2"></ion-icon>
                    <p>Nenhuma carteira criada ainda.</p>
                    <p class="text-sm">Crie sua primeira carteira acima!</p>
                </div>
            `;
            return;
        }

        container.innerHTML = this.portfolios.map((portfolio, index) => `
            <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <div class="flex-1">
                    <h4 class="font-semibold text-lg">${portfolio.name}</h4>
                    <p class="text-sm text-gray-600 dark:text-gray-400">
                        ${portfolio.assets.length} ativos: ${portfolio.assets.slice(0, 3).join(', ')}${portfolio.assets.length > 3 ? '...' : ''}
                    </p>
                    <p class="text-xs text-gray-500 dark:text-gray-500">
                        Criada em ${new Date(portfolio.createdAt).toLocaleDateString('pt-BR')}
                    </p>
                </div>
                <div class="flex items-center space-x-2">
                    <button onclick="window.FinanceApp.editPortfolio(${index})" class="p-2 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900 rounded-lg transition-colors">
                        <ion-icon name="create-outline"></ion-icon>
                    </button>
                    <button onclick="window.FinanceApp.deletePortfolio(${index})" class="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900 rounded-lg transition-colors">
                        <ion-icon name="trash-outline"></ion-icon>
                    </button>
                </div>
            </div>
        `).join('');
    }

    editPortfolio(index) {
        const portfolio = this.portfolios[index];
        if (!portfolio) return;

        const nameInput = document.getElementById('newPortfolioName');
        const assetsInput = document.getElementById('newPortfolioAssets');
        
        nameInput.value = portfolio.name;
        assetsInput.value = portfolio.assets.join(', ');
        
        // Remover a carteira atual para permitir edição
        this.portfolios.splice(index, 1);
        this.savePortfolios();
        this.renderSavedPortfolios();
        this.updateComparatorSelects();
    }

    deletePortfolio(index) {
        const portfolio = this.portfolios[index];
        if (!portfolio) return;

        if (confirm(`Tem certeza que deseja excluir a carteira "${portfolio.name}"?`)) {
            this.portfolios.splice(index, 1);
            this.savePortfolios();
            this.renderSavedPortfolios();
            this.updateComparatorSelects();
            this.showAlert('Carteira excluída com sucesso!', 'info');
        }
    }

    setupComparator() {
        const portfolio1Select = document.getElementById('portfolio1Select');
        const portfolio2Select = document.getElementById('portfolio2Select');

        if (portfolio1Select && portfolio2Select) {
            portfolio1Select.addEventListener('change', () => {
                this.updateComparison();
            });

            portfolio2Select.addEventListener('change', () => {
                this.updateComparison();
            });
        }
    }

    initializeComparator() {
        const ctx = document.getElementById('comparator-chart');
        if (!ctx) return;

        this.comparatorChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: [],
                datasets: []
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Comparação de Performance'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        ticks: {
                            callback: function(value) {
                                return value.toFixed(2) + '%';
                            }
                        }
                    }
                }
            }
        });

        this.setupComparatorPeriods();
    }

    setupComparatorPeriods() {
        const container = document.getElementById('comparator-periods-container');
        if (!container) return;

        const periods = [
            { id: '1M', label: '1M' },
            { id: '3M', label: '3M' },
            { id: '6M', label: '6M' },
            { id: '1Y', label: '1A' },
            { id: '5Y', label: '5A' }
        ];

        container.innerHTML = periods.map(period => `
            <button class="period-btn px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${period.id === '1M' ? 'active' : ''}" 
                    data-period="${period.id}">
                ${period.label}
            </button>
        `).join('');

        container.addEventListener('click', (e) => {
            if (e.target.classList.contains('period-btn')) {
                // Atualizar botão ativo
                container.querySelectorAll('.period-btn').forEach(btn => btn.classList.remove('active'));
                e.target.classList.add('active');
                
                // Atualizar comparação
                this.updateComparison(e.target.dataset.period);
            }
        });
    }

    updateComparatorSelects() {
        const portfolio1Select = document.getElementById('portfolio1Select');
        const portfolio2Select = document.getElementById('portfolio2Select');

        if (!portfolio1Select || !portfolio2Select) return;

        const options = this.portfolios.map(portfolio => 
            `<option value="${portfolio.id}">${portfolio.name}</option>`
        ).join('');

        const defaultOption = '<option value="">Selecione uma carteira</option>';
        
        portfolio1Select.innerHTML = defaultOption + options;
        portfolio2Select.innerHTML = defaultOption + options;
    }

    async updateComparison(period = '1M') {
        const portfolio1Select = document.getElementById('portfolio1Select');
        const portfolio2Select = document.getElementById('portfolio2Select');
        const resultsContainer = document.getElementById('comparisonResults');

        if (!portfolio1Select || !portfolio2Select || !resultsContainer) return;

        const portfolio1Id = portfolio1Select.value;
        const portfolio2Id = portfolio2Select.value;

        if (!portfolio1Id || !portfolio2Id) {
            resultsContainer.innerHTML = '<p class="text-center text-gray-500 dark:text-gray-400">Selecione duas carteiras para comparar</p>';
            return;
        }

        const portfolio1 = this.portfolios.find(p => p.id === portfolio1Id);
        const portfolio2 = this.portfolios.find(p => p.id === portfolio2Id);

        if (!portfolio1 || !portfolio2) return;

        try {
            // Simular dados de performance
            const performance1 = await this.calculatePortfolioPerformance(portfolio1, period);
            const performance2 = await this.calculatePortfolioPerformance(portfolio2, period);

            this.updateComparatorChart(performance1, performance2, portfolio1.name, portfolio2.name);
            this.renderComparisonResults(performance1, performance2, portfolio1.name, portfolio2.name);
        } catch (error) {
            console.error('Erro ao calcular performance:', error);
            resultsContainer.innerHTML = '<p class="text-center text-red-500">Erro ao calcular performance das carteiras</p>';
        }
    }

    async calculatePortfolioPerformance(portfolio, period) {
        // Simular cálculo de performance
        const days = this.periodToDays(period);
        const performance = [];
        let baseValue = 100;

        for (let i = 0; i < days; i++) {
            const date = new Date();
            date.setDate(date.getDate() - (days - i));
            
            // Simular variação baseada nos ativos da carteira
            const variation = (Math.random() - 0.5) * 2; // -1% a +1% por dia
            baseValue *= (1 + variation / 100);
            
            performance.push({
                date: date.toISOString().split('T')[0],
                value: baseValue
            });
        }

        return {
            data: performance,
            totalReturn: ((baseValue - 100) / 100) * 100,
            volatility: Math.random() * 20 + 5, // 5% a 25%
            sharpeRatio: Math.random() * 2 + 0.5 // 0.5 a 2.5
        };
    }

    updateComparatorChart(performance1, performance2, name1, name2) {
        if (!this.comparatorChart) return;

        const labels = performance1.data.map(item => item.date);
        
        this.comparatorChart.data.labels = labels;
        this.comparatorChart.data.datasets = [
            {
                label: name1,
                data: performance1.data.map(item => ((item.value - 100) / 100) * 100),
                borderColor: '#3b82f6',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                tension: 0.1
            },
            {
                label: name2,
                data: performance2.data.map(item => ((item.value - 100) / 100) * 100),
                borderColor: '#ec4899',
                backgroundColor: 'rgba(236, 72, 153, 0.1)',
                tension: 0.1
            }
        ];

        this.comparatorChart.update();
    }

    renderComparisonResults(performance1, performance2, name1, name2) {
        const container = document.getElementById('comparisonResults');
        
        container.innerHTML = `
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                    <h4 class="font-semibold text-blue-800 dark:text-blue-200 mb-3">${name1}</h4>
                    <div class="space-y-2">
                        <div class="flex justify-between">
                            <span class="text-sm">Retorno Total:</span>
                            <span class="font-semibold ${performance1.totalReturn >= 0 ? 'text-green-600' : 'text-red-600'}">
                                ${performance1.totalReturn.toFixed(2)}%
                            </span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-sm">Volatilidade:</span>
                            <span class="font-semibold">${performance1.volatility.toFixed(2)}%</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-sm">Índice Sharpe:</span>
                            <span class="font-semibold">${performance1.sharpeRatio.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
                
                <div class="bg-pink-50 dark:bg-pink-900/20 rounded-lg p-4">
                    <h4 class="font-semibold text-pink-800 dark:text-pink-200 mb-3">${name2}</h4>
                    <div class="space-y-2">
                        <div class="flex justify-between">
                            <span class="text-sm">Retorno Total:</span>
                            <span class="font-semibold ${performance2.totalReturn >= 0 ? 'text-green-600' : 'text-red-600'}">
                                ${performance2.totalReturn.toFixed(2)}%
                            </span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-sm">Volatilidade:</span>
                            <span class="font-semibold">${performance2.volatility.toFixed(2)}%</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-sm">Índice Sharpe:</span>
                            <span class="font-semibold">${performance2.sharpeRatio.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <h4 class="font-semibold mb-2">Análise Comparativa</h4>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                    ${this.generateComparisonAnalysis(performance1, performance2, name1, name2)}
                </p>
            </div>
        `;
    }

    generateComparisonAnalysis(perf1, perf2, name1, name2) {
        const betterReturn = perf1.totalReturn > perf2.totalReturn ? name1 : name2;
        const betterSharpe = perf1.sharpeRatio > perf2.sharpeRatio ? name1 : name2;
        const lowerVolatility = perf1.volatility < perf2.volatility ? name1 : name2;

        return `A carteira "${betterReturn}" apresentou melhor retorno total. 
                Em termos de risco-retorno (Índice Sharpe), "${betterSharpe}" foi superior. 
                A carteira "${lowerVolatility}" demonstrou menor volatilidade, indicando menor risco.`;
    }

    async renderAllData() {
        await this.renderDashboard();
        this.updateMarquee();
    }

    async renderDashboard() {
        if (this.currentView !== 'dashboard') return;

        await Promise.all([
            this.renderDashboardPortfolios(),
            this.renderMarketOverview()
        ]);
    }

    async renderDashboardPortfolios() {
        const container = document.getElementById('dashboard-portfolios');
        if (!container) return;

        if (this.portfolios.length === 0) {
            container.innerHTML = `
                <div class="text-center py-12">
                    <ion-icon name="briefcase-outline" class="text-6xl text-gray-400 mb-4"></ion-icon>
                    <h3 class="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">Nenhuma carteira encontrada</h3>
                    <p class="text-gray-500 dark:text-gray-500 mb-4">Crie sua primeira carteira para começar a acompanhar seus investimentos</p>
                    <button onclick="window.FinanceApp.switchView('gerenciar-carteiras')" class="btn-primary px-6 py-3 rounded-lg text-white font-semibold hover:bg-blue-700 transition-colors">
                        Criar Primeira Carteira
                    </button>
                </div>
            `;
            return;
        }

        const portfolioCards = await Promise.all(
            this.portfolios.map(async (portfolio, index) => {
                const performance = await this.calculatePortfolioPerformance(portfolio, '1M');
                return this.createPortfolioCard(portfolio, performance, index);
            })
        );

        container.innerHTML = portfolioCards.join('');
    }

    createPortfolioCard(portfolio, performance, index) {
        const currentValue = performance.data[performance.data.length - 1].value;
        const changePercent = performance.totalReturn;
        const changeClass = changePercent >= 0 ? 'text-green-600' : 'text-red-600';
        const changeIcon = changePercent >= 0 ? 'trending-up-outline' : 'trending-down-outline';

        return `
            <div class="card bg-card-light dark:bg-card-dark rounded-xl p-6 hover-lift">
                <div class="flex items-center justify-between mb-4">
                    <h3 class="text-xl font-bold">${portfolio.name}</h3>
                    <div class="flex items-center space-x-2">
                        <span class="text-sm text-gray-500">${portfolio.assets.length} ativos</span>
                        <button class="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded" onclick="window.FinanceApp.switchView('gerenciar-carteiras')">
                            <ion-icon name="settings-outline" class="text-lg"></ion-icon>
                        </button>
                    </div>
                </div>
                
                <div class="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <p class="text-sm text-gray-500 dark:text-gray-400">Valor Atual</p>
                        <p class="text-2xl font-bold">R$ ${currentValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                    </div>
                    <div>
                        <p class="text-sm text-gray-500 dark:text-gray-400">Variação (30d)</p>
                        <div class="flex items-center">
                            <ion-icon name="${changeIcon}" class="text-lg ${changeClass} mr-1"></ion-icon>
                            <span class="text-lg font-semibold ${changeClass}">${changePercent.toFixed(2)}%</span>
                        </div>
                    </div>
                </div>
                
                <div class="mb-4">
                    <div class="flex items-center justify-between mb-2">
                        <span class="text-sm text-gray-500">Ativos:</span>
                        <div class="flex space-x-1">
                            <button class="text-xs px-2 py-1 rounded ${this.currentView === 'dashboard' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-600'}" onclick="window.FinanceApp.switchView('dashboard')">USD</button>
                            <button class="text-xs px-2 py-1 rounded bg-gray-100 text-gray-600" onclick="window.FinanceApp.switchView('dashboard')">BRL</button>
                        </div>
                    </div>
                    <div class="flex flex-wrap gap-1">
                        ${portfolio.assets.slice(0, 6).map(asset => `
                            <span class="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full">${asset}</span>
                        `).join('')}
                        ${portfolio.assets.length > 6 ? `<span class="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full">+${portfolio.assets.length - 6}</span>` : ''}
                    </div>
                </div>
                
                <div class="h-32 mb-4">
                    <canvas id="portfolio-chart-${index}"></canvas>
                </div>
                
                <div class="flex space-x-2">
                    <button class="flex-1 py-2 px-4 bg-primary-light text-white rounded-lg hover:bg-blue-700 transition-colors" onclick="window.FinanceApp.switchView('comparador-carteiras')">
                        Comparar
                    </button>
                    <button class="flex-1 py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" onclick="window.FinanceApp.switchView('rebalanceador')">
                        Rebalancear
                    </button>
                </div>
            </div>
        `;
    }

    async renderMarketOverview() {
        this.renderTrendingStocks();
        this.renderCryptoData();
        this.renderNewsData();
    }

    async renderTrendingStocks() {
        const container = document.getElementById('trending-acoes-data');
        if (!container) return;

        try {
            // Usar API Finnhub para obter ações em destaque baseadas na performance
            const trendingAssets = await window.FinnhubAPI.getTrendingAssets(12);
            
            // Filtrar apenas ações (não crypto)
            const trendingStocks = trendingAssets.filter(asset => 
                asset.type === 'stock' && !asset.symbol.includes('USDT') && !asset.symbol.includes('BTC') && !asset.symbol.includes('ETH')
            ).slice(0, 6);
            
            if (trendingStocks.length === 0) {
                container.innerHTML = '<p class="text-gray-500 dark:text-gray-400 text-center">Carregando ações em destaque...</p>';
                return;
            }
            
            container.innerHTML = trendingStocks.map(stock => `
                <div class="card bg-card-light dark:bg-card-dark rounded-lg p-4 hover-lift" data-symbol="${stock.symbol}">
                    <div class="flex items-center justify-between mb-2">
                        <div class="flex items-center space-x-2">
                            <span class="text-lg">${stock.icon || '📈'}</span>
                            <h4 class="font-semibold">${stock.symbol}</h4>
                            <span class="text-xs">${stock.flag || '🌐'}</span>
                        </div>
                        <span class="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full">
                            ${Math.abs(stock.changePercent) > 5 ? '🔥 Volátil' : 'Ação'}
                        </span>
                    </div>
                    <p class="text-sm text-gray-600 dark:text-gray-400 mb-2 truncate">${stock.name}</p>
                    <div class="flex items-center justify-between">
                        <span class="text-lg font-bold price-display">
                            ${this.formatPrice(stock.price, stock.symbol)}
                        </span>
                        <span class="flex items-center change-display ${stock.changePercent >= 0 ? 'text-green-600' : 'text-red-600'}">
                            <ion-icon name="${stock.changePercent >= 0 ? 'trending-up-outline' : 'trending-down-outline'}" class="mr-1"></ion-icon>
                            ${stock.changePercent >= 0 ? '+' : ''}${stock.changePercent.toFixed(2)}%
                        </span>
                    </div>
                    <div class="mt-2 text-xs text-gray-400">
                        ${stock.changePercent > 3 ? '📈 Maior alta do dia' : 
                          stock.changePercent < -3 ? '📉 Maior baixa do dia' : 
                          stock.changePercent > 0 ? '⬆️ Em alta' : '⬇️ Em baixa'}
                    </div>
                </div>
            `).join('');

            // Configurar streaming para atualizações em tempo real
            trendingStocks.forEach(stock => {
                window.FinnhubAPI.subscribe(stock.symbol, (update) => {
                    this.updateStockCard(stock.symbol, update);
                });
            });

        } catch (error) {
            console.error('Erro ao renderizar ações em destaque:', error);
            container.innerHTML = '<p class="text-gray-500 dark:text-gray-400 text-center">Erro ao carregar dados das ações</p>';
        }
    }

    updateStockCard(symbol, update) {
        const stockCards = document.querySelectorAll(`[data-symbol="${symbol}"]`);
        stockCards.forEach(card => {
            const priceElement = card.querySelector('.price-display');
            const changeElement = card.querySelector('.change-display');
            
            if (priceElement && update.price) {
                // Animação de mudança de preço
                priceElement.style.transition = 'all 0.5s ease';
                priceElement.style.transform = 'scale(1.05)';
                priceElement.style.backgroundColor = update.price > parseFloat(priceElement.textContent.replace(/[^\d.]/g, '')) ? '#10B981' : '#EF4444';
                priceElement.style.color = 'white';
                priceElement.textContent = this.formatPrice(update.price, symbol);
                
                setTimeout(() => {
                    priceElement.style.transform = 'scale(1)';
                    priceElement.style.backgroundColor = 'transparent';
                    priceElement.style.color = '';
                }, 1000);
            }
        });
    }

    async renderCryptoData() {
        const container = document.getElementById('crypto-data');
        if (!container) return;

        try {
            // Usar API Finnhub para obter criptomoedas em destaque baseadas na performance
            const trendingAssets = await window.FinnhubAPI.getTrendingAssets(12);
            
            // Filtrar apenas criptomoedas
            const trendingCrypto = trendingAssets.filter(asset => 
                asset.type === 'crypto' || asset.symbol.includes('USDT') || asset.symbol.includes('BTC') || asset.symbol.includes('ETH')
            ).slice(0, 6);
            
            if (trendingCrypto.length === 0) {
                container.innerHTML = '<p class="text-gray-500 dark:text-gray-400 text-center">Carregando criptomoedas em destaque...</p>';
                return;
            }
            
            container.innerHTML = trendingCrypto.map(crypto => `
                <div class="card bg-card-light dark:bg-card-dark rounded-lg p-4 hover-lift" data-symbol="${crypto.symbol}">
                    <div class="flex items-center justify-between mb-2">
                        <div class="flex items-center space-x-2">
                            <span class="text-lg">${crypto.icon || '🪙'}</span>
                            <h4 class="font-semibold">${crypto.symbol.replace('BINANCE:', '').replace('USDT', '')}</h4>
                            <span class="text-xs">${crypto.flag || '🌐'}</span>
                        </div>
                        <span class="text-xs px-2 py-1 bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 rounded-full">
                            ${Math.abs(crypto.changePercent) > 10 ? '🔥 Volátil' : 'Crypto'}
                        </span>
                    </div>
                    <p class="text-sm text-gray-600 dark:text-gray-400 mb-2 truncate">${crypto.name}</p>
                    <div class="flex items-center justify-between">
                        <span class="text-lg font-bold price-display">
                            ${this.formatPrice(crypto.price, crypto.symbol)}
                        </span>
                        <span class="flex items-center change-display ${crypto.changePercent >= 0 ? 'text-green-600' : 'text-red-600'}">
                            <ion-icon name="${crypto.changePercent >= 0 ? 'trending-up-outline' : 'trending-down-outline'}" class="mr-1"></ion-icon>
                            ${crypto.changePercent >= 0 ? '+' : ''}${crypto.changePercent.toFixed(2)}%
                        </span>
                    </div>
                    <div class="mt-2 text-xs text-gray-400">
                        ${crypto.changePercent > 5 ? '🚀 Maior alta do dia' : 
                          crypto.changePercent < -5 ? '💥 Maior baixa do dia' : 
                          crypto.changePercent > 0 ? '⬆️ Em alta' : '⬇️ Em baixa'}
                    </div>
                </div>
            `).join('');

            // Configurar streaming para atualizações em tempo real
            trendingCrypto.forEach(crypto => {
                window.FinnhubAPI.subscribe(crypto.symbol, (update) => {
                    this.updateStockCard(crypto.symbol, update);
                });
            });

        } catch (error) {
            console.error('Erro ao renderizar criptomoedas em destaque:', error);
            container.innerHTML = '<p class="text-gray-500 dark:text-gray-400 text-center">Erro ao carregar dados das criptomoedas</p>';
        }
    }

    async renderNewsData() {
        const container = document.getElementById('news-data');
        if (!container) return;

        try {
            // Usar API Finnhub para obter notícias em tempo real
            const marketNews = await window.FinnhubAPI.getMarketNews('general');
            
            if (marketNews.length === 0) {
                container.innerHTML = '<p class="text-gray-500 dark:text-gray-400 text-center">Carregando últimas notícias...</p>';
                return;
            }
            
            container.innerHTML = marketNews.slice(0, 8).map(news => `
                <div class="card bg-card-light dark:bg-card-dark rounded-lg p-4 hover-lift cursor-pointer" onclick="window.open('${news.url}', '_blank')">
                    <div class="flex items-start space-x-3">
                        <img src="${news.image || 'https://via.placeholder.com/60x60/4F46E5/FFFFFF?text=📰'}" alt="News" class="w-12 h-12 rounded-lg object-cover flex-shrink-0" onerror="this.src='https://via.placeholder.com/60x60/4F46E5/FFFFFF?text=📰'">
                        <div class="flex-1 min-w-0">
                            <h4 class="font-semibold text-sm mb-1 line-clamp-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">${news.title}</h4>
                            <p class="text-xs text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">${news.summary || 'Clique para ler a notícia completa...'}</p>
                            <div class="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                                <span class="flex items-center">
                                    <span class="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse"></span>
                                    ${news.source}
                                </span>
                                <span>${this.formatNewsDate(news.publishedAt)}</span>
                            </div>
                            <div class="mt-1">
                                <span class="inline-block px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full">
                                    ${news.category || 'Mercado'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            `).join('');

            // Atualizar notícias a cada 5 minutos
            setTimeout(() => {
                this.renderNewsData();
            }, 300000); // 5 minutos

        } catch (error) {
            console.error('Erro ao renderizar notícias:', error);
            container.innerHTML = '<p class="text-gray-500 dark:text-gray-400 text-center">Erro ao carregar notícias</p>';
        }
    }

    formatNewsDate(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
        
        if (diffInHours < 1) {
            const diffInMinutes = Math.floor((now - date) / (1000 * 60));
            return `${diffInMinutes}min atrás`;
        } else if (diffInHours < 24) {
            return `${diffInHours}h atrás`;
        } else {
            return date.toLocaleDateString('pt-BR', { 
                day: '2-digit', 
                month: '2-digit',
                hour: '2-digit',
                minute: '2-digit'
            });
        }
    }

    updateMarquee() {
        const marqueeContainers = document.querySelectorAll('.marquee-content');
        if (!marqueeContainers.length) return;

        // Combinar dados de ações e crypto para o marquee
        const allAssets = [...this.marketData.trending, ...this.marketData.crypto];
        
        const marqueeHTML = allAssets.map(asset => {
            const changeClass = asset.change24h >= 0 ? 'text-green-500' : 'text-red-500';
            const flag = asset.type === 'crypto' ? '🌐' : '🇺🇸';
            
            return `
                <div class="flex items-center space-x-2">
                    <span>${flag}</span>
                    <span class="font-semibold">${asset.symbol}</span>
                    <span class="text-sm">$${asset.currentPrice.toLocaleString()}</span>
                    <span class="text-sm ${changeClass}">${asset.change24h >= 0 ? '+' : ''}${asset.change24h.toFixed(2)}%</span>
                </div>
            `;
        }).join('');

        marqueeContainers.forEach(container => {
            container.innerHTML = marqueeHTML;
        });
    }

    setupLearnSection() {
        // Event listeners para as abas da seção educacional
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('learn-tab-btn')) {
                const tabId = e.target.dataset.tab;
                this.switchLearnTab(tabId);
            }
        });
    }

    switchLearnTab(tabId) {
        // Atualizar botões ativos
        document.querySelectorAll('.learn-tab-btn').forEach(btn => {
            if (btn.dataset.tab === tabId) {
                btn.classList.add('active');
                btn.classList.remove('text-gray-500', 'border-transparent');
                btn.classList.add('text-primary-light', 'dark:text-primary-dark', 'border-primary-light', 'dark:border-primary-dark');
            } else {
                btn.classList.remove('active');
                btn.classList.add('text-gray-500', 'border-transparent');
                btn.classList.remove('text-primary-light', 'dark:text-primary-dark', 'border-primary-light', 'dark:border-primary-dark');
            }
        });

        // Carregar conteúdo da aba
        this.loadLearnTabContent(tabId);
    }

    loadLearnTabContent(tabId) {
        const container = document.getElementById('learn-tab-content');
        if (!container) return;

        switch (tabId) {
            case 'educacao':
                container.innerHTML = this.getEducationContent();
                break;
            case 'calculadoras':
                container.innerHTML = this.getCalculatorsContent();
                this.setupCalculators();
                break;
            case 'planilhas':
                container.innerHTML = this.getSpreadsheetsContent();
                break;
            case 'imposto-renda':
                container.innerHTML = this.getTaxContent();
                break;
        }
    }

    renderLearnSection() {
        // Carregar conteúdo inicial da aba educação
        this.loadLearnTabContent('educacao');
    }

    setupAlertsSystem() {
        // Configurar sistema de alertas
        this.loadUserAlerts();
        this.checkAlerts();
        
        // Verificar alertas a cada 5 minutos
        setInterval(() => {
            this.checkAlerts();
        }, 5 * 60 * 1000);
    }

    loadUserAlerts() {
        const user = window.AuthManager.getCurrentUser();
        if (!user) return;

        const saved = localStorage.getItem(`alerts_${user.id}`);
        this.userAlerts = saved ? JSON.parse(saved) : [];
    }

    async checkAlerts() {
        // Implementar lógica de verificação de alertas
        // Por enquanto, simular alguns alertas
        const alertsCount = Math.floor(Math.random() * 5);
        this.updateAlertsIndicator(alertsCount);
    }

    updateAlertsIndicator(count) {
        const badge = document.getElementById('alerts-badge');
        if (!badge) return;

        if (count > 0) {
            badge.textContent = count;
            badge.classList.remove('hidden');
        } else {
            badge.classList.add('hidden');
        }
    }

    startAutoUpdates() {
        // Inicializar ticker imediatamente
        this.initializeTicker();
        
        // Atualizar ticker a cada 3 segundos para simular tempo real
        setInterval(() => {
            this.updateTicker();
        }, 3000);

        // Atualizar dados do mercado a cada 5 minutos
        setInterval(async () => {
            await this.loadMarketData();
            if (this.currentView === 'dashboard') {
                await this.renderMarketOverview();
            }
        }, 5 * 60 * 1000);

        // Verificar alertas a cada minuto
        setInterval(() => {
            this.checkAlerts();
        }, 60 * 1000);
    }

    initializeTicker() {
        const tickerContent = document.getElementById('ticker-content');
        const tickerClone = document.getElementById('ticker-content-clone');
        
        if (!tickerContent || !tickerClone) return;

        // Obter dados do ticker
        const tickerData = window.FinancialAPI.getTickerData();
        
        // Gerar HTML do ticker
        const tickerHTML = this.generateTickerHTML(tickerData);
        
        // Aplicar ao conteúdo principal e clone
        tickerContent.innerHTML = tickerHTML;
        tickerClone.innerHTML = tickerHTML;
    }

    updateTicker() {
        const tickerContent = document.getElementById('ticker-content');
        const tickerClone = document.getElementById('ticker-content-clone');
        
        if (!tickerContent || !tickerClone) return;

        // Obter novos dados
        const tickerData = window.FinancialAPI.getTickerData();
        
        // Atualizar apenas os preços e variações, mantendo a estrutura
        tickerData.forEach((asset, index) => {
            const priceElements = document.querySelectorAll(`[data-symbol="${asset.symbol}"] .asset-price`);
            const changeElements = document.querySelectorAll(`[data-symbol="${asset.symbol}"] .asset-change`);
            
            priceElements.forEach(priceEl => {
                if (priceEl) {
                    const oldPrice = parseFloat(priceEl.textContent.replace(/[^\d.-]/g, ''));
                    const newPrice = asset.currentPrice;
                    
                    priceEl.textContent = asset.formattedPrice;
                    
                    // Animação de mudança de preço
                    if (newPrice > oldPrice) {
                        priceEl.classList.add('price-up');
                        setTimeout(() => priceEl.classList.remove('price-up'), 1000);
                    } else if (newPrice < oldPrice) {
                        priceEl.classList.add('price-down');
                        setTimeout(() => priceEl.classList.remove('price-down'), 1000);
                    }
                }
            });
            
            changeElements.forEach(changeEl => {
                if (changeEl) {
                    changeEl.textContent = asset.formattedChange;
                    changeEl.className = `asset-change ${asset.isPositive ? 'text-green-600' : 'text-red-600'}`;
                }
            });
        });
    }

    generateTickerHTML(tickerData) {
        return tickerData.map(asset => `
            <div class="flex items-center space-x-2 px-4 py-1 bg-white/50 dark:bg-gray-800/50 rounded-lg backdrop-blur-sm" data-symbol="${asset.symbol}">
                <span class="text-lg">${asset.flag}</span>
                <span class="font-semibold text-gray-900 dark:text-white">${asset.symbol}</span>
                <span class="asset-price font-medium text-gray-700 dark:text-gray-300">${asset.formattedPrice}</span>
                <span class="asset-change text-sm font-medium ${asset.isPositive ? 'text-green-600' : 'text-red-600'}">${asset.formattedChange}</span>
            </div>
        `).join('');
    }

    // Métodos auxiliares
    periodToDays(period) {
        const mapping = {
            '1D': 1,
            '1W': 7,
            '1M': 30,
            '3M': 90,
            '6M': 180,
            '1Y': 365,
            '5Y': 1825
        };
        return mapping[period] || 30;
    }

    showAlert(message, type = 'info') {
        if (window.AuthManager) {
            window.AuthManager.showAlert(message, type);
        }
    }

    // Conteúdo educacional detalhado
    getEducationContent() {
        return `
            <div class="space-y-8">
                <!-- Seções Principais -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div class="card bg-card-light dark:bg-card-dark rounded-lg p-6 cursor-pointer hover:shadow-lg transition-shadow" onclick="window.FinanceApp.showEducationDetail('renda-variavel')">
                        <div class="text-center mb-4">
                            <ion-icon name="trending-up-outline" class="text-4xl text-blue-500 mb-2"></ion-icon>
                            <h3 class="text-lg font-semibold">Renda Variável</h3>
                        </div>
                        <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
                            Aprenda sobre ações, fundos imobiliários e outros investimentos de renda variável.
                        </p>
                        <ul class="text-sm space-y-2">
                            <li>• Como funcionam as ações</li>
                            <li>• Análise fundamentalista</li>
                            <li>• Diversificação de carteira</li>
                            <li>• Fundos imobiliários (FIIs)</li>
                        </ul>
                        <div class="mt-4 text-center">
                            <span class="text-blue-500 text-sm font-medium">Clique para saber mais →</span>
                        </div>
                    </div>
                    
                    <div class="card bg-card-light dark:bg-card-dark rounded-lg p-6 cursor-pointer hover:shadow-lg transition-shadow" onclick="window.FinanceApp.showEducationDetail('renda-fixa')">
                        <div class="text-center mb-4">
                            <ion-icon name="shield-checkmark-outline" class="text-4xl text-green-500 mb-2"></ion-icon>
                            <h3 class="text-lg font-semibold">Renda Fixa</h3>
                        </div>
                        <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
                            Entenda os investimentos de renda fixa e como eles podem compor sua carteira.
                        </p>
                        <ul class="text-sm space-y-2">
                            <li>• Tesouro Direto</li>
                            <li>• CDBs e LCIs</li>
                            <li>• Debêntures</li>
                            <li>• Fundos de renda fixa</li>
                        </ul>
                        <div class="mt-4 text-center">
                            <span class="text-green-500 text-sm font-medium">Clique para saber mais →</span>
                        </div>
                    </div>
                    
                    <div class="card bg-card-light dark:bg-card-dark rounded-lg p-6 cursor-pointer hover:shadow-lg transition-shadow" onclick="window.FinanceApp.showEducationDetail('criptomoedas')">
                        <div class="text-center mb-4">
                            <ion-icon name="logo-bitcoin" class="text-4xl text-orange-500 mb-2"></ion-icon>
                            <h3 class="text-lg font-semibold">Criptomoedas</h3>
                        </div>
                        <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
                            Descubra o mundo das criptomoedas e blockchain de forma segura.
                        </p>
                        <ul class="text-sm space-y-2">
                            <li>• O que é blockchain</li>
                            <li>• Bitcoin e Ethereum</li>
                            <li>• DeFi e NFTs</li>
                            <li>• Segurança em crypto</li>
                        </ul>
                        <div class="mt-4 text-center">
                            <span class="text-orange-500 text-sm font-medium">Clique para saber mais →</span>
                        </div>
                    </div>
                </div>

                <!-- Área de Conteúdo Detalhado -->
                <div id="education-detail" class="hidden">
                    <div class="flex items-center justify-between mb-6">
                        <h2 id="education-detail-title" class="text-2xl font-bold"></h2>
                        <button onclick="window.FinanceApp.hideEducationDetail()" class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                            <ion-icon name="close-outline" class="text-2xl"></ion-icon>
                        </button>
                    </div>
                    <div id="education-detail-content" class="prose dark:prose-invert max-w-none">
                        <!-- Conteúdo será carregado dinamicamente -->
                    </div>
                </div>
            </div>
        `;
    }

    showEducationDetail(topic) {
        const detailDiv = document.getElementById('education-detail');
        const titleEl = document.getElementById('education-detail-title');
        const contentEl = document.getElementById('education-detail-content');
        
        const content = this.getEducationDetailContent(topic);
        titleEl.textContent = content.title;
        contentEl.innerHTML = content.html;
        
        detailDiv.classList.remove('hidden');
        detailDiv.scrollIntoView({ behavior: 'smooth' });
    }

    hideEducationDetail() {
        const detailDiv = document.getElementById('education-detail');
        detailDiv.classList.add('hidden');
    }

    getEducationDetailContent(topic) {
        const contents = {
            'renda-variavel': {
                title: 'Renda Variável - Guia Completo',
                html: `
                    <div class="space-y-8">
                        <div class="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
                            <h3 class="text-xl font-semibold mb-4 flex items-center">
                                <ion-icon name="trending-up-outline" class="text-2xl mr-2 text-blue-500"></ion-icon>
                                Como funcionam as ações
                            </h3>
                            <p class="mb-4">As ações representam pequenas partes de uma empresa. Quando você compra uma ação, você se torna sócio da empresa e tem direito a uma parcela dos lucros e do patrimônio.</p>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div class="bg-white dark:bg-gray-800 p-4 rounded-lg">
                                    <h4 class="font-semibold mb-2">📈 Ações Ordinárias (ON)</h4>
                                    <p class="text-sm">Dão direito a voto nas assembleias da empresa. Terminam com 3 (ex: PETR3).</p>
                                </div>
                                <div class="bg-white dark:bg-gray-800 p-4 rounded-lg">
                                    <h4 class="font-semibold mb-2">💰 Ações Preferenciais (PN)</h4>
                                    <p class="text-sm">Têm preferência no recebimento de dividendos. Terminam com 4 (ex: PETR4).</p>
                                </div>
                            </div>
                        </div>

                        <div class="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
                            <h3 class="text-xl font-semibold mb-4 flex items-center">
                                <ion-icon name="analytics-outline" class="text-2xl mr-2 text-green-500"></ion-icon>
                                Análise Fundamentalista
                            </h3>
                            <p class="mb-4">A análise fundamentalista estuda os fundamentos da empresa para determinar seu valor intrínseco.</p>
                            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div class="bg-white dark:bg-gray-800 p-4 rounded-lg">
                                    <h4 class="font-semibold mb-2">📊 Indicadores Financeiros</h4>
                                    <ul class="text-sm space-y-1">
                                        <li>• P/L (Preço/Lucro)</li>
                                        <li>• ROE (Return on Equity)</li>
                                        <li>• Dividend Yield</li>
                                        <li>• P/VPA (Preço/Valor Patrimonial)</li>
                                    </ul>
                                </div>
                                <div class="bg-white dark:bg-gray-800 p-4 rounded-lg">
                                    <h4 class="font-semibold mb-2">🏢 Análise Setorial</h4>
                                    <ul class="text-sm space-y-1">
                                        <li>• Posição no mercado</li>
                                        <li>• Concorrência</li>
                                        <li>• Tendências do setor</li>
                                        <li>• Regulamentação</li>
                                    </ul>
                                </div>
                                <div class="bg-white dark:bg-gray-800 p-4 rounded-lg">
                                    <h4 class="font-semibold mb-2">📈 Análise Macroeconômica</h4>
                                    <ul class="text-sm space-y-1">
                                        <li>• Taxa de juros</li>
                                        <li>• Inflação</li>
                                        <li>• PIB</li>
                                        <li>• Câmbio</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div class="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg">
                            <h3 class="text-xl font-semibold mb-4 flex items-center">
                                <ion-icon name="pie-chart-outline" class="text-2xl mr-2 text-purple-500"></ion-icon>
                                Diversificação de Carteira
                            </h3>
                            <p class="mb-4">A diversificação é fundamental para reduzir riscos. Não coloque todos os ovos na mesma cesta!</p>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div class="bg-white dark:bg-gray-800 p-4 rounded-lg">
                                    <h4 class="font-semibold mb-2">🎯 Por Setor</h4>
                                    <p class="text-sm mb-2">Distribua investimentos entre diferentes setores:</p>
                                    <ul class="text-sm space-y-1">
                                        <li>• Bancos e Financeiro</li>
                                        <li>• Tecnologia</li>
                                        <li>• Commodities</li>
                                        <li>• Consumo</li>
                                        <li>• Utilities</li>
                                    </ul>
                                </div>
                                <div class="bg-white dark:bg-gray-800 p-4 rounded-lg">
                                    <h4 class="font-semibold mb-2">🌍 Por Geografia</h4>
                                    <p class="text-sm mb-2">Invista em diferentes mercados:</p>
                                    <ul class="text-sm space-y-1">
                                        <li>• Ações brasileiras</li>
                                        <li>• Ações americanas</li>
                                        <li>• Mercados emergentes</li>
                                        <li>• ETFs internacionais</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div class="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-lg">
                            <h3 class="text-xl font-semibold mb-4 flex items-center">
                                <ion-icon name="business-outline" class="text-2xl mr-2 text-orange-500"></ion-icon>
                                Fundos Imobiliários (FIIs)
                            </h3>
                            <p class="mb-4">Os FIIs permitem investir no mercado imobiliário sem precisar comprar um imóvel físico.</p>
                            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div class="bg-white dark:bg-gray-800 p-4 rounded-lg">
                                    <h4 class="font-semibold mb-2">🏢 FIIs de Tijolo</h4>
                                    <p class="text-sm">Investem em imóveis físicos como shopping centers, escritórios e galpões logísticos.</p>
                                </div>
                                <div class="bg-white dark:bg-gray-800 p-4 rounded-lg">
                                    <h4 class="font-semibold mb-2">📋 FIIs de Papel</h4>
                                    <p class="text-sm">Investem em títulos do mercado imobiliário como CRIs e LCIs.</p>
                                </div>
                                <div class="bg-white dark:bg-gray-800 p-4 rounded-lg">
                                    <h4 class="font-semibold mb-2">🔄 FIIs de Fundos</h4>
                                    <p class="text-sm">Investem em cotas de outros fundos imobiliários.</p>
                                </div>
                            </div>
                            <div class="mt-4 p-4 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                                <h4 class="font-semibold mb-2">💡 Vantagens dos FIIs</h4>
                                <ul class="text-sm space-y-1">
                                    <li>• Distribuição mensal de rendimentos</li>
                                    <li>• Isenção de IR para pessoa física</li>
                                    <li>• Liquidez na bolsa de valores</li>
                                    <li>• Gestão profissional</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                `
            },
            'renda-fixa': {
                title: 'Renda Fixa - Guia Completo',
                html: `
                    <div class="space-y-8">
                        <div class="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
                            <h3 class="text-xl font-semibold mb-4 flex items-center">
                                <ion-icon name="shield-checkmark-outline" class="text-2xl mr-2 text-green-500"></ion-icon>
                                O que é Renda Fixa?
                            </h3>
                            <p class="mb-4">Renda fixa são investimentos onde você empresta dinheiro e recebe de volta com juros. O rendimento é previsível e menos arriscado que a renda variável.</p>
                            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div class="bg-white dark:bg-gray-800 p-4 rounded-lg">
                                    <h4 class="font-semibold mb-2">📈 Pré-fixado</h4>
                                    <p class="text-sm">Taxa de juros definida no momento da aplicação. Você sabe exatamente quanto vai receber.</p>
                                </div>
                                <div class="bg-white dark:bg-gray-800 p-4 rounded-lg">
                                    <h4 class="font-semibold mb-2">📊 Pós-fixado</h4>
                                    <p class="text-sm">Rendimento varia conforme um indicador (CDI, SELIC). Mais comum no Brasil.</p>
                                </div>
                                <div class="bg-white dark:bg-gray-800 p-4 rounded-lg">
                                    <h4 class="font-semibold mb-2">🔄 Híbrido</h4>
                                    <p class="text-sm">Combina taxa fixa + indicador variável (ex: IPCA + 5% ao ano).</p>
                                </div>
                            </div>
                        </div>

                        <div class="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
                            <h3 class="text-xl font-semibold mb-4 flex items-center">
                                <ion-icon name="library-outline" class="text-2xl mr-2 text-blue-500"></ion-icon>
                                Tesouro Direto
                            </h3>
                            <p class="mb-4">Títulos públicos emitidos pelo governo federal. São os investimentos mais seguros do país.</p>
                            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div class="bg-white dark:bg-gray-800 p-4 rounded-lg">
                                    <h4 class="font-semibold mb-2">🏛️ Tesouro Selic</h4>
                                    <p class="text-sm mb-2">Rende 100% da taxa Selic. Ideal para reserva de emergência.</p>
                                    <ul class="text-xs space-y-1">
                                        <li>• Baixo risco</li>
                                        <li>• Liquidez diária</li>
                                        <li>• Não perde valor</li>
                                    </ul>
                                </div>
                                <div class="bg-white dark:bg-gray-800 p-4 rounded-lg">
                                    <h4 class="font-semibold mb-2">📈 Tesouro Prefixado</h4>
                                    <p class="text-sm mb-2">Taxa fixa definida na compra. Bom quando juros vão cair.</p>
                                    <ul class="text-xs space-y-1">
                                        <li>• Rendimento conhecido</li>
                                        <li>• Pode ter marcação a mercado</li>
                                        <li>• Vários vencimentos</li>
                                    </ul>
                                </div>
                                <div class="bg-white dark:bg-gray-800 p-4 rounded-lg">
                                    <h4 class="font-semibold mb-2">🛡️ Tesouro IPCA+</h4>
                                    <p class="text-sm mb-2">Protege da inflação + taxa real de juros.</p>
                                    <ul class="text-xs space-y-1">
                                        <li>• Proteção inflacionária</li>
                                        <li>• Ganho real garantido</li>
                                        <li>• Longo prazo</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div class="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg">
                            <h3 class="text-xl font-semibold mb-4 flex items-center">
                                <ion-icon name="card-outline" class="text-2xl mr-2 text-purple-500"></ion-icon>
                                CDBs e LCIs/LCAs
                            </h3>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div class="bg-white dark:bg-gray-800 p-4 rounded-lg">
                                    <h4 class="font-semibold mb-2">🏦 CDB - Certificado de Depósito Bancário</h4>
                                    <p class="text-sm mb-2">Você empresta dinheiro para o banco e recebe juros.</p>
                                    <ul class="text-xs space-y-1">
                                        <li>• Garantia do FGC até R$ 250 mil</li>
                                        <li>• Vários prazos e taxas</li>
                                        <li>• IR regressivo</li>
                                        <li>• Liquidez variável</li>
                                    </ul>
                                </div>
                                <div class="bg-white dark:bg-gray-800 p-4 rounded-lg">
                                    <h4 class="font-semibold mb-2">🏠 LCI/LCA</h4>
                                    <p class="text-sm mb-2">Letras de Crédito Imobiliário/Agronegócio. Isentas de IR.</p>
                                    <ul class="text-xs space-y-1">
                                        <li>• Isenção total de IR</li>
                                        <li>• Garantia do FGC</li>
                                        <li>• Carência de 90 dias</li>
                                        <li>• Taxas menores que CDB</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div class="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg">
                            <h3 class="text-xl font-semibold mb-4 flex items-center">
                                <ion-icon name="document-text-outline" class="text-2xl mr-2 text-red-500"></ion-icon>
                                Debêntures
                            </h3>
                            <p class="mb-4">Títulos de dívida emitidos por empresas para captar recursos.</p>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div class="bg-white dark:bg-gray-800 p-4 rounded-lg">
                                    <h4 class="font-semibold mb-2">💼 Debêntures Comuns</h4>
                                    <ul class="text-sm space-y-1">
                                        <li>• Emitidas por empresas</li>
                                        <li>• Maior risco que títulos públicos</li>
                                        <li>• Rentabilidade mais alta</li>
                                        <li>• IR regressivo</li>
                                    </ul>
                                </div>
                                <div class="bg-white dark:bg-gray-800 p-4 rounded-lg">
                                    <h4 class="font-semibold mb-2">🌱 Debêntures Incentivadas</h4>
                                    <ul class="text-sm space-y-1">
                                        <li>• Projetos de infraestrutura</li>
                                        <li>• Isenção de IR</li>
                                        <li>• Prazo mais longo</li>
                                        <li>• Impacto social/ambiental</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div class="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg">
                            <h3 class="text-xl font-semibold mb-4 flex items-center">
                                <ion-icon name="albums-outline" class="text-2xl mr-2 text-yellow-600"></ion-icon>
                                Fundos de Renda Fixa
                            </h3>
                            <p class="mb-4">Fundos que investem em títulos de renda fixa. Gestão profissional e diversificação.</p>
                            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div class="bg-white dark:bg-gray-800 p-4 rounded-lg">
                                    <h4 class="font-semibold mb-2">🏦 DI</h4>
                                    <p class="text-sm">Investem em títulos pós-fixados. Baixo risco e boa liquidez.</p>
                                </div>
                                <div class="bg-white dark:bg-gray-800 p-4 rounded-lg">
                                    <h4 class="font-semibold mb-2">📊 Multimercado</h4>
                                    <p class="text-sm">Maior flexibilidade de investimento. Podem usar derivativos.</p>
                                </div>
                                <div class="bg-white dark:bg-gray-800 p-4 rounded-lg">
                                    <h4 class="font-semibold mb-2">🎯 Crédito Privado</h4>
                                    <p class="text-sm">Investem em títulos de empresas. Maior risco e retorno.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                `
            },
            'criptomoedas': {
                title: 'Criptomoedas - Guia Completo',
                html: `
                    <div class="space-y-8">
                        <div class="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-lg">
                            <h3 class="text-xl font-semibold mb-4 flex items-center">
                                <ion-icon name="cube-outline" class="text-2xl mr-2 text-orange-500"></ion-icon>
                                O que é Blockchain?
                            </h3>
                            <p class="mb-4">Blockchain é uma tecnologia de registro distribuído que mantém uma lista crescente de registros (blocos) ligados e protegidos usando criptografia.</p>
                            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div class="bg-white dark:bg-gray-800 p-4 rounded-lg">
                                    <h4 class="font-semibold mb-2">🔗 Descentralização</h4>
                                    <p class="text-sm">Não há uma autoridade central. A rede é mantida por milhares de computadores.</p>
                                </div>
                                <div class="bg-white dark:bg-gray-800 p-4 rounded-lg">
                                    <h4 class="font-semibold mb-2">🔒 Segurança</h4>
                                    <p class="text-sm">Criptografia avançada protege as transações e torna quase impossível hackear.</p>
                                </div>
                                <div class="bg-white dark:bg-gray-800 p-4 rounded-lg">
                                    <h4 class="font-semibold mb-2">👁️ Transparência</h4>
                                    <p class="text-sm">Todas as transações são públicas e podem ser verificadas por qualquer pessoa.</p>
                                </div>
                            </div>
                        </div>

                        <div class="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg">
                            <h3 class="text-xl font-semibold mb-4 flex items-center">
                                <ion-icon name="logo-bitcoin" class="text-2xl mr-2 text-yellow-600"></ion-icon>
                                Bitcoin e Ethereum
                            </h3>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div class="bg-white dark:bg-gray-800 p-4 rounded-lg">
                                    <h4 class="font-semibold mb-2 flex items-center">
                                        ₿ Bitcoin (BTC)
                                    </h4>
                                    <p class="text-sm mb-3">A primeira e maior criptomoeda do mundo. Criada em 2009 por Satoshi Nakamoto.</p>
                                    <ul class="text-xs space-y-1">
                                        <li>• <strong>Propósito:</strong> Moeda digital descentralizada</li>
                                        <li>• <strong>Limite:</strong> 21 milhões de bitcoins</li>
                                        <li>• <strong>Mineração:</strong> Proof of Work</li>
                                        <li>• <strong>Tempo de bloco:</strong> ~10 minutos</li>
                                        <li>• <strong>Uso:</strong> Reserva de valor, pagamentos</li>
                                    </ul>
                                </div>
                                <div class="bg-white dark:bg-gray-800 p-4 rounded-lg">
                                    <h4 class="font-semibold mb-2 flex items-center">
                                        Ξ Ethereum (ETH)
                                    </h4>
                                    <p class="text-sm mb-3">Plataforma para contratos inteligentes e aplicações descentralizadas (DApps).</p>
                                    <ul class="text-xs space-y-1">
                                        <li>• <strong>Propósito:</strong> Plataforma de contratos inteligentes</li>
                                        <li>• <strong>Limite:</strong> Sem limite fixo</li>
                                        <li>• <strong>Consenso:</strong> Proof of Stake (ETH 2.0)</li>
                                        <li>• <strong>Tempo de bloco:</strong> ~12 segundos</li>
                                        <li>• <strong>Uso:</strong> DeFi, NFTs, DApps</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div class="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg">
                            <h3 class="text-xl font-semibold mb-4 flex items-center">
                                <ion-icon name="swap-horizontal-outline" class="text-2xl mr-2 text-purple-500"></ion-icon>
                                DeFi e NFTs
                            </h3>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div class="bg-white dark:bg-gray-800 p-4 rounded-lg">
                                    <h4 class="font-semibold mb-2">🏦 DeFi - Finanças Descentralizadas</h4>
                                    <p class="text-sm mb-3">Serviços financeiros sem intermediários tradicionais.</p>
                                    <ul class="text-xs space-y-1">
                                        <li>• <strong>Empréstimos:</strong> Aave, Compound</li>
                                        <li>• <strong>Exchanges:</strong> Uniswap, SushiSwap</li>
                                        <li>• <strong>Staking:</strong> Ganhar recompensas</li>
                                        <li>• <strong>Yield Farming:</strong> Maximizar rendimentos</li>
                                    </ul>
                                </div>
                                <div class="bg-white dark:bg-gray-800 p-4 rounded-lg">
                                    <h4 class="font-semibold mb-2">🎨 NFTs - Tokens Não Fungíveis</h4>
                                    <p class="text-sm mb-3">Representam propriedade única de ativos digitais.</p>
                                    <ul class="text-xs space-y-1">
                                        <li>• <strong>Arte Digital:</strong> CryptoPunks, Bored Apes</li>
                                        <li>• <strong>Colecionáveis:</strong> Cards, personagens</li>
                                        <li>• <strong>Utilidade:</strong> Acesso a comunidades</li>
                                        <li>• <strong>Gaming:</strong> Itens de jogos</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div class="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg">
                            <h3 class="text-xl font-semibold mb-4 flex items-center">
                                <ion-icon name="shield-outline" class="text-2xl mr-2 text-red-500"></ion-icon>
                                Segurança em Crypto
                            </h3>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div class="bg-white dark:bg-gray-800 p-4 rounded-lg">
                                    <h4 class="font-semibold mb-2">🔐 Carteiras (Wallets)</h4>
                                    <ul class="text-sm space-y-2">
                                        <li><strong>Hot Wallets:</strong> Conectadas à internet (MetaMask, Trust Wallet)</li>
                                        <li><strong>Cold Wallets:</strong> Offline, mais seguras (Ledger, Trezor)</li>
                                        <li><strong>Paper Wallets:</strong> Chaves impressas em papel</li>
                                    </ul>
                                </div>
                                <div class="bg-white dark:bg-gray-800 p-4 rounded-lg">
                                    <h4 class="font-semibold mb-2">⚠️ Cuidados Essenciais</h4>
                                    <ul class="text-sm space-y-2">
                                        <li><strong>Seed Phrase:</strong> Nunca compartilhe suas 12/24 palavras</li>
                                        <li><strong>Phishing:</strong> Verifique sempre os URLs</li>
                                        <li><strong>2FA:</strong> Use autenticação de dois fatores</li>
                                        <li><strong>Updates:</strong> Mantenha software atualizado</li>
                                    </ul>
                                </div>
                            </div>
                            <div class="mt-4 p-4 bg-red-100 dark:bg-red-900/30 rounded-lg">
                                <h4 class="font-semibold mb-2">🚨 Regra de Ouro</h4>
                                <p class="text-sm">Nunca invista mais do que pode perder. Criptomoedas são altamente voláteis e especulativas.</p>
                            </div>
                        </div>

                        <div class="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
                            <h3 class="text-xl font-semibold mb-4 flex items-center">
                                <ion-icon name="trending-up-outline" class="text-2xl mr-2 text-blue-500"></ion-icon>
                                Como Começar a Investir
                            </h3>
                            <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <div class="bg-white dark:bg-gray-800 p-4 rounded-lg text-center">
                                    <div class="text-2xl mb-2">1️⃣</div>
                                    <h4 class="font-semibold mb-2">Estude</h4>
                                    <p class="text-xs">Entenda a tecnologia e os riscos antes de investir.</p>
                                </div>
                                <div class="bg-white dark:bg-gray-800 p-4 rounded-lg text-center">
                                    <div class="text-2xl mb-2">2️⃣</div>
                                    <h4 class="font-semibold mb-2">Exchange</h4>
                                    <p class="text-xs">Escolha uma corretora confiável (Binance, Coinbase).</p>
                                </div>
                                <div class="bg-white dark:bg-gray-800 p-4 rounded-lg text-center">
                                    <div class="text-2xl mb-2">3️⃣</div>
                                    <h4 class="font-semibold mb-2">Comece Pequeno</h4>
                                    <p class="text-xs">Invista apenas uma pequena parte do seu patrimônio.</p>
                                </div>
                                <div class="bg-white dark:bg-gray-800 p-4 rounded-lg text-center">
                                    <div class="text-2xl mb-2">4️⃣</div>
                                    <h4 class="font-semibold mb-2">Diversifique</h4>
                                    <p class="text-xs">Não coloque tudo em uma única criptomoeda.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                `
            }
        };
        
        return contents[topic] || { title: 'Conteúdo não encontrado', html: '<p>Conteúdo em desenvolvimento.</p>' };
    }

    getCalculatorsContent() {
        return `
            <div class="space-y-8">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <!-- Calculadora de Juros Compostos -->
                    <div class="card bg-card-light dark:bg-card-dark rounded-lg p-6">
                        <h3 class="text-xl font-semibold mb-4">Calculadora de Juros Compostos</h3>
                        <div class="space-y-4">
                            <div>
                                <label class="block text-sm font-medium mb-1">Valor Inicial (R$)</label>
                                <input type="number" id="compound-initial" class="w-full p-2 border rounded-lg" placeholder="10000">
                            </div>
                            <div>
                                <label class="block text-sm font-medium mb-1">Aporte Mensal (R$)</label>
                                <input type="number" id="compound-monthly" class="w-full p-2 border rounded-lg" placeholder="500">
                            </div>
                            <div>
                                <label class="block text-sm font-medium mb-1">Taxa de Juros (% ao ano)</label>
                                <input type="number" id="compound-rate" class="w-full p-2 border rounded-lg" placeholder="12" step="0.1">
                            </div>
                            <div>
                                <label class="block text-sm font-medium mb-1">Período (anos)</label>
                                <input type="number" id="compound-years" class="w-full p-2 border rounded-lg" placeholder="10">
                            </div>
                            <button onclick="window.FinanceApp.calculateCompoundInterest()" class="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
                                Calcular
                            </button>
                            <div id="compound-result" class="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hidden">
                                <!-- Resultado será exibido aqui -->
                            </div>
                        </div>
                    </div>
                    
                    <!-- Calculadora de Renda Fixa -->
                    <div class="card bg-card-light dark:bg-card-dark rounded-lg p-6">
                        <h3 class="text-xl font-semibold mb-4">Calculadora de Renda Fixa</h3>
                        <div class="space-y-4">
                            <div>
                                <label class="block text-sm font-medium mb-1">Valor do Investimento (R$)</label>
                                <input type="number" id="fixed-amount" class="w-full p-2 border rounded-lg" placeholder="10000">
                            </div>
                            <div>
                                <label class="block text-sm font-medium mb-1">Tipo de Indexação</label>
                                <select id="fixed-index" class="w-full p-2 border rounded-lg">
                                    <option value="cdi">CDI (13,65%)</option>
                                    <option value="ipca">IPCA + Taxa Fixa</option>
                                    <option value="prefixado">Pré-fixado</option>
                                </select>
                            </div>
                            <div>
                                <label class="block text-sm font-medium mb-1">Taxa (% ao ano)</label>
                                <input type="number" id="fixed-rate" class="w-full p-2 border rounded-lg" placeholder="100" step="0.1">
                            </div>
                            <div>
                                <label class="block text-sm font-medium mb-1">Período (anos)</label>
                                <input type="number" id="fixed-years" class="w-full p-2 border rounded-lg" placeholder="2">
                            </div>
                            <button onclick="window.FinanceApp.calculateFixedIncome()" class="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600">
                                Calcular
                            </button>
                            <div id="fixed-result" class="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hidden">
                                <!-- Resultado será exibido aqui -->
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Simulador de Investimentos -->
                <div class="card bg-card-light dark:bg-card-dark rounded-lg p-6">
                    <h3 class="text-xl font-semibold mb-4">Simulador de Investimentos</h3>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                            <label class="block text-sm font-medium mb-1">Perfil de Risco</label>
                            <select id="risk-profile" class="w-full p-2 border rounded-lg">
                                <option value="conservador">Conservador</option>
                                <option value="moderado">Moderado</option>
                                <option value="arrojado">Arrojado</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-medium mb-1">Valor Mensal (R$)</label>
                            <input type="number" id="sim-monthly" class="w-full p-2 border rounded-lg" placeholder="1000">
                        </div>
                        <div>
                            <label class="block text-sm font-medium mb-1">Prazo (anos)</label>
                            <input type="number" id="sim-years" class="w-full p-2 border rounded-lg" placeholder="10">
                        </div>
                    </div>
                    <button onclick="window.FinanceApp.simulateInvestment()" class="bg-purple-500 text-white px-6 py-2 rounded-lg hover:bg-purple-600">
                        Simular Carteira
                    </button>
                    <div id="simulation-result" class="mt-4 hidden">
                        <!-- Resultado da simulação -->
                    </div>
                </div>
            </div>
        `;
    }

    getSpreadsheetsContent() {
        return `
            <div class="space-y-6">
                <div class="text-center mb-8">
                    <h2 class="text-2xl font-bold mb-2">Planilhas Financeiras</h2>
                    <p class="text-gray-600 dark:text-gray-400">Baixe planilhas profissionais para organizar suas finanças</p>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div class="card bg-card-light dark:bg-card-dark rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
                        <ion-icon name="document-outline" class="text-4xl text-green-500 mb-3"></ion-icon>
                        <h3 class="text-lg font-semibold mb-2">Controle de Gastos</h3>
                        <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
                            Planilha completa para controlar receitas e despesas mensais com categorização automática.
                        </p>
                        <ul class="text-xs text-left mb-4 space-y-1">
                            <li>• Categorização automática</li>
                            <li>• Gráficos de gastos por categoria</li>
                            <li>• Controle mensal e anual</li>
                            <li>• Metas de economia</li>
                        </ul>
                        <button onclick="window.FinanceApp.downloadSpreadsheet('controle-gastos')" class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors">
                            <ion-icon name="download-outline" class="mr-1"></ion-icon>
                            Download CSV
                        </button>
                    </div>
                    
                    <div class="card bg-card-light dark:bg-card-dark rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
                        <ion-icon name="calculator-outline" class="text-4xl text-blue-500 mb-3"></ion-icon>
                        <h3 class="text-lg font-semibold mb-2">Planejamento Financeiro</h3>
                        <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
                            Organize seu orçamento mensal e defina metas financeiras realistas.
                        </p>
                        <ul class="text-xs text-left mb-4 space-y-1">
                            <li>• Orçamento por categoria</li>
                            <li>• Percentual da renda</li>
                            <li>• Metas de poupança</li>
                            <li>• Acompanhamento mensal</li>
                        </ul>
                        <button onclick="window.FinanceApp.downloadSpreadsheet('planejamento-financeiro')" class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                            <ion-icon name="download-outline" class="mr-1"></ion-icon>
                            Download CSV
                        </button>
                    </div>
                    
                    <div class="card bg-card-light dark:bg-card-dark rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
                        <ion-icon name="trending-up-outline" class="text-4xl text-purple-500 mb-3"></ion-icon>
                        <h3 class="text-lg font-semibold mb-2">Controle de Investimentos</h3>
                        <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
                            Monitore a performance completa da sua carteira de investimentos.
                        </p>
                        <ul class="text-xs text-left mb-4 space-y-1">
                            <li>• Controle de compras e vendas</li>
                            <li>• Cálculo de rentabilidade</li>
                            <li>• Diversificação por setor</li>
                            <li>• Acompanhamento de dividendos</li>
                        </ul>
                        <button onclick="window.FinanceApp.downloadSpreadsheet('controle-investimentos')" class="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors">
                            <ion-icon name="download-outline" class="mr-1"></ion-icon>
                            Download CSV
                        </button>
                    </div>
                    
                    <div class="card bg-card-light dark:bg-card-dark rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
                        <ion-icon name="receipt-outline" class="text-4xl text-red-500 mb-3"></ion-icon>
                        <h3 class="text-lg font-semibold mb-2">Cálculo de Imposto de Renda</h3>
                        <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
                            Calcule o IR devido sobre seus investimentos de forma automática.
                        </p>
                        <ul class="text-xs text-left mb-4 space-y-1">
                            <li>• Cálculo automático de IR</li>
                            <li>• Separação por tipo de ativo</li>
                            <li>• Controle de isenções</li>
                            <li>• Relatório anual</li>
                        </ul>
                        <button onclick="window.FinanceApp.downloadSpreadsheet('calculo-imposto-renda')" class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors">
                            <ion-icon name="download-outline" class="mr-1"></ion-icon>
                            Download CSV
                        </button>
                    </div>
                    
                    <div class="card bg-card-light dark:bg-card-dark rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
                        <ion-icon name="cash-outline" class="text-4xl text-yellow-500 mb-3"></ion-icon>
                        <h3 class="text-lg font-semibold mb-2">Análise de Dividendos</h3>
                        <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
                            Acompanhe todos os dividendos recebidos e calcule o yield real.
                        </p>
                        <ul class="text-xs text-left mb-4 space-y-1">
                            <li>• Controle mensal de dividendos</li>
                            <li>• Cálculo de dividend yield</li>
                            <li>• Projeção de renda passiva</li>
                            <li>• Comparação de ativos</li>
                        </ul>
                        <button onclick="window.FinanceApp.downloadSpreadsheet('analise-dividendos')" class="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors">
                            <ion-icon name="download-outline" class="mr-1"></ion-icon>
                            Download CSV
                        </button>
                    </div>
                    
                    <div class="card bg-card-light dark:bg-card-dark rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
                        <ion-icon name="library-outline" class="text-4xl text-indigo-500 mb-3"></ion-icon>
                        <h3 class="text-lg font-semibold mb-2">Kit Completo</h3>
                        <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
                            Baixe todas as planilhas de uma só vez em um arquivo compactado.
                        </p>
                        <ul class="text-xs text-left mb-4 space-y-1">
                            <li>• Todas as 5 planilhas</li>
                            <li>• Guia de uso incluído</li>
                            <li>• Exemplos preenchidos</li>
                            <li>• Fórmulas explicadas</li>
                        </ul>
                        <button onclick="window.FinanceApp.downloadAllSpreadsheets()" class="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition-colors">
                            <ion-icon name="download-outline" class="mr-1"></ion-icon>
                            Download Tudo
                        </button>
                    </div>
                </div>
                
                <div class="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <h4 class="font-semibold mb-2 flex items-center">
                        <ion-icon name="information-circle-outline" class="mr-2 text-blue-500"></ion-icon>
                        Como usar as planilhas
                    </h4>
                    <ul class="text-sm space-y-1">
                        <li>• Todas as planilhas estão em formato CSV, compatível com Excel, Google Sheets e LibreOffice</li>
                        <li>• Os exemplos incluídos podem ser substituídos pelos seus dados reais</li>
                        <li>• As fórmulas já estão configuradas para cálculos automáticos</li>
                        <li>• Recomendamos fazer backup regular dos seus dados</li>
                    </ul>
                </div>
            </div>
        `;
    }

    downloadSpreadsheet(filename) {
        const spreadsheetUrls = {
            'controle-gastos': './assets/spreadsheets/controle-gastos.csv',
            'planejamento-financeiro': './assets/spreadsheets/planejamento-financeiro.csv',
            'controle-investimentos': './assets/spreadsheets/controle-investimentos.csv',
            'calculo-imposto-renda': './assets/spreadsheets/calculo-imposto-renda.csv',
            'analise-dividendos': './assets/spreadsheets/analise-dividendos.csv'
        };

        const url = spreadsheetUrls[filename];
        if (!url) {
            this.showAlert('Planilha não encontrada!', 'error');
            return;
        }

        // Criar link temporário para download
        const link = document.createElement('a');
        link.href = url;
        link.download = `${filename}.csv`;
        link.style.display = 'none';
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        this.showAlert(`Planilha "${filename}" baixada com sucesso!`, 'success');
    }

    async downloadAllSpreadsheets() {
        const spreadsheets = [
            'controle-gastos',
            'planejamento-financeiro', 
            'controle-investimentos',
            'calculo-imposto-renda',
            'analise-dividendos'
        ];

        this.showAlert('Iniciando download de todas as planilhas...', 'info');

        // Download individual de cada planilha com delay
        for (let i = 0; i < spreadsheets.length; i++) {
            setTimeout(() => {
                this.downloadSpreadsheet(spreadsheets[i]);
            }, i * 1000); // 1 segundo de delay entre downloads
        }

        setTimeout(() => {
            this.showAlert('Todas as planilhas foram baixadas!', 'success');
        }, spreadsheets.length * 1000);
    }

    getTaxContent() {
        return `
            <div class="space-y-8">
                <div class="card bg-card-light dark:bg-card-dark rounded-lg p-6">
                    <h3 class="text-xl font-semibold mb-4">Imposto de Renda sobre Investimentos</h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h4 class="font-semibold mb-3">Renda Fixa</h4>
                            <div class="space-y-2 text-sm">
                                <div class="flex justify-between">
                                    <span>Até 180 dias:</span>
                                    <span class="font-semibold">22,5%</span>
                                </div>
                                <div class="flex justify-between">
                                    <span>181 a 360 dias:</span>
                                    <span class="font-semibold">20%</span>
                                </div>
                                <div class="flex justify-between">
                                    <span>361 a 720 dias:</span>
                                    <span class="font-semibold">17,5%</span>
                                </div>
                                <div class="flex justify-between">
                                    <span>Acima de 720 dias:</span>
                                    <span class="font-semibold">15%</span>
                                </div>
                            </div>
                        </div>
                        
                        <div>
                            <h4 class="font-semibold mb-3">Renda Variável</h4>
                            <div class="space-y-2 text-sm">
                                <div class="flex justify-between">
                                    <span>Ações (vendas até R$ 20k/mês):</span>
                                    <span class="font-semibold">Isento</span>
                                </div>
                                <div class="flex justify-between">
                                    <span>Ações (vendas acima R$ 20k/mês):</span>
                                    <span class="font-semibold">15%</span>
                                </div>
                                <div class="flex justify-between">
                                    <span>FIIs:</span>
                                    <span class="font-semibold">20%</span>
                                </div>
                                <div class="flex justify-between">
                                    <span>Day Trade:</span>
                                    <span class="font-semibold">20%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="card bg-card-light dark:bg-card-dark rounded-lg p-6">
                    <h3 class="text-xl font-semibold mb-4">Calculadora de IR</h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="space-y-4">
                            <div>
                                <label class="block text-sm font-medium mb-1">Tipo de Investimento</label>
                                <select id="tax-type" class="w-full p-2 border rounded-lg">
                                    <option value="renda-fixa">Renda Fixa</option>
                                    <option value="acoes">Ações</option>
                                    <option value="fiis">FIIs</option>
                                </select>
                            </div>
                            <div>
                                <label class="block text-sm font-medium mb-1">Valor do Ganho (R$)</label>
                                <input type="number" id="tax-gain" class="w-full p-2 border rounded-lg" placeholder="5000">
                            </div>
                            <div id="tax-period-container">
                                <label class="block text-sm font-medium mb-1">Período de Aplicação (dias)</label>
                                <input type="number" id="tax-period" class="w-full p-2 border rounded-lg" placeholder="365">
                            </div>
                            <button onclick="window.FinanceApp.calculateTax()" class="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600">
                                Calcular IR
                            </button>
                        </div>
                        <div id="tax-result" class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 hidden">
                            <!-- Resultado do cálculo -->
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    renderRebalancer() {
        const container = document.getElementById('rebalancer-content');
        if (!container) return;

        container.innerHTML = `
            <div class="space-y-8">
                <div class="card bg-card-light dark:bg-card-dark rounded-lg p-6">
                    <h3 class="text-xl font-semibold mb-4 flex items-center">
                        <ion-icon name="analytics-outline" class="text-2xl mr-2 text-blue-500"></ion-icon>
                        Rebalanceador Inteligente de Carteira
                    </h3>
                    <p class="text-gray-600 dark:text-gray-400 mb-6">
                        Nossa IA analisa automaticamente seus ativos por tipo, setor, região e risco, oferecendo sugestões personalizadas de rebalanceamento.
                    </p>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label class="block text-sm font-medium mb-2">Selecionar Carteira</label>
                            <select id="rebalance-portfolio" class="w-full p-3 border rounded-lg" onchange="window.FinanceApp.analyzePortfolioWithAI()">
                                <option value="">Selecione uma carteira</option>
                                ${this.portfolios.map(p => `<option value="${p.id}">${p.name}</option>`).join('')}
                            </select>
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium mb-2">Perfil de Investidor</label>
                            <select id="investor-profile" class="w-full p-3 border rounded-lg" onchange="window.FinanceApp.updateRebalanceSuggestions()">
                                <option value="Conservative">Conservador</option>
                                <option value="Moderate" selected>Moderado</option>
                                <option value="Aggressive">Agressivo</option>
                            </select>
                        </div>
                    </div>
                    
                    <button onclick="window.FinanceApp.analyzePortfolioWithAI()" class="mt-4 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 flex items-center">
                        <ion-icon name="scan-outline" class="mr-2"></ion-icon>
                        Analisar Carteira com IA
                    </button>
                </div>

                <!-- Análise da Carteira -->
                <div id="portfolio-analysis" class="hidden">
                    <div class="card bg-card-light dark:bg-card-dark rounded-lg p-6">
                        <h3 class="text-xl font-semibold mb-4 flex items-center">
                            <ion-icon name="pie-chart-outline" class="text-2xl mr-2 text-green-500"></ion-icon>
                            Análise Inteligente da Carteira
                        </h3>
                        
                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                            <div class="text-center">
                                <div class="text-2xl font-bold text-blue-600" id="total-assets">0</div>
                                <div class="text-sm text-gray-600">Total de Ativos</div>
                            </div>
                            <div class="text-center">
                                <div class="text-2xl font-bold text-green-600" id="total-value">R$ 0</div>
                                <div class="text-sm text-gray-600">Valor Total</div>
                            </div>
                            <div class="text-center">
                                <div class="text-2xl font-bold text-purple-600" id="risk-level">Médio</div>
                                <div class="text-sm text-gray-600">Nível de Risco</div>
                            </div>
                            <div class="text-center">
                                <div class="text-2xl font-bold text-orange-600" id="diversification-score">0%</div>
                                <div class="text-sm text-gray-600">Diversificação</div>
                            </div>
                        </div>

                        <!-- Gráficos de Distribuição -->
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h4 class="font-semibold mb-3">Distribuição por Tipo</h4>
                                <div id="type-distribution" class="space-y-2">
                                    <!-- Será preenchido dinamicamente -->
                                </div>
                            </div>
                            <div>
                                <h4 class="font-semibold mb-3">Distribuição por Região</h4>
                                <div id="region-distribution" class="space-y-2">
                                    <!-- Será preenchido dinamicamente -->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Recomendações da IA -->
                <div id="ai-recommendations" class="hidden">
                    <div class="card bg-card-light dark:bg-card-dark rounded-lg p-6">
                        <h3 class="text-xl font-semibold mb-4 flex items-center">
                            <ion-icon name="bulb-outline" class="text-2xl mr-2 text-yellow-500"></ion-icon>
                            Recomendações da IA
                        </h3>
                        <div id="recommendations-list" class="space-y-3">
                            <!-- Será preenchido dinamicamente -->
                        </div>
                    </div>
                </div>

                <!-- Sugestões de Rebalanceamento -->
                <div id="rebalance-suggestions" class="hidden">
                    <div class="card bg-card-light dark:bg-card-dark rounded-lg p-6">
                        <h3 class="text-xl font-semibold mb-4 flex items-center">
                            <ion-icon name="swap-horizontal-outline" class="text-2xl mr-2 text-indigo-500"></ion-icon>
                            Sugestões de Rebalanceamento
                        </h3>
                        
                        <div class="mb-6">
                            <h4 class="font-semibold mb-3">Alocação Atual vs. Recomendada</h4>
                            <div id="allocation-comparison" class="space-y-3">
                                <!-- Será preenchido dinamicamente -->
                            </div>
                        </div>

                        <div id="rebalance-actions" class="space-y-3">
                            <!-- Ações de rebalanceamento -->
                        </div>

                        <div class="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                            <h4 class="font-semibold mb-2 flex items-center">
                                <ion-icon name="information-circle-outline" class="mr-2 text-blue-500"></ion-icon>
                                Como Rebalancear
                            </h4>
                            <ul class="text-sm space-y-1">
                                <li>• Execute as ações sugeridas gradualmente ao longo de algumas semanas</li>
                                <li>• Considere os custos de transação antes de fazer pequenos ajustes</li>
                                <li>• Aproveite novos aportes para ajustar a alocação sem vender ativos</li>
                                <li>• Revise a carteira a cada 3-6 meses ou quando houver grandes mudanças no mercado</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    analyzePortfolioWithAI() {
        const portfolioSelect = document.getElementById('rebalance-portfolio');
        const selectedPortfolioId = portfolioSelect.value;
        
        if (!selectedPortfolioId) {
            this.showAlert('Selecione uma carteira para analisar', 'warning');
            return;
        }

        const portfolio = this.portfolios.find(p => p.id === selectedPortfolioId);
        if (!portfolio) {
            this.showAlert('Carteira não encontrada', 'error');
            return;
        }

        // Converter ativos para formato esperado pela IA
        const assets = portfolio.assets.map(symbol => ({
            symbol: symbol,
            value: Math.random() * 10000 + 1000 // Simular valores para demonstração
        }));

        // Analisar com IA
        const analysis = window.AssetClassifier.analyzePortfolio(assets);
        
        // Exibir resultados
        this.displayPortfolioAnalysis(analysis);
        this.displayAIRecommendations(analysis);
        this.updateRebalanceSuggestions();
    }

    displayPortfolioAnalysis(analysis) {
        // Mostrar seção de análise
        document.getElementById('portfolio-analysis').classList.remove('hidden');
        
        // Atualizar métricas principais
        document.getElementById('total-assets').textContent = analysis.assetCount;
        document.getElementById('total-value').textContent = `R$ ${analysis.totalValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
        
        // Calcular nível de risco médio
        const riskLevels = { 'Very Low': 1, 'Low': 2, 'Medium': 3, 'High': 4, 'Very High': 5 };
        let weightedRisk = 0;
        Object.keys(analysis.byRisk).forEach(risk => {
            weightedRisk += riskLevels[risk] * (analysis.byRisk[risk].percentage / 100);
        });
        const riskLabels = ['', 'Muito Baixo', 'Baixo', 'Médio', 'Alto', 'Muito Alto'];
        document.getElementById('risk-level').textContent = riskLabels[Math.round(weightedRisk)] || 'Médio';
        
        // Calcular score de diversificação (baseado na distribuição)
        const typeCount = Object.keys(analysis.byType).length;
        const sectorCount = Object.keys(analysis.bySector).length;
        const regionCount = Object.keys(analysis.byRegion).length;
        const diversificationScore = Math.min(100, (typeCount * 20) + (sectorCount * 5) + (regionCount * 15));
        document.getElementById('diversification-score').textContent = `${diversificationScore}%`;
        
        // Exibir distribuições
        this.renderDistribution('type-distribution', analysis.byType);
        this.renderDistribution('region-distribution', analysis.byRegion);
    }

    renderDistribution(containerId, distribution) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const colors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-yellow-500', 'bg-red-500', 'bg-indigo-500'];
        let colorIndex = 0;

        container.innerHTML = Object.keys(distribution).map(key => {
            const item = distribution[key];
            const color = colors[colorIndex % colors.length];
            colorIndex++;
            
            return `
                <div class="flex items-center justify-between">
                    <div class="flex items-center">
                        <div class="w-3 h-3 ${color} rounded-full mr-2"></div>
                        <span class="text-sm">${key}</span>
                    </div>
                    <span class="text-sm font-semibold">${item.percentage.toFixed(1)}%</span>
                </div>
            `;
        }).join('');
    }

    displayAIRecommendations(analysis) {
        document.getElementById('ai-recommendations').classList.remove('hidden');
        
        const container = document.getElementById('recommendations-list');
        if (!container) return;

        const iconMap = {
            'warning': 'warning-outline',
            'suggestion': 'bulb-outline',
            'info': 'information-circle-outline'
        };

        const colorMap = {
            'high': 'text-red-500',
            'medium': 'text-yellow-500',
            'low': 'text-blue-500'
        };

        container.innerHTML = analysis.recommendations.map(rec => `
            <div class="flex items-start p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <ion-icon name="${iconMap[rec.type] || 'information-circle-outline'}" class="text-xl ${colorMap[rec.priority]} mr-3 mt-0.5"></ion-icon>
                <div class="flex-1">
                    <div class="flex items-center justify-between mb-1">
                        <span class="font-semibold text-sm">${rec.category}</span>
                        <span class="text-xs px-2 py-1 rounded-full ${rec.priority === 'high' ? 'bg-red-100 text-red-800' : rec.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'}">
                            ${rec.priority === 'high' ? 'Alta' : rec.priority === 'medium' ? 'Média' : 'Baixa'}
                        </span>
                    </div>
                    <p class="text-sm text-gray-600 dark:text-gray-400">${rec.message}</p>
                </div>
            </div>
        `).join('');
    }

    updateRebalanceSuggestions() {
        const portfolioSelect = document.getElementById('rebalance-portfolio');
        const profileSelect = document.getElementById('investor-profile');
        
        if (!portfolioSelect.value || !profileSelect.value) return;

        const portfolio = this.portfolios.find(p => p.id === portfolioSelect.value);
        if (!portfolio) return;

        const assets = portfolio.assets.map(symbol => ({
            symbol: symbol,
            value: Math.random() * 10000 + 1000
        }));

        const analysis = window.AssetClassifier.analyzePortfolio(assets);
        const rebalanceData = window.AssetClassifier.suggestRebalancing(analysis, profileSelect.value);
        
        this.displayRebalanceSuggestions(rebalanceData);
    }

    displayRebalanceSuggestions(rebalanceData) {
        document.getElementById('rebalance-suggestions').classList.remove('hidden');
        
        // Comparação de alocação
        const comparisonContainer = document.getElementById('allocation-comparison');
        if (comparisonContainer) {
            comparisonContainer.innerHTML = Object.keys(rebalanceData.targetAllocation).map(category => {
                const current = rebalanceData.currentAllocation[category] || 0;
                const target = rebalanceData.targetAllocation[category];
                const difference = target - current;
                
                return `
                    <div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <span class="font-medium">${category}</span>
                        <div class="flex items-center space-x-4">
                            <span class="text-sm">Atual: ${current.toFixed(1)}%</span>
                            <span class="text-sm">Meta: ${target}%</span>
                            <span class="text-sm font-semibold ${difference > 0 ? 'text-green-600' : difference < 0 ? 'text-red-600' : 'text-gray-600'}">
                                ${difference > 0 ? '+' : ''}${difference.toFixed(1)}%
                            </span>
                        </div>
                    </div>
                `;
            }).join('');
        }

        // Ações de rebalanceamento
        const actionsContainer = document.getElementById('rebalance-actions');
        if (actionsContainer) {
            actionsContainer.innerHTML = rebalanceData.suggestions.map(suggestion => `
                <div class="flex items-center justify-between p-3 border rounded-lg ${suggestion.action === 'increase' ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}">
                    <div class="flex items-center">
                        <ion-icon name="${suggestion.action === 'increase' ? 'arrow-up-circle-outline' : 'arrow-down-circle-outline'}" 
                                  class="text-xl ${suggestion.action === 'increase' ? 'text-green-500' : 'text-red-500'} mr-3"></ion-icon>
                        <div>
                            <div class="font-medium">${suggestion.action === 'increase' ? 'Aumentar' : 'Reduzir'} ${suggestion.category}</div>
                            <div class="text-sm text-gray-600">${suggestion.amount.toFixed(1)}% (R$ ${suggestion.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })})</div>
                        </div>
                    </div>
                    <div class="text-right">
                        <div class="text-sm font-medium">${suggestion.current.toFixed(1)}% → ${suggestion.target}%</div>
                    </div>
                </div>
            `).join('');
        }
    }

    renderAlerts() {
        const container = document.getElementById('alerts-content');
        if (!container) return;

        container.innerHTML = `
            <div class="space-y-8">
                <div class="card bg-card-light dark:bg-card-dark rounded-lg p-6">
                    <h3 class="text-xl font-semibold mb-4">Configurar Alertas</h3>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <!-- Alertas de Ativos -->
                        <div>
                            <h4 class="font-semibold mb-3">Alertas de Ativos</h4>
                            <div class="space-y-4">
                                <div>
                                    <label class="block text-sm font-medium mb-1">Ativo</label>
                                    <input type="text" id="alert-asset" class="w-full p-2 border rounded-lg" placeholder="Ex: BTC, AAPL, PETR4.SA">
                                </div>
                                <div>
                                    <label class="block text-sm font-medium mb-1">Tipo de Alerta</label>
                                    <select id="alert-type" class="w-full p-2 border rounded-lg">
                                        <option value="price-above">Preço acima de</option>
                                        <option value="price-below">Preço abaixo de</option>
                                        <option value="change-above">Variação acima de</option>
                                        <option value="change-below">Variação abaixo de</option>
                                    </select>
                                </div>
                                <div>
                                    <label class="block text-sm font-medium mb-1">Valor</label>
                                    <input type="number" id="alert-value" class="w-full p-2 border rounded-lg" placeholder="100" step="0.01">
                                </div>
                                <button onclick="window.FinanceApp.addAssetAlert()" class="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
                                    Adicionar Alerta
                                </button>
                            </div>
                        </div>
                        
                        <!-- Alertas Econômicos -->
                        <div>
                            <h4 class="font-semibold mb-3">Alertas Econômicos</h4>
                            <div class="space-y-3">
                                <label class="flex items-center">
                                    <input type="checkbox" id="alert-fed" class="mr-2">
                                    <span class="text-sm">Decisões do Federal Reserve (FED)</span>
                                </label>
                                <label class="flex items-center">
                                    <input type="checkbox" id="alert-copom" class="mr-2">
                                    <span class="text-sm">Decisões do COPOM (Banco Central)</span>
                                </label>
                                <label class="flex items-center">
                                    <input type="checkbox" id="alert-usd" class="mr-2">
                                    <span class="text-sm">Variações do Dólar (> 2%)</span>
                                </label>
                                <label class="flex items-center">
                                    <input type="checkbox" id="alert-inflation" class="mr-2">
                                    <span class="text-sm">Dados de Inflação (IPCA)</span>
                                </label>
                                <button onclick="window.FinanceApp.saveEconomicAlerts()" class="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 mt-4">
                                    Salvar Preferências
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Alertas Ativos -->
                <div class="card bg-card-light dark:bg-card-dark rounded-lg p-6">
                    <h3 class="text-xl font-semibold mb-4">Alertas Ativos</h3>
                    <div id="active-alerts-list">
                        <!-- Lista de alertas ativos -->
                    </div>
                </div>
                
                <!-- Histórico de Alertas -->
                <div class="card bg-card-light dark:bg-card-dark rounded-lg p-6">
                    <h3 class="text-xl font-semibold mb-4">Histórico de Alertas</h3>
                    <div id="alerts-history">
                        <!-- Histórico de alertas -->
                    </div>
                </div>
            </div>
        `;

        // Carregar alertas ativos e histórico
        this.loadActiveAlerts();
        this.loadAlertsHistory();
    }

    renderRebalancer() {
        const container = document.getElementById('rebalancer-content');
        if (!container) return;

        container.innerHTML = `
            <div class="space-y-8">
                <div class="card bg-card-light dark:bg-card-dark rounded-lg p-6">
                    <h3 class="text-xl font-semibold mb-4">Configurar Rebalanceamento</h3>
                    <p class="text-gray-600 dark:text-gray-400 mb-6">
                        Configure a alocação ideal da sua carteira e receba alertas quando os percentuais saírem do alvo.
                    </p>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label class="block text-sm font-medium mb-2">Selecionar Carteira</label>
                            <select id="rebalance-portfolio" class="w-full p-3 border rounded-lg">
                                <option value="">Selecione uma carteira</option>
                                ${this.portfolios.map(p => `<option value="${p.id}">${p.name}</option>`).join('')}
                            </select>
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium mb-2">Frequência de Verificação</label>
                            <select id="rebalance-frequency" class="w-full p-3 border rounded-lg">
                                <option value="30">30 dias</option>
                                <option value="60">60 dias</option>
                                <option value="90">90 dias</option>
                                <option value="365">1 ano</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="mt-6">
                        <h4 class="font-semibold mb-3">Alocação Alvo</h4>
                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div>
                                <label class="block text-sm font-medium mb-1">Ações Brasil (%)</label>
                                <input type="number" id="alloc-br-stocks" class="w-full p-2 border rounded-lg" placeholder="25" min="0" max="100">
                            </div>
                            <div>
                                <label class="block text-sm font-medium mb-1">Ações Internacionais (%)</label>
                                <input type="number" id="alloc-intl-stocks" class="w-full p-2 border rounded-lg" placeholder="25" min="0" max="100">
                            </div>
                            <div>
                                <label class="block text-sm font-medium mb-1">Renda Fixa (%)</label>
                                <input type="number" id="alloc-fixed-income" class="w-full p-2 border rounded-lg" placeholder="25" min="0" max="100">
                            </div>
                            <div>
                                <label class="block text-sm font-medium mb-1">FIIs (%)</label>
                                <input type="number" id="alloc-reits" class="w-full p-2 border rounded-lg" placeholder="25" min="0" max="100">
                            </div>
                        </div>
                        <div class="mt-2">
                            <span id="allocation-total" class="text-sm text-gray-600">Total: 0%</span>
                        </div>
                    </div>
                    
                    <button onclick="window.FinanceApp.saveRebalanceConfig()" class="mt-6 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600">
                        Salvar Configuração
                    </button>
                </div>
                
                <div id="rebalance-suggestions" class="hidden">
                    <!-- Sugestões de rebalanceamento aparecerão aqui -->
                </div>
            </div>
        `;

        // Configurar listeners para cálculo automático do total
        const allocInputs = container.querySelectorAll('input[id^="alloc-"]');
        allocInputs.forEach(input => {
            input.addEventListener('input', this.updateAllocationTotal.bind(this));
        });
    }

    renderAlerts() {
        const container = document.getElementById('alerts-content');
        if (!container) return;

        container.innerHTML = `
            <div class="space-y-8">
                <div class="card bg-card-light dark:bg-card-dark rounded-lg p-6">
                    <h3 class="text-xl font-semibold mb-4">Configurar Alertas</h3>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <!-- Alertas de Ativos -->
                        <div>
                            <h4 class="font-semibold mb-3">Alertas de Ativos</h4>
                            <div class="space-y-4">
                                <div>
                                    <label class="block text-sm font-medium mb-1">Ativo</label>
                                    <input type="text" id="alert-asset" class="w-full p-2 border rounded-lg" placeholder="Ex: BTC, AAPL, PETR4.SA">
                                </div>
                                <div>
                                    <label class="block text-sm font-medium mb-1">Tipo de Alerta</label>
                                    <select id="alert-type" class="w-full p-2 border rounded-lg">
                                        <option value="price-above">Preço acima de</option>
                                        <option value="price-below">Preço abaixo de</option>
                                        <option value="change-above">Variação acima de</option>
                                        <option value="change-below">Variação abaixo de</option>
                                    </select>
                                </div>
                                <div>
                                    <label class="block text-sm font-medium mb-1">Valor</label>
                                    <input type="number" id="alert-value" class="w-full p-2 border rounded-lg" placeholder="100" step="0.01">
                                </div>
                                <button onclick="window.FinanceApp.addAssetAlert()" class="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
                                    Adicionar Alerta
                                </button>
                            </div>
                        </div>
                        
                        <!-- Alertas Econômicos -->
                        <div>
                            <h4 class="font-semibold mb-3">Alertas Econômicos</h4>
                            <div class="space-y-3">
                                <label class="flex items-center">
                                    <input type="checkbox" id="alert-fed" class="mr-2">
                                    <span class="text-sm">Decisões do Federal Reserve (FED)</span>
                                </label>
                                <label class="flex items-center">
                                    <input type="checkbox" id="alert-copom" class="mr-2">
                                    <span class="text-sm">Decisões do COPOM (Banco Central)</span>
                                </label>
                                <label class="flex items-center">
                                    <input type="checkbox" id="alert-usd" class="mr-2">
                                    <span class="text-sm">Variações significativas do Dólar</span>
                                </label>
                                <label class="flex items-center">
                                    <input type="checkbox" id="alert-inflation" class="mr-2">
                                    <span class="text-sm">Dados de inflação (IPCA/CPI)</span>
                                </label>
                                <button onclick="window.FinanceApp.saveEconomicAlerts()" class="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 mt-4">
                                    Salvar Preferências
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Lista de Alertas Ativos -->
                <div class="card bg-card-light dark:bg-card-dark rounded-lg p-6">
                    <h3 class="text-xl font-semibold mb-4">Alertas Ativos</h3>
                    <div id="active-alerts-list">
                        <!-- Lista será preenchida dinamicamente -->
                    </div>
                </div>
                
                <!-- Histórico de Alertas -->
                <div class="card bg-card-light dark:bg-card-dark rounded-lg p-6">
                    <h3 class="text-xl font-semibold mb-4">Histórico de Alertas</h3>
                    <div id="alerts-history">
                        <!-- Histórico será preenchido dinamicamente -->
                    </div>
                </div>
            </div>
        `;

        this.loadActiveAlerts();
        this.loadAlertsHistory();
    }

    // Métodos das calculadoras
    setupCalculators() {
        // Configurar listeners para as calculadoras
        const taxTypeSelect = document.getElementById('tax-type');
        if (taxTypeSelect) {
            taxTypeSelect.addEventListener('change', (e) => {
                const periodContainer = document.getElementById('tax-period-container');
                if (e.target.value === 'renda-fixa') {
                    periodContainer.classList.remove('hidden');
                } else {
                    periodContainer.classList.add('hidden');
                }
            });
        }

        // Configurar listeners para alocação
        const allocInputs = document.querySelectorAll('input[id^="alloc-"]');
        allocInputs.forEach(input => {
            input.addEventListener('input', this.updateAllocationTotal.bind(this));
        });
    }

    calculateCompoundInterest() {
        const initial = parseFloat(document.getElementById('compound-initial').value) || 0;
        const monthly = parseFloat(document.getElementById('compound-monthly').value) || 0;
        const rate = parseFloat(document.getElementById('compound-rate').value) || 0;
        const years = parseFloat(document.getElementById('compound-years').value) || 0;

        if (years === 0) {
            this.showAlert('Por favor, preencha todos os campos.', 'warning');
            return;
        }

        const monthlyRate = rate / 100 / 12;
        const months = years * 12;
        
        // Fórmula de juros compostos com aportes mensais
        const futureValue = initial * Math.pow(1 + monthlyRate, months) + 
                           monthly * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
        
        const totalInvested = initial + (monthly * months);
        const totalInterest = futureValue - totalInvested;

        const resultDiv = document.getElementById('compound-result');
        resultDiv.innerHTML = `
            <h4 class="font-semibold mb-3">Resultado da Simulação</h4>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div class="text-center">
                    <p class="text-sm text-gray-600 dark:text-gray-400">Total Investido</p>
                    <p class="text-lg font-bold">R$ ${totalInvested.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                </div>
                <div class="text-center">
                    <p class="text-sm text-gray-600 dark:text-gray-400">Juros Ganhos</p>
                    <p class="text-lg font-bold text-green-600">R$ ${totalInterest.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                </div>
                <div class="text-center">
                    <p class="text-sm text-gray-600 dark:text-gray-400">Valor Final</p>
                    <p class="text-xl font-bold text-blue-600">R$ ${futureValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                </div>
            </div>
        `;
        resultDiv.classList.remove('hidden');
    }

    calculateFixedIncome() {
        const amount = parseFloat(document.getElementById('fixed-amount').value) || 0;
        const indexType = document.getElementById('fixed-index').value;
        const rate = parseFloat(document.getElementById('fixed-rate').value) || 0;
        const years = parseFloat(document.getElementById('fixed-years').value) || 0;

        if (amount === 0 || years === 0) {
            this.showAlert('Por favor, preencha todos os campos.', 'warning');
            return;
        }

        let finalValue;
        let effectiveRate;

        switch (indexType) {
            case 'cdi':
                effectiveRate = (13.65 * rate / 100) / 100; // CDI atual * percentual do CDI
                break;
            case 'ipca':
                effectiveRate = (4.62 + rate) / 100; // IPCA + taxa fixa
                break;
            case 'prefixado':
                effectiveRate = rate / 100;
                break;
        }

        finalValue = amount * Math.pow(1 + effectiveRate, years);
        const totalReturn = finalValue - amount;
        const returnPercent = (totalReturn / amount) * 100;

        const resultDiv = document.getElementById('fixed-result');
        resultDiv.innerHTML = `
            <h4 class="font-semibold mb-3">Resultado da Simulação</h4>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div class="text-center">
                    <p class="text-sm text-gray-600 dark:text-gray-400">Valor Investido</p>
                    <p class="text-lg font-bold">R$ ${amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                </div>
                <div class="text-center">
                    <p class="text-sm text-gray-600 dark:text-gray-400">Rendimento</p>
                    <p class="text-lg font-bold text-green-600">R$ ${totalReturn.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                </div>
                <div class="text-center">
                    <p class="text-sm text-gray-600 dark:text-gray-400">Valor Final</p>
                    <p class="text-xl font-bold text-blue-600">R$ ${finalValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                </div>
            </div>
            <div class="mt-3 text-center">
                <p class="text-sm">Rentabilidade: <span class="font-semibold">{returnPercent.toFixed(2)}%</span> em {years} anos</p>
            </div>
        `;
        resultDiv.classList.remove('hidden');
    }

    // Métodos para rebalanceamento e alertas
    updateAllocationTotal() {
        const inputs = ['alloc-br-stocks', 'alloc-intl-stocks', 'alloc-fixed-income', 'alloc-reits'];
        let total = 0;
        
        inputs.forEach(id => {
            const input = document.getElementById(id);
            if (input) {
                total += parseFloat(input.value) || 0;
            }
        });

        const totalSpan = document.getElementById('allocation-total');
        if (totalSpan) {
            totalSpan.textContent = `Total: ${total}%`;
            totalSpan.className = total === 100 ? 'text-sm text-green-600' : 'text-sm text-red-600';
        }
    }

    saveRebalanceConfig() {
        const portfolioId = document.getElementById('rebalance-portfolio').value;
        const frequency = document.getElementById('rebalance-frequency').value;
        
        const allocations = {
            brStocks: parseFloat(document.getElementById('alloc-br-stocks').value) || 0,
            intlStocks: parseFloat(document.getElementById('alloc-intl-stocks').value) || 0,
            fixedIncome: parseFloat(document.getElementById('alloc-fixed-income').value) || 0,
            reits: parseFloat(document.getElementById('alloc-reits').value) || 0
        };

        const total = Object.values(allocations).reduce((sum, val) => sum + val, 0);
        
        if (!portfolioId) {
            this.showAlert('Selecione uma carteira.', 'warning');
            return;
        }

        if (total !== 100) {
            this.showAlert('A soma das alocações deve ser 100%.', 'warning');
            return;
        }

        const config = {
            portfolioId,
            frequency: parseInt(frequency),
            allocations,
            createdAt: new Date().toISOString(),
            lastCheck: new Date().toISOString()
        };

        const user = window.AuthManager.getCurrentUser();
        localStorage.setItem(`rebalance_config_${user.id}`, JSON.stringify(config));
        
        this.showAlert('Configuração de rebalanceamento salva!', 'success');
        this.generateRebalanceSuggestions(config);
    }

    generateRebalanceSuggestions(config) {
        const container = document.getElementById('rebalance-suggestions');
        if (!container) return;

        // Simular análise da carteira atual vs. alocação alvo
        const currentAllocation = {
            brStocks: 30,
            intlStocks: 20,
            fixedIncome: 35,
            reits: 15
        };

        const suggestions = [];
        Object.keys(config.allocations).forEach(key => {
            const target = config.allocations[key];
            const current = currentAllocation[key];
            const diff = current - target;
            
            if (Math.abs(diff) > 5) { // Desvio maior que 5%
                suggestions.push({
                    category: this.getCategoryName(key),
                    current,
                    target,
                    diff,
                    action: diff > 0 ? 'reduzir' : 'aumentar'
                });
            }
        });

        if (suggestions.length > 0) {
            container.innerHTML = `
                <div class="card bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6">
                    <h3 class="text-xl font-semibold mb-4 text-yellow-800 dark:text-yellow-200">
                        <ion-icon name="warning-outline" class="mr-2"></ion-icon>
                        Sugestões de Rebalanceamento
                    </h3>
                    <div class="space-y-3">
                        ${suggestions.map(s => `
                            <div class="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg">
                                <div>
                                    <span class="font-medium">${s.category}</span>
                                    <span class="text-sm text-gray-600 dark:text-gray-400 ml-2">
                                        Atual: ${s.current}% | Alvo: ${s.target}%
                                    </span>
                                </div>
                                <span class="px-3 py-1 rounded-full text-sm ${s.action === 'reduzir' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}">
                                    ${s.action === 'reduzir' ? 'Reduzir' : 'Aumentar'} ${Math.abs(s.diff).toFixed(1)}%
                                </span>
                            </div>
                        `).join('')}
                    </div>
                    <div class="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <p class="text-sm text-blue-800 dark:text-blue-200">
                            <ion-icon name="information-circle-outline" class="mr-1"></ion-icon>
                            Próxima verificação em ${config.frequency} dias
                        </p>
                    </div>
                </div>
            `;
            container.classList.remove('hidden');
        } else {
            container.innerHTML = `
                <div class="card bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
                    <h3 class="text-xl font-semibold mb-2 text-green-800 dark:text-green-200">
                        <ion-icon name="checkmark-circle-outline" class="mr-2"></ion-icon>
                        Carteira Balanceada
                    </h3>
                    <p class="text-green-700 dark:text-green-300">
                        Sua carteira está dentro dos parâmetros de alocação definidos. Nenhum rebalanceamento necessário no momento.
                    </p>
                </div>
            `;
            container.classList.remove('hidden');
        }
    }

    getCategoryName(key) {
        const names = {
            brStocks: 'Ações Brasil',
            intlStocks: 'Ações Internacionais',
            fixedIncome: 'Renda Fixa',
            reits: 'Fundos Imobiliários'
        };
        return names[key] || key;
    }

    addAssetAlert() {
        const asset = document.getElementById('alert-asset').value.trim().toUpperCase();
        const type = document.getElementById('alert-type').value;
        const value = parseFloat(document.getElementById('alert-value').value);

        if (!asset || !value) {
            this.showAlert('Preencha todos os campos.', 'warning');
            return;
        }

        const alert = {
            id: Date.now().toString(),
            asset,
            type,
            value,
            active: true,
            createdAt: new Date().toISOString()
        };

        const user = window.AuthManager.getCurrentUser();
        const alerts = JSON.parse(localStorage.getItem(`asset_alerts_${user.id}`)) || [];
        alerts.push(alert);
        localStorage.setItem(`asset_alerts_${user.id}`, JSON.stringify(alerts));

        // Limpar formulário
        document.getElementById('alert-asset').value = '';
        document.getElementById('alert-value').value = '';

        this.showAlert('Alerta adicionado com sucesso!', 'success');
        this.loadActiveAlerts();
    }

    saveEconomicAlerts() {
        const alerts = {
            fed: document.getElementById('alert-fed').checked,
            copom: document.getElementById('alert-copom').checked,
            usd: document.getElementById('alert-usd').checked,
            inflation: document.getElementById('alert-inflation').checked
        };

        const user = window.AuthManager.getCurrentUser();
        localStorage.setItem(`economic_alerts_${user.id}`, JSON.stringify(alerts));
        
        this.showAlert('Preferências de alertas econômicos salvas!', 'success');
    }

    loadActiveAlerts() {
        const container = document.getElementById('active-alerts-list');
        if (!container) return;

        const user = window.AuthManager.getCurrentUser();
        const alerts = JSON.parse(localStorage.getItem(`asset_alerts_${user.id}`)) || [];
        const activeAlerts = alerts.filter(alert => alert.active);

        if (activeAlerts.length === 0) {
            container.innerHTML = `
                <div class="text-center py-8 text-gray-500 dark:text-gray-400">
                    <ion-icon name="notifications-off-outline" class="text-4xl mb-2"></ion-icon>
                    <p>Nenhum alerta ativo</p>
                </div>
            `;
            return;
        }

        container.innerHTML = activeAlerts.map(alert => `
            <div class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg mb-3">
                <div class="flex-1">
                    <div class="flex items-center">
                        <span class="font-semibold">${alert.asset}</span>
                        <span class="ml-2 px-2 py-1 text-xs rounded-full ${this.getAlertTypeClass(alert.type)}">
                            ${this.getAlertTypeLabel(alert.type)}
                        </span>
                    </div>
                    <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        ${this.getAlertDescription(alert)}
                    </p>
                    <p class="text-xs text-gray-500 mt-1">
                        Criado em ${new Date(alert.createdAt).toLocaleDateString('pt-BR')}
                    </p>
                </div>
                <button onclick="window.FinanceApp.removeAlert('${alert.id}')" class="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900 rounded-lg">
                    <ion-icon name="trash-outline"></ion-icon>
                </button>
            </div>
        `).join('');
    }

    loadAlertsHistory() {
        const container = document.getElementById('alerts-history');
        if (!container) return;

        // Simular histórico de alertas
        const mockHistory = [
            {
                asset: 'BTC',
                message: 'Bitcoin atingiu US$ 67.500',
                triggeredAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
                type: 'price-above'
            },
            {
                asset: 'AAPL',
                message: 'Apple caiu 3.2% em 24h',
                triggeredAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
                type: 'change-below'
            }
        ];

        if (mockHistory.length === 0) {
            container.innerHTML = `
                <div class="text-center py-8 text-gray-500 dark:text-gray-400">
                    <ion-icon name="time-outline" class="text-4xl mb-2"></ion-icon>
                    <p>Nenhum alerta disparado ainda</p>
                </div>
            `;
            return;
        }

        container.innerHTML = mockHistory.map(alert => `
            <div class="flex items-start p-4 bg-gray-50 dark:bg-gray-800 rounded-lg mb-3">
                <div class="flex-shrink-0 mr-3">
                    <div class="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                        <ion-icon name="notifications-outline" class="text-blue-600 dark:text-blue-400"></ion-icon>
                    </div>
                </div>
                <div class="flex-1">
                    <div class="flex items-center">
                        <span class="font-semibold">${alert.asset}</span>
                        <span class="ml-2 text-xs text-gray-500">
                            ${new Date(alert.triggeredAt).toLocaleDateString('pt-BR')} às ${new Date(alert.triggeredAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                    </div>
                    <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">${alert.message}</p>
                </div>
            </div>
        `).join('');
    }

    getAlertTypeClass(type) {
        const classes = {
            'price-above': 'bg-green-100 text-green-800',
            'price-below': 'bg-red-100 text-red-800',
            'change-above': 'bg-blue-100 text-blue-800',
            'change-below': 'bg-orange-100 text-orange-800'
        };
        return classes[type] || 'bg-gray-100 text-gray-800';
    }

    getAlertTypeLabel(type) {
        const labels = {
            'price-above': 'Preço ↑',
            'price-below': 'Preço ↓',
            'change-above': 'Alta %',
            'change-below': 'Queda %'
        };
        return labels[type] || type;
    }

    getAlertDescription(alert) {
        const descriptions = {
            'price-above': `Alertar quando o preço for acima de $${alert.value}`,
            'price-below': `Alertar quando o preço for abaixo de $${alert.value}`,
            'change-above': `Alertar quando a variação for acima de ${alert.value}%`,
            'change-below': `Alertar quando a variação for abaixo de ${alert.value}%`
        };
        return descriptions[alert.type] || '';
    }

    removeAlert(alertId) {
        const user = window.AuthManager.getCurrentUser();
        const alerts = JSON.parse(localStorage.getItem(`asset_alerts_${user.id}`)) || [];
        const updatedAlerts = alerts.filter(alert => alert.id !== alertId);
        localStorage.setItem(`asset_alerts_${user.id}`, JSON.stringify(updatedAlerts));
        
        this.loadActiveAlerts();
        this.showAlert('Alerta removido com sucesso!', 'info');
    }

    calculateTax() {
        const type = document.getElementById('tax-type').value;
        const gain = parseFloat(document.getElementById('tax-gain').value) || 0;
        const period = parseInt(document.getElementById('tax-period').value) || 0;

        if (gain === 0) {
            this.showAlert('Informe o valor do ganho.', 'warning');
            return;
        }

        let taxRate = 0;
        let description = '';

        switch (type) {
            case 'renda-fixa':
                if (period <= 180) {
                    taxRate = 22.5;
                    description = 'Até 180 dias: 22,5%';
                } else if (period <= 360) {
                    taxRate = 20;
                    description = '181 a 360 dias: 20%';
                } else if (period <= 720) {
                    taxRate = 17.5;
                    description = '361 a 720 dias: 17,5%';
                } else {
                    taxRate = 15;
                    description = 'Acima de 720 dias: 15%';
                }
                break;
            case 'acoes':
                taxRate = 15;
                description = 'Ações (vendas acima de R$ 20.000/mês): 15%';
                break;
            case 'fiis':
                taxRate = 20;
                description = 'Fundos Imobiliários: 20%';
                break;
        }

        const taxAmount = (gain * taxRate) / 100;
        const netGain = gain - taxAmount;

        const resultDiv = document.getElementById('tax-result');
        resultDiv.innerHTML = `
            <h4 class="font-semibold mb-3">Cálculo do Imposto de Renda</h4>
            <div class="space-y-3">
                <div class="flex justify-between">
                    <span>Ganho Bruto:</span>
                    <span class="font-semibold">R$ ${gain.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                </div>
                <div class="flex justify-between">
                    <span>Alíquota:</span>
                    <span class="font-semibold">${taxRate}%</span>
                </div>
                <div class="flex justify-between text-red-600">
                    <span>Imposto a Pagar:</span>
                    <span class="font-semibold">R$ ${taxAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                </div>
                <div class="flex justify-between text-green-600 border-t pt-2">
                    <span>Ganho Líquido:</span>
                    <span class="font-semibold">R$ ${netGain.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                </div>
            </div>
            <div class="mt-3 p-2 bg-blue-50 dark:bg-blue-900/20 rounded text-sm">
                <p class="text-blue-800 dark:text-blue-200">${description}</p>
            </div>
        `;
        resultDiv.classList.remove('hidden');
    }

    simulateInvestment() {
        const profile = document.getElementById('risk-profile').value;
        const monthly = parseFloat(document.getElementById('sim-monthly').value) || 0;
        const years = parseFloat(document.getElementById('sim-years').value) || 0;

        if (monthly === 0 || years === 0) {
            this.showAlert('Preencha todos os campos.', 'warning');
            return;
        }

        // Definir alocações baseadas no perfil de risco
        const allocations = {
            conservador: {
                rendaFixa: 70,
                acoesBr: 15,
                acoesIntl: 10,
                fiis: 5,
                expectedReturn: 8.5
            },
            moderado: {
                rendaFixa: 40,
                acoesBr: 30,
                acoesIntl: 20,
                fiis: 10,
                expectedReturn: 11.2
            },
            arrojado: {
                rendaFixa: 20,
                acoesBr: 35,
                acoesIntl: 35,
                fiis: 10,
                expectedReturn: 14.8
            }
        };

        const allocation = allocations[profile];
        const totalInvested = monthly * years * 12;
        const monthlyRate = allocation.expectedReturn / 100 / 12;
        const months = years * 12;
        
        const futureValue = monthly * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
        const totalReturn = futureValue - totalInvested;

        const resultDiv = document.getElementById('simulation-result');
        resultDiv.innerHTML = `
            <div class="card bg-card-light dark:bg-card-dark rounded-lg p-6">
                <h4 class="text-xl font-semibold mb-4">Simulação - Perfil ${profile.charAt(0).toUpperCase() + profile.slice(1)}</h4>
                
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div class="text-center">
                        <p class="text-sm text-gray-600 dark:text-gray-400">Total Investido</p>
                        <p class="text-lg font-bold">R$ ${totalInvested.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                    </div>
                    <div class="text-center">
                        <p class="text-sm text-gray-600 dark:text-gray-400">Rendimento</p>
                        <p class="text-lg font-bold text-green-600">R$ ${totalReturn.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                    </div>
                    <div class="text-center">
                        <p class="text-sm text-gray-600 dark:text-gray-400">Valor Final</p>
                        <p class="text-xl font-bold text-blue-600">R$ ${futureValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                    </div>
                </div>
                
                <div class="mb-4">
                    <h5 class="font-semibold mb-2">Alocação Sugerida:</h5>
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                        <div class="flex justify-between">
                            <span>Renda Fixa:</span>
                            <span class="font-semibold">${allocation.rendaFixa}%</span>
                        </div>
                        <div class="flex justify-between">
                            <span>Ações BR:</span>
                            <span class="font-semibold">${allocation.acoesBr}%</span>
                        </div>
                        <div class="flex justify-between">
                            <span>Ações Intl:</span>
                            <span class="font-semibold">${allocation.acoesIntl}%</span>
                        </div>
                        <div class="flex justify-between">
                            <span>FIIs:</span>
                            <span class="font-semibold">${allocation.fiis}%</span>
                        </div>
                    </div>
                </div>
                
                <div class="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <p class="text-sm text-yellow-800 dark:text-yellow-200">
                        <ion-icon name="information-circle-outline" class="mr-1"></ion-icon>
                        Simulação baseada em rentabilidade esperada de ${allocation.expectedReturn}% ao ano. 
                        Resultados passados não garantem resultados futuros.
                    </p>
                </div>
            </div>
        `;
        resultDiv.classList.remove('hidden');
    }

    // Método para iniciar atualizações automáticas em tempo real
    startAutoUpdates() {
        // Atualizar ticker a cada 3 segundos
        this.tickerInterval = setInterval(() => {
            this.updateTickerRealtime();
        }, 3000);

        // Atualizar notícias a cada 30 segundos
        this.newsInterval = setInterval(() => {
            this.updateNewsRealtime();
        }, 30000);

        // Atualizar dados de mercado a cada 5 segundos
        this.marketInterval = setInterval(() => {
            this.updateMarketData();
        }, 5000);

        console.log('🚀 Atualizações em tempo real iniciadas!');
    }

    stopAutoUpdates() {
        if (this.tickerInterval) clearInterval(this.tickerInterval);
        if (this.newsInterval) clearInterval(this.newsInterval);
        if (this.marketInterval) clearInterval(this.marketInterval);
        
        console.log('⏹️ Atualizações em tempo real paradas');
    }

    async updateTickerRealtime() {
        try {
            const tickerContainer = document.getElementById('market-ticker');
            if (!tickerContainer) return;

            // Obter atualizações em tempo real
            const updates = this.api.getRealtimeUpdates();
            
            // Atualizar cada item do ticker
            updates.forEach(update => {
                const tickerItem = tickerContainer.querySelector(`[data-symbol="${update.symbol}"]`);
                if (tickerItem) {
                    const priceElement = tickerItem.querySelector('.ticker-price');
                    const changeElement = tickerItem.querySelector('.ticker-change');
                    
                    if (priceElement && changeElement) {
                        // Aplicar animação de mudança
                        const isPositive = update.change >= 0;
                        const changeClass = isPositive ? 'text-green-500' : 'text-red-500';
                        const bgClass = isPositive ? 'bg-green-100' : 'bg-red-100';
                        
                        // Atualizar valores
                        priceElement.textContent = this.formatPrice(update.price, update.symbol);
                        changeElement.textContent = `${isPositive ? '+' : ''}${update.change.toFixed(2)}%`;
                        changeElement.className = `ticker-change text-xs ${changeClass}`;
                        
                        // Animação de flash
                        tickerItem.classList.add(bgClass);
                        setTimeout(() => {
                            tickerItem.classList.remove(bgClass);
                        }, 1000);
                    }
                }
            });
        } catch (error) {
            console.error('Erro ao atualizar ticker:', error);
        }
    }

    async updateNewsRealtime() {
        try {
            const newsContainer = document.getElementById('news-content');
            if (!newsContainer || !newsContainer.innerHTML.includes('Últimas Notícias')) return;

            // Buscar notícias atualizadas
            const freshNews = await this.api.getRealtimeNews();
            
            // Atualizar apenas se estivermos na seção de notícias
            if (this.currentSection === 'news') {
                this.renderNews();
            }

            // Verificar se há notícias breaking para mostrar notificação
            const breakingNews = freshNews.find(news => news.isBreaking);
            if (breakingNews) {
                this.showBreakingNewsNotification(breakingNews);
            }
        } catch (error) {
            console.error('Erro ao atualizar notícias:', error);
        }
    }

    updateMarketData() {
        // Atualizar indicadores de mercado se estiverem visíveis
        const marketSection = document.getElementById('market-content');
        if (marketSection && !marketSection.classList.contains('hidden')) {
            // Simular atualizações de indicadores
            this.updateMarketIndicators();
        }
    }

    updateMarketIndicators() {
        const indicators = [
            { id: 'ibovespa-value', value: Math.random() > 0.5 ? 1 : -1 },
            { id: 'dolar-value', value: Math.random() > 0.5 ? 1 : -1 },
            { id: 'selic-value', value: 0 }, // Taxa Selic não muda com frequência
            { id: 'ipca-value', value: 0 } // IPCA também é mais estável
        ];

        indicators.forEach(indicator => {
            const element = document.getElementById(indicator.id);
            if (element && indicator.value !== 0) {
                // Simular pequenas variações
                const currentValue = parseFloat(element.textContent.replace(/[^\d.,]/g, '').replace(',', '.'));
                const variation = (Math.random() - 0.5) * 0.01; // Variação de -0.5% a +0.5%
                const newValue = currentValue * (1 + variation);
                
                // Atualizar valor com animação
                element.style.transition = 'color 0.5s ease';
                element.style.color = variation > 0 ? '#10B981' : '#EF4444';
                
                setTimeout(() => {
                    element.style.color = '';
                }, 1000);
                
                // Atualizar texto baseado no tipo de indicador
                if (indicator.id.includes('ibovespa')) {
                    element.textContent = `${Math.floor(newValue).toLocaleString('pt-BR')} pts`;
                } else if (indicator.id.includes('dolar')) {
                    element.textContent = `R$ ${newValue.toFixed(3)}`;
                }
            }
        });
    }

    showBreakingNewsNotification(news) {
        // Criar notificação de notícia urgente
        const notification = document.createElement('div');
        notification.className = 'fixed top-4 right-4 bg-red-500 text-white p-4 rounded-lg shadow-lg z-50 max-w-sm';
        notification.innerHTML = `
            <div class="flex items-start">
                <ion-icon name="alert-circle" class="text-xl mr-2 mt-0.5"></ion-icon>
                <div class="flex-1">
                    <h4 class="font-semibold text-sm">Notícia Urgente</h4>
                    <p class="text-xs mt-1">${news.title.replace('🔴 URGENTE: ', '')}</p>
                </div>
                <button onclick="this.parentElement.parentElement.remove()" class="ml-2 text-white hover:text-gray-200">
                    <ion-icon name="close"></ion-icon>
                </button>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Remover automaticamente após 10 segundos
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 10000);
    }

    formatPrice(price, symbol) {
        if (symbol.includes('BTC') || symbol.includes('ETH')) {
            return `$${price.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
        } else if (symbol.includes('.SA')) {
            return `R$ ${price.toFixed(2)}`;
        } else {
            return `$${price.toFixed(2)}`;
        }
    }

    // Método para inicializar ticker com dados da API Finnhub
    async initializeTicker() {
        const tickerContainer = document.getElementById('market-ticker');
        if (!tickerContainer) {
            console.warn('Container do ticker não encontrado');
            return;
        }

        try {
            // Obter ativos em destaque da API Finnhub
            const trendingAssets = await window.FinnhubAPI.getTrendingAssets(12);
            
            if (trendingAssets.length === 0) {
                console.warn('Nenhum ativo em destaque encontrado, usando dados padrão');
                this.initializeTickerFallback();
                return;
            }

            const renderTicker = (data) => {
                const tickerHTML = data.map(asset => `
                    <div class="ticker-item" data-symbol="${asset.symbol}">
                        <span class="ticker-flag">${asset.flag || '🌐'}</span>
                        <span class="ticker-symbol">${asset.symbol}</span>
                        <span class="ticker-price price-display">${this.formatPrice(asset.price, asset.symbol)}</span>
                        <span class="ticker-change change-display text-xs ${asset.changePercent >= 0 ? 'text-green-500' : 'text-red-500'}">
                            ${asset.changePercent >= 0 ? '+' : ''}${asset.changePercent.toFixed(2)}%
                        </span>
                    </div>
                `).join('');
                
                tickerContainer.innerHTML = `<div class="ticker-content">${tickerHTML}</div>`;
            };

            renderTicker(trendingAssets);

            // Configurar streaming em tempo real para os ativos do ticker
            trendingAssets.forEach(asset => {
                window.FinnhubAPI.subscribe(asset.symbol, (update) => {
                    this.updateTickerAsset(asset.symbol, update);
                });
            });

            // Atualizar dados do ticker a cada 30 segundos
            setInterval(async () => {
                try {
                    const updatedAssets = await window.FinnhubAPI.getTrendingAssets(12);
                    if (updatedAssets.length > 0) {
                        renderTicker(updatedAssets);
                    }
                } catch (error) {
                    console.error('Erro ao atualizar ticker:', error);
                }
            }, 30000);

        } catch (error) {
            console.error('Erro ao inicializar ticker:', error);
            this.initializeTickerFallback();
        }
    }

    updateTickerAsset(symbol, update) {
        const tickerItems = document.querySelectorAll(`[data-symbol="${symbol}"]`);
        tickerItems.forEach(item => {
            const priceDisplay = item.querySelector('.price-display');
            const changeDisplay = item.querySelector('.change-display');
            
            if (priceDisplay && update.price) {
                // Animação de mudança de preço
                priceDisplay.style.transition = 'all 0.3s ease';
                priceDisplay.style.backgroundColor = update.price > parseFloat(priceDisplay.textContent.replace(/[^\d.]/g, '')) ? '#10B981' : '#EF4444';
                priceDisplay.style.color = 'white';
                priceDisplay.textContent = this.formatPrice(update.price, symbol);
                
                setTimeout(() => {
                    priceDisplay.style.backgroundColor = 'transparent';
                    priceDisplay.style.color = '';
                }, 1000);
            }
        });
    }

    initializeTickerFallback() {
        const tickerContainer = document.getElementById('market-ticker');
        if (!tickerContainer) return;
        
        // Dados de fallback
        const fallbackData = [
            { symbol: 'BTC', name: 'Bitcoin', flag: '🌐', price: 67500, changePercent: 2.5 },
            { symbol: 'ETH', name: 'Ethereum', flag: '🌐', price: 3850, changePercent: 1.8 },
            { symbol: 'AAPL', name: 'Apple', flag: '🇺🇸', price: 175.50, changePercent: -0.5 },
            { symbol: 'GOOGL', name: 'Google', flag: '🇺🇸', price: 142.30, changePercent: 1.2 },
            { symbol: 'MSFT', name: 'Microsoft', flag: '🇺🇸', price: 378.85, changePercent: 0.8 },
            { symbol: 'TSLA', name: 'Tesla', flag: '🇺🇸', price: 248.50, changePercent: -1.2 },
            { symbol: 'PETR4.SA', name: 'Petrobras', flag: '🇧🇷', price: 38.45, changePercent: 0.9 },
            { symbol: 'VALE3.SA', name: 'Vale', flag: '🇧🇷', price: 65.80, changePercent: -0.3 },
            { symbol: 'ITUB4.SA', name: 'Itaú', flag: '🇧🇷', price: 32.15, changePercent: 0.6 },
            { symbol: 'BOVA11.SA', name: 'BOVA11', flag: '🇧🇷', price: 108.50, changePercent: 0.4 }
        ];

        const tickerHTML = fallbackData.map(item => `
            <div class="ticker-item" data-symbol="${item.symbol}">
                <span class="ticker-flag">${item.flag}</span>
                <span class="ticker-symbol">${item.symbol}</span>
                <span class="ticker-price">${this.formatPrice(item.price, item.symbol)}</span>
                <span class="ticker-change text-xs ${item.changePercent >= 0 ? 'text-green-500' : 'text-red-500'}">
                    ${item.changePercent >= 0 ? '+' : ''}${item.changePercent.toFixed(2)}%
                </span>
            </div>
        `).join('');
        
        tickerContainer.innerHTML = `<div class="ticker-content">${tickerHTML}</div>`;
    }
}

// Inicializar a aplicação
window.FinanceApp = new FinanceApp();

// Aguardar o AuthManager estar pronto
document.addEventListener('DOMContentLoaded', () => {
    // A inicialização será chamada pelo AuthManager quando o usuário fizer login
});


// Inicializar o FinanceApp quando o DOM estiver completamente carregado e o usuário logado
document.addEventListener("auth:loggedIn", () => {
    if (window.FinanceApp && !window.FinanceApp.initialized) {
        window.FinanceApp.initialize();
    }
});

