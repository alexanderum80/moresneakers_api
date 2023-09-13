module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('releases', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      sku: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      color: {
        type: Sequelize.STRING
      },
      releaseDate: {
        type: Sequelize.DATE
      },
      hot: {
        type: Sequelize.BOOLEAN
      },
      customized: {
        type: Sequelize.BOOLEAN
      },
      children: {
        type: Sequelize.BOOLEAN
      },
      hiddenDashboard: {
        type: Sequelize.BOOLEAN
      },
      priceUSD: {
        type: Sequelize.REAL
      },
      priceGBP: {
        type: Sequelize.REAL
      },
      priceEUR: {
        type: Sequelize.REAL
      },
      gender: {
        type: Sequelize.STRING
      },
      mainImage: {
        type: Sequelize.STRING
      },
      currency: {
        type: Sequelize.STRING
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
      collectionId: {
        type: Sequelize.UUID,
        references: {
          model: 'collections',
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
    return queryInterface.dropTable('releases')
  }
}
