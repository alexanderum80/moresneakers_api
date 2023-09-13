'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('categories', 'isGender', {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      })
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('categories', 'isGender')
    ])
  }
}
