const t = require('tcomb')
const layoutHeader = require('./layout_header')
const layoutHeading = require('./layout_heading')
const layoutSlider = require('./layout_slider')
const layoutHottest = require('./layout_hottest')
const layoutDeals = require('./layout_deals')
const layoutDealsStruct = require('./layout_deals_struct')
const layoutWhatWeDo = require('./layout_what_we_do')
const layoutReleasesText = require('./layout_releases_text')
const layoutReleasesText2 = require('./layout_releases_text_2')


const Layout = t.struct({
  page: t.String,
  slider: t.maybe(layoutSlider),
  header: t.maybe(layoutHeader),
  hottest: t.maybe(layoutHottest),
  heading: t.maybe(layoutHeading),
  deals: t.maybe(layoutDealsStruct),
  whatWeDo: t.maybe(layoutWhatWeDo),
  releasesText: t.maybe(layoutReleasesText),
  releasesText2: t.maybe(layoutReleasesText2)
}, {
  defaultProps: {}
})

module.exports = Layout
