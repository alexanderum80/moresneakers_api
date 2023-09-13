module.exports = (sequelize, DataTypes) => {
  const brandShops = sequelize.define('brand_shops', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    displayOnBrands: DataTypes.BOOLEAN
  }, {
    underscored: false
  })
  brandShops.associate = function (models) {
    // associations can be defined here
    brandShops.belongsTo(models.brands)
  }
  return brandShops
}
