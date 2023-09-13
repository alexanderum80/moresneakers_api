module.exports = (sequelize, DataTypes) => {
  const LayoutOurPartnersTabImage = sequelize.define('layout_ourpartners_tab_slides', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    entityId: DataTypes.STRING,
    type: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {
    underscored: false
  })
  LayoutOurPartnersTabImage.associate = function (models) {
    // associations can be defined here
    LayoutOurPartnersTabImage.belongsTo(models.layout_ourpartners_tabs)
  }
  return LayoutOurPartnersTabImage
}
