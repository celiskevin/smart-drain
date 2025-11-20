import { Router } from 'express';
import { getMaintenancesCount } from '../controllers/maintenancesController.js';

const router = Router();

router.get('/count', getMaintenancesCount);

export default router;
