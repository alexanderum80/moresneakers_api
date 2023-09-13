module.exports = (sequelize, DataTypes) => {
  const LayoutDeals = sequelize.define('layout_deals', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    link: DataTypes.STRING,
    label: DataTypes.STRING,
    imgUrl: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {
    underscored: false
  })
  LayoutDeals.associate = function (models) {
    // associations can be defined here
    LayoutDeals.belongsTo(models.layouts)
  }
  return LayoutDeals
}
