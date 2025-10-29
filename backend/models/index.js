import { Sequelize, DataTypes } from 'sequelize';
import config from '../config/config.js';

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    logging: false
  }
);

// Initialize db object
const db = { sequelize, Sequelize, DataTypes };

// Import models
const modelDefiners = [
  { name: 'User', definer: (await import('./user.js')).default },
  { name: 'Sensor', definer: (await import('./sensor.js')).default },
  { name: 'Station', definer: (await import('./station.js')).default },
  { name: 'SensorData', definer: (await import('./sensordata.js')).default },
  { name: 'Community', definer: (await import('./community.js')).default },
  { name: 'Maintenance', definer: (await import('./maintenance.js')).default }
];

// Define all models
for (const { name, definer } of modelDefiners) {
  const model = definer(sequelize, DataTypes);
  db[model.name] = model;
}

// Set up associations
for (const modelName of Object.keys(db)) {
  if (db[modelName]?.associate) {
    db[modelName].associate(db);
  }
}

export default db;