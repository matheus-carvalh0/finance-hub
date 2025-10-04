// Sistema de Integração com a API Finnhub
class FinnhubAPI {
    constructor() {
        // Chave da API Finnhub (gratuita) - substitua pela sua chave
        this.apiKey = 'sandbox_c9qj9h9r01qnhpgfj7k0sandbox_c9qj9h9r01qnhpgfj7kg'; // Chave sandbox para desenvolvimento
        this.baseUrl = 'https://finnhub.io/api/v1';
        this.wsUrl = 'wss://ws.finnhub.io';
        this.websocket = null;
        this.subscribers = new Map(); // Para gerenciar assinantes de atualizações
        this.cache = new Map(); // Cache para evitar requisições desnecessárias
        this.cacheTimeout = 30000; // 30 segundos
        
        // Símbolos populares para inicialização rápida
        this.popularSymbols = [
            // Ações Americanas
            'AAPL', 'GOOGL', 'MSFT', 'AMZN', 'TSLA', 'META', 'NVDA', 'NFLX',
            'JPM', 'BAC', 'V', 'MA', 'JNJ', 'PFE', 'XOM', 'CVX', 'KO', 'PEP',
            // ETFs
            'SPY', 'QQQ', 'VTI', 'IWM', 'GLD',
            // Criptomoedas (usando símbolos Binance para Finnhub)
            'BINANCE:BTCUSDT', 'BINANCE:ETHUSDT', 'BINANCE:BNBUSDT', 'BINANCE:ADAUSDT',
            'BINANCE:SOLUSDT', 'BINANCE:XRPUSDT', 'BINANCE:DOTUSDT', 'BINANCE:DOGEUSDT'
        ];
        
        this.initializeWebSocket();
    }

    // Buscar símbolos por termo de pesquisa
    async searchSymbols(query) {
        try {
            const cacheKey = `search_${query.toLowerCase()}`;
            const cached = this.getFromCache(cacheKey);
            if (cached) return cached;

            const response = await fetch(
                `${this.baseUrl}/search?q=${encodeURIComponent(query)}&token=${this.apiKey}`
            );
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            
            // Processar e formatar os resultados
            const formattedResults = data.result?.slice(0, 10).map(stock => ({
                symbol: stock.symbol,
                name: stock.description,
                type: this.determineAssetType(stock.symbol, stock.type),
                country: this.determineCountry(stock.symbol),
                icon: this.getAssetIcon(stock.symbol, stock.type),
                sector: stock.type || 'Unknown',
                displaySymbol: stock.displaySymbol || stock.symbol
            })) || [];

            this.setCache(cacheKey, formattedResults);
            return formattedResults;
        } catch (error) {
            console.error('Erro na busca de símbolos:', error);
            // Fallback para símbolos populares se a API falhar
            return this.getPopularSymbolsFiltered(query);
        }
    }

    // Obter cotação atual de um ativo
    async getQuote(symbol) {
        try {
            const cacheKey = `quote_${symbol}`;
            const cached = this.getFromCache(cacheKey);
            if (cached) return cached;

            const response = await fetch(
                `${this.baseUrl}/quote?symbol=${symbol}&token=${this.apiKey}`
            );
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            
            const formattedQuote = {
                symbol: symbol,
                price: data.c || 0, // Current price
                change: data.d || 0, // Change
                changePercent: data.dp || 0, // Change percent
                high: data.h || 0, // High price of the day
                low: data.l || 0, // Low price of the day
                open: data.o || 0, // Open price of the day
                previousClose: data.pc || 0, // Previous close price
                timestamp: Date.now()
            };

            this.setCache(cacheKey, formattedQuote, 5000); // Cache por 5 segundos para cotações
            return formattedQuote;
        } catch (error) {
            console.error(`Erro ao obter cotação para ${symbol}:`, error);
            // Retornar dados simulados em caso de erro
            return this.generateMockQuote(symbol);
        }
    }

    // Obter múltiplas cotações de uma vez
    async getMultipleQuotes(symbols) {
        const promises = symbols.map(symbol => this.getQuote(symbol));
        const results = await Promise.allSettled(promises);
        
        return results.map((result, index) => {
            if (result.status === 'fulfilled') {
                return result.value;
            } else {
                console.error(`Erro ao obter cotação para ${symbols[index]}:`, result.reason);
                return this.generateMockQuote(symbols[index]);
            }
        });
    }

