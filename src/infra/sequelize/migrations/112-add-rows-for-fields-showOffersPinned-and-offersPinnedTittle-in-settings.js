'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.sequelize.query(`INSERT INTO settings(id, name, value) VALUES ('popularStyles', 'popularStyles', '{}')`),
    ])
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.sequelize.query(`delete from settings where id='popularStyles'`),
    ]);
  }
};

