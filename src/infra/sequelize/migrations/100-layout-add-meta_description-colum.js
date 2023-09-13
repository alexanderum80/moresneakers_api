'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('layouts', 'meta_description', {
        type: Sequelize.TEXT, defaultValue: ""
      })
    ])
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn("layouts", "meta_description"),
    ]);
  }
};

