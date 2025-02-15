const helmet = require('helmet');
const xss = require('xss-clean');
const hpp = require('hpp');

const securityMiddleware = [
    // Basic security headers
    helmet(),
    
    // Prevent XSS attacks
    helmet.xssFilter(),
    xss(),
    
    // Prevent HTTP Parameter Pollution
    hpp(),
    
    // Content Security Policy
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            imgSrc: ["'self'", 'data:', 'https:'],
            scriptSrc: ["'self'"],
            fontSrc: ["'self'", 'https:', 'data:'],
            objectSrc: ["'none'"]
        }
    }),
    
    // Additional security headers
    helmet.dnsPrefetchControl({ allow: false }),
    helmet.frameguard({ action: 'deny' }),
    helmet.hidePoweredBy(),
    helmet.hsts({
        maxAge: 31536000,
        includeSubDomains: true,
        preload: true
    }),
    helmet.ieNoOpen(),
    helmet.noSniff(),
    
    // Custom middleware to sanitize request body
    (req, res, next) => {
        if (req.body) {
            Object.keys(req.body).forEach(key => {
                if (typeof req.body[key] === 'string') {
                    req.body[key] = req.body[key].trim();
                }
            });
        }
        next();
    }
];

module.exports = securityMiddleware;