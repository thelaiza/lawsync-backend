import { prisma } from '../lib/prisma.js';
import { createAppointmentSchema, updateAppointmentSchema } from '../validators/appointment.js';

export const getAppointments = async (req, res, next) => {
  try {
    const appointments = await prisma.appointment.findMany({
      where: {
        userId: req.user.id
      },
      orderBy: {
        inicio: 'asc'
      }
    });

    res.json({
      success: true,
      data: appointments
    });
  } catch (error) {
    next(error);
  }
};

export const createAppointment = async (req, res, next) => {
  try {
    // Validar dados de entrada
    const validatedData = createAppointmentSchema.parse(req.body);
    const { titulo, inicio, fim, descricao, tipo } = validatedData;

    // Verificar se a data de início é anterior à data de fim
    if (new Date(inicio) >= new Date(fim)) {
      return res.status(400).json({
        success: false,
        message: 'A data de início deve ser anterior à data de fim'
      });
    }

    // Criar compromisso
    const appointment = await prisma.appointment.create({
      data: {
        titulo,
        inicio: new Date(inicio),
        fim: new Date(fim),
        descricao,
        tipo,
        userId: req.user.id
      }
    });

    res.status(201).json({
      success: true,
      message: 'Compromisso criado com sucesso',
      data: appointment
    });
  } catch (error) {
    next(error);
  }
};

export const updateAppointment = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    // Validar dados de entrada
    const validatedData = updateAppointmentSchema.parse(req.body);

    // Verificar se o compromisso existe e pertence ao usuário
    const existingAppointment = await prisma.appointment.findFirst({
      where: {
        id,
        userId: req.user.id
      }
    });

    if (!existingAppointment) {
      return res.status(404).json({
        success: false,
        message: 'Compromisso não encontrado'
      });
    }

    // Verificar se as datas são válidas (se fornecidas)
    if (validatedData.inicio && validatedData.fim) {
      if (new Date(validatedData.inicio) >= new Date(validatedData.fim)) {
        return res.status(400).json({
          success: false,
          message: 'A data de início deve ser anterior à data de fim'
        });
      }
    }

    // Atualizar compromisso
    const updatedAppointment = await prisma.appointment.update({
      where: { id },
      data: {
        ...validatedData,
        ...(validatedData.inicio && { inicio: new Date(validatedData.inicio) }),
        ...(validatedData.fim && { fim: new Date(validatedData.fim) })
      }
    });

    res.json({
      success: true,
      message: 'Compromisso atualizado com sucesso',
      data: updatedAppointment
    });
  } catch (error) {
    next(error);
  }
};

export const deleteAppointment = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Verificar se o compromisso existe e pertence ao usuário
    const existingAppointment = await prisma.appointment.findFirst({
      where: {
        id,
        userId: req.user.id
      }
    });

    if (!existingAppointment) {
      return res.status(404).json({
        success: false,
        message: 'Compromisso não encontrado'
      });
    }

    // Deletar compromisso
    await prisma.appointment.delete({
      where: { id }
    });

    res.json({
      success: true,
      message: 'Compromisso deletado com sucesso'
    });
  } catch (error) {
    next(error);
  }
};
