'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('sensor_data', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      sensor_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'sensors', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      station_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'stations', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      temp_value: { type: Sequelize.FLOAT },
      humidity: { type: Sequelize.FLOAT },
      status: { type: Sequelize.BOOLEAN, defaultValue: true },
      createdAt: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.fn('NOW') },
      updatedAt: { allowNull: false, type: Sequelize.DATE, defaultValue: Sequelize.fn('NOW') },
      deletedAt: { type: Sequelize.DATE, allowNull: true }
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('sensor_data');
  }
};