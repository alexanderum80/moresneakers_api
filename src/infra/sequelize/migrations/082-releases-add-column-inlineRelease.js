'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.addColumn('releases', 'inlineRelease', {
        type: Sequelize.BOOLEAN,
      });

      await queryInterface.sequelize.query(`
      UPDATE releases r SET inlineRelease = 1 WHERE r.releaseDate IS NULL;
      `);

      await queryInterface.sequelize.query(`
      UPDATE releases r SET inlineRelease = 0 WHERE r.releaseDate IS NOT NULL;
      `);

      await queryInterface.changeColumn('releases', 'inlineRelease', {
        type: Sequelize.BOOLEAN,
        allowNull: false
      });

    } catch (e) {
      throw e;
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.removeColumn('releases', 'inlineRelease')
    } catch (e) {
      throw e;
    }
  }
};
