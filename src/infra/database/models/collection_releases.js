module.exports = (sequelize, DataTypes) => {
  const collectionOffers = sequelize.define('collection_releases', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    }
  }, {
    underscored: false
  })
  collectionOffers.associate = function (models) {
    // associations can be defined here
  }
  return collectionOffers
}
