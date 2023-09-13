module.exports = (sequelize, DataTypes) => {
  const releaseImages = sequelize.define('release_images', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    fileName: DataTypes.STRING,
    imgUrl: DataTypes.TEXT,
    imgOrder: DataTypes.INTEGER
  }, {
    underscored: false
  })
  releaseImages.associate = function (models) {
    // associations can be defined here
    releaseImages.belongsTo(models.releases)
  }
  return releaseImages
}
