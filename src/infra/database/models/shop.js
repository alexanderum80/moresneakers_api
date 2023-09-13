module.exports = (sequelize, DataTypes) => {
  const shop = sequelize.define('shops', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    siteUrl: DataTypes.STRING,
    description: DataTypes.TEXT,
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    address: DataTypes.TEXT,
    currency: DataTypes.STRING,
    country: DataTypes.STRING,
    region: DataTypes.STRING,
    zipCode: DataTypes.STRING,
    shippingDetails: DataTypes.TEXT,
    shippingCountries: DataTypes.STRING,
    showOnRegion: DataTypes.STRING,
    countries: DataTypes.TEXT,
    trackingListBaseUrl: DataTypes.STRING,
    trackingListBaseUrlIsAfter: DataTypes.BOOLEAN,
    mainImage: DataTypes.STRING,
    smallImage: DataTypes.STRING,
    headerImage: DataTypes.STRING,
    active: DataTypes.BOOLEAN,
    rank: DataTypes.INTEGER,
    parent: DataTypes.STRING,
    isParent: DataTypes.BOOLEAN,
    lat: DataTypes.FLOAT,
    lon: DataTypes.FLOAT,
    defaultOfferLabel: DataTypes.STRING,
    slug: DataTypes.STRING,
    keywords: { type: DataTypes.TEXT, defaultValue: "" },
    meta_description: { type: DataTypes.TEXT, defaultValue: "" },
  }, {
    underscored: false
  })
  shop.associate = function (models) {
    // associations can be defined here
    shop.hasMany(models.shop_working_hours, { as: 'workingHours' })
    shop.belongsToMany(models.styles, { through: 'style_shops', as: 'styles' })
    shop.belongsToMany(models.brands, { through: 'brand_shops', as: 'brands' })
    shop.belongsToMany(models.collections, { through: 'collection_shops', as: 'collections' })
    shop.belongsToMany(models.categories, { through: 'category_shops', as: 'categories' })
    shop.belongsTo(models.shops, { as: 'parentShop', foreignKey: 'parent'})
  }
  return shop
}
