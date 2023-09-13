module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('brand_shops', {
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
      brandId: {
        type: Sequelize.UUID,
        references: {
          model: 'brands',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      displayOnBrands: {
        type: Sequelize.BOOLEAN
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
    return queryInterface.dropTable('brand_shops')
  }
}
