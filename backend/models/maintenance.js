import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Maintenance = sequelize.define('Maintenance', {
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('pending', 'in_progress', 'completed'),
      defaultValue: 'pending'
    },
    date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    timestamps: true,
    tableName: 'maintenances'
  });

  return Maintenance;
};