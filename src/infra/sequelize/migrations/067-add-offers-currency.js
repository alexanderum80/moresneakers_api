'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('offers', 'currency', {
        type: Sequelize.STRING
      })
    ]).then( async function () {
      await queryInterface.sequelize.query(`UPDATE offers o INNER JOIN shops s ON o.shopId = s.id SET o.currency = s.currency WHERE o.priceUSD IS NULL AND o.priceEUR IS NULL AND o.priceGBP IS NULL;`)
    }).then( async function () {
      await queryInterface.sequelize.query(`UPDATE offers SET currency='GBP' WHERE priceGBP IS NOT NULL;`)
    }).then( async function () {
      await queryInterface.sequelize.query(`UPDATE offers SET currency='USD' WHERE priceUSD IS NOT NULL;`)
    }).then( async function () {
      await queryInterface.sequelize.query(`UPDATE offers SET currency='EUR' WHERE priceEUR IS NOT NULL;`)
    })
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('offers', 'currency')
    ])
  }
};
