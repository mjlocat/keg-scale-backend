import { Sequelize, DataTypes } from 'sequelize';
import { dsn } from '../utils/dbUtils.js';

const sequelize = new Sequelize(dsn);

export const configModel = sequelize.define('Config', {
  config_item: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  config_value: {
    type: DataTypes.STRING,
  },
}, {
  tableName: 'config',
  timestamps: false,
});

export const createConfigTable = async () => {
  try {
    await configModel.sync();
  } catch (error) {
    console.error('Error creating Config table:', error);
  }
}

export const findAll = async () => {
  try {
    return await configModel.findAll();
  } catch (error) {
    console.error('Error fetching all config:', error);
  }
}

export const updateBackendPort = async (backend_port) => {
  try {
    return await configModel.upsert({
      config_item: 'backend_port',
      config_value: backend_port,
    });
  } catch (error) {
    console.error('Error setting backend port:', error);
  }
}
