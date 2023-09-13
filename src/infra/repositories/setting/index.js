const container = require('src/container') // we have to get the DI
// inject database
const { database } = container.cradle
const model = database.models.settings
const EntityNotFound = require('src/infra/errors/EntityNotFoundError')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

const getAllValues = async () => {
  let entity = await model.findAll({
    where: {
      name: {
        [Op.like]: 'config_social_%'
      }
    }
  })
  if (!entity) {
    throw new EntityNotFound()
  }
  return entity
}

const getValueByName = async (name) => {
  let entity = await model.findOne({ where: { name: name } })
  if (!entity) {
    throw new EntityNotFound()
  }
  return entity
}

const updateValueByName = async (name, value) => {
  let entity = await model.findOne({ where: { name: name } })
  if (!entity) {
    entity = await model.create({ name: name, value: value })
  } else {
    await entity.updateAttributes({ value: value })
  }
  return entity
}

const updateDataByName = async (name, data) => {

  let entity = await model.findOne({ where: { name: name } })
  if (!entity) {
    entity = await model.create({ name: name, ...data })
  } else {
    await entity.updateAttributes({ ...data })
  }
  return entity
}

module.exports = {
  getAllValues,
  getValueByName,
  updateValueByName,
  updateDataByName
}
