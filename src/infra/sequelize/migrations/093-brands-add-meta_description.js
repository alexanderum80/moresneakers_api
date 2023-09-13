'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('brands', 'meta_description', { type: Sequelize.TEXT, defaultValue: "" })
    ]).then(function () {
      return queryInterface.sequelize.query(`UPDATE brands SET meta_description = "";`)
    })
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn("brands", "meta_description"),
    ]);
  }
};

