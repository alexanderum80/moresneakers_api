'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.addColumn('blogs', 'slug', {
        type: Sequelize.STRING,
        unique: true
      });

      await queryInterface.sequelize.query(`
      UPDATE blogs b SET slug = REPLACE( REPLACE( LOWER(b.title), ' ','-'), '''','');
      `);

      await queryInterface.changeColumn('blogs', 'slug', {
        type: Sequelize.STRING,
        allowNull: false
      });

    } catch (e) {
      throw e;
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.removeColumn('blogs', 'slug')
    } catch (e) {
      throw e;
    }
  }
};
