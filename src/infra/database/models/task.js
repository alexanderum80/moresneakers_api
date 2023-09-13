module.exports = (sequelize, DataTypes) => {
  const tasks = sequelize.define('tasks', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    description: DataTypes.TEXT,
    priority: DataTypes.STRING
  }, {
    underscored: false
  })
  tasks.associate = function (models) {
    // associations can be defined here
    tasks.belongsTo(models.users, { foreignKey: 'responsable' })
  }
  return tasks
}
