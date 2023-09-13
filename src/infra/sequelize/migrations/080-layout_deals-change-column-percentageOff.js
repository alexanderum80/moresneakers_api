'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.renameColumn('layout_deals', 'percentageOff', 'label');
      await queryInterface.changeColumn(
        'layout_deals',
        'label',
        {
          type: Sequelize.STRING,
        }
      );

    } catch (e) {
      throw e;
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.renameColumn('layout_deals', 'label', 'percentageOff');
      await queryInterface.changeColumn(
        'layout_deals',
        'percentageOff',
        {
          type: Sequelize.REAL,
        }
      );

    } catch (e) {
      throw e;
    }
  }
};
