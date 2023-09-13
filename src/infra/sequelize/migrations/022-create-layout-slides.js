module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('layout_slides', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      entityType: {
        type: Sequelize.STRING
      },
      imgUrl: {
        type: Sequelize.STRING
      },      
      entityId: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      layoutId: {
        type: Sequelize.UUID,
        references: {
          model: 'layouts',
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
    return queryInterface.dropTable('layout_slides')
  }
}
