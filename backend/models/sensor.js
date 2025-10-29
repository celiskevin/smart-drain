import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Sensor = sequelize.define('Sensor', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    timestamps: true,
    tableName: 'sensors'
  });

  return Sensor;
};