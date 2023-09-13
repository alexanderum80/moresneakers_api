module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('shop_images')    
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.createTable('shop_images', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      fileName: {
        type: Sequelize.STRING
      },
      imgUrl: {
        type: Sequelize.TEXT
      },
      shopId: {
        type: Sequelize.UUID,
        references: {
          model: 'shops',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
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
  }
}
