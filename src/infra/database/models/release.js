module.exports = (sequelize, DataTypes) => {
  const releases = sequelize.define('releases', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    sku: DataTypes.STRING,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    color: DataTypes.STRING,
    supplierColor: DataTypes.STRING,
    slug: DataTypes.STRING,
    releaseDate: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    hot: DataTypes.BOOLEAN,
    customized: DataTypes.BOOLEAN,
    hiddenDashboard: DataTypes.BOOLEAN,
    children: DataTypes.BOOLEAN,
    priceUSD: DataTypes.REAL,
    priceGBP: DataTypes.REAL,
    priceEUR: DataTypes.REAL,
    gender: DataTypes.STRING,
    mainImage: DataTypes.STRING,
    currency: DataTypes.STRING,
    inlineRelease: DataTypes.BOOLEAN,
    thumbnail: { type: DataTypes.STRING, defaultValue: "" },
    keywords: { type: DataTypes.TEXT, defaultValue: "" },
    meta_description: { type: DataTypes.TEXT, defaultValue: "" },
  }, {
    underscored: false
  })
  releases.associate = function (models) {
    // associations can be defined here
    releases.belongsTo(models.styles, { as: 'style' })
    releases.belongsTo(models.collections, { as: 'collection' })
    releases.hasMany(models.release_images, { as: 'images' })
    releases.hasMany(models.offers, { as: 'offers' })
    releases.belongsToMany(models.categories, { as: 'categories', through: models.release_categories, foreignKey: 'releaseId' })
  }
  return releases
}
