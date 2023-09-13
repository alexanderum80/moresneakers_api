const EntityNotFound = require('src/infra/errors/EntityNotFoundError')
const { LayoutDeals } = require('src/domain/layout')

module.exports = (database) => {
  const model = database.models.layouts
  const layoutDealsModel = database.models.layout_deals

  const getDeals = async (page) => {
    let layoutDealsDb = await model.findOne({
      where: { page: page },
      include: { model: layoutDealsModel, as: 'layout_deals' }
    })
    if (!layoutDealsDb) {
      throw new EntityNotFound()
    }
    let deals = []
    for(const deal of layoutDealsDb.layout_deals){
      deals.push(unmapDeals(deal))
    }
    return {"deals":deals, "displayOnPage":layoutDealsDb.dealsDisplayOnPage}
  }

  const getLayoutDeals = async (page) => {
    let layoutDb = await model.findOne({where: {page: page}})
    if (!layoutDb) {
      throw new EntityNotFound()
    }
    let sliderDB = await layoutDealsModel.findAll({where: {layoutId: layoutDb.id}})
    if (!sliderDB) {
      throw new EntityNotFound()
    }
    return sliderDB
  }

  const unmapDeals = (dbModel) => {
    let dealsDomain = Object.create(dbModel)
    dealsDomain.link = dbModel.link
    dealsDomain.label =  dbModel.label
    dealsDomain.imgUrl = dbModel.imgUrl
    return LayoutDeals(dealsDomain)
  }

  const createLayoutDeals = async (page, deal) => {
    // set filter as string
    let layoutDb = await model.findOne({where: {page: page}})
    if (!layoutDb) {
      throw new EntityNotFound()
    }
    // set layout attributes
    let dealDbAttrs = {
      layoutId: layoutDb.id,
      link:deal.link,
      imgUrl:deal.imgUrl,
      label:deal.label
    }
    let layoutDealsDb = await layoutDealsModel.create(dealDbAttrs)
    return layoutDealsDb
  }

  const updateLayoutDeals = async (page, id, deal) => {
    // set filter as string
    let layoutDb = await model.findOne({where: {page: page}})
    if (!layoutDb) {
      throw new EntityNotFound()
    }
    // set layout attributes
    let dealsDbAttrs = {
      link: deal.link,
      label: deal.label,
      imgUrl: deal.imgUrl,
      layoutId: layoutDb.id
    }
    let layoutDealsDb = await layoutDealsModel.findOne({where: {id: id}})
    if (!layoutDealsDb) {
      throw new EntityNotFound()
    }
    await layoutDealsDb.updateAttributes(dealsDbAttrs)
    return deal
  }

  const deleteLayoutDeals = async (id) => {
    await layoutDealsModel.destroy({where: {id}})
    return {}
  }

  return {
    createLayoutDeals,
    updateLayoutDeals,
    getLayoutDeals,
    deleteLayoutDeals,
    getDeals
  }
}
