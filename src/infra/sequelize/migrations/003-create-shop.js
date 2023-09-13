module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('shops', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      siteUrl: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.TEXT
      },
      country: {
        type: Sequelize.STRING
      },
      region: {
        type: Sequelize.STRING
      },
      currency: {
        type: Sequelize.STRING
      },
      zipCode: {
        type: Sequelize.STRING
      },
      shippingDetails: {
        type: Sequelize.TEXT
      },
      shippingCountries: {
        type: Sequelize.STRING
      },
      countries: {
        type: Sequelize.TEXT
      },
      trackingListBaseUrl: {
        type: Sequelize.STRING
      },
      showOnRegion: {
        type: Sequelize.STRING
      },
      mainImage: {
        type: Sequelize.STRING
      },
      active: {
        type: Sequelize.BOOLEAN
      },
      rank: {
        type: Sequelize.INTEGER
      },
      parent: {
        type: Sequelize.STRING
      },
      isParent: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      lat: {
        type: Sequelize.FLOAT
      },
      lon: {
        type: Sequelize.FLOAT
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
    return queryInterface.dropTable('shops')
  }
}
