const t = require('tcomb')

const LayoutHeader = t.struct({
  displayOnPage: t.maybe(t.Boolean),
  imgUrl: t.maybe(t.String),
  imgMovil: t.maybe(t.String),
  link: t.maybe(t.String),
  label: t.maybe(t.String),
  display: t.enums.of(['top', 'middle', 'bottom'])
}, {
  defaultProps: {
    display: 'top',
    displayOnPage: false
  }
})

module.exports = LayoutHeader
