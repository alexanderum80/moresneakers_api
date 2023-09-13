const Faker = require('../../../support/fakers')

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('layouts', Faker('layouts'), {})
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('layouts', null, {})
  }
}
