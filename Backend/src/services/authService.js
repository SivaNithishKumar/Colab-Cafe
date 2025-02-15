const jwt = require('jsonwebtoken');
const User = require('../models/User');

class AuthService {
    static async register(userData) {
        try {
            // Set default values for new users
            const defaultUserData = {
                ...userData,
                skills: [],
                socialLinks: {
                    github: '',
                    linkedin: '',
                    twitter: '',
                    website: ''
                },
                achievements: [],
                stats: {
                    projectsCount: 0,
                    collaborationsCount: 0,
                    contributionsCount: 0,
                    viewsCount: 0
                }
            };

            const user = await User.create(defaultUserData);
            const token = this.generateToken(user);

            // Exclude password from response
            const userResponse = user.toJSON();
            delete userResponse.password;

            return { user: userResponse, token };
        } catch (error) {
            if (error.name === 'SequelizeUniqueConstraintError') {
                throw new Error('Email or username already exists');
            }
            throw error;
        }
    }

    static async login(email, password) {
        try {
            const user = await User.findOne({
                where: { email },
                attributes: {
                    include: ['password'] // Temporarily include password for validation
                }
            });

            if (!user) {
                throw new Error('Invalid credentials');
            }

            const isValidPassword = await user.validatePassword(password);
            if (!isValidPassword) {
                throw new Error('Invalid credentials');
            }

            const token = this.generateToken(user);

            // Exclude password from response
            const userResponse = user.toJSON();
            delete userResponse.password;

            return { user: userResponse, token };
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    }

    static generateToken(user) {
        return jwt.sign(
            {
                id: user.id,
                role: user.role,
                username: user.username
            },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
        );
    }
}

module.exports = AuthService;