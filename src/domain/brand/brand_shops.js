const t = require('tcomb')

const BrandShops = t.struct({
  shopId: t.String,
  displayOnBrands: t.Boolean
}, {
  defaultProps: {
    displayOnBrands: false
  }
})

module.exports = BrandShops
