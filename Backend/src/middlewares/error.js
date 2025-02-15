const logger = require('../utils/logger');
const { AppError } = require('../utils/errors');

const errorHandler = (err, req, res, next) => {
    logger.error(err.message, { error: err });

    // Sequelize validation errors
    if (err.name === 'SequelizeValidationError') {
        return res.status(400).json({
            error: err.errors.map(e => ({ field: e.path, message: e.message }))
        });
    }

    // Sequelize unique constraint errors
    if (err.name === 'SequelizeUniqueConstraintError') {
        return res.status(409).json({
            error: 'Resource already exists',
            fields: err.errors.map(e => e.path)
        });
    }

    // JWT errors
    if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({ error: 'Invalid token' });
    }

    if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ error: 'Token expired' });
    }

    // Custom AppError instances
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            error: err.message
        });
    }

    // Default error
    res.status(500).json({
        error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
    });
};

module.exports = errorHandler;