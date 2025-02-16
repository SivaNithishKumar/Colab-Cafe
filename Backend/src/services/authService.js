const jwt = require('jsonwebtoken');
const User = require('../models/User');

class AuthService {
    static async register(userData) {
        try {
            // Validate required fields
            if (!userData.email || !userData.password || !userData.username) {
                throw new Error('Email, password, and username are required');
            }

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
                if (error.errors[0].path === 'email') {
                    throw new Error('Email already exists');
                }
                if (error.errors[0].path === 'username') {
                    throw new Error('Username already exists');
                }
            }
            throw error;
        }
    }

    static async login(email, password) {
        try {
            if (!email || !password) {
                throw new Error('Email and password are required');
            }

            const user = await User.findOne({
                where: { email },
                attributes: {
                    include: ['password']
                }
            });

            if (!user) {
                throw new Error('Invalid credentials');
            }

            const isValidPassword = await user.validatePassword(password);
            if (!isValidPassword) {
                throw new Error('Invalid credentials');
            }

            if (!user.isActive) {
                throw new Error('Account is deactivated');
            }

            const token = this.generateToken(user);

            // Update last login timestamp
            await user.update({ lastLoginAt: new Date() });

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
        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET is not defined');
        }

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