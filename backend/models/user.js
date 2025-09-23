"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            User.hasMany(models.Maintenance, { as: "AssignedMaintenances", foreignKey: "assigned_by" });
            User.hasMany(models.Maintenance, { as: "TechnicianMaintenances", foreignKey: "technician_id" });
        }
    }

    User.init(
        {
            firstname: { type: DataTypes.STRING, allowNull: false },
            lastname: { type: DataTypes.STRING, allowNull: false },
            email: { type: DataTypes.STRING, allowNull: false, unique: true, validate: { isEmail: true } },
            password: { type: DataTypes.STRING, allowNull: false },
            role: { type: DataTypes.ENUM("admin", "tecnico", "usuario"), allowNull: false },
            status: { type: DataTypes.BOOLEAN, defaultValue: true },
        },
        {
            sequelize,
            modelName: "User",
            tableName: "users",
            timestamps: true,
            paranoid: true,
        }
    );

    return User;
};
