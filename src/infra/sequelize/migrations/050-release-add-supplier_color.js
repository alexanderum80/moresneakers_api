'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('releases', 'supplierColor', {
        type: Sequelize.STRING
      })
    ])
  },

  down: (queryInterface, Sequelize) => {

  }
}
