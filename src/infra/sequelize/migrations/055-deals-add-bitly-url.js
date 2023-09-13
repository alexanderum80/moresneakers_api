'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('deals', 'trackedUrl', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('deals', 'bitlyUrl', {
        type: Sequelize.STRING
      })
    ]).then(function () {
      return queryInterface.sequelize.query(`
      UPDATE deals d
          INNER JOIN shops s ON d.shopId = s.id
      SET trackedUrl = CONCAT(s.trackingListBaseUrl, d.url);
      `)
    }).then()
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('deals', 'bitlyUrl')
    ])
  }
}
