# LawSync Backend - Configuração

## Pré-requisitos

- Node.js (versão 18 ou superior)
- PostgreSQL
- npm ou yarn

## Configuração do Banco de Dados

1. Crie um banco PostgreSQL chamado `lawsync_db`
2. Configure a variável `DATABASE_URL` no arquivo `.env`:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/lawsync_db"
```

## Configuração do Ambiente

1. Copie o arquivo `.env.example` para `.env` (se existir)
2. Configure as seguintes variáveis no arquivo `.env`:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/lawsync_db"

# JWT
JWT_SECRET="your-super-secret-jwt-key-here"

# Server
PORT=4000
NODE_ENV=development
```

## Instalação

```bash
# Instalar dependências
npm install

# Gerar cliente Prisma
npx prisma generate

# Executar migrações
npx prisma migrate dev

# Iniciar servidor em desenvolvimento
npm run dev
```

## Estrutura da API

### Autenticação

- `POST /api/auth/register` - Registrar usuário
- `POST /api/auth/login` - Fazer login

### Compromissos

- `GET /api/appointments` - Listar compromissos
- `POST /api/appointments` - Criar compromisso
- `PUT /api/appointments/:id` - Atualizar compromisso
- `DELETE /api/appointments/:id` - Deletar compromisso

### Outros

- `GET /health` - Health check
- `GET /api` - Informações da API

## Estrutura de Dados

### Usuário

```json
{
  "id": "string",
  "name": "string",
  "email": "string",
  "password": "string",
  "country": "string",
  "oab": "string"
}
```

### Compromisso

```json
{
  "id": "string",
  "titulo": "string",
  "inicio": "string (ISO date)",
  "fim": "string (ISO date)",
  "descricao": "string",
  "tipo": "reuniao" | "audiencia" | "consulta",
  "userId": "string"
}
```

## Scripts Disponíveis

- `npm run dev` - Iniciar em modo desenvolvimento
- `npm start` - Iniciar em modo produção
- `npm run prisma:generate` - Gerar cliente Prisma
- `npm run prisma:migrate` - Executar migrações
