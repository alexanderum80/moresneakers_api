module.exports = (sequelize, DataTypes) => {
  const blogs = sequelize.define('blogs', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    title: DataTypes.STRING,
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    type: DataTypes.STRING,
    author: DataTypes.STRING,
    body: DataTypes.TEXT,
    imgUrl: DataTypes.TEXT,
    keywords: { type: DataTypes.TEXT, defaultValue: "" },
    meta_description: { type: DataTypes.TEXT, defaultValue: "" },
  }, {
    underscored: false
  })
  blogs.associate = function (models) {
    // associations can be defined here
    blogs.belongsTo(models.brands, { as: 'brand', foreignKey: 'brandId' })
    blogs.hasMany(models.blog_images, { as: 'images' })
  }
  return blogs
}
