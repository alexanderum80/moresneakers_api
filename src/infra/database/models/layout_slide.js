module.exports = (sequelize, DataTypes) => {
  const LayoutSlide = sequelize.define('layout_slides', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    entityType: DataTypes.STRING,
    entityId: DataTypes.STRING,
    imgUrl: DataTypes.STRING,
    imgMobileUrl: DataTypes.STRING,
    description: DataTypes.TEXT,
    slideOrder: DataTypes.INTEGER
  }, {
    underscored: false
  })
  LayoutSlide.associate = function (models) {
    // associations can be defined here
    LayoutSlide.belongsTo(models.layouts)
  }
  return LayoutSlide
}
