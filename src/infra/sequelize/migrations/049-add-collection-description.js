'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('collections', 'description', {
        type: Sequelize.TEXT
      })
    ])
  },

  down: (queryInterface, Sequelize) => {

  }
}
