"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class SensorData extends Model {
        static associate(models) {
            SensorData.belongsTo(models.Sensor, { foreignKey: "id_sensor" });
        }
    }

    SensorData.init(
        {
            water_flow: { type: DataTypes.FLOAT },
            water_level: { type: DataTypes.FLOAT },
            status: { type: DataTypes.BOOLEAN, defaultValue: true },
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
