"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // 🔹 Eliminamos columnas antiguas si existen
    await Promise.all([
      queryInterface.removeColumn("sensor_data", "temp_value").catch(() => {}),
      queryInterface.removeColumn("sensor_data", "humidity").catch(() => {}),
      queryInterface.removeColumn("sensor_data", "water_flow").catch(() => {}),
    ]);

    // 🔹 Agregamos la nueva columna `level` si no existe
    await queryInterface.addColumn("sensor_data", "level", {
      type: Sequelize.FLOAT,
      allowNull: false,
    }).catch(() => {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("sensor_data", "level").catch(() => {});
  },
};
