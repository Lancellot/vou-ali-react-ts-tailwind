# Vou Ali Frontend React

Aplicação web desenvolvida com React, TypeScript e Vite para auxiliar no planejamento e gerenciamento de viagens. O sistema permite organizar roteiros, controlar despesas, cadastrar atividades e acompanhar todas as etapas da viagem em uma interface moderna e responsiva.

---

## Sobre

O **Vou Ali Frontend React** é a interface do projeto acadêmico **Vou Ali**, responsável por fornecer uma experiência intuitiva para o gerenciamento de viagens.

A aplicação consome a API desenvolvida em NestJS e oferece funcionalidades completas para organização de roteiros, cidades, atividades, paradas e despesas.

### Principais objetivos

* Centralizar informações da viagem em um único lugar;
* Facilitar o planejamento de roteiros;
* Organizar atividades e despesas;
* Fornecer uma experiência intuitiva e responsiva;
* Integrar-se ao backend por meio de uma API REST.

---

## Funcionalidades

* Autenticação de usuários com JWT;
* Cadastro de novos usuários;
* Login e controle de sessão;
* Dashboard com indicadores da viagem;
* Cadastro e gerenciamento de viagens;
* Cadastro de cidades;
* Cadastro de paradas;
* Cadastro de atividades;
* Cadastro de despesas;
* Exclusão e edição de registros;
* Rotas protegidas;
* Feedback visual através de notificações;
* Interface responsiva.

---

## Tecnologias Principais

| Categoria        | Tecnologias                  |
| ---------------- | ---------------------------- |
| Linguagem        | TypeScript                   |
| Framework        | React                        |
| Build Tool       | Vite                         |
| Estilização      | Tailwind CSS                 |
| Roteamento       | React Router DOM             |
| Estado Global    | Context API                  |
| Requisições HTTP | Axios                        |
| Notificações     | React Toastify               |
| Ícones           | Phosphor Icons, Lucide React |

---

## Estrutura do Projeto

```text
src
├── assets
│   ├── logos
│   └── imagens
│
├── components
│   ├── atividade
│   ├── cidade
│   ├── despesa
│   ├── footer
│   ├── home
│   ├── navbar
│   ├── parada
│   └── viagem
│
├── contexts
│   └── AuthContext.tsx
│
├── data
│
├── models
│
├── pages
│   ├── cadastro
│   ├── dashboard
│   ├── home
│   ├── login
│   ├── perfil
│   ├── sobre
│   └── viagens
│
├── services
│
├── utils
│
├── App.tsx
├── main.tsx
└── index.css
```

---

## Telas do Sistema

### Home

Página inicial com apresentação da plataforma, funcionalidades e chamada para cadastro.

### Login

Tela de autenticação dos usuários.

### Cadastro

Tela de criação de novas contas.

### Dashboard

Painel com indicadores e informações resumidas das viagens cadastradas.

### Viagens

Listagem e gerenciamento das viagens cadastradas pelo usuário.

### Detalhes da Viagem

Visualização completa de:

* cidades;
* paradas;
* atividades;
* despesas.

---

## Screenshots

### Página Inicial

![Home](docs/screenshots/home.png)

### Login

![Login](docs/screenshots/login.png)

### Cadastro

![Cadastro](docs/screenshots/cadastro.png)

### Dashboard

![Dashboard](docs/screenshots/dashboard.png)

### Lista de Viagens

![Viagens](docs/screenshots/viagens.png)

### Detalhes da Viagem

![Detalhes da Viagem](docs/screenshots/detalhes-viagem.png)

---

## Estrutura para Imagens

```text
docs
└── screenshots
    ├── home.png
    ├── login.png
    ├── cadastro.png
    ├── dashboard.png
    ├── viagens.png
    └── detalhes-viagem.png
```

---

## Pré-requisitos

Antes de executar o projeto, certifique-se de possuir:

* Node.js 18 ou superior;
* npm instalado;
* Backend Vou Ali em execução;
* Navegador atualizado.

---

## Instalação e Execução

### 1. Clone o repositório

```bash
git clone https://github.com/lancellot/vou-ali-react-ts-tailwind.git
cd vou-ali-react-ts-tailwind
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure a API

Verifique o arquivo:

```text
src/services/Service.ts
```

Configure a URL da API backend:

```ts
const api = axios.create({
  baseURL: 'http://localhost:3000'
});
```

---

### 4. Execute a aplicação

```bash
npm run dev
```

A aplicação ficará disponível em:

```text
http://localhost:5173
```

---

### 5. Gerar Build

```bash
npm run build
```

---

### 6. Visualizar Build

```bash
npm run preview
```

---

## Fluxo de Utilização

### Cadastro e Login

1. Crie uma conta.
2. Realize login.
3. Receba o token JWT.
4. Acesse as funcionalidades protegidas.

### Planejamento de Viagem

1. Cadastre uma viagem.
2. Adicione cidades.
3. Cadastre paradas.
4. Organize atividades.
5. Controle despesas.
6. Acompanhe tudo através do dashboard.

---

## Integração com Backend

O frontend consome a API REST do projeto **Vou Ali Backend Nest**.

### Recursos consumidos

* Usuários;
* Autenticação JWT;
* Viagens;
* Cidades;
* Paradas;
* Atividades;
* Despesas;
* Dashboard.

---

## Scripts Disponíveis

| Script          | Descrição                            |
| --------------- | ------------------------------------ |
| npm run dev     | Executa o projeto em desenvolvimento |
| npm run build   | Gera o build de produção             |
| npm run preview | Visualiza o build localmente         |
| npm run lint    | Executa o ESLint                     |

---

## Responsividade

A interface foi construída utilizando Tailwind CSS seguindo a abordagem **Mobile First**, garantindo compatibilidade com:

* Smartphones;
* Tablets;
* Notebooks;
* Monitores Desktop.

---

## Contribuindo

Contribuições são bem-vindas.

* Crie uma branch específica para sua alteração;
* Mantenha o padrão de componentes reutilizáveis;
* Utilize TypeScript tipado;
* Execute o lint antes de abrir Pull Requests;
* Documente alterações relevantes.

---

## Licença

Projeto desenvolvido para fins acadêmicos e educacionais.

Consulte o repositório para mais informações sobre licenciamento.
