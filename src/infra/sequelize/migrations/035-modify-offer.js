'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('offers', 'raffleStart', {
        type: Sequelize.DATE
      }),
      queryInterface.changeColumn('offers', 'raffleEnd', {
        type: Sequelize.DATE
      })
    ])
  },

  down: (queryInterface, Sequelize) => {

  }
}
