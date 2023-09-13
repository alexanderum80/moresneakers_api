'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('releases', 'thumbnail', {
        type: Sequelize.STRING
      })
    ]).then(function () {
      return queryInterface.sequelize.query(`UPDATE releases SET thumbnail = "";`)
    })
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn("releases", "thumbnail"),
    ]);
  }
};

