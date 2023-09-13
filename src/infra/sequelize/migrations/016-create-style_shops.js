module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('style_shops', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      shopId: {
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        references: {
          model: 'shops',
          key: 'id'
        },
        allowNull: false
      },
      styleId: {
        type: Sequelize.UUID,
        references: {
          model: 'styles',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      linkText: {
        type: Sequelize.STRING
      },
      linkUrl: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      }
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('style_shops')
  }
}
