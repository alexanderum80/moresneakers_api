'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('releases', 'id', {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        unique: true
      })
    ])
  },
  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn('releases', 'id', {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        unique: false
      })
    ])
  }
};
