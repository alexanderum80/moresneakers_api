'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('shops', 'defaultOfferLabel', {
        type: Sequelize.STRING
      })
    ])
  },

  down: (queryInterface, Sequelize) => {

  }
}
