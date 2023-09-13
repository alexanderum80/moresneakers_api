'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('deals', 'salePercentage', {
        type: Sequelize.STRING,
        allowNull: true
      })
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('deals', 'salePercentage', {
        type: Sequelize.NUMBER,
        allowNull: false
      })
    ])
  }
}
