module.exports = (sequelize, DataTypes) => {
  const blogImages = sequelize.define('blog_images', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    fileName: DataTypes.STRING,
    imgUrl: DataTypes.TEXT,
    position: DataTypes.INTEGER
  }, {
    underscored: false
  })
  blogImages.associate = function (models) {
    // associations can be defined here
    blogImages.belongsTo(models.blogs)
  }
  return blogImages
}
