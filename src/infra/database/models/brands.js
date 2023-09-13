module.exports = (sequelize, DataTypes) => {
  const brands = sequelize.define('brands', {
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
  brands.associate = function (models) {
    brands.hasMany(models.brand_shops, { as: 'shops' })
    // associations can be defined here
    brands.hasMany(models.styles, { as: 'popular', foreignKey: 'brand' })
    brands.hasMany(models.layout_footer)
  }
  return brands
}
