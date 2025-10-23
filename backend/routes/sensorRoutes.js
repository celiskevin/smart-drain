const express = require("express");
const router = express.Router();
const sensorController = require("../controllers/sensorController");

router.post("/", sensorController.create);

router.get("/", sensorController.getAll);

router.get("/:sensor_id/last", sensorController.getLastBySensor);

module.exports = router;
