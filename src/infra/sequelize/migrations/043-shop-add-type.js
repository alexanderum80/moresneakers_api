module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('shops', 'type', {
      type: Sequelize.STRING
    }).then(function () {
      queryInterface.sequelize.query(`UPDATE shops SET type='virtual' WHERE (shops.isParent=FALSE OR shops.isParent IS NULL)
                                                  AND shops.address IS NULL`)
      queryInterface.sequelize.query(`UPDATE shops SET type='physical' WHERE (shops.isParent=FALSE OR shops.isParent IS NULL)
                                                  AND shops.address IS NOT NULL`)
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('shops', 'type')
  }
}
