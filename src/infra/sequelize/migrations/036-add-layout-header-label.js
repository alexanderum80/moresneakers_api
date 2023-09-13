'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('layouts', 'headerLabel', {
        type: Sequelize.STRING
      })
    ])
  },

  down: (queryInterface, Sequelize) => {

  }
}
