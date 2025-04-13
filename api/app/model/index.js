'use strict';

const Sequelize = require('sequelize');
const dbConfig = require('../config/DbConfig');

// Const sequelize = new Sequelize(process.env.POSTGRESQL_DB_URI);
let dialectOptions = {};

if (process.env.NODE_ENV !== 'dev') {
  dialectOptions = {
    ssl: {
      Require: true, // Make sure to set this
      RejectUnauthorized: false, // Ignore self-signed certificates
    },
  };
}

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  logging: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
  dialectOptions,
});

const testDbConnection = async () => {
  try {
    await sequelize.authenticate();

    console.info('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

module.exports = { sq: sequelize, testDbConnection };
