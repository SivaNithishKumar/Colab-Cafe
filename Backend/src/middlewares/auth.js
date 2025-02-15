const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { AuthenticationError } = require('../utils/errors');

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            throw new AuthenticationError('No token provided');
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findByPk(decoded.id, {
            attributes: { exclude: ['password'] }
        });

        if (!user) {
            throw new AuthenticationError('User not found');
        }

        req.user = user;
        req.token = token;
        next();
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({ error: 'Invalid token' });
        }
        res.status(401).json({ error: error.message || 'Please authenticate' });
    }
};

const authorize = (roles = []) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ error: 'Access denied' });
        }
        next();
    };
};

module.exports = { auth, authorize };