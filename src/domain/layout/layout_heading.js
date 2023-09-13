const t = require('tcomb')

const Layout = t.struct({
  title: t.maybe(t.String),
  pageTitle: t.maybe(t.String),
  description: t.maybe(t.String),
  keywords: t.maybe(t.String),
  imgUrl: t.maybe(t.String),
  displayOnPage: t.maybe(t.Boolean),
  meta_description: t.maybe(t.String),
}, {
  defaultProps: {
    description: '',
    keywords: '',
    meta_description: '',
    displayOnPage: true
  }
})

module.exports = Layout
