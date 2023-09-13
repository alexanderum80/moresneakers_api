'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.addColumn('styles', 'imgUrl', {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'http://preprod.moresneakers.com/assets/style-page-assets/banner.png'
      });

    } catch (e) {
      throw e;
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.removeColumn('styles', 'imgUrl')
    } catch (e) {
      throw e;
    }
  }
};
