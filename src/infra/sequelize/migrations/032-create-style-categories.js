module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('style_categories', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      categoryId: {
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        references: {
          model: 'categories',
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
    }).then(function () {
      queryInterface.sequelize.query('INSERT INTO style_categories(id, categoryId, styleId, createdAt, updatedAt) SELECT MID(UUID(),1,36), category AS categoryId, id AS styleId, createdAt, updatedAt FROM styles WHERE styles.category IS NOT NULL')
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('style_categories')
  }
}
