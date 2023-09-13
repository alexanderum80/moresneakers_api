module.exports = (sequelize, DataTypes) => {
  const shopWorkingHours = sequelize.define('shop_working_hours', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    dayOfWeek: DataTypes.INTEGER,
    openHour: DataTypes.STRING,
    closeHour: DataTypes.STRING,
    offWork: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    underscored: false
  })
  shopWorkingHours.associate = function (models) {
    // associations can be defined here
    shopWorkingHours.belongsTo(models.shops)
  }
  return shopWorkingHours
}
