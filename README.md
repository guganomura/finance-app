# FinanceApp
Protótipo de alta fidelidade — App Mobile de Controle de Gastos Pessoais
Disciplina: CCP310.SP - Experiência do Usuário e Front-End
Professor: André Levi Zanon
Alunos: Gustavo Nomura (RA: 72.125.050-4) | Lucas Melo Priolli (RA: 72.125.017-3)

## Como executar localmente
1. Clone o repositório: git clone https://github.com/guganomura/finance-app.git
2. Acesse a pasta: cd finance-app
3. Instale as dependências: npm install
4. Execute o projeto: npm start
5. Acesse: http://localhost:3000

## Tecnologias utilizadas
- React 18 + Create React App
- React Router DOM
- Recharts
- CSS Modules

## Mudanças realizadas em relação ao protótipo de média fidelidade
- Campo Data adicionado ao formulário de novo gasto
- Campo Categoria alterado de texto livre para dropdown com opções predefinidas
- Validação inline nos campos obrigatórios
- Máscara monetária no campo Valor
- Toast de confirmação ao salvar gasto
- Empty states nas seções sem dados
- Separação visual do botão Sair no menu lateral
- Labels de texto adicionados aos ícones de navegação
- Gráficos com legendas e interatividade (tooltip ao passar o mouse)