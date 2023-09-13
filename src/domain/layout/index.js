const {makeEntity, makeValueObject} = require('../helper')

const Layout = makeValueObject(require('./layout'))
const LayoutSlider = makeValueObject(require('./layout_slider'))
const LayoutSlide = makeValueObject(require('./layout_slides'))
const LayoutHeading = makeEntity(require('./layout_heading'))
const LayoutHeader = makeValueObject(require('./layout_header'))
const LayoutHottest = makeValueObject(require('./layout_hottest'))
const LayoutFooter = makeEntity(require('./layoutfooter'))
const LayoutDeals = makeEntity(require('./layout_deals'))
const LayoutSneakersSection = makeEntity(require('./layout_sneakers_section'))
const LayoutWhatWeDo = makeEntity(require('./layout_what_we_do'))
const LayoutReleasesText = makeEntity(require('./layout_releases_text'))
const LayoutReleasesText2 = makeEntity(require('./layout_releases_text_2'))

module.exports = {
  Layout,
  LayoutSlider,
  LayoutHeading,
  LayoutHeader,
  LayoutHottest,
  LayoutSlide,
  LayoutFooter,
  LayoutDeals,
  LayoutSneakersSection,
  LayoutWhatWeDo,
  LayoutReleasesText,
  LayoutReleasesText2
}
