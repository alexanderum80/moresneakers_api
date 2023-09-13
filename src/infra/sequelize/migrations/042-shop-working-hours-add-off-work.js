'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('shop_working_hours', 'offWork', {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      })
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('shop_working_hours', 'offWork')
    ])
  }
}
