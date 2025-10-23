"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Station extends Model {
    static associate(models) {
      Station.belongsTo(models.Community, { foreignKey: "community_id" });
      Station.hasMany(models.Sensor, { foreignKey: "station_id" });
      Station.hasMany(models.Maintenance, { foreignKey: "station_id" });
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
