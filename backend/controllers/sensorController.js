const { SensorData, Sensor, Station } = require("../models");

module.exports = {
  // 👉 Crear un nuevo registro de sensor
  async create(req, res) {
    try {
      const { level, sensor_id, station_id, status } = req.body;

      // Validar que vengan los campos necesarios
      if (!sensor_id || !station_id || level === undefined) {
        return res.status(400).json({
          message: "Faltan datos requeridos: sensor_id, station_id o level.",
        });
      }

      // Verificar que el sensor y la estación existan
      const sensor = await Sensor.findByPk(sensor_id);
      const station = await Station.findByPk(station_id);

      if (!sensor) {
        return res.status(404).json({ message: "Sensor no encontrado." });
      }

      if (!station) {
        return res.status(404).json({ message: "Estación no encontrada." });
      }

      // Crear el registro de sensor_data
      const newData = await SensorData.create({
        level,
        sensor_id,
        station_id,
        status: status ?? true, // Por defecto activo
      });

      return res.status(201).json({
        message: "Datos del sensor guardados correctamente.",
        data: newData,
      });
    } catch (error) {
      console.error("❌ Error al guardar los datos del sensor:", error);
      return res.status(500).json({
        message: "Error interno del servidor.",
        error: error.message,
      });
    }
  },

  // 👉 Obtener todos los registros
  async getAll(req, res) {
    try {
      const data = await SensorData.findAll({
        include: [
          { model: Sensor, attributes: ["id", "name"] },
          { model: Station, attributes: ["id", "name"] },
        ],
        order: [["createdAt", "DESC"]],
      });

      return res.status(200).json(data);
    } catch (error) {
      console.error("❌ Error al obtener datos:", error);
      return res.status(500).json({ message: "Error al obtener los datos." });
    }
  },

  // 👉 Obtener el último registro de un sensor
  async getLastBySensor(req, res) {
    try {
      const { sensor_id } = req.params;

      const lastData = await SensorData.findOne({
        where: { sensor_id },
        order: [["createdAt", "DESC"]],
        include: [
          { model: Sensor, attributes: ["name"] },
          { model: Station, attributes: ["name"] },
        ],
      });

      if (!lastData) {
        return res
          .status(404)
          .json({ message: "No hay datos para este sensor." });
      }

      return res.status(200).json(lastData);
    } catch (error) {
      console.error("❌ Error al obtener último registro:", error);
      return res.status(500).json({ message: "Error interno del servidor." });
    }
  },
};
