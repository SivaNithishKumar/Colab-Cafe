const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'postgres',
        logging: false,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
        define: {
            timestamps: true,
            underscored: true,
            underscoredAll: true,
            freezeTableName: true
        }
    }
);

const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        process.exit(1);
    }
};

const initializeDatabase = async () => {
    try {
        await testConnection();

        // Import models
        const models = require('../models');

        // Sync all models
        await sequelize.sync({ alter: false });
        console.log('All models were synchronized successfully.');

        return models;
    } catch (error) {
        console.error('Database initialization failed:', error);
        process.exit(1);
    }
};

module.exports = { sequelize, testConnection, initializeDatabase };