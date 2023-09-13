'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('layouts', 'dealsDisplayOnPage', {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      })
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('layouts', 'dealsDisplayOnPage')
    ])
  }
}
