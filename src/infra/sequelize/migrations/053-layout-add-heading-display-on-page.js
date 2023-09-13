'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('layouts', 'headingDisplayOnPage', {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      })
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('layouts', 'headingDisplayOnPage')
    ])
  }
}
