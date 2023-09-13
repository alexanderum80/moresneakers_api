module.exports = (sequelize, DataTypes) => {
  const LayoutSneakersSection = sequelize.define('layout_sneakers_section', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    link: DataTypes.STRING,
    title: DataTypes.STRING,
    imgUrl: DataTypes.STRING,
  }, {
    underscored: false
  })

  return LayoutSneakersSection
}
