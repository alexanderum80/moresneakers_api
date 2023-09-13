module.exports = (sequelize, DataTypes) => {
  const dealLinks = sequelize.define('deal_links', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    url: DataTypes.STRING,
    bitlyUrl: DataTypes.STRING,
    text: DataTypes.STRING,
    trackedUrl: DataTypes.STRING
  }, {
    underscored: false
  })
  dealLinks.associate = function (models) {
    // associations can be defined here
    dealLinks.belongsTo(models.deals)
  }
  return dealLinks
}
