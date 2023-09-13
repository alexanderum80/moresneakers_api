const EntityNotFound = require('src/infra/errors/EntityNotFoundError')
const { LayoutHottest } = require('src/domain/layout')
const { getBoolean } = require('src/app/layout/helper')

const mapHottest = (hottestDomain) => {
  let newHottestDomain = LayoutHottest(hottestDomain)
  newHottestDomain.hottestDisplay = hottestDomain.display ? hottestDomain.display : 'top'
  newHottestDomain.hottestDisplayOnPage = getBoolean(hottestDomain.displayOnPage)
  return newHottestDomain
}

// Transforms layout_slider from domain to database object
const unmapHottest = (dbModel) => {
  let hottestDomain = Object.create(dbModel)
  hottestDomain.display = dbModel.hottestDisplay ? dbModel.hottestDisplay : 'bottom'
  hottestDomain.displayOnPage = getBoolean(dbModel.hottestDisplayOnPage)
  return LayoutHottest(hottestDomain)
}

module.exports = (database) => {
  const model = database.models.layouts
  const updateHottest = async (page, hottest) => {
    let layoutDb = await model.findOne({ where: { page: page } })
    if (!layoutDb) {
      throw new EntityNotFound()
    }
    const mappedHottest = mapHottest(hottest)
    await layoutDb.updateAttributes(mappedHottest)
    return hottest
  }

  const getHottest = async (page) => {
    let layoutDB = await model.findOne({ where: { page } })
    if (!layoutDB) {
      throw new EntityNotFound()
    }
    return unmapHottest(layoutDB)
  }

  return {
    updateHottest,
    getHottest
  }
}
