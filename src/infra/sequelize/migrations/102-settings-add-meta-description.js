'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('settings', 'meta_description', {
        type: Sequelize.TEXT
      }).then(function () {
        return queryInterface.sequelize.query(`UPDATE settings SET meta_description = "";`)
      })
    ])
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn("settings", "meta_description")
    ]);
  }
};
