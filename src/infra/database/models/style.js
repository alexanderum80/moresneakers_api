module.exports = (sequelize, DataTypes) => {
  const style = sequelize.define('styles', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    imgUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    parent: DataTypes.STRING,
    isDeleted: DataTypes.BOOLEAN,
    isParent: DataTypes.BOOLEAN,
    keywords: { type: DataTypes.TEXT, defaultValue: "" },
    meta_description: { type: DataTypes.TEXT, defaultValue: "" },
  }, {
    underscored: false
  })
  style.associate = function (models) {
    style.hasMany(models.style_shops, { as: 'shops' })
    style.hasMany(models.releases, { as: 'releases' })
    style.hasMany(models.layout_footer)
    // associations can be defined here
    style.belongsTo(models.brands, { as: 'BrandModel', foreignKey: 'brand' })
  }
  return style
}
