# 📅 LawSync: Agenda Jurídica Digital (Backend) ⚖️  
### PAC – Projeto de Aprendizagem Colaborativa Extensionista  
### Curso de Engenharia de Software — Católica de Santa Catarina

API RESTful para a plataforma **LawSync**, uma solução extensionista desenvolvida para apoiar escritórios de advocacia na organização eficiente de seus compromissos jurídicos. O sistema oferece uma agenda centralizada, interface amigável (via frontend) e um backend robusto que garante a integridade e segurança das informações.

---

## 👥 Autores  
- **Jhessica Alves**  
- **Laíza Silva**  
- **Victor Moy**

---

## 🎓 Professores Orientadores  
- **Luiz Carlos Camargo**  
- **Claudinei Dias**

---

## 🧾 Justificativa do PAC perante a entidade beneficiada

O projeto **LawSync** foi criado para atender a necessidades reais identificadas em um escritório de advocacia parceiro, que apontou dificuldades no controle de compromissos, prazos, audiências e reuniões internas.  

Os principais problemas encontrados pela entidade beneficiada foram:

- Falta de centralização das informações;  
- Dependência de agendas físicas ou registros manuais;  
- Risco de esquecimento ou conflito entre compromissos;  
- Falta de visibilidade entre advogados e equipe administrativa.

O LawSync surge como solução para:

- Centralizar a agenda jurídica;  
- Evitar conflitos de horário;  
- Melhorar a comunicação interna;  
- Facilitar o planejamento das rotinas do escritório.

Dessa forma, o PAC cumpre seu papel social ao aplicar conhecimentos acadêmicos em um sistema funcional que beneficia diretamente a comunidade.

---

## 📝 Descrição do App

O **LawSync** é uma aplicação web projetada para simplificar e organizar a rotina jurídica, composta por **frontend** e **backend**.  
Este repositório contém o **backend**, que é responsável por:

- Autenticação segura de usuários com JWT;  
- Cadastro e atualização de usuários;  
- Cadastro, edição e exclusão de compromissos;  
- Validação de conflitos de horário;  
- Comunicação via API com o frontend.

📌 **Repositórios:**

- **Frontend:** https://github.com/thelaiza/lawsync-frontend  
- **Backend:** https://github.com/thelaiza/lawsync-backend

---

## 🛠️ Tecnologias Utilizadas

- **Node.js**
- **Express.js**
- **JavaScript (ES Modules)**
- **PostgreSQL**
- **Prisma ORM**
- **JSON Web Token (JWT)**
- **Nodemon**

---

## ✨ Funcionalidades da API

- 🔐 **Login** com JWT  
- 👤 **CRUD de usuários**  
- 🗓️ **CRUD de compromissos jurídicos**  
- ⛔ **Validação automática de horários**  
- 📡 Integração com o frontend  
- 🔄 Atualização segura dos dados  

---

## ⚙️ Requisitos para preparar o ambiente de desenvolvimento

Antes de começar, instale:

- **Node.js 18+**  
- **PostgreSQL 14+**  
- **Git**  
- **NPM ou Yarn**  

---

## 🚀 Como Executar o Projeto

1. **Clone o repositório**
   ```sh
   git clone https://github.com/thelaiza/lawsync-backend
   cd lawync-backend
   ```

2. **Instale as dependências**
   ```sh
   npm install
   ```

3. **Configure o arquivo `.env`**

   Renomeie `.env.example` para `.env` e preencha:

   ```
   DATABASE_URL="postgresql://user:password@localhost:5432/lawsync"
   JWT_SECRET="sua_chave_secreta"
   ```

4. **Execute as migrações**
   ```sh
   npx prisma migrate dev
   ```

5. **Inicie o servidor**
   ```sh
   npm run dev
   ```

6. A API estará rodando em:  
   **http://localhost:3001**

## 🤝 Contribuições

Projeto desenvolvido de forma colaborativa pelos estudantes, como parte do **PAC – Projeto de Aprendizagem Colaborativa Extensionista**, aplicando conhecimentos do curso de Engenharia de Software para resolver problemas reais da comunidade.

---
