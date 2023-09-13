module.exports = (sequelize, DataTypes) => {
  const collectionShops = sequelize.define('collection_shops', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    linkText: DataTypes.STRING,
    linkUrl: DataTypes.STRING
  }, {
    underscored: false
  })
  collectionShops.associate = function (models) {
    // associations can be defined here
    collectionShops.belongsTo(models.collections)
  }
  return collectionShops
}
