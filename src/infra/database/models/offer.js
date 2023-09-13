module.exports = (sequelize, DataTypes) => {
  const offer = sequelize.define('offers', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    status: DataTypes.STRING,
    shipping: DataTypes.STRING,
    countries: DataTypes.STRING,
    offerDate: DataTypes.DATE,
    currency: DataTypes.STRING,
    salePercentage: DataTypes.REAL,
    price: DataTypes.REAL,
    discountCode: DataTypes.STRING,
    raffle: DataTypes.BOOLEAN,
    raffleStart: DataTypes.DATE,
    raffleEnd: DataTypes.DATE,
    releaseTime: DataTypes.DATE,
    displayWhatsNew: DataTypes.BOOLEAN,
    displayOnSale: DataTypes.BOOLEAN,
    timezone: DataTypes.STRING,
    noTime: DataTypes.BOOLEAN,
    isPinned: DataTypes.BOOLEAN,
  }, {
    underscored: false
  })
  offer.associate = function (models) {
    // associations can be defined here
    offer.belongsTo(models.releases, { as: 'release' })
    offer.belongsTo(models.shops, { as: 'shop' })
    offer.hasMany(models.offer_links, { as: 'links' })
  }
  return offer
}
