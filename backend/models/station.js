"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Station extends Model {
        static associate(models) {
            Station.belongsTo(models.Community, { foreignKey: "id_community" });
            Station.hasMany(models.Sensor, { foreignKey: "id_station" });
            Station.hasMany(models.Maintenance, { foreignKey: "id_station" });
        }
    }

    Station.init(
        {
            name: { type: DataTypes.STRING, allowNull: false },
            code: { type: DataTypes.STRING, allowNull: false },
            status: { type: DataTypes.BOOLEAN, defaultValue: true },
        },
        {
            sequelize,
            modelName: "Station",
            tableName: "stations",
            timestamps: true,
            paranoid: true,
        }
    );

    return Station;
};
