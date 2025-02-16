const { DataTypes } = require('sequelize');
const sequelize = require('../config/database').sequelize;

const TeamMember = sequelize.define('TeamMember', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    teamId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'Teams',
            key: 'id'
        }
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'id'
        }
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'member'
    },
    joinedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    indexes: [
        {
            unique: true,
            fields: ['teamId', 'userId']
        }
    ]
});

module.exports = TeamMember; 