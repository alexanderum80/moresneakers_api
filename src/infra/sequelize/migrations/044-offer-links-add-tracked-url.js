'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('offer_links', 'trackedUrl', {
        type: Sequelize.STRING
      })
    ]).then(function () {
      queryInterface.sequelize.query(`
      UPDATE offer_links ol
      INNER JOIN offers o ON (ol.offerId = o.id)
          INNER JOIN shops s ON o.shopId = s.id
      SET trackedUrl = CONCAT(s.trackingListBaseUrl, ol.url);
      `)
    })
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('offer_links', 'trackedUrl')
    ])
  }
}
