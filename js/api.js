// Gerenciador de APIs Financeiras
class FinancialAPI {
    constructor() {
        // Configurações das APIs
        this.apis = {
            // Alpha Vantage (gratuita com limitações)
            alphaVantage: {
                baseUrl: 'https://www.alphavantage.co/query',
                key: 'demo', // Usar 'demo' para testes, substituir por chave real
                rateLimit: 5 // 5 requests por minuto na versão gratuita
            },
            
            // Twelve Data (gratuita com limitações)
            twelveData: {
                baseUrl: 'https://api.twelvedata.com',
                key: 'demo', // Usar 'demo' para testes
                rateLimit: 8 // 8 requests por minuto na versão gratuita
            },
            
            // Financial Modeling Prep (gratuita com limitações)
            fmp: {
                baseUrl: 'https://financialmodelingprep.com/api/v3',
                key: 'demo', // Usar 'demo' para testes
                rateLimit: 250 // 250 requests por dia na versão gratuita
            },
            
            // Yahoo Finance (não oficial, mas funcional)
            yahoo: {
                baseUrl: 'https://query1.finance.yahoo.com/v8/finance/chart',
                rateLimit: 2000 // Limite estimado
            },
            
            // CoinGecko para criptomoedas (gratuita)
            coinGecko: {
                baseUrl: 'https://api.coingecko.com/api/v3',
                rateLimit: 50 // 50 requests por minuto
            }
        };

        this.cache = new Map();
        this.cacheTimeout = 5 * 60 * 1000; // 5 minutos
        this.requestQueue = [];
        this.isProcessingQueue = false;
    }

    // Método principal para buscar dados de ativos
    async getAssetData(symbol, period = '1D') {
        const cacheKey = `${symbol}_${period}`;
        
        // Verificar cache
        if (this.cache.has(cacheKey)) {
            const cached = this.cache.get(cacheKey);
            if (Date.now() - cached.timestamp < this.cacheTimeout) {
                return cached.data;
            }
        }

        try {
            let data;
            
            // Determinar qual API usar baseado no tipo de ativo
            if (this.isCrypto(symbol)) {
                data = await this.getCryptoData(symbol, period);
            } else if (this.isBrazilianStock(symbol)) {
                data = await this.getBrazilianStockData(symbol, period);
            } else {
                data = await this.getUSStockData(symbol, period);
            }

            // Armazenar no cache
            this.cache.set(cacheKey, {
                data,
                timestamp: Date.now()
            });

            return data;
        } catch (error) {
            console.error(`Erro ao buscar dados para ${symbol}:`, error);
            return this.getMockData(symbol, period);
        }
    }

    // Buscar dados de criptomoedas
    async getCryptoData(symbol, period) {
        const coinId = this.getCoinGeckoId(symbol);
        const days = this.periodToDays(period);
        
        const url = `${this.apis.coinGecko.baseUrl}/coins/${coinId}/market_chart?vs_currency=usd&days=${days}`;
        
        const response = await fetch(url);
        const data = await response.json();
        
        return this.formatCryptoData(data, symbol);
    }

    // Buscar dados de ações brasileiras
    async getBrazilianStockData(symbol, period) {
        // Usar Alpha Vantage para ações brasileiras
        const cleanSymbol = symbol.replace('.SA', '');
        const url = `${this.apis.alphaVantage.baseUrl}?function=TIME_SERIES_DAILY&symbol=${cleanSymbol}.SAO&apikey=${this.apis.alphaVantage.key}`;
        
        const response = await fetch(url);
        const data = await response.json();
        
        return this.formatAlphaVantageData(data, symbol);
    }

    // Buscar dados de ações americanas
    async getUSStockData(symbol, period) {
        // Usar Twelve Data para ações americanas
        const interval = this.periodToInterval(period);
        const url = `${this.apis.twelveData.baseUrl}/time_series?symbol=${symbol}&interval=${interval}&apikey=${this.apis.twelveData.key}`;
        
        const response = await fetch(url);
        const data = await response.json();
        
        return this.formatTwelveDataData(data, symbol);
    }

