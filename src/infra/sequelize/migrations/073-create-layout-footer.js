module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('layout_footer', {
        id: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4
        },
        brandId: {
          type: Sequelize.UUID,
          references: {
            model: 'brands',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL'
        },
        collectionId: {
          type: Sequelize.UUID,
          references: {
            model: 'collections',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL'
        },
        styleId: {
          type: Sequelize.UUID,
          references: {
            model: 'styles',
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
  },
  down: (queryInterface, Sequelize) => {
    return  queryInterface.dropTable('layout_footer')
  }
}
