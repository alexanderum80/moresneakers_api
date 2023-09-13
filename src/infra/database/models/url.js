module.exports = (sequelize, DataTypes) => {
  const Url = sequelize.define('urls', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    url: DataTypes.TEXT,
    vanityUrl: DataTypes.STRING
  }, {
    freezeTableName: true,
    underscored: false
  })
  Url.associate = function (models) {
    // associations can be defined here
  }
  return Url
}
