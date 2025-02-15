const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const User = require('./User');
const Project = require('./Project');
const Comment = require('./Comment');

// Define the UserFollows model for the through table
const UserFollows = sequelize.define('UserFollows', {
    followerId: {
        type: DataTypes.UUID,
        references: {
            model: User,
            key: 'id'
        }
    },
    followingId: {
        type: DataTypes.UUID,
        references: {
            model: User,
            key: 'id'
        }
    }
});

// User follow/following associations
User.belongsToMany(User, {
    through: UserFollows,
    as: 'followers',
    foreignKey: 'followingId',
    otherKey: 'followerId'
});

User.belongsToMany(User, {
    through: UserFollows,
    as: 'following',
    foreignKey: 'followerId',
    otherKey: 'followingId'
});

// Project associations
User.hasMany(Project, {
    foreignKey: 'userId',
    as: 'projects'
});

Project.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user'
});

// Comment associations
User.hasMany(Comment, { foreignKey: 'userId', as: 'comments' });
Comment.belongsTo(User, { foreignKey: 'userId', as: 'user' });

Project.hasMany(Comment, { foreignKey: 'projectId', as: 'comments' });
Comment.belongsTo(Project, { foreignKey: 'projectId', as: 'project' });

module.exports = {
    User,
    Project,
    Comment,
    UserFollows
};