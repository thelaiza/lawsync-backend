import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { findUserByEmail, createUser } from "../models/userModel.js";

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ message: "Todos os campos são obrigatórios.", field: null });
  }

  try {
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      // ajuda o front a mostrar o erro no campo email
      return res
        .status(409)
        .json({ message: "Este email já está em uso.", field: "email" });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = await createUser({ name, email, password: passwordHash });

    const { password: _, ...userResponse } = newUser;
    return res
      .status(201)
      .json({ message: "Usuário registrado com sucesso!", user: userResponse });
  } catch (error) {
    return res
      .status(500)
      .json({
        message: "Erro no servidor ao registrar usuário.",
        error: error.message,
      });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email e senha são obrigatórios.", field: null });
  }

  try {
    const user = await findUserByEmail(email);
    if (!user) {
      // pode apontar pro campo email
      return res
        .status(401)
        .json({ message: "Credenciais inválidas.", field: "email" });
    }

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      // pode apontar pro campo password
      return res
        .status(401)
        .json({ message: "Credenciais inválidas.", field: "password" });
    }

    // Segurança: garante que a secret existe (além do check no server.js)
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      return res
        .status(500)
        .json({
          message: "Configuração inválida do servidor (JWT_SECRET ausente).",
        });
    }

    const token = jwt.sign({ sub: user.id, name: user.name }, secret, {
      expiresIn: "1h",
    });

    return res.status(200).json({
      message: "Login bem-sucedido!",
      token,
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (error) {
    return res
      .status(500)
      .json({
        message: "Erro no servidor ao fazer login.",
        error: error.message,
      });
  }
};
