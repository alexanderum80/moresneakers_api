const t = require('tcomb')

const ShopWorkingHour = t.struct({
  shopId: t.maybe(t.String),
  dayOfWeek: t.maybe(t.Number),
  openHour: t.maybe(t.String),
  closeHour: t.maybe(t.String),
  offWork: t.Boolean
})

module.exports = ShopWorkingHour
