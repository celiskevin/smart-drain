import { Router } from 'express';
import { getSensorData, createSensorData } from '../controllers/sensorController.js';

const router = Router();

router.get('/', getSensorData);
router.post('/', createSensorData);

export default router;