// src/server.js
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://127.0.0.1:5173",
      "http://localhost:3000",
      "http://127.0.0.1:3000",
      /^https:\/\/.*\.vercel\.app$/, // Permite todos os domínios do Vercel
      /^https:\/\/.*\.netlify\.app$/, // Permite todos os domínios do Netlify
    ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Rotas da API
app.use("/api/auth", authRoutes);
app.use("/api/appointments", appointmentRoutes);

// Healthcheck
app.get("/health", (_req, res) => {
  res.json({
    success: true,
    message: "LawSync Backend está funcionando",
    timestamp: new Date().toISOString(),
  });
});

// Rota para verificar se a API está funcionando
app.get("/api", (_req, res) => {
  res.json({
    success: true,
    message: "LawSync API v1.0",
      endpoints: {
        auth: {
          "POST /api/auth/register": "Registrar usuário",
          "POST /api/auth/login": "Fazer login",
          "PUT /api/auth/profile": "Atualizar perfil do usuário",
          "PUT /api/auth/password": "Alterar senha do usuário",
        },
      appointments: {
        "GET /api/appointments": "Listar compromissos",
        "POST /api/appointments": "Criar compromisso",
        "PUT /api/appointments/:id": "Atualizar compromisso",
        "DELETE /api/appointments/:id": "Deletar compromisso",
      },
    },
  });
});

// Middleware de tratamento de erros (deve ser o último)
app.use(errorHandler);

// Middleware para rotas não encontradas
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Rota não encontrada",
  });
});

const PORT = Number(process.env.PORT) || 4000;

// Verificações de ambiente
if (!process.env.JWT_SECRET) {
  console.warn("⚠️  JWT_SECRET ausente no .env");
}

if (!process.env.DATABASE_URL) {
  console.warn("⚠️  DATABASE_URL ausente no .env");
}

app.listen(PORT, () => {
  console.log(`🚀 LawSync Backend rodando em http://localhost:${PORT}`);
  console.log(`📋 API disponível em http://localhost:${PORT}/api`);
  console.log(`❤️  Health check em http://localhost:${PORT}/health`);
});
