'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('categories', 'description', {
        type: Sequelize.TEXT
      }),
      queryInterface.addColumn('categories', 'imgUrl', {
        type: Sequelize.STRING
      })
    ])
  },

  down: (queryInterface, Sequelize) => {

  }
}
