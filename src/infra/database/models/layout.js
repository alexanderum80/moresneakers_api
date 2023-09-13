module.exports = (sequelize, DataTypes) => {
  const Layout = sequelize.define('layouts', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    page: DataTypes.STRING,
    title: DataTypes.STRING,
    pageTitle: DataTypes.STRING,
    description: DataTypes.TEXT,
    keywords: DataTypes.STRING,
    headingImgUrl: DataTypes.STRING,
    headingDisplayOnPage: DataTypes.BOOLEAN,
    headerImgUrl: DataTypes.STRING,
    headerImgMovil: DataTypes.STRING,
    headerLink: DataTypes.STRING,
    headerLabel: DataTypes.STRING,
    headerDisplay: DataTypes.STRING,
    headerDisplayOnPage: DataTypes.BOOLEAN,
    sliderDisplay: DataTypes.STRING,
    sliderDisplayOnPage: DataTypes.BOOLEAN,
    hottestDisplay: DataTypes.STRING,
    hottestDisplayOnPage: DataTypes.BOOLEAN,
    layoutMenuJSON: DataTypes.TEXT,
    dealsDisplayOnPage: DataTypes.BOOLEAN,
    whatWeDo: DataTypes.TEXT,
    meta_description: DataTypes.STRING,
    releasesText: DataTypes.TEXT,
    releasesText2: DataTypes.TEXT,
   }, {
    freezeTableName: true,
    underscored: false
  })
  Layout.associate = function (models) {
    // associations can be defined here
    Layout.hasMany(models.layout_slides, { as: 'slides' })
    Layout.hasMany(models.layout_deals)
  }
  return Layout
}
