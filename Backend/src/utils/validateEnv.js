const { ValidationError } = require('./errors');

const requiredEnvVars = [
    'NODE_ENV',
    'PORT',
    'DB_HOST',
    'DB_PORT',
    'DB_NAME',
    'DB_USER',
    'DB_PASSWORD',
    'JWT_SECRET',
    'FRONTEND_URL'
];

const validateEnv = () => {
    const missingVars = requiredEnvVars.filter(envVar => !process.env[envVar]);
    
    if (missingVars.length > 0) {
        throw new ValidationError(
            `Missing required environment variables: ${missingVars.join(', ')}`
        );
    }

    // Validate specific values
    if (!['development', 'production', 'test'].includes(process.env.NODE_ENV)) {
        throw new ValidationError('NODE_ENV must be development, production, or test');
    }

    if (isNaN(process.env.PORT)) {
        throw new ValidationError('PORT must be a number');
    }

    return true;
};

module.exports = validateEnv;