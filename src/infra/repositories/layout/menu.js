const EntityNotFound = require('src/infra/errors/EntityNotFoundError')

module.exports = (database) => {
  const model = database.models.layouts
  const updateMenu = async (page, menu) => {
    let layoutDb = await model.findOne({ where: { page: page } })
    if (!layoutDb) {
      throw new EntityNotFound()
    }
    await layoutDb.updateAttributes({ layoutMenuJSON: JSON.stringify(menu) })
    return menu
  }

  const getMenu = async (page) => {
    let layoutDB = await model.findOne({ where: { page } })
    if (!layoutDB) {
      throw new EntityNotFound()
    }
    if (!layoutDB.layoutMenuJSON) {
       return { slides: []}
    }
    return JSON.parse(layoutDB.layoutMenuJSON)
  }

  return {
    updateMenu,
    getMenu
  }
}
