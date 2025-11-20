import { Router } from 'express';
import { getMaintenancesCount, getMaintenanceData, updateMaintenanceStatus } from '../controllers/maintenancesController.js';

const router = Router();

router.get('/count', getMaintenancesCount);
router.get('/', getMaintenanceData);

router.put('/:id/status', updateMaintenanceStatus);


export default router;
