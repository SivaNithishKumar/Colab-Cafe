module.exports = {
    up: async (queryInterface, Sequelize) => {
        try {
            // Add category column
            await queryInterface.addColumn('Projects', 'category', {
                type: Sequelize.STRING,
                allowNull: false,
                defaultValue: 'Other'
            });

            // Add technologies column if it doesn't exist
            await queryInterface.addColumn('Projects', 'technologies', {
                type: Sequelize.ARRAY(Sequelize.STRING),
                defaultValue: []
            });

            // Add repoUrl column
            await queryInterface.addColumn('Projects', 'repoUrl', {
                type: Sequelize.STRING,
                allowNull: true
            });

            // Add demoUrl column
            await queryInterface.addColumn('Projects', 'demoUrl', {
                type: Sequelize.STRING,
                allowNull: true
            });

            // Add status column
            await queryInterface.addColumn('Projects', 'status', {
                type: Sequelize.ENUM('draft', 'published'),
                defaultValue: 'published'
            });

        } catch (error) {
            console.error('Migration error:', error);
        }
    },

    down: async (queryInterface, Sequelize) => {
        try {
            await queryInterface.removeColumn('Projects', 'category');
            await queryInterface.removeColumn('Projects', 'technologies');
            await queryInterface.removeColumn('Projects', 'repoUrl');
            await queryInterface.removeColumn('Projects', 'demoUrl');
            await queryInterface.removeColumn('Projects', 'status');
        } catch (error) {
            console.error('Migration rollback error:', error);
        }
    }
}; 