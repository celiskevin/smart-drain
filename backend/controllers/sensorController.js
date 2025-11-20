import db from '../models/index.js';
const { SensorData, Sensor, Station } = db;

export const getSensorData = async (req, res) => {
  try {
    const data = await SensorData.findAll({
      include: [Sensor, Station]
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createSensorData = async (req, res) => {
  try {
    const { sensor_id, station_id, level } = req.body;

    if (!sensor_id || !station_id || level === undefined) {
      return res.status(400).json({
        error: "sensor_id, station_id, and level are required"
      });
    }

    const data = await SensorData.create({
      sensor_id,
      station_id,
      level
    });

    res.status(201).json(data);
  } catch (error) {
    console.error('Error creating sensor data:', error);
    res.status(500).json({
      error: "Error creating sensor data",
      details: error.message
    });
  }
};