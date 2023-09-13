'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('categories', 'keywords', { type: Sequelize.TEXT, defaultValue: "" })
    ]).then(function () {
      queryInterface.sequelize.query(`UPDATE categories SET keywords = "";`)
    })
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn("categories", "keywords"),
    ]);
  }
};