<h1 align="center">📅 LawSync: Agenda Jurídica Digital (Backend) ⚖️</h1>

<p align="center">
    API RESTful para a plataforma LawSync, uma solução eficiente para escritórios de advocacia gerenciarem os compromissos de seus advogados.
</p>

<br>

## 🚀 Sobre o Projeto

Este repositório contém o código-fonte do **backend** da aplicação **LawSync: Agenda Jurídica**. A API foi desenvolvida para fornecer os endpoints necessários para a gestão de usuários e compromissos, garantindo a segurança e a integridade dos dados.

**🔗 Repositório do Frontend:** [https://github.com/thelaiza/lawsync-frontend]

## 🛠️ Tecnologias Utilizadas

* **Backend:** <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js Badge">
* **Banco de Dados:** <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL Badge">

## ✨ Funcionalidades da API

* 🔒 **Autenticação:** Endpoints para login de usuários com geração de token.
* 👤 **Gerenciamento de Usuários:** Rotas para criar, listar e atualizar usuários.
* 🗓️ **Gerenciamento de Compromissos (CRUD):** Endpoints para criar, ler, atualizar e deletar compromissos.
* 🚫 **Validação de Horários:** Lógica para impedir o cadastro de compromissos com horários inválidos.

## ⚙️ Como Executar o Projeto

1.  **Clone o repositório:**
    ```sh
    git clone [https://github.com/thelaiza/lawsync-backend]
    ```
2.  **Instale as dependências:**
    ```sh
    npm install
    ```
3.  **Configure as variáveis de ambiente:**
    * Renomeie o arquivo `.env.example` para `.env`.
    * Preencha as variáveis com os dados de conexão do seu banco de dados PostgreSQL e outras chaves necessárias.
4.  **Execute as migrações do banco de dados (se aplicável):**
    ```sh
    npm run migrate
    ```
5.  **Inicie o servidor:**
    ```sh
    npm run dev
    ```
6.  O servidor estará rodando em `http://localhost:3001` (ou a porta configurada).

## 🤝 Contribuições
Jhessica Alves
Laíza Silva
Victor Moy
* Jhessica Alves
* Laíza Silva
* Victor Moy
