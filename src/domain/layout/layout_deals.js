const t = require('tcomb')

const LayoutDeals = t.struct({
  link: t.maybe(t.String),
  imgUrl: t.maybe(t.String),
  label: t.maybe(t.String)
}, {
  defaultProps: {}
})

module.exports = LayoutDeals
