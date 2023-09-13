module.exports = (sequelize, DataTypes) => {
  const offerLinks = sequelize.define('offer_links', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    text: DataTypes.STRING,
    url: DataTypes.STRING,
    trackedUrl: DataTypes.STRING,
    bitlyUrl: DataTypes.STRING
  }, {
    underscored: false
  })
  offerLinks.associate = function (models) {
    // associations can be defined here
    offerLinks.belongsTo(models.offers)
  }
  return offerLinks
}
