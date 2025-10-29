import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const SensorData = sequelize.define('SensorData', {
    sensor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'sensors',
        key: 'id'
      }
    },
    station_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'stations',
        key: 'id'
      }
    },
    level: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    tableName: 'sensor_data',
    timestamps: true,
    paranoid: true
  });

  SensorData.associate = (models) => {
    SensorData.belongsTo(models.Sensor, { foreignKey: 'sensor_id' });
    SensorData.belongsTo(models.Station, { foreignKey: 'station_id' });
  };

  return SensorData;
};