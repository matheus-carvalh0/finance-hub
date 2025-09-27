/**
 * Sistema Inteligente de Classificação de Ativos
 * Classifica automaticamente ativos por tipo, setor, risco e região
 */

class AssetClassifier {
    constructor() {
        this.assetDatabase = this.initializeAssetDatabase();
        this.classificationRules = this.initializeClassificationRules();
    }

    initializeAssetDatabase() {
        return {
            // Ações Brasileiras
            'PETR4.SA': { type: 'stock', sector: 'Energy', region: 'Brazil', risk: 'High', category: 'Petróleo e Gás' },
            'VALE3.SA': { type: 'stock', sector: 'Materials', region: 'Brazil', risk: 'High', category: 'Mineração' },
            'ITUB4.SA': { type: 'stock', sector: 'Financials', region: 'Brazil', risk: 'Medium', category: 'Bancos' },
            'BBDC4.SA': { type: 'stock', sector: 'Financials', region: 'Brazil', risk: 'Medium', category: 'Bancos' },
            'BBAS3.SA': { type: 'stock', sector: 'Financials', region: 'Brazil', risk: 'Medium', category: 'Bancos' },
            'ABEV3.SA': { type: 'stock', sector: 'Consumer Staples', region: 'Brazil', risk: 'Low', category: 'Bebidas' },
            'WEGE3.SA': { type: 'stock', sector: 'Industrials', region: 'Brazil', risk: 'Medium', category: 'Máquinas e Equipamentos' },
            'B3SA3.SA': { type: 'stock', sector: 'Financials', region: 'Brazil', risk: 'Medium', category: 'Serviços Financeiros' },
            'MGLU3.SA': { type: 'stock', sector: 'Consumer Discretionary', region: 'Brazil', risk: 'High', category: 'Varejo' },
            'LREN3.SA': { type: 'stock', sector: 'Consumer Discretionary', region: 'Brazil', risk: 'Medium', category: 'Varejo' },
            'JBSS3.SA': { type: 'stock', sector: 'Consumer Staples', region: 'Brazil', risk: 'Medium', category: 'Alimentos' },
            'BRFS3.SA': { type: 'stock', sector: 'Consumer Staples', region: 'Brazil', risk: 'Medium', category: 'Alimentos' },
            'ELET3.SA': { type: 'stock', sector: 'Utilities', region: 'Brazil', risk: 'Low', category: 'Energia Elétrica' },
            'SBSP3.SA': { type: 'stock', sector: 'Utilities', region: 'Brazil', risk: 'Low', category: 'Saneamento' },
            'CCRO3.SA': { type: 'stock', sector: 'Industrials', region: 'Brazil', risk: 'Medium', category: 'Concessões' },
            'RENT3.SA': { type: 'stock', sector: 'Industrials', region: 'Brazil', risk: 'Medium', category: 'Aluguel de Carros' },
            'HAPV3.SA': { type: 'stock', sector: 'Healthcare', region: 'Brazil', risk: 'Medium', category: 'Saúde' },
            'CSNA3.SA': { type: 'stock', sector: 'Materials', region: 'Brazil', risk: 'High', category: 'Siderurgia' },
            'USIM5.SA': { type: 'stock', sector: 'Materials', region: 'Brazil', risk: 'High', category: 'Siderurgia' },
            'SUZB3.SA': { type: 'stock', sector: 'Materials', region: 'Brazil', risk: 'Medium', category: 'Papel e Celulose' },

            // Ações Americanas
            'AAPL': { type: 'stock', sector: 'Technology', region: 'USA', risk: 'Medium', category: 'Technology' },
            'GOOGL': { type: 'stock', sector: 'Technology', region: 'USA', risk: 'Medium', category: 'Technology' },
            'MSFT': { type: 'stock', sector: 'Technology', region: 'USA', risk: 'Medium', category: 'Technology' },
            'AMZN': { type: 'stock', sector: 'Consumer Discretionary', region: 'USA', risk: 'Medium', category: 'E-commerce' },
            'TSLA': { type: 'stock', sector: 'Consumer Discretionary', region: 'USA', risk: 'High', category: 'Automotive' },
            'META': { type: 'stock', sector: 'Technology', region: 'USA', risk: 'Medium', category: 'Social Media' },
            'NVDA': { type: 'stock', sector: 'Technology', region: 'USA', risk: 'High', category: 'Semiconductors' },
            'NFLX': { type: 'stock', sector: 'Communication Services', region: 'USA', risk: 'Medium', category: 'Streaming' },
            'JPM': { type: 'stock', sector: 'Financials', region: 'USA', risk: 'Medium', category: 'Banking' },
            'BAC': { type: 'stock', sector: 'Financials', region: 'USA', risk: 'Medium', category: 'Banking' },
            'V': { type: 'stock', sector: 'Financials', region: 'USA', risk: 'Low', category: 'Payment Processing' },
            'MA': { type: 'stock', sector: 'Financials', region: 'USA', risk: 'Low', category: 'Payment Processing' },
            'JNJ': { type: 'stock', sector: 'Healthcare', region: 'USA', risk: 'Low', category: 'Pharmaceuticals' },
            'PFE': { type: 'stock', sector: 'Healthcare', region: 'USA', risk: 'Medium', category: 'Pharmaceuticals' },
            'KO': { type: 'stock', sector: 'Consumer Staples', region: 'USA', risk: 'Low', category: 'Beverages' },
            'WMT': { type: 'stock', sector: 'Consumer Staples', region: 'USA', risk: 'Low', category: 'Retail' },

            // ETFs
            'BOVA11.SA': { type: 'etf', sector: 'Diversified', region: 'Brazil', risk: 'Medium', category: 'Índice Bovespa' },
            'SMAL11.SA': { type: 'etf', sector: 'Diversified', region: 'Brazil', risk: 'High', category: 'Small Caps' },
            'IVVB11.SA': { type: 'etf', sector: 'Diversified', region: 'USA', risk: 'Medium', category: 'S&P 500' },
            'SPY': { type: 'etf', sector: 'Diversified', region: 'USA', risk: 'Medium', category: 'S&P 500' },
            'QQQ': { type: 'etf', sector: 'Technology', region: 'USA', risk: 'Medium', category: 'NASDAQ 100' },
            'VTI': { type: 'etf', sector: 'Diversified', region: 'USA', risk: 'Medium', category: 'Total Market' },
            'HASH11.SA': { type: 'etf', sector: 'Cryptocurrency', region: 'Global', risk: 'Very High', category: 'Crypto ETF' },
            'GOLD11.SA': { type: 'etf', sector: 'Commodities', region: 'Global', risk: 'Medium', category: 'Gold' },

            // FIIs
            'HGLG11.SA': { type: 'fii', sector: 'Real Estate', region: 'Brazil', risk: 'Medium', category: 'Logística' },
            'XPML11.SA': { type: 'fii', sector: 'Real Estate', region: 'Brazil', risk: 'Medium', category: 'Shopping Centers' },
            'VISC11.SA': { type: 'fii', sector: 'Real Estate', region: 'Brazil', risk: 'Medium', category: 'Shopping Centers' },
            'KNRI11.SA': { type: 'fii', sector: 'Real Estate', region: 'Brazil', risk: 'Medium', category: 'Corporativo' },
            'BTLG11.SA': { type: 'fii', sector: 'Real Estate', region: 'Brazil', risk: 'Medium', category: 'Logística' },

            // Criptomoedas
            'BTC': { type: 'crypto', sector: 'Cryptocurrency', region: 'Global', risk: 'Very High', category: 'Digital Currency' },
            'ETH': { type: 'crypto', sector: 'Cryptocurrency', region: 'Global', risk: 'Very High', category: 'Smart Contracts' },
            'BNB': { type: 'crypto', sector: 'Cryptocurrency', region: 'Global', risk: 'Very High', category: 'Exchange Token' },
            'ADA': { type: 'crypto', sector: 'Cryptocurrency', region: 'Global', risk: 'Very High', category: 'Smart Contracts' },
            'SOL': { type: 'crypto', sector: 'Cryptocurrency', region: 'Global', risk: 'Very High', category: 'Smart Contracts' },
            'XRP': { type: 'crypto', sector: 'Cryptocurrency', region: 'Global', risk: 'Very High', category: 'Payment' },
            'DOT': { type: 'crypto', sector: 'Cryptocurrency', region: 'Global', risk: 'Very High', category: 'Interoperability' },
            'DOGE': { type: 'crypto', sector: 'Cryptocurrency', region: 'Global', risk: 'Very High', category: 'Meme Coin' },
            'AVAX': { type: 'crypto', sector: 'Cryptocurrency', region: 'Global', risk: 'Very High', category: 'Smart Contracts' },
            'MATIC': { type: 'crypto', sector: 'Cryptocurrency', region: 'Global', risk: 'Very High', category: 'Layer 2' },
            'LTC': { type: 'crypto', sector: 'Cryptocurrency', region: 'Global', risk: 'Very High', category: 'Digital Currency' },
            'UNI': { type: 'crypto', sector: 'Cryptocurrency', region: 'Global', risk: 'Very High', category: 'DeFi' },
            'LINK': { type: 'crypto', sector: 'Cryptocurrency', region: 'Global', risk: 'Very High', category: 'Oracle' },
            'ATOM': { type: 'crypto', sector: 'Cryptocurrency', region: 'Global', risk: 'Very High', category: 'Interoperability' }
        };
    }

