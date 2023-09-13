'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.changeColumn('styles', 'imgUrl', {
        type: Sequelize.STRING,
        allowNull: true
      });

      await queryInterface.sequelize.query(`
      UPDATE styles b SET imgUrl = NULL WHERE imgUrl='http://preprod.moresneakers.com/assets/style-page-assets/banner.png'
      `);

    } catch (e) {
      throw e;
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {

      await queryInterface.sequelize.query(`
      UPDATE styles b SET imgUrl = 'http://preprod.moresneakers.com/assets/style-page-assets/banner.png' WHERE imgUrl IS NULL
      `);

      await queryInterface.changeColumn('styles', 'imgUrl', {
        type: Sequelize.STRING,
        allowNull: false
      });

    } catch (e) {
      throw e;
    }
  }
};
