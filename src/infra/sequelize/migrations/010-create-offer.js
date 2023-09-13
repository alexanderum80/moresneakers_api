module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('offers', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      description: {
        type: Sequelize.TEXT
      },
      status: {
        type: Sequelize.STRING
      },
      shipping: {
        type: Sequelize.STRING
      },
      offerDate: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
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
      salePercentage: {
        type: Sequelize.REAL
      },
      raffle: {
        type: Sequelize.BOOLEAN
      },
      raffleStart: {
        type: Sequelize.STRING
      },
      raffleEnd: {
        type: Sequelize.STRING
      },
      displayWhatsNew: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      displayOnSale: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      shopId: {
        type: Sequelize.UUID,
        references: {
          model: 'shops',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      releaseId: {
        type: Sequelize.UUID,
        references: {
          model: 'releases',
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
    return queryInterface.dropTable('offers')
  }
}
