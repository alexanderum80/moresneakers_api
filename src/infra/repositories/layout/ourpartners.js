const EntityNotFound = require('src/infra/errors/EntityNotFoundError')

module.exports = (database) => {
  const model = database.models.layouts
  const layoutOurpartnerTabsModel = database.models.layout_ourpartners_tabs
  const layoutOurpartnerTabSlidesModel = database.models.layout_ourpartners_tab_slides

  const getOurPartnersTabs = async (page) => {
    let layoutDb = await model.findOne({ where: { page: page } })
    if (!layoutDb) {
      throw new EntityNotFound()
    }
    let sliderDB = await layoutOurpartnerTabsModel.findAll({ where: { layoutId: layoutDb.id }, include: { model: layoutOurpartnerTabSlidesModel, as: 'slides' } })
    if (!sliderDB) {
      throw new EntityNotFound()
    }
    return sliderDB
  }

  const createOurPartnersTab = async (page, tab) => {
    // set filter as string
    let layoutDb = await model.findOne({ where: { page: page } })
    if (!layoutDb) {
      throw new EntityNotFound()
    }
    // set layout attributes
    let sliderDbAttrs = tab
    sliderDbAttrs.layoutId = layoutDb.id
    let ourpartnerTabDb = await layoutOurpartnerTabsModel.create(sliderDbAttrs)
    if (tab.slides) {
      // create and set slider images
      const newImages = await layoutOurpartnerTabSlidesModel.bulkCreate(tab.slides)
      await ourpartnerTabDb.setSlides(newImages)
    }
    return ourpartnerTabDb
  }

  const updateOurPartnersTab = async (page, id, tab) => {
    // set filter as string
    let layoutDb = await model.findOne({ where: { page: page } })
    if (!layoutDb) {
      throw new EntityNotFound()
    }
    // set layout attributes
    let sliderDbAttrs = {
      label: tab.label,
      layoutId: layoutDb.id
    }
    let ourpartnerTabDb = await layoutOurpartnerTabsModel.findOne({ where: { id: id } })
    if (!ourpartnerTabDb) {
      throw new EntityNotFound()
    }
    await ourpartnerTabDb.updateAttributes(sliderDbAttrs)
    if (tab.slides) {
      // create and set slider images
      const newSlides = await layoutOurpartnerTabSlidesModel.bulkCreate(tab.slides)
      await ourpartnerTabDb.setSlides(newSlides)
    }
    return tab
  }

  const deleteOurPartnersTab = async (id) => {
    await layoutOurpartnerTabsModel.destroy({ where: { id } })
    return {}
  }

  return {
    createOurPartnersTab,
    updateOurPartnersTab,
    getOurPartnersTabs,
    deleteOurPartnersTab
  }
}
