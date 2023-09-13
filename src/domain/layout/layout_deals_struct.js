const t = require('tcomb')
const LayoutDeals = require('./layout_deals')

const LayoutDealsStruct = t.struct({
  displayOnPage: t.maybe(t.Boolean),
  deals: t.maybe(t.list(LayoutDeals))
}, {
  defaultProps: {}
})

module.exports = LayoutDealsStruct
