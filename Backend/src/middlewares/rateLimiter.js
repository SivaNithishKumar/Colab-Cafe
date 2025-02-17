const rateLimit = require('express-rate-limit');
const logger = require('../utils/logger');

// Create rate limiters with different configurations
const createRateLimiter = (windowMs, max, message) => {
    return rateLimit({
        windowMs,
        max,
        message: { error: message },
        handler: (req, res, next) => {
            logger.warn(`Rate limit exceeded for IP ${req.ip}`);
            res.status(429).json({ error: message });
        }
    });
};

// General API rate limiter
const apiLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.',
    standardHeaders: true,
    legacyHeaders: false,
});

// Auth endpoints rate limiter (more strict)
const authLimiter = createRateLimiter(
    60 * 60 * 1000, // 1 hour
    5,
    'Too many login attempts from this IP, please try again after an hour.'
);

// Project creation rate limiter
const projectLimiter = createRateLimiter(
    60 * 60 * 1000, // 1 hour
    10,
    'Too many projects created from this IP, please try again later.'
);

module.exports = {
    apiLimiter,
    authLimiter,
    projectLimiter
};