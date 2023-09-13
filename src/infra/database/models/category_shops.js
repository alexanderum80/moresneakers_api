module.exports = (sequelize, DataTypes) => {
  const shopCategories = sequelize.define('category_shops', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    }
  }, {
    underscored: false
  })
  shopCategories.associate = function (models) {
    // associations can be defined here
    shopCategories.belongsTo(models.categories)
  }
  return shopCategories
}
