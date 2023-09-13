const EntityNotFound = require('src/infra/errors/EntityNotFoundError')
const { LayoutHeader } = require('src/domain/layout')
const { getBoolean } = require('src/app/layout/helper')

const mapHeader = (headerDomain) => {
  let newHeaderDomain = LayoutHeader(headerDomain)
  newHeaderDomain.headerDisplay = headerDomain.display ? headerDomain.display : 'top'
  newHeaderDomain.headerLink = headerDomain.link
  newHeaderDomain.headerLabel = headerDomain.label
  newHeaderDomain.headerImgUrl = headerDomain.imgUrl
  newHeaderDomain.headerImgMovil = headerDomain.imgMovil
  newHeaderDomain.headerDisplayOnPage = getBoolean(headerDomain.displayOnPage)
  return newHeaderDomain
}

// Transforms layout_slider from domain to database object
const unmapHeader = (dbModel) => {
  let headerDomain = Object.create(dbModel)
  headerDomain.display = dbModel.headerDisplay ? dbModel.headerDisplay : 'top'
  headerDomain.link = dbModel.headerLink
  headerDomain.label = dbModel.headerLabel
  headerDomain.imgUrl = dbModel.headerImgUrl
  headerDomain.imgMovil = dbModel.headerImgMovil
  headerDomain.displayOnPage = getBoolean(dbModel.headerDisplayOnPage)
  return LayoutHeader(headerDomain)
}

module.exports = (database) => {
  const model = database.models.layouts
  const updateHeader = async (page, header) => {
    let layoutDb = await model.findOne({ where: { page: page } })
    if (!layoutDb) {
      throw new EntityNotFound()
    }
    const mappedHeader = mapHeader(header)
    await layoutDb.updateAttributes(mappedHeader)
    return header
  }

  const getHeader = async (page) => {
    let layoutDB = await model.findOne({ where: { page } })
    console.log(JSON.stringify(layoutDB))
    if (!layoutDB) {
      throw new EntityNotFound()
    }
    return unmapHeader(layoutDB)
  }

  return {
    updateHeader,
    getHeader
  }
}
