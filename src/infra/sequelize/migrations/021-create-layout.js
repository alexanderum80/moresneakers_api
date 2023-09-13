module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('layouts', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      page: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false
      },
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      keywords: {
        type: Sequelize.STRING
      },
      headerImgUrl: {
        type: Sequelize.STRING
      },
      headerLink: {
        type: Sequelize.STRING
      },
      headerDisplay: {
        type: Sequelize.STRING
      },
      sliderDisplay: {
        type: Sequelize.STRING
      },
      hottestDisplay: {
        type: Sequelize.STRING
      },
      headerDisplayOnPage: {
        type: Sequelize.BOOLEAN
      },
      sliderDisplayOnPage: {
        type: Sequelize.BOOLEAN
      },
      hottestDisplayOnPage: {
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
    return queryInterface.dropTable('layouts')
  }
}
