"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class SensorData extends Model {
    static associate(models) {
      SensorData.belongsTo(models.Sensor, { foreignKey: "sensor_id" });
      SensorData.belongsTo(models.Station, { foreignKey: "station_id" });
    }
  }

  SensorData.init(
    {
      sensor_id: { type: DataTypes.INTEGER, allowNull: false },
      station_id: { type: DataTypes.INTEGER, allowNull: false },
      level: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      sequelize,
      modelName: "SensorData",
      tableName: "sensor_data",
      timestamps: true,
      paranoid: true,
    }
  );

  return SensorData;
};
