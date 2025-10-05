import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../lib/prisma.js";
import {
  registerSchema,
  loginSchema,
  updateProfileSchema,
  changePasswordSchema,
} from "../validators/auth.js";

export const register = async (req, res, next) => {
  try {
    // Validar dados de entrada
    const validatedData = registerSchema.parse(req.body);
    const { name, email, password, country, oab } = validatedData;

    // Verificar se usuário já existe
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Este email já está em uso",
      });
    }

    // Hash da senha
    const passwordHash = await bcrypt.hash(password, 12);

    // Criar usuário
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: passwordHash,
        country,
        oab,
      },
      select: {
        id: true,
        name: true,
        email: true,
        country: true,
        oab: true,
        createdAt: true,
      },
    });

    // Gerar token JWT
    const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(201).json({
      success: true,
      message: "Usuário registrado com sucesso",
      token,
      user: newUser,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    // Validar dados de entrada
    const validatedData = loginSchema.parse(req.body);
    const { email, password } = validatedData;

    // Buscar usuário
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Credenciais inválidas",
      });
    }

    // Verificar senha
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Credenciais inválidas",
      });
    }

    // Gerar token JWT
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // Retornar dados do usuário (sem senha)
    const { password: _, ...userResponse } = user;

    res.json({
      success: true,
      message: "Login realizado com sucesso",
      token,
      user: userResponse,
    });
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    // Validar dados de entrada
    const validatedData = updateProfileSchema.parse(req.body);

    // Preparar dados para atualização
    const updateData = { ...validatedData };

    // Se uma nova senha foi fornecida, fazer hash
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 12);
    }

    // Verificar se o email já existe (se estiver sendo alterado)
    if (updateData.email && updateData.email !== req.user.email) {
      const existingUser = await prisma.user.findUnique({
        where: { email: updateData.email },
      });

      if (existingUser) {
        return res.status(409).json({
          success: false,
          message: "Este email já está em uso",
        });
      }
    }

    // Atualizar usuário
    const updatedUser = await prisma.user.update({
      where: { id: req.user.id },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        country: true,
        oab: true,
        updatedAt: true,
      },
    });

    res.json({
      success: true,
      message: "Perfil atualizado com sucesso",
      user: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

export const changePassword = async (req, res, next) => {
  try {
    // Validar dados de entrada
    const validatedData = changePasswordSchema.parse(req.body);
    const { currentPassword, newPassword } = validatedData;

    // Buscar usuário com senha
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        password: true,
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Usuário não encontrado",
      });
    }

    // Verificar senha atual
    const isCurrentPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isCurrentPasswordValid) {
      return res.status(400).json({
        success: false,
        message: "Senha atual incorreta",
      });
    }

    // Verificar se a nova senha é diferente da atual
    const isSamePassword = await bcrypt.compare(newPassword, user.password);
    if (isSamePassword) {
      return res.status(400).json({
        success: false,
        message: "A nova senha deve ser diferente da senha atual",
      });
    }

    // Hash da nova senha
    const newPasswordHash = await bcrypt.hash(newPassword, 12);

    // Atualizar senha
    await prisma.user.update({
      where: { id: req.user.id },
      data: { password: newPasswordHash },
    });

    res.json({
      success: true,
      message: "Senha alterada com sucesso",
    });
  } catch (error) {
    next(error);
  }
};
