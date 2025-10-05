import { z } from 'zod';

export const createAppointmentSchema = z.object({
  titulo: z.string().min(1, 'Título é obrigatório'),
  inicio: z.string().datetime('Data de início inválida'),
  fim: z.string().datetime('Data de fim inválida'),
  descricao: z.string().min(1, 'Descrição é obrigatória'),
  tipo: z.enum(['reuniao', 'audiencia', 'consulta'], {
    errorMap: () => ({ message: 'Tipo deve ser: reuniao, audiencia ou consulta' })
  }),
});

export const updateAppointmentSchema = createAppointmentSchema.partial();