    initializeClassificationRules() {
        return {
            riskLevels: {
                'Very Low': { min: 0, max: 5, color: '#10B981', description: 'Risco muito baixo' },
                'Low': { min: 5, max: 15, color: '#34D399', description: 'Risco baixo' },
                'Medium': { min: 15, max: 35, color: '#FBBF24', description: 'Risco médio' },
                'High': { min: 35, max: 60, color: '#F87171', description: 'Risco alto' },
                'Very High': { min: 60, max: 100, color: '#DC2626', description: 'Risco muito alto' }
            },
            idealAllocation: {
                'Conservative': {
                    'Renda Fixa': 70,
                    'Ações Brasil': 15,
                    'Ações Internacional': 10,
                    'FIIs': 5,
                    'Crypto': 0
                },
                'Moderate': {
                    'Renda Fixa': 50,
                    'Ações Brasil': 25,
                    'Ações Internacional': 15,
                    'FIIs': 8,
                    'Crypto': 2
                },
                'Aggressive': {
                    'Renda Fixa': 20,
                    'Ações Brasil': 35,
                    'Ações Internacional': 25,
                    'FIIs': 15,
                    'Crypto': 5
                }
            }
        };
    }

    classifyAsset(symbol) {
        // Buscar na base de dados
        if (this.assetDatabase[symbol]) {
            return this.assetDatabase[symbol];
        }

        // Classificação inteligente baseada no símbolo
        return this.intelligentClassification(symbol);
    }

