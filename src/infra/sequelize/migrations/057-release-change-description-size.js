'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('releases', 'description', {
        type: Sequelize.TEXT('long')
      }),
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('releases', 'description', {
        type: Sequelize.TEXT
      })
    ])
  }
}
