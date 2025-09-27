// Dados mock para demonstração do Finance Hub
window.MockData = {
    // Dados de exemplo para carteiras
    samplePortfolios: [
        {
            id: 'sample-1',
            name: 'Carteira Conservadora',
            assets: ['SELIC', 'IPCA+', 'CDB', 'LCI', 'TESOURO SELIC'],
            description: 'Carteira focada em renda fixa com baixo risco',
            expectedReturn: 8.5,
            risk: 'Baixo'
        },
        {
            id: 'sample-2',
            name: 'Carteira Balanceada',
            assets: ['PETR4.SA', 'VALE3.SA', 'ITUB4.SA', 'BOVA11.SA', 'SELIC'],
            description: 'Mix equilibrado entre renda fixa e variável',
            expectedReturn: 11.2,
            risk: 'Médio'
        },
        {
            id: 'sample-3',
            name: 'Carteira Internacional',
            assets: ['AAPL', 'GOOGL', 'MSFT', 'SPY', 'VTI'],
            description: 'Exposição ao mercado americano',
            expectedReturn: 14.8,
            risk: 'Alto'
        }
    ],

    // Indicadores econômicos atuais
    economicIndicators: {
        selic: { value: 13.75, change: 0, lastUpdate: '2024-01-31' },
        ipca: { value: 4.62, change: -0.15, lastUpdate: '2024-01-15' },
        cdi: { value: 13.65, change: 0, lastUpdate: '2024-02-01' },
        usdBrl: { value: 5.25, change: 0.02, lastUpdate: '2024-02-01' },
        fedRate: { value: 5.50, change: 0, lastUpdate: '2024-01-31' }
    },

    // Notícias financeiras de exemplo
    financialNews: [
        {
            id: 1,
            title: 'Banco Central mantém Selic em 13,75% ao ano',
            summary: 'Em decisão unânime, o Comitê de Política Monetária (Copom) decidiu manter a taxa básica de juros inalterada pela segunda reunião consecutiva.',
            content: 'O Banco Central do Brasil manteve a taxa Selic em 13,75% ao ano, conforme esperado pelo mercado. A decisão foi tomada por unanimidade pelos membros do Copom, que avaliaram que o atual patamar da taxa é adequado para o processo de convergência da inflação à meta.',
            source: 'Banco Central do Brasil',
            publishedAt: '2024-02-01T14:30:00Z',
            category: 'Política Monetária',
            impact: 'Alto',
            url: '#'
        },
        {
            id: 2,
            title: 'Petrobras anuncia dividendos extraordinários de R$ 20 bilhões',
            summary: 'A estatal aprovou a distribuição de proventos aos acionistas após resultado recorde no quarto trimestre de 2023.',
            content: 'A Petrobras anunciou o pagamento de dividendos extraordinários no valor de R$ 20 bilhões, equivalente a R$ 1,53 por ação. O pagamento será realizado em duas parcelas, sendo a primeira em março e a segunda em junho de 2024.',
            source: 'Petrobras',
            publishedAt: '2024-01-30T16:45:00Z',
            category: 'Empresas',
            impact: 'Médio',
            url: '#'
        },
        {
            id: 3,
            title: 'Bitcoin supera US$ 67.000 com aprovação de ETFs',
            summary: 'A principal criptomoeda do mundo registra alta de 15% na semana após aprovação de novos ETFs nos Estados Unidos.',
            content: 'O Bitcoin atingiu a marca de US$ 67.000, renovando máximas históricas. O movimento é atribuído à crescente adoção institucional e à aprovação de novos ETFs de Bitcoin nos Estados Unidos, que facilitam o acesso de investidores tradicionais ao ativo.',
            source: 'CoinDesk',
            publishedAt: '2024-01-29T10:20:00Z',
            category: 'Criptomoedas',
            impact: 'Alto',
            url: '#'
        }
    ],

    // Dados de performance histórica simulada
    generateHistoricalData: (symbol, days = 30) => {
        const data = [];
        let basePrice = Math.random() * 1000 + 50;
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - days);

        for (let i = 0; i < days; i++) {
            const date = new Date(startDate);
            date.setDate(date.getDate() + i);
            
            // Simular variação diária
            const variation = (Math.random() - 0.5) * 0.05; // -2.5% a +2.5%
            basePrice *= (1 + variation);
            
            data.push({
                date: date.toISOString().split('T')[0],
                price: parseFloat(basePrice.toFixed(2)),
                volume: Math.floor(Math.random() * 1000000) + 100000,
                high: parseFloat((basePrice * 1.02).toFixed(2)),
                low: parseFloat((basePrice * 0.98).toFixed(2)),
                open: parseFloat((basePrice * (1 + (Math.random() - 0.5) * 0.01)).toFixed(2))
            });
        }

        return data;
    },

    // Calculadoras pré-configuradas
    calculatorPresets: {
        aposentadoria: {
            name: 'Planejamento de Aposentadoria',
            description: 'Calcule quanto precisa investir para se aposentar',
            fields: [
                { name: 'idadeAtual', label: 'Idade Atual', type: 'number', default: 30 },
                { name: 'idadeAposentadoria', label: 'Idade para Aposentadoria', type: 'number', default: 65 },
                { name: 'rendaMensal', label: 'Renda Mensal Desejada (R$)', type: 'number', default: 5000 },
                { name: 'inflacao', label: 'Inflação Anual (%)', type: 'number', default: 4.5 }
            ]
        },
        emergencia: {
            name: 'Reserva de Emergência',
            description: 'Calcule sua reserva de emergência ideal',
            fields: [
                { name: 'gastosMensais', label: 'Gastos Mensais (R$)', type: 'number', default: 3000 },
                { name: 'mesesReserva', label: 'Meses de Reserva', type: 'number', default: 6 },
                { name: 'valorAtual', label: 'Valor Atual da Reserva (R$)', type: 'number', default: 0 }
            ]
        }
    },

    // Alertas de exemplo
    sampleAlerts: [
        {
            id: 'alert-1',
            type: 'price',
            asset: 'BTC',
            condition: 'above',
            value: 65000,
            message: 'Bitcoin atingiu US$ 65.000',
            active: true,
            createdAt: '2024-01-15T10:00:00Z'
        },
        {
            id: 'alert-2',
            type: 'change',
            asset: 'PETR4.SA',
            condition: 'below',
            value: -5,
            message: 'Petrobras caiu mais de 5%',
            active: true,
            createdAt: '2024-01-20T14:30:00Z'
        }
    ],

    // Configurações de rebalanceamento de exemplo
    sampleRebalanceConfig: {
        portfolioId: 'sample-2',
        frequency: 90, // dias
        tolerance: 5, // percentual
        allocations: {
            rendaFixa: 40,
            acoesBrasil: 30,
            acoesInternacionais: 20,
            fundosImobiliarios: 10
        },
        lastRebalance: '2024-01-01T00:00:00Z',
        nextCheck: '2024-04-01T00:00:00Z'
    },

    // Dados educacionais
    educationalContent: {
        articles: [
            {
                id: 'art-1',
                title: 'Como começar a investir do zero',
                category: 'Iniciante',
                readTime: '8 min',
                summary: 'Guia completo para quem está começando no mundo dos investimentos',
                content: 'Investir pode parecer complicado no início, mas com as informações certas...',
                tags: ['iniciante', 'primeiros-passos', 'educacao-financeira']
            },
            {
                id: 'art-2',
                title: 'Diversificação: Por que não colocar todos os ovos na mesma cesta',
                category: 'Intermediário',
                readTime: '12 min',
                summary: 'Entenda a importância da diversificação na sua carteira de investimentos',
                content: 'A diversificação é uma das estratégias mais importantes...',
                tags: ['diversificacao', 'gestao-risco', 'carteira']
            }
        ],
        videos: [
            {
                id: 'vid-1',
                title: 'Renda Fixa vs Renda Variável',
                duration: '15:30',
                thumbnail: '/assets/images/video-thumb-1.jpg',
                description: 'Comparação detalhada entre os dois tipos de investimento'
            }
        ]
    },

    // Métricas de performance
    performanceMetrics: {
        calculateSharpeRatio: (returns, riskFreeRate = 0.1375) => {
            const avgReturn = returns.reduce((sum, r) => sum + r, 0) / returns.length;
            const variance = returns.reduce((sum, r) => sum + Math.pow(r - avgReturn, 2), 0) / returns.length;
            const stdDev = Math.sqrt(variance);
            return (avgReturn - riskFreeRate) / stdDev;
        },
        
        calculateMaxDrawdown: (prices) => {
            let maxDrawdown = 0;
            let peak = prices[0];
            
            for (let i = 1; i < prices.length; i++) {
                if (prices[i] > peak) {
                    peak = prices[i];
                } else {
                    const drawdown = (peak - prices[i]) / peak;
                    maxDrawdown = Math.max(maxDrawdown, drawdown);
                }
            }
            
            return maxDrawdown;
        },
        
        calculateVolatility: (returns) => {
            const avgReturn = returns.reduce((sum, r) => sum + r, 0) / returns.length;
            const variance = returns.reduce((sum, r) => sum + Math.pow(r - avgReturn, 2), 0) / returns.length;
            return Math.sqrt(variance * 252); // Anualizada
        }
    },

    // Utilitários
    utils: {
        formatCurrency: (value, currency = 'BRL') => {
            return new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: currency
            }).format(value);
        },
        
        formatPercentage: (value, decimals = 2) => {
            return `${value.toFixed(decimals)}%`;
        },
        
        formatDate: (date, locale = 'pt-BR') => {
            return new Date(date).toLocaleDateString(locale);
        },
        
        generateRandomColor: () => {
            const colors = [
                '#3b82f6', '#ef4444', '#10b981', '#f59e0b',
                '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16'
            ];
            return colors[Math.floor(Math.random() * colors.length)];
        }
    }
};
