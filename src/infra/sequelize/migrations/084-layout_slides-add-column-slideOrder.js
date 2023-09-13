'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.addColumn('layout_slides', 'slideOrder', {
        type: Sequelize.INTEGER,
      });

    } catch (e) {
      throw e;
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.removeColumn('layout_slides', 'slideOrder')
    } catch (e) {
      throw e;
    }
  }
};
