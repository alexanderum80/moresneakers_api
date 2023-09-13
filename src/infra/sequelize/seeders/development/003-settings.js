const Faker = require('../../../support/fakers')

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('settings', Faker('settings'), {})
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('settings', null, {})
  }
}
