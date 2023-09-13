'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('layouts', 'headerImgMovil',{
        type: Sequelize.STRING
      })     
    ])
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn("layouts", "headerImgMovil"),
     ]);
  }
};
