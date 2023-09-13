'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.sequelize.query(`INSERT INTO settings(id, name, value) VALUES ('offersPinnedTitle', 'offersPinnedTitle', 'Offeers pinned because we thought you would like it')`),
      queryInterface.sequelize.query(`INSERT INTO settings(id, name, value) VALUES ('showOffersPinned', 'showOffersPinned', '{"Home":true,"ReleaseCalendar":true,"AboutToDrop":true}')`),
    ])
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.sequelize.query(`delete from settings where id='offersPinnedTitle'`),
      queryInterface.sequelize.query(`delete from settings where id='showOffersPinned'`),
    ]);
  }
};

