'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const tableInfo = await queryInterface.describeTable('Projects');

        const changes = [];

        if (!tableInfo.thumbnail) {
            changes.push(queryInterface.addColumn('Projects', 'thumbnail', {
                type: Sequelize.STRING,
                allowNull: true
            }));
        }

        if (!tableInfo.tags) {
            changes.push(queryInterface.addColumn('Projects', 'tags', {
                type: Sequelize.TEXT,
                allowNull: true,
                defaultValue: '[]'
            }));
        }

        if (!tableInfo.likes) {
            changes.push(queryInterface.addColumn('Projects', 'likes', {
                type: Sequelize.INTEGER,
                defaultValue: 0
            }));
        }

        if (!tableInfo.commentsCount) {
            changes.push(queryInterface.addColumn('Projects', 'commentsCount', {
                type: Sequelize.INTEGER,
                defaultValue: 0
            }));
        }

        return Promise.all(changes);
    },

    down: async (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.removeColumn('Projects', 'thumbnail'),
            queryInterface.removeColumn('Projects', 'tags'),
            queryInterface.removeColumn('Projects', 'likes'),
            queryInterface.removeColumn('Projects', 'commentsCount')
        ]);
    }
}; 