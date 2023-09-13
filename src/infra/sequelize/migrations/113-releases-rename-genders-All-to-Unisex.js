'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.sequelize.query(`UPDATE releases SET gender = 'Unisex' where gender='All';`),
    ])
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.sequelize.query(`UPDATE releases SET gender = 'All' where gender='Unisex';`),
    ]);
  }
};
