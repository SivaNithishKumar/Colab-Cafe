const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const UserFollows = sequelize.define('UserFollows', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    follower_id: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'follower_id',
        references: {
            model: 'Users',
            key: 'id'
        }
    },
    following_id: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'following_id',
        references: {
            model: 'Users',
            key: 'id'
        }
    }
}, {
    tableName: 'user_follows',
    timestamps: true,
    underscored: true,
    indexes: [
        {
            unique: true,
            fields: ['follower_id', 'following_id'],
            name: 'user_follows_follower_following_unique'
        }
    ]
});

UserFollows.associate = (models) => {
    UserFollows.belongsTo(models.User, {
        as: 'follower',
        foreignKey: 'follower_id'
    });

    UserFollows.belongsTo(models.User, {
        as: 'following',
        foreignKey: 'following_id'
    });
};

module.exports = UserFollows; 