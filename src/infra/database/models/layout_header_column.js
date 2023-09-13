module.exports = (sequelize, DataTypes) => {
  const LayoutHeaderColum = sequelize.define('layout_header_columns', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    url: DataTypes.STRING,
    name: DataTypes.STRING,
    imgUrl: DataTypes.STRING,
    filter: DataTypes.TEXT
  }, {
    underscored: false
  })
  LayoutHeaderColum.associate = function (models) {
    // associations can be defined here
    LayoutHeaderColum.belongsTo(models.layouts)
  }
  return LayoutHeaderColum
}
