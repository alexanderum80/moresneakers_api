module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('shops', 'slug', {
        type: Sequelize.STRING
      })
    ]).then(function () {
      queryInterface.sequelize.query(`
      UPDATE shops r SET slug = REPLACE( REPLACE( LOWER(r.name), ' ','-'), '/','-');
      `)
    })
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('shops', 'slug')
    ])
  }
}
