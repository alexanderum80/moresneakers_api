const t = require('tcomb')
const ShopWorkingHours = require('./shop_working_hours')
const { getCurrenciesCodes } = require('../currencies')

const Shop = t.struct({
  name: t.String,
  type: t.maybe(t.enums.of(['virtual', 'physical'])),
  description: t.maybe(t.String),
  siteUrl: t.maybe(t.String),
  active: t.maybe(t.Boolean),
  country: t.maybe(t.String),
  region: t.maybe(t.String),
  zipCode: t.maybe(t.String),
  address: t.maybe(t.String),
  shippingDetails: t.maybe(t.String),
  shippingCountries: t.maybe(t.enums.of(['Worldwide', 'Europe', 'USA', 'EMEA', 'Select Countries'])),
  countries: t.maybe(t.String),
  trackingListBaseUrl: t.maybe(t.String),
  trackingListBaseUrlIsAfter: t.Any,
  mainImage: t.maybe(t.String),
  smallImage: t.maybe(t.String),
  headerImage: t.maybe(t.String),
  currency: t.maybe(t.enums.of(getCurrenciesCodes())),
  parent: t.maybe(t.String),
  // showOnRegion: t.maybe(t.enums.of(['USA', 'Europe', 'Marketplaces'])),

  showOnRegion: t.maybe(t.String),//there are some empty values :|
  isParent: t.maybe(t.Boolean),
  rank: t.maybe(t.Number),
  lat: t.maybe(t.Number),
  lon: t.maybe(t.Number),
  workingHours: t.maybe(t.list(ShopWorkingHours)),
  defaultOfferLabel: t.maybe(t.String),
  brands: t.list(t.String),
  categories: t.list(t.String),
  slug: t.maybe(t.String),
  keywords: t.maybe(t.String),
  meta_description: t.maybe(t.String)
}, {
  defaultProps: {
    brands: [],
    categories: [],
    workingHours: [],
    currency: 'EUR',
    isParent: false,
    lat: 0.0,
    lon: 0.0
  }
})

module.exports = Shop
