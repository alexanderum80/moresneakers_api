'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('offers', 'isPinned', {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      })
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('offers', 'isPinned')
    ])
  }
}
