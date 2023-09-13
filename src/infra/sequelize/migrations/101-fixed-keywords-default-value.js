'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.sequelize.query(`UPDATE brands SET keywords = "" WHERE keywords = " ";`),
      queryInterface.sequelize.query(`UPDATE blogs SET keywords = "" WHERE keywords = " ";`),
      queryInterface.sequelize.query(`UPDATE collections SET keywords = "" WHERE keywords = " ";`),
      queryInterface.sequelize.query(`UPDATE releases SET keywords = "" WHERE keywords = " ";`),
      queryInterface.sequelize.query(`UPDATE shops SET keywords = "" WHERE keywords = " ";`),
      queryInterface.sequelize.query(`UPDATE styles SET keywords = "" WHERE keywords = " ";`)
    ])
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([]);
  }
};

