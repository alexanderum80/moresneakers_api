module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('deals', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      url: {
        type: Sequelize.STRING
      },
      startDate: {
        type: Sequelize.DATE
      },
      endDate: {
        type: Sequelize.DATE
      },
      salePercentage: {
        type: Sequelize.FLOAT
      },
      status: {
        type: Sequelize.STRING
      },
      promoCode: {
        type: Sequelize.STRING
      },
      time: {
        type: Sequelize.STRING
      },
      displayOnSale: {
        type: Sequelize.BOOLEAN
      },
      imgUrl: {
        type: Sequelize.STRING
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
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('deals')
  }
}
