'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('shops', 'smallImage', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('shops', 'headerImage', {
        type: Sequelize.STRING
      }),
      queryInterface.changeColumn('shops', 'description', {
        type: Sequelize.TEXT('long')
      }),
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('shops', 'smallImage'),
      queryInterface.removeColumn('shops', 'headerImage'),
      queryInterface.changeColumn('shops', 'description', {
        type: Sequelize.TEXT
      })
    ])
  }
}
