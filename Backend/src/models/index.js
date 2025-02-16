const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const User = require('./User');
const Project = require('./Project');
const Comment = require('./Comment');
const Team = require('./Team');
const TeamMember = require('./TeamMember');

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
    as: 'projects',
    onDelete: 'CASCADE'
});

Project.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user'
});

// Comment associations
User.hasMany(Comment, {
    foreignKey: 'userId',
    as: 'comments',
    onDelete: 'CASCADE'
});

Comment.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user'
});

Project.hasMany(Comment, {
    foreignKey: 'projectId',
    as: 'comments',
    onDelete: 'CASCADE'
});

Comment.belongsTo(Project, {
    foreignKey: 'projectId',
    as: 'project'
});

// Team Relationships
User.hasMany(Team, { foreignKey: 'leaderId', as: 'ledTeams' });
Team.belongsTo(User, { foreignKey: 'leaderId', as: 'leader' });

// Team-Project Relationship
Team.hasMany(Project, { foreignKey: 'teamId' });
Project.belongsTo(Team, { foreignKey: 'teamId' });

// Team-Member Relationships (Many-to-Many)
User.belongsToMany(Team, { through: TeamMember, foreignKey: 'userId' });
Team.belongsToMany(User, { through: TeamMember, foreignKey: 'teamId' });

// Additional associations for easy access
Team.hasMany(TeamMember);
TeamMember.belongsTo(Team);
User.hasMany(TeamMember);
TeamMember.belongsTo(User);

module.exports = {
    User,
    Project,
    Comment,
    UserFollows,
    Team,
    TeamMember
};