module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.renameTable('layout_footer', 'layout_footers')
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.renameTable('layout_footers', 'layout_footer')
  }
}
