const container = require('src/container') // we have to get the DI
// inject database
const { database } = container.cradle
const model = database.models.layouts
const {
  map,
  unmap
} = require('./mapper')

const {
  createOurPartnersTab,
  getOurPartnersTabs,
  updateOurPartnersTab,
  deleteOurPartnersTab
} = require('./ourpartners')(database)

const {
  getSlider,
  updateSlider
} = require('./slider')(database)

const {
  getHeader,
  updateHeader
} = require('./header')(database)

const {
  getMenu,
  updateMenu
} = require('./menu')(database)

const {
  getHeading,
  updateHeading
} = require('./heading')(database)

const {
  getHottest,
  updateHottest
} = require('./hottest')(database)

const {
  createLayoutDeals,
  updateLayoutDeals,
  getLayoutDeals,
  deleteLayoutDeals,
  getDeals
} = require('./deals')(database)

const {
  getWhatWeDo,
  updateWhatWeDo
} = require('./what_we_do')(database)

const {
  getReleasesText,
  updateReleasesText
} = require('./releases_text')(database)


const {
  getReleasesText2,
  updateReleasesText2
} = require('./releases_text_2')(database)


const Redis = require('src/redis');

const getByPage = async (page) => {
  // let data = await Redis.get('layouts', page);
  
  // if(data)
  //   return data;

  let heading = await getHeading(page)
  let header = await getHeader(page)
  let hottest = await getHottest(page)
  let slider = await getSlider(page)
  let deals = await getDeals(page)
  let whatWeDo = await getWhatWeDo(page)
  let releasesText = await getReleasesText(page)
  let releasesText2 = await getReleasesText2(page)

  
  data = unmap({
    page,
    heading,
    hottest,
    header,
    slider,
    deals,
    whatWeDo,
    releasesText,
    releasesText2
  });

  return Redis.set('layouts', page, data);
}

const updatePage = async (page, layout) => {
  Object.assign(layout, { page: page })
  let entity = await model.findOne({ where: { page: page } })
  if (!entity) {
    entity = await model.create(map(layout))
  } else {
    await entity.updateAttributes(map(layout))
  } 
  await Redis.hdel('layouts', page);   
  return layout  
}

module.exports = {
  getByPage,
  updatePage,
  updateHeading,
  getHeading,
  updateHeader,
  getHeader,
  updateHottest,
  getHottest,
  updateSlider,
  getSlider,
  createOurPartnersTab,
  getOurPartnersTabs,
  updateOurPartnersTab,
  deleteOurPartnersTab,
  getMenu,
  updateMenu,
  getLayoutDeals,
  createLayoutDeals,
  deleteLayoutDeals,
  updateLayoutDeals,
  getDeals,
  getWhatWeDo,
  updateWhatWeDo,
  getReleasesText,
  updateReleasesText,
  getReleasesText2,
  updateReleasesText2
}
