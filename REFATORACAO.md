# LawSync Backend - Refatoração Completa

## ✅ O que foi implementado

### 🗄️ Banco de Dados
- **Prisma ORM** configurado com PostgreSQL
- **Schema** com modelos User e Appointment
- **Relacionamentos** entre usuários e compromissos
- **Enum** para tipos de compromisso (reunião, audiência, consulta)

### 🔐 Autenticação
- **JWT** para autenticação
- **bcrypt** para hash de senhas
- **Middleware** de autenticação robusto
- **Validação** de dados com Zod

### 📋 API Endpoints

#### Autenticação
- `POST /api/auth/register` - Registrar usuário
- `POST /api/auth/login` - Fazer login

#### Compromissos
- `GET /api/appointments` - Listar compromissos do usuário
- `POST /api/appointments` - Criar novo compromisso
- `PUT /api/appointments/:id` - Atualizar compromisso
- `DELETE /api/appointments/:id` - Deletar compromisso

### 🛡️ Segurança e Validação
- **Validação** de entrada com Zod
- **Tratamento** de erros padronizado
- **CORS** configurado para o frontend
- **Middleware** de autenticação em todas as rotas protegidas

### 🏗️ Estrutura do Projeto
```
src/
├── controllers/
│   ├── authController.js
│   └── appointmentController.js
├── middleware/
│   ├── authMiddleware.js
│   └── errorHandler.js
├── routes/
│   ├── authRoutes.js
│   └── appointmentRoutes.js
├── validators/
│   ├── auth.js
│   └── appointment.js
├── lib/
│   └── prisma.js
└── server.js
```

## 🚀 Como usar

### 1. Configurar Banco de Dados
```bash
# Criar banco PostgreSQL
createdb lawsync_db

# Configurar DATABASE_URL no .env
DATABASE_URL="postgresql://username:password@localhost:5432/lawsync_db"
```

### 2. Instalar e Configurar
```bash
npm install
npx prisma generate
npx prisma migrate dev
```

### 3. Iniciar Servidor
```bash
npm run dev
```

## 📊 Estrutura de Dados

### Usuário
```json
{
  "id": "string (cuid)",
  "name": "string",
  "email": "string (unique)",
  "password": "string (hashed)",
  "country": "string",
  "oab": "string",
  "createdAt": "datetime",
  "updatedAt": "datetime"
}
```

### Compromisso
```json
{
  "id": "string (cuid)",
  "titulo": "string",
  "inicio": "datetime",
  "fim": "datetime",
  "descricao": "string",
  "tipo": "reuniao" | "audiencia" | "consulta",
  "userId": "string",
  "createdAt": "datetime",
  "updatedAt": "datetime"
}
```

## 🔧 Funcionalidades Implementadas

### ✅ Autenticação Completa
- Registro com validação de dados
- Login com verificação de credenciais
- JWT com expiração de 7 dias
- Middleware de autenticação

### ✅ CRUD de Compromissos
- Listagem filtrada por usuário
- Criação com validação de datas
- Atualização com verificação de propriedade
- Exclusão com verificação de propriedade

### ✅ Validações
- Dados de entrada com Zod
- Verificação de datas (início < fim)
- Verificação de propriedade de recursos
- Tratamento de erros padronizado

### ✅ Segurança
- Hash de senhas com bcrypt
- JWT seguro
- CORS configurado
- Validação de tokens

## 🎯 Compatibilidade com Frontend

O backend está 100% compatível com as APIs esperadas pelo frontend React:

- ✅ Estrutura de dados idêntica
- ✅ Endpoints corretos
- ✅ Formato de resposta padronizado
- ✅ CORS configurado para localhost:5173
- ✅ Autenticação JWT
- ✅ Tratamento de erros

## 🚀 Próximos Passos

1. **Configurar** variáveis de ambiente no `.env`
2. **Executar** migrações do Prisma
3. **Testar** a API com o frontend
4. **Deploy** em produção (opcional)

## 📝 Notas Técnicas

- **Prisma** para ORM e migrações
- **Zod** para validação de dados
- **bcryptjs** para hash de senhas
- **jsonwebtoken** para JWT
- **Express** com middlewares customizados
- **CORS** configurado para desenvolvimento
