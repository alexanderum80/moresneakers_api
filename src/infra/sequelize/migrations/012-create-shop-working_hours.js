module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('shop_working_hours', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      dayOfWeek: {
        type: Sequelize.INTEGER
      },
      openHour: {
        type: Sequelize.STRING
      },
      closeHour: {
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
    return queryInterface.dropTable('shop_working_hours')
  }
}
