import { Router } from "express";

import { getStations } from "../controllers/stationController.js";

const router = Router();

router.get("/", getStations);

export default router;