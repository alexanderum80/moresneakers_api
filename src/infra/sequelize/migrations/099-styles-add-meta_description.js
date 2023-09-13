'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('styles', 'meta_description', { type: Sequelize.TEXT, defaultValue: "" })
    ]).then(function () {
      return queryInterface.sequelize.query(`UPDATE styles SET meta_description = "";`)
    })
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn("styles", "meta_description"),
    ]);
  }
};

