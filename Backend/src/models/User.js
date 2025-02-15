const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const bcrypt = require('bcryptjs');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    avatar: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'https://secure.gravatar.com/avatar?d=mp'
    },
    bio: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: true
    },
    skills: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: '[]',
        get() {
            const rawValue = this.getDataValue('skills');
            return rawValue ? JSON.parse(rawValue) : [];
        },
        set(value) {
            this.setDataValue('skills', JSON.stringify(value || []));
        }
    },
    socialLinks: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: '{"github":"","linkedin":"","twitter":"","website":""}',
        get() {
            const rawValue = this.getDataValue('socialLinks');
            return rawValue ? JSON.parse(rawValue) : {
                github: '',
                linkedin: '',
                twitter: '',
                website: ''
            };
        },
        set(value) {
            this.setDataValue('socialLinks', JSON.stringify(value || {
                github: '',
                linkedin: '',
                twitter: '',
                website: ''
            }));
        }
    },
    achievements: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: '[]',
        get() {
            const rawValue = this.getDataValue('achievements');
            return rawValue ? JSON.parse(rawValue) : [];
        },
        set(value) {
            this.setDataValue('achievements', JSON.stringify(value || []));
        }
    },
    stats: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: '{"projectsCount":0,"collaborationsCount":0,"contributionsCount":0,"viewsCount":0}',
        get() {
            const rawValue = this.getDataValue('stats');
            return rawValue ? JSON.parse(rawValue) : {
                projectsCount: 0,
                collaborationsCount: 0,
                contributionsCount: 0,
                viewsCount: 0
            };
        },
        set(value) {
            this.setDataValue('stats', JSON.stringify(value || {
                projectsCount: 0,
                collaborationsCount: 0,
                contributionsCount: 0,
                viewsCount: 0
            }));
        }
    },
    role: {
        type: DataTypes.ENUM('user', 'admin'),
        defaultValue: 'user'
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    timestamps: true,
    hooks: {
        beforeCreate: async (user) => {
            if (user.password) {
                user.password = await bcrypt.hash(user.password, 10);
            }
        },
        beforeUpdate: async (user) => {
            if (user.changed('password')) {
                user.password = await bcrypt.hash(user.password, 10);
            }
        }
    }
});

User.prototype.validatePassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

module.exports = User;