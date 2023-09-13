const EntityNotFound = require('src/infra/errors/EntityNotFoundError')
const { LayoutSlider, LayoutSlide } = require('src/domain/layout')
const { getBoolean } = require('src/app/layout/helper')

const releaseRepository = require('../release')
const colletionRepository = require('../collection')
const offerRepository = require('../offer')

// Transforms layout_slider from domain to database object
const mapSlider = (layoutSliderDomain) => {
  return {
    sliderDisplay: layoutSliderDomain.display,
    sliderDisplayOnPage: getBoolean(layoutSliderDomain.displayOnPage)
  }
}

const unmapSlider = (dbModel) => {
  const sliderDomain = Object.create(dbModel)
  sliderDomain.display = dbModel.sliderDisplay ? dbModel.sliderDisplay : 'top'
  sliderDomain.displayOnPage = getBoolean(dbModel.sliderDisplayOnPage)
  return LayoutSlider(sliderDomain)
}


const asignLinkToSlaide = async (layoutDb) => {

  for (const slide of layoutDb.slides) {

    switch (slide.entityType) {
      case 'release':
        try {
          const release = await releaseRepository.getById(slide.entityId);
          slide.link = release.slug
        } catch (error) {
          slide.link = 'not-release'
        }
        break;

      case 'offer':
        try {
          const links = await offerRepository.getLinks(slide.entityId);
          slide.link = links.length ? links[0].url : ''
        } catch (error) {
          slide.link = 'not-offer'
        }
        break;

      case 'collection':
        try {
          const collection = await colletionRepository.getById(slide.entityId);
          slide.link = collection.name
        } catch (error) {
          slide.link = 'not-collection'
        }
        break;
    }

  }
  // console.log('\x1b[33m%s\x1b[0m', '------dentro----------');  //yellow
  return layoutDb
}

module.exports = (database) => {
  const model = database.models.layouts
  const layoutSlidesModel = database.models.layout_slides
  const getSlider = async (page) => {
    let layoutDb = await model.findOne({
      include: { model: layoutSlidesModel, as: 'slides' },
      where: { page: page },
      order: [[{ model: layoutSlidesModel, as: 'slides' }, 'slideOrder', 'ASC']],
    })
    if (!layoutDb) {
      throw new EntityNotFound()
    }

    await asignLinkToSlaide(layoutDb)

    return unmapSlider(layoutDb)
  }

  const updateSlider = async (page, slider) => {
    // set filter as string
    let layoutDb = await model.findOne({ where: { page: page } })
    if (!layoutDb) {
      throw new EntityNotFound()
    }
    // set layout attributes
    let sliderDbAttrs = mapSlider(slider)
    await layoutDb.updateAttributes(sliderDbAttrs)
    if (slider.slides) {
      // create and set slider images
      const slidesDomain = slider.slides.map((slide, index) => {
        slide.slideOrder = index + 1;
        return LayoutSlide(slide)
      })
      const newSlides = await layoutSlidesModel.bulkCreate(slidesDomain)
      await layoutDb.setSlides(newSlides)
    }
    return slider
  }

  return {
    getSlider,
    updateSlider
  }
}