    intelligentClassification(symbol) {
        const upperSymbol = symbol.toUpperCase();
        
        // Regras para ações brasileiras
        if (upperSymbol.endsWith('.SA')) {
            const baseSymbol = upperSymbol.replace('.SA', '');
            
            // Identificar tipo de ativo
            if (baseSymbol.endsWith('11')) {
                return { type: 'fii', sector: 'Real Estate', region: 'Brazil', risk: 'Medium', category: 'Fundo Imobiliário' };
            } else if (baseSymbol.match(/\d$/)) {
                return { type: 'stock', sector: 'Unknown', region: 'Brazil', risk: 'Medium', category: 'Ação Brasileira' };
            }
        }

        // Regras para criptomoedas
        const cryptoPatterns = ['BTC', 'ETH', 'ADA', 'SOL', 'DOT', 'MATIC', 'LINK', 'UNI', 'AVAX', 'ATOM'];
        if (cryptoPatterns.some(pattern => upperSymbol.includes(pattern))) {
            return { type: 'crypto', sector: 'Cryptocurrency', region: 'Global', risk: 'Very High', category: 'Criptomoeda' };
        }

        // Regras para ETFs
        const etfPatterns = ['SPY', 'QQQ', 'VTI', 'IWM', 'EFA', 'GLD', 'TLT'];
        if (etfPatterns.includes(upperSymbol)) {
            return { type: 'etf', sector: 'Diversified', region: 'USA', risk: 'Medium', category: 'ETF Americano' };
        }

        // Padrão para ações americanas (4 letras ou menos, sem sufixos)
        if (upperSymbol.length <= 5 && !upperSymbol.includes('.') && !upperSymbol.includes('-')) {
            return { type: 'stock', sector: 'Unknown', region: 'USA', risk: 'Medium', category: 'Ação Americana' };
        }

        // Classificação padrão
        return { type: 'unknown', sector: 'Unknown', region: 'Unknown', risk: 'Medium', category: 'Ativo Desconhecido' };
    }

