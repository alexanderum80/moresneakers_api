'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('blogs', 'meta_description', { type: Sequelize.TEXT, defaultValue: "" })
    ]).then(function () {
      return queryInterface.sequelize.query(`UPDATE blogs SET meta_description = "";`)
    })
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn("blogs", "meta_description"),
    ]);
  }
};

