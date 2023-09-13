'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('settings', 'h1Title', {
        type: Sequelize.TEXT
      }),
      queryInterface.addColumn('settings', 'metaTitle', {
        type: Sequelize.TEXT
      })      
    ])
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn("settings", "h1Title"),
      queryInterface.removeColumn("settings", "metaTitle")
    ]);
  }
};