    // Obter notícias do mercado
    async getMarketNews(category = 'general') {
        try {
            const cacheKey = `news_${category}`;
            const cached = this.getFromCache(cacheKey);
            if (cached) return cached;

            const response = await fetch(
                `${this.baseUrl}/news?category=${category}&token=${this.apiKey}`
            );
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            
            const formattedNews = data.slice(0, 10).map(article => ({
                id: article.id,
                title: article.headline,
                summary: article.summary,
                source: article.source,
                url: article.url,
                image: article.image,
                publishedAt: new Date(article.datetime * 1000).toISOString(),
                category: article.category
            }));

            this.setCache(cacheKey, formattedNews, 300000); // Cache por 5 minutos
            return formattedNews;
        } catch (error) {
            console.error('Erro ao obter notícias:', error);
            return this.generateMockNews();
        }
    }

    // Inicializar WebSocket para streaming de preços
    initializeWebSocket() {
        try {
            this.websocket = new WebSocket(`${this.wsUrl}?token=${this.apiKey}`);
            
            this.websocket.onopen = () => {
                console.log('WebSocket Finnhub conectado');
                // Inscrever-se nos símbolos populares
                this.subscribeToSymbols(this.popularSymbols.slice(0, 10)); // Limitar para não sobrecarregar
            };
            
            this.websocket.onmessage = (event) => {
                const message = JSON.parse(event.data);
                if (message.type === 'trade') {
                    this.handleTradeUpdate(message.data);
                }
            };
            
            this.websocket.onclose = () => {
                console.log('WebSocket Finnhub desconectado');
                // Tentar reconectar após 5 segundos
                setTimeout(() => this.initializeWebSocket(), 5000);
            };
            
            this.websocket.onerror = (error) => {
                console.error('Erro no WebSocket Finnhub:', error);
            };
        } catch (error) {
            console.error('Erro ao inicializar WebSocket:', error);
        }
    }

    // Inscrever-se em símbolos para receber atualizações em tempo real
    subscribeToSymbols(symbols) {
        if (!this.websocket || this.websocket.readyState !== WebSocket.OPEN) {
            console.warn('WebSocket não está conectado');
            return;
        }

        symbols.forEach(symbol => {
            const message = JSON.stringify({ type: 'subscribe', symbol: symbol });
            this.websocket.send(message);
        });
    }

    // Cancelar inscrição de símbolos
    unsubscribeFromSymbols(symbols) {
        if (!this.websocket || this.websocket.readyState !== WebSocket.OPEN) {
            return;
        }

        symbols.forEach(symbol => {
            const message = JSON.stringify({ type: 'unsubscribe', symbol: symbol });
            this.websocket.send(message);
        });
    }

    // Lidar com atualizações de preços em tempo real
    handleTradeUpdate(trades) {
        trades.forEach(trade => {
            const update = {
                symbol: trade.s,
                price: trade.p,
                timestamp: trade.t,
                volume: trade.v
            };
            
            // Notificar todos os assinantes
            this.notifySubscribers(trade.s, update);
            
            // Atualizar cache
            this.updateQuoteCache(trade.s, update);
        });
    }

    // Adicionar assinante para atualizações de preços
    subscribe(symbol, callback) {
        if (!this.subscribers.has(symbol)) {
            this.subscribers.set(symbol, new Set());
            // Inscrever-se no WebSocket se não estiver inscrito
            this.subscribeToSymbols([symbol]);
        }
        this.subscribers.get(symbol).add(callback);
    }

    // Remover assinante
    unsubscribe(symbol, callback) {
        if (this.subscribers.has(symbol)) {
            this.subscribers.get(symbol).delete(callback);
            if (this.subscribers.get(symbol).size === 0) {
                this.subscribers.delete(symbol);
                this.unsubscribeFromSymbols([symbol]);
            }
        }
    }

    // Notificar assinantes sobre atualizações
    notifySubscribers(symbol, update) {
        if (this.subscribers.has(symbol)) {
            this.subscribers.get(symbol).forEach(callback => {
                try {
                    callback(update);
                } catch (error) {
                    console.error('Erro ao notificar assinante:', error);
                }
            });
        }
    }

    // Métodos auxiliares
    determineAssetType(symbol, type) {
        if (symbol.includes('USDT') || symbol.includes('BTC') || symbol.includes('ETH')) {
            return 'crypto';
        }
        if (symbol.includes('.SA')) {
            return 'stock';
        }
        if (['SPY', 'QQQ', 'VTI', 'IWM', 'GLD'].includes(symbol)) {
            return 'etf';
        }
        return 'stock';
    }

    determineCountry(symbol) {
        if (symbol.includes('.SA')) return 'br';
        if (symbol.includes('BINANCE:')) return 'global';
        return 'us';
    }

