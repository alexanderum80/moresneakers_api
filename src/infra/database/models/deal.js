module.exports = (sequelize, DataTypes) => {
  const deals = sequelize.define('deals', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    url: DataTypes.STRING,
    salePercentage: DataTypes.STRING,
    status: DataTypes.STRING,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    imgUrl: DataTypes.TEXT,
    promoCode: DataTypes.STRING,
    startTime: DataTypes.STRING,
    endTime: DataTypes.STRING,
    displayOnSale: DataTypes.BOOLEAN,
    trackedUrl: DataTypes.STRING,
    bitlyUrl: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {
    underscored: false
  })
  deals.associate = function (models) {
    // associations can be defined here
    deals.belongsTo(models.shops, { as: 'shop', foreignKey: 'shopId' }),
    deals.hasMany(models.deal_links, { as: 'links' })

  }
  return deals
}
