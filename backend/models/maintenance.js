import { DataTypes } from "sequelize";

export default (sequelize) => {
  const Maintenance = sequelize.define(
    "Maintenance",
    {
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },

      date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },

      assigned_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      technician_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      station_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "sin resolver"
      }
    },
    {
      timestamps: true,
      tableName: "maintenances",
    }
  );

  return Maintenance;
};
