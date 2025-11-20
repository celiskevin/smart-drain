import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Station = sequelize.define('Station', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    timestamps: true,
    tableName: 'stations'
  });

  return Station;
};