    // Buscar lista de ativos para autocomplete
    async searchAssets(query) {
        const cacheKey = `search_${query}`;
        
        if (this.cache.has(cacheKey)) {
            const cached = this.cache.get(cacheKey);
            if (Date.now() - cached.timestamp < this.cacheTimeout) {
                return cached.data;
            }
        }

        try {
            // Combinar resultados de diferentes fontes
            const [stocks, cryptos] = await Promise.all([
                this.searchStocks(query),
                this.searchCryptos(query)
            ]);

            const results = [...stocks, ...cryptos].slice(0, 10);
            
            this.cache.set(cacheKey, {
                data: results,
                timestamp: Date.now()
            });

            return results;
        } catch (error) {
            console.error('Erro ao buscar ativos:', error);
            return this.getMockSearchResults(query);
        }
    }

    // Buscar ações
    async searchStocks(query) {
        const url = `${this.apis.twelveData.baseUrl}/symbol_search?symbol=${query}&apikey=${this.apis.twelveData.key}`;
        
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.data) {
            return data.data.map(item => ({
                symbol: item.symbol,
                name: item.instrument_name,
                type: 'stock',
                country: item.country || 'us',
                exchange: item.exchange
            }));
        }
        
        return [];
    }

    // Buscar criptomoedas
    async searchCryptos(query) {
        const url = `${this.apis.coinGecko.baseUrl}/search?query=${query}`;
        
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.coins) {
            return data.coins.slice(0, 5).map(coin => ({
                symbol: coin.symbol.toUpperCase(),
                name: coin.name,
                type: 'crypto',
                country: 'global',
                id: coin.id
            }));
        }
        
        return [];
    }

    // Buscar notícias financeiras
    async getFinancialNews(country = 'us', limit = 10) {
        const cacheKey = `news_${country}_${limit}`;
        
        if (this.cache.has(cacheKey)) {
            const cached = this.cache.get(cacheKey);
            if (Date.now() - cached.timestamp < this.cacheTimeout) {
                return cached.data;
            }
        }

        try {
            // Usar Financial Modeling Prep para notícias
            const url = `${this.apis.fmp.baseUrl}/stock_news?tickers=AAPL,GOOGL,MSFT&limit=${limit}&apikey=${this.apis.fmp.key}`;
            
            const response = await fetch(url);
            const data = await response.json();
            
            const formattedNews = data.slice(0, limit).map(article => ({
                title: article.title,
                summary: article.text.substring(0, 200) + '...',
                url: article.url,
                publishedAt: article.publishedDate,
                source: article.site,
                image: article.image
            }));

            this.cache.set(cacheKey, {
                data: formattedNews,
                timestamp: Date.now()
            });

            return formattedNews;
        } catch (error) {
            console.error('Erro ao buscar notícias:', error);
            return this.getMockNews();
        }
    }

    // Buscar dados de índices econômicos
    async getEconomicIndicators() {
        const cacheKey = 'economic_indicators';
        
        if (this.cache.has(cacheKey)) {
            const cached = this.cache.get(cacheKey);
            if (Date.now() - cached.timestamp < this.cacheTimeout) {
                return cached.data;
            }
        }

        try {
            // Buscar dados do dólar, CDI, IPCA, etc.
            const indicators = {
                usd_brl: await this.getAssetData('USDBRL=X'),
                selic: await this.getMockIndicator('SELIC', 13.75),
                ipca: await this.getMockIndicator('IPCA', 4.62),
                cdi: await this.getMockIndicator('CDI', 13.65)
            };

            this.cache.set(cacheKey, {
                data: indicators,
                timestamp: Date.now()
            });

            return indicators;
        } catch (error) {
            console.error('Erro ao buscar indicadores:', error);
            return this.getMockEconomicIndicators();
        }
    }

    // Métodos auxiliares
    isCrypto(symbol) {
        const cryptoSymbols = ['BTC', 'ETH', 'ADA', 'DOT', 'SOL', 'MATIC', 'AVAX', 'LINK', 'UNI', 'AAVE'];
        return cryptoSymbols.includes(symbol.toUpperCase());
    }

    isBrazilianStock(symbol) {
        return symbol.includes('.SA') || symbol.includes('SA');
    }

    getCoinGeckoId(symbol) {
        const mapping = {
            'BTC': 'bitcoin',
            'ETH': 'ethereum',
            'ADA': 'cardano',
            'DOT': 'polkadot',
            'SOL': 'solana',
            'MATIC': 'polygon',
            'AVAX': 'avalanche-2',
            'LINK': 'chainlink',
            'UNI': 'uniswap',
            'AAVE': 'aave'
        };
        return mapping[symbol.toUpperCase()] || 'bitcoin';
    }

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

    periodToInterval(period) {
        const mapping = {
            '1D': '1h',
            '1W': '1day',
            '1M': '1day',
            '3M': '1day',
            '6M': '1week',
            '1Y': '1week',
            '5Y': '1month'
        };
        return mapping[period] || '1day';
    }

    // Formatadores de dados
    formatCryptoData(data, symbol) {
        if (!data.prices) return this.getMockData(symbol);
        
        return {
            symbol,
            prices: data.prices.map(([timestamp, price]) => ({
                date: new Date(timestamp),
                price: price,
                volume: 0
            })),
            currentPrice: data.prices[data.prices.length - 1][1],
            change24h: this.calculateChange(data.prices),
            marketCap: data.market_caps ? data.market_caps[data.market_caps.length - 1][1] : 0
        };
    }

    formatAlphaVantageData(data, symbol) {
        if (!data['Time Series (Daily)']) return this.getMockData(symbol);
        
        const timeSeries = data['Time Series (Daily)'];
        const dates = Object.keys(timeSeries).sort();
        
        return {
            symbol,
            prices: dates.map(date => ({
                date: new Date(date),
                price: parseFloat(timeSeries[date]['4. close']),
                volume: parseInt(timeSeries[date]['5. volume'])
            })),
            currentPrice: parseFloat(timeSeries[dates[dates.length - 1]]['4. close']),
            change24h: this.calculateChangeFromSeries(timeSeries, dates)
        };
    }

    formatTwelveDataData(data, symbol) {
        if (!data.values) return this.getMockData(symbol);
        
        return {
            symbol,
            prices: data.values.reverse().map(item => ({
                date: new Date(item.datetime),
                price: parseFloat(item.close),
                volume: parseInt(item.volume || 0)
            })),
            currentPrice: parseFloat(data.values[data.values.length - 1].close),
            change24h: this.calculateChangeFromValues(data.values)
        };
    }

    calculateChange(prices) {
        if (prices.length < 2) return 0;
        const current = prices[prices.length - 1][1];
        const previous = prices[prices.length - 2][1];
        return ((current - previous) / previous) * 100;
    }

    calculateChangeFromSeries(series, dates) {
        if (dates.length < 2) return 0;
        const current = parseFloat(series[dates[dates.length - 1]]['4. close']);
        const previous = parseFloat(series[dates[dates.length - 2]]['4. close']);
        return ((current - previous) / previous) * 100;
    }

    calculateChangeFromValues(values) {
        if (values.length < 2) return 0;
        const current = parseFloat(values[values.length - 1].close);
        const previous = parseFloat(values[values.length - 2].close);
        return ((current - previous) / previous) * 100;
    }

    // Dados mock para fallback
    getMockData(symbol, period = '1M') {
        const days = this.periodToDays(period);
        const prices = [];
        let basePrice = Math.random() * 1000 + 50;
        
        for (let i = 0; i < days; i++) {
            const date = new Date();
            date.setDate(date.getDate() - (days - i));
            
            basePrice += (Math.random() - 0.5) * basePrice * 0.05;
            prices.push({
                date,
                price: basePrice,
                volume: Math.floor(Math.random() * 1000000)
            });
        }

        return {
            symbol,
            prices,
            currentPrice: basePrice,
            change24h: (Math.random() - 0.5) * 10,
            marketCap: basePrice * 1000000
        };
    }

    getMockSearchResults(query) {
        return [
            { symbol: 'AAPL', name: 'Apple Inc.', type: 'stock', country: 'us' },
            { symbol: 'GOOGL', name: 'Alphabet Inc.', type: 'stock', country: 'us' },
            { symbol: 'PETR4.SA', name: 'Petrobras', type: 'stock', country: 'br' },
            { symbol: 'BTC', name: 'Bitcoin', type: 'crypto', country: 'global' },
            { symbol: 'ETH', name: 'Ethereum', type: 'crypto', country: 'global' }
        ].filter(item => 
            item.symbol.toLowerCase().includes(query.toLowerCase()) ||
            item.name.toLowerCase().includes(query.toLowerCase())
        );
    }

    getMockNews() {
        const currentDate = new Date();
        const newsTemplates = [
            {
                title: 'Fed mantém taxa de juros em {rate}% na reunião de {month}',
                summary: 'O Federal Reserve decidiu manter as taxas de juros inalteradas em {rate}% na reunião desta semana, sinalizando cautela com a inflação persistente...',
                source: 'Reuters',
                category: 'monetary-policy'
            },
            {
                title: 'Bitcoin {action} US$ {price} com {sentiment} do mercado',
                summary: 'A principal criptomoeda do mundo {action_desc} nas últimas 24 horas, refletindo o {sentiment} dos investidores em ativos de risco...',
                source: 'CoinDesk',
                category: 'crypto'
            },
            {
                title: 'Ibovespa {direction} {percentage}% em sessão {volatility}',
                summary: 'O principal índice da bolsa brasileira {direction_desc} {percentage}% hoje, em sessão marcada por {volatility_desc}...',
                source: 'InfoMoney',
                category: 'brazilian-market'
            },
            {
                title: 'Petrobras anuncia dividendos de R$ {dividend} por ação',
                summary: 'A estatal brasileira aprovou distribuição de dividendos extraordinários de R$ {dividend} por ação, beneficiando acionistas...',
                source: 'Valor Econômico',
                category: 'dividends'
            },
            {
                title: 'Dólar {dollar_direction} para R$ {dollar_rate} com {market_factor}',
                summary: 'A moeda americana {dollar_desc} para R$ {dollar_rate} nesta sessão, influenciada por {market_factor_desc}...',
                source: 'UOL Economia',
                category: 'currency'
            },
            {
                title: 'Banco Central {bc_action} Selic em {selic_rate}%',
                summary: 'O Comitê de Política Monetária (Copom) decidiu {bc_action_desc} a taxa básica de juros para {selic_rate}% ao ano...',
                source: 'G1 Economia',
                category: 'monetary-policy'
            },
            {
                title: 'FIIs distribuem R$ {fii_amount} bilhões em dividendos em {month}',
                summary: 'Os Fundos de Investimento Imobiliário distribuíram R$ {fii_amount} bilhões em proventos aos cotistas neste mês...',
                source: 'FundsExplorer',
                category: 'fiis'
            },
            {
                title: 'Ações de tecnologia {tech_direction} com {tech_factor}',
                summary: 'As ações do setor de tecnologia {tech_desc} hoje, impulsionadas por {tech_factor_desc}...',
                source: 'TecMundo Investimentos',
                category: 'technology'
            }
        ];

        // Gerar notícias dinâmicas
        const generatedNews = [];
        const usedTemplates = new Set();

        for (let i = 0; i < 8; i++) {
            let template;
            do {
                template = newsTemplates[Math.floor(Math.random() * newsTemplates.length)];
            } while (usedTemplates.has(template) && usedTemplates.size < newsTemplates.length);
            
            usedTemplates.add(template);

            // Gerar dados dinâmicos
            const dynamicData = this.generateDynamicNewsData(template.category);
            
            // Substituir placeholders
            let title = template.title;
            let summary = template.summary;
            
            Object.keys(dynamicData).forEach(key => {
                const placeholder = `{${key}}`;
                title = title.replace(new RegExp(placeholder, 'g'), dynamicData[key]);
                summary = summary.replace(new RegExp(placeholder, 'g'), dynamicData[key]);
            });

            // Gerar timestamp recente (últimas 24 horas)
            const hoursAgo = Math.floor(Math.random() * 24);
            const newsDate = new Date(currentDate.getTime() - (hoursAgo * 60 * 60 * 1000));

            generatedNews.push({
                title,
                summary,
                url: `#news-${i + 1}`,
                publishedAt: newsDate.toISOString(),
                source: template.source,
                category: template.category,
                image: this.getNewsImage(template.category),
                timeAgo: this.formatTimeAgo(hoursAgo)
            });
        }

        return generatedNews.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
    }

    generateDynamicNewsData(category) {
        const currentDate = new Date();
        const month = currentDate.toLocaleDateString('pt-BR', { month: 'long' });
        
        switch (category) {
            case 'monetary-policy':
                return {
                    rate: (Math.random() * 3 + 4).toFixed(2),
                    month,
                    bc_action: Math.random() > 0.5 ? 'mantém' : 'eleva',
                    bc_action_desc: Math.random() > 0.5 ? 'manter' : 'elevar',
                    selic_rate: (Math.random() * 3 + 12).toFixed(2)
                };
            
            case 'crypto':
                const prices = [45000, 52000, 67000, 71000, 89000];
                const actions = ['supera', 'atinge', 'rompe', 'ultrapassa'];
                const sentiments = ['otimismo', 'pessimismo', 'cautela', 'euforia'];
                return {
                    price: prices[Math.floor(Math.random() * prices.length)].toLocaleString(),
                    action: actions[Math.floor(Math.random() * actions.length)],
                    action_desc: Math.random() > 0.5 ? 'subiu' : 'caiu',
                    sentiment: sentiments[Math.floor(Math.random() * sentiments.length)]
                };
            
            case 'brazilian-market':
                const directions = ['avança', 'recua', 'oscila'];
                const percentages = [0.5, 1.2, 2.1, 0.8, 1.7];
                const volatilities = ['volátil', 'estável', 'agitada'];
                return {
                    direction: directions[Math.floor(Math.random() * directions.length)],
                    direction_desc: Math.random() > 0.5 ? 'subiu' : 'caiu',
                    percentage: percentages[Math.floor(Math.random() * percentages.length)],
                    volatility: volatilities[Math.floor(Math.random() * volatilities.length)],
                    volatility_desc: 'alta volatilidade e volume de negócios'
                };
            
            case 'dividends':
                const dividends = [0.85, 1.20, 2.15, 0.95, 1.75];
                return {
                    dividend: dividends[Math.floor(Math.random() * dividends.length)].toFixed(2)
                };
            
            case 'currency':
                const dollarRates = [5.15, 5.25, 5.35, 5.45, 5.55];
                const dollarDirections = ['sobe', 'cai', 'oscila'];
                const marketFactors = ['tensões geopolíticas', 'dados econômicos', 'decisões do Fed'];
                return {
                    dollar_rate: dollarRates[Math.floor(Math.random() * dollarRates.length)].toFixed(2),
                    dollar_direction: dollarDirections[Math.floor(Math.random() * dollarDirections.length)],
                    dollar_desc: Math.random() > 0.5 ? 'subiu' : 'caiu',
                    market_factor: marketFactors[Math.floor(Math.random() * marketFactors.length)],
                    market_factor_desc: 'incertezas no cenário internacional'
                };
            
            case 'fiis':
                const fiiAmounts = [2.5, 3.2, 4.1, 2.8, 3.7];
                return {
                    fii_amount: fiiAmounts[Math.floor(Math.random() * fiiAmounts.length)].toFixed(1),
                    month
                };
            
            case 'technology':
                const techDirections = ['sobem', 'caem', 'oscilam'];
                const techFactors = ['resultados trimestrais', 'inovações em IA', 'regulamentações'];
                return {
                    tech_direction: techDirections[Math.floor(Math.random() * techDirections.length)],
                    tech_desc: Math.random() > 0.5 ? 'subiram' : 'caíram',
                    tech_factor: techFactors[Math.floor(Math.random() * techFactors.length)],
                    tech_factor_desc: 'expectativas positivas do setor'
                };
            
            default:
                return {};
        }
    }

    getNewsImage(category) {
        const images = {
            'monetary-policy': 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=300&h=200&fit=crop',
            'crypto': 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=300&h=200&fit=crop',
            'brazilian-market': 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=300&h=200&fit=crop',
            'dividends': 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=300&h=200&fit=crop',
            'currency': 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=300&h=200&fit=crop',
            'fiis': 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=300&h=200&fit=crop',
            'technology': 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=300&h=200&fit=crop'
        };
        
        return images[category] || 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=300&h=200&fit=crop';
    }

    formatTimeAgo(hoursAgo) {
        if (hoursAgo < 1) {
            return 'Agora mesmo';
        } else if (hoursAgo === 1) {
            return '1 hora atrás';
        } else if (hoursAgo < 24) {
            return `${hoursAgo} horas atrás`;
        } else {
            const daysAgo = Math.floor(hoursAgo / 24);
            return daysAgo === 1 ? '1 dia atrás' : `${daysAgo} dias atrás`;
        }
    }

    // Método para simular atualizações em tempo real
    getRealtimeUpdates() {
        const updates = [];
        const assets = ['BTC', 'ETH', 'AAPL', 'PETR4.SA', 'BOVA11.SA'];
        
        assets.forEach(symbol => {
            const change = (Math.random() - 0.5) * 0.02; // Variação de -1% a +1%
            const currentPrice = this.getLastPrice(symbol) * (1 + change);
            
            updates.push({
                symbol,
                price: currentPrice,
                change: change * 100,
                timestamp: new Date().toISOString(),
                volume: Math.floor(Math.random() * 1000000) + 100000
            });
        });
        
        return updates;
    }

    getLastPrice(symbol) {
        // Preços base para simulação
        const basePrices = {
            'BTC': 67500,
            'ETH': 3850,
            'AAPL': 175.50,
            'PETR4.SA': 38.45,
            'BOVA11.SA': 108.50
        };
        
        return basePrices[symbol] || 100;
    }

    // Método para buscar notícias em tempo real (simulado)
    async getRealtimeNews() {
        // Simular delay de API
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Gerar novas notícias periodicamente
        const freshNews = this.getMockNews();
        
        // Adicionar algumas notícias "breaking"
        if (Math.random() > 0.7) {
            const breakingNews = {
                title: '🔴 URGENTE: ' + freshNews[0].title,
                summary: freshNews[0].summary,
                url: freshNews[0].url,
                publishedAt: new Date().toISOString(),
                source: freshNews[0].source,
                category: 'breaking',
                image: freshNews[0].image,
                timeAgo: 'Agora mesmo',
                isBreaking: true
            };
            
            freshNews.unshift(breakingNews);
        }
        
        return freshNews;
    }

    getMockEconomicIndicators() {
        return {
            usd_brl: { value: 5.25, change: 0.5 },
            selic: { value: 13.75, change: 0 },
            ipca: { value: 4.62, change: -0.1 },
            cdi: { value: 13.65, change: 0 }
        };
    }

    getMockIndicator(name, value) {
        return {
            name,
            value,
            change: (Math.random() - 0.5) * 2,
            lastUpdate: new Date().toISOString()
        };
    }

    // Método para dados do ticker com bandeiras e informações completas
    getTickerData() {
        const tickerAssets = [
            { symbol: 'AAPL', name: 'Apple Inc.', country: 'us', flag: '🇺🇸', basePrice: 175.50 },
            { symbol: 'GOOGL', name: 'Alphabet Inc.', country: 'us', flag: '🇺🇸', basePrice: 142.30 },
            { symbol: 'MSFT', name: 'Microsoft Corp.', country: 'us', flag: '🇺🇸', basePrice: 380.75 },
            { symbol: 'TSLA', name: 'Tesla Inc.', country: 'us', flag: '🇺🇸', basePrice: 248.90 },
            { symbol: 'NVDA', name: 'NVIDIA Corp.', country: 'us', flag: '🇺🇸', basePrice: 875.20 },
            { symbol: 'PETR4.SA', name: 'Petrobras', country: 'br', flag: '🇧🇷', basePrice: 38.45 },
            { symbol: 'VALE3.SA', name: 'Vale S.A.', country: 'br', flag: '🇧🇷', basePrice: 65.80 },
            { symbol: 'ITUB4.SA', name: 'Itaú Unibanco', country: 'br', flag: '🇧🇷', basePrice: 32.15 },
            { symbol: 'BTC', name: 'Bitcoin', country: 'global', flag: '₿', basePrice: 67500.00 },
            { symbol: 'ETH', name: 'Ethereum', country: 'global', flag: 'Ξ', basePrice: 3850.00 },
            { symbol: 'ADA', name: 'Cardano', country: 'global', flag: '₳', basePrice: 0.48 },
            { symbol: 'SOL', name: 'Solana', country: 'global', flag: '◎', basePrice: 145.30 }
        ];

        return tickerAssets.map(asset => {
            const variation = (Math.random() - 0.5) * 0.1; // Variação de -5% a +5%
            const currentPrice = asset.basePrice * (1 + variation);
            const change = currentPrice - asset.basePrice;
            const changePercent = (change / asset.basePrice) * 100;

            return {
                ...asset,
                currentPrice: currentPrice,
                change: change,
                changePercent: changePercent,
                isPositive: change >= 0,
                formattedPrice: this.formatPrice(currentPrice, asset.symbol),
                formattedChange: this.formatChange(changePercent)
            };
        });
    }

    formatPrice(price, symbol) {
        if (symbol.includes('BTC') || symbol.includes('ETH')) {
            return `$${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        } else if (symbol.includes('.SA')) {
            return `R$ ${price.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        } else {
            return `$${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        }
    }

    formatChange(changePercent) {
        const sign = changePercent >= 0 ? '+' : '';
        return `${sign}${changePercent.toFixed(2)}%`;
    }
}

// Inicializar API manager
window.FinancialAPI = new FinancialAPI();
