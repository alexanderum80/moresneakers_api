module.exports = (sequelize, DataTypes) => {
  const releaseCategories = sequelize.define('release_categories', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    }
  }, {
    underscored: false
  })
  releaseCategories.associate = function (models) {
    // associations can be defined here
  }
  return releaseCategories
}
