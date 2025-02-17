const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const TeamMember = sequelize.define('TeamMember', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    teamId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'team_id',
        references: {
            model: 'teams',
            key: 'id'
        },
        validate: {
            notNull: {
                msg: 'Team ID is required'
            }
        }
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'user_id',
        references: {
            model: 'Users',
            key: 'id'
        },
        validate: {
            notNull: {
                msg: 'User ID is required'
            }
        }
    },
    role: {
        type: DataTypes.ENUM('leader', 'admin', 'member'),
        allowNull: false,
        defaultValue: 'member',
        validate: {
            isIn: {
                args: [['leader', 'admin', 'member']],
                msg: 'Invalid role. Must be leader, admin, or member'
            }
        }
    },
    joinedAt: {
        type: DataTypes.DATE,
        field: 'joined_at',
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'team_members',
    timestamps: true,
    underscored: true,
    indexes: [
        {
            unique: true,
            fields: ['team_id', 'user_id'],
            name: 'unique_team_member'
        }
    ],
    hooks: {
        beforeCreate: async (member) => {
            if (member.role) {
                member.role = member.role.toLowerCase();
            }
        },
        beforeUpdate: async (member) => {
            if (member.role) {
                member.role = member.role.toLowerCase();
            }
        }
    }
});

module.exports = TeamMember; 