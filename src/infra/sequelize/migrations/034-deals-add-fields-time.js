'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('deals', 'startTime', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('deals', 'endTime', {
        type: Sequelize.STRING
      })
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('deals', 'time')
    ])
  }
}
