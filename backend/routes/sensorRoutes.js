import { Router } from 'express';
import { getSensorData, createSensorData, getActiveSensorsCount } from '../controllers/sensorController.js';

const router = Router();

router.get('/', getSensorData);
router.post('/', createSensorData);
router.get('/active-count', getActiveSensorsCount);

export default router;