"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Community extends Model {
        static associate(models) {
            Community.hasMany(models.Station, { foreignKey: "id_community" });
        }
    }

    Community.init(
        {
            name: { type: DataTypes.STRING, allowNull: false },
            code: { type: DataTypes.STRING, allowNull: false },
            status: { type: DataTypes.BOOLEAN, defaultValue: true },
        },
        {
            sequelize,
            modelName: "Community",
            tableName: "communities",
            timestamps: true,
            paranoid: true,
        }
    );

    return Community;
};
