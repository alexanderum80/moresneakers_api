'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('shops', 'meta_description', { type: Sequelize.TEXT, defaultValue: "" })
    ]).then(function () {
      return queryInterface.sequelize.query(`UPDATE shops SET meta_description = "";`)
    })
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn("shops", "meta_description"),
    ]);
  }
};

