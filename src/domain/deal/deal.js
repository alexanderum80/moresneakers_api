const t = require('tcomb')

const Deal = t.struct({
  url: t.maybe(t.String),
  trackedUrl: t.maybe(t.String),
  bitlyUrl: t.maybe(t.String),
  startDate: t.maybe(t.Date),
  endDate: t.maybe(t.Date),
  salePercentage: t.maybe(t.String),
  status: t.maybe(t.enums.of(['Coming Soon', 'Live', 'Expired'])),
  promoCode: t.maybe(t.String),
  startTime: t.maybe(t.String),
  endTime: t.maybe(t.String),
  shopId: t.maybe(t.String),
  displayOnSale: t.Boolean,
  imgUrl: t.maybe(t.String),
  links: t.maybe(t.list(t.Object)),
  description: t.maybe(t.String),
}, {
  defaultProps: {
    displayOnSale: true,
    status: 'Coming Soon',
    salePercentage: null,
    links:[]
  }
})

module.exports = Deal
