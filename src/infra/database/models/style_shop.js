module.exports = (sequelize, DataTypes) => {
  const styleShops = sequelize.define('style_shops', {
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
  styleShops.associate = function (models) {
    // associations can be defined here
    styleShops.belongsTo(models.styles)
  }
  return styleShops
}