    analyzePortfolio(assets) {
        const analysis = {
            totalValue: 0,
            assetCount: assets.length,
            byType: {},
            bySector: {},
            byRegion: {},
            byRisk: {},
            recommendations: []
        };

        // Analisar cada ativo
        assets.forEach(asset => {
            const classification = this.classifyAsset(asset.symbol);
            const value = asset.value || 0;
            
            analysis.totalValue += value;

            // Agrupar por tipo
            if (!analysis.byType[classification.type]) {
                analysis.byType[classification.type] = { value: 0, percentage: 0, assets: [] };
            }
            analysis.byType[classification.type].value += value;
            analysis.byType[classification.type].assets.push({ ...asset, classification });

            // Agrupar por setor
            if (!analysis.bySector[classification.sector]) {
                analysis.bySector[classification.sector] = { value: 0, percentage: 0, assets: [] };
            }
            analysis.bySector[classification.sector].value += value;
            analysis.bySector[classification.sector].assets.push({ ...asset, classification });

            // Agrupar por região
            if (!analysis.byRegion[classification.region]) {
                analysis.byRegion[classification.region] = { value: 0, percentage: 0, assets: [] };
            }
            analysis.byRegion[classification.region].value += value;
            analysis.byRegion[classification.region].assets.push({ ...asset, classification });

            // Agrupar por risco
            if (!analysis.byRisk[classification.risk]) {
                analysis.byRisk[classification.risk] = { value: 0, percentage: 0, assets: [] };
            }
            analysis.byRisk[classification.risk].value += value;
            analysis.byRisk[classification.risk].assets.push({ ...asset, classification });
        });

        // Calcular percentuais
        Object.keys(analysis.byType).forEach(key => {
            analysis.byType[key].percentage = (analysis.byType[key].value / analysis.totalValue) * 100;
        });
        Object.keys(analysis.bySector).forEach(key => {
            analysis.bySector[key].percentage = (analysis.bySector[key].value / analysis.totalValue) * 100;
        });
        Object.keys(analysis.byRegion).forEach(key => {
            analysis.byRegion[key].percentage = (analysis.byRegion[key].value / analysis.totalValue) * 100;
        });
        Object.keys(analysis.byRisk).forEach(key => {
            analysis.byRisk[key].percentage = (analysis.byRisk[key].value / analysis.totalValue) * 100;
        });

        // Gerar recomendações
        analysis.recommendations = this.generateRecommendations(analysis);

        return analysis;
    }

