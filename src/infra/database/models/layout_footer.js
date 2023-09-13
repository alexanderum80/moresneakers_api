module.exports = (sequelize, DataTypes) => {
  const LayoutFooter = sequelize.define('layout_footer', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
  }, {
    underscored: false
  })
  LayoutFooter.associate = function (models) {
    // associations can be defined here
    LayoutFooter.belongsTo(models.brands)
    LayoutFooter.belongsTo(models.collections)
    LayoutFooter.belongsTo(models.styles)
  }
  return LayoutFooter
}
