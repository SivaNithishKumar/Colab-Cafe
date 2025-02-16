const { DataTypes } = require('sequelize');
const sequelize = require('../config/database').sequelize;

const Team = sequelize.define('Team', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    leaderId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'id'
        }
    },
    avatar: {
        type: DataTypes.STRING,
        allowNull: true
    },
    achievements: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: '[]',
        get() {
            const rawValue = this.getDataValue('achievements');
            try {
                return rawValue ? JSON.parse(rawValue) : [];
            } catch (error) {
                console.error('Error parsing achievements:', error);
                return [];
            }
        },
        set(value) {
            try {
                this.setDataValue('achievements',
                    typeof value === 'string' ? value : JSON.stringify(value || []));
            } catch (error) {
                console.error('Error setting achievements:', error);
                this.setDataValue('achievements', '[]');
            }
        }
    },
    stats: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: '{}',
        get() {
            const rawValue = this.getDataValue('stats');
            try {
                return rawValue ? JSON.parse(rawValue) : {};
            } catch (error) {
                console.error('Error parsing stats:', error);
                return {};
            }
        },
        set(value) {
            try {
                this.setDataValue('stats',
                    typeof value === 'string' ? value : JSON.stringify(value || {}));
            } catch (error) {
                console.error('Error setting stats:', error);
                this.setDataValue('stats', '{}');
            }
        }
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
});

module.exports = Team; 