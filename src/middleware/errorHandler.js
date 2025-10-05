import { ZodError } from 'zod';
import { Prisma } from '@prisma/client';

export const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  // Erro de validação do Zod
  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      message: 'Dados inválidos',
      errors: err.errors?.map(error => ({
        field: error.path?.join('.') || 'unknown',
        message: error.message
      })) || []
    });
  }

  // Erro do Prisma - registro não encontrado
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2025') {
      return res.status(404).json({
        success: false,
        message: 'Registro não encontrado'
      });
    }
    
    if (err.code === 'P2002') {
      return res.status(409).json({
        success: false,
        message: 'Já existe um registro com esses dados'
      });
    }
  }

  // Erro de autenticação
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      success: false,
      message: 'Token inválido'
    });
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      success: false,
      message: 'Token expirado'
    });
  }

  // Erro genérico
  res.status(500).json({
    success: false,
    message: 'Erro interno do servidor'
  });
};