    getAssetIcon(symbol, type) {
        const iconMap = {
            'AAPL': '🍎', 'GOOGL': '🔍', 'MSFT': '💻', 'AMZN': '📦', 'TSLA': '🚗',
            'META': '📘', 'NVDA': '🎮', 'NFLX': '🎬', 'JPM': '🏦', 'V': '💳',
            'BTC': '₿', 'ETH': 'Ξ', 'BNB': '🟡', 'ADA': '₳', 'SOL': '◎'
        };
        
        const cleanSymbol = symbol.replace('BINANCE:', '').replace('USDT', '');
        return iconMap[cleanSymbol] || (type === 'crypto' ? '🪙' : '📈');
    }

    getCountryFlag(country) {
        const flags = {
            'us': '🇺🇸',
            'br': '🇧🇷',
            'global': '🌐'
        };
        return flags[country] || '🌐';
    }

    // Cache management
    getFromCache(key) {
        const cached = this.cache.get(key);
        if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
            return cached.data;
        }
        this.cache.delete(key);
        return null;
    }

    setCache(key, data, timeout = this.cacheTimeout) {
        this.cache.set(key, {
            data,
            timestamp: Date.now(),
            timeout
        });
    }

    updateQuoteCache(symbol, update) {
        const cacheKey = `quote_${symbol}`;
        const cached = this.cache.get(cacheKey);
        if (cached) {
            cached.data.price = update.price;
            cached.data.timestamp = update.timestamp;
        }
    }

    // Fallback methods
    getPopularSymbolsFiltered(query) {
        return this.popularSymbols
            .filter(symbol => symbol.toLowerCase().includes(query.toLowerCase()))
            .slice(0, 5)
            .map(symbol => ({
                symbol,
                name: this.getAssetName(symbol),
                type: this.determineAssetType(symbol),
                country: this.determineCountry(symbol),
                icon: this.getAssetIcon(symbol),
                sector: 'Popular'
            }));
    }

    getAssetName(symbol) {
        const nameMap = {
            'AAPL': 'Apple Inc.',
            'GOOGL': 'Alphabet Inc.',
            'MSFT': 'Microsoft Corporation',
            'AMZN': 'Amazon.com Inc.',
            'TSLA': 'Tesla Inc.',
            'BINANCE:BTCUSDT': 'Bitcoin',
            'BINANCE:ETHUSDT': 'Ethereum'
        };
        return nameMap[symbol] || symbol;
    }

    generateMockQuote(symbol) {
        const basePrice = Math.random() * 1000 + 10;
        const change = (Math.random() - 0.5) * 20;
        return {
            symbol,
            price: basePrice,
            change,
            changePercent: (change / basePrice) * 100,
            high: basePrice + Math.abs(change),
            low: basePrice - Math.abs(change),
            open: basePrice - change,
            previousClose: basePrice - change,
            timestamp: Date.now()
        };
    }

    generateMockNews() {
        return [
            {
                id: '1',
                title: 'Mercados em alta com otimismo dos investidores',
                summary: 'Principais índices registram ganhos significativos...',
                source: 'Financial News',
                url: '#',
                publishedAt: new Date().toISOString(),
                category: 'general'
            },
            {
                id: '2',
                title: 'Fed mantém taxa de juros estável',
                summary: 'Banco Central americano decide manter política monetária...',
                source: 'Reuters',
                url: '#',
                publishedAt: new Date(Date.now() - 3600000).toISOString(),
                category: 'general'
            }
        ];
    }

    // Método para obter ativos em destaque baseados na performance
    async getTrendingAssets(limit = 10) {
        try {
            const quotes = await this.getMultipleQuotes(this.popularSymbols.slice(0, limit));
            
            // Ordenar por performance (maior variação percentual)
            const trending = quotes
                .filter(quote => quote && quote.changePercent !== undefined)
                .sort((a, b) => Math.abs(b.changePercent) - Math.abs(a.changePercent))
                .map(quote => ({
                    ...quote,
                    name: this.getAssetName(quote.symbol),
                    icon: this.getAssetIcon(quote.symbol),
                    flag: this.getCountryFlag(this.determineCountry(quote.symbol)),
                    type: this.determineAssetType(quote.symbol)
                }));

            return trending;
        } catch (error) {
            console.error('Erro ao obter ativos em destaque:', error);
            return [];
        }
    }

    // Cleanup
    disconnect() {
        if (this.websocket) {
            this.websocket.close();
        }
        this.subscribers.clear();
        this.cache.clear();
    }
}

// Inicializar a API Finnhub globalmente
window.FinnhubAPI = new FinnhubAPI();
