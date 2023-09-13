const t = require('tcomb')

const CollectionShops = t.struct({
  shopId: t.String,
  linkText: t.maybe(t.String),
  linkUrl: t.maybe(t.String)
}, {
  defaultProps: {
  }
})

module.exports = CollectionShops
