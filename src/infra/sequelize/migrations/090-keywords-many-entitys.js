'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('brands', 'keywords', { type: Sequelize.TEXT, defaultValue: "" }),
      queryInterface.changeColumn('blogs', 'keywords', { type: Sequelize.TEXT, defaultValue: "" }),
      queryInterface.changeColumn('collections', 'keywords', { type: Sequelize.TEXT, defaultValue: "" }),
      queryInterface.changeColumn('releases', 'keywords', { type: Sequelize.TEXT, defaultValue: "" }),
      queryInterface.changeColumn('shops', 'keywords', { type: Sequelize.TEXT, defaultValue: "" }),
      queryInterface.changeColumn('styles', 'keywords', { type: Sequelize.TEXT, defaultValue: "" })
    ]).then(function () {
      queryInterface.sequelize.query(`UPDATE brands SET keywords = "";`)
      queryInterface.sequelize.query(`UPDATE blogs SET keywords = "";`)
      queryInterface.sequelize.query(`UPDATE collections SET keywords = "";`)
      queryInterface.sequelize.query(`UPDATE releases SET keywords = "";`)
      queryInterface.sequelize.query(`UPDATE shops SET keywords = "";`)
      queryInterface.sequelize.query(`UPDATE styles SET keywords = "";`)
    })
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn("brands", "keywords"),
      queryInterface.removeColumn("blogs", "keywords"),
      queryInterface.removeColumn("collections", "keywords"),
      queryInterface.removeColumn("releases", "keywords"),
      queryInterface.removeColumn("shops", "keywords"),
      queryInterface.removeColumn("styles", "keywords")
    ]);
  }
};