    generateRecommendations(analysis) {
        const recommendations = [];

        // Verificar concentração por tipo
        Object.keys(analysis.byType).forEach(type => {
            const percentage = analysis.byType[type].percentage;
            if (percentage > 60) {
                recommendations.push({
                    type: 'warning',
                    category: 'Concentração',
                    message: `Sua carteira está muito concentrada em ${type} (${percentage.toFixed(1)}%). Considere diversificar.`,
                    priority: 'high'
                });
            }
        });

        // Verificar concentração por setor
        Object.keys(analysis.bySector).forEach(sector => {
            const percentage = analysis.bySector[sector].percentage;
            if (percentage > 40) {
                recommendations.push({
                    type: 'warning',
                    category: 'Setor',
                    message: `Alta concentração no setor ${sector} (${percentage.toFixed(1)}%). Diversifique entre setores.`,
                    priority: 'medium'
                });
            }
        });

        // Verificar exposição geográfica
        const brazilExposure = analysis.byRegion['Brazil']?.percentage || 0;
        const usaExposure = analysis.byRegion['USA']?.percentage || 0;
        
        if (brazilExposure > 80) {
            recommendations.push({
                type: 'suggestion',
                category: 'Geografia',
                message: `Considere adicionar exposição internacional. Atualmente ${brazilExposure.toFixed(1)}% está no Brasil.`,
                priority: 'medium'
            });
        }

        // Verificar nível de risco
        const highRiskExposure = (analysis.byRisk['High']?.percentage || 0) + (analysis.byRisk['Very High']?.percentage || 0);
        if (highRiskExposure > 50) {
            recommendations.push({
                type: 'warning',
                category: 'Risco',
                message: `${highRiskExposure.toFixed(1)}% da carteira está em ativos de alto risco. Considere rebalancear.`,
                priority: 'high'
            });
        }

        // Sugestões de melhoria
        if (!analysis.byType['fii']) {
            recommendations.push({
                type: 'suggestion',
                category: 'Diversificação',
                message: 'Considere adicionar FIIs para diversificação e renda passiva.',
                priority: 'low'
            });
        }

        if ((analysis.byRegion['USA']?.percentage || 0) < 10) {
            recommendations.push({
                type: 'suggestion',
                category: 'Internacional',
                message: 'Considere aumentar exposição ao mercado americano via ETFs ou BDRs.',
                priority: 'medium'
            });
        }

        return recommendations.sort((a, b) => {
            const priorityOrder = { 'high': 3, 'medium': 2, 'low': 1 };
            return priorityOrder[b.priority] - priorityOrder[a.priority];
        });
    }

    suggestRebalancing(analysis, targetProfile = 'Moderate') {
        const target = this.classificationRules.idealAllocation[targetProfile];
        const suggestions = [];

        // Mapear tipos de ativos para categorias do target
        const typeMapping = {
            'stock': (region) => region === 'Brazil' ? 'Ações Brasil' : 'Ações Internacional',
            'fii': 'FIIs',
            'crypto': 'Crypto',
            'etf': (region) => region === 'Brazil' ? 'Ações Brasil' : 'Ações Internacional'
        };

        // Calcular alocação atual
        const currentAllocation = {
            'Renda Fixa': 0,
            'Ações Brasil': 0,
            'Ações Internacional': 0,
            'FIIs': 0,
            'Crypto': 0
        };

        Object.keys(analysis.byType).forEach(type => {
            const percentage = analysis.byType[type].percentage;
            const assets = analysis.byType[type].assets;
            
            if (type === 'fii') {
                currentAllocation['FIIs'] += percentage;
            } else if (type === 'crypto') {
                currentAllocation['Crypto'] += percentage;
            } else if (type === 'stock' || type === 'etf') {
                // Separar por região
                assets.forEach(asset => {
                    const region = asset.classification.region;
                    if (region === 'Brazil') {
                        currentAllocation['Ações Brasil'] += (asset.value / analysis.totalValue) * 100;
                    } else {
                        currentAllocation['Ações Internacional'] += (asset.value / analysis.totalValue) * 100;
                    }
                });
            }
        });

        // Comparar com target e gerar sugestões
        Object.keys(target).forEach(category => {
            const targetPercentage = target[category];
            const currentPercentage = currentAllocation[category] || 0;
            const difference = targetPercentage - currentPercentage;

            if (Math.abs(difference) > 5) { // Diferença significativa
                suggestions.push({
                    category,
                    current: currentPercentage,
                    target: targetPercentage,
                    difference,
                    action: difference > 0 ? 'increase' : 'decrease',
                    amount: Math.abs(difference),
                    value: (Math.abs(difference) / 100) * analysis.totalValue
                });
            }
        });

        return {
            profile: targetProfile,
            currentAllocation,
            targetAllocation: target,
            suggestions: suggestions.sort((a, b) => Math.abs(b.difference) - Math.abs(a.difference))
        };
    }
}

// Disponibilizar globalmente
window.AssetClassifier = new AssetClassifier();
