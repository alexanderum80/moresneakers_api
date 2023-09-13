'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('offers', 'price', {
        type: Sequelize.REAL
      })
    ]).then( async function () {
      await queryInterface.sequelize.query(`UPDATE offers SET price = priceGBP WHERE priceGBP IS NOT NULL;`)
    }).then( async function () {
      await queryInterface.sequelize.query(`UPDATE offers SET price = priceUSD WHERE priceUSD IS NOT NULL;`)
    }).then( async function () {
      await queryInterface.sequelize.query(`UPDATE offers SET price = priceEUR WHERE priceEUR IS NOT NULL;`)
    })
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('offers', 'price')
    ])
  }
};
