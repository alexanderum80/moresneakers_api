module.exports = (sequelize, DataTypes) => {
  const collections = sequelize.define('collections', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    imgUrl: DataTypes.TEXT,
    keywords: { type: DataTypes.TEXT, defaultValue: "" },
    meta_description: { type: DataTypes.TEXT, defaultValue: "" },
  }, {
    underscored: false
  })
  collections.associate = function (models) {
    // associations can be defined here
    collections.belongsTo(models.brands, { as: 'brandId', foreignKey: 'brand' })
    collections.hasMany(models.collection_shops, { as: 'shops' })
    collections.hasMany(models.layout_footer)
    collections.belongsToMany(models.releases, { through: 'collection_releases', as: 'releases' })
  }
  return collections
}
