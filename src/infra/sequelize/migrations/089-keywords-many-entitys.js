'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('blogs', 'keywords', { type: Sequelize.TEXT }),
      queryInterface.addColumn('collections', 'keywords', { type: Sequelize.TEXT }),
      queryInterface.addColumn('releases', 'keywords', { type: Sequelize.TEXT }),
      queryInterface.addColumn('shops', 'keywords', { type: Sequelize.TEXT }),
      queryInterface.addColumn('styles', 'keywords', { type: Sequelize.TEXT })
    ])
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn("blogs", "keywords"),
      queryInterface.removeColumn("collections", "keywords"),
      queryInterface.removeColumn("releases", "keywords"),
      queryInterface.removeColumn("shops", "keywords"),
      queryInterface.removeColumn("styles", "keywords")
    ]);
  }
};
