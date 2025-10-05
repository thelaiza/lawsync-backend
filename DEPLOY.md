# 🚀 Guia de Deploy - LawSync Backend

## 📋 Opções de Hospedagem Recomendadas

### 1. **Railway** ⭐ (Recomendado)

- **URL:** https://railway.app
- **Preço:** Gratuito (com limites generosos)
- **Vantagens:** Deploy automático, PostgreSQL incluído, suporte nativo ao Prisma

### 2. **Render**

- **URL:** https://render.com
- **Preço:** Gratuito (aplicações "dormem" após inatividade)
- **Vantagens:** Deploy automático, PostgreSQL gratuito

### 3. **Vercel**

- **URL:** https://vercel.com
- **Preço:** Gratuito
- **Vantagens:** Deploy super rápido, Edge functions
- **Desvantagem:** Precisa de banco externo

## 🚀 Deploy no Railway (Passo a Passo)

### 1. **Preparação**

```bash
# Certifique-se de que tudo está commitado
git add .
git commit -m "feat: preparar para deploy"
git push
```

### 2. **Configuração no Railway**

1. Acesse [railway.app](https://railway.app)
2. Faça login com GitHub
3. Clique em "New Project"
4. Selecione "Deploy from GitHub repo"
5. Escolha seu repositório `lawsync-backend`

### 3. **Adicionar PostgreSQL**

1. No dashboard do projeto, clique em "New"
2. Selecione "Database" → "PostgreSQL"
3. Railway criará automaticamente o banco

### 4. **Configurar Variáveis de Ambiente**

No dashboard do projeto, vá em "Variables" e adicione:

```env
DATABASE_URL=${{Postgres.DATABASE_URL}}
JWT_SECRET=sua-chave-super-secreta-aqui
NODE_ENV=production
PORT=3000
```

### 5. **Deploy Automático**

- Railway fará deploy automático a cada push
- As migrações do Prisma serão executadas automaticamente
- O health check estará disponível em `/health`

## 🔧 Configuração para Outras Plataformas

### **Render**

1. Conecte seu GitHub
2. Selecione o repositório
3. Configure:
   - **Build Command:** `npm install && npx prisma generate`
   - **Start Command:** `npm start`
   - **Environment:** Node

### **Vercel**

1. Conecte seu GitHub
2. Configure como "Other"
3. Adicione variáveis de ambiente
4. Use banco externo (PlanetScale, Supabase)

## 📊 URLs de Teste

Após o deploy, teste estas URLs:

- **Health Check:** `https://seu-app.railway.app/health`
- **API Info:** `https://seu-app.railway.app/api`
- **Registro:** `POST https://seu-app.railway.app/api/auth/register`
- **Login:** `POST https://seu-app.railway.app/api/auth/login`

## 🔄 Atualização do Frontend

Após o deploy, atualize a URL base no frontend:

```javascript
// Antes (desenvolvimento)
const API_BASE_URL = "http://localhost:4000/api";

// Depois (produção)
const API_BASE_URL = "https://seu-app.railway.app/api";
```

## 🛠️ Comandos Úteis

```bash
# Ver logs do deploy
railway logs

# Executar migrações manualmente
railway run npx prisma migrate deploy

# Conectar ao banco
railway connect postgresql
```

## 🚨 Troubleshooting

### **Erro de Migração**

```bash
# Execute manualmente
npx prisma migrate deploy
```

### **Erro de CORS**

- Verifique se o frontend está na lista de origens permitidas
- Adicione a URL de produção no CORS

### **Erro de Variáveis de Ambiente**

- Verifique se todas as variáveis estão configuradas
- Certifique-se de que `DATABASE_URL` está correta

## 📈 Monitoramento

- **Railway:** Dashboard com métricas em tempo real
- **Render:** Logs e métricas no dashboard
- **Vercel:** Analytics e logs detalhados

## 🔒 Segurança

- Use variáveis de ambiente para dados sensíveis
- Configure CORS adequadamente
- Use HTTPS sempre
- Mantenha dependências atualizadas
