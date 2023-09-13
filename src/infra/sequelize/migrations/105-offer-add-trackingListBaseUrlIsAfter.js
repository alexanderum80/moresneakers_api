'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('shops', 'trackingListBaseUrlIsAfter', {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      })
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('shops', 'trackingListBaseUrlIsAfter')
    ])
  }
}
