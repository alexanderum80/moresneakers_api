'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.sequelize.query(`UPDATE releases SET gender = 'Big Kids' where gender='Kids';`),
    ])
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.sequelize.query(`UPDATE releases SET gender = 'Kids' where gender='Big Kids';`),

    ]);
  }
};
