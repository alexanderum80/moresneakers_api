module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('releases', 'slug', {
        type: Sequelize.STRING
      })
    ]).then(function () {
      queryInterface.sequelize.query(`
      UPDATE releases r SET slug = REPLACE( REPLACE( LOWER(CONCAT(r.name, "-",r.sku)), ' ','-'), '/','-');
      `)
    })
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('releases', 'slug')
    ])
  }
}
