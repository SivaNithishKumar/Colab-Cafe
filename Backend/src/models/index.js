const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const User = require('./User');
const Project = require('./Project');
const Comment = require('./Comment');
const Team = require('./Team');
const TeamMember = require('./TeamMember');
const UserFollows = require('./UserFollows');

// User follows associations
User.belongsToMany(User, {
    through: UserFollows,
    as: 'followers',
    foreignKey: 'following_id',
    otherKey: 'follower_id'
});

User.belongsToMany(User, {
    through: UserFollows,
    as: 'following',
    foreignKey: 'follower_id',
    otherKey: 'following_id'
});

// Team associations
Team.belongsTo(User, {
    as: 'leader',
    foreignKey: 'leaderId',
    onDelete: 'CASCADE'
});

User.hasMany(Team, {
    as: 'ledTeams',
    foreignKey: 'leaderId',
    onDelete: 'CASCADE'
});

// Team-User many-to-many relationship through TeamMember
Team.belongsToMany(User, {
    through: TeamMember,
    foreignKey: 'teamId',
    otherKey: 'userId',
    as: 'members'
});

User.belongsToMany(Team, {
    through: TeamMember,
    foreignKey: 'userId',
    otherKey: 'teamId',
    as: 'teams'
});

// TeamMember associations
TeamMember.belongsTo(Team, { foreignKey: 'teamId', as: 'team' });
TeamMember.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// Project associations
Project.belongsTo(User, {
    foreignKey: 'userId',
    onDelete: 'CASCADE',
    as: 'creator'
});

Project.belongsTo(Team, {
    foreignKey: 'teamId',
    onDelete: 'SET NULL',
    allowNull: true,
    as: 'team'
});

Team.hasMany(Project, {
    foreignKey: 'teamId',
    as: 'projects'
});

User.hasMany(Project, {
    foreignKey: 'userId',
    as: 'projects'
});

// Comment associations
Comment.belongsTo(User, {
    foreignKey: 'userId',
    onDelete: 'CASCADE'
});

Comment.belongsTo(Project, {
    foreignKey: 'projectId',
    onDelete: 'CASCADE'
});

Project.hasMany(Comment, {
    foreignKey: 'projectId',
    as: 'comments'
});

User.hasMany(Comment, {
    foreignKey: 'userId',
    as: 'comments'
});

// Sync models with database
sequelize.sync({ alter: true }).catch(err => {
    console.error('Error syncing database:', err);
});

// Export models
module.exports = {
    sequelize,
    User,
    Project,
    Comment,
    Team,
    TeamMember,
    UserFollows
};