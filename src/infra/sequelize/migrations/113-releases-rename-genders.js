'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.sequelize.query(`UPDATE releases SET gender = 'Men' where gender='m';`),
      queryInterface.sequelize.query(`UPDATE releases SET gender = 'Women' where gender='f';`),
      queryInterface.sequelize.query(`UPDATE releases SET gender = 'Kids' where gender='c';`),
      queryInterface.sequelize.query(`UPDATE releases SET gender = 'All' where gender='u';`),
    ])
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.sequelize.query(`UPDATE releases SET gender = 'm' where gender='Men';`),
      queryInterface.sequelize.query(`UPDATE releases SET gender = 'f' where gender='Women';`),
      queryInterface.sequelize.query(`UPDATE releases SET gender = 'c' where gender='Kids';`),
      queryInterface.sequelize.query(`UPDATE releases SET gender = 'u' where gender='All';`),
    ]);
  }
};
