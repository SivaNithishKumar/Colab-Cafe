const { DataTypes } = require('sequelize');
const sequelize = require('../config/database').sequelize;

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
        allowNull: false
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Other'
    },
    technologies: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: '[]',
        get() {
            const rawValue = this.getDataValue('technologies');
            try {
                return rawValue ? JSON.parse(rawValue) : [];
            } catch (error) {
                console.error('Error parsing technologies:', error);
                return [];
            }
        },
        set(value) {
            try {
                this.setDataValue('technologies',
                    typeof value === 'string' ? value : JSON.stringify(value || []));
            } catch (error) {
                console.error('Error setting technologies:', error);
                this.setDataValue('technologies', '[]');
            }
        }
    },
    thumbnail: {
        type: DataTypes.STRING,
        allowNull: true
    },
    repoUrl: {
        type: DataTypes.STRING,
        allowNull: true
    },
    demoUrl: {
        type: DataTypes.STRING,
        allowNull: true
    },
    status: {
        type: DataTypes.ENUM('draft', 'published'),
        defaultValue: 'published'
    },
    views: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    likes: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    commentsCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    tags: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: '[]',
        get() {
            const rawValue = this.getDataValue('tags');
            try {
                return rawValue ? JSON.parse(rawValue) : [];
            } catch (error) {
                console.error('Error parsing tags:', error);
                return [];
            }
        },
        set(value) {
            try {
                this.setDataValue('tags',
                    typeof value === 'string' ? value : JSON.stringify(value || []));
            } catch (error) {
                console.error('Error setting tags:', error);
                this.setDataValue('tags', '[]');
            }
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
    teamId: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
            model: 'Teams',
            key: 'id'
        }
    },
    isTeamProject: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
});

module.exports = Project;