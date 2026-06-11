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

<img width="1916" height="917" alt="Captura de tela 2026-06-11 155347" src="https://github.com/user-attachments/assets/ad27cb68-472f-4ef8-859a-a2dec26f3d50" />

### Login

<img width="1545" height="847" alt="Captura de tela 2026-06-11 155801" src="https://github.com/user-attachments/assets/298b6698-caf6-43a0-a736-a9e1c8a8af15" />

### Cadastro

<img width="1575" height="883" alt="Captura de tela 2026-06-11 155829" src="https://github.com/user-attachments/assets/97b122a8-c5af-415a-9d1b-79aa17cd3b06" />

### Dashboard

<img width="1536" height="519" alt="Captura de tela 2026-06-11 155709" src="https://github.com/user-attachments/assets/ce5cfec8-5989-4fb8-af54-a2684b096db6" />

### Lista de Viagens

<img width="1350" height="451" alt="Captura de tela 2026-06-11 155433" src="https://github.com/user-attachments/assets/f203c342-1b6e-45f9-b9eb-21572b6aa0f3" />
### Detalhes da Viagem

<img width="1644" height="893" alt="Captura de tela 2026-06-11 155656" src="https://github.com/user-attachments/assets/bc131a41-544d-4072-a457-4386c13fc02c" />
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
