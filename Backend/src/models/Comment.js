const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Comment = sequelize.define('Comment', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    parentId: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
            model: 'Comments',
            key: 'id'
        }
    }
});

module.exports = Comment;