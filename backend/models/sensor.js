"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Sensor extends Model {
    static associate(models) {
      Sensor.belongsTo(models.Station, { foreignKey: "station_id" });
      Sensor.hasMany(models.SensorData, { foreignKey: "sensor_id" });
      Sensor.hasMany(models.Maintenance, { foreignKey: "sensor_id" });
    }
  }

  Sensor.init(
    {
      name: { type: DataTypes.STRING, allowNull: false },
      code: { type: DataTypes.STRING, allowNull: false },
      abbrev: { type: DataTypes.STRING },
      status: { type: DataTypes.BOOLEAN, defaultValue: true },
    },
    {
      sequelize,
      modelName: "Sensor",
      tableName: "sensors",
      timestamps: true,
      paranoid: true,
    }
  );

  return Sensor;
};
