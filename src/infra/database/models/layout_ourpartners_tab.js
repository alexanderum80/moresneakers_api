module.exports = (sequelize, DataTypes) => {
  const LayoutOurPartnersTab = sequelize.define('layout_ourpartners_tabs', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    label: DataTypes.STRING
  }, {
    underscored: false
  })
  LayoutOurPartnersTab.associate = function (models) {
    // associations can be defined here
    LayoutOurPartnersTab.belongsTo(models.layouts)
    LayoutOurPartnersTab.hasMany(models.layout_ourpartners_tab_slides, { as: 'slides' })
  }
  return LayoutOurPartnersTab
}
