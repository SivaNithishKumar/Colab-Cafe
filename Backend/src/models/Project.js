const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Project = sequelize.define('Project', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    thumbnail: {
        type: DataTypes.STRING,
        allowNull: true
    },
    tags: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: '[]',
        get() {
            const rawValue = this.getDataValue('tags');
            return rawValue ? JSON.parse(rawValue) : [];
        },
        set(value) {
            this.setDataValue('tags', JSON.stringify(value || []));
        }
    },
    likes: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    commentsCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false
    }
}, {
    timestamps: true
});

module.exports = Project;