# Finance Hub - Monitor Financeiro Global

Um sistema completo de gestão e monitoramento de investimentos pessoais com funcionalidades avançadas de análise, alertas e educação financeira.

## 🚀 Funcionalidades

### 🔐 Sistema de Autenticação
- Login e cadastro de usuários
- Autenticação com Google (simulada)
- Gerenciamento de sessão seguro
- Dados isolados por usuário

### 📊 Gerenciamento de Carteiras
- Criação e edição de múltiplas carteiras
- Busca inteligente de ativos com autocomplete
- Suporte a ações brasileiras, americanas, ETFs e criptomoedas
- Visualização de performance em tempo real
- Comparação entre carteiras com métricas avançadas

### 📈 Dashboard Interativo
- Visão geral das carteiras do usuário
- Carrossel de ativos em destaque
- Seção de ações em alta/baixa
- Criptomoedas populares
- Feed de notícias financeiras
- Gráficos interativos com Chart.js

### 🎓 Seção Educacional "Aprenda a Investir"
- **Educação Financeira**: Conteúdo sobre renda fixa, variável e criptomoedas
- **Calculadoras Financeiras**:
  - Juros compostos
  - Renda fixa (CDI, IPCA, pré-fixado)
  - Simulador de investimentos por perfil de risco
- **Planilhas**: Templates para controle financeiro
- **Imposto de Renda**: Calculadora e guias sobre tributação

### ⚖️ Rebalanceador de Carteira
- Configuração de alocação alvo por categoria
- Monitoramento automático de desvios
- Sugestões inteligentes de rebalanceamento
- Alertas personalizáveis por período
- Análise de risco/retorno

### 🔔 Sistema de Alertas
- **Alertas de Ativos**: Preço, variação percentual
- **Alertas Econômicos**: Decisões FED/COPOM, variação do dólar
- **Alertas de Rebalanceamento**: Notificações automáticas
- Histórico completo de alertas disparados
- Configuração flexível por usuário

### 🌐 Integração com APIs Financeiras
- Dados em tempo real de múltiplas fontes
- Suporte a Alpha Vantage, Twelve Data, CoinGecko
- Cache inteligente para otimização
- Fallback para dados mock em caso de erro
- Busca unificada de ativos

## 🛠️ Tecnologias Utilizadas

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Tailwind CSS
- **Gráficos**: Chart.js
- **Ícones**: Ionicons
- **APIs**: Alpha Vantage, Twelve Data, CoinGecko, Financial Modeling Prep
- **Armazenamento**: LocalStorage (dados do usuário)
- **Responsividade**: Mobile-first design

## 📁 Estrutura do Projeto

```
finance-hub/
├── index.html              # Página principal
├── style.css              # Estilos personalizados
├── js/
│   ├── auth.js            # Sistema de autenticação
│   ├── api.js             # Integração com APIs financeiras
│   └── app.js             # Lógica principal da aplicação
├── assets/
│   ├── images/            # Imagens e recursos visuais
│   └── data/
│       └── mock-data.js   # Dados de demonstração
└── README.md              # Documentação
```

## 🚀 Como Usar

### 1. Acesso ao Sistema
- Abra o arquivo `index.html` em um navegador moderno
- Faça login com email/senha ou use "Login com Google"
- Para teste, use qualquer email/senha ou o login social

### 2. Criando sua Primeira Carteira
1. Acesse "Gerenciar Carteiras" no menu lateral
2. Digite um nome para sua carteira
3. Use o campo de busca para adicionar ativos (ex: AAPL, PETR4.SA, BTC)
4. Clique em "Salvar Carteira"

### 3. Comparando Carteiras
1. Crie pelo menos duas carteiras
2. Acesse "Comparador" no menu
3. Selecione as carteiras para comparação
4. Analise métricas como retorno, volatilidade e Índice Sharpe

### 4. Configurando Alertas
1. Acesse "Alertas" no menu
2. Configure alertas para ativos específicos
3. Ative alertas econômicos de seu interesse
4. Monitore o indicador de alertas no header

### 5. Rebalanceamento
1. Acesse "Rebalanceador" no menu
2. Selecione uma carteira existente
3. Configure a alocação alvo por categoria
4. Defina a frequência de verificação
5. Receba sugestões automáticas de ajustes

## 📚 Seção Educacional

### Calculadoras Disponíveis

#### Juros Compostos
- Valor inicial e aportes mensais
- Taxa de juros anual
- Período de investimento
- Projeção de crescimento

#### Renda Fixa
- Diferentes tipos de indexação (CDI, IPCA, pré-fixado)
- Cálculo com taxas atuais do mercado
- Projeção de rendimento líquido

#### Simulador de Investimentos
- Perfis de risco (Conservador, Moderado, Arrojado)
- Alocação automática por perfil
- Projeção de carteira balanceada

#### Imposto de Renda
- Cálculo para renda fixa (tabela regressiva)
- Tributação de ações e FIIs
- Simulação de IR devido

## 🔧 Configuração de APIs

Para usar dados reais, configure as chaves das APIs no arquivo `js/api.js`:

```javascript
this.apis = {
    alphaVantage: {
        key: 'SUA_CHAVE_AQUI'
    },
    twelveData: {
        key: 'SUA_CHAVE_AQUI'
    },
    fmp: {
        key: 'SUA_CHAVE_AQUI'
    }
};
```

### APIs Recomendadas (Gratuitas)
- **Alpha Vantage**: 5 requests/minuto
- **Twelve Data**: 8 requests/minuto
- **CoinGecko**: 50 requests/minuto (sem chave)
- **Financial Modeling Prep**: 250 requests/dia

## 🎨 Personalização

### Temas
- Suporte completo a modo escuro/claro
- Alternância automática baseada na preferência do sistema
- Persistência da escolha do usuário

### Responsividade
- Design mobile-first
- Adaptação automática para tablets e desktops
- Menu lateral colapsável em dispositivos móveis

## 🔒 Segurança e Privacidade

- Dados armazenados localmente no navegador
- Isolamento de dados por usuário
- Não há transmissão de dados pessoais para servidores externos
- Senhas não são armazenadas em texto plano (simulação)

## 🚀 Funcionalidades Futuras

- [ ] Integração com Open Banking
- [ ] Sincronização com corretoras
- [ ] Relatórios em PDF
- [ ] Backup na nuvem
- [ ] Análise técnica avançada
- [ ] Simulação de Monte Carlo
- [ ] Alertas por WhatsApp/Email
- [ ] Modo offline completo

## 📱 Compatibilidade

- **Navegadores**: Chrome 80+, Firefox 75+, Safari 13+, Edge 80+
- **Dispositivos**: Desktop, Tablet, Mobile
- **Resolução**: Otimizado para 320px - 4K

## 🤝 Contribuição

Este é um projeto de demonstração. Para melhorias:

1. Faça um fork do projeto
2. Crie uma branch para sua feature
3. Implemente as mudanças
4. Teste em diferentes dispositivos
5. Submeta um pull request

## 📄 Licença

Este projeto é fornecido como exemplo educacional. Use livremente para aprendizado e desenvolvimento pessoal.

## 📞 Suporte

Para dúvidas sobre implementação ou funcionalidades:
- Consulte a documentação inline no código
- Verifique os comentários nos arquivos JavaScript
- Teste as funcionalidades no modo de demonstração

---

**Finance Hub** - Seu monitor financeiro global completo 📊💰
