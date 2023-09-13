const t = require('tcomb')
const LayoutSlide = require('./layout_slides')

const LayoutSlider = t.struct({
  displayOnPage: t.maybe(t.Boolean),
  slides: t.maybe(t.list(LayoutSlide)),
  display: t.enums.of(['top', 'middle', 'bottom'])
}, {
  defaultProps: {
    display: 'top',
    displayOnPage: false
  }
})

module.exports = LayoutSlider
