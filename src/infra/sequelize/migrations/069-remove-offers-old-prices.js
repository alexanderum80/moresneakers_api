'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('offers', 'priceGBP'),
      queryInterface.removeColumn('offers', 'priceUSD'),
      queryInterface.removeColumn('offers', 'priceEUR')
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('offers', 'priceGBP', {
        type: Sequelize.REAL
      }),
      queryInterface.addColumn('offers', 'priceUSD', {
        type: Sequelize.REAL
      }),
      queryInterface.addColumn('offers', 'priceEUR', {
        type: Sequelize.REAL
      })
    ])
  }
};
