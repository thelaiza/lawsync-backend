// src/server.js
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import authMiddleware from "./middleware/authMiddleware.js";

const app = express();

// Log útil para depuração:
console.log("ENV PORT:", process.env.PORT);
console.log("ENV JWT_SECRET definido?:", Boolean(process.env.JWT_SECRET));

app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Rotas públicas
app.use("/api/auth", authRoutes);

// Rota protegida de exemplo
app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({
    message: `Olá ${req.user.name}, acesso liberado.`,
    user: req.user,
  });
});

// Healthcheck
app.get("/health", (_req, res) => res.json({ ok: true }));

const PORT = Number(process.env.PORT) || 4000;

// Aviso (não derruba o app). No controller de login você já trata ausência da secret.
if (!process.env.JWT_SECRET) {
  console.warn(
    "⚠️  JWT_SECRET ausente no .env — login vai falhar até você defini-la."
  );
}

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
