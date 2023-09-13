const t = require('tcomb')

const Layout = t.struct({
  displayOnPage: t.maybe(t.Boolean),
  display: t.enums.of(['top', 'middle', 'bottom'])
}, {
  defaultProps: {
    display: 'top',
    displayOnPage: false
  }
})

module.exports = Layout
