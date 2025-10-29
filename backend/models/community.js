import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Community = sequelize.define('Community', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT
    }
  }, {
    timestamps: true,
    tableName: 'communities'
  });

  return Community;
};