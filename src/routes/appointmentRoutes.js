import { Router } from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import {
  getAppointments,
  createAppointment,
  updateAppointment,
  deleteAppointment
} from '../controllers/appointmentController.js';

const router = Router();

// Todas as rotas de compromissos requerem autenticação
router.use(authMiddleware);

router.get('/', getAppointments);
router.post('/', createAppointment);
router.put('/:id', updateAppointment);
router.delete('/:id', deleteAppointment);

export default router;
