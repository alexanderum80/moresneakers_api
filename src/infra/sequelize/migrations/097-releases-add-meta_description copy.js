'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('releases', 'meta_description', { type: Sequelize.TEXT, defaultValue: "" })
    ]).then(function () {
      return queryInterface.sequelize.query(`UPDATE releases SET meta_description = "";`)
    })
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn("releases", "meta_description"),
    ]);
  }
};

