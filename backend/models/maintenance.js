"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Maintenance extends Model {
        static associate(models) {
            Maintenance.belongsTo(models.Station, { foreignKey: "id_station" });
            Maintenance.belongsTo(models.Sensor, { foreignKey: "id_sensor" });
            Maintenance.belongsTo(models.User, { as: "AssignedBy", foreignKey: "assigned_by" });
            Maintenance.belongsTo(models.User, { as: "Technician", foreignKey: "technician_id" });
        }
    }

    Maintenance.init(
        {
            date: { type: DataTypes.DATE, allowNull: false },
            type: { type: DataTypes.ENUM("preventivo", "correctivo", "inspeccion"), allowNull: false },
            description: { type: DataTypes.TEXT },
            status: {
                type: DataTypes.ENUM("pendiente", "en_progreso", "completado", "cancelado"),
                defaultValue: "pendiente",
            },
        },
        {
            sequelize,
            modelName: "Maintenance",
            tableName: "maintenances",
            timestamps: true,
            paranoid: true,
        }
    );

    return Maintenance;
